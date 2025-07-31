<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateListingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('listings', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->string('slug')->nullable();
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->text('schema_markup')->nullable();
            $table->integer('category_id')->default(-1);
            $table->integer('city_id')->default(-1);
            $table->string('car_type')->nullable();
            $table->string('car_model')->nullable();
            $table->string('vehicule_type')->nullable();
            $table->string('vehicule_model')->nullable();
            $table->string('service_type')->nullable();
            $table->string('year')->nullable();
            $table->string('fuel_type')->nullable();
            $table->string('transmission')->nullable();
            $table->string('seats')->nullable();
            $table->string('doors')->nullable();
            $table->integer('provider_id')->default(-1);
            $table->string('ac')->nullable();
            $table->string('location')->nullable();
            $table->string('mileage_policy')->nullable();
            $table->string('fuel_policy')->nullable();
            $table->string('driver_requirement')->nullable();
            $table->string('deposit_required')->nullable();
            $table->string('deposit_amount')->nullable();
            $table->string('deposit_note')->nullable();
            $table->text('special_notes')->nullable();
            $table->text('pickup_info')->nullable();
            $table->string('boat_type')->nullable();
            $table->string('with_captain')->nullable();
            $table->string('capacity')->nullable();
            $table->string('duration_options')->nullable();
            $table->string('purpose_tags')->nullable();
            $table->string('departure_location')->nullable();
            $table->string('max_passengers')->nullable();
            $table->string('max_luggage')->nullable();
            $table->string('pickup_location')->nullable();
            $table->string('languages_spoken')->nullable();
            $table->string('activity_type')->nullable();
            $table->string('schedule_options')->nullable();
            $table->string('pickup')->nullable();
            $table->string('meeting_point')->nullable();
            $table->string('private_or_group')->nullable();
            $table->string('group_size_min')->nullable();
            $table->string('group_size_max')->nullable();
            $table->string('difficulty')->nullable();
            $table->text('short_description')->nullable();
            $table->text('description')->nullable();
            $table->text('dealer_note')->nullable();
            $table->text('rental_terms')->nullable();
            $table->text('cancellation_policy')->nullable();
            $table->text('disclaimer')->nullable();
            $table->double('price_per_hour')->nullable();
            $table->double('price_per_half_day')->nullable();
            $table->double('price_per_day')->nullable();
            $table->double('price_per_week')->nullable();
            $table->double('price_per_month')->nullable();
            $table->double('price_per_person')->nullable();
            $table->double('price_per_group')->nullable();
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
        Schema::dropIfExists('listings');
    }
}
