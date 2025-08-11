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
        Schema::table('listings', function (Blueprint $table) {
            // Add new JSON columns for multi-select fields (with _new suffix for data migration)
            $table->json('car_types_new')->nullable()->after('car_type')->comment('Multi-select car types as JSON array');
            
            // Note: deposit_required, deposit_amount, and purpose_tags are already nullable in the original schema
            // No need to change them, they were already created as nullable fields
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('listings', function (Blueprint $table) {
            // Remove the new columns
            $table->dropColumn('car_types_new');
            
            // Note: We don't revert nullable changes as they were already nullable in the original schema
        });
    }
};