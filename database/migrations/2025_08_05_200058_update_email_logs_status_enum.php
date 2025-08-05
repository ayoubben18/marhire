<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class UpdateEmailLogsStatusEnum extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // For MySQL/MariaDB, we need to use raw SQL to modify enum
        DB::statement("ALTER TABLE email_logs MODIFY COLUMN status ENUM('sending', 'sent', 'failed', 'skipped') DEFAULT 'sending'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Revert to original enum values
        // First, update any 'skipped' values to 'failed' to avoid data loss
        DB::table('email_logs')->where('status', 'skipped')->update(['status' => 'failed']);
        
        // Then modify the column
        DB::statement("ALTER TABLE email_logs MODIFY COLUMN status ENUM('sending', 'sent', 'failed') DEFAULT 'sending'");
    }
}