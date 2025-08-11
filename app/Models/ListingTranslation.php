<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ListingTranslation extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'listing_id',
        'locale',
        'title',
        'description',
        'short_description',
        'special_notes',
        'cancellation_policy',
        'rental_terms',
        'pickup_info',
        'meta_title',
        'meta_description'
    ];

    /**
     * Validation rules for the model
     *
     * @return array
     */
    public static function rules()
    {
        return [
            'listing_id' => 'required|exists:listings,id',
            'locale' => 'required|string|max:5|in:' . implode(',', config('app.supported_locales', ['en', 'fr', 'es'])),
            'title' => 'required|string',
            'description' => 'nullable|string',
            'short_description' => 'nullable|string',
            'special_notes' => 'nullable|string',
            'cancellation_policy' => 'nullable|string',
            'rental_terms' => 'nullable|string',
            'pickup_info' => 'nullable|string',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string'
        ];
    }

    /**
     * Get the listing that owns the translation
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function listing()
    {
        return $this->belongsTo(Listing::class);
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
     * @param int $listingId
     * @param string $locale
     * @return static
     */
    public static function getOrCreate($listingId, $locale)
    {
        return static::firstOrCreate([
            'listing_id' => $listingId,
            'locale' => $locale
        ]);
    }
}