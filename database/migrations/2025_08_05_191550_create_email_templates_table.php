<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmailTemplatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('email_templates', function (Blueprint $table) {
            $table->id();
            $table->string('category')->nullable(); // null for general templates
            $table->string('event_type'); // booking_received, booking_confirmed, etc
            $table->string('subject');
            $table->text('body_html'); // Current editable template
            $table->text('default_body_html'); // Original default template (never changed)
            $table->string('default_subject'); // Original default subject
            $table->json('available_variables')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            $table->unique(['category', 'event_type']);
            $table->index('event_type');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('email_templates');
    }
}
