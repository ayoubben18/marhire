<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Listing;
use App\Models\ListingGallery;
use App\Services\ImageProcessingService;
use Illuminate\Support\Facades\File;

class ConvertExistingImagesToWebP extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'images:convert-webp {--listing=* : Specific listing IDs to convert}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Convert existing listing images to WebP format';

    /**
     * The image processing service.
     *
     * @var ImageProcessingService
     */
    protected $imageService;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct(ImageProcessingService $imageService)
    {
        parent::__construct();
        $this->imageService = $imageService;
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('Starting WebP conversion for existing images...');
        
        // Get specific listing IDs if provided
        $listingIds = $this->option('listing');
        
        // Build query
        $query = Listing::query();
        if (!empty($listingIds)) {
            $query->whereIn('id', $listingIds);
        }
        
        $listings = $query->get();
        $totalListings = $listings->count();
        $convertedCount = 0;
        $skippedCount = 0;
        $errorCount = 0;
        
        $this->info("Processing {$totalListings} listings...");
        
        foreach ($listings as $listing) {
            $this->line("Processing Listing #{$listing->id}: {$listing->title}");
            
            // Convert gallery images
            $galleryImages = ListingGallery::where('listing_id', $listing->id)->get();
            foreach ($galleryImages as $gallery) {
                // Use file_name column instead of image
                if ($gallery->file_name) {
                    $result = $this->convertImage($gallery->file_name, "gallery #{$gallery->id}");
                    if ($result === 'converted') {
                        $convertedCount++;
                    } elseif ($result === 'skipped') {
                        $skippedCount++;
                    } else {
                        $errorCount++;
                    }
                }
            }
        }
        
        $this->info('');
        $this->info('WebP conversion completed!');
        $this->info("✅ Converted: {$convertedCount} images");
        $this->info("⏭️  Skipped (already exists): {$skippedCount} images");
        if ($errorCount > 0) {
            $this->warn("❌ Errors: {$errorCount} images");
        }
        
        return 0;
    }
    
    /**
     * Convert a single image to WebP format.
     *
     * @param string $imagePath
     * @param string $label
     * @return string Status: 'converted', 'skipped', or 'error'
     */
    protected function convertImage($imagePath, $label)
    {
        $fullPath = public_path('images/listings/' . $imagePath);
        
        // Check if original image exists
        if (!File::exists($fullPath)) {
            $this->warn("  ⚠️  {$label}: Original image not found - {$imagePath}");
            return 'error';
        }
        
        // Check if WebP version already exists
        $webpPath = pathinfo($fullPath, PATHINFO_DIRNAME) . '/' . 
                    pathinfo($fullPath, PATHINFO_FILENAME) . '.webp';
        
        if (File::exists($webpPath)) {
            $this->line("  ⏭️  {$label}: WebP version already exists");
            return 'skipped';
        }
        
        // Get file extension
        $extension = strtolower(pathinfo($fullPath, PATHINFO_EXTENSION));
        
        // Skip if already WebP
        if ($extension === 'webp') {
            $this->line("  ⏭️  {$label}: Already in WebP format");
            return 'skipped';
        }
        
        // Only process supported image formats
        if (!in_array($extension, ['jpg', 'jpeg', 'png', 'gif'])) {
            $this->warn("  ⚠️  {$label}: Unsupported format - {$extension}");
            return 'error';
        }
        
        try {
            // Use ImageProcessingService to convert to WebP
            $image = null;
            
            switch ($extension) {
                case 'jpg':
                case 'jpeg':
                    $image = imagecreatefromjpeg($fullPath);
                    break;
                case 'png':
                    $image = imagecreatefrompng($fullPath);
                    break;
                case 'gif':
                    $image = imagecreatefromgif($fullPath);
                    break;
            }
            
            if ($image) {
                // Convert to WebP with 85% quality
                $webpSaved = imagewebp($image, $webpPath, 85);
                imagedestroy($image);
                
                if ($webpSaved) {
                    $this->info("  ✅ {$label}: Converted to WebP");
                    
                    // Get file sizes for comparison
                    $originalSize = File::size($fullPath);
                    $webpSize = File::size($webpPath);
                    $savings = round((1 - $webpSize / $originalSize) * 100, 1);
                    
                    $this->line("     Original: " . $this->formatBytes($originalSize) . 
                               " → WebP: " . $this->formatBytes($webpSize) . 
                               " (saved {$savings}%)");
                    
                    return 'converted';
                } else {
                    $this->error("  ❌ {$label}: Failed to save WebP");
                    return 'error';
                }
            } else {
                $this->error("  ❌ {$label}: Failed to load image");
                return 'error';
            }
        } catch (\Exception $e) {
            $this->error("  ❌ {$label}: Error - " . $e->getMessage());
            return 'error';
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
        $units = ['B', 'KB', 'MB', 'GB'];
        $i = 0;
        
        while ($bytes >= 1024 && $i < count($units) - 1) {
            $bytes /= 1024;
            $i++;
        }
        
        return round($bytes, 2) . ' ' . $units[$i];
    }
}