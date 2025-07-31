<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ListingPricing extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'listing_id',
        'element',
        'price'
    ];

    public function listing()
    {
        return $this->belongsTo(Listing::class, 'listing_id');
    }
}
