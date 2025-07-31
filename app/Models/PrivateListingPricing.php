<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PrivateListingPricing extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'listing_id',
        'city_id',
        'airport_one',
        'airport_round',
        'intercity_one',
        'intercity_round'
    ];

    public function city()
    {
        return $this->belongsTo(City::class, 'city_id');
    }
}
