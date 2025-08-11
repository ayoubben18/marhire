<?php

require_once __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\Booking;

// Get recent bookings
$bookings = Booking::orderBy('id', 'desc')->take(5)->get(['id', 'email', 'booking_language', 'created_at']);

echo "Recent Bookings:\n";
echo "================\n";
foreach ($bookings as $booking) {
    echo "ID: {$booking->id} | Language: " . ($booking->booking_language ?? 'NULL') . " | Created: {$booking->created_at}\n";
}

// Get the most recent booking with full details
$latestBooking = Booking::latest()->first();
if ($latestBooking) {
    echo "\nLatest Booking Full Details:\n";
    echo "============================\n";
    echo "ID: {$latestBooking->id}\n";
    echo "Email: {$latestBooking->email}\n";
    echo "Booking Language: " . ($latestBooking->booking_language ?? 'NULL') . "\n";
    echo "Status: {$latestBooking->status}\n";
    echo "Created: {$latestBooking->created_at}\n";
}