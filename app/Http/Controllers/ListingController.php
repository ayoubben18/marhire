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
use App\Services\ImageProcessingService;
use App\Services\GeminiTranslationService;
use App\Services\TranslationService;
use App\Services\CategoryValidationService;
use App\Services\DurationIntervalService;
use Illuminate\Http\Request;
use App\Models\Agency;
use App\Models\Category;
use App\Models\SubCategory;
use App\Models\City;
use App\Models\Listing;
use App\Models\ListingPricing;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

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
            'listing' => null, // Pass null for new listings
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

    public function insert(Request $request, SEOService $SEOService, ImageProcessingService $imageProcessingService, CategoryValidationService $categoryValidationService)
    {
        // Get category-specific validation rules
        $categoryId = (int) $request->input('category_id');
        $validationRules = $categoryValidationService->getValidationRules($categoryId, $request);
        
        // Get image validation rules from service
        $imageValidationRules = $imageProcessingService->getValidationRules();
        
        // Add image validation rules if images are uploaded
        if ($request->hasFile('images')) {
            $validationRules = array_merge($validationRules, $imageValidationRules);
        }
        
        // Merge validation messages from both services
        $validationMessages = array_merge(
            $categoryValidationService->getValidationMessages(),
            $request->hasFile('images') ? $imageProcessingService->getValidationMessages() : []
        );
        
        // Validate with category-specific rules and custom messages
        try {
            $request->validate($validationRules, $validationMessages);
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Improve image error messages
            $errors = $e->errors();
            $improvedErrors = [];
            
            foreach ($errors as $field => $messages) {
                if (strpos($field, 'images.') === 0) {
                    $position = str_replace('images.', '', $field);
                    $imageNumber = (int)$position + 1;
                    $improvedMessages = [];
                    
                    foreach ($messages as $message) {
                        // Replace :position placeholder with actual image number
                        $improvedMessage = str_replace(':position', "#{$imageNumber}", $message);
                        
                        // If it's still the generic Laravel uploaded error, make it more specific
                        if ($improvedMessage === "The images.{$position} failed to upload.") {
                            // Check if file exists to get more details
                            $uploadedFiles = $request->file('images');
                            if (isset($uploadedFiles[$position])) {
                                $file = $uploadedFiles[$position];
                                if ($file instanceof \Illuminate\Http\UploadedFile) {
                                    $fileSizeMB = round($file->getSize() / (1024 * 1024), 2);
                                    $fileName = $file->getClientOriginalName();
                                    
                                    if ($file->getSize() > (2 * 1024 * 1024)) {
                                        $improvedMessage = "Image #{$imageNumber} ({$fileName}): File size is {$fileSizeMB}MB but maximum allowed is 2MB.";
                                    } else {
                                        $improvedMessage = "Image #{$imageNumber} ({$fileName}): Upload failed. Please ensure file is under 2MB and in JPG/PNG format.";
                                    }
                                }
                            } else {
                                $improvedMessage = "Image #{$imageNumber}: Upload failed. Please ensure file is under 2MB and in JPG/PNG format.";
                            }
                        }
                        
                        $improvedMessages[] = $improvedMessage;
                    }
                    $improvedErrors[$field] = $improvedMessages;
                } else {
                    $improvedErrors[$field] = $messages;
                }
            }
            
            return back()->withErrors($improvedErrors)->withInput();
        }
        
        // Additional category-specific data validation
        $categoryErrors = $categoryValidationService->validateCategoryData($request, $categoryId);
        if ($categoryErrors) {
            return back()->withErrors($categoryErrors)->withInput();
        }

        $includedItems = array_filter($request->input('included', []));
        $notIncludedItems = array_filter($request->input('not_included', []));
        $addons = array_filter($request->input('addons', []));
        $pricingEls = array_filter($request->input('pricing_els', []));
        $privatePricings = array_filter($request->input('private_city', []));
        $amenities = array_filter($request->input('amenities', []));
        $schedules = array_filter($request->input('schedules', []));

        $listingFields = [
            'title' => $request->title,
            'slug' => $SEOService->generateSlug('listing', $request->slug ?: $request->title),
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
                $listingFields += $this->processCarRentalData($request);
                break;

            case 3:
                $listingFields += $this->processPrivateDriverData($request);
                break;

            case 4:
                $listingFields += $this->processBoatRentalData($request);
                break;

            case 5:
                $listingFields += $this->processActivitiesData($request);
                break;
        }

        $listing = Listing::create($listingFields);

        // Save pending translations if they exist
        if ($request->has('pending_translations')) {
            try {
                $pendingTranslations = json_decode($request->input('pending_translations'), true);
                if ($pendingTranslations && is_array($pendingTranslations)) {
                    $translationService = new TranslationService();
                    $translationService->updateTranslations($listing, $pendingTranslations);
                }
            } catch (\Exception $e) {
                Log::warning('Failed to save pending translations for new listing', [
                    'listing_id' => $listing->id,
                    'error' => $e->getMessage()
                ]);
            }
        }

        //Insert Images with WebP conversion
        if ($request->hasFile('images')) {
            $images = $request->file('images');
            
            // Handle both single and multiple file uploads
            if (!is_array($images)) {
                $images = [$images];
            }
            
            // Filter out null/empty entries
            $images = array_filter($images);
            
            foreach ($images as $file) {
                // Skip if file is null or invalid
                if (!$file || !$file->isValid()) {
                    \Log::warning('Invalid file upload detected', [
                        'listing_id' => $listing->id
                    ]);
                    continue;
                }
                
                try {
                    $baseFileName = 'listing_' . uniqid();
                    $destination = public_path('images/listings');
                    
                    // Process image with WebP conversion
                    $processedImage = $imageProcessingService->processImage($file, $destination, $baseFileName);
                    
                    if ($processedImage) {
                        // Save both WebP and original paths
                        ListingGallery::create([
                            'listing_id' => $listing->id,
                            'file_path' => $processedImage['webp_path'], // Primary path is WebP
                            'file_name' => $processedImage['webp_name']
                        ]);
                        
                        // Also save original format as fallback
                        ListingGallery::create([
                            'listing_id' => $listing->id,
                            'file_path' => $processedImage['original_path'],
                            'file_name' => $processedImage['original_name']
                        ]);
                        
                        \Log::info('Image processed and saved successfully', [
                            'listing_id' => $listing->id,
                            'webp_path' => $processedImage['webp_path'],
                            'original_path' => $processedImage['original_path'],
                            'dimensions' => $processedImage['width'] . 'x' . $processedImage['height']
                        ]);
                    } else {
                        \Log::error('Failed to process image', [
                            'listing_id' => $listing->id,
                            'file_name' => $file->getClientOriginalName()
                        ]);
                    }
                } catch (\Exception $e) {
                    \Log::error('Failed to save image', [
                        'listing_id' => $listing->id,
                        'error' => $e->getMessage(),
                        'file_name' => $file->getClientOriginalName()
                    ]);
                }
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
        
        // Load listing with all necessary relationships
        $listing = Listing::with([
            'included', 
            'notIncluded', 
            'addons', 
            'pricings', // PrivateListingPricing
            'actPricings', // ListingPricing
            'galleries'
        ])->findOrFail($id);
        
        // Load amenities and schedules separately since relationships might not exist
        $listing->amenities = Amenity::where('listing_id', $id)->get();
        $listing->schedules = ListingSchedule::where('listing_id', $id)->get();
        
        $cities = City::orderBy('city_name')->get();
        $categories = Category::orderBy('category')->get();
        $agencies = Agency::where('status', 'Active')
            ->orderBy('agency_name')
            ->get();
        
        // Get subcategory options based on listing category
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

        // Use the add view with the listing data
        return view('listings.add')->with([
            'layout' => $layout,
            'listing' => $listing,
            'cities' => $cities,
            'categories' => $categories,
            'agencies' => $agencies,
            'carTypes' => $carTypes,
            'carModels' => $carModels,
            'vehiculeTypes' => $vehiculeTypes,
            'vehiculeModels' => $vehiculeModels,
            'activityTypes' => $activityTypes,
            'serviceTypes' => $serviceTypes,
            'boatTypes' => $boatTypes,
            'isEdit' => true
        ]);
    }

    public function update(Request $request, SEOService $SEOService, ImageProcessingService $imageProcessingService, CategoryValidationService $categoryValidationService)
    {
        // Get category-specific validation rules
        $categoryId = (int) $request->input('category_id');
        $validationRules = $categoryValidationService->getValidationRules($categoryId, $request);
        
        // Get image validation rules from service
        $imageValidationRules = $imageProcessingService->getValidationRules();
        
        // Add image validation rules if images are uploaded
        if ($request->hasFile('images')) {
            $validationRules = array_merge($validationRules, $imageValidationRules);
        }
        
        // Merge validation messages from both services
        $validationMessages = array_merge(
            $categoryValidationService->getValidationMessages(),
            $request->hasFile('images') ? $imageProcessingService->getValidationMessages() : []
        );
        
        // Validate with category-specific rules and custom messages
        try {
            $request->validate($validationRules, $validationMessages);
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Improve image error messages
            $errors = $e->errors();
            $improvedErrors = [];
            
            foreach ($errors as $field => $messages) {
                if (strpos($field, 'images.') === 0) {
                    $position = str_replace('images.', '', $field);
                    $imageNumber = (int)$position + 1;
                    $improvedMessages = [];
                    
                    foreach ($messages as $message) {
                        // Replace :position placeholder with actual image number
                        $improvedMessage = str_replace(':position', "#{$imageNumber}", $message);
                        
                        // If it's still the generic Laravel uploaded error, make it more specific
                        if ($improvedMessage === "The images.{$position} failed to upload.") {
                            // Check if file exists to get more details
                            $uploadedFiles = $request->file('images');
                            if (isset($uploadedFiles[$position])) {
                                $file = $uploadedFiles[$position];
                                if ($file instanceof \Illuminate\Http\UploadedFile) {
                                    $fileSizeMB = round($file->getSize() / (1024 * 1024), 2);
                                    $fileName = $file->getClientOriginalName();
                                    
                                    if ($file->getSize() > (2 * 1024 * 1024)) {
                                        $improvedMessage = "Image #{$imageNumber} ({$fileName}): File size is {$fileSizeMB}MB but maximum allowed is 2MB.";
                                    } else {
                                        $improvedMessage = "Image #{$imageNumber} ({$fileName}): Upload failed. Please ensure file is under 2MB and in JPG/PNG format.";
                                    }
                                }
                            } else {
                                $improvedMessage = "Image #{$imageNumber}: Upload failed. Please ensure file is under 2MB and in JPG/PNG format.";
                            }
                        }
                        
                        $improvedMessages[] = $improvedMessage;
                    }
                    $improvedErrors[$field] = $improvedMessages;
                } else {
                    $improvedErrors[$field] = $messages;
                }
            }
            
            return back()->withErrors($improvedErrors)->withInput();
        }
        
        // Additional category-specific data validation
        $categoryErrors = $categoryValidationService->validateCategoryData($request, $categoryId);
        if ($categoryErrors) {
            return back()->withErrors($categoryErrors)->withInput();
        }

        $listing = Listing::findOrFail($request->id);
        
        $includedItems = array_filter($request->input('included', []));
        $notIncludedItems = array_filter($request->input('not_included', []));
        $addons = array_filter($request->input('addons', []));
        $pricingEls = array_filter($request->input('pricing_els', []));
        $privatePricings = array_filter($request->input('private_city', []));
        $amenities = array_filter($request->input('amenities', []));
        $schedules = array_filter($request->input('schedules', []));

        // Only regenerate slug if it's different from the current one
        $newSlug = $listing->slug; // Keep existing by default
        if ($request->filled('slug') && $request->slug !== $listing->slug) {
            // User provided a new slug, generate it (exclude current listing from duplicate check)
            $newSlug = $SEOService->generateSlug('listing', $request->slug, $listing->id);
        } elseif (!$request->filled('slug') && $request->title !== $listing->title) {
            // Slug field is empty but title changed, generate from new title (exclude current listing)
            $newSlug = $SEOService->generateSlug('listing', $request->title, $listing->id);
        }
        
        $listingFields = [
            'title' => $request->title,
            'slug' => $newSlug,
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
                $listingFields += $this->processCarRentalData($request);
                break;

            case 3:
                $listingFields += $this->processPrivateDriverData($request);
                break;

            case 4:
                $listingFields += $this->processBoatRentalData($request);
                break;

            case 5:
                $listingFields += $this->processActivitiesData($request);
                break;
        }

        $listing->update($listingFields);
        
        // Save pending translations if they exist
        if ($request->has('pending_translations')) {
            try {
                $pendingTranslations = json_decode($request->input('pending_translations'), true);
                if ($pendingTranslations && is_array($pendingTranslations)) {
                    $translationService = new TranslationService();
                    $translationService->updateTranslations($listing, $pendingTranslations);
                }
            } catch (\Exception $e) {
                Log::warning('Failed to save pending translations for listing', [
                    'listing_id' => $listing->id,
                    'error' => $e->getMessage()
                ]);
            }
        }

        //Update Images (only if new ones are provided)
        if ($request->hasFile('images')) {
            $images = $request->file('images');
            
            // Handle both single and multiple file uploads
            if (!is_array($images)) {
                $images = [$images];
            }
            
            // Filter out null/empty entries
            $images = array_filter($images);
            
            foreach ($images as $file) {
                // Skip if file is null or invalid
                if (!$file || !$file->isValid()) {
                    \Log::warning('Invalid file upload detected during update', [
                        'listing_id' => $listing->id
                    ]);
                    continue;
                }
                
                try {
                    $baseFileName = 'listing_' . uniqid();
                    $destination = public_path('images/listings');
                    
                    // Process image with WebP conversion
                    $processedImage = $imageProcessingService->processImage($file, $destination, $baseFileName);
                    
                    if ($processedImage) {
                        // Save both WebP and original paths
                        ListingGallery::create([
                            'listing_id' => $listing->id,
                            'file_path' => $processedImage['webp_path'], // Primary path is WebP
                            'file_name' => $processedImage['webp_name']
                        ]);
                        
                        // Also save original format as fallback
                        ListingGallery::create([
                            'listing_id' => $listing->id,
                            'file_path' => $processedImage['original_path'],
                            'file_name' => $processedImage['original_name']
                        ]);
                        
                        \Log::info('Image processed and saved successfully during update', [
                            'listing_id' => $listing->id,
                            'webp_path' => $processedImage['webp_path'],
                            'original_path' => $processedImage['original_path'],
                            'dimensions' => $processedImage['width'] . 'x' . $processedImage['height']
                        ]);
                    } else {
                        \Log::error('Failed to process image during update', [
                            'listing_id' => $listing->id,
                            'file_name' => $file->getClientOriginalName()
                        ]);
                    }
                } catch (\Exception $e) {
                    \Log::error('Failed to save image during update', [
                        'listing_id' => $listing->id,
                        'error' => $e->getMessage(),
                        'file_name' => $file->getClientOriginalName()
                    ]);
                }
            }
        }

        // Update private pricing if category is 3
        if ($request->category_id == 3) {
            // Delete existing private pricing
            PrivateListingPricing::where('listing_id', $listing->id)->delete();
            
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

        // Update amenities
        Amenity::where('listing_id', $listing->id)->delete();
        foreach ($amenities as $amenity) {
            Amenity::create([
                'title' => $amenity,
                'listing_id' => $listing->id
            ]);
        }

        // Update schedules
        ListingSchedule::where('listing_id', $listing->id)->delete();
        foreach ($schedules as $schedule) {
            ListingSchedule::create([
                'title' => $schedule,
                'listing_id' => $listing->id
            ]);
        }

        // Update included items
        ListingIncluded::where('listing_id', $listing->id)->delete();
        foreach ($includedItems as $includedItem) {
            ListingIncluded::create([
                'item' => $includedItem,
                'listing_id' => $listing->id
            ]);
        }

        // Update not included items
        ListingNotIncluded::where('listing_id', $listing->id)->delete();
        foreach ($notIncludedItems as $notIncludedItem) {
            ListingNotIncluded::create([
                'item' => $notIncludedItem,
                'listing_id' => $listing->id
            ]);
        }

        // Update addons
        ListingAddonAffected::where('listing_id', $listing->id)->delete();
        foreach ($addons as $addon) {
            ListingAddonAffected::create([
                'addon_id' => $addon,
                'listing_id' => $listing->id
            ]);
        }

        // Update pricing
        ListingPricing::where('listing_id', $listing->id)->delete();
        foreach ($pricingEls as $index => $pricingEl) {
            $price = $request->pricings[$index];

            ListingPricing::create([
                'listing_id' => $listing->id,
                'element' => $pricingEl,
                'price' => $price
            ]);
        }

        return back()->with('updated', true);
    }

    /**
     * Process car rental data for insert/update
     * 
     * @param Request $request
     * @return array
     */
    private function processCarRentalData(Request $request): array
    {
        $data = [
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

        // Handle multi-select car_types as JSON array
        if ($request->has('car_types')) {
            $carTypesInput = $request->car_types;
            
            // Ensure it's an array
            if (!is_array($carTypesInput)) {
                $carTypesInput = [$carTypesInput];
            }
            
            // Filter out empty values and cast to integers
            $filtered = array_filter($carTypesInput, function($value) {
                return !empty($value) && $value !== '' && $value !== '0';
            });
            
            // Cast to integers and re-index array
            $integerTypes = array_map('intval', array_values($filtered));
            
            // Set car_types_new as array (can be empty array)
            $data['car_types_new'] = $integerTypes;
            
            // Set single car_type for backward compatibility (use first selected type)
            if (!empty($integerTypes)) {
                $data['car_type'] = $integerTypes[0]; // Get first element
            }
        } else {
            // No car_types sent at all
            $data['car_types_new'] = [];
        }

        return $data;
    }

    /**
     * Process private driver data for insert/update
     * 
     * @param Request $request
     * @return array
     */
    private function processPrivateDriverData(Request $request): array
    {
        // Get city name for pickup_location if not provided
        $pickupLocation = $request->pickup_location;
        if (empty($pickupLocation) && $request->city_id) {
            $city = \App\Models\City::find($request->city_id);
            if ($city) {
                $pickupLocation = $city->city_name;
            }
        }
        
        return [
            'vehicule_type' => $request->vehicule_type,
            'vehicule_model' => $request->vehicule_model,
            'max_passengers' => $request->max_passengers,
            'max_luggage' => $request->max_luggage,
            'pickup_location' => $pickupLocation,
            'languages_spoken' => is_array($request->languages_spoken) 
                ? implode(',', $request->languages_spoken) 
                : $request->languages_spoken,
            'service_type' => $request->service_type
        ];
    }

    /**
     * Process boat rental data for insert/update
     * 
     * @param Request $request
     * @return array
     */
    private function processBoatRentalData(Request $request): array
    {
        $durationService = new DurationIntervalService();
        
        $data = [
            'boat_type' => $request->boat_type,
            'with_captain' => $request->with_captain,
            'capacity' => $request->capacity,
            'departure_location' => $request->departure_location,
            // Optional deposit fields for boat rentals
            'deposit_required' => $request->deposit_required ?? null,
            'deposit_currency' => $request->deposit_currency ?? null,
        ];

        // Handle duration options with validation
        if ($request->has('duration_options') && is_array($request->duration_options)) {
            $validDurations = array_filter($request->duration_options, function($duration) {
                return is_numeric($duration) && (float)$duration > 0;
            });
            $data['duration_options'] = $durationService->durationsToString($validDurations);
        } else {
            $data['duration_options'] = null;
        }

        // Handle deposit amount conditionally
        $data['deposit_amount'] = ($request->deposit_required === 'yes') ? $request->deposit_amount : null;
        $data['deposit_note'] = ($request->deposit_required === 'yes') ? $request->deposit_note : null;

        // Handle optional purpose tags
        if ($request->has('purpose_tags') && is_array($request->purpose_tags)) {
            $data['purpose_tags'] = implode(',', array_filter($request->purpose_tags));
        } else {
            $data['purpose_tags'] = null;
        }

        return $data;
    }

    /**
     * Process activities data for insert/update
     * 
     * @param Request $request
     * @return array
     */
    private function processActivitiesData(Request $request): array
    {
        $data = [
            'activity_type' => $request->activity_type,
            'pickup' => $request->pickup,
            'meeting_point' => $request->meeting_point,
            'private_or_group' => $request->private_or_group,
            'difficulty' => $request->difficulty,
            'languages_spoken' => is_array($request->languages_spoken) 
                ? implode(',', $request->languages_spoken) 
                : ($request->languages_spoken ?? null)
        ];

        // Handle duration options for activities
        if ($request->has('duration_options') && is_array($request->duration_options)) {
            $validDurations = array_filter($request->duration_options, function($duration) {
                return is_numeric($duration) && (float)$duration > 0;
            });
            $data['duration_options'] = implode(',', $validDurations);
        }

        // Add group-specific fields if applicable
        if ($request->private_or_group === 'Group') {
            $data['group_size_min'] = $request->group_size_min;
            $data['group_size_max'] = $request->group_size_max;
        }

        return $data;
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
                ->withCurrentTranslations() // Optimized: only current locale + English
                ->with(['galleries', 'city', 'serviceTypeObj', 'activityTypeObj', 'pricings', 'actPricings'])
                ->skip(($page - 1) * $perPage)
                ->take($perPage + 1)
                ->get();

            $hasMore = $listings->count() > $perPage;
            $listings = $listings->take($perPage);

            // Add translated fields to each listing (optimized for current locale)
            foreach ($listings as $listing) {
                $listing->translated_fields = $listing->getCurrentTranslatedData();
            }

            return response()->json([
                'listings' => $listings,
                'hasMore' => $hasMore,
                'perPage' => $perPage
            ]);
        } else {
            $listings = $query
                ->withCurrentTranslations()
                ->with(['galleries', 'city', 'serviceTypeObj', 'activityTypeObj', 'pricings', 'actPricings'])
                ->inRandomOrder()
                ->take(4)
                ->get();

            // Add translated fields to each listing (optimized for current locale)
            foreach ($listings as $listing) {
                $listing->translated_fields = $listing->getCurrentTranslatedData();
            }

            return response()->json(['listings' => $listings]);
        }
    }

    public function related_products(Request $request)
    {
        $categoryID = $request->input('category_id', 2);

        $listings = Listing::where('category_id', $categoryID)
            ->withCurrentTranslations()
            ->with(['galleries', 'city', 'serviceTypeObj', 'activityTypeObj', 'pricings', 'actPricings'])
            ->inRandomOrder()
            ->take(6)
            ->get();

        // Add translated fields to each listing (optimized for current locale)
        foreach ($listings as $listing) {
            $listing->translated_fields = $listing->getCurrentTranslatedData();
        }

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
        $durationService = new DurationIntervalService();

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
                    
                // Add transmission and fuel type options for cars
                $options['transmission'] = [
                    ['value' => 'Manual', 'label' => 'Manual'],
                    ['value' => 'Automatic', 'label' => 'Automatic']
                ];
                
                $options['fuelType'] = [
                    ['value' => 'Petrol', 'label' => 'Petrol'],
                    ['value' => 'Diesel', 'label' => 'Diesel'],
                    ['value' => 'Electric', 'label' => 'Electric'],
                    ['value' => 'Hybrid', 'label' => 'Hybrid']
                ];
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
                    
                // Add duration options for boat filtering
                $options['durationOptions'] = $durationService->generateBoatDurationOptions();
                
                // Add captain options
                $options['withCaptain'] = [
                    ['value' => 'yes', 'label' => 'With Captain'],
                    ['value' => 'no', 'label' => 'Without Captain']
                ];
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
                    
                // Add difficulty levels
                $options['difficulty'] = [
                    ['value' => 'Easy', 'label' => 'Easy'],
                    ['value' => 'Medium', 'label' => 'Medium'],
                    ['value' => 'Hard', 'label' => 'Hard']
                ];
                
                // Add group type options
                $options['privateGroup'] = [
                    ['value' => 'Private', 'label' => 'Private'],
                    ['value' => 'Group', 'label' => 'Group']
                ];
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
            if ($request->type == 'private') {
                $query->whereIn('vehicule_type', $request->carType);
            } else {
                // Handle both old single car_type and new multi-select car_types_new
                $carTypes = $request->carType;
                $query->where(function($q) use ($carTypes) {
                    // Search in new JSON field
                    foreach ($carTypes as $carType) {
                        $q->orWhereJsonContains('car_types_new', (int)$carType);
                    }
                    // Fallback to old single field for backward compatibility
                    $q->orWhereIn('car_type', $carTypes);
                });
            }
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
            ->withCurrentTranslations()
            ->with(['galleries', 'city', 'serviceTypeObj', 'activityTypeObj', 'pricings', 'actPricings'])
            ->skip($perPage * ($page - 1))
            ->take($perPage + 1)
            ->get();

        $hasMore = $listings->count() > $perPage;
        $listings = $listings->take($perPage);

        // Add translated fields to each listing (optimized for current locale)
        foreach ($listings as $listing) {
            $listing->translated_fields = $listing->getCurrentTranslatedData();
        }

        return response()->json(['results' => $listings, 'hasMore' => $hasMore]);
    }

    public function get_listing(Request $request)
    {
        // Locale is now set by ApiLocaleMiddleware
        
        $listing = Listing::where('slug', $request->slug)
            ->withCurrentTranslations() // Optimized: Load only current locale + English fallback
            ->with([
                'included',
                'notIncluded',
                'galleries',
                'provider',
                'city',
                'addons.addon',
                'serviceTypeObj',
                'activityTypeObj',
                'carTypeObj',
                'carModelObj',
                'boatTypeObj',
                'vehicleTypeObj',
                'vehicleModelObj',
                'pricings',
                'actPricings',
                'customBookingOptions',
                'driverPricings.cityA',
                'driverPricings.cityB'
            ])
            ->firstOrFail();

        // Load multiple car types if available
        if ($listing->category_id == 2 && !empty($listing->car_types)) {
            $carTypeIds = $listing->car_types;
            $listing->car_type_objs = \App\Models\SubCategoryOption::whereIn('id', $carTypeIds)->get();
        }

        // Add translated data to the response (optimized for current locale only)
        $listing->translated_fields = $listing->getCurrentTranslatedData();
        
        // Add SEO meta data for React frontend
        $seoService = app(SEOService::class);
        $translatedMeta = $seoService->getTranslatedMeta($listing, [
            'meta_title', 
            'meta_description',
            'title',
            'description'
        ]);
        
        $listing->seo_meta = [
            'title' => $translatedMeta['meta_title'] ?? $translatedMeta['title'] ?? $listing->title,
            'description' => $translatedMeta['meta_description'] ?? $translatedMeta['description'] ?? \Illuminate\Support\Str::limit($listing->description, 160),
            'og_title' => $translatedMeta['meta_title'] ?? $translatedMeta['title'] ?? $listing->title,
            'og_description' => $translatedMeta['meta_description'] ?? $translatedMeta['description'] ?? \Illuminate\Support\Str::limit($listing->description, 160),
            'og_image' => $listing->galleries && count($listing->galleries) > 0 
                ? asset('images/listings/' . $listing->galleries[0]->image) 
                : null,
            'locale' => app()->getLocale(),
            'structured_data' => $seoService->generateStructuredData('listing', $listing)
        ];

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

    /**
     * Generate translations for a listing using Google Gemini
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function translate(Request $request, $id)
    {
        // Validate admin permissions
        if (!auth()->check() || !auth()->user()->isAdmin()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $listing = Listing::findOrFail($id);
        
        $request->validate([
            'locales' => 'sometimes|array',
            'locales.*' => 'string|in:fr,es,ar,de,it,pt,ru,zh,ja',
            'fields' => 'sometimes|array',
            'fields.*' => 'string',
            'force' => 'sometimes|boolean'
        ]);

        $targetLocales = $request->input('locales', ['fr', 'es']);
        $selectedFields = $request->input('fields', null);
        $forceRetranslate = $request->input('force', false);

        try {
            DB::beginTransaction();

            // Check if translations exist and if we should skip
            if (!$forceRetranslate) {
                $existingTranslations = $listing->translations()
                    ->whereIn('locale', $targetLocales)
                    ->pluck('locale')
                    ->toArray();

                if (count($existingTranslations) === count($targetLocales)) {
                    return response()->json([
                        'status' => 'info',
                        'message' => 'Translations already exist. Use force=true to regenerate.',
                        'existing' => $existingTranslations
                    ]);
                }

                // Filter out existing locales if not forcing
                $targetLocales = array_diff($targetLocales, $existingTranslations);
            }

            if (empty($targetLocales)) {
                return response()->json([
                    'status' => 'info',
                    'message' => 'All requested translations already exist.'
                ]);
            }

            // Use Gemini Translation Service
            $geminiService = new GeminiTranslationService();
            
            if ($selectedFields) {
                $translations = $geminiService->translateFields($listing, $selectedFields, $targetLocales);
            } else {
                $translations = $geminiService->translateListing($listing, $targetLocales);
            }

            // Store translations using TranslationService
            $translationService = new TranslationService();
            $success = $translationService->updateTranslations($listing, $translations);

            if (!$success) {
                throw new \Exception('Failed to save translations to database');
            }

            DB::commit();

            // Get all translations for response
            $allTranslations = $listing->translations()
                ->whereIn('locale', array_keys($translations))
                ->get()
                ->keyBy('locale');

            return response()->json([
                'status' => 'success',
                'message' => 'Translations generated successfully',
                'translations' => $allTranslations,
                'generated_locales' => array_keys($translations)
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Translation failed for listing ' . $id, [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Translation failed: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get translations for a listing
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTranslations(Request $request, $id)
    {
        $listing = Listing::findOrFail($id);
        
        $translations = $listing->translations()
            ->get()
            ->keyBy('locale');

        $supportedLocales = config('app.supported_locales', ['en', 'fr', 'es']);
        $translationStatus = [];

        foreach ($supportedLocales as $locale) {
            $translationStatus[$locale] = [
                'exists' => isset($translations[$locale]),
                'updated_at' => isset($translations[$locale]) ? $translations[$locale]->updated_at : null,
                'source' => isset($translations[$locale]) ? 
                    (isset($translations[$locale]->source) ? $translations[$locale]->source : 'automatic') : null
            ];
        }

        return response()->json([
            'translations' => $translations,
            'status' => $translationStatus,
            'supported_locales' => $supportedLocales
        ]);
    }

    /**
     * Update manual translations for a listing
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateTranslations(Request $request, $id)
    {
        // Validate admin permissions
        if (!auth()->check() || !auth()->user()->isAdmin()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $listing = Listing::findOrFail($id);
        
        $request->validate([
            'translations' => 'required|array',
            'translations.*.locale' => 'required|string|in:' . implode(',', config('app.supported_locales', ['en', 'fr', 'es'])),
            'translations.*.title' => 'required|string',
            'translations.*.description' => 'nullable|string',
            'translations.*.short_description' => 'nullable|string',
            'translations.*.special_notes' => 'nullable|string',
            'translations.*.cancellation_policy' => 'nullable|string',
            'translations.*.rental_terms' => 'nullable|string',
            'translations.*.pickup_info' => 'nullable|string',
            'translations.*.meta_title' => 'nullable|string|max:255',
            'translations.*.meta_description' => 'nullable|string'
        ]);

        try {
            DB::beginTransaction();

            $translationService = new TranslationService();
            $translationData = [];

            foreach ($request->input('translations') as $translation) {
                $locale = $translation['locale'];
                unset($translation['locale']);
                $translation['source'] = 'manual'; // Mark as manually edited
                $translationData[$locale] = $translation;
            }

            $success = $translationService->updateTranslations($listing, $translationData);

            if (!$success) {
                throw new \Exception('Failed to update translations');
            }

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Translations updated successfully',
                'translations' => $listing->translations()->get()->keyBy('locale')
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Translation update failed for listing ' . $id, [
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update translations: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete translations for a listing
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteTranslations(Request $request, $id)
    {
        // Validate admin permissions
        if (!auth()->check() || !auth()->user()->isAdmin()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $listing = Listing::findOrFail($id);
        
        $request->validate([
            'locale' => 'sometimes|string|in:' . implode(',', config('app.supported_locales', ['en', 'fr', 'es']))
        ]);

        try {
            $translationService = new TranslationService();
            $locale = $request->input('locale', null);
            
            $success = $translationService->deleteTranslations($listing, $locale);

            if (!$success) {
                throw new \Exception('Failed to delete translations');
            }

            return response()->json([
                'status' => 'success',
                'message' => $locale ? 
                    "Translations for locale '$locale' deleted successfully" : 
                    'All translations deleted successfully'
            ]);

        } catch (\Exception $e) {
            Log::error('Translation deletion failed for listing ' . $id, [
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Failed to delete translations: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get translation statistics
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function translationStats(Request $request)
    {
        // Validate admin permissions
        if (!auth()->check() || !auth()->user()->isAdmin()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        try {
            $translationService = new TranslationService();
            $geminiService = new GeminiTranslationService();
            
            $stats = [
                'translations' => $translationService->getTranslationStats(),
                'api_usage' => $geminiService->getUsageStats(),
                'listings_total' => Listing::count(),
                'listings_translated' => Listing::whereHas('translations')->count()
            ];

            return response()->json($stats);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to get statistics: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Generate preview translations for new listings (before saving)
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function translatePreview(Request $request)
    {
        // Validate admin permissions
        if (!auth()->check() || !auth()->user()->isAdmin()) {
            Log::error('Translation preview: Unauthorized access', [
                'is_authenticated' => auth()->check(),
                'user_id' => auth()->id(),
                'is_admin' => auth()->check() ? auth()->user()->isAdmin() : false
            ]);
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $request->validate([
            'content' => 'required|array',
            'locales' => 'array',
            'fields' => 'array'
        ]);

        $content = $request->input('content');
        $targetLocales = $request->input('locales', ['fr', 'es']);
        $selectedFields = $request->input('fields', null);

        Log::info('Translation preview request', [
            'user_id' => auth()->id(),
            'locales' => $targetLocales,
            'fields_count' => count($content),
            'selected_fields' => $selectedFields
        ]);

        try {
            // Create a temporary listing object with the content
            $tempListing = new Listing();
            foreach ($content as $field => $value) {
                if (in_array($field, $tempListing->getFillable())) {
                    $tempListing->$field = $value;
                }
            }

            // Use Gemini Translation Service
            $geminiService = new GeminiTranslationService();
            
            if ($selectedFields) {
                $translations = $geminiService->translateFields($tempListing, $selectedFields, $targetLocales);
            } else {
                $translations = $geminiService->translateListing($tempListing, $targetLocales);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Translations generated successfully',
                'translations' => $translations
            ]);

        } catch (\Exception $e) {
            Log::error('Preview translation failed', [
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Translation failed: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete a listing
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete(Request $request)
    {
        try {
            $id = $request->input('id');
            
            if (!$id) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Listing ID is required'
                ], 400);
            }
            
            $listing = Listing::findOrFail($id);
            
            // Delete related data first
            $listing->galleries()->delete();
            $listing->included()->delete();
            $listing->notIncluded()->delete();
            $listing->addons()->delete();
            $listing->pricings()->delete();
            $listing->actPricings()->delete();
            $listing->driverPricings()->delete();
            $listing->customBookingOptions()->delete();
            $listing->translations()->delete();
            
            // Delete the listing (soft delete since the model uses SoftDeletes trait)
            $listing->delete();
            
            return response()->json([
                'status' => 'success',
                'message' => 'Listing deleted successfully'
            ]);
            
        } catch (\Exception $e) {
            Log::error('Failed to delete listing', [
                'error' => $e->getMessage(),
                'listing_id' => $request->input('id')
            ]);
            
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to delete listing: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get form data for category-specific listing creation/editing
     * Provides duration intervals, defaults, and validation options
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getFormData(Request $request)
    {
        $categoryId = (int) $request->input('category_id', 2);
        $cityId = $request->input('city_id');
        
        $categoryValidationService = new CategoryValidationService();
        $durationService = new DurationIntervalService();
        
        $formData = [
            'category_id' => $categoryId,
            'defaults' => $categoryValidationService->getCategoryDefaults($categoryId, $cityId),
            'validation_rules' => $categoryValidationService->getValidationRules($categoryId),
        ];
        
        // Add category-specific form options
        switch ($categoryId) {
            case 2: // Car Rental
                $formData['car_types'] = SubCategoryOption::leftJoin('sub_categories', 'sub_categories.id', '=', 'sub_category_options.subcategory_id')
                    ->where('id_category', 2)
                    ->where('subcategory', 'Car Type')
                    ->select('sub_category_options.id', 'option')
                    ->whereNull('sub_category_options.deleted_at')
                    ->get();
                    
                $formData['car_models'] = SubCategoryOption::leftJoin('sub_categories', 'sub_categories.id', '=', 'sub_category_options.subcategory_id')
                    ->where('id_category', 2)
                    ->where('subcategory', 'Car Model')
                    ->select('sub_category_options.id', 'option')
                    ->whereNull('sub_category_options.deleted_at')
                    ->get();
                break;
                
            case 3: // Private Driver
                $formData['vehicle_types'] = SubCategoryOption::leftJoin('sub_categories', 'sub_categories.id', '=', 'sub_category_options.subcategory_id')
                    ->where('id_category', 3)
                    ->where('subcategory', 'Vehicule Type')
                    ->select('sub_category_options.id', 'option')
                    ->whereNull('sub_category_options.deleted_at')
                    ->get();
                    
                $formData['service_types'] = SubCategoryOption::leftJoin('sub_categories', 'sub_categories.id', '=', 'sub_category_options.subcategory_id')
                    ->where('id_category', 3)
                    ->where('subcategory', 'Service Type')
                    ->select('sub_category_options.id', 'option')
                    ->get();
                break;
                
            case 4: // Boat Rental
                $formData['boat_types'] = SubCategoryOption::leftJoin('sub_categories', 'sub_categories.id', '=', 'sub_category_options.subcategory_id')
                    ->where('id_category', 4)
                    ->where('subcategory', 'Boat Type')
                    ->select('sub_category_options.id', 'option')
                    ->get();
                    
                $formData['duration_intervals'] = $durationService->generateBoatDurationOptions();
                $formData['currencies'] = [
                    ['code' => 'EUR', 'name' => 'Euro'],
                    ['code' => 'USD', 'name' => 'US Dollar'], 
                    ['code' => 'MAD', 'name' => 'Moroccan Dirham']
                ];
                break;
                
            case 5: // Activities
                $formData['activity_types'] = SubCategoryOption::leftJoin('sub_categories', 'sub_categories.id', '=', 'sub_category_options.subcategory_id')
                    ->where('id_category', 5)
                    ->where('subcategory', 'Activity Type')
                    ->select('sub_category_options.id', 'option')
                    ->get();
                    
                $formData['duration_options'] = $durationService->generateActivityDurationOptions();
                break;
        }
        
        return response()->json($formData);
    }
}
