<?php

namespace App\Mail;

use App\Models\EmailLog;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SimpleBookingEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $emailLog;
    public $booking;

    public function __construct(EmailLog $emailLog)
    {
        $this->emailLog = $emailLog;
        $this->booking = $emailLog->booking;
    }

    public function build()
    {
        $subject = $this->getSubject();
        $view = $this->getViewName();

        $email = $this->subject($subject)
            ->view($view)
            ->with([
                'booking' => $this->booking,
                'emailData' => $this->emailLog->email_data
            ]);

        // Attach PDF if exists
        if ($this->emailLog->pdf_path) {
            // Handle storage path
            $fullPath = storage_path('app/' . $this->emailLog->pdf_path);
            if (file_exists($fullPath)) {
                $email->attach($fullPath, [
                    'as' => 'invoice-' . $this->booking->id . '.pdf',
                    'mime' => 'application/pdf'
                ]);
            }
        }

        return $email;
    }

    private function getSubject(): string
    {
        switch ($this->emailLog->email_type) {
            case 'booking_received':
                return 'Booking Received - Confirmation #' . $this->booking->id;
            case 'booking_confirmed':
                return 'Booking Confirmed - #' . $this->booking->id;
            case 'booking_cancelled':
                return 'Booking Cancelled - #' . $this->booking->id;
            case 'booking_reminder':
                return 'Upcoming Booking Reminder - #' . $this->booking->id;
            default:
                return 'MarHire Booking Update - #' . $this->booking->id;
        }
    }

    private function getViewName(): string
    {
        // Use simple default template for all emails
        return 'emails.booking.simple';
    }
}