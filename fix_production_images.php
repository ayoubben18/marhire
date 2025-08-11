<?php
/**
 * Production Image Fix Script
 * This script fixes image display issues and converts existing images to WebP
 * Run this on your production server to fix all image-related issues
 * 
 * Usage: php fix_production_images.php
 */

// Load Laravel
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

echo "\n===========================================\n";
echo "  PRODUCTION IMAGE FIX SCRIPT\n";
echo "===========================================\n\n";

// Step 1: Fix database paths (add leading slash)
echo "Step 1: Fixing database image paths...\n";
echo "---------------------------------------\n";

try {
    // Fix listing_galleries table
    $affectedGalleries = DB::table('listing_galleries')
        ->whereNotNull('file_path')
        ->where('file_path', '!=', '')
        ->where('file_path', 'NOT LIKE', '/%')
        ->where('file_path', 'NOT LIKE', 'http%')
        ->update(['file_path' => DB::raw("CONCAT('/', file_path)")]);
    
    echo "✅ Fixed {$affectedGalleries} gallery image paths\n";
    
    // Check if there's a listings.image column and fix it too
    $hasImageColumn = DB::getSchemaBuilder()->hasColumn('listings', 'image');
    if ($hasImageColumn) {
        $affectedListings = DB::table('listings')
            ->whereNotNull('image')
            ->where('image', '!=', '')
            ->where('image', 'NOT LIKE', '/%')
            ->where('image', 'NOT LIKE', 'http%')
            ->update(['image' => DB::raw("CONCAT('/', image)")]);
        
        echo "✅ Fixed {$affectedListings} listing image paths\n";
    }
    
} catch (Exception $e) {
    echo "⚠️  Error fixing database paths: " . $e->getMessage() . "\n";
}

echo "\n";

// Step 2: Convert existing images to WebP
echo "Step 2: Converting images to WebP format...\n";
echo "--------------------------------------------\n";

$imagesPath = public_path('images/listings');

if (!File::exists($imagesPath)) {
    echo "⚠️  Images directory not found: {$imagesPath}\n";
    echo "   Creating directory...\n";
    File::makeDirectory($imagesPath, 0755, true);
}

// Get all image files
$jpgFiles = File::glob($imagesPath . '/*.jpg');
$jpegFiles = File::glob($imagesPath . '/*.jpeg');
$pngFiles = File::glob($imagesPath . '/*.png');
$gifFiles = File::glob($imagesPath . '/*.gif');

$allFiles = array_merge($jpgFiles, $jpegFiles, $pngFiles, $gifFiles);
$totalFiles = count($allFiles);

if ($totalFiles === 0) {
    echo "ℹ️  No images found to convert\n";
} else {
    echo "Found {$totalFiles} images to process\n\n";
    
    $convertedCount = 0;
    $skippedCount = 0;
    $errorCount = 0;
    
    foreach ($allFiles as $filePath) {
        $filename = basename($filePath);
        $webpPath = pathinfo($filePath, PATHINFO_DIRNAME) . '/' . 
                    pathinfo($filePath, PATHINFO_FILENAME) . '.webp';
        
        // Skip if WebP already exists
        if (File::exists($webpPath)) {
            echo "  ⏭️  {$filename} - WebP already exists\n";
            $skippedCount++;
            continue;
        }
        
        // Convert to WebP
        $extension = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));
        $image = null;
        
        try {
            switch ($extension) {
                case 'jpg':
                case 'jpeg':
                    $image = @imagecreatefromjpeg($filePath);
                    break;
                case 'png':
                    $image = @imagecreatefrompng($filePath);
                    if ($image) {
                        imagepalettetotruecolor($image);
                        imagealphablending($image, true);
                        imagesavealpha($image, true);
                    }
                    break;
                case 'gif':
                    $image = @imagecreatefromgif($filePath);
                    break;
            }
            
            if ($image) {
                // Convert with 85% quality
                if (imagewebp($image, $webpPath, 85)) {
                    $originalSize = filesize($filePath);
                    $webpSize = filesize($webpPath);
                    $savings = round((1 - $webpSize / $originalSize) * 100, 1);
                    echo "  ✅ {$filename} → WebP ({$savings}% smaller)\n";
                    $convertedCount++;
                } else {
                    echo "  ❌ {$filename} - Failed to save WebP\n";
                    $errorCount++;
                }
                imagedestroy($image);
            } else {
                echo "  ❌ {$filename} - Failed to load image\n";
                $errorCount++;
            }
        } catch (Exception $e) {
            echo "  ❌ {$filename} - Error: " . $e->getMessage() . "\n";
            $errorCount++;
        }
    }
    
    echo "\n";
    echo "Conversion Results:\n";
    echo "  ✅ Converted: {$convertedCount} images\n";
    echo "  ⏭️  Skipped: {$skippedCount} images\n";
    if ($errorCount > 0) {
        echo "  ❌ Errors: {$errorCount} images\n";
    }
}

