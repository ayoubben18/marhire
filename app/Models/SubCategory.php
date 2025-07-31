<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'subcategory',
        'logo',
        'short_description',
        'description',
        'id_category'
    ];

    public function category(){
        return $this->belongsTo(Category::class, 'id_category');
    }

    public function options()
    {
        return $this->hasMany(SubCategoryOption::class, 'subcategory_id');
    }
}
