<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Article extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'short_description',
        'content',
        'featured_img',
        'slug',
        'meta_title',
        'meta_description',
        'schema',
        'category_id',
        'user_id'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    
    /**
     * Scope for published articles
     * Assuming articles without deleted_at are published
     * You can add more conditions like status or published_at if needed
     */
    public function scopePublished($query)
    {
        // Since we're using SoftDeletes, non-deleted articles are considered published
        // Add more conditions here if you have a status or published_at field
        return $query;
    }
}
