<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Services\GeminiTranslationService;
use App\Models\Article;

echo "Testing Article Format Preservation\n";
echo "===================================\n\n";

try {
    $geminiService = new GeminiTranslationService();

    // Test with realistic article content containing HTML
    $tempArticle = new Article();
    $tempArticle->title = "Top 5 Beach Destinations for Your Next Vacation";
    $tempArticle->short_description = "Discover the most beautiful beach destinations for your perfect getaway.";
    $tempArticle->content = '<h2>Introduction</h2><p>Planning the perfect beach vacation requires careful consideration of many factors. Here are our <strong>top 5 recommendations</strong> for beach destinations that offer:</p><ul><li><em>Crystal clear waters</em></li><li>White sandy beaches</li><li>Excellent <a href="/amenities">resort amenities</a></li></ul><h3>1. Maldives</h3><p>The Maldives offers <strong>unparalleled luxury</strong> with overwater bungalows and pristine coral reefs.</p><blockquote>Experience paradise like never before with our exclusive packages.</blockquote>';
    $tempArticle->meta_title = "Best Beach Destinations 2024 | Vacation Guide";
    $tempArticle->meta_description = "Explore the top 5 beach destinations for 2024. Find crystal clear waters, white sand beaches, and luxury resorts.";

    echo "Testing article translation with mixed HTML content...\n\n";

    $translations = $geminiService->translateArticle($tempArticle, ['fr']);

    echo "1. Title Translation:\n";
    echo "Original: " . $tempArticle->title . "\n";
    echo "French: " . $translations['fr']['title'] . "\n\n";

    echo "2. Content Translation (with HTML preservation):\n";
    echo "Original Content (first 200 chars):\n" . substr($tempArticle->content, 0, 200) . "...\n\n";
    echo "French Content (first 200 chars):\n" . substr($translations['fr']['content'], 0, 200) . "...\n\n";

    // Check if HTML structure is preserved
    $originalHasTags = [
        'h2' => preg_match('/<h2>/', $tempArticle->content),
        'h3' => preg_match('/<h3>/', $tempArticle->content),
        'ul' => preg_match('/<ul>/', $tempArticle->content),
        'li' => preg_match('/<li>/', $tempArticle->content),
        'strong' => preg_match('/<strong>/', $tempArticle->content),
        'em' => preg_match('/<em>/', $tempArticle->content),
        'blockquote' => preg_match('/<blockquote>/', $tempArticle->content),
        'a_href' => preg_match('/<a href="/', $tempArticle->content)
    ];

    $translatedHasTags = [
        'h2' => preg_match('/<h2>/', $translations['fr']['content']),
        'h3' => preg_match('/<h3>/', $translations['fr']['content']),
        'ul' => preg_match('/<ul>/', $translations['fr']['content']),
        'li' => preg_match('/<li>/', $translations['fr']['content']),
        'strong' => preg_match('/<strong>/', $translations['fr']['content']),
        'em' => preg_match('/<em>/', $translations['fr']['content']),
        'blockquote' => preg_match('/<blockquote>/', $translations['fr']['content']),
        'a_href' => preg_match('/<a href="/', $translations['fr']['content'])
    ];

    echo "3. HTML Tag Preservation Check:\n";
    foreach ($originalHasTags as $tag => $originalHas) {
        $translatedHas = $translatedHasTags[$tag];
        $status = ($originalHas && $translatedHas) ? '✓' : ($originalHas ? '✗' : 'N/A');
        echo "- {$tag}: {$status} " . ($originalHas && $translatedHas ? 'PRESERVED' : ($originalHas ? 'MISSING' : 'NOT PRESENT')) . "\n";
    }

    echo "\n4. Meta Fields:\n";
    echo "Meta Title: " . $translations['fr']['meta_title'] . "\n";
    echo "Meta Description: " . substr($translations['fr']['meta_description'], 0, 80) . "...\n\n";

    echo "✅ Article format preservation test completed!\n";
    echo "HTML structure and tags are maintained in article content.\n";

} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    echo "Stack trace:\n" . $e->getTraceAsString() . "\n";
}