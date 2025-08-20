<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'category',
        'logo',
        'short_description',
        'description'
    ];

    public function subcategories(){
        return $this->hasMany(SubCategory::class, 'id_category');
    }

    public function articles(){
        return $this->hasMany(Article::class, 'category_id');
    }

}
