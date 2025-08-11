<?php

require_once __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\EmailTemplate;

// Get English template
$englishTemplate = EmailTemplate::where('event_type', 'booking_received')
    ->where('locale', 'en')
    ->whereNull('category')
    ->first();

// Get French template
$frenchTemplate = EmailTemplate::where('event_type', 'booking_received')
    ->where('locale', 'fr')
    ->whereNull('category')
    ->first();

if ($englishTemplate && $frenchTemplate) {
    echo "COMPARING TEMPLATES\n";
    echo "===================\n\n";
    
    // Extract key elements from English template
    preg_match_all('/\{\{[^}]+\}\}/', $englishTemplate->body, $englishVars);
    preg_match_all('/\{\{[^}]+\}\}/', $frenchTemplate->body, $frenchVars);
    
    echo "Variables in English template:\n";
    foreach (array_unique($englishVars[0]) as $var) {
        echo "  - $var\n";
    }
    
    echo "\nVariables in French template:\n";
    foreach (array_unique($frenchVars[0]) as $var) {
        echo "  - $var\n";
    }
    
    echo "\nMissing in French:\n";
    $missing = array_diff($englishVars[0], $frenchVars[0]);
    foreach (array_unique($missing) as $var) {
        echo "  - $var\n";
    }
    
    // Check for specific HTML elements
    echo "\n\nChecking HTML elements:\n";
    echo "English has WhatsApp: " . (strpos($englishTemplate->body, 'whatsapp') !== false ? 'YES' : 'NO') . "\n";
    echo "French has WhatsApp: " . (strpos($frenchTemplate->body, 'whatsapp') !== false ? 'YES' : 'NO') . "\n";
    
    echo "English has phone: " . (strpos($englishTemplate->body, 'phone') !== false ? 'YES' : 'NO') . "\n";
    echo "French has phone: " . (strpos($frenchTemplate->body, 'phone') !== false ? 'YES' : 'NO') . "\n";
    
    echo "English has email link: " . (strpos($englishTemplate->body, 'mailto:') !== false ? 'YES' : 'NO') . "\n";
    echo "French has email link: " . (strpos($frenchTemplate->body, 'mailto:') !== false ? 'YES' : 'NO') . "\n";
    
    // Save templates to files for detailed comparison
    file_put_contents('english_template.html', $englishTemplate->body);
    file_put_contents('french_template.html', $frenchTemplate->body);
    echo "\n\nFull templates saved to english_template.html and french_template.html for comparison\n";
}