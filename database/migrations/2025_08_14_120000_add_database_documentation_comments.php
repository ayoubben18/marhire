<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class AddDatabaseDocumentationComments extends Migration
{
    /**
     * Run the migrations.
     * 
     * This migration adds comments to document known typos in column names.
     * We cannot rename these columns as it would break existing code.
     * Instead, we document them for future developers.
     *
     * @return void
     */
    public function up()
    {
        // Only add comments if using MySQL
        if (DB::getDriverName() === 'mysql') {
            // Document the typo in bookings.droppoff_location
            DB::statement("ALTER TABLE `bookings` 
                MODIFY COLUMN `droppoff_location` VARCHAR(255) 
                COMMENT 'TYPO: Should be dropoff_location but kept for backward compatibility'");
            
            // Document the typo in bookings.prefered_date  
            DB::statement("ALTER TABLE `bookings` 
                MODIFY COLUMN `prefered_date` DATE 
                COMMENT 'TYPO: Should be preferred_date but kept for backward compatibility'");
            
            // Document the typo in bookings.propose
            DB::statement("ALTER TABLE `bookings` 
                MODIFY COLUMN `propose` VARCHAR(255) 
                COMMENT 'TYPO: Should be purpose but kept for backward compatibility'");
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Remove comments if rolling back
        if (DB::getDriverName() === 'mysql') {
            DB::statement("ALTER TABLE `bookings` 
                MODIFY COLUMN `droppoff_location` VARCHAR(255)");
            
            DB::statement("ALTER TABLE `bookings` 
                MODIFY COLUMN `prefered_date` DATE");
            
            DB::statement("ALTER TABLE `bookings` 
                MODIFY COLUMN `propose` VARCHAR(255)");
        }
    }
}