<?php

namespace App\Services;

use App\Models\Listing;
use App\Models\ListingAddon;
use App\Models\DriverPricing;
use Illuminate\Http\Request;
use Carbon\Carbon;

/**
 * Centralized pricing service to ensure consistency between frontend and backend calculations
 * This service implements the CORRECT pricing logic as defined in the frontend bookingHelpers.js
 */
class PricingService
{
    /**
     * Calculate the total price for a booking
     * 
     * @param Listing $listing
     * @param Request $request
     * @return array
     */
    public function calculateTotalPrice(Listing $listing, Request $request): array
    {
        // Calculate base price based on category
        $basePrice = $this->calculateBasePrice($listing, $request);
        
        // Calculate add-ons total
        $addonsTotal = $this->calculateAddonsTotal($listing, $request);
        
        // Calculate total
        $totalPrice = $basePrice + $addonsTotal;
        
        // Apply discount or extra charge if provided
        if ($request->has('discount_or_extra')) {
            $totalPrice += (float) $request->discount_or_extra;
        }
        
        return [
            'base_price' => round($basePrice, 2),
            'addons_total' => round($addonsTotal, 2),
            'total_price' => round($totalPrice, 2)
        ];
    }
    
    /**
     * Calculate base price based on listing category
     * 
     * @param Listing $listing
     * @param Request $request
     * @return float
     */
    public function calculateBasePrice(Listing $listing, Request $request): float
    {
        switch ($listing->category_id) {
            case 2: // Car Rental
                return $this->calculateCarRentalPrice($listing, $request);
            case 3: // Private Driver
                return $this->calculatePrivateDriverPrice($listing, $request);
            case 4: // Boat Rental
                return $this->calculateBoatRentalPrice($listing, $request);
            case 5: // Activities/Things to Do
                return $this->calculateActivityPrice($listing, $request);
            default:
                return 0;
        }
    }
    
    /**
     * Calculate car rental price with tiered pricing
     * Matches frontend logic exactly from bookingHelpers.js
     * 
     * @param Listing $listing
     * @param Request $request
     * @return float
     */
    private function calculateCarRentalPrice(Listing $listing, Request $request): float
    {
        // Parse dates and times
        $startDate = $request->input('pickup_date', $request->input('booking_date_from'));
        $endDate = $request->input('dropoff_date', $request->input('booking_date_to'));
        $pickupTime = $request->input('pickup_time', '10:00');
        $dropoffTime = $request->input('dropoff_time', '10:00');
        
        // Calculate exact hours between dates
        $start = Carbon::parse("$startDate $pickupTime");
        $end = Carbon::parse("$endDate $dropoffTime");
        $totalMinutes = $end->diffInMinutes($start);
        
        // Every 24h (1440 minutes) = 1 day, any excess = +1 day
        $days = ceil($totalMinutes / 1440);
        
        // Apply tiered pricing
        $pricePerDay = 0;
        $totalPrice = 0;
        
        if ($days < 7) {
            // Daily rate for less than 7 days
            $pricePerDay = $listing->price_per_day ?: 0;
            $totalPrice = $pricePerDay * $days;
        } elseif ($days < 30) {
            // Weekly rate for 7-29 days
            $pricePerDay = ($listing->price_per_week ?: $listing->price_per_day * 7) / 7;
            $totalPrice = $pricePerDay * $days;
        } else {
            // Monthly rate for 30+ days
            $pricePerDay = ($listing->price_per_month ?: $listing->price_per_day * 30) / 30;
            $totalPrice = $pricePerDay * $days;
        }
        
        return $totalPrice;
    }
    
    /**
     * Calculate private driver price with city-based pricing
     * Matches frontend logic exactly from bookingHelpers.js
     * 
     * @param Listing $listing
     * @param Request $request
     * @return float
     */
    private function calculatePrivateDriverPrice(Listing $listing, Request $request): float
    {
        // Handle field mappings
        $serviceTypes = $request->input('service_types', $request->input('service_type', []));
        $roadTypes = $request->input('road_types', $request->input('road_type', []));
        $pickupCity = $request->input('pickup_city', $request->input('city_a_id'));
        $dropoffCity = $request->input('dropoff_city', $request->input('city_b_id'));
        
        // Ensure arrays
        if (!is_array($serviceTypes)) {
            $serviceTypes = [$serviceTypes];
        }
        if (!is_array($roadTypes)) {
            $roadTypes = [$roadTypes];
        }
        
        // Determine service and road type
        $isAirportTransfer = in_array('airport_transfer', $serviceTypes);
        $isIntercity = in_array('intercity', $serviceTypes);
        $isRoundTrip = in_array('round_trip', $roadTypes) || in_array('road_trip', $roadTypes);
        
        $pricing = null;
        $driverPrice = 0;
        
        // Match frontend logic exactly for city selection and price column
        if ($isAirportTransfer) {
            // For airport transfer: use dropoff city if specified, otherwise listing city
            $cityToFind = $dropoffCity ?: $listing->city_id;
            $pricing = $listing->pricings()
                ->where('city_id', $cityToFind)
                ->first();
                
            if ($pricing) {
                // Use airport prices if available, otherwise intercity prices
                if ($isRoundTrip) {
                    $driverPrice = floatval($pricing->airport_round ?: $pricing->intercity_round);
                } else {
                    $driverPrice = floatval($pricing->airport_one ?: $pricing->intercity_one);
                }
            }
        } elseif ($isIntercity) {
            // For intercity, use the dropoff city's pricing row
            $pricing = $listing->pricings()
                ->where('city_id', $dropoffCity)
                ->first();
                
            if ($pricing) {
                if ($isRoundTrip) {
                    $driverPrice = floatval($pricing->intercity_round);
                } else {
                    $driverPrice = floatval($pricing->intercity_one);
                }
            }
        }
        
        return $driverPrice;
    }
    
