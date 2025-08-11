<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class ConvertAllImagesToWebP extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'images:convert-all-webp {--dry-run : Show what would be converted without actually converting}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Convert all JPG/PNG images in listings directory to WebP format';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $dryRun = $this->option('dry-run');
        
        $this->info($dryRun ? 'DRY RUN - No files will be converted' : 'Starting WebP conversion for all images...');
        
        $imagesPath = public_path('images/listings');
        
        // Get all JPG and PNG files
        $jpgFiles = File::glob($imagesPath . '/*.jpg');
        $jpegFiles = File::glob($imagesPath . '/*.jpeg');
        $pngFiles = File::glob($imagesPath . '/*.png');
        
        $allFiles = array_merge($jpgFiles, $jpegFiles, $pngFiles);
        $totalFiles = count($allFiles);
        
        if ($totalFiles === 0) {
            $this->info('No JPG/PNG files found to convert.');
            return 0;
        }
        
        $this->info("Found {$totalFiles} images to process");
        $this->line('');
        
        $convertedCount = 0;
        $skippedCount = 0;
        $errorCount = 0;
        
        foreach ($allFiles as $filePath) {
            $filename = basename($filePath);
            $webpPath = pathinfo($filePath, PATHINFO_DIRNAME) . '/' . 
                        pathinfo($filePath, PATHINFO_FILENAME) . '.webp';
            
            // Check if WebP version already exists
            if (File::exists($webpPath)) {
                $this->line("⏭️  {$filename} - WebP already exists");
                $skippedCount++;
                continue;
            }
            
            if ($dryRun) {
                $this->info("Would convert: {$filename}");
                $convertedCount++;
                continue;
            }
            
            // Convert to WebP
            $result = $this->convertToWebP($filePath, $webpPath);
            
            if ($result['success']) {
                $this->info("✅ {$filename} → WebP ({$result['savings']}% smaller)");
                $convertedCount++;
            } else {
                $this->error("❌ {$filename} - {$result['error']}");
                $errorCount++;
            }
        }
        
        $this->line('');
        $this->info('Conversion completed!');
        $this->info("✅ Converted: {$convertedCount} images");
        $this->info("⏭️  Skipped: {$skippedCount} images");
        if ($errorCount > 0) {
            $this->warn("❌ Errors: {$errorCount} images");
        }
        
        return 0;
    }
    
    /**
     * Convert an image to WebP format.
     *
     * @param string $sourcePath
     * @param string $destinationPath
     * @return array
     */
    protected function convertToWebP($sourcePath, $destinationPath)
    {
        try {
            $extension = strtolower(pathinfo($sourcePath, PATHINFO_EXTENSION));
            $image = null;
            
            // Load the image based on type
            switch ($extension) {
                case 'jpg':
                case 'jpeg':
                    $image = @imagecreatefromjpeg($sourcePath);
                    break;
                case 'png':
                    $image = @imagecreatefrompng($sourcePath);
                    // Preserve transparency
                    if ($image) {
                        imagepalettetotruecolor($image);
                        imagealphablending($image, true);
                        imagesavealpha($image, true);
                    }
                    break;
            }
            
            if (!$image) {
                return ['success' => false, 'error' => 'Failed to load image'];
            }
            
            // Convert to WebP with 85% quality
            $success = imagewebp($image, $destinationPath, 85);
            imagedestroy($image);
            
            if (!$success) {
                return ['success' => false, 'error' => 'Failed to save WebP'];
            }
            
            // Calculate size savings
            $originalSize = filesize($sourcePath);
            $webpSize = filesize($destinationPath);
            $savings = round((1 - $webpSize / $originalSize) * 100, 1);
            
            return [
                'success' => true,
                'savings' => $savings,
                'original_size' => $this->formatBytes($originalSize),
                'webp_size' => $this->formatBytes($webpSize)
            ];
            
        } catch (\Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
    
    /**
     * Format bytes to human readable format.
     *
     * @param int $bytes
     * @return string
     */
    protected function formatBytes($bytes)
    {
        $units = ['B', 'KB', 'MB'];
        $i = 0;
        
        while ($bytes >= 1024 && $i < count($units) - 1) {
            $bytes /= 1024;
            $i++;
        }
        
        return round($bytes, 1) . ' ' . $units[$i];
    }
}