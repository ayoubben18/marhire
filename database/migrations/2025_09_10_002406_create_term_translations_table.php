<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTermTranslationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('term_translations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('term_id');
            $table->string('locale', 5);
            $table->text('title');
            $table->longText('content')->nullable();
            $table->timestamps();
            
            $table->foreign('term_id')->references('id')->on('terms_and_conditions')->onDelete('cascade');
            $table->unique(['term_id', 'locale']);
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
        Schema::dropIfExists('term_translations');
    }
}
