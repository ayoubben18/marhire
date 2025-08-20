<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class TranslationService
{
    /**
     * Get or create a translation for a model
     *
     * @param Model $model
     * @param string $locale
     * @return Model|null
     */
    public function getOrCreateTranslation(Model $model, string $locale)
    {
        if (!method_exists($model, 'translations')) {
            throw new \InvalidArgumentException('Model must have translations() relationship');
        }

        $translation = $model->translations()
            ->where('locale', $locale)
            ->first();

        if (!$translation) {
            $translationClass = get_class($model) . 'Translation';
            
            if (!class_exists($translationClass)) {
                throw new \InvalidArgumentException("Translation class {$translationClass} does not exist");
            }

            $translation = new $translationClass();
            $translation->locale = $locale;
            
            // Handle different foreign key names
            if ($model instanceof \App\Models\Listing) {
                $translation->listing_id = $model->id;
                $translation->title = $model->title ?? '';
            } elseif ($model instanceof \App\Models\ListingAddon) {
                $translation->listing_addon_id = $model->id;
                $translation->addon = $model->addon ?? '';
            }
            
            $translation->save();
        }

        return $translation;
    }

    /**
     * Update translations for a model
     *
     * @param Model $model
     * @param array $data
     * @return bool
     */
    public function updateTranslations(Model $model, array $data)
    {
        try {
            DB::beginTransaction();

            foreach ($data as $locale => $fields) {
                $translation = $this->getOrCreateTranslation($model, $locale);
                
                // Filter out non-fillable fields
                $fillableFields = array_intersect_key(
                    $fields,
                    array_flip($translation->getFillable())
                );
                
                $translation->fill($fillableFields);
                $translation->save();
            }

            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Failed to update translations: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Delete translations for a model
     *
     * @param Model $model
     * @param string|null $locale
     * @return bool
     */
    public function deleteTranslations(Model $model, $locale = null)
    {
        try {
            $query = $model->translations();
            
            if ($locale) {
                $query->where('locale', $locale);
            }
            
            $query->delete();
            return true;
        } catch (\Exception $e) {
            Log::error('Failed to delete translations: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Copy translations from one locale to another
     *
     * @param string $fromLocale
     * @param string $toLocale
     * @param Model|null $model
     * @return bool
     */
    public function copyTranslations(string $fromLocale, string $toLocale, Model $model = null)
    {
        try {
            DB::beginTransaction();

            if ($model) {
                // Copy for specific model
                $this->copyModelTranslations($model, $fromLocale, $toLocale);
            } else {
                // Copy for all translatable models
                $this->copyAllTranslations($fromLocale, $toLocale);
            }

            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Failed to copy translations: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Copy translations for a specific model
     *
     * @param Model $model
     * @param string $fromLocale
     * @param string $toLocale
     * @return Model|null
     */
    protected function copyModelTranslations(Model $model, string $fromLocale, string $toLocale)
    {
        $sourceTranslation = $model->translations()
            ->where('locale', $fromLocale)
            ->first();

        if (!$sourceTranslation) {
            return null;
        }

        $targetTranslation = $this->getOrCreateTranslation($model, $toLocale);
        
        // Copy all translatable fields
        $attributes = $sourceTranslation->toArray();
        unset($attributes['id'], $attributes['locale'], $attributes['created_at'], $attributes['updated_at']);
        
        foreach ($attributes as $key => $value) {
            if (in_array($key, $targetTranslation->getFillable())) {
                $targetTranslation->$key = $value;
            }
        }
        
        $targetTranslation->save();
        
        return $targetTranslation;
    }

    /**
     * Copy all translations from one locale to another
     *
     * @param string $fromLocale
     * @param string $toLocale
     * @return void
     */
    protected function copyAllTranslations(string $fromLocale, string $toLocale)
    {
        // Get all translatable models
        $models = $this->getTranslatableModels();

        foreach ($models as $modelClass) {
            $modelInstance = new $modelClass();
            
            // Get all records with translations in source locale
            $records = $modelClass::whereHas('translations', function ($query) use ($fromLocale) {
                $query->where('locale', $fromLocale);
            })->get();

            foreach ($records as $record) {
                $this->copyModelTranslations($record, $fromLocale, $toLocale);
            }
        }
    }

    /**
     * Get all models that use the Translatable trait
     *
     * @return array
     */
    protected function getTranslatableModels()
    {
        // For now, return known translatable models
        // In a larger application, this could scan for models using the trait
        return [
            \App\Models\Listing::class,
            \App\Models\ListingAddon::class,
            // Add other translatable models here as they are created
        ];
    }

    /**
     * Get translation statistics
     *
     * @param Model|null $model
     * @return array
     */
    public function getTranslationStats(Model $model = null)
    {
        $stats = [];
        $locales = config('app.supported_locales', ['en', 'fr', 'es']);

        if ($model) {
            foreach ($locales as $locale) {
                $stats[$locale] = $model->translations()
                    ->where('locale', $locale)
                    ->count();
            }
        } else {
            foreach ($this->getTranslatableModels() as $modelClass) {
                $modelName = class_basename($modelClass);
                $stats[$modelName] = [];
                
                foreach ($locales as $locale) {
                    $translationClass = $modelClass . 'Translation';
                    if (class_exists($translationClass)) {
                        $stats[$modelName][$locale] = $translationClass::where('locale', $locale)->count();
                    }
                }
            }
        }

        return $stats;
    }

    /**
     * Bulk translate multiple models
     *
     * @param array $models
     * @param array $translations
     * @return bool
     */
    public function bulkTranslate(array $models, array $translations)
    {
        try {
            DB::beginTransaction();

            foreach ($models as $model) {
                $this->updateTranslations($model, $translations);
            }

            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Bulk translation failed: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Check if a model has translations for all supported locales
     *
     * @param Model $model
     * @return array
     */
    public function getMissingTranslations(Model $model)
    {
        $supportedLocales = config('app.supported_locales', ['en', 'fr', 'es']);
        $existingLocales = $model->translations()->pluck('locale')->toArray();
        
        return array_diff($supportedLocales, $existingLocales);
    }

    /**
     * Sync translations with fallback values
     *
     * @param Model $model
     * @param string $fallbackLocale
     * @return bool
     */
    public function syncWithFallback(Model $model, string $fallbackLocale = null)
    {
        $fallbackLocale = $fallbackLocale ?: config('app.fallback_locale', 'en');
        $missingLocales = $this->getMissingTranslations($model);

        if (empty($missingLocales)) {
            return true;
        }

        foreach ($missingLocales as $locale) {
            $this->copyModelTranslations($model, $fallbackLocale, $locale);
        }

        return true;
    }
}