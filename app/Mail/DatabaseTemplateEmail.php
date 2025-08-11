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
    public $locale;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($subject, $htmlBody, $pdfPath = null, $locale = 'en')
    {
        $this->subject = $subject;
        $this->htmlBody = $htmlBody;
        $this->pdfPath = $pdfPath;
        
        // Validate and set locale
        $supportedLocales = config('app.supported_locales', ['en']);
        // Ensure $supportedLocales is an array even if config returns null
        $supportedLocales = is_array($supportedLocales) ? $supportedLocales : ['en'];
        $this->locale = in_array($locale, $supportedLocales) ? $locale : config('app.fallback_locale', 'en');
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
                $mail->attach($fullPath, [
                    'as' => 'invoice.pdf',
                    'mime' => 'application/pdf',
                ]);
                
                // Log successful attachment
                \Log::info('PDF attached to email', [
                    'pdf_path' => $this->pdfPath,
                    'full_path' => $fullPath,
                    'file_exists' => file_exists($fullPath)
                ]);
            } else {
                \Log::warning('PDF file not found for attachment', [
                    'pdf_path' => $this->pdfPath,
                    'full_path' => $fullPath
                ]);
            }
        }
        
        return $mail;
    }
}