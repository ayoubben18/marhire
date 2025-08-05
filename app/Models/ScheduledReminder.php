<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ScheduledReminder extends Model
{
    protected $fillable = [
        'booking_id',
        'send_at',
        'status'
    ];

    protected $casts = [
        'send_at' => 'datetime',
    ];

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }
}