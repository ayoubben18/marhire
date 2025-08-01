<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ListingGallery extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'listing_id',
        'file_name',
        'file_path'
    ];
}
