<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Listing;

$listing = Listing::where('slug', 'a-nice-car-for-rental')->first();

if ($listing) {
    echo "Found listing: " . $listing->title . " (ID: " . $listing->id . ")\n";
    echo "Current deposit_required: " . ($listing->deposit_required ? 'Yes' : 'No') . "\n";
    echo "Current deposit_amount: " . $listing->deposit_amount . "\n\n";
    
    $listing->deposit_required = true;
    $listing->deposit_amount = 100;
    $listing->save();
    
    echo "Updated successfully!\n";
    echo "New deposit_required: " . ($listing->deposit_required ? 'Yes' : 'No') . "\n";
    echo "New deposit_amount: " . $listing->deposit_amount . "\n";
} else {
    echo "Listing with slug 'a-nice-car-for-rental' not found.\n";
}