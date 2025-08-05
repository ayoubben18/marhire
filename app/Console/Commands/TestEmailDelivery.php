<?php

namespace App\Console\Commands;

use App\Models\Booking;
use App\Models\Listing;
use App\Services\Email\EmailService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class TestEmailDelivery extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'email:test 
                            {recipient : Email address to send test email to}
                            {--type=booking_confirmed : Email type to test}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test email deliverability by sending a test email';

    protected $emailService;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct(EmailService $emailService)
    {
        parent::__construct();
        $this->emailService = $emailService;
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $recipient = $this->argument('recipient');
        $emailType = $this->option('type');

        $this->info("Testing email delivery to: {$recipient}");
        $this->info("Email type: {$emailType}");

        // Create mock booking for testing
        $booking = $this->createMockBooking();

        // Send email using the service
        $result = $this->emailService->send($recipient, $emailType, $booking);
        
        if ($result) {
            $this->info("Email sent successfully!");
        } else {
            $this->error("Failed to send email. Check logs for details.");
            return 1;
        }

        // Display email configuration
        $this->displayEmailConfiguration();

        return 0;
    }

    private function createMockBooking(): Booking
    {
        $booking = new Booking();
        $booking->id = 99999;
        $booking->name = 'Test Customer';
        $booking->email = 'test@example.com';
        $booking->phone = '+1234567890';
        $booking->check_in = now()->addDays(7)->format('Y-m-d');
        $booking->check_out = now()->addDays(10)->format('Y-m-d');
        $booking->total_amount = 299.99;
        $booking->status = 'confirmed';
        $booking->reference = 'TEST-' . time();
        
        // Mock listing
        $listing = new Listing();
        $listing->title = 'Test Property - Luxury Villa';
        $listing->address = '123 Test Street, Test City';
        
        $booking->setRelation('listing', $listing);
        
        return $booking;
    }


    private function displayEmailConfiguration()
    {
        $this->info("\n=== Email Configuration ===");
        $this->table(
            ['Setting', 'Value'],
            [
                ['Mailer', config('mail.default')],
                ['Host', config('mail.mailers.smtp.host')],
                ['Port', config('mail.mailers.smtp.port')],
                ['Encryption', config('mail.mailers.smtp.encryption')],
                ['From Address', config('mail.from.address')],
                ['From Name', config('mail.from.name')],
                ['Admin Email', config('mail.admin_address')],
                ['Queue Connection', config('queue.default')]
            ]
        );

        $this->info("\n=== Email Authentication Status ===");
        $this->warn("Remember to configure SPF, DKIM, and DMARC records for production!");
        $this->info("See docs/email-setup/SPF-DKIM-DMARC.md for details");
    }
}
