<?php

namespace App\Models;

use App\Traits\Translatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TermsAndConditions extends Model
{
    use HasFactory, SoftDeletes, Translatable;

    protected $fillable = [
        'title',
        'category_id',
        'content'
    ];

    /**
     * The attributes that are translatable
     *
     * @var array
     */
    protected $translatable = [
        'title',
        'content'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    /**
     * Get all translations for this term
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function translations()
    {
        return $this->hasMany(TermTranslation::class, 'term_id');
    }
    
    /**
     * Get all translations for all translatable fields
     *
     * @return array
     */
    public function getTranslatedData()
    {
        $data = [];
        
        foreach ($this->translatable as $field) {
            $data[$field] = $this->getAllTranslations($field);
            
            // Ensure all languages have a value (fallback to English)
            foreach (['en', 'fr', 'es'] as $locale) {
                if (!isset($data[$field][$locale])) {
                    // Use English as fallback, or original attribute
                    $data[$field][$locale] = $data[$field]['en'] ?? $this->attributes[$field] ?? null;
                }
            }
        }
        
        return $data;
    }
    
    /**
     * Get optimized translated data for current locale only
     *
     * @return array
     */
    public function getCurrentTranslatedData()
    {
        $currentLocale = app()->getLocale();
        $data = [];
        
        foreach ($this->translatable as $field) {
            // Get current locale translation with English fallback
            $translations = $this->getAllTranslations($field);
            
            // Only return current locale and English
            $data[$field] = [
                'en' => $translations['en'] ?? $this->attributes[$field] ?? null,
            ];
            
            if ($currentLocale !== 'en') {
                $data[$field][$currentLocale] = $translations[$currentLocale] 
                    ?? $translations['en'] 
                    ?? $this->attributes[$field] 
                    ?? null;
            }
        }
        
        return $data;
    }

    /**
     * Scope to load all translations efficiently
     */
    public function scopeWithAllTranslations($query)
    {
        return $query->with(['translations' => function ($q) {
            // Load all 3 languages at once
            $q->whereIn('locale', ['en', 'fr', 'es']);
        }]);
    }
    
    /**
     * Load translations for current locale and English fallback only
     * This optimizes queries when full page reload happens on language change
     */
    public function scopeWithCurrentTranslations($query)
    {
        $currentLocale = app()->getLocale();
        $locales = ['en']; // Always include English as fallback
        
        // Add current locale if it's not English
        if ($currentLocale !== 'en' && in_array($currentLocale, ['fr', 'es'])) {
            $locales[] = $currentLocale;
        }
        
        return $query->with(['translations' => function ($q) use ($locales) {
            $q->whereIn('locale', $locales);
        }]);
    }
}