echo "\n";

// Step 3: Check and report WebP support
echo "Step 3: Checking WebP support...\n";
echo "---------------------------------\n";

if (function_exists('imagewebp')) {
    echo "✅ WebP support is enabled in PHP\n";
} else {
    echo "⚠️  WebP support is NOT enabled in PHP\n";
    echo "   You may need to install GD with WebP support\n";
}

echo "\n";

// Step 4: Set proper permissions
echo "Step 4: Setting proper permissions...\n";
echo "--------------------------------------\n";

try {
    // Set permissions for images directory
    chmod($imagesPath, 0755);
    echo "✅ Set permissions for images directory\n";
    
    // Set permissions for all image files
    $allImages = File::glob($imagesPath . '/*');
    foreach ($allImages as $image) {
        chmod($image, 0644);
    }
    echo "✅ Set permissions for " . count($allImages) . " image files\n";
} catch (Exception $e) {
    echo "⚠️  Error setting permissions: " . $e->getMessage() . "\n";
}

echo "\n";

// Step 5: Create default placeholder if it doesn't exist
echo "Step 5: Creating default placeholder image...\n";
echo "----------------------------------------------\n";

$placeholderPath = public_path('images/listings/default-listing.webp');
if (!File::exists($placeholderPath)) {
    // Create a simple gray placeholder image
    $width = 800;
    $height = 600;
    $image = imagecreatetruecolor($width, $height);
    
    // Fill with gray color
    $gray = imagecolorallocate($image, 200, 200, 200);
    imagefill($image, 0, 0, $gray);
    
    // Add text
    $textColor = imagecolorallocate($image, 100, 100, 100);
    $text = 'No Image Available';
    $fontSize = 5;
    $textWidth = imagefontwidth($fontSize) * strlen($text);
    $textHeight = imagefontheight($fontSize);
    $x = ($width - $textWidth) / 2;
    $y = ($height - $textHeight) / 2;
    imagestring($image, $fontSize, $x, $y, $text, $textColor);
    
    // Save as WebP
    if (imagewebp($image, $placeholderPath, 85)) {
        echo "✅ Created default placeholder image\n";
    } else {
        echo "⚠️  Failed to create placeholder image\n";
    }
    imagedestroy($image);
} else {
    echo "✅ Default placeholder already exists\n";
}

echo "\n";

// Step 6: Generate summary report
echo "Step 6: Generating summary report...\n";
echo "-------------------------------------\n";

// Count database entries
$totalGalleries = DB::table('listing_galleries')->count();
$galleriesWithImages = DB::table('listing_galleries')
    ->whereNotNull('file_path')
    ->where('file_path', '!=', '')
    ->count();

// Count actual files
$webpFiles = count(File::glob($imagesPath . '/*.webp'));
$jpgFiles = count(File::glob($imagesPath . '/*.jpg'));
$jpegFiles = count(File::glob($imagesPath . '/*.jpeg'));
$pngFiles = count(File::glob($imagesPath . '/*.png'));
$totalImageFiles = $webpFiles + $jpgFiles + $jpegFiles + $pngFiles;

echo "\nDatabase Statistics:\n";
echo "  • Total gallery entries: {$totalGalleries}\n";
echo "  • Entries with images: {$galleriesWithImages}\n";

echo "\nFile Statistics:\n";
echo "  • WebP files: {$webpFiles}\n";
echo "  • JPG files: {$jpgFiles}\n";
echo "  • JPEG files: {$jpegFiles}\n";
echo "  • PNG files: {$pngFiles}\n";
echo "  • Total files: {$totalImageFiles}\n";

echo "\n";
echo "===========================================\n";
echo "  SCRIPT COMPLETED SUCCESSFULLY!\n";
echo "===========================================\n";
echo "\n";
echo "Next steps:\n";
echo "1. Clear your application cache: php artisan cache:clear\n";
echo "2. Clear your view cache: php artisan view:clear\n";
echo "3. If using OPcache, restart PHP-FPM or Apache\n";
echo "4. Test image display on your website\n";
echo "\n";
echo "If images still don't display:\n";
echo "- Check browser console for 404 errors\n";
echo "- Verify image URLs match file paths\n";
echo "- Ensure web server can read images directory\n";
echo "- Check .htaccess or nginx config for image serving rules\n";
echo "\n";