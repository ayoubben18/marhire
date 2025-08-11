<?php

namespace App\Console\Commands;

use App\Models\Listing;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class MigrateListingsToJson extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'listings:migrate-to-json 
                            {--dry-run : Show what would be migrated without making changes}
                            {--rollback : Rollback migration from JSON to CSV}
                            {--chunk=100 : Number of records to process per batch}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Migrate listing CSV fields to JSON format for multi-select functionality';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $dryRun = $this->option('dry-run');
        $rollback = $this->option('rollback');
        $chunkSize = (int) $this->option('chunk');

        if ($rollback) {
            return $this->rollbackMigration($dryRun, $chunkSize);
        }

        $this->info('Starting data migration from CSV to JSON format...');
        
        if ($dryRun) {
            $this->warn('DRY RUN MODE - No changes will be made');
        }

        try {
            $totalRecords = Listing::count();
            $this->info("Total listings to process: {$totalRecords}");

            $processedCount = 0;
            $errorCount = 0;
            $skippedCount = 0;

            // Process listings in chunks to handle production data efficiently
            Listing::chunk($chunkSize, function ($listings) use ($dryRun, &$processedCount, &$errorCount, &$skippedCount) {
                foreach ($listings as $listing) {
                    try {
                        $changes = [];
                        
                        // Migrate car_type to car_types_new JSON array
                        if (!empty($listing->car_type) && is_null($listing->car_types_new)) {
                            // Handle comma-separated values or single value
                            $carTypes = $this->parseCommaSeparatedValues($listing->car_type);
                            if (!empty($carTypes)) {
                                $changes['car_types_new'] = json_encode($carTypes);
                                $this->line("  car_type: '{$listing->car_type}' -> JSON: " . json_encode($carTypes));
                            }
                        } elseif (!is_null($listing->car_types_new)) {
                            $skippedCount++;
                            $this->line("  Skipping listing {$listing->id}: car_types_new already populated");
                            continue;
                        }

                        if (!empty($changes)) {
                            if (!$dryRun) {
                                DB::table('listings')
                                    ->where('id', $listing->id)
                                    ->update($changes);
                            }

                            $this->info("✓ Migrated listing {$listing->id} ('{$listing->title}')");
                            $processedCount++;
                        } else {
                            $this->line("  No changes needed for listing {$listing->id}");
                        }

                    } catch (\Exception $e) {
                        $errorCount++;
                        $this->error("✗ Error migrating listing {$listing->id}: " . $e->getMessage());
                        Log::error("Listing migration error", [
                            'listing_id' => $listing->id,
                            'error' => $e->getMessage(),
                            'trace' => $e->getTraceAsString()
                        ]);
                    }
                }
            });

            $this->info("\nMigration completed!");
            $this->info("Processed: {$processedCount}");
            $this->info("Skipped: {$skippedCount}");
            $this->info("Errors: {$errorCount}");

            if (!$dryRun && $processedCount > 0) {
                $this->info("\nNext steps:");
                $this->info("1. Verify the migrated data looks correct");
                $this->info("2. Update your application code to use the new JSON fields");
                $this->info("3. Run the migration again to clean up old columns when ready");
                $this->warn("4. Remember to update validation rules and frontend components");
            }

            return 0;

        } catch (\Exception $e) {
            $this->error("Migration failed: " . $e->getMessage());
            Log::error("Listing migration failed", [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return 1;
        }
    }

    /**
     * Rollback migration from JSON back to CSV format
     */
    protected function rollbackMigration($dryRun, $chunkSize)
    {
        $this->info('Starting rollback migration from JSON to CSV format...');
        
        if ($dryRun) {
            $this->warn('DRY RUN MODE - No changes will be made');
        }

        try {
            $totalRecords = Listing::whereNotNull('car_types_new')->count();
            $this->info("Total listings to rollback: {$totalRecords}");

            if ($totalRecords === 0) {
                $this->info("No records found with JSON data to rollback.");
                return 0;
            }

            $processedCount = 0;

            Listing::whereNotNull('car_types_new')->chunk($chunkSize, function ($listings) use ($dryRun, &$processedCount) {
                foreach ($listings as $listing) {
                    try {
                        $changes = [];

                        // Convert car_types_new JSON back to car_type CSV
                        if (!is_null($listing->car_types_new)) {
                            $carTypesArray = json_decode($listing->car_types_new, true);
                            if (is_array($carTypesArray) && !empty($carTypesArray)) {
                                $changes['car_type'] = implode(',', $carTypesArray);
                                $changes['car_types_new'] = null;
                                $this->line("  JSON: " . $listing->car_types_new . " -> car_type: '{$changes['car_type']}'");
                            }
                        }

                        if (!empty($changes)) {
                            if (!$dryRun) {
                                DB::table('listings')
                                    ->where('id', $listing->id)
                                    ->update($changes);
                            }

                            $this->info("✓ Rolled back listing {$listing->id} ('{$listing->title}')");
                            $processedCount++;
                        }

                    } catch (\Exception $e) {
                        $this->error("✗ Error rolling back listing {$listing->id}: " . $e->getMessage());
                        Log::error("Listing rollback error", [
                            'listing_id' => $listing->id,
                            'error' => $e->getMessage()
                        ]);
                    }
                }
            });

            $this->info("\nRollback completed!");
            $this->info("Processed: {$processedCount}");

            return 0;

        } catch (\Exception $e) {
            $this->error("Rollback failed: " . $e->getMessage());
            return 1;
        }
    }

    /**
     * Parse comma-separated values and clean them up
     */
    protected function parseCommaSeparatedValues($value)
    {
        if (empty($value)) {
            return [];
        }

        // Handle both string and numeric values
        $values = explode(',', $value);
        $cleanedValues = [];

        foreach ($values as $val) {
            $trimmed = trim($val);
            if ($trimmed !== '' && $trimmed !== '0') {
                // Keep as string to maintain consistency with existing data
                $cleanedValues[] = $trimmed;
            }
        }

        return array_unique($cleanedValues);
    }
}