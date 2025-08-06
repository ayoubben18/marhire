<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ListingAddonAffected extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'addon_id',
        'listing_id'
    ];

    protected $casts = [
        'addon_id' => 'integer',
        'listing_id' => 'integer'
    ];

    public function addon()
    {
        return $this->belongsTo(ListingAddon::class, 'addon_id');
    }
}
