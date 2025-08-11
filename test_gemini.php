<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Services\GeminiTranslationService;
use Illuminate\Support\Facades\Http;

$apiKey = config('services.gemini.api_key');
echo "API Key configured: " . (!empty($apiKey) ? 'Yes' : 'No') . "\n";
echo "API Key length: " . strlen($apiKey) . "\n";

// Test simple API call
$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" . $apiKey;

$response = Http::withHeaders([
    'Content-Type' => 'application/json',
])
->timeout(30)
->post($url, [
    'contents' => [
        [
            'parts' => [
                ['text' => 'Translate this to French: Hello world']
            ]
        ]
    ]
]);

echo "Response Status: " . $response->status() . "\n";

if ($response->successful()) {
    echo "Success!\n";
    $data = $response->json();
    if (isset($data['candidates'][0]['content']['parts'][0]['text'])) {
        echo "Translation: " . $data['candidates'][0]['content']['parts'][0]['text'] . "\n";
    }
} else {
    echo "Error: " . $response->body() . "\n";
}