<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CleanupInvoiceCounters extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Drop the invoice_counters table as we now use booking ID
        Schema::dropIfExists('invoice_counters');
        
        // Update all existing bookings to use the new formula
        $bookings = \DB::table('bookings')->get();
        foreach ($bookings as $booking) {
            $dateString = \Carbon\Carbon::parse($booking->created_at)->format('Ymd');
            $invoiceNumber = 500 + $booking->id;
            $invoiceNo = 'INV-' . $dateString . '-' . str_pad($invoiceNumber, 4, '0', STR_PAD_LEFT);
            
            \DB::table('bookings')
                ->where('id', $booking->id)
                ->update(['invoice_no' => $invoiceNo]);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Recreate the invoice_counters table if rolling back
        Schema::create('invoice_counters', function (Blueprint $table) {
            $table->id();
            $table->string('year_month', 6)->unique();
            $table->integer('last_number')->default(500);
            $table->timestamps();
        });
    }
}