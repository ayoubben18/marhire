<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvoiceCountersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoice_counters', function (Blueprint $table) {
            $table->id();
            $table->string('year_month', 6)->unique(); // Format: YYYYMM
            $table->integer('last_number')->default(500); // Starting from 500
            $table->timestamps();
        });
        
        // Initialize counter for current month
        $currentYearMonth = date('Ym');
        \DB::table('invoice_counters')->insert([
            'year_month' => $currentYearMonth,
            'last_number' => 500,
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('invoice_counters');
    }
}
