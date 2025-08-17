<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\ListingGallery;

class FixImagePaths extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'images:fix-paths';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fix image paths to ensure they start with leading slash for production compatibility';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('🔍 Checking image paths...');

        // Find problematic paths
        $problematicPaths = ListingGallery::whereNotNull('file_path')
            ->where('file_path', '!=', '')
            ->where('file_path', 'not like', '/%')
            ->where('file_path', 'not like', 'http%')
            ->get();

        if ($problematicPaths->isEmpty()) {
            $this->info('✅ All image paths are already correctly formatted!');
            return 0;
        }

        $this->warn("Found {$problematicPaths->count()} images with problematic paths:");

        $fixed = 0;
        foreach ($problematicPaths as $gallery) {
            $oldPath = $gallery->file_path;
            $newPath = '/' . ltrim($oldPath, '/');
            
            $this->line("  Fixing: {$oldPath} → {$newPath}");
            
            // Update using the mutator (which will apply the same logic)
            $gallery->file_path = $newPath;
            $gallery->save();
            
            $fixed++;
        }

        $this->info("✅ Fixed {$fixed} image paths!");
        $this->info('🎉 All image paths now have proper leading slashes for production compatibility.');

        return 0;
    }
}