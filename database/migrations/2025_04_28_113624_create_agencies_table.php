<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAgenciesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('agencies', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->nullable();
            $table->string('agency_name')->nullable();
            $table->integer('category_id')->default(-1);
            $table->string('sub_categories_ids')->nullable();
            $table->text('short_description')->nullable();
            $table->text('description')->nullable();
            $table->string('status')->default('Active');
            $table->string('agency_logo')->nullable();
            $table->integer('id_city')->default(-1);
            $table->string('contact_name')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('whatsapp')->nullable();
            $table->string('email')->nullable();
            $table->string('notes')->nullable();
            $table->integer('id_user')->nullable();
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
        Schema::dropIfExists('agencies');
    }
}
