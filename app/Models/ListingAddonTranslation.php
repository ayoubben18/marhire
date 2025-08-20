<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ListingAddonTranslation extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'listing_addon_id',
        'locale',
        'addon'
    ];

    /**
     * Validation rules for the model
     *
     * @return array
     */
    public static function rules()
    {
        return [
            'listing_addon_id' => 'required|exists:listing_addons,id',
            'locale' => 'required|string|max:5|in:' . implode(',', config('app.supported_locales', ['en', 'fr', 'es'])),
            'addon' => 'required|string|max:255'
        ];
    }

    /**
     * Get the listing addon that owns the translation
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function listingAddon()
    {
        return $this->belongsTo(ListingAddon::class);
    }

    /**
     * Scope to filter by locale
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string $locale
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeLocale($query, $locale)
    {
        return $query->where('locale', $locale);
    }

    /**
     * Get translation for a specific locale or create new
     *
     * @param int $listingAddonId
     * @param string $locale
     * @return static
     */
    public static function getOrCreate($listingAddonId, $locale)
    {
        return static::firstOrCreate([
            'listing_addon_id' => $listingAddonId,
            'locale' => $locale
        ]);
    }
}