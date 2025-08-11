<?php

require_once __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$columns = \Schema::getColumnListing('bookings');

echo "Bookings table columns:\n";
echo "=======================\n";
foreach ($columns as $column) {
    if (strpos($column, 'drop') !== false || strpos($column, 'language') !== false) {
        echo "- $column\n";
    }
}

echo "\nAll columns:\n";
echo implode(', ', $columns);