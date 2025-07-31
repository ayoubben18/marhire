<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BookingAddon extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'booking_id',
        'addon_id',
        'price'
    ];

    public function booking()
    {
        return $this->belongsTo(Booking::class, 'booking_id');
    }

    public function addon()
    {
        return $this->belongsTo(ListingAddon::class, 'addon_id');
    }
}
