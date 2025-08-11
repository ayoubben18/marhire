<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateListingTranslationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('listing_translations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('listing_id');
            $table->string('locale', 5);
            $table->text('title');
            $table->text('description')->nullable();
            $table->text('short_description')->nullable();
            $table->text('special_notes')->nullable();
            $table->text('cancellation_policy')->nullable();
            $table->text('rental_terms')->nullable();
            $table->text('pickup_info')->nullable();
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->timestamps();
            
            $table->foreign('listing_id')->references('id')->on('listings')->onDelete('cascade');
            $table->unique(['listing_id', 'locale']);
            $table->index('locale');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('listing_translations');
    }
}
