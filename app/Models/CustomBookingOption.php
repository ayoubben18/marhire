<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomBookingOption extends Model
{
    use HasFactory;

    protected $fillable = [
        'listing_id',
        'name',
        'price'
    ];

    protected $casts = [
        'price' => 'decimal:2'
    ];

    public function listing()
    {
        return $this->belongsTo(Listing::class);
    }
}