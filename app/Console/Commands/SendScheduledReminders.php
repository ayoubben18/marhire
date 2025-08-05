<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\ScheduledReminder;
use App\Models\EmailSetting;
use App\Services\Email\EmailServiceInterface;

class SendScheduledReminders extends Command
{
    protected $signature = 'reminders:send';
    protected $description = 'Send scheduled booking reminders';
    
    public function handle()
    {
        $reminders = ScheduledReminder::where('status', 'pending')
            ->where('send_at', '<=', now())
            ->with('booking.listing.category')
            ->get();
        
        $emailService = app(EmailServiceInterface::class);
        
        foreach ($reminders as $reminder) {
            if ($reminder->booking->status !== 'confirmed') {
                $reminder->update(['status' => 'cancelled']);
                continue;
            }
            
            // Check if reminders are enabled for this category
            if (EmailSetting::isEmailEnabled($reminder->booking->listing->category, 'booking_reminder')) {
                // Send to customer
                $emailService->send(
                    $reminder->booking->email,
                    'booking_reminder',
                    $reminder->booking
                );
                
                // Send to admin
                $emailService->send(
                    EmailSetting::getAdminEmail(),
                    'booking_reminder',
                    $reminder->booking
                );
            }
            
            $reminder->update(['status' => 'sent']);
        }
        
        $this->info("Processed {$reminders->count()} reminders");
    }
}