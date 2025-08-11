<?php

namespace App\Traits;

use Illuminate\Support\Facades\App;

trait Translatable
{
    protected $currentLocale = null;
    protected $loadedTranslations = null;

    /**
     * Get translation for a specific field with efficient loading
     *
     * @param string $field
     * @param string|null $locale
     * @return mixed
     */
    public function getTranslation($field, $locale = null)
    {
        $locale = $locale ?: $this->currentLocale ?: App::getLocale();
        
        if (!in_array($field, $this->translatable ?? [])) {
            return $this->attributes[$field] ?? null;
        }

        // If translations are already loaded, use them
        if ($this->relationLoaded('translations')) {
            $translation = $this->translations->where('locale', $locale)->first();
            
            if ($translation && isset($translation->$field)) {
                return $translation->$field;
            }

            // Fallback to English if not found
            if ($locale !== 'en') {
                $englishTranslation = $this->translations->where('locale', 'en')->first();
                if ($englishTranslation && isset($englishTranslation->$field)) {
                    return $englishTranslation->$field;
                }
            }

            // Final fallback to original attribute
            return $this->attributes[$field] ?? null;
        }

        // Old behavior for backward compatibility (but should be avoided)
        $translation = $this->translations()
            ->where('locale', $locale)
            ->first();

        if ($translation && isset($translation->$field)) {
            return $translation->$field;
        }

        // Fallback to default locale
        if ($locale !== config('app.fallback_locale')) {
            return $this->getTranslation($field, config('app.fallback_locale'));
        }

        // Fallback to original attribute
        return $this->attributes[$field] ?? null;
    }

    /**
     * Get all translations for a field organized by locale
     *
     * @param string $field
     * @return array
     */
    public function getAllTranslations($field)
    {
        if (!in_array($field, $this->translatable ?? [])) {
            return [];
        }

        $translations = [];
        
        if ($this->relationLoaded('translations')) {
            foreach ($this->translations as $translation) {
                if (isset($translation->$field)) {
                    $translations[$translation->locale] = $translation->$field;
                }
            }
        }

        // Add fallback value if no translations exist
        if (empty($translations) && isset($this->attributes[$field])) {
            $translations['en'] = $this->attributes[$field];
        }

        return $translations;
    }

    /**
     * Get translation with explicit fallback chain
     *
     * @param string $field
     * @param string $locale
     * @return mixed
     */
    public function getTranslationWithFallback($field, $locale)
    {
        // Try requested locale
        $value = $this->getTranslationValue($field, $locale);
        if ($value !== null) return $value;

        // Try English as fallback
        if ($locale !== 'en') {
            $value = $this->getTranslationValue($field, 'en');
            if ($value !== null) return $value;
        }

        // Try any available translation
        if ($this->relationLoaded('translations')) {
            foreach ($this->translations as $translation) {
                if (isset($translation->$field)) {
                    return $translation->$field;
                }
            }
        }

        // Final fallback to original attribute
        return $this->attributes[$field] ?? null;
    }

    /**
     * Helper to get translation value for a specific locale
     *
     * @param string $field
     * @param string $locale
     * @return mixed
     */
    private function getTranslationValue($field, $locale)
    {
        if ($this->relationLoaded('translations')) {
            $translation = $this->translations->where('locale', $locale)->first();
            return $translation->$field ?? null;
        }
        
        return null;
    }

    /**
     * Set the model's locale for translation
     *
     * @param string $locale
     * @return $this
     */
    public function translate($locale)
    {
        $this->currentLocale = $locale;
        return $this;
    }

    /**
     * Check if translation exists for a locale
     *
     * @param string $locale
     * @return bool
     */
    public function hasTranslation($locale)
    {
        return $this->translations()
            ->where('locale', $locale)
            ->exists();
    }

    /**
     * Get all translations
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    abstract public function translations();

    /**
     * Override getAttribute to automatically return translated values
     *
     * @param string $key
     * @return mixed
     */
    public function getAttribute($key)
    {
        // Check if this is a translatable field
        if (in_array($key, $this->translatable ?? [])) {
            $translation = $this->getTranslation($key);
            if ($translation !== null) {
                return $translation;
            }
        }

        return parent::getAttribute($key);
    }

    /**
     * Get or create translation for a locale
     *
     * @param string $locale
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function getOrCreateTranslation($locale)
    {
        $translation = $this->translations()
            ->where('locale', $locale)
            ->first();

        if (!$translation) {
            $translationClass = get_class($this) . 'Translation';
            $translation = new $translationClass();
            $translation->locale = $locale;
            $this->translations()->save($translation);
        }

        return $translation;
    }

    /**
     * Update translations for multiple locales
     *
     * @param array $data
     * @return void
     */
    public function updateTranslations(array $data)
    {
        foreach ($data as $locale => $fields) {
            $translation = $this->getOrCreateTranslation($locale);
            $translation->fill($fields);
            $translation->save();
        }
    }

    /**
     * Delete translations for a specific locale or all
     *
     * @param string|null $locale
     * @return void
     */
    public function deleteTranslations($locale = null)
    {
        $query = $this->translations();
        
        if ($locale) {
            $query->where('locale', $locale);
        }
        
        $query->delete();
    }

    /**
     * Copy translations from one locale to another
     *
     * @param string $fromLocale
     * @param string $toLocale
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function copyTranslations($fromLocale, $toLocale)
    {
        $sourceTranslation = $this->translations()
            ->where('locale', $fromLocale)
            ->first();

        if (!$sourceTranslation) {
            return null;
        }

        $targetTranslation = $this->getOrCreateTranslation($toLocale);
        
        foreach ($this->translatable as $field) {
            if (isset($sourceTranslation->$field)) {
                $targetTranslation->$field = $sourceTranslation->$field;
            }
        }
        
        $targetTranslation->save();
        
        return $targetTranslation;
    }

    /**
     * Get available locales for this model
     *
     * @return array
     */
    public function getAvailableLocales()
    {
        return $this->translations()
            ->pluck('locale')
            ->unique()
            ->toArray();
    }
}