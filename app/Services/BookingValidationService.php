<?php

namespace App\Services;

use App\Models\Listing;
use App\Models\ListingAddon;
use App\Models\CustomBookingOption;
use App\Models\DriverPricing;
use App\Models\PrivateListingPricing;
use App\Models\City;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use App\Services\PricingService;

class BookingValidationService
{
    /**
     * Validate all booking data including business rules
     *
     * @param Request $request
     * @return array Validated data
     * @throws ValidationException
     */
    public function validateBookingData(Request $request): array
    {
        // Set the locale based on the request
        $locale = $request->booking_language ?? $request->locale ?? session('locale', config('app.locale'));
        $supportedLocales = config('app.supported_locales', ['en', 'fr', 'es']);
        if (!in_array($locale, $supportedLocales)) {
            $locale = config('app.fallback_locale', 'en');
        }
        app()->setLocale($locale);
        
        // First, validate common fields
        $this->validateCommonFields($request);
        
        // Then validate category-specific fields
        $this->validateCategorySpecificFields($request);
        
        // Validate listing existence and category match
        $listing = $this->validateListing($request);
        
        // Validate add-ons if provided
        if ($request->has('addons') && !empty($request->addons)) {
            $this->validateAddons($request, $listing);
        }
        
        // Calculate and validate pricing
        $pricingData = $this->calculateAndValidatePricing($request, $listing);
        
        return [
            'listing' => $listing,
            'pricing' => $pricingData
        ];
    }
    
    /**
     * Validate common fields required for all bookings
     */
    private function validateCommonFields(Request $request): void
    {
        // Handle both camelCase and snake_case field names for backward compatibility
        $data = $request->all();
        
        // Map field names if needed
        $fieldMappings = [
            'fullName' => 'full_name',
            'whatsAppNumber' => 'whatsapp',
            'countryOfResidence' => 'country',
            'termsAccepted' => 'terms_accepted',
            'flightNumber' => 'flight_number',
            'additionalNotes' => 'additional_notes',
            'serviceTypes' => 'service_types',
            'roadTypes' => 'road_types',
            'numberOfPeople' => 'number_of_people',
            'numberOfPassengers' => 'number_of_passengers',
            'numberOfLuggage' => 'number_of_luggage',
            'preferredDate' => 'prefered_date',
            'pickupTime' => 'pickup_time',
            'dropoffTime' => 'dropoff_time',
            'pickupLocation' => 'pickup_location',
            'dropoffLocation' => 'dropoff_location',
            'selectedAddons' => 'addons',
            'pickupCity' => 'pickup_city',
            'dropoffCity' => 'dropoff_city'
        ];
        
        // Check if we have the old field names and map them
        foreach ($fieldMappings as $old => $new) {
            if (isset($data[$old]) && !isset($data[$new])) {
                $data[$new] = $data[$old];
            }
        }
        
        // Handle name fields - could be full_name or first_name/last_name
        if (!isset($data['full_name']) && isset($data['first_name']) && isset($data['last_name'])) {
            $data['full_name'] = $data['first_name'] . ' ' . $data['last_name'];
        }
        
        // Handle age field - could be age directly or calculated from dateOfBirth
        if (!isset($data['age']) && isset($data['dateOfBirth'])) {
            $birthDate = \Carbon\Carbon::parse($data['dateOfBirth']);
            $data['age'] = $birthDate->age;
        }
        
        // Also map dateOfBirth if it's in camelCase
        if (isset($data['dateOfBirth']) && !isset($data['date_of_birth'])) {
            $data['date_of_birth'] = $data['dateOfBirth'];
        }
        
        $validator = Validator::make($data, [
            'category_id' => 'required|integer|in:2,3,4,5',
            'listing_id' => 'required|integer|exists:listings,id',
            'full_name' => 'required_without_all:first_name,last_name|string|max:255',
            'first_name' => 'required_without:full_name|string|max:255',
            'last_name' => 'required_without:full_name|string|max:255',
            'email' => 'required|email|max:255',
            'whatsapp' => ['required', 'string', 'max:255', 'regex:/^\+[0-9]{1,4}[0-9]{6,}$/'],
            'country' => 'required|string|max:255',
            'age' => ($data['category_id'] ?? null) == 2 ? 'required|integer|min:18|max:100' : 'nullable|integer|min:18|max:100',
            'date_of_birth' => 'required|date|before:' . now()->subYears(18)->format('Y-m-d') . '|after:' . now()->subYears(100)->format('Y-m-d'),
            'terms_accepted' => 'required|accepted',
            'flight_number' => 'nullable|string|max:255',
            'additional_notes' => 'nullable|string|max:1000',
            'booking_price' => 'numeric|min:0',
            'total_addons' => 'numeric|min:0',
            'total_price' => 'numeric|min:0',
            'discount_or_extra' => 'numeric'
        ]);
        
        // Set custom attribute names for better error messages
        $validator->setAttributeNames([
            'full_name' => __('validation.attributes.full_name'),
            'first_name' => __('validation.attributes.first_name'),
            'last_name' => __('validation.attributes.last_name'),
            'email' => __('validation.attributes.email'),
            'whatsapp' => __('validation.attributes.whatsapp'),
            'country' => __('validation.attributes.country'),
            'age' => __('validation.attributes.age'),
            'date_of_birth' => __('validation.attributes.date_of_birth'),
            'terms_accepted' => __('validation.attributes.terms_accepted'),
            'flight_number' => __('validation.attributes.flight_number'),
            'additional_notes' => __('validation.attributes.additional_notes')
        ]);
        
        // Set custom error messages
        $validator->setCustomMessages([
            'whatsapp.regex' => __('validation.custom.whatsapp.format'),
            'date_of_birth.before' => __('validation.custom.date_of_birth.age_requirement'),
            'date_of_birth.after' => __('validation.custom.date_of_birth.max_age'),
            'terms_accepted.accepted' => __('validation.custom.terms_accepted.required')
        ]);
        
        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
        
        // Merge mapped data back to request for downstream use
        $request->merge($data);
    }
    
    /**
     * Validate category-specific fields
     */
    private function validateCategorySpecificFields(Request $request): void
    {
        $categoryId = (int) $request->category_id;
        
        switch ($categoryId) {
            case 2: // Car rental
                $this->validateCarRental($request);
                break;
                
            case 3: // Private driver
                $this->validatePrivateDriver($request);
                break;
                
            case 4: // Boat rental
                $this->validateBoatRental($request);
                break;
                
            case 5: // Things to Do
                $this->validateThingsToDo($request);
                break;
        }
    }
    
    /**
     * Validate listing exists and matches category
     */
    private function validateListing(Request $request): Listing
    {
        $listing = Listing::find($request->listing_id);
        
        if (!$listing) {
            throw ValidationException::withMessages([
                'listing_id' => [__('validation.custom.listing.not_found')]
            ]);
        }
        
        // Check if listing is soft deleted
        if ($listing->trashed()) {
            throw ValidationException::withMessages([
                'listing_id' => [__('validation.custom.listing.not_available')]
            ]);
        }
        
        // Verify category match
        if ($listing->category_id != $request->category_id) {
            throw ValidationException::withMessages([
                'listing_id' => [__('validation.custom.listing.category_mismatch')]
            ]);
        }
        
        // Check if listing has an active status field (if it exists)
        // Note: Based on the database schema, there might not be an is_active field
        // but we should check for any status-related fields
        
        return $listing;
    }
    
    /**
     * Validate that all selected add-ons belong to the listing
     */
    private function validateAddons(Request $request, Listing $listing): void
    {
        $addonIds = array_filter($request->input('addons', []));
        
        \Log::info('Validating addons', [
            'listing_id' => $listing->id,
            'category_id' => $listing->category_id,
            'requested_addon_ids' => $addonIds,
            'addon_count' => count($addonIds)
        ]);
        
        if (empty($addonIds)) {
            \Log::info('No addons to validate');
            return;
        }
        
        // Get all valid addon IDs for this listing through the pivot table
        $validAddonIds = $listing->addons()->pluck('addon_id')->toArray();
        
        \Log::info('Valid addon IDs for listing', [
            'listing_id' => $listing->id,
            'valid_addon_ids' => $validAddonIds,
            'valid_count' => count($validAddonIds)
        ]);
        
        // Check if all requested addons are valid
        $invalidAddons = array_diff($addonIds, $validAddonIds);
        
        if (!empty($invalidAddons)) {
            \Log::error('Invalid addons detected', [
                'listing_id' => $listing->id,
                'invalid_addon_ids' => $invalidAddons,
                'requested' => $addonIds,
                'valid' => $validAddonIds
            ]);
            throw ValidationException::withMessages([
                'addons' => [__('validation.custom.addons.not_available')]
            ]);
        }
        
        \Log::info('Addons validated successfully');
    }
    
    /**
     * Calculate pricing and validate totals
     */
    private function calculateAndValidatePricing(Request $request, Listing $listing): array
    {
        $basePrice = 0;
        $addonsTotal = 0;
        
        // Get base price from listing
        // The pricing structure depends on category and might involve related pricing tables
        $basePrice = $this->calculateBasePrice($request, $listing);
        
        // Calculate add-ons total with proper validation
        if ($request->has('addons') && !empty($request->addons)) {
            $addonIds = array_filter($request->input('addons', []));
            
            // Get valid addon IDs for this listing through pivot table
            // The listing_addons pivot table has listing_id and addon_id columns
            $validAddonIds = $listing->addons()->pluck('addon_id')->toArray();
            
            // Filter to only include addons that belong to this listing
            $validSelectedAddons = array_intersect($addonIds, $validAddonIds);
            
            // Calculate total from valid addons only
            // We need to get the price from the addons table, not listing_addons
            $addonsBaseTotal = ListingAddon::whereIn('id', $validSelectedAddons)
                ->sum('price');
            
            // For private activities (category 5), multiply addon prices by number of people
            if ($listing->category_id == 5 && strtolower($listing->private_or_group) === 'private') {
                $numberOfPeople = $request->input('number_of_people', 1);
                $addonsTotal = $addonsBaseTotal * $numberOfPeople;
            } else {
                // For other categories or group activities, addon price is fixed
                $addonsTotal = $addonsBaseTotal;
            }
            
            // Log any invalid addons for security monitoring
            $invalidAddons = array_diff($addonIds, $validSelectedAddons);
            if (!empty($invalidAddons)) {
                \Log::warning('Invalid addons attempted', [
                    'listing_id' => $listing->id,
                    'requested_addons' => $addonIds,
                    'invalid_addons' => $invalidAddons,
                    'ip' => $request->ip()
                ]);
            }
        }
        
        // Don't apply discount to total - just store it separately
        $calculatedTotal = $basePrice + $addonsTotal;
        
        // Log price information for monitoring
        if ($request->has('total_price')) {
            $providedTotal = (float) $request->total_price;
            
            // Allow small difference for floating point precision
            if (abs($calculatedTotal - $providedTotal) > 0.01) {
                // Log price mismatch for security monitoring
                \Log::warning('Price mismatch detected - using server calculated price', [
                    'listing_id' => $listing->id,
                    'provided_price' => $providedTotal,
                    'calculated_price' => $calculatedTotal,
                    'difference' => abs($calculatedTotal - $providedTotal),
                    'ip' => $request->ip(),
                    'user_agent' => $request->userAgent()
                ]);
            }
        }
        
        // Always use server-calculated price
        $request->merge([
            'booking_price' => $basePrice,
            'total_addons' => $addonsTotal,
            'total_price' => $calculatedTotal
        ]);
        
        return [
            'booking_price' => $basePrice,
            'total_addons' => $addonsTotal,
            'total_price' => $calculatedTotal
        ];
    }
    