    /**
     * Calculate boat rental price with tiered pricing
     * Matches frontend logic exactly - uses FLAT RATES for half-day and full-day
     * 
     * @param Listing $listing
     * @param Request $request
     * @return float
     */
    private function calculateBoatRentalPrice(Listing $listing, Request $request): float
    {
        $hours = floatval($request->duration);
        $price = 0;
        
        if ($hours >= 0.5 && $hours <= 1.5) {
            // 30min to 1.5 hours: price_per_hour * hours
            $price = ($listing->price_per_hour ?: 0) * $hours;
        } elseif ($hours >= 2 && $hours <= 4) {
            // 2 to 4 hours: proportional half-day rate (price_per_half_day / 4 * hours)
            $halfDayRate = $listing->price_per_half_day ?: $listing->price_per_hour * 4;
            $price = ($halfDayRate / 4) * $hours;
        } elseif ($hours >= 4.5 && $hours <= 8) {
            // 4.5 to 8 hours: proportional full-day rate (price_per_day / 8 * hours)
            $fullDayRate = $listing->price_per_day ?: $listing->price_per_hour * 8;
            $price = ($fullDayRate / 8) * $hours;
        } else {
            // Invalid duration - use hourly rate as fallback
            $price = ($listing->price_per_hour ?: 0) * $hours;
        }
        
        return $price;
    }
    
    /**
     * Calculate activity price based on private/group and number of people
     * Matches frontend logic exactly from bookingHelpers.js
     * 
     * @param Listing $listing
     * @param Request $request
     * @return float
     */
    private function calculateActivityPrice(Listing $listing, Request $request): float
    {
        $people = intval($request->input('number_of_people', 1));
        $selectedDurationOption = $request->input('pricing_option_id') ?: $request->input('duration_option_id');
        $activityPrice = 0;
        
        if ($selectedDurationOption) {
            $selectedOption = $listing->actPricings()->find($selectedDurationOption);
            
            if ($selectedOption) {
                $optionPrice = floatval($selectedOption->price);
                
                // Check activity type (private vs group)
                if (strtolower($listing->private_or_group) === 'group') {
                    // Group activities: Fixed price for the whole group
                    $activityPrice = $optionPrice;
                } else {
                    // Private activities: Price per person
                    $activityPrice = $optionPrice * $people;
                }
            }
        }
        
        return $activityPrice;
    }
    
    /**
     * Calculate add-ons total with proper validation
     * Ensures only add-ons that belong to the listing are calculated
     * 
     * @param Listing $listing
     * @param Request $request
     * @return float
     */
    public function calculateAddonsTotal(Listing $listing, Request $request): float
    {
        $addonsTotal = 0;
        
        if ($request->has('addons') && !empty($request->addons)) {
            $addonIds = array_filter($request->input('addons', []));
            
            if (empty($addonIds)) {
                return 0;
            }
            
            // Get valid addon IDs for this listing through pivot table
            $validAddonIds = $listing->addons()->pluck('addon_id')->toArray();
            
            // Filter to only include addons that belong to this listing
            $validSelectedAddons = array_intersect($addonIds, $validAddonIds);
            
            // Calculate total from valid addons only
            $addonsBaseTotal = ListingAddon::whereIn('id', $validSelectedAddons)->sum('price');
            
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
                \Log::warning('Invalid addons attempted in PricingService', [
                    'listing_id' => $listing->id,
                    'requested_addons' => $addonIds,
                    'invalid_addons' => $invalidAddons,
                    'valid_addons' => $validSelectedAddons,
                    'ip' => $request->ip()
                ]);
            }
        }
        
        return floatval($addonsTotal);
    }
    
    /**
     * Validate that frontend and backend prices match within tolerance
     * 
     * @param float $frontendPrice
     * @param float $backendPrice
     * @param float $tolerance
     * @return bool
     */
    public function validatePriceConsistency(float $frontendPrice, float $backendPrice, float $tolerance = 0.01): bool
    {
        return abs($frontendPrice - $backendPrice) <= $tolerance;
    }
    
    /**
     * Log price mismatch for monitoring
     * 
     * @param Listing $listing
     * @param float $frontendPrice
     * @param float $backendPrice
     * @param Request $request
     * @return void
     */
    public function logPriceMismatch(Listing $listing, float $frontendPrice, float $backendPrice, Request $request): void
    {
        \Log::warning('Price mismatch detected', [
            'listing_id' => $listing->id,
            'category_id' => $listing->category_id,
            'frontend_price' => $frontendPrice,
            'backend_price' => $backendPrice,
            'difference' => abs($frontendPrice - $backendPrice),
            'percentage_diff' => $backendPrice > 0 ? round(abs($frontendPrice - $backendPrice) / $backendPrice * 100, 2) : 0,
            'request_data' => $request->all(),
            'ip' => $request->ip(),
            'user_agent' => $request->userAgent()
        ]);
    }
}