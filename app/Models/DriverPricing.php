<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DriverPricing extends Model
{
    use HasFactory;

    protected $fillable = [
        'listing_id',
        'service_type',
        'road_type',
        'city_a_id',
        'city_b_id',
        'price'
    ];

    protected $casts = [
        'price' => 'decimal:2'
    ];

    public function listing()
    {
        return $this->belongsTo(Listing::class);
    }

    public function cityA()
    {
        return $this->belongsTo(City::class, 'city_a_id');
    }

    public function cityB()
    {
        return $this->belongsTo(City::class, 'city_b_id');
    }
}