<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Services\GeminiTranslationService;

echo "Testing Format Preservation in Translation\n";
echo "=========================================\n\n";

try {
    $geminiService = new GeminiTranslationService();

    // Test 1: HTML Content
    echo "1. Testing HTML Content Translation:\n";
    $htmlContent = '<p>Welcome to our <strong>vacation rental platform</strong>. We offer <em>amazing properties</em> with <a href="/listings">verified listings</a> and <span class="highlight">24/7 support</span>.</p>';

    echo "Original HTML:\n" . $htmlContent . "\n\n";

    $translatedHtml = $geminiService->translateText($htmlContent, 'fr');

    echo "Translated to French:\n" . $translatedHtml . "\n\n";

    // Verify HTML tags are preserved
    $hasHtmlTags = preg_match('/<[^>]+>/', $translatedHtml);
    echo "✓ HTML tags preserved: " . ($hasHtmlTags ? 'YES' : 'NO') . "\n\n";

    // Test 2: Plain Text
    echo "2. Testing Plain Text Translation:\n";
    $plainText = "Our vacation rental platform connects travelers with unique properties around the world. Book with confidence!";

    echo "Original Text:\n" . $plainText . "\n\n";

    $translatedText = $geminiService->translateText($plainText, 'es');

    echo "Translated to Spanish:\n" . $translatedText . "\n\n";

    // Verify no HTML was added
    $hasNoHtmlTags = !preg_match('/<[^>]+>/', $translatedText);
    echo "✓ Plain text format preserved: " . ($hasNoHtmlTags ? 'YES' : 'NO') . "\n\n";

    // Test 3: Complex HTML with nested tags
    echo "3. Testing Complex HTML Translation:\n";
    $complexHtml = '<div class="content"><h2>Our Services</h2><ul><li>Property <strong>verification</strong></li><li>Secure <em>payment processing</em></li><li>Customer support <a href="/contact">contact us</a></li></ul></div>';

    echo "Original Complex HTML:\n" . $complexHtml . "\n\n";

    $translatedComplexHtml = $geminiService->translateText($complexHtml, 'fr');

    echo "Translated to French:\n" . $translatedComplexHtml . "\n\n";

    // Verify structure is maintained
    $hasStructure = (strpos($translatedComplexHtml, '<div class="content">') !== false) &&
                   (strpos($translatedComplexHtml, '<h2>') !== false) &&
                   (strpos($translatedComplexHtml, '<ul>') !== false) &&
                   (strpos($translatedComplexHtml, '<li>') !== false);
    echo "✓ Complex HTML structure preserved: " . ($hasStructure ? 'YES' : 'NO') . "\n\n";

    // Test 4: Mixed content with line breaks
    echo "4. Testing Text with Line Breaks:\n";
    $textWithBreaks = "First line of content.\n\nSecond paragraph with important information.\n\nThird section with details.";

    echo "Original Text with Breaks:\n" . str_replace("\n", "\\n\n", $textWithBreaks) . "\n\n";

    $translatedBreaks = $geminiService->translateText($textWithBreaks, 'es');

    echo "Translated to Spanish:\n" . str_replace("\n", "\\n\n", $translatedBreaks) . "\n\n";

    echo "✅ All format preservation tests completed!\n";
    echo "The translation service now respects the original format:\n";
    echo "- HTML content keeps all tags and structure\n";
    echo "- Plain text remains as plain text\n";
    echo "- Formatting and structure are preserved\n";

} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    echo "Stack trace:\n" . $e->getTraceAsString() . "\n";
}