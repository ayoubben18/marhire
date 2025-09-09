<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PageTranslation extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'page_id',
        'locale',
        'meta_title',
        'meta_description',
        'content_sections'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'content_sections' => 'array',
    ];

    /**
     * Validation rules for the model
     *
     * @return array
     */
    public static function rules()
    {
        return [
            'page_id' => 'required|exists:pages,id',
            'locale' => 'required|string|max:5|in:' . implode(',', config('app.supported_locales', ['en', 'fr', 'es'])),
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'content_sections' => 'nullable|array'
        ];
    }

    /**
     * Get the page that owns the translation
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function page()
    {
        return $this->belongsTo(Page::class);
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
     * @param int $pageId
     * @param string $locale
     * @return static
     */
    public static function getOrCreate($pageId, $locale)
    {
        return static::firstOrCreate([
            'page_id' => $pageId,
            'locale' => $locale
        ]);
    }
}
