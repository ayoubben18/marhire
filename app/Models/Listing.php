<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Listing extends Model
{
    use HasFactory, SoftDeletes;

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
        'custom_duration_options'
    ];

    protected $casts = [
        'custom_duration_options' => 'array',
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

    public function customBookingOptions()
    {
        return $this->hasMany(CustomBookingOption::class, 'listing_id');
    }

    public function driverPricings()
    {
        return $this->hasMany(DriverPricing::class, 'listing_id');
    }

}
