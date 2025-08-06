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
                $pdfPath = $this->pdfService->generateInvoice($invoiceData);
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
        // Handle date formatting properly
        $checkInDate = $booking->check_in;
        $checkOutDate = $booking->check_out;
        
        // Format dates if they exist
        if ($checkInDate && !is_string($checkInDate)) {
            $checkInDate = \Carbon\Carbon::parse($checkInDate)->format('M d, Y');
        } elseif ($checkInDate && is_string($checkInDate)) {
            $checkInDate = \Carbon\Carbon::parse($checkInDate)->format('M d, Y');
        }
        
        if ($checkOutDate && !is_string($checkOutDate)) {
            $checkOutDate = \Carbon\Carbon::parse($checkOutDate)->format('M d, Y');
        } elseif ($checkOutDate && is_string($checkOutDate)) {
            $checkOutDate = \Carbon\Carbon::parse($checkOutDate)->format('M d, Y');
        }
        
        $replacements = [
            '{{client_name}}' => $booking->name,
            '{{client_email}}' => $booking->email,
            '{{booking_reference}}' => $booking->invoice_no ?: 'N/A', // Use stored invoice_no
            '{{invoice_no}}' => $booking->invoice_no ?: 'N/A', // Use stored invoice_no
            '{{booking_id}}' => $booking->id,
            '{{listing_title}}' => $booking->listing->title ?? 'N/A',
            '{{service}}' => $booking->listing->title ?? 'N/A',
            '{{total_amount}}' => number_format($booking->total_amount, 2), // No currency symbol here
            '{{total}}' => number_format($booking->total_amount, 2), // No currency symbol here
            '{{currency}}' => '€', // Currency symbol separate
            '{{admin_email}}' => EmailSetting::getAdminEmail(),
            '{{check_in_date}}' => $checkInDate ?: 'N/A',
            '{{check_out_date}}' => $checkOutDate ?: 'N/A',
            '{{check_in}}' => $checkInDate ?: 'N/A',
            '{{check_out}}' => $checkOutDate ?: 'N/A',
        ];
        
        return str_replace(array_keys($replacements), array_values($replacements), $text);
    }
    
    protected function prepareInvoiceData(Booking $booking): array
    {
        // Load booking addons with their details
        $booking->load('addons.addon');
        
        // Prepare addons array for display
        $addons = [];
        foreach ($booking->addons as $bookingAddon) {
            $addons[] = [
                'name' => $bookingAddon->addon->addon ?? 'Unknown Addon',
                'price' => $bookingAddon->price
            ];
        }
        
        return [
            'booking_id' => $booking->id,
            'invoice_number' => $booking->invoice_no ?? ('INV-' . $booking->id),
            'invoice_date' => now()->format('F d, Y'),
            'status' => ucfirst($booking->status),
            
            // Customer info
            'client_name' => $booking->name,
            'client_email' => $booking->email,
            'client_phone' => $booking->whatsapp ?? $booking->whatsapp_number ?? 'N/A',
            
            // Booking details
            'service_name' => $booking->listing->title ?? 'N/A',
            'check_in' => $booking->check_in ? \Carbon\Carbon::parse($booking->check_in)->format('F d, Y') : 'N/A',
            'check_out' => $booking->check_out ? \Carbon\Carbon::parse($booking->check_out)->format('F d, Y') : 'N/A',
            'total_amount' => $booking->total_amount,
            
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
    }
}