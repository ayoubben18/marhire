<?php

namespace App\Console\Commands;

use App\Models\Booking;
use App\Services\Email\EmailService;
use App\Services\PDFService;
use Illuminate\Console\Command;

class TestPDFInvoice extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:pdf-invoice {booking_id?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test PDF invoice generation and email attachment';

    protected $pdfService;
    protected $emailService;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct(PDFService $pdfService, EmailService $emailService)
    {
        parent::__construct();
        $this->pdfService = $pdfService;
        $this->emailService = $emailService;
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $bookingId = $this->argument('booking_id');
        
        // Get a confirmed booking
        $query = Booking::with('listing');
        if ($bookingId) {
            $booking = $query->find($bookingId);
        } else {
            $booking = $query->where('status', 'confirmed')->first();
            if (!$booking) {
                $booking = $query->first();
            }
        }

        if (!$booking) {
            $this->error('No bookings found in database');
            return 1;
        }

        $this->info('Testing with booking #' . $booking->id);
        $this->info('Customer: ' . $booking->name);
        $this->info('Status: ' . $booking->status);

        // Test PDF generation
        $this->info("\n--- Testing PDF Generation ---");
        try {
            $invoiceData = [
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

            $pdfPath = $this->pdfService->generateInvoice($invoiceData);
            $this->info('✓ PDF generated successfully: ' . $pdfPath);
            
            $fullPath = storage_path('app/' . $pdfPath);
            if (file_exists($fullPath)) {
                $fileSize = filesize($fullPath);
                $this->info('✓ PDF file exists, size: ' . number_format($fileSize / 1024, 2) . ' KB');
            } else {
                $this->error('✗ PDF file not found at: ' . $fullPath);
            }
        } catch (\Exception $e) {
            $this->error('✗ PDF generation failed: ' . $e->getMessage());
            return 1;
        }

        // Test email with PDF attachment
        if ($this->confirm('Do you want to send a test email with the PDF attached?')) {
            $email = $this->ask('Enter email address to send test email to:', $booking->email);
            
            $this->info("\n--- Testing Email with PDF Attachment ---");
            
            // Temporarily set booking status to confirmed for testing
            $originalStatus = $booking->status;
            $booking->status = 'confirmed';
            
            try {
                $result = $this->emailService->send($email, 'booking_confirmed', $booking);
                
                if ($result) {
                    $this->info('✓ Email sent successfully to ' . $email);
                    $this->info('✓ PDF should be attached as invoice-' . $booking->id . '.pdf');
                } else {
                    $this->error('✗ Email sending failed');
                }
            } catch (\Exception $e) {
                $this->error('✗ Email sending error: ' . $e->getMessage());
            } finally {
                // Restore original status
                $booking->status = $originalStatus;
            }
        }

        $this->info("\n--- Test Complete ---");
        return 0;
    }
}