<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Agency extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'agency_name',
        'category_id',
        'sub_categories_ids',
        'short_description',
        'description',
        'status',
        'agency_logo',
        'id_city',
        'contact_name',
        'phone_number',
        'ice_number',
        'rc_number',
        'whatsapp',
        'notes',
        'email',
        'slug',
        'id_user'
    ];

    protected $casts = [
        'category_id' => 'integer',
        'id_city' => 'integer',
        'id_user' => 'integer'
    ];

    public function city()
    {
        return $this->belongsTo(City::class, 'id_city');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function features()
    {
        return $this->hasMany(AgencyFeature::class, 'agency_id');
    }
    
    public function subcategories()
    {
        return $this->hasMany(AgencySubCategory::class, 'agency_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }
}
