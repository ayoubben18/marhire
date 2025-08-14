#!/usr/bin/env php
<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\ListingGallery;
use Illuminate\Support\Facades\DB;

echo "Starting duplicate image cleanup...\n";

// Get all listings with images
$listings = DB::table('listing_galleries')
    ->select('listing_id')
    ->whereNull('deleted_at')
    ->groupBy('listing_id')
    ->get();

$totalRemoved = 0;

foreach ($listings as $listing) {
    // Get all images for this listing
    $images = ListingGallery::where('listing_id', $listing->listing_id)
        ->orderBy('id', 'asc')
        ->get();
    
    if ($images->count() <= 1) {
        continue;
    }
    
    echo "Listing {$listing->listing_id} has {$images->count()} images\n";
    
    // Group images by their base name (without extension)
    $imageGroups = [];
    foreach ($images as $image) {
        // Extract base name without extension
        $pathInfo = pathinfo($image->file_path);
        $baseName = str_replace('.webp', '', $pathInfo['filename']);
        
        if (!isset($imageGroups[$baseName])) {
            $imageGroups[$baseName] = [];
        }
        $imageGroups[$baseName][] = $image;
    }
    
    // For each group, keep only the WebP version or the first one
    foreach ($imageGroups as $baseName => $group) {
        if (count($group) > 1) {
            // Find WebP version
            $webpImage = null;
            $otherImages = [];
            
            foreach ($group as $img) {
                if (strpos($img->file_path, '.webp') !== false) {
                    $webpImage = $img;
                } else {
                    $otherImages[] = $img;
                }
            }
            
            // If we have a WebP version, delete all others
            if ($webpImage) {
                foreach ($otherImages as $img) {
                    echo "  - Removing duplicate: {$img->file_path}\n";
                    $img->delete();
                    $totalRemoved++;
                }
            } else {
                // Keep the first one, delete the rest
                for ($i = 1; $i < count($group); $i++) {
                    echo "  - Removing duplicate: {$group[$i]->file_path}\n";
                    $group[$i]->delete();
                    $totalRemoved++;
                }
            }
        }
    }
}

echo "\nCleanup completed! Removed {$totalRemoved} duplicate images.\n";