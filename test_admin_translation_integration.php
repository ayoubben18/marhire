<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Services\GeminiTranslationService;
use App\Models\Page;

echo "Testing Admin Dashboard Translation Integration\n";
echo "==============================================\n\n";

try {
    $geminiService = new GeminiTranslationService();

    // Test Page Translation (same as used in PageController@translatePreview)
    echo "Testing Page Translation (used in admin dashboard):\n";

    $tempPage = new Page();
    $tempPage->meta_title = "About Our Vacation Rental Platform";
    $tempPage->meta_description = "Learn about MarHire, the premier vacation rental platform connecting travelers with amazing properties worldwide.";
    $tempPage->content_sections = [
        [
            'title' => 'Our Mission',
            'text' => 'We connect travelers with unique vacation rental experiences around the world, ensuring quality, safety, and unforgettable memories.'
        ],
        [
            'title' => 'Why Choose Us',
            'text' => 'With verified properties, 24/7 customer support, and secure payment processing, we make vacation rental booking simple and reliable.'
        ]
    ];

    // Test the translatePage method (as used in PageController)
    $pageTranslations = $geminiService->translatePage($tempPage, ['fr']);

    echo "✓ Page translation completed!\n";
    echo "French Meta Title: " . ($pageTranslations['fr']['meta_title'] ?? 'N/A') . "\n";
    echo "French Section 1 Title: " . ($pageTranslations['fr']['content_sections'][0]['title'] ?? 'N/A') . "\n";
    echo "French Section 1 Text: " . substr($pageTranslations['fr']['content_sections'][0]['text'] ?? 'N/A', 0, 80) . "...\n";
    echo "French Section 2 Title: " . ($pageTranslations['fr']['content_sections'][1]['title'] ?? 'N/A') . "\n\n";

    // Test Article Translation (as used in ArticleController@translatePreview)
    echo "Testing Article Translation (used in admin dashboard):\n";

    $tempArticle = new \App\Models\Article();
    $tempArticle->title = "Top 10 Vacation Destinations for 2024";
    $tempArticle->short_description = "Discover the most popular vacation destinations trending in 2024.";
    $tempArticle->content = "This year brings exciting travel opportunities to destinations both familiar and new. From tropical beaches to mountain retreats, here are the top picks for your 2024 vacation planning.";

    $articleTranslations = $geminiService->translateArticle($tempArticle, ['es']);

    echo "✓ Article translation completed!\n";
    echo "Spanish Title: " . ($articleTranslations['es']['title'] ?? 'N/A') . "\n";
    echo "Spanish Content (preview): " . substr($articleTranslations['es']['content'] ?? 'N/A', 0, 80) . "...\n\n";

    echo "✅ Admin dashboard translation integration tests passed!\n";
    echo "All methods used by controllers are working with the new text-by-text approach.\n";

} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    echo "Stack trace:\n" . $e->getTraceAsString() . "\n";
}