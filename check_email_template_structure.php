<?php

require_once __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$columns = \Schema::getColumnListing('email_templates');

echo "Email Templates table columns:\n";
echo "=============================\n";
foreach ($columns as $column) {
    echo "- $column\n";
}