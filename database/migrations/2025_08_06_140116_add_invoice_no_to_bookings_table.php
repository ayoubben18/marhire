<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddInvoiceNoToBookingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->string('invoice_no', 50)->nullable()->after('id')->index();
        });
        
        // Update existing bookings with invoice numbers
        $this->updateExistingBookings();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropColumn('invoice_no');
        });
    }
    
    /**
     * Generate invoice numbers for existing bookings
     */
    private function updateExistingBookings()
    {
        $bookings = \DB::table('bookings')->orderBy('id')->get();
        
        foreach ($bookings as $booking) {
            $bookingDate = \Carbon\Carbon::parse($booking->created_at)->format('Ymd');
            $incrementalNumber = 500 + $booking->id;
            $invoiceNo = 'INV-' . $bookingDate . '-' . str_pad($incrementalNumber, 4, '0', STR_PAD_LEFT);
            
            \DB::table('bookings')
                ->where('id', $booking->id)
                ->update(['invoice_no' => $invoiceNo]);
        }
    }
}
