<?php

namespace App\Http\Controllers;

use App\Models\Amenity;
use App\Models\ListingAddonAffected;
use App\Models\ListingGallery;
use App\Models\ListingIncluded;
use App\Models\ListingNotIncluded;
use App\Models\ListingSchedule;
use App\Models\PrivateListingPricing;
use App\Models\SubCategoryOption;
use App\Services\SEOService;
use Illuminate\Http\Request;
use App\Models\Agency;
use App\Models\Category;
use App\Models\SubCategory;
use App\Models\City;
use App\Models\Listing;
use App\Models\ListingPricing;

class ListingController extends Controller
{
    public function list(Request $request)
    {
        $layout = 'layouts.dashboard_admin';
        $listings = Listing::latest()->get();

        return view('listings.list')->with([
            'layout' => $layout,
            'listings' => $listings
        ]);
    }

    public function new(Request $request)
    {
        $layout = 'layouts.dashboard_admin';
        $cities = City::orderBy('city_name')->get();
        $categories = Category::orderBy('category')->get();
        $agencies = Agency::where('status', 'Active')
            ->orderBy('agency_name')
            ->get();
        $carTypes = SubCategoryOption::leftJoin('sub_categories', 'sub_categories.id', '=', 'sub_category_options.subcategory_id')
            ->where('id_category', 2)
            ->where('subcategory', 'Car Type')
            ->select('sub_category_options.id', 'option')
            ->whereNull('sub_category_options.deleted_at')
            ->get();
        $carModels = SubCategoryOption::leftJoin('sub_categories', 'sub_categories.id', '=', 'sub_category_options.subcategory_id')
            ->where('id_category', 2)
            ->where('subcategory', 'Car Model')
            ->select('sub_category_options.id', 'option')
            ->whereNull('sub_category_options.deleted_at')
            ->get();

        $vehiculeTypes = SubCategoryOption::leftJoin('sub_categories', 'sub_categories.id', '=', 'sub_category_options.subcategory_id')
            ->where('id_category', 3)
            ->where('subcategory', 'Vehicule Type')
            ->select('sub_category_options.id', 'option')
            ->whereNull('sub_category_options.deleted_at')
            ->get();
        $vehiculeModels = SubCategoryOption::leftJoin('sub_categories', 'sub_categories.id', '=', 'sub_category_options.subcategory_id')
            ->where('id_category', 3)
            ->where('subcategory', 'Vehicule Model')
            ->select('sub_category_options.id', 'option')
            ->whereNull('sub_category_options.deleted_at')
            ->get();

        $activityTypes = SubCategoryOption::leftJoin('sub_categories', 'sub_categories.id', '=', 'sub_category_options.subcategory_id')
            ->where('id_category', 5)
            ->where('subcategory', 'Activity Type')
            ->select('sub_category_options.id', 'option')
            ->get();
        $serviceTypes = SubCategoryOption::leftJoin('sub_categories', 'sub_categories.id', '=', 'sub_category_options.subcategory_id')
            ->where('id_category', 3)
            ->where('subcategory', 'Service Type')
            ->select('sub_category_options.id', 'option')
            ->get();
        $boatTypes = SubCategoryOption::leftJoin('sub_categories', 'sub_categories.id', '=', 'sub_category_options.subcategory_id')
            ->where('id_category', 4)
            ->where('subcategory', 'Boat Type')
            ->select('sub_category_options.id', 'option')
            ->get();

        return view('listings.add')->with([
            'layout' => $layout,
            'cities' => $cities,
            'categories' => $categories,
            'agencies' => $agencies,
            'carTypes' => $carTypes,
            'carModels' => $carModels,
            'vehiculeTypes' => $vehiculeTypes,
            'vehiculeModels' => $vehiculeModels,
            'activityTypes' => $activityTypes,
            'serviceTypes' => $serviceTypes,
            'boatTypes' => $boatTypes
        ]);
    }

    public function insert(Request $request, SEOService $SEOService)
    {
        $request->validate([
            'title' => 'required',
            'city_id' => ['required'],
            'category_id' => ['required']
        ]);

        $includedItems = array_filter($request->input('included', []));
        $notIncludedItems = array_filter($request->input('not_included', []));
        $addons = array_filter($request->input('addons', []));
        $pricingEls = array_filter($request->input('pricing_els', []));
        $privatePricings = array_filter($request->input('private_city', []));
        $amenities = array_filter($request->input('amenities', []));
        $schedules = array_filter($request->input('schedules', []));

        $listingFields = [
            'title' => $request->title,
            'slug' => $SEOService->generateSlug('listing', $request->slug),
            'meta_title' => $request->meta_title,
            'meta_description' => $request->meta_description,
            'schema_markup' => $request->schema_markup,
            'category_id' => $request->category_id,
            'city_id' => $request->city_id,
            'provider_id' => $request->provider_id,
            'special_notes' => $request->special_notes,
            'short_description' => $request->short_description,
            'description' => $request->description,
            'dealer_note' => $request->dealer_note,
            'price_per_hour' => $request->price_per_hour ?? null,
            'price_per_half_day' => $request->price_per_half_day ?? null,
            'price_per_day' => $request->price_per_day ?? null,
            'price_per_week' => $request->price_per_week ?? null,
            'price_per_month' => $request->price_per_month ?? null
        ];

        switch ((int) $request->category_id) {
            case 2:
                $listingFields += [
                    'car_type' => $request->car_type,
                    'car_model' => $request->car_model,
                    'year' => $request->year,
                    'fuel_type' => $request->fuel_type,
                    'transmission' => $request->transmission,
                    'seats' => $request->seats,
                    'doors' => $request->doors,
                    'ac' => $request->ac,
                    'mileage_policy' => $request->mileage_policy,
                    'fuel_policy' => $request->fuel_policy,
                    'driver_requirement' => $request->driver_requirement,
                    'deposit_required' => $request->deposit_required,
                    'deposit_amount' => $request->deposit_amount,
                    'deposit_note' => $request->deposit_note
                ];
                break;

            case 3:
                $listingFields += [
                    'vehicule_type' => $request->vehicule_type,
                    'vehicule_model' => $request->vehicule_model,
                    'max_passengers' => $request->max_passengers,
                    'max_luggage' => $request->max_luggage,
                    'pickup_location' => $request->pickup_location,
                    'languages_spoken' => implode(",", $request->languages_spoken)
                ];
                break;

            case 4:
                $listingFields += [
                    'boat_type' => $request->boat_type,
                    'with_captain' => $request->with_captain,
                    'capacity' => $request->capacity,
                    'duration_options' => implode(",", $request->duration_options),
                    'purpose_tags' => implode(",", $request->purpose_tags),
                    'departure_location' => $request->departure_location
                ];
                break;

            case 5:
                $listingFields += [
                    'duration_options' => implode(",", $request->duration_options),
                    'languages_spoken' => implode(",", $request->languages_spoken),
                    'activity_type' => $request->activity_type,
                    'pickup' => $request->pickup,
                    'meeting_point' => $request->meeting_point,
                    'private_or_group' => $request->private_or_group,
                    'difficulty' => $request->difficulty
                ];

                if ($request->private_or_group == 'Group') {
                    $listingFields += [
                        'group_size_min' => $request->group_size_min,
                        'group_size_max' => $request->group_size_max
                    ];
                }
                break;
        }

        $listing = Listing::create($listingFields);


        //Insert Images
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $file_name = 'listing_' . uniqid() . '.' . $file->extension();
                $file->move(public_path('images') . '/listings', $file_name);
                $file_name = 'images/listings/' . $file_name;

                ListingGallery::create([
                    'listing_id' => $listing->id,
                    'file_path' => $file_name
                ]);
            }
        }

        if ($request->category_id == 3) {
            foreach ($privatePricings as $index => $privatePricing) {
                $private_city = $request->private_city[$index] ?? 0;
                $airport_one = $request->airport_one[$index] ?? 0;
                $airport_round = $request->airport_round[$index] ?? 0;
                $intercity_one = $request->intercity_one[$index] ?? 0;
                $intercity_round = $request->intercity_round[$index] ?? 0;


                PrivateListingPricing::create([
                    'listing_id' => $listing->id,
                    'city_id' => $private_city,
                    'airport_one' => $airport_one,
                    'airport_round' => $airport_round,
                    'intercity_one' => $intercity_one,
                    'intercity_round' => $intercity_round
                ]);
            }
        }

        foreach ($amenities as $amenity) {
            Amenity::create([
                'title' => $amenity,
                'listing_id' => $listing->id
            ]);
        }

        foreach ($schedules as $schedule) {
            ListingSchedule::create([
                'title' => $schedule,
                'listing_id' => $listing->id
            ]);
        }

        foreach ($includedItems as $includedItem) {
            ListingIncluded::create([
                'item' => $includedItem,
                'listing_id' => $listing->id
            ]);
        }

        foreach ($notIncludedItems as $notIncludedItem) {
            ListingNotIncluded::create([
                'item' => $notIncludedItem,
                'listing_id' => $listing->id
            ]);
        }

        foreach ($addons as $addon) {
            ListingAddonAffected::create([
                'addon_id' => $addon,
                'listing_id' => $listing->id
            ]);
        }

        foreach ($pricingEls as $index => $pricingEl) {
            $price = $request->pricings[$index];

            ListingPricing::create([
                'listing_id' => $listing->id,
                'element' => $pricingEl,
                'price' => $price
            ]);
        }

        return back()->with('inserted', true);
    }

    public function edit(Request $request, $id)
    {
        $layout = 'layouts.dashboard_admin';
        $agency = Agency::where('id', $id)->first();
        $cities = City::orderBy('city_name')->get();
        $categories = Category::orderBy('category')->get();
        $subCategories = SubCategory::orderBy('subCategory')->get();

        return view('listings.update')->with([
            'layout' => $layout,
            'agency' => $agency,
            'cities' => $cities,
            'categories' => $categories,
            'subCategories' => $subCategories
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'agency_name' => 'required',
            'id_city' => ['required', Rule::notIn([-1])],
            'category_id' => ['required', Rule::notIn([-1])]
        ]);

        $agency = Agency::findOrFail($request->id);
        $logo = $agency->agency_logo;

        if ($request->hasFile('logo')) {
            $logo = 'agency_' . uniqid() . '.' . $request->logo->extension();

            $request->logo->move(public_path('images') . '/agencies', $logo);

            $logo = 'images/agencies/' . $logo;
        }

        $agency->update([
            'agency_name' => $request->agency_name,
            'id_city' => $request->id_city,
            'category_id' => $request->category_id,
            'contact_name' => $request->contact_name,
            'phone_number' => $request->phone_number,
            'whatsapp' => $request->whatsapp,
            'email' => $request->email,
            'notes' => $request->notes,
            'short_description' => $request->short_description,
            'description' => $request->description,
            'agency_logo' => $logo
        ]);

        return back()->with('updated', true);
    }

    public function getAddons(Request $request)
    {
        $addons = ListingAddonAffected::join('listing_addons', 'listing_addon_affecteds.addon_id', '=', 'listing_addons.id')
            ->where('listing_id', $request->listing_id)
            ->select('listing_addon_affecteds.*', 'price', 'addon')
            ->get();

        return response()->json([
            'addons' => $addons
        ]);
    }

    public function getDetails(Request $request)
    {
        $listing = Listing::findOrFail($request->id);

        return response()->json([
            'listing' => $listing
        ]);
    }

    public function getPricing(Request $request)
    {
        $options = ListingPricing::where('listing_id', $request->listing_id)->get();

        return response()->json([
            'options' => $options
        ]);
    }

    public function get_recommended_listings(Request $request)
    {
        $categoryID = $this->getCategoryID($request->input('category', ''));
        $query = Listing::query()->where('category_id', $categoryID);

        if (!$request->filled('agency_id') && $request->input('city')) {
            $city = City::where('city_name', $request->city)->first();
            $query->where('city_id', $city->id);
        }

        if ($request->input('tab')) {
            $optionId = $this->getOptionID($categoryID, $request->tab);

            switch ($categoryID) {
                case 2:
                    $query->where('car_type', $optionId);
                    break;
                case 3:
                    $query->where('vehicule_type', $optionId);
                    break;
                case 4:
                    $query->where('boat_type', $optionId);
                    break;
                case 5:
                    $query->where('boat_type', $optionId);
                    break;
            }
        }

        if ($request->filled('agency_id')) {
            $query->where('provider_id', $request->agency_id)
                ->orderBy('created_at', 'desc');

            $perPage = 4;
            $page = $request->input('page', 1);

            $listings = $query
                ->with(['galleries', 'city', 'serviceTypeObj', 'activityTypeObj', 'pricings', 'actPricings'])
                ->skip(($page - 1) * $perPage)
                ->take($perPage + 1)
                ->get();

            $hasMore = $listings->count() > $perPage;
            $listings = $listings->take($perPage);

            return response()->json([
                'listings' => $listings,
                'hasMore' => $hasMore,
                'perPage' => $perPage
            ]);
        } else {
            $listings = $query
                ->with(['galleries', 'city', 'serviceTypeObj', 'activityTypeObj', 'pricings', 'actPricings'])
                ->inRandomOrder()
                ->take(4)
                ->get();

            return response()->json(['listings' => $listings]);
        }
    }

    public function related_products(Request $request)
    {
        $categoryID = $request->input('category_id', 2);

        $listings = Listing::where('category_id', $categoryID)
            ->with(['galleries', 'city', 'serviceTypeObj', 'activityTypeObj', 'pricings', 'actPricings'])
            ->inRandomOrder()
            ->take(6)
            ->get();

        return response()->json(['listings' => $listings]);
    }

    private static function getCategoryID(string $categoryName): int
    {
        switch ($categoryName) {
            case 'cars':
                return 2;
            case 'drivers':
                return 3;
            case 'boats':
                return 4;
            case 'activities':
                return 5;
            default:
                return 2;
        }
    }

    private static function getOptionID(int $categoryID, string $option)
    {
        switch ($categoryID) {
            case 2:
                $subCategoryName = 'Car Type';
                break;
            case 3:
                $subCategoryName = 'Vehicule Type';
                break;
            case 4:
                $subCategoryName = 'Boat Type';
                break;
            case 5:
                $subCategoryName = 'Activity Type';
                break;
            default:
                $subCategoryName = '';
                break;
        }

        $subCategory = SubCategory::where('subcategory', $subCategoryName)->first();

        if ($subCategory) {
            $opt = SubCategoryOption::where('subcategory_id', $subCategory->id)
                ->where('option', $option)
                ->first();
            return $opt ? $opt->id : -1;
        }

        return null;
    }

    public function get_dynamic_filter_options(Request $request)
    {
        $category = $request->input('category', 'car');

        $options = [];

        switch ($category) {
            case 'car':
                $options['carType'] = SubCategoryOption::leftJoin('sub_categories', 'sub_categories.id', '=', 'sub_category_options.subcategory_id')
                    ->where('id_category', 2)
                    ->where('subcategory', 'Car Type')
                    ->select('sub_category_options.id', 'option')
                    ->whereNull('sub_category_options.deleted_at')
                    ->get()
                    ->map(function ($row) {
                        return [
                            'id' => $row->id,
                            'option' => $row->option,
                        ];
                    });

                $options['carBrand'] = SubCategoryOption::leftJoin('sub_categories', 'sub_categories.id', '=', 'sub_category_options.subcategory_id')
                    ->where('id_category', 2)
                    ->where('subcategory', 'Car Model')
                    ->select('sub_category_options.id', 'option')
                    ->whereNull('sub_category_options.deleted_at')
                    ->get()
                    ->map(function ($row) {
                        return [
                            'id' => $row->id,
                            'option' => $row->option,
                        ];
                    });
                break;

            case 'private':
                $options['carType'] = SubCategoryOption::leftJoin('sub_categories', 'sub_categories.id', '=', 'sub_category_options.subcategory_id')
                    ->where('id_category', 3)
                    ->where('subcategory', 'Vehicule Type')
                    ->select('sub_category_options.id', 'option')
                    ->whereNull('sub_category_options.deleted_at')
                    ->get()
                    ->map(function ($row) {
                        return [
                            'id' => $row->id,
                            'option' => $row->option,
                        ];
                    });
                break;

            case 'boat':
                $options['boatType'] = SubCategoryOption::leftJoin('sub_categories', 'sub_categories.id', '=', 'sub_category_options.subcategory_id')
                    ->where('id_category', 4)
                    ->where('subcategory', 'Boat Type')
                    ->select('sub_category_options.id', 'option')
                    ->whereNull('sub_category_options.deleted_at')
                    ->get()
                    ->map(function ($row) {
                        return [
                            'id' => $row->id,
                            'option' => $row->option,
                        ];
                    });
                break;

            case 'activity':
                $options['activityType'] = SubCategoryOption::leftJoin('sub_categories', 'sub_categories.id', '=', 'sub_category_options.subcategory_id')
                    ->where('id_category', 5)
                    ->where('subcategory', 'Activity Type')
                    ->select('sub_category_options.id', 'option')
                    ->whereNull('sub_category_options.deleted_at')
                    ->get()
                    ->map(function ($row) {
                        return [
                            'id' => $row->id,
                            'option' => $row->option,
                        ];
                    });
                break;
        }

        return response()->json($options);
    }

    public function get_search_results(Request $request)
    {
        $query = Listing::query();

        if ($request->filled('pickup')) {
            $city = City::where('city_name', $request->pickup)->first();
            $query->where('city_id', $city->id ?? -1);
        }

        //Destination For Boat
        if ($request->filled('destination')) {
            $city = City::where('city_name', $request->destination)->first();
            $query->where('city_id', $city->id ?? -1);
        }

        if ($request->filled('type')) {
            $category_id = $this->getCategoryIDFromType($request->type);
            $query->where('category_id', $category_id);
        }

        //Car & Private
        if ($request->filled('carType')) {
            if ($request->type == 'private')
                $query->whereIn('vehicule_type', $request->carType);
            else
                $query->whereIn('car_type', $request->carType);

        }

        if ($request->filled('carBrand')) {
            $query->whereIn('car_model', $request->carBrand);
        }

        if ($request->filled('transmission')) {
            $query->where('transmission', $request->transmission);
        }

        if ($request->filled('fuelType')) {
            $query->whereIn('fuel_type', $request->fuelType);
        }

        if ($request->filled('deposit')) {
            $query->where('deposit_required', $request->deposit);
        }

        if ($request->filled('mileagePolicy')) {
            $query->whereIn('mileage_policy', $request->mileagePolicy);
        }

        if ($request->filled('multilingualDriver')) {
            if ($request->multilingualDriver == 'Yes') {
                $query->where('languages_spoken', 'LIKE', '%,%');
            } else {
                $query->where('languages_spoken', 'NOT LIKE', '%,%');
            }
        }

        if ($request->filled('maxPassengers')) {
            $query->where('max_passengers', '<=', (int) $request->maxPassengers);
        }

        if ($request->filled('maxLuggage')) {
            $query->where('max_luggage', '<=', (int) $request->maxLuggage);
        }

        //Activity
        if ($request->filled('activityType')) {
            $query->whereIn('activity_type', $request->activityType);
        }

        if ($request->filled('privateGroup')) {
            $query->whereIn('private_or_group', $request->privateGroup);
        }

        if ($request->filled('pickupIncluded')) {
            $query->where('pickup', $request->pickupIncluded);
        }

        if ($request->filled('difficultyLevel')) {
            $query->where('difficulty', $request->difficultyLevel);
        }

        //Boat
        if (!$request->filled('boatType') && $request->filled('boat_type') && $request->boat_type != 'Any Type') {
            if ($request->boat_type == 'Yakht') {
                $boatID = 55;
            } elseif ($request->boat_type == 'SpeedBoat') {
                $boatID = 56;
            } else {
                $boatID = 67;
            }

            $query->where('boat_type', $boatID);
        }

        if ($request->filled('boatType')) {
            $query->whereIn('boat_type', $request->boatType);
        }

        if ($request->filled('withCaptain')) {
            $query->where('with_captain', $request->withCaptain);
        }

        if ($request->filled('capacity')) {
            $query->where('capacity', '<=', (int) $request->capacity);
        }

        if ($request->filled('purpose')) {
            $purposes = $request->purpose;
            $query->where(function ($q) use ($purposes) {
                foreach ($purposes as $purpose) {
                    $q->orWhereRaw("FIND_IN_SET(?, purpose_tags)", [$purpose]);
                }
            });
        }

        $perPage = 4;
        $page = $request->input('page', 1);
        $sortBy = $request->input('sortBy', 'Default');

        if ($sortBy == 'Price: high to low') {

        } elseif ($sortBy == 'Price: low to price') {

        } else {

        }
        $listings = $query->latest()
            ->with(['galleries', 'city', 'serviceTypeObj', 'activityTypeObj', 'pricings', 'actPricings'])
            ->skip($perPage * ($page - 1))
            ->take($perPage + 1)
            ->get();

        $hasMore = $listings->count() > $perPage;
        $listings = $listings->take($perPage);

        return response()->json(['results' => $listings, 'hasMore' => $hasMore]);
    }

    public function get_listing(Request $request)
    {
        $listing = Listing::where('slug', $request->slug)
            ->with([
                'included',
                'notIncluded',
                'galleries',
                'provider',
                'city',
                'addons.addon',
                'serviceTypeObj',
                'activityTypeObj',
                'pricings',
                'actPricings',
                'customBookingOptions'
            ])
            ->firstOrFail();

        return response()->json(['listing' => $listing]);
    }

    public function getCategoryIDFromType($type)
    {
        switch ($type) {
            case 'car':
                return 2;
            case 'private':
                return 3;
            case 'boat':
                return 4;
            case 'activity':
                return 5;
            default:
                return -1;
        }
    }
}
