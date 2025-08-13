<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPrivateDriverFieldsToBookings extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('bookings', function (Blueprint $table) {
            // Add missing private driver specific fields
            $table->integer('number_of_passengers')->nullable()->after('number_of_people');
            $table->integer('number_of_luggage')->nullable()->after('number_of_passengers');
            $table->string('service_types')->nullable()->after('airport_or_intercity');
            $table->string('road_types')->nullable()->after('service_types');
            $table->string('pickup_address')->nullable()->after('pickup_location');
            $table->string('dropoff_address')->nullable()->after('droppoff_location');
            $table->string('time_preference')->nullable()->after('pickup_time'); // For activities
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
                'number_of_passengers',
                'number_of_luggage', 
                'service_types',
                'road_types',
                'pickup_address',
                'dropoff_address',
                'time_preference'
            ]);
        });
    }
}