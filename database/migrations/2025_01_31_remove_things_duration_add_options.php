<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Note: We're not removing the duration_options field from listings table 
        // as it may be used by other categories (like boats).
        // Things to Do will just ignore this field and use custom_booking_options instead.
        
        // The custom_booking_options table is already created in another migration
        // This migration is just for documentation purposes to track the requirement
        // that Things to Do should not use the duration field
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Nothing to reverse
    }
};