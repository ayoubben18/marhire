<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Listing;
use App\Models\Booking;

class CheckDataIntegrity extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'data:check-integrity 
                            {--category= : Filter by category ID (2=Car, 3=Driver, 4=Boat, 5=Activities)}
                            {--fix : Attempt to fix simple issues}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check data integrity for listings and identify missing configurations';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('Checking data integrity for listings...');
        
        $query = Listing::withCompleteData();
        
        // Filter by category if specified
        if ($categoryId = $this->option('category')) {
            $query->where('category_id', $categoryId);
            $categoryNames = [
                2 => 'Car Rental',
                3 => 'Private Driver',
                4 => 'Boat Rental',
                5 => 'Activities'
            ];
            $this->info('Filtering by category: ' . ($categoryNames[$categoryId] ?? 'Unknown'));
        }
        
        $listings = $query->get();
        $totalIssues = 0;
        $listingsWithIssues = [];
        
        $this->info('Analyzing ' . $listings->count() . ' listings...');
        $this->newLine();
        
        foreach ($listings as $listing) {
            $issues = $listing->checkDataIntegrity();
            
            if (!empty($issues)) {
                $totalIssues += count($issues);
                $listingsWithIssues[] = [
                    'id' => $listing->id,
                    'title' => $listing->title,
                    'category_id' => $listing->category_id,
                    'issues' => $issues
                ];
            }
        }
        
        // Display results
        if ($totalIssues === 0) {
            $this->info('✅ No data integrity issues found!');
        } else {
            $this->warn('Found ' . $totalIssues . ' issues in ' . count($listingsWithIssues) . ' listings:');
            $this->newLine();
            
            // Group by issue type
            $issueTypes = [];
            foreach ($listingsWithIssues as $listing) {
                foreach ($listing['issues'] as $issue) {
                    if (!isset($issueTypes[$issue])) {
                        $issueTypes[$issue] = [];
                    }
                    $issueTypes[$issue][] = $listing;
                }
            }
            
            // Display issues grouped by type
            foreach ($issueTypes as $issueType => $affectedListings) {
                $this->error('❌ ' . $issueType . ' (' . count($affectedListings) . ' listings)');
                
                // Show first 5 affected listings
                $shown = 0;
                foreach ($affectedListings as $listing) {
                    if ($shown >= 5) {
                        $this->line('   ... and ' . (count($affectedListings) - 5) . ' more');
                        break;
                    }
                    $this->line('   - Listing #' . $listing['id'] . ': ' . $listing['title']);
                    $shown++;
                }
                $this->newLine();
            }
            
            // Category-specific analysis
            $this->info('Issues by Category:');
            $categoryIssues = [];
            foreach ($listingsWithIssues as $listing) {
                $categoryId = $listing['category_id'];
                if (!isset($categoryIssues[$categoryId])) {
                    $categoryIssues[$categoryId] = 0;
                }
                $categoryIssues[$categoryId]++;
            }
            
            $categoryNames = [
                2 => 'Car Rental',
                3 => 'Private Driver',
                4 => 'Boat Rental',
                5 => 'Activities'
            ];
            
            foreach ($categoryIssues as $categoryId => $count) {
                $this->line('- ' . ($categoryNames[$categoryId] ?? 'Unknown') . ': ' . $count . ' listings with issues');
            }
        }
        
        // Check for specific known issues
        $this->newLine();
        $this->info('Checking for specific known issues...');
        
        // Check private driver pricing
        $driversWithoutPricing = Listing::where('category_id', 3)
            ->whereDoesntHave('driverPricings')
            ->whereDoesntHave('pricings')
            ->count();
            
        if ($driversWithoutPricing > 0) {
            $this->warn('⚠️  ' . $driversWithoutPricing . ' private driver listings without pricing configuration');
        }
        
        // Check activities options
        $activitiesWithoutOptions = Listing::where('category_id', 5)
            ->whereDoesntHave('customBookingOptions')
            ->whereDoesntHave('actPricings')
            ->count();
            
        if ($activitiesWithoutOptions > 0) {
            $this->warn('⚠️  ' . $activitiesWithoutOptions . ' activity listings without booking options');
        }
        
        // Check for listings without images
        $listingsWithoutImages = Listing::whereDoesntHave('galleries')->count();
        if ($listingsWithoutImages > 0) {
            $this->warn('⚠️  ' . $listingsWithoutImages . ' listings without any images');
        }
        
        $this->newLine();
        $this->info('Data integrity check complete!');
        
        if ($totalIssues > 0) {
            $this->info('Run with --fix option to attempt automatic fixes for simple issues.');
            $this->info('For detailed listing issues, check the admin panel for each affected listing.');
        }
        
        return Command::SUCCESS;
    }
}