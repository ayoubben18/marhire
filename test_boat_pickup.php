<?php
require_once __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\Booking;

echo "=== Boat Rental Bookings (Category 4) ===\n";

$bookings = Booking::where('category_id', 4)
    ->orderBy('updated_at', 'desc')
    ->limit(5)
    ->get(['id', 'pickup_time', 'duration', 'prefered_date', 'updated_at']);

if ($bookings->count() > 0) {
    foreach ($bookings as $booking) {
        echo "ID: {$booking->id}\n";
        echo "Pickup Time: " . ($booking->pickup_time ?? 'NULL') . "\n";
        echo "Duration: " . ($booking->duration ?? 'NULL') . "\n";
        echo "Preferred Date: " . ($booking->prefered_date ?? 'NULL') . "\n";
        echo "Updated: {$booking->updated_at}\n";
        echo "---\n";
    }
} else {
    echo "No boat rental bookings found.\n";
}
?>