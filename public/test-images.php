<?php
/**
 * Image Debug Script for Production Server
 * This script helps diagnose image upload and display issues
 */

// Only allow this script to run in non-production or with a secret key
$secretKey = $_GET['key'] ?? '';
if ($secretKey !== 'debug123') {
    die('Access denied. Add ?key=debug123 to the URL.');
}

echo "<h1>MarHire Image Debug Tool</h1>";
echo "<p>PHP Version: " . phpversion() . "</p>";
echo "<p>Server: " . $_SERVER['SERVER_SOFTWARE'] . "</p>";
echo "<hr>";

// Check if GD library is installed (required for image processing)
echo "<h2>1. GD Library Check</h2>";
if (extension_loaded('gd')) {
    echo "<p style='color:green'>✓ GD Library is installed</p>";
    $gdInfo = gd_info();
    echo "<ul>";
    echo "<li>GD Version: " . $gdInfo['GD Version'] . "</li>";
    echo "<li>WebP Support: " . ($gdInfo['WebP Support'] ? '✓ Yes' : '✗ No') . "</li>";
    echo "<li>JPEG Support: " . ($gdInfo['JPEG Support'] ? '✓ Yes' : '✗ No') . "</li>";
    echo "<li>PNG Support: " . ($gdInfo['PNG Support'] ? '✓ Yes' : '✗ No') . "</li>";
    echo "</ul>";
} else {
    echo "<p style='color:red'>✗ GD Library is NOT installed - Image processing will fail!</p>";
}

// Check images directory
echo "<h2>2. Images Directory Check</h2>";
$imagesDir = __DIR__ . '/images/listings';
if (is_dir($imagesDir)) {
    echo "<p style='color:green'>✓ Directory exists: $imagesDir</p>";
    
    // Check permissions
    $perms = fileperms($imagesDir);
    $permsOctal = substr(sprintf('%o', $perms), -4);
    echo "<p>Directory permissions: $permsOctal ";
    
    if (is_writable($imagesDir)) {
        echo "<span style='color:green'>✓ Writable</span></p>";
    } else {
        echo "<span style='color:red'>✗ Not writable - Images cannot be saved!</span></p>";
    }
    
    if (is_readable($imagesDir)) {
        echo "<p style='color:green'>✓ Readable</p>";
    } else {
        echo "<p style='color:red'>✗ Not readable - Images cannot be displayed!</p>";
    }
    
    // List some images
    echo "<h3>Sample images in directory:</h3>";
    $files = scandir($imagesDir);
    $imageFiles = array_filter($files, function($file) {
        return preg_match('/\.(jpg|jpeg|png|gif|webp)$/i', $file);
    });
    
    if (count($imageFiles) > 0) {
        echo "<ul>";
        $count = 0;
        foreach ($imageFiles as $file) {
            if ($count >= 5) break;
            $filePath = $imagesDir . '/' . $file;
            $fileSize = filesize($filePath);
            $fileSizeKB = round($fileSize / 1024, 2);
            echo "<li>$file ($fileSizeKB KB)";
            
            // Check if file is accessible via web
            $webPath = '/images/listings/' . $file;
            $fullUrl = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . 
                      "://" . $_SERVER['HTTP_HOST'] . $webPath;
            
            echo " - <a href='$webPath' target='_blank'>View</a>";
            echo " | <a href='$fullUrl' target='_blank'>Full URL</a>";
            echo "</li>";
            $count++;
        }
        echo "</ul>";
        
        // Test displaying an image
        if (count($imageFiles) > 0) {
            $testImage = reset($imageFiles);
            $testPath = '/images/listings/' . $testImage;
            echo "<h3>Test Image Display:</h3>";
            echo "<img src='$testPath' style='max-width:300px;' alt='Test image'>";
            echo "<p>If you see the image above, image serving is working correctly.</p>";
        }
    } else {
        echo "<p>No images found in directory</p>";
    }
    
} else {
    echo "<p style='color:red'>✗ Directory does not exist: $imagesDir</p>";
    echo "<p>Attempting to create directory...</p>";
    
    if (mkdir($imagesDir, 0755, true)) {
        echo "<p style='color:green'>✓ Directory created successfully</p>";
    } else {
        echo "<p style='color:red'>✗ Failed to create directory - Check parent directory permissions</p>";
    }
}

// Check parent directory permissions
echo "<h2>3. Parent Directory Permissions</h2>";
$parentDir = __DIR__ . '/images';
if (is_dir($parentDir)) {
    $perms = fileperms($parentDir);
    $permsOctal = substr(sprintf('%o', $perms), -4);
    echo "<p>Parent directory (/images) permissions: $permsOctal</p>";
}

// Check .htaccess
echo "<h2>4. .htaccess Check</h2>";
$htaccessPath = $imagesDir . '/.htaccess';
if (file_exists($htaccessPath)) {
    echo "<p style='color:green'>✓ .htaccess file exists</p>";
    echo "<pre style='background:#f5f5f5;padding:10px;'>";
    echo htmlspecialchars(file_get_contents($htaccessPath));
    echo "</pre>";
} else {
    echo "<p style='color:orange'>⚠ No .htaccess file in images/listings directory</p>";
}

// Check PHP upload settings
echo "<h2>5. PHP Upload Settings</h2>";
echo "<ul>";
echo "<li>upload_max_filesize: " . ini_get('upload_max_filesize') . "</li>";
echo "<li>post_max_size: " . ini_get('post_max_size') . "</li>";
echo "<li>max_file_uploads: " . ini_get('max_file_uploads') . "</li>";
echo "<li>memory_limit: " . ini_get('memory_limit') . "</li>";
echo "</ul>";

// Test WebP support
echo "<h2>6. WebP Support Test</h2>";
if (function_exists('imagewebp')) {
    echo "<p style='color:green'>✓ imagewebp() function exists</p>";
    
    // Try to create a test WebP image
    $testImage = imagecreatetruecolor(100, 100);
    $testPath = $imagesDir . '/test_webp_' . time() . '.webp';
    
    if (@imagewebp($testImage, $testPath)) {
        echo "<p style='color:green'>✓ Successfully created test WebP image</p>";
        // Clean up test file
        @unlink($testPath);
    } else {
        echo "<p style='color:red'>✗ Failed to create WebP image - Check directory permissions</p>";
    }
    
    imagedestroy($testImage);
} else {
    echo "<p style='color:red'>✗ imagewebp() function does not exist - WebP conversion will fail!</p>";
}

// Database check (if possible)
echo "<h2>7. Database Gallery Records (Last 5)</h2>";
try {
    // Bootstrap Laravel to access database
    require_once __DIR__ . '/../vendor/autoload.php';
    $app = require_once __DIR__ . '/../bootstrap/app.php';
    $kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
    $response = $kernel->handle(
        $request = Illuminate\Http\Request::capture()
    );
    
    $galleries = \App\Models\ListingGallery::orderBy('id', 'desc')->take(5)->get();
    
    if ($galleries->count() > 0) {
        echo "<table border='1' cellpadding='5'>";
        echo "<tr><th>ID</th><th>Listing ID</th><th>File Path</th><th>File Name</th><th>Exists?</th></tr>";
        foreach ($galleries as $gallery) {
            $exists = file_exists(__DIR__ . $gallery->file_path);
            echo "<tr>";
            echo "<td>{$gallery->id}</td>";
            echo "<td>{$gallery->listing_id}</td>";
            echo "<td>{$gallery->file_path}</td>";
            echo "<td>{$gallery->file_name}</td>";
            echo "<td>" . ($exists ? '✓ Yes' : '✗ No') . "</td>";
            echo "</tr>";
        }
        echo "</table>";
    } else {
        echo "<p>No gallery records found in database</p>";
    }
} catch (Exception $e) {
    echo "<p>Could not connect to database: " . $e->getMessage() . "</p>";
}

echo "<hr>";
echo "<h2>Recommendations</h2>";
echo "<ol>";
echo "<li>Ensure the /public/images/listings directory has 755 permissions</li>";
echo "<li>Verify that PHP's GD library is installed with WebP support</li>";
echo "<li>Check that upload_max_filesize and post_max_size are at least 2M</li>";
echo "<li>On cPanel, ensure that mod_rewrite is enabled</li>";
echo "<li>Clear Laravel cache: php artisan cache:clear && php artisan config:clear</li>";
echo "<li>Check error logs in storage/logs/laravel.log for specific errors</li>";
echo "</ol>";

echo "<hr>";
echo "<p><strong>Security Note:</strong> Delete this file after debugging!</p>";
?>