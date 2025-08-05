<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class DatabaseTemplateEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $subject;
    public $htmlBody;
    public $pdfPath;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($subject, $htmlBody, $pdfPath = null)
    {
        $this->subject = $subject;
        $this->htmlBody = $htmlBody;
        $this->pdfPath = $pdfPath;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $mail = $this->subject($this->subject)
                     ->html($this->htmlBody);
        
        if ($this->pdfPath) {
            // Handle storage path
            $fullPath = storage_path('app/' . $this->pdfPath);
            if (file_exists($fullPath)) {
                $mail->attach($fullPath);
            }
        }
        
        return $mail;
    }
}