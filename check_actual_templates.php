<?php

require_once __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\EmailTemplate;

// Get English template with specific ID
$englishTemplate = EmailTemplate::find(1);

if ($englishTemplate) {
    echo "Template ID 1:\n";
    echo "==============\n";
    echo "Event Type: {$englishTemplate->event_type}\n";
    echo "Locale: {$englishTemplate->locale}\n";
    echo "Subject: {$englishTemplate->subject}\n";
    echo "Body HTML length: " . strlen($englishTemplate->body_html) . "\n";
    echo "Default Body HTML length: " . strlen($englishTemplate->default_body_html) . "\n";
    
    // Check if body_html has content
    if (strlen($englishTemplate->body_html) > 0) {
        echo "\nFirst 200 chars of body_html:\n";
        echo substr($englishTemplate->body_html, 0, 200) . "...\n";
    } else {
        echo "\nbody_html is EMPTY!\n";
    }
}

// Get all templates and check body content
$templates = EmailTemplate::all();
echo "\n\nAll Templates Summary:\n";
echo "=====================\n";
foreach ($templates as $template) {
    $bodyLen = strlen($template->body_html);
    echo "ID {$template->id}: {$template->locale} - {$template->event_type} - Body length: {$bodyLen}\n";
}