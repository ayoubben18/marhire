<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ListingAddon extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'addon',
        'category_id',
        'price'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
}