    /**
     * Calculate base price based on listing and category
     */
    private function calculateBasePrice(Request $request, Listing $listing): float
    {
        // Use the centralized PricingService for consistent calculations
        $pricingService = app(PricingService::class);
        
        // Ensure we have the correct listing relationships loaded
        $listing->load(['customBookingOptions', 'pricings', 'addons.addon', 'actPricings', 'city']);
        
        return $pricingService->calculateBasePrice($listing, $request);
    }
    
    /**
     * Get minimum advance booking hours based on category
     */
    private function getMinAdvanceHours(int $categoryId): int
    {
        switch ($categoryId) {
            case 2: // Cars: 24 hours advance
                return 24;
            case 3: // Drivers: 48 hours advance
            case 4: // Boats: 48 hours advance
            case 5: // Activities: 48 hours advance
                return 48;
            default:
                return 24;
        }
    }
    
    /**
     * Validate Car Rental specific fields (Category 2)
     */
    private function validateCarRental(Request $request): void
    {
        // Use Morocco timezone for validation
        $moroccoNow = now()->setTimezone('Africa/Casablanca');
        $minAdvanceHours = $this->getMinAdvanceHours(2);
        $minDateTime = $moroccoNow->copy()->addHours($minAdvanceHours);
        
        // Basic field validation
        $rules = [
            'pickup_date' => ['required', 'date'],
            'dropoff_date' => 'required|date|after:pickup_date',
            'pickup_time' => 'required|date_format:H:i',
            'dropoff_time' => 'required|date_format:H:i',
            'pickup_location' => 'required|exists:cities,id',
            'dropoff_location' => 'required|exists:cities,id'
        ];
        
        $validator = Validator::make($request->all(), $rules);
        
        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
        
        // Validate pickup datetime is at least 24 hours in advance (Morocco time)
        $pickupDateTime = \Carbon\Carbon::parse($request->pickup_date . ' ' . $request->pickup_time)
            ->setTimezone('Africa/Casablanca');
        if ($pickupDateTime < $minDateTime) {
            throw ValidationException::withMessages([
                'pickup_date' => [__('validation.custom.car_rental.advance_booking')]
            ]);
        }
        
        // Enforce pickup location must be the listing's city
        $listing = Listing::find($request->listing_id);
        if ($listing && $listing->city_id != $request->pickup_location) {
            throw ValidationException::withMessages([
                'pickup_location' => [__('validation.custom.car_rental.pickup_location', ['city' => $listing->city ? $listing->city->city_name : __('validation.custom.car_rental.listing_city')])]
            ]);
        }
        
        // Check minimum 3-day duration
        $pickupDate = \Carbon\Carbon::parse($request->pickup_date . ' ' . $request->pickup_time);
        $dropoffDate = \Carbon\Carbon::parse($request->dropoff_date . ' ' . $request->dropoff_time);
        
        // Calculate duration in days (every 24h = 1 day, even 1 minute over adds a day)
        $durationInHours = $pickupDate->diffInHours($dropoffDate);
        $durationInDays = (int) ceil($durationInHours / 24);
        
        if ($durationInDays < 3) {
            throw ValidationException::withMessages([
                'dropoff_date' => [__('validation.custom.car_rental.minimum_duration')]
            ]);
        }
        
        // Check SUV/MPV for surf rack eligibility if surf_rack is requested
        if ($request->has('surf_rack') && $request->surf_rack) {
            $listing = Listing::find($request->listing_id);
            if ($listing && !in_array($listing->vehicule_type, ['SUV', 'MPV'])) {
                throw ValidationException::withMessages([
                    'surf_rack' => [__('validation.custom.car_rental.surf_rack_restriction')]
                ]);
            }
        }
    }
    
