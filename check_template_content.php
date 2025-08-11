<?php

require_once __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\EmailTemplate;

// Get a French template to check
$frenchTemplate = EmailTemplate::where('event_type', 'booking_received')
    ->where('locale', 'fr')
    ->whereNull('category')
    ->first();

if ($frenchTemplate) {
    echo "French Template Found:\n";
    echo "======================\n";
    echo "ID: {$frenchTemplate->id}\n";
    echo "Subject: {$frenchTemplate->subject}\n";
    echo "Body length: " . strlen($frenchTemplate->body_html) . "\n\n";
    
    // Check for key elements
    echo "Content checks:\n";
    echo "Has 'Start:'? " . (strpos($frenchTemplate->body_html, 'Start:') !== false ? 'YES' : 'NO') . "\n";
    echo "Has 'Début:'? " . (strpos($frenchTemplate->body_html, 'Début:') !== false ? 'YES' : 'NO') . "\n";
    echo "Has 'Phone:'? " . (strpos($frenchTemplate->body_html, 'Phone:') !== false ? 'YES' : 'NO') . "\n";
    echo "Has 'Téléphone:'? " . (strpos($frenchTemplate->body_html, 'Téléphone:') !== false ? 'YES' : 'NO') . "\n";
    echo "Has 'Date de naissance:'? " . (strpos($frenchTemplate->body_html, 'Date de naissance:') !== false ? 'YES' : 'NO') . "\n";
    echo "Has 'Note:'? " . (strpos($frenchTemplate->body_html, 'Note:') !== false ? 'YES' : 'NO') . "\n";
    echo "Has {{client_phone}}? " . (strpos($frenchTemplate->body_html, '{{client_phone}}') !== false ? 'YES' : 'NO') . "\n";
    echo "Has {{client_dob}}? " . (strpos($frenchTemplate->body_html, '{{client_dob}}') !== false ? 'YES' : 'NO') . "\n";
    echo "Has {{client_notes}}? " . (strpos($frenchTemplate->body_html, '{{client_notes}}') !== false ? 'YES' : 'NO') . "\n";
    
    // Save to file to inspect
    file_put_contents('current_french_template.html', $frenchTemplate->body_html);
    echo "\nTemplate saved to current_french_template.html\n";
}

// Check all templates
echo "\n\nAll Templates in Database:\n";
echo "==========================\n";
$templates = EmailTemplate::orderBy('locale')->orderBy('event_type')->get();
foreach ($templates as $t) {
    $hasPhone = strpos($t->body_html, '{{client_phone}}') !== false;
    $hasDob = strpos($t->body_html, '{{client_dob}}') !== false;
    $hasNotes = strpos($t->body_html, '{{client_notes}}') !== false;
    echo "{$t->locale} - {$t->event_type}: Phone=" . ($hasPhone ? 'Y' : 'N') . 
         " DOB=" . ($hasDob ? 'Y' : 'N') . 
         " Notes=" . ($hasNotes ? 'Y' : 'N') . "\n";
}