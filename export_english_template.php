<?php

require_once __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\EmailTemplate;

// Get the original English template
$englishTemplate = EmailTemplate::where('event_type', 'booking_received')
    ->where('locale', 'en')
    ->first();

if ($englishTemplate) {
    // Save the full HTML
    file_put_contents('original_english_booking_received.html', $englishTemplate->body_html);
    echo "English template saved to original_english_booking_received.html\n";
    
    // Extract specific elements to check what might be missing
    $html = $englishTemplate->body_html;
    
    // Check for variables
    preg_match_all('/\{\{[^}]+\}\}/', $html, $variables);
    echo "\nVariables found in English template:\n";
    foreach (array_unique($variables[0]) as $var) {
        echo "  - $var\n";
    }
    
    // Check for specific content
    echo "\nContent checks:\n";
    echo "Has 'Invoice No'? " . (strpos($html, 'Invoice No') !== false ? 'YES' : 'NO') . "\n";
    echo "Has 'Status'? " . (strpos($html, 'Status') !== false ? 'YES' : 'NO') . "\n";
    echo "Has 'Service'? " . (strpos($html, 'Service') !== false ? 'YES' : 'NO') . "\n";
    echo "Has 'Check-in'? " . (strpos($html, 'Check-in') !== false ? 'YES' : 'NO') . "\n";
    echo "Has 'Check-out'? " . (strpos($html, 'Check-out') !== false ? 'YES' : 'NO') . "\n";
    echo "Has 'Total'? " . (strpos($html, 'Total') !== false ? 'YES' : 'NO') . "\n";
    echo "Has WhatsApp? " . (strpos($html, '660 745 055') !== false ? 'YES' : 'NO') . "\n";
    echo "Has Email? " . (strpos($html, 'info@marhire.com') !== false ? 'YES' : 'NO') . "\n";
}