    /**
     * Validate Private Driver specific fields (Category 3)
     */
    private function validatePrivateDriver(Request $request): void
    {
        // Handle field mappings for private driver
        $data = $request->all();
        
        // Map service_types and road_types from frontend
        if (isset($data['serviceTypes']) && !isset($data['service_types'])) {
            $data['service_types'] = $data['serviceTypes'];
        }
        if (isset($data['roadTypes']) && !isset($data['road_types'])) {
            $data['road_types'] = $data['roadTypes'];
        }
        
        // Ensure arrays are properly formatted
        if (isset($data['service_types']) && !is_array($data['service_types'])) {
            $data['service_types'] = [$data['service_types']];
        }
        if (isset($data['road_types']) && !is_array($data['road_types'])) {
            $data['road_types'] = [$data['road_types']];
        }
        
        $request->merge($data);
        
        // Use Morocco timezone for validation
        $moroccoNow = now()->setTimezone('Africa/Casablanca');
        $minAdvanceHours = $this->getMinAdvanceHours(3);
        $minDateTime = $moroccoNow->copy()->addHours($minAdvanceHours);
        
        // Determine which fields are required based on service type
        $serviceTypes = $request->input('service_types', []);
        $hasAirportTransfer = in_array('airport_transfer', $serviceTypes);
        $hasIntercity = in_array('intercity', $serviceTypes);
        
        $rules = [
            // car_type not collected from form, make it optional
            'car_type' => 'nullable|integer',
            'service_types' => 'required|array|min:1',
            'service_types.*' => 'in:airport_transfer,intercity',
            'road_types' => 'required|array|min:1',
            'road_types.*' => 'in:one_way,round_trip',
            'pickup_city' => 'required|exists:cities,id',
            'prefered_date' => ['required', 'date'],
            'pickup_time' => 'required|date_format:H:i',
            'number_of_passengers' => 'required|integer|min:1',
            'number_of_luggage' => 'required|integer|min:0'
        ];
        
        // Add conditional rules based on service type
        if ($hasAirportTransfer) {
            $rules['address'] = 'required|string|max:500';
            // For airport transfers to other cities, we also need dropoff_city
            if ($hasIntercity || $request->has('dropoff_city')) {
                $rules['dropoff_city'] = 'required|exists:cities,id';
            }
        }
        
        if ($hasIntercity) {
            $rules['dropoff_city'] = 'required|exists:cities,id';
        }
        
        $validator = Validator::make($request->all(), $rules);
        
        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
        
        // Validate preferred date is at least 48 hours in advance (Morocco time)
        if ($request->has('prefered_date') && $request->has('pickup_time')) {
            $preferredDateTime = \Carbon\Carbon::parse($request->prefered_date . ' ' . $request->pickup_time)
                ->setTimezone('Africa/Casablanca');
            if ($preferredDateTime < $minDateTime) {
                throw ValidationException::withMessages([
                    'prefered_date' => [__('validation.custom.private_driver.advance_booking')]
                ]);
            }
        }
        
        // Validate passenger count against listing capacity
        $listing = Listing::find($request->listing_id);
        if ($listing && $listing->max_passengers && $request->number_of_passengers > $listing->max_passengers) {
            throw ValidationException::withMessages([
                'number_of_passengers' => [__('validation.custom.private_driver.passengers_exceed', ['max' => $listing->max_passengers])]
            ]);
        }
        
        // Validate luggage count against listing capacity
        if ($listing && $listing->max_luggage && $request->number_of_luggage > $listing->max_luggage) {
            throw ValidationException::withMessages([
                'number_of_luggage' => [__('validation.custom.private_driver.luggage_exceed', ['max' => $listing->max_luggage])]
            ]);
        }
        
        // Check pricing exists using the new private_listing_pricings table
        $serviceTypes = $request->input('service_types', []);
        $roadTypes = $request->input('road_types', []);
        
        if (!empty($serviceTypes) && !empty($roadTypes)) {
            $isRoundTrip = in_array('round_trip', $roadTypes);
            $hasAirportTransfer = in_array('airport_transfer', $serviceTypes);
            $hasIntercity = in_array('intercity', $serviceTypes);
            
            // Use the pricings relationship (not driverPricings)
            $pricingQuery = $listing->pricings();
            
            // For airport transfers within same city
            if ($hasAirportTransfer && !$request->has('dropoff_city')) {
                $pricing = $pricingQuery->where('city_id', $request->pickup_city)->first();
                
                if ($pricing) {
                    // Check if the appropriate price column has a value
                    $priceColumn = $isRoundTrip ? 'airport_round' : 'airport_one';
                    if ($pricing->$priceColumn <= 0) {
                        \Log::warning('No price set for airport transfer', [
                            'listing_id' => $listing->id,
                            'city_id' => $request->pickup_city,
                            'price_column' => $priceColumn
                        ]);
                    }
                } else {
                    \Log::warning('No pricing record found for airport transfer', [
                        'listing_id' => $listing->id,
                        'city_id' => $request->pickup_city
                    ]);
                }
            }
            
            // For intercity or airport transfers to other cities
            if ($hasIntercity || ($hasAirportTransfer && $request->has('dropoff_city'))) {
                // For intercity, we check the pricing for pickup city
                // The logic is that intercity prices might be stored per origin city
                $pricing = $pricingQuery->where('city_id', $request->pickup_city)->first();
                
                if ($pricing) {
                    // For airport to other city, might use intercity prices
                    $priceColumn = $isRoundTrip ? 'intercity_round' : 'intercity_one';
                    if ($pricing->$priceColumn <= 0) {
                        \Log::warning('No price set for intercity/airport transfer to other city', [
                            'listing_id' => $listing->id,
                            'pickup_city' => $request->pickup_city,
                            'dropoff_city' => $request->dropoff_city ?? null,
                            'price_column' => $priceColumn
                        ]);
                    }
                } else {
                    \Log::warning('No pricing record found for intercity', [
                        'listing_id' => $listing->id,
                        'pickup_city' => $request->pickup_city,
                        'dropoff_city' => $request->dropoff_city ?? null
                    ]);
                }
            }
        }
    }
    
    /**
     * Validate Boat Rental specific fields (Category 4)
     */
    private function validateBoatRental(Request $request): void
    {
        // Use Morocco timezone for validation
        $moroccoNow = now()->setTimezone('Africa/Casablanca');
        $minAdvanceHours = $this->getMinAdvanceHours(4);
        $minDateTime = $moroccoNow->copy()->addHours($minAdvanceHours);
        
        $rules = [
            'duration' => 'required|numeric|min:0.5|max:8',
            'propose' => 'nullable|string|max:1000',
            'prefered_date' => ['required', 'date'],
            'number_of_people' => 'required|integer|min:1',
            'pickup_time' => ['required', 'date_format:H:i']
        ];
        
        $validator = Validator::make($request->all(), $rules);
        
        // Set custom attribute names for boat rental
        $validator->setAttributeNames([
            'duration' => __('validation.attributes.duration'),
            'propose' => __('validation.attributes.propose'),
            'prefered_date' => __('validation.attributes.prefered_date'),
            'number_of_people' => __('validation.attributes.number_of_people'),
            'pickup_time' => __('validation.attributes.pickup_time')
        ]);
        
        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
        
        // Validate preferred date and time is at least 48 hours in advance (Morocco time)
        $preferredDateTime = \Carbon\Carbon::parse($request->prefered_date . ' ' . $request->pickup_time)
            ->setTimezone('Africa/Casablanca');
        if ($preferredDateTime < $minDateTime) {
            throw ValidationException::withMessages([
                'prefered_date' => [__('validation.custom.boat_rental.advance_booking')]
            ]);
        }
        
        // Validate time slots between 8am-8pm
        $pickupTime = \Carbon\Carbon::createFromFormat('H:i', $request->pickup_time);
        $startLimit = \Carbon\Carbon::createFromFormat('H:i', '08:00');
        $endLimit = \Carbon\Carbon::createFromFormat('H:i', '20:00');
        
        if ($pickupTime->lt($startLimit) || $pickupTime->gt($endLimit)) {
            throw ValidationException::withMessages([
                'pickup_time' => [__('validation.custom.boat_rental.time_range')]
            ]);
        }
        
        // Validate duration in 30-minute increments
        $duration = (float) $request->duration;
        if (fmod($duration, 0.5) != 0) {
            throw ValidationException::withMessages([
                'duration' => [__('validation.custom.boat_rental.duration_increments')]
            ]);
        }
        
        // Calculate end time and ensure it doesn't exceed 8pm
        $endTime = $pickupTime->copy()->addMinutes($duration * 60);
        if ($endTime->gt($endLimit)) {
            throw ValidationException::withMessages([
                'duration' => [__('validation.custom.boat_rental.end_time')]
            ]);
        }
        
        // Validate number of people against boat capacity
        $listing = Listing::find($request->listing_id);
        if ($listing && $listing->capacity && $request->number_of_people > $listing->capacity) {
            throw ValidationException::withMessages([
                'number_of_people' => [__('validation.custom.boat_rental.capacity_exceed', ['max' => $listing->capacity])]
            ]);
        }
        
        // Note: Captain requirement would be handled in business logic, not validation
    }
    
    /**
     * Validate Things to Do specific fields (Category 5)
     */
    private function validateThingsToDo(Request $request): void
    {
        // Use Morocco timezone for validation
        $moroccoNow = now()->setTimezone('Africa/Casablanca');
        $minAdvanceHours = $this->getMinAdvanceHours(5);
        $minDateTime = $moroccoNow->copy()->addHours($minAdvanceHours);
        
        $rules = [
            'prefered_date' => ['required', 'date'],
            'time_preference' => 'required|in:morning,afternoon,evening,night',
            'duration_option_id' => 'nullable|integer',
            'number_of_people' => 'required|integer|min:1',
            'activity_type' => 'nullable|integer'  // Not collected from users, make it optional
        ];
        
        $validator = Validator::make($request->all(), $rules);
        
        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
        
        // Validate preferred date is at least 48 hours in advance (Morocco time)
        $preferredDate = \Carbon\Carbon::parse($request->prefered_date)
            ->setTimezone('Africa/Casablanca')
            ->endOfDay(); // Consider the whole day
        if ($preferredDate < $minDateTime) {
            throw ValidationException::withMessages([
                'prefered_date' => [__('validation.custom.activities.advance_booking')]
            ]);
        }
        
        $listing = Listing::find($request->listing_id);
        if (!$listing) {
            return; // Listing validation happens elsewhere
        }
        
        // Validate duration option exists for this listing
        // Check custom_booking_option_id first (primary field), then duration_option_id as fallback
        $optionId = $request->custom_booking_option_id ?? $request->duration_option_id;
        
        if ($optionId) {
            // First check customBookingOptions (primary)
            $optionExists = $listing->customBookingOptions()
                ->where('id', $optionId)
                ->exists();
            
            // If not found, check actPricings as fallback
            if (!$optionExists) {
                $optionExists = $listing->actPricings()
                    ->where('id', $optionId)
                    ->exists();
            }
                
            if (!$optionExists) {
                throw ValidationException::withMessages([
                    'duration_option_id' => [__('validation.custom.activities.duration_not_available')]
                ]);
            }
        }
        
        // Validate group size for group activities
        if ($listing->private_or_group === 'group') {
            if ($listing->group_size_max && $request->number_of_people > $listing->group_size_max) {
                throw ValidationException::withMessages([
                    'number_of_people' => [__('validation.custom.activities.group_size_exceed', ['max' => $listing->group_size_max])]
                ]);
            }
            
            if ($listing->group_size_min && $request->number_of_people < $listing->group_size_min) {
                throw ValidationException::withMessages([
                    'number_of_people' => [__('validation.custom.activities.group_size_minimum', ['min' => $listing->group_size_min])]
                ]);
            }
        }
        // For private activities, there's no limit on number of people
    }
}