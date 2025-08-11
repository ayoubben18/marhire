<?php

namespace App\Models;

use App\Traits\Translatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Listing extends Model
{
    use HasFactory, SoftDeletes, Translatable;

    protected $fillable = [
        'title',
        'slug',
        'meta_title',
        'meta_description',
        'schema_markup',
        'category_id',
        'city_id',
        'car_model',
        'car_type',
        'vehicule_type',
        'vehicule_model',
        'year',
        'fuel_type',
        'transmission',
        'seats',
        'doors',
        'provider_id',
        'ac',
        'location',
        'mileage_policy',
        'fuel_policy',
        'driver_requirement',
        'deposit_required',
        'deposit_amount',
        'deposit_note',
        'special_notes',
        'pickup_info',
        'short_description',
        'description',
        'dealer_note',
        'rental_terms',
        'cancellation_policy',
        'disclaimer',
        'boat_type',
        'with_captain',
        'capacity',
        'duration_options',
        'purpose_tags',
        'departure_location',
        'max_passengers',
        'max_luggage',
        'pickup_location',
        'languages_spoken',
        'activity_type',
        'schedule_options',
        'pickup',
        'meeting_point',
        'private_or_group',
        'group_size_min',
        'group_size_max',
        'difficulty',
        'service_type',
        'price_per_hour',
        'price_per_half_day',
        'price_per_day',
        'price_per_week',
        'price_per_month',
        'price_per_person',
        'price_per_group',
        'custom_duration_options',
        'car_types_new'
    ];

    protected $casts = [
        'custom_duration_options' => 'array',
        'car_types_new' => 'array',
        'category_id' => 'integer',
        'city_id' => 'integer',
        'car_model' => 'integer',
        'car_type' => 'integer',
        'vehicule_type' => 'integer',
        'vehicule_model' => 'integer',
        'year' => 'integer',
        'seats' => 'integer',
        'doors' => 'integer',
        'provider_id' => 'integer',
        'deposit_amount' => 'float',
        'capacity' => 'integer',
        'max_passengers' => 'integer',
        'max_luggage' => 'integer',
        'activity_type' => 'integer',
        'group_size_min' => 'integer',
        'group_size_max' => 'integer',
        'service_type' => 'integer',
        'price_per_hour' => 'float',
        'price_per_half_day' => 'float',
        'price_per_day' => 'float',
        'price_per_week' => 'float',
        'price_per_month' => 'float',
        'price_per_person' => 'float',
        'price_per_group' => 'float'
    ];

    /**
     * The attributes that are translatable
     *
     * @var array
     */
    protected $translatable = [
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
     * Get translations relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function translations()
    {
        return $this->hasMany(ListingTranslation::class);
    }

    /**
     * Scope to load all translations efficiently
     * This prevents N+1 queries by loading all 3 language translations at once
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
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

    /**
     * Get translated data for frontend consumption
     * Returns all translations organized by field and locale
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
     * Returns translations for current locale with English fallback
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

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function addons()
    {
        return $this->hasMany(ListingAddonAffected::class, 'listing_id')
                     ->with('addon');
    }

    public function city()
    {
        return $this->belongsTo(City::class, 'city_id');
    }

    public function provider()
    {
        return $this->belongsTo(Agency::class, 'provider_id');
    }

    public function included()
    {
        return $this->hasMany(ListingIncluded::class, 'listing_id');
    }

    public function notIncluded()
    {
        return $this->hasMany(ListingNotIncluded::class, 'listing_id');
    }

    public function galleries()
    {
        return $this->hasMany(ListingGallery::class, 'listing_id');
    }

    public function pricings()
    {
        return $this->hasMany(PrivateListingPricing::class, 'listing_id');
    }

    public function actPricings()
    {
        return $this->hasMany(ListingPricing::class, 'listing_id');
    }

    public function serviceTypeObj()
    {
        return $this->belongsTo(SubCategoryOption::class, 'vehicule_type');
    }

    public function activityTypeObj()
    {
        return $this->belongsTo(SubCategoryOption::class, 'activity_type');
    }

    public function carTypeObj()
    {
        return $this->belongsTo(SubCategoryOption::class, 'car_type');
    }

    public function carTypeObjs()
    {
        // Get multiple car types from the JSON array field
        return SubCategoryOption::whereIn('id', $this->car_types ?? [])->get();
    }

    public function carModelObj()
    {
        return $this->belongsTo(SubCategoryOption::class, 'car_model');
    }

    public function boatTypeObj()
    {
        return $this->belongsTo(SubCategoryOption::class, 'boat_type');
    }

    public function vehicleTypeObj()
    {
        return $this->belongsTo(SubCategoryOption::class, 'vehicule_type');
    }

    public function vehicleModelObj()
    {
        return $this->belongsTo(SubCategoryOption::class, 'vehicule_model');
    }

    public function customBookingOptions()
    {
        return $this->hasMany(CustomBookingOption::class, 'listing_id');
    }

    public function driverPricings()
    {
        return $this->hasMany(DriverPricing::class, 'listing_id');
    }

    /**
     * Get car types as array (backward compatibility accessor)
     * Prioritizes new JSON field over old CSV field
     * 
     * @return array
     */
    public function getCarTypesAttribute()
    {
        // Use new JSON field if available
        if (!is_null($this->car_types_new)) {
            return $this->car_types_new;
        }
        
        // Fallback to old CSV field
        if (!empty($this->attributes['car_type'])) {
            $values = explode(',', $this->attributes['car_type']);
            return array_map('trim', array_filter($values, function($value) {
                return $value !== '' && $value !== '0';
            }));
        }
        
        return [];
    }

    /**
     * Set car types (accepts both array and CSV string)
     * Always stores in new JSON field
     * 
     * @param mixed $value
     */
    public function setCarTypesAttribute($value)
    {
        if (is_array($value)) {
            $this->car_types_new = array_filter($value, function($val) {
                return !empty($val) && $val !== '0';
            });
        } elseif (is_string($value)) {
            $values = explode(',', $value);
            $this->car_types_new = array_map('trim', array_filter($values, function($val) {
                return !empty(trim($val)) && trim($val) !== '0';
            }));
        } else {
            $this->car_types_new = [];
        }
    }

    /**
     * Check if deposit is required for this listing
     * Handles the optional nature of deposits for boat rentals
     * 
     * @return bool
     */
    public function isDepositRequired()
    {
        // For boat rentals (category_id = 4), deposit is optional
        if ($this->category_id == 4) {
            return !empty($this->deposit_required) && 
                   strtolower($this->deposit_required) === 'yes';
        }
        
        // For other categories, use existing logic
        return !empty($this->deposit_required) && 
               strtolower($this->deposit_required) === 'yes';
    }

    /**
     * Get deposit amount with proper validation
     * 
     * @return float|null
     */
    public function getDepositAmountAttribute($value)
    {
        if (!$this->isDepositRequired()) {
            return null;
        }
        
        return !empty($value) ? (float) $value : null;
    }

}
