<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AgencySubCategory extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'subcategory_id',
        'option_id',
        'agency_id'
    ];

    public function options()
    {
        return $this->hasMany(SubCategoryOption::class, 'subcategory_id', 'subcategory_id');
    }
}
