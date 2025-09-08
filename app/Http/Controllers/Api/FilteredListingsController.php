<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Listing;
use App\Models\ListingGallery;
use App\Models\City;
use App\Models\Agency;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FilteredListingsController extends Controller
{
    public function index(Request $request)
    {
        try {
            // Get current locale
            $locale = $request->get('locale', app()->getLocale());
            app()->setLocale($locale);
            
            $query = Listing::query();

            // Filter by city
            if ($request->has('city') && $request->city) {
                $city = City::where('city_name', $request->city)->first();
                if ($city) {
                    $query->where('city_id', $city->id);
                }
            }

            // Filter by multiple cities
            if ($request->has('cities') && $request->cities) {
                $cityNames = is_array($request->cities) ? $request->cities : explode(',', $request->cities);
                $cityIds = City::whereIn('city_name', $cityNames)->pluck('id');
                $query->whereIn('city_id', $cityIds);
            }

            // Filter by provider IDs (using provider_id instead of agency_id)
            if ($request->has('agency_ids') && $request->agency_ids) {
                $agencyIds = is_array($request->agency_ids) ? $request->agency_ids : explode(',', $request->agency_ids);
                $query->whereIn('provider_id', $agencyIds);
            }

            // Filter by single category ID
            if ($request->has('category_id') && $request->category_id) {
                $query->where('category_id', $request->category_id);
            }

            // Filter by multiple categories
            if ($request->has('categories') && $request->categories) {
                $categoryIds = is_array($request->categories) ? $request->categories : explode(',', $request->categories);
                $query->whereIn('category_id', $categoryIds);
            }

            // Filter by subcategory IDs based on category
            if ($request->has('subcategory_ids') && $request->subcategory_ids) {
                $subcategoryIds = is_array($request->subcategory_ids) ? $request->subcategory_ids : explode(',', $request->subcategory_ids);
                
                // Determine which field to filter based on categories
                if ($request->has('category_id')) {
                    $categoryId = (int)$request->category_id;
                    switch ($categoryId) {
                        case 2: // Cars
                            $query->whereIn('car_type', $subcategoryIds);
                            break;
                        case 3: // Drivers
                            $query->whereIn('vehicule_type', $subcategoryIds);
                            break;
                        case 4: // Boats
                            $query->whereIn('boat_type', $subcategoryIds);
                            break;
                        case 5: // Activities
                            $query->whereIn('activity_type', $subcategoryIds);
                            break;
                    }
                }
            }

            // Order randomly for variety
            $query->inRandomOrder();

            // Include translations and relations
            $query->with([
                'galleries',
                'city',
                'provider',
                'pricings', // For drivers
                'actPricings', // For activities
                'translations' => function($q) use ($locale) {
                    $q->whereIn('locale', [$locale, 'en']);
                }
            ]);

            // Paginate results
            $perPage = $request->get('per_page', 8);
            $listings = $query->paginate($perPage);

            // Transform listings data with full structure
            $listings->getCollection()->transform(function ($listing) use ($locale) {
                // Get translated fields
                $translatedFields = [];
                if (method_exists($listing, 'getCurrentTranslatedData')) {
                    $translatedFields = $listing->getCurrentTranslatedData();
                }
                
                // Build galleries array in expected format
                $galleries = $listing->galleries ? $listing->galleries->map(function($gallery) {
                    return [
                        'id' => $gallery->id,
                        'file_path' => $gallery->file_path,
                        'file_name' => $gallery->file_name
                    ];
                })->toArray() : [];
                
                // Base listing data
                $data = [
                    'id' => $listing->id,
                    'slug' => $listing->slug,
                    'title' => $listing->title,
                    'category_id' => $listing->category_id,
                    'galleries' => $galleries,
                    'city' => $listing->city ? [
                        'id' => $listing->city->id,
                        'city_name' => $listing->city->city_name
                    ] : null,
                    'provider' => $listing->provider ? [
                        'id' => $listing->provider->id,
                        'agency_name' => $listing->provider->agency_name,
                        'logo' => $listing->provider->agency_logo
                    ] : null,
                    'translated_fields' => $translatedFields,
                    'deposit_required' => $listing->deposit_required,
                    'deposit_amount' => $listing->deposit_amount,
                    'special_notes' => $listing->special_notes,
                    'short_description' => $listing->short_description,
                    'description' => $listing->description,
                ];
                
                // Add category-specific fields based on category_id
                $categoryId = (int)$listing->category_id;
                
                if ($categoryId === 2) { // Cars
                    $data += [
                        'price_per_day' => $listing->price_per_day,
                        'price_per_week' => $listing->price_per_week,
                        'price_per_month' => $listing->price_per_month,
                        'car_model' => $listing->car_model,
                        'car_type' => $listing->car_type,
                        'year' => $listing->year,
                        'fuel_type' => $listing->fuel_type,
                        'transmission' => $listing->transmission,
                        'seats' => $listing->seats,
                        'doors' => $listing->doors,
                        'ac' => $listing->ac,
                        'mileage_policy' => $listing->mileage_policy,
                        'fuel_policy' => $listing->fuel_policy,
                    ];
                } elseif ($categoryId === 3) { // Drivers  
                    $data += [
                        'price_per_hour' => $listing->price_per_hour,
                        'price_per_day' => $listing->price_per_day,
                        'vehicule_type' => $listing->vehicule_type,
                        'vehicule_model' => $listing->vehicule_model,
                        'languages_spoken' => $listing->languages_spoken,
                        'max_passengers' => $listing->max_passengers,
                        'max_luggage' => $listing->max_luggage,
                        'pickup_location' => $listing->pickup_location,
                        'pricings' => $listing->pricings ? $listing->pricings->toArray() : [],
                    ];
                } elseif ($categoryId === 4) { // Boats
                    $data += [
                        'price_per_hour' => $listing->price_per_hour,
                        'price_per_half_day' => $listing->price_per_half_day,
                        'price_per_day' => $listing->price_per_day,
                        'boat_type' => $listing->boat_type,
                        'with_captain' => $listing->with_captain,
                        'capacity' => $listing->capacity,
                        'departure_location' => $listing->departure_location,
                    ];
                } elseif ($categoryId === 5) { // Activities
                    $data += [
                        'price_per_person' => $listing->price_per_person,
                        'price_per_group' => $listing->price_per_group,
                        'activity_type' => $listing->activity_type,
                        'duration_options' => $listing->duration_options,
                        'schedule_options' => $listing->schedule_options,
                        'meeting_point' => $listing->meeting_point,
                        'pickup' => $listing->pickup,
                        'private_or_group' => $listing->private_or_group,
                        'group_size_min' => $listing->group_size_min,
                        'group_size_max' => $listing->group_size_max,
                        'difficulty' => $listing->difficulty,
                        'act_pricings' => $listing->actPricings ? $listing->actPricings->toArray() : [],
                    ];
                }
                
                return $data;
            });

            return response()->json([
                'success' => true,
                'listings' => $listings,
                'total' => $listings->total(),
                'per_page' => $listings->perPage(),
                'current_page' => $listings->currentPage(),
                'last_page' => $listings->lastPage(),
                'has_more' => $listings->hasMorePages()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch listings',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}