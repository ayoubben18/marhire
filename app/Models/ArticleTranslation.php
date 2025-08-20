<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArticleTranslation extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'article_id',
        'locale',
        'title',
        'short_description',
        'content',
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
            'article_id' => 'required|exists:articles,id',
            'locale' => 'required|string|max:5|in:' . implode(',', config('app.supported_locales', ['en', 'fr', 'es'])),
            'title' => 'required|string',
            'short_description' => 'nullable|string',
            'content' => 'nullable|string',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string'
        ];
    }

    /**
     * Get the article that owns the translation
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function article()
    {
        return $this->belongsTo(Article::class);
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
     * @param int $articleId
     * @param string $locale
     * @return static
     */
    public static function getOrCreate($articleId, $locale)
    {
        return static::firstOrCreate([
            'article_id' => $articleId,
            'locale' => $locale
        ]);
    }
}
