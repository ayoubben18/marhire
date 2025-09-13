<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Gemini\Data\GenerationConfig;
use Gemini\Data\Schema;
use Gemini\Enums\DataType;
use Gemini\Enums\ResponseMimeType;

$apiKey = config('services.gemini.api_key');
$model = config('services.gemini.model');

echo "Testing structured translation with {$model}\n";
echo "API Key configured: " . (!empty($apiKey) ? 'Yes' : 'No') . "\n\n";

try {
    $client = Gemini::client($apiKey);

    // Create schema for structured output
    $schema = new Schema(
        type: DataType::OBJECT,
        properties: [
            'fr' => new Schema(
                type: DataType::OBJECT,
                properties: [
                    'title' => new Schema(type: DataType::STRING),
                    'description' => new Schema(type: DataType::STRING),
                ]
            ),
            'es' => new Schema(
                type: DataType::OBJECT,
                properties: [
                    'title' => new Schema(type: DataType::STRING),
                    'description' => new Schema(type: DataType::STRING),
                ]
            )
        ],
        required: ['fr', 'es']
    );

    $prompt = "Translate the following rental listing content from English to French and Spanish. " .
              "Maintain a professional, inviting tone suitable for tourists. " .
              "Content to translate: " .
              "Title: Beautiful Beach Villa " .
              "Description: A stunning beachfront villa with panoramic ocean views, perfect for your vacation.";

    $response = $client
        ->generativeModel($model)
        ->withGenerationConfig(
            new GenerationConfig(
                responseMimeType: ResponseMimeType::APPLICATION_JSON,
                responseSchema: $schema,
                temperature: 0.3,
                maxOutputTokens: 4096
            )
        )
        ->generateContent($prompt);

    $translations = (array) $response->json();

    echo "Success! Structured translation received:\n";

    // Debug: print the structure
    echo "Response structure:\n";
    print_r($translations);

    if (is_object($translations)) {
        echo "French Title: " . $translations->fr->title . "\n";
        echo "French Description: " . $translations->fr->description . "\n";
        echo "Spanish Title: " . $translations->es->title . "\n";
        echo "Spanish Description: " . $translations->es->description . "\n";
    } else {
        echo "French Title: " . (isset($translations['fr']->title) ? $translations['fr']->title : 'N/A') . "\n";
        echo "French Description: " . (isset($translations['fr']->description) ? $translations['fr']->description : 'N/A') . "\n";
        echo "Spanish Title: " . (isset($translations['es']->title) ? $translations['es']->title : 'N/A') . "\n";
        echo "Spanish Description: " . (isset($translations['es']->description) ? $translations['es']->description : 'N/A') . "\n";
    }

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}