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
        Schema::table('bookings', function (Blueprint $table) {
            $table->string('booking_language', 5)->default('en')->after('booking_source');
            $table->index('booking_language');
        });

        // Backfill existing bookings with 'en'
        DB::table('bookings')->update(['booking_language' => 'en']);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropIndex(['booking_language']);
            $table->dropColumn('booking_language');
        });
    }
};