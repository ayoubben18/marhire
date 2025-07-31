<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Page extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'slug',
        'meta_title',
        'meta_description',
        'schema_markup',
        'content_sections',
    ];

    protected $casts = [
        'content_sections' => 'array',
    ];

}
