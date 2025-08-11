<?php

require_once __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\EmailTemplate;

// Get all templates
$templates = EmailTemplate::where('event_type', 'booking_received')
    ->orderBy('locale')
    ->get(['id', 'locale', 'category', 'subject']);

echo "Available booking_received templates:\n";
echo "=====================================\n";
foreach ($templates as $template) {
    echo "ID: {$template->id} | Locale: {$template->locale} | Category: " . ($template->category ?? 'NULL') . " | Subject: {$template->subject}\n";
}

// Get one English template with body
$englishTemplate = EmailTemplate::where('event_type', 'booking_received')
    ->where('locale', 'en')
    ->first();

if ($englishTemplate) {
    echo "\n\nEnglish Template Details:\n";
    echo "=========================\n";
    echo "Subject: {$englishTemplate->subject}\n";
    echo "Body length: " . strlen($englishTemplate->body) . " characters\n";
    echo "First 500 chars of body:\n";
    echo substr($englishTemplate->body, 0, 500) . "...\n";
    
    // Save it
    file_put_contents('actual_english_template.html', $englishTemplate->body);
    echo "\nSaved to actual_english_template.html\n";
}