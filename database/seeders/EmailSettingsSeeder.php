<?php

namespace Database\Seeders;

use App\Models\EmailSetting;
use App\Models\Category;
use Illuminate\Database\Seeder;

class EmailSettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // General email settings
        EmailSetting::set('sender_email', env('MAIL_FROM_ADDRESS', 'noreply@marhire.com'));
        EmailSetting::set('sender_name', env('MAIL_FROM_NAME', 'MarHire'));
        EmailSetting::set('admin_email', env('MAIL_ADMIN_ADDRESS', 'admin@marhire.com'));
        EmailSetting::set('reminder_hours', 48);
        
        // Email types
        $emailTypes = ['booking_received', 'booking_confirmed', 'booking_cancelled', 'booking_reminder'];
        
        // Get all categories
        $categories = Category::all();
        
        // Enable all email types for all categories by default
        foreach ($categories as $category) {
            foreach ($emailTypes as $type) {
                $key = "{$category->slug}.{$type}";
                EmailSetting::set($key, true, $category->slug);
            }
        }
    }
}