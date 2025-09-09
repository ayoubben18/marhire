<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TermTranslation extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'term_id',
        'locale',
        'title',
        'content'
    ];

    /**
     * Validation rules for the model
     *
     * @return array
     */
    public static function rules()
    {
        return [
            'term_id' => 'required|exists:terms_and_conditions,id',
            'locale' => 'required|string|max:5|in:' . implode(',', config('app.supported_locales', ['en', 'fr', 'es'])),
            'title' => 'required|string',
            'content' => 'nullable|string'
        ];
    }

    /**
     * Get the term that owns the translation
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function term()
    {
        return $this->belongsTo(TermsAndConditions::class, 'term_id');
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
     * @param int $termId
     * @param string $locale
     * @return static
     */
    public static function getOrCreate($termId, $locale)
    {
        return static::firstOrCreate([
            'term_id' => $termId,
            'locale' => $locale
        ]);
    }
}
