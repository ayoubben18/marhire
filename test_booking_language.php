<?php

// Test script to verify booking language is correctly captured

require_once __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\Booking;
use App\Models\EmailTemplate;

// Get the most recent booking
$latestBooking = Booking::latest()->first();

if ($latestBooking) {
    echo "Latest Booking Details:\n";
    echo "======================\n";
    echo "Booking ID: " . $latestBooking->id . "\n";
    echo "Customer Name: " . $latestBooking->customer_name . "\n";
    echo "Customer Email: " . $latestBooking->customer_email . "\n";
    echo "Booking Language: " . ($latestBooking->booking_language ?? 'Not set') . "\n";
    echo "Created At: " . $latestBooking->created_at . "\n\n";
    
    // Check if email templates exist for this language
    if ($latestBooking->booking_language) {
        $templates = EmailTemplate::where('locale', $latestBooking->booking_language)
            ->where('is_active', true)
            ->get();
        
        echo "Email Templates for Language '{$latestBooking->booking_language}':\n";
        echo "================================================\n";
        
        if ($templates->count() > 0) {
            foreach ($templates as $template) {
                echo "- {$template->event_type} (Category: " . ($template->category ?? 'General') . ")\n";
            }
        } else {
            echo "No templates found for this language.\n";
            
            // Check fallback
            $fallbackTemplates = EmailTemplate::where('locale', 'en')
                ->where('is_active', true)
                ->get();
            
            echo "\nEnglish Fallback Templates Available:\n";
            echo "=====================================\n";
            foreach ($fallbackTemplates as $template) {
                echo "- {$template->event_type} (Category: " . ($template->category ?? 'General') . ")\n";
            }
        }
    }
} else {
    echo "No bookings found in the database.\n";
}

// Show available locales
echo "\n\nConfigured Locales:\n";
echo "==================\n";
$supportedLocales = config('app.supported_locales', ['en']);
foreach ($supportedLocales as $locale) {
    $templateCount = EmailTemplate::where('locale', $locale)->count();
    echo "- $locale: $templateCount email templates\n";
}

echo "\nFallback Locale: " . config('app.fallback_locale', 'en') . "\n";