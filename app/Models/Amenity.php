<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Amenity extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'listing_id'
    ];

    public function listing()
    {
        return $this->belongsTo(Listing::class, 'listing_id');
    }
}
