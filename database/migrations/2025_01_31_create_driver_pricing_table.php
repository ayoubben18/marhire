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
        Schema::create('driver_pricings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('listing_id');
            $table->enum('service_type', ['airport_transfer', 'intercity']);
            $table->enum('road_type', ['one_way', 'road_trip']);
            $table->unsignedBigInteger('city_a_id');
            $table->unsignedBigInteger('city_b_id')->nullable();
            $table->decimal('price', 10, 2);
            $table->timestamps();

            $table->foreign('listing_id')->references('id')->on('listings')->onDelete('cascade');
            $table->foreign('city_a_id')->references('id')->on('cities');
            $table->foreign('city_b_id')->references('id')->on('cities');
            
            $table->index(['listing_id', 'service_type', 'road_type']);
            $table->index(['city_a_id', 'city_b_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('driver_pricings');
    }
};