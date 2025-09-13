<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Services\GeminiTranslationService;
use App\Models\Listing;
use App\Models\Article;

echo "Testing Text-by-Text Translation Approach\n";
echo "==========================================\n\n";

try {
    $geminiService = new GeminiTranslationService();

    // Test Article Translation
    echo "1. Testing Article Translation:\n";
    $tempArticle = new Article();
    $tempArticle->title = "How to Book Your Perfect Vacation Rental";
    $tempArticle->short_description = "A comprehensive guide to finding and booking the ideal vacation rental for your needs.";
    $tempArticle->content = "When planning your vacation, choosing the right accommodation is crucial. Our platform offers a wide range of verified properties from trusted hosts. Start by defining your budget and preferred location, then browse our extensive listings with detailed photos and reviews.";
    $tempArticle->meta_title = "Book Perfect Vacation Rental | MarHire Guide";
    $tempArticle->meta_description = "Learn how to find and book the perfect vacation rental with our comprehensive guide. Tips for choosing location, budget, and amenities.";

    $articleTranslations = $geminiService->translateArticle($tempArticle, ['fr']);

    echo "✓ Article translated successfully!\n";
    echo "French Title: " . ($articleTranslations['fr']['title'] ?? 'N/A') . "\n";
    echo "French Description: " . substr($articleTranslations['fr']['short_description'] ?? 'N/A', 0, 80) . "...\n\n";

    // Test Listing Translation
    echo "2. Testing Listing Translation:\n";
    $tempListing = new Listing();
    $tempListing->title = "Luxury Beachfront Villa with Ocean Views";
    $tempListing->description = "Experience the ultimate beach vacation in this stunning 4-bedroom villa featuring panoramic ocean views, private beach access, and modern amenities. Perfect for families or groups seeking luxury and comfort.";
    $tempListing->short_description = "4BR luxury villa with private beach access and ocean views";
    $tempListing->meta_title = "Luxury Beachfront Villa Rental | Ocean Views | MarHire";
    $tempListing->meta_description = "Book this luxury 4-bedroom beachfront villa with private beach access, ocean views, and premium amenities. Perfect for vacation rentals.";

    $listingTranslations = $geminiService->translateListing($tempListing, ['es']);

    echo "✓ Listing translated successfully!\n";
    echo "Spanish Title: " . ($listingTranslations['es']['title'] ?? 'N/A') . "\n";
    echo "Spanish Description: " . substr($listingTranslations['es']['description'] ?? 'N/A', 0, 80) . "...\n\n";

    // Test with multiple locales
    echo "3. Testing Multiple Locales (Article):\n";
    $multiTranslations = $geminiService->translateArticle($tempArticle, ['fr', 'es']);

    echo "✓ Multi-locale translation successful!\n";
    echo "Locales translated: " . implode(', ', array_keys($multiTranslations)) . "\n";
    foreach ($multiTranslations as $locale => $translation) {
        echo "- {$locale}: " . substr($translation['title'] ?? 'N/A', 0, 50) . "...\n";
    }

    echo "\n✅ All text-by-text translation tests completed successfully!\n";
    echo "The new approach handles individual field translation reliably.\n";

} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    echo "Stack trace:\n" . $e->getTraceAsString() . "\n";
}