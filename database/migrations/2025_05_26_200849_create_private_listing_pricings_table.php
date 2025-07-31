<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePrivateListingPricingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('private_listing_pricings', function (Blueprint $table) {
            $table->id();
            $table->integer('listing_id')->nullable();
            $table->integer('city_id')->nullable();
            $table->double('airport_one')->default(0);
            $table->double('airport_round')->default(0);
            $table->double('intercity_one')->default(0);
            $table->double('intercity_round')->default(0);
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
        Schema::dropIfExists('private_listing_pricings');
    }
}
