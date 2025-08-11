<?php

require_once __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\Booking;
use App\Models\EmailTemplate;

// Test that booking_language is now fillable
$testData = [
    'category_id' => 2,
    'listing_id' => 1,
    'first_name' => 'Test',
    'last_name' => 'User',
    'email' => 'test@example.com',
    'whatsapp' => '+123456789',
    'country' => 'France',
    'status' => 'Test',
    'booking_price' => 100,
    'total_price' => 100,
    'booking_language' => 'fr',  // This should now be saved!
    'booking_source' => 'Test Script'
];

echo "Testing booking_language field is now fillable...\n";
echo "================================================\n\n";

// Create a test booking
$booking = new Booking($testData);
$filledAttributes = $booking->getAttributes();

if (isset($filledAttributes['booking_language'])) {
    echo "✅ SUCCESS: booking_language is now fillable!\n";
    echo "   Value: " . $filledAttributes['booking_language'] . "\n";
} else {
    echo "❌ FAILED: booking_language is still not fillable\n";
}

// Check if we have French email templates
echo "\n\nChecking available email templates:\n";
echo "===================================\n";

$locales = ['en', 'fr', 'es'];
foreach ($locales as $locale) {
    $count = EmailTemplate::where('locale', $locale)
        ->where('event_type', 'booking_received')
        ->count();
    echo "- $locale: $count 'booking_received' templates\n";
}

// Clean up - don't save test booking
echo "\n\n✅ Test complete! The booking_language field should now work correctly.\n";