<?php

namespace App\Models;

use App\Traits\Translatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ListingAddon extends Model
{
    use HasFactory, SoftDeletes, Translatable;

    protected $fillable = [
        'addon',
        'category_id',
        'price'
    ];

    protected $casts = [
        'category_id' => 'integer',
        'price' => 'float'
    ];

    /**
     * The attributes that should be translated
     *
     * @var array
     */
    protected $translatable = [
        'addon'
    ];

    /**
     * Get all translations for this addon
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function translations()
    {
        return $this->hasMany(ListingAddonTranslation::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
}
