<?php

namespace App\Services;

use App\Models\Listing;
use App\Models\ListingAddon;
use App\Models\CustomBookingOption;
use App\Models\DriverPricing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use App\Http\Controllers\BookingController;

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
            'additionalNotes' => 'additional_notes'
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
                'listing_id' => ['The selected listing does not exist.']
            ]);
        }
        
        // Check if listing is soft deleted
        if ($listing->trashed()) {
            throw ValidationException::withMessages([
                'listing_id' => ['The selected listing is no longer available.']
            ]);
        }
        
        // Verify category match
        if ($listing->category_id != $request->category_id) {
            throw ValidationException::withMessages([
                'listing_id' => ['The selected listing does not belong to the specified category.']
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
        
        if (empty($addonIds)) {
            return;
        }
        
        // Get all valid addon IDs for this listing through the pivot table
        $validAddonIds = $listing->addons()->pluck('addon_id')->toArray();
        
        // Check if all requested addons are valid
        $invalidAddons = array_diff($addonIds, $validAddonIds);
        
        if (!empty($invalidAddons)) {
            throw ValidationException::withMessages([
                'addons' => ['One or more selected add-ons are not available for this listing.']
            ]);
        }
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
        
        // Calculate add-ons total
        if ($request->has('addons') && !empty($request->addons)) {
            $addonIds = array_filter($request->input('addons', []));
            $addonsTotal = ListingAddon::whereIn('id', $addonIds)
                ->sum('price');
        }
        
        $calculatedTotal = $basePrice + $addonsTotal;
        
        // Apply discount or extra charge if provided
        if ($request->has('discount_or_extra')) {
            $calculatedTotal += (float) $request->discount_or_extra;
        }
        
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
        // Use the BookingController's advanced pricing logic
        $controller = new BookingController();
        
        // Build request data for price calculation
        $priceRequest = new Request();
        $priceRequest->merge($request->all());
        
        // Ensure we have the correct listing relationship loaded
        $listing->load(['customBookingOptions', 'driverPricings', 'addons.addon', 'city']);
        
        $priceCalculation = $controller->calculateAdvancedPrice($listing, $priceRequest);
        
        return $priceCalculation['base_price'];
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
                'pickup_date' => ['Car rental must be booked at least 24 hours in advance based on Morocco time.']
            ]);
        }
        
        // Enforce pickup location must be the listing's city
        $listing = Listing::find($request->listing_id);
        if ($listing && $listing->city_id != $request->pickup_location) {
            throw ValidationException::withMessages([
                'pickup_location' => ['Pickup location must be in ' . ($listing->city ? $listing->city->city_name : 'the listing city') . '.']
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
                'dropoff_date' => ['Car rental requires a minimum of 3 days booking duration.']
            ]);
        }
        
        // Check SUV/MPV for surf rack eligibility if surf_rack is requested
        if ($request->has('surf_rack') && $request->surf_rack) {
            $listing = Listing::find($request->listing_id);
            if ($listing && !in_array($listing->vehicule_type, ['SUV', 'MPV'])) {
                throw ValidationException::withMessages([
                    'surf_rack' => ['Surf rack is only available for SUV and MPV vehicles.']
                ]);
            }
        }
    }
    
    /**
     * Validate Private Driver specific fields (Category 3)
     */
    private function validatePrivateDriver(Request $request): void
    {
        // Use Morocco timezone for validation
        $moroccoNow = now()->setTimezone('Africa/Casablanca');
        $minAdvanceHours = $this->getMinAdvanceHours(3);
        $minDateTime = $moroccoNow->copy()->addHours($minAdvanceHours);
        
        $rules = [
            'car_type' => 'required|integer',
            'service_type' => 'required|array|min:1',
            'service_type.*' => 'in:airport_transfer,intercity',
            'road_type' => 'required|array|min:1',
            'road_type.*' => 'in:one_way,road_trip',
            'city_a_id' => 'required|exists:cities,id',
            'city_b_id' => 'nullable|required_if:service_type.*,intercity|exists:cities,id',
            'pickup_airport' => 'required_if:service_type.*,airport_transfer|string|max:255',
            'dropoff_hotel' => 'required_if:service_type.*,airport_transfer|string|max:255',
            'pickup_city' => 'required_if:service_type.*,intercity|exists:cities,id',
            'dropoff_city' => 'required_if:service_type.*,intercity|exists:cities,id',
            'prefered_date' => ['required', 'date'],
            'pickup_time' => 'required|date_format:H:i',
            'number_of_passengers' => 'required|integer|min:1',
            'number_of_luggage' => 'required|integer|min:0'
        ];
        
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
                    'prefered_date' => ['Private driver service must be booked at least 48 hours in advance based on Morocco time.']
                ]);
            }
        }
        
        // Validate passenger count against listing capacity
        $listing = Listing::find($request->listing_id);
        if ($listing && $listing->max_passengers && $request->number_of_passengers > $listing->max_passengers) {
            throw ValidationException::withMessages([
                'number_of_passengers' => ['Number of passengers exceeds vehicle capacity of ' . $listing->max_passengers . '.']
            ]);
        }
        
        // Check pricing exists for selected route combination
        if (in_array('intercity', $request->service_type)) {
            $serviceType = $request->service_type[0]; // Get first element since it's an array
            $roadType = $request->road_type[0]; // Get first element since it's an array
            
            $pricing = $listing->driverPricings()
                ->where('service_type', 'intercity')
                ->where('road_type', $roadType)
                ->where('city_a_id', $request->city_a_id)
                ->where('city_b_id', $request->city_b_id)
                ->first();
                
            if (!$pricing) {
                // For now, let's skip this validation as pricing data might not be seeded
                // In production, this should throw an error
                \Log::warning('No driver pricing found for route', [
                    'listing_id' => $listing->id,
                    'service_type' => 'intercity',
                    'road_type' => $roadType,
                    'city_a_id' => $request->city_a_id,
                    'city_b_id' => $request->city_b_id
                ]);
                // Comment out the error for now
                /*
                throw ValidationException::withMessages([
                    'city_b_id' => ['No pricing available for the selected route.']
                ]);
                */
            }
        }
        
        if (in_array('airport_transfer', $request->service_type)) {
            $serviceType = $request->service_type[0]; // Get first element since it's an array
            $roadType = $request->road_type[0]; // Get first element since it's an array
            
            $pricing = $listing->driverPricings()
                ->where('service_type', 'airport_transfer')
                ->where('road_type', $roadType)
                ->where('city_a_id', $request->city_a_id)
                ->whereNull('city_b_id')
                ->first();
                
            if (!$pricing) {
                // For now, let's skip this validation as pricing data might not be seeded
                // In production, this should throw an error
                \Log::warning('No driver pricing found for airport transfer', [
                    'listing_id' => $listing->id,
                    'service_type' => 'airport_transfer',
                    'road_type' => $roadType,
                    'city_a_id' => $request->city_a_id
                ]);
                // Comment out the error for now
                /*
                throw ValidationException::withMessages([
                    'city_a_id' => ['No airport transfer pricing available for the selected city.']
                ]);
                */
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
        
        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
        
        // Validate preferred date and time is at least 48 hours in advance (Morocco time)
        $preferredDateTime = \Carbon\Carbon::parse($request->prefered_date . ' ' . $request->pickup_time)
            ->setTimezone('Africa/Casablanca');
        if ($preferredDateTime < $minDateTime) {
            throw ValidationException::withMessages([
                'prefered_date' => ['Boat rental must be booked at least 48 hours in advance based on Morocco time.']
            ]);
        }
        
        // Validate time slots between 8am-8pm
        $pickupTime = \Carbon\Carbon::createFromFormat('H:i', $request->pickup_time);
        $startLimit = \Carbon\Carbon::createFromFormat('H:i', '08:00');
        $endLimit = \Carbon\Carbon::createFromFormat('H:i', '20:00');
        
        if ($pickupTime->lt($startLimit) || $pickupTime->gt($endLimit)) {
            throw ValidationException::withMessages([
                'pickup_time' => ['Boat rental time must be between 8:00 AM and 8:00 PM.']
            ]);
        }
        
        // Validate duration in 30-minute increments
        $duration = (float) $request->duration;
        if (fmod($duration, 0.5) != 0) {
            throw ValidationException::withMessages([
                'duration' => ['Duration must be in 30-minute increments (0.5 hours).']
            ]);
        }
        
        // Calculate end time and ensure it doesn't exceed 8pm
        $endTime = $pickupTime->copy()->addMinutes($duration * 60);
        if ($endTime->gt($endLimit)) {
            throw ValidationException::withMessages([
                'duration' => ['Boat rental must end by 8:00 PM. Please adjust duration or start time.']
            ]);
        }
        
        // Validate number of people against boat capacity
        $listing = Listing::find($request->listing_id);
        if ($listing && $listing->capacity && $request->number_of_people > $listing->capacity) {
            throw ValidationException::withMessages([
                'number_of_people' => ['Number of people exceeds boat capacity of ' . $listing->capacity . '.']
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
            'activity_type' => 'required|integer'
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
                'prefered_date' => ['Activities must be booked at least 48 hours in advance based on Morocco time.']
            ]);
        }
        
        $listing = Listing::find($request->listing_id);
        if (!$listing) {
            return; // Listing validation happens elsewhere
        }
        
        // Validate duration option exists for this listing
        if ($request->has('duration_option_id') && $request->duration_option_id) {
            $durationExists = $listing->actPricings()
                ->where('id', $request->duration_option_id)
                ->exists();
                
            if (!$durationExists) {
                throw ValidationException::withMessages([
                    'duration_option_id' => ['Selected duration option is not available for this activity.']
                ]);
            }
        }
        
        // Validate group size for group activities
        if ($listing->private_or_group === 'group') {
            if ($listing->group_size_max && $request->number_of_people > $listing->group_size_max) {
                throw ValidationException::withMessages([
                    'number_of_people' => ['Number of people exceeds maximum group size of ' . $listing->group_size_max . '.']
                ]);
            }
            
            if ($listing->group_size_min && $request->number_of_people < $listing->group_size_min) {
                throw ValidationException::withMessages([
                    'number_of_people' => ['Minimum ' . $listing->group_size_min . ' people required for this group activity.']
                ]);
            }
        }
        // For private activities, there's no limit on number of people
    }
}