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
        if ($emailType === 'booking_confirmed' && $booking->status === 'confirmed' && !$pdfPath) {
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
            'booking_reference' => $booking->reference ?? 'N/A',
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
        $adminEmail = config('mail.admin_address', 'admin@marhire.com');
        
        $replacements = [
            '{{client_name}}' => $booking->name,
            '{{client_email}}' => $booking->email,
            '{{booking_reference}}' => $booking->reference ?? 'N/A',
            '{{booking_id}}' => $booking->id,
            '{{listing_title}}' => $booking->listing->title ?? 'N/A',
            '{{total_amount}}' => number_format($booking->total_amount, 2),
            '{{currency}}' => $booking->currency ?? '€',
            '{{admin_email}}' => $adminEmail,
            '{{check_in_date}}' => $booking->check_in ? $booking->check_in->format('M d, Y') : 'N/A',
            '{{check_out_date}}' => $booking->check_out ? $booking->check_out->format('M d, Y') : 'N/A',
        ];
        
        return str_replace(array_keys($replacements), array_values($replacements), $text);
    }
    
    protected function prepareInvoiceData(Booking $booking): array
    {
        return [
            'booking_id' => $booking->id,
            'invoice_number' => 'INV-' . $booking->id,
            'invoice_date' => now()->format('F d, Y'),
            'status' => ucfirst($booking->status),
            
            // Customer info
            'client_name' => $booking->name,
            'client_email' => $booking->email,
            'client_phone' => $booking->phone ?? 'N/A',
            
            // Booking details
            'service_name' => $booking->listing->title ?? 'N/A',
            'check_in' => $booking->check_in ? $booking->check_in->format('F d, Y') : 'N/A',
            'check_out' => $booking->check_out ? $booking->check_out->format('F d, Y') : 'N/A',
            'total_amount' => $booking->total_amount,
            
            // Company info
            'company_email' => 'info@marhire.com',
            'company_phone' => '+212 660 745 055',
        ];
    }
}