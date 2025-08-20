<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateListingAddonTranslationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('listing_addon_translations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('listing_addon_id');
            $table->string('locale', 5);
            $table->string('addon');
            $table->timestamps();
            
            $table->foreign('listing_addon_id')->references('id')->on('listing_addons')->onDelete('cascade');
            $table->unique(['listing_addon_id', 'locale']);
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
        Schema::dropIfExists('listing_addon_translations');
    }
}
