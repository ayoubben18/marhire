<?php

namespace App\Services\Email;

use App\Mail\SimpleBookingEmail;
use App\Mail\DatabaseTemplateEmail;
use App\Models\Booking;
use App\Models\EmailLog;
use App\Models\EmailTemplate;
use App\Models\EmailSetting;
use App\Repositories\EmailLogRepository;
use App\Services\PDFService;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class EmailService implements EmailServiceInterface
{
    protected $emailLogRepository;
    protected $pdfService;

    public function __construct(EmailLogRepository $emailLogRepository, PDFService $pdfService)
    {
        $this->emailLogRepository = $emailLogRepository;
        $this->pdfService = $pdfService;
    }

    public function send(string $recipient, string $emailType, Booking $booking, ?string $pdfPath = null): bool
    {
        // Check if email is enabled for this category/type (skip check for already processed emails)
        $booking->load('listing.category');
        if (!EmailSetting::isEmailEnabled($booking->listing->category ?? 'general', $emailType)) {
            // Log as skipped
            $this->emailLogRepository->create([
                'booking_id' => $booking->id,
                'recipient_email' => $recipient,
                'recipient_type' => $this->determineRecipientType($recipient),
                'email_type' => $emailType,
                'status' => 'skipped',
                'error_message' => 'Email disabled in settings'
            ]);
            return true; // Return true to avoid error handling
        }
        
        // Use settings for sender configuration
        config(['mail.from.address' => EmailSetting::getSenderEmail()]);
        config(['mail.from.name' => EmailSetting::getSenderName()]);
        
        // Generate PDF for confirmed bookings
        if ($emailType === 'booking_confirmed' && strtolower($booking->status) === 'confirmed' && !$pdfPath) {
            try {
                $invoiceData = $this->prepareInvoiceData($booking);
                $pdfPath = $this->pdfService->generateInvoice($invoiceData, $booking->category_id);
            } catch (\Exception $e) {
                Log::warning('Failed to generate PDF invoice', [
                    'booking_id' => $booking->id,
                    'error' => $e->getMessage()
                ]);
            }
        }
        
        // Create email log entry
        $emailLog = $this->emailLogRepository->create([
            'booking_id' => $booking->id,
            'recipient_email' => $recipient,
            'recipient_type' => $this->determineRecipientType($recipient),
            'email_type' => $emailType,
            'status' => 'sending',
            'pdf_path' => $pdfPath,
            'email_data' => $this->prepareEmailData($booking, $emailType),
            'retry_count' => 0
        ]);

        try {
            // Try to get template from database
            $template = EmailTemplate::where('event_type', $emailType)
                ->where(function($q) use ($booking) {
                    $q->whereNull('category');
                    if (isset($booking->listing->category->slug)) {
                        $q->orWhere('category', $booking->listing->category->slug);
                    }
                })
                ->where('is_active', true)
                ->first();
            
            if ($template) {
                // Use database template
                $subject = $this->replaceVariables($template->subject, $booking);
                $body = $this->replaceVariables($template->body_html, $booking);
                
                Log::info('Sending email with DatabaseTemplateEmail', [
                    'recipient' => $recipient,
                    'has_pdf' => !empty($pdfPath),
                    'pdf_path' => $pdfPath
                ]);
                
                Mail::to($recipient)->send(new DatabaseTemplateEmail($subject, $body, $pdfPath));
            } else {
                // Fallback to blade templates if database template doesn't exist
                Mail::to($recipient)->send(new SimpleBookingEmail($emailLog));
            }
            
            // Mark as sent
            $emailLog->markAsSent();
            
            Log::info('Email sent successfully', [
                'email_log_id' => $emailLog->id,
                'recipient' => $recipient,
                'type' => $emailType,
                'used_template' => $template ? 'database' : 'blade'
            ]);

            return true;
        } catch (\Exception $e) {
            // Mark as failed
            $emailLog->markAsFailed($e->getMessage());
            
            Log::error('Failed to send email', [
                'email_log_id' => $emailLog->id,
                'recipient' => $recipient,
                'email_type' => $emailType,
                'booking_id' => $booking->id,
                'error' => $e->getMessage()
            ]);

            return false;
        }
    }

    public function sendBulk(array $recipients, string $emailType, Booking $booking): bool
    {
        $success = true;

        foreach ($recipients as $recipient) {
            if (!$this->send($recipient, $emailType, $booking)) {
                $success = false;
            }
        }

        return $success;
    }

    public function getFailedEmails(int $days = 7): Collection
    {
        return $this->emailLogRepository->getFailedEmails($days);
    }

    public function resend(int $emailLogId): bool
    {
        try {
            $emailLog = $this->emailLogRepository->findById($emailLogId);

            if (!$emailLog || $emailLog->status === 'sent') {
                return false;
            }

            // Load relationships
            $emailLog->load('booking.listing');

            // Update status
            $emailLog->update(['status' => 'sending']);

            // Try to send again
            Mail::to($emailLog->recipient_email)->send(new SimpleBookingEmail($emailLog));
            
            // Mark as sent
            $emailLog->markAsSent();

            return true;
        } catch (\Exception $e) {
            $emailLog->markAsFailed($e->getMessage());
            
            Log::error('Failed to resend email', [
                'email_log_id' => $emailLogId,
                'error' => $e->getMessage()
            ]);

            return false;
        }
    }

    protected function determineRecipientType(string $email): string
    {
        $adminEmail = config('mail.admin_address', 'admin@marhire.com');
        return $email === $adminEmail ? 'admin' : 'customer';
    }

    protected function prepareEmailData(Booking $booking, string $emailType): array
    {
        return [
            'booking_id' => $booking->id,
            'booking_reference' => $booking->invoice_no ?? 'N/A',
            'invoice_no' => $booking->invoice_no ?? 'N/A',
            'customer_name' => $booking->name,
            'customer_email' => $booking->email,
            'listing_title' => $booking->listing->title ?? 'N/A',
            'check_in' => $booking->check_in,
            'check_out' => $booking->check_out,
            'total_amount' => $booking->total_amount,
            'email_type' => $emailType,
            'timestamp' => now()->toIso8601String()
        ];
    }
    
    protected function replaceVariables($text, $booking)
    {
        // Load necessary relationships
        $booking->load(['listing.city', 'addons.addon', 'city']);
        
        // Handle date formatting properly
        $checkInDate = $booking->check_in;
        $checkOutDate = $booking->check_out;
        $checkInTime = '10:00'; // Default time
        $checkOutTime = '10:00'; // Default time
        
        // Format dates if they exist
        if ($checkInDate) {
            $checkInCarbon = \Carbon\Carbon::parse($checkInDate);
            $checkInDateFormatted = $checkInCarbon->format('M d, Y');
            // Extract time if available
            if ($checkInCarbon->format('H:i') !== '00:00') {
                $checkInTime = $checkInCarbon->format('H:i');
            }
        } else {
            $checkInDateFormatted = 'N/A';
        }
        
        if ($checkOutDate) {
            $checkOutCarbon = \Carbon\Carbon::parse($checkOutDate);
            $checkOutDateFormatted = $checkOutCarbon->format('M d, Y');
            // Extract time if available
            if ($checkOutCarbon->format('H:i') !== '00:00') {
                $checkOutTime = $checkOutCarbon->format('H:i');
            }
        } else {
            $checkOutDateFormatted = 'N/A';
        }
        
        // Get start and end locations based on booking category
        $startLocation = 'N/A';
        $endLocation = 'N/A';
        
        // Check if it's a car rental (category_id = 2) which uses pickup/dropoff locations
        if ($booking->category_id == 2) {
            // Try to resolve pickup location - it might be a city ID or a string
            if (is_numeric($booking->pickup_location)) {
                $pickupCity = \App\Models\City::find($booking->pickup_location);
                $startLocation = $pickupCity ? $pickupCity->city_name : 'N/A';
            } else {
                $startLocation = $booking->pickup_location ?? 'N/A';
            }
            
            // Try to resolve dropoff location
            if ($booking->droppoff_location) {
                if (is_numeric($booking->droppoff_location)) {
                    $dropoffCity = \App\Models\City::find($booking->droppoff_location);
                    $endLocation = $dropoffCity ? $dropoffCity->city_name : $startLocation;
                } else {
                    $endLocation = $booking->droppoff_location;
                }
            } else {
                $endLocation = $startLocation;
            }
        } elseif ($booking->listing && $booking->listing->city) {
            // For other categories, use the listing's city
            $startLocation = $booking->listing->city->city_name ?? 'N/A';
            $endLocation = $startLocation;
        } elseif ($booking->city) {
            // Fallback to booking's city if available
            $startLocation = $booking->city->city_name ?? 'N/A';
            $endLocation = $startLocation;
        }
        
        // Get client phone (prioritize WhatsApp number)
        $clientPhone = $booking->whatsapp ?? $booking->whatsapp_number ?? 'N/A';
        
        // Get date of birth
        $clientDob = 'N/A';
        if ($booking->date_of_birth) {
            $clientDob = \Carbon\Carbon::parse($booking->date_of_birth)->format('Y-m-d');
        }
        
        // Get client note
        $clientNote = $booking->notes ?? $booking->additional_notes ?? 'N/A';
        
        // Format currency
        $currency = 'EUR';
        
        $replacements = [
            '{{client_name}}' => $booking->name,
            '{{client_email}}' => $booking->email,
            '{{client_phone}}' => $clientPhone,
            '{{client_dob}}' => $clientDob,
            '{{client_note}}' => $clientNote,
            '{{booking_reference}}' => $booking->invoice_no ?: 'N/A',
            '{{invoice_no}}' => $booking->invoice_no ?: 'N/A',
            '{{booking_id}}' => $booking->id,
            '{{listing_title}}' => $booking->listing->title ?? 'N/A',
            '{{service}}' => $booking->listing->title ?? 'N/A',
            '{{total_amount}}' => number_format($booking->total_amount, 2),
            '{{total}}' => number_format($booking->total_amount, 2),
            '{{currency}}' => $currency,
            '{{admin_email}}' => EmailSetting::getAdminEmail(),
            '{{check_in_date}}' => $checkInDateFormatted,
            '{{check_out_date}}' => $checkOutDateFormatted,
            '{{check_in}}' => $checkInDateFormatted,
            '{{check_out}}' => $checkOutDateFormatted,
            '{{start_date_time}}' => $checkInDateFormatted . ' at ' . $checkInTime,
            '{{end_date_time}}' => $checkOutDateFormatted . ' at ' . $checkOutTime,
            '{{start_location}}' => $startLocation,
            '{{end_location}}' => $endLocation,
        ];
        
        return str_replace(array_keys($replacements), array_values($replacements), $text);
    }
    
    protected function prepareInvoiceData(Booking $booking): array
    {
        // Load booking addons with their details
        $booking->load(['addons.addon', 'listing.city', 'city']);
        
        // Prepare addons array for display
        $addons = [];
        foreach ($booking->addons as $bookingAddon) {
            $addons[] = [
                'name' => $bookingAddon->addon->addon ?? 'Unknown Addon',
                'price' => $bookingAddon->price
            ];
        }
        
        // Get pickup and dropoff locations
        $pickupLocation = 'N/A';
        $dropoffLocation = 'N/A';
        if ($booking->category_id == 2) { // Car Rental
            if (is_numeric($booking->pickup_location)) {
                $pickupCity = \App\Models\City::find($booking->pickup_location);
                $pickupLocation = $pickupCity ? $pickupCity->city_name : 'N/A';
            } else {
                $pickupLocation = $booking->pickup_location ?? 'N/A';
            }
            
            if ($booking->droppoff_location) {
                if (is_numeric($booking->droppoff_location)) {
                    $dropoffCity = \App\Models\City::find($booking->droppoff_location);
                    $dropoffLocation = $dropoffCity ? $dropoffCity->city_name : $pickupLocation;
                } else {
                    $dropoffLocation = $booking->droppoff_location;
                }
            } else {
                $dropoffLocation = $pickupLocation;
            }
        } elseif ($booking->listing && $booking->listing->city) {
            $pickupLocation = $booking->listing->city->city_name ?? 'N/A';
            $dropoffLocation = $pickupLocation;
        }
        
        // Calculate rental duration and rates
        $rentalDuration = 'N/A';
        $rentalDays = 0;
        $rentalHours = 0;
        if ($booking->check_in && $booking->check_out) {
            $checkIn = \Carbon\Carbon::parse($booking->check_in);
            $checkOut = \Carbon\Carbon::parse($booking->check_out);
            $days = $checkIn->diffInDays($checkOut);
            $hours = $checkIn->diffInHours($checkOut);
            if ($days > 0) {
                $rentalDays = $days;
                $rentalDuration = $days . ' ' . ($days == 1 ? 'Day' : 'Days');
            } elseif ($hours > 0) {
                $rentalHours = $hours;
                $rentalDuration = $hours . ' ' . ($hours == 1 ? 'Hour' : 'Hours');
            } elseif ($booking->duration) {
                $rentalDuration = $booking->duration;
                // Try to extract hours from duration string
                if (preg_match('/(\d+)\s*hour/i', $booking->duration, $matches)) {
                    $rentalHours = intval($matches[1]);
                }
            }
        }
        
        // Calculate daily/hourly rates
        $dailyRate = 0;
        $hourlyRate = 0;
        $pricePerPerson = 0;
        if ($rentalDays > 0 && $booking->booking_price > 0) {
            $dailyRate = $booking->booking_price / $rentalDays;
        }
        if ($rentalHours > 0 && $booking->booking_price > 0) {
            $hourlyRate = $booking->booking_price / $rentalHours;
        }
        if ($booking->number_of_people > 0 && $booking->booking_price > 0) {
            $pricePerPerson = $booking->booking_price / $booking->number_of_people;
        }
        
        // Get client date of birth
        $clientDob = null;
        if ($booking->date_of_birth) {
            $clientDob = \Carbon\Carbon::parse($booking->date_of_birth)->format('Y-m-d');
        }
        
        $data = [
            'booking_id' => $booking->id,
            'invoice_number' => $booking->invoice_no ?? ('INV-' . $booking->id),
            'invoice_date' => now()->format('F d, Y'),
            'status' => ucfirst($booking->status),
            
            // Customer info
            'client_name' => $booking->name,
            'client_email' => $booking->email,
            'client_phone' => $booking->whatsapp ?? $booking->whatsapp_number ?? 'N/A',
            'client_dob' => $clientDob,
            'client_country' => $booking->country ?? $booking->country_of_residence ?? null,
            'client_note' => $booking->notes ?? $booking->additional_notes ?? null,
            
            // Booking details
            'service_name' => $booking->listing->title ?? 'N/A',
            'check_in' => $booking->check_in ? \Carbon\Carbon::parse($booking->check_in)->format('F d, Y') : 'N/A',
            'check_out' => $booking->check_out ? \Carbon\Carbon::parse($booking->check_out)->format('F d, Y') : 'N/A',
            'total_amount' => $booking->total_amount,
            'rental_duration' => $rentalDuration,
            
            // Location details
            'pickup_location' => $pickupLocation,
            'dropoff_location' => $dropoffLocation,
            'pickup_date' => $booking->pickup_date ? \Carbon\Carbon::parse($booking->pickup_date)->format('Y-m-d') : null,
            'pickup_time' => $booking->pickup_time ?? '10:00',
            'dropoff_date' => $booking->dropoff_date ? \Carbon\Carbon::parse($booking->dropoff_date)->format('Y-m-d') : null,
            'dropoff_time' => $booking->dropoff_time ?? '10:00',
            
            // Activity specific
            'activity_date' => $booking->prefered_date ? \Carbon\Carbon::parse($booking->prefered_date)->format('Y-m-d') : null,
            'activity_time' => $booking->pickup_time ?? '10:00',
            'activity_duration' => $booking->duration ?? $rentalDuration,
            'activity_type' => $booking->private_or_group ?? null,
            'number_of_people' => $booking->number_of_people ?? null,
            
            // Boat specific
            'departure_location' => isset($booking->listing->departure_location) ? $booking->listing->departure_location : $pickupLocation,
            'departure_date' => $booking->check_in ? \Carbon\Carbon::parse($booking->check_in)->format('Y-m-d') : null,
            'departure_time' => $booking->pickup_time ?? '10:00',
            
            // Driver service specific
            'service_duration' => $rentalDuration,
            'service_type' => $rentalHours >= 8 ? 'Full Day' : ($rentalHours >= 4 ? 'Half Day' : 'Hourly'),
            
            // Pricing calculations
            'daily_rate' => $dailyRate,
            'hourly_rate' => $hourlyRate,
            'price_per_person' => $pricePerPerson,
            'transmission' => isset($booking->listing->transmission) ? $booking->listing->transmission : 'Manual',
            
            // Pricing breakdown
            'booking_price' => $booking->booking_price,
            'addons' => $addons,
            'total_addons' => $booking->total_addons,
            'discount_or_extra' => $booking->discount_or_extra,
            'discount_label' => $booking->discount_or_extra < 0 ? 'Discount' : 'Extra Charge',
            'grand_total' => $booking->total_price,
            
            // Company info
            'company_email' => 'info@marhire.com',
            'company_phone' => '+212 660 745 055',
        ];
        
        return $data;
    }
}