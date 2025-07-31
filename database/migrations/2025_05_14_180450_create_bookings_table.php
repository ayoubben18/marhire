<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBookingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->integer('category_id')->default(-1);
            $table->integer('listing_id')->default(-1);
            $table->integer('activity_type')->nullable();
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('email')->nullable();
            $table->string('whatsapp')->nullable();
            $table->string('country')->nullable();
            $table->string('status')->default('Pending');
            $table->double('booking_price')->nullable();
            $table->double('total_addons')->nullable();
            $table->double('total_price')->nullable();
            $table->double('net_agency_price')->nullable();
            $table->double('commission_amount')->nullable();
            $table->string('notes')->nullable();
            $table->integer('age')->nullable();
            $table->string('pickup_date')->nullable();
            $table->string('pickup_time')->nullable();
            $table->string('dropoff_date')->nullable();
            $table->string('dropoff_time')->nullable();
            $table->string('pickup_location')->nullable();
            $table->string('droppoff_location')->nullable();
            $table->string('duration')->nullable();
            $table->string('propose')->nullable();
            $table->integer('number_of_people')->nullable();
            $table->string('prefered_date')->nullable();
            $table->integer('pricing_option_id')->default(-1);
            $table->string('flight_number')->nullable();
            $table->string('booking_source')->default('Admin Entry');
            $table->double('discount_or_extra')->default(0);
            $table->string('airport_or_intercity')->nullable();
            $table->integer('car_type')->nullable();
            $table->integer('city_id')->nullable();
            $table->integer('city_a_id')->nullable();
            $table->integer('city_b_id')->nullable();
            $table->integer('created_by')->default(-1);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bookings');
    }
}
