<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Add locale column to email_templates table
        Schema::table('email_templates', function (Blueprint $table) {
            $table->string('locale', 5)->default('en')->after('category');
        });

        // Update existing records to have locale='en'
        DB::table('email_templates')->update(['locale' => 'en']);

        // Drop existing unique constraint
        Schema::table('email_templates', function (Blueprint $table) {
            $table->dropUnique(['category', 'event_type']);
        });

        // Add new unique constraint including locale
        Schema::table('email_templates', function (Blueprint $table) {
            $table->unique(['category', 'event_type', 'locale'], 'email_templates_category_event_locale_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop the new unique constraint
        Schema::table('email_templates', function (Blueprint $table) {
            $table->dropUnique('email_templates_category_event_locale_unique');
        });

        // Restore original unique constraint
        Schema::table('email_templates', function (Blueprint $table) {
            $table->unique(['category', 'event_type']);
        });

        // Remove locale column
        Schema::table('email_templates', function (Blueprint $table) {
            $table->dropColumn('locale');
        });
    }
};