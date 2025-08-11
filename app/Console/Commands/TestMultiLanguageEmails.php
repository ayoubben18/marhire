<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Booking;
use App\Services\Email\EmailServiceInterface;

class TestMultiLanguageEmails extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'email:test-multilingual {booking_id?} {--locale=all : Locale to test (en, fr, es, or all)}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test multi-language email templates';

    protected $emailService;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct(EmailServiceInterface $emailService)
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
        $bookingId = $this->argument('booking_id');
        $locale = $this->option('locale');
        
        // Get a booking to test with
        if ($bookingId) {
            $booking = Booking::find($bookingId);
            if (!$booking) {
                $this->error("Booking with ID {$bookingId} not found.");
                return 1;
            }
        } else {
            $booking = Booking::with('listing')->latest()->first();
            if (!$booking) {
                $this->error("No bookings found in database.");
                return 1;
            }
        }
        
        $this->info("Testing emails for Booking #{$booking->id}");
        $this->info("Customer: {$booking->name} ({$booking->email})");
        $this->info("Service: " . ($booking->listing->title ?? 'N/A'));
        $this->line('');
        
        // Determine which locales to test
        $locales = [];
        if ($locale === 'all') {
            $locales = ['en', 'fr', 'es'];
        } elseif (in_array($locale, ['en', 'fr', 'es'])) {
            $locales = [$locale];
        } else {
            $this->error("Invalid locale. Use 'en', 'fr', 'es', or 'all'.");
            return 1;
        }
        
        // Test each locale
        $emailTypes = ['booking_received', 'booking_confirmed', 'booking_cancelled', 'booking_reminder'];
        
        foreach ($locales as $testLocale) {
            $this->info("Testing {$testLocale} locale:");
            $this->line(str_repeat('-', 40));
            
            foreach ($emailTypes as $emailType) {
                $this->line("  Testing {$emailType}...");
                
                try {
                    // Test sending email with specific locale
                    $result = $this->emailService->send(
                        $booking->email,
                        $emailType,
                        $booking,
                        null,
                        $testLocale
                    );
                    
                    if ($result) {
                        $this->info("  ✓ {$emailType} sent successfully in {$testLocale}");
                    } else {
                        $this->warn("  ✗ {$emailType} failed to send in {$testLocale}");
                    }
                } catch (\Exception $e) {
                    $this->error("  ✗ Error sending {$emailType} in {$testLocale}: " . $e->getMessage());
                }
            }
            
            $this->line('');
        }
        
        $this->info('Email testing completed!');
        $this->info('Check your email inbox for the test emails.');
        
        return 0;
    }
}