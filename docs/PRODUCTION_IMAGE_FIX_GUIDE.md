# Production Image Fix Guide

## Overview
This guide provides scripts and instructions to fix image display issues on production servers, especially for legacy data that needs WebP conversion and path corrections.

## Problem Description
- Old listings have images in JPG/PNG format that need WebP conversion
- Database image paths may be missing leading slashes (`images/listings/` instead of `/images/listings/`)
- Missing WebP versions cause "Image not available" errors
- File permissions may prevent web server from serving images

## Solution Components

### 1. Main PHP Fix Script: `fix_production_images.php`

**What it does:**
- Fixes all database image paths (adds leading slashes)
- Converts all JPG/PNG/GIF images to WebP format
- Checks WebP support in PHP
- Sets proper file permissions
- Creates a default placeholder image
- Generates a summary report

**Usage:**
```bash
php fix_production_images.php
```

**Script Content:**
```php
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
```

### 2. Automated Shell Script: `fix_production_images.sh`

**What it does:**
- Runs the PHP fix script
- Clears all Laravel caches
- Compiles assets (if npm is available)
- Sets proper ownership for web server
- Restarts PHP-FPM/Apache/Nginx automatically

**Usage:**
```bash
chmod +x fix_production_images.sh
sudo bash fix_production_images.sh
```

**Script Content:**
```bash
#!/bin/bash

# Production Image Fix Script
# This script fixes all image-related issues on the production server
# Run with: bash fix_production_images.sh

echo "========================================="
echo "  PRODUCTION IMAGE FIX SCRIPT"
echo "========================================="
echo ""

# Check if we're in the right directory
if [ ! -f "artisan" ]; then
    echo "Error: This script must be run from the Laravel root directory"
    echo "Please cd to your Laravel application directory and run again"
    exit 1
fi

# Step 1: Run the PHP fix script
echo "Step 1: Running image fix script..."
echo "------------------------------------"
php fix_production_images.php

if [ $? -ne 0 ]; then
    echo "Error: PHP script failed to execute"
    echo "Please check PHP is installed and working"
    exit 1
fi

# Step 2: Clear Laravel caches
echo ""
echo "Step 2: Clearing Laravel caches..."
echo "-----------------------------------"
php artisan cache:clear
php artisan config:clear
php artisan view:clear
php artisan route:clear

# Step 3: Rebuild assets if needed
echo ""
echo "Step 3: Checking for asset compilation..."
echo "------------------------------------------"
if [ -f "package.json" ]; then
    echo "Found package.json - Compiling assets..."
    if command -v npm &> /dev/null; then
        npm run production
    else
        echo "Warning: npm not found - skipping asset compilation"
        echo "You may need to run 'npm run production' manually"
    fi
else
    echo "No package.json found - skipping asset compilation"
fi

# Step 4: Set proper ownership (adjust user:group as needed)
echo ""
echo "Step 4: Setting file ownership..."
echo "----------------------------------"
# Get the web server user (usually www-data on Ubuntu/Debian, apache on CentOS/RHEL)
WEB_USER="www-data"
if id "apache" &>/dev/null; then
    WEB_USER="apache"
fi

echo "Setting ownership to $WEB_USER for storage and images..."
sudo chown -R $WEB_USER:$WEB_USER storage/
sudo chown -R $WEB_USER:$WEB_USER public/images/
sudo chmod -R 755 storage/
sudo chmod -R 755 public/images/

# Step 5: Restart services if needed
echo ""
echo "Step 5: Restarting services..."
echo "-------------------------------"

# Check and restart PHP-FPM
if systemctl is-active --quiet php*-fpm; then
    echo "Restarting PHP-FPM..."
    sudo systemctl restart php*-fpm
elif systemctl is-active --quiet php-fpm; then
    echo "Restarting PHP-FPM..."
    sudo systemctl restart php-fpm
fi

# Check and restart Apache if it's running
if systemctl is-active --quiet apache2; then
    echo "Restarting Apache..."
    sudo systemctl restart apache2
elif systemctl is-active --quiet httpd; then
    echo "Restarting Apache..."
    sudo systemctl restart httpd
fi

# Check and restart Nginx if it's running
if systemctl is-active --quiet nginx; then
    echo "Restarting Nginx..."
    sudo systemctl restart nginx
fi

echo ""
echo "========================================="
echo "  SCRIPT COMPLETED!"
echo "========================================="
echo ""
echo "✅ All image fixes have been applied"
echo ""
echo "Please check your website to verify images are displaying correctly."
echo ""
echo "If you still have issues:"
echo "1. Check the browser console for errors"
echo "2. Verify file permissions: ls -la public/images/listings/"
echo "3. Check your web server error logs"
echo "4. Ensure GD library with WebP support is installed"
echo ""
```

### 3. Database-Only SQL Script: `fix_image_paths.sql`

**What it does:**
- Fixes image paths in listing_galleries table
- Adds leading slashes where missing
- Can be run directly in MySQL/MariaDB

**Usage:**
```bash
mysql -u root -p marhire < fix_image_paths.sql
```

