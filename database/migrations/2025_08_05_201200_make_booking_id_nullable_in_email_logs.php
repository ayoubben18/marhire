<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class MakeBookingIdNullableInEmailLogs extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Use raw SQL to make booking_id nullable
        DB::statement('ALTER TABLE email_logs MODIFY booking_id BIGINT UNSIGNED NULL');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Use raw SQL to revert booking_id to non-nullable
        DB::statement('ALTER TABLE email_logs MODIFY booking_id BIGINT UNSIGNED NOT NULL');
    }
}