<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmailLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('email_logs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('booking_id');
            $table->string('recipient_email');
            $table->string('recipient_type', 20); // 'customer' or 'admin'
            $table->string('email_type', 50); // 'booking_received', 'booking_confirmed', etc
            $table->enum('status', ['sending', 'sent', 'failed'])->default('sending');
            $table->text('error_message')->nullable();
            $table->string('pdf_path', 500)->nullable();
            $table->json('email_data')->nullable(); // Store email content for debugging
            $table->integer('retry_count')->default(0);
            $table->timestamp('sent_at')->nullable();
            $table->timestamps();
            
            $table->foreign('booking_id')->references('id')->on('bookings');
            $table->index(['status', 'created_at']);
            $table->index(['booking_id', 'email_type']);
            $table->index('recipient_email');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('email_logs');
    }
}