**Script Content:**
```sql
-- Production Database Image Path Fix
-- This SQL script fixes image paths in the database
-- Run this directly in MySQL/MariaDB if needed

-- Fix listing_galleries table - add leading slash to file_path
UPDATE listing_galleries 
SET file_path = CONCAT('/', file_path)
WHERE file_path IS NOT NULL 
  AND file_path != ''
  AND file_path NOT LIKE '/%'
  AND file_path NOT LIKE 'http%';

-- Fix listing_galleries table - add leading slash to file_name if it exists
UPDATE listing_galleries 
SET file_name = CONCAT('/', file_name)
WHERE file_name IS NOT NULL 
  AND file_name != ''
  AND file_name NOT LIKE '/%'
  AND file_name NOT LIKE 'http%';

-- If listings table has an image column, fix it too
-- (This may not exist in all installations)
UPDATE listings 
SET image = CONCAT('/', image)
WHERE image IS NOT NULL 
  AND image != ''
  AND image NOT LIKE '/%'
  AND image NOT LIKE 'http%';

-- Show results
SELECT 'Fixed image paths in database' as Status;
SELECT COUNT(*) as 'Total Gallery Images' FROM listing_galleries WHERE file_path IS NOT NULL AND file_path != '';
SELECT COUNT(*) as 'Images with correct path' FROM listing_galleries WHERE file_path LIKE '/%';
```

## Deployment Steps

### Option 1: Full Automated Fix (Recommended)

1. **Upload files to production server:**
   ```bash
   scp fix_production_images.php fix_production_images.sh user@server:/path/to/laravel/
   ```

2. **SSH into server and navigate to Laravel root:**
   ```bash
   ssh user@server
   cd /path/to/laravel
   ```

3. **Run the automated script:**
   ```bash
   chmod +x fix_production_images.sh
   sudo bash fix_production_images.sh
   ```

### Option 2: Manual Step-by-Step

1. **Run PHP fix script:**
   ```bash
   php fix_production_images.php
   ```

2. **Clear Laravel caches:**
   ```bash
   php artisan cache:clear
   php artisan config:clear
   php artisan view:clear
   php artisan route:clear
   ```

3. **Compile frontend assets:**
   ```bash
   npm run production
   ```

4. **Fix permissions:**
   ```bash
   sudo chown -R www-data:www-data storage/
   sudo chown -R www-data:www-data public/images/
   sudo chmod -R 755 storage/
   sudo chmod -R 755 public/images/
   ```

5. **Restart services:**
   ```bash
   sudo systemctl restart php7.4-fpm  # or your PHP version
   sudo systemctl restart apache2     # or nginx
   ```

### Option 3: Database-Only Fix

If you only need to fix database paths:

```bash
mysql -u root -p marhire < fix_image_paths.sql
```

## Troubleshooting

### Check WebP Support
```bash
php -r "echo function_exists('imagewebp') ? 'WebP supported' : 'WebP NOT supported';"
```

If not supported, install GD with WebP:
```bash
# Ubuntu/Debian
sudo apt-get install php-gd

# CentOS/RHEL
sudo yum install php-gd
```

### Check File Permissions
```bash
ls -la public/images/listings/
```

Files should be:
- Directory: 755 (drwxr-xr-x)
- Files: 644 (-rw-r--r--)
- Owner: www-data or apache

### Check Web Server User
```bash
# Find web server user
ps aux | grep -E 'apache|www-data|nginx'
```

### Check Error Logs
```bash
# Laravel logs
tail -f storage/logs/laravel.log

# Apache logs
tail -f /var/log/apache2/error.log

# Nginx logs
tail -f /var/log/nginx/error.log
```

### Verify Image URLs
Open browser developer tools (F12) and check Network tab for 404 errors on image requests.

### Test Single Image
```bash
# Check if image is accessible
curl -I https://yoursite.com/images/listings/listing_xxxxx.webp
```

## Common Issues and Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Images show 404 | Wrong path in database | Run `fix_image_paths.sql` |
| "Image not available" | No WebP version | Run `fix_production_images.php` |
| Permission denied | Wrong file ownership | Run `chown -R www-data:www-data public/images/` |
| WebP not supported | Missing GD extension | Install `php-gd` package |
| Images don't update | Browser cache | Clear browser cache or add version query string |
| Script fails | Not in Laravel root | Navigate to Laravel directory first |

## Verification Checklist

After running the fixes, verify:

- [ ] Images display on listing pages
- [ ] No 404 errors in browser console
- [ ] WebP files exist in `public/images/listings/`
- [ ] Database paths start with `/`
- [ ] File permissions are correct
- [ ] Web server can read image files
- [ ] Browser shows WebP format in Network tab

## Rollback

If needed, you can rollback changes:

### Rollback Database Paths
```sql
-- Remove leading slashes
UPDATE listing_galleries 
SET file_path = SUBSTRING(file_path, 2)
WHERE file_path LIKE '/%';
```

### Keep Original Images
The scripts don't delete original JPG/PNG files, only create WebP versions alongside them.

## Support

For issues specific to this fix:
1. Check the troubleshooting section above
2. Review Laravel and web server error logs
3. Ensure all prerequisites are met (PHP GD, proper permissions)
4. Test with a single image first before bulk conversion

## Notes

- WebP conversion uses 85% quality for optimal file size/quality balance
- Original images are preserved (not deleted)
- The script is idempotent (safe to run multiple times)
- Database changes only affect paths, not actual data
- Compatible with Laravel 8+ and PHP 7.4+