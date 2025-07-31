<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateBookingsTableV2 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('bookings', function (Blueprint $table) {
            // Add new fields
            $table->date('date_of_birth')->nullable()->after('age');
            $table->string('whatsapp_number')->nullable()->after('whatsapp');
            $table->string('country_of_residence')->nullable()->after('country');
            $table->boolean('terms_accepted')->default(false)->after('created_by');
            $table->string('full_name')->nullable()->after('listing_id');
            $table->text('additional_notes')->nullable()->after('notes');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropColumn([
                'date_of_birth',
                'whatsapp_number', 
                'country_of_residence',
                'terms_accepted',
                'full_name',
                'additional_notes'
            ]);
        });
    }
}
