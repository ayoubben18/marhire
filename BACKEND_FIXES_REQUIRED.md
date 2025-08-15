# BACKEND PRICING FIXES REQUIRED

**Priority:** CRITICAL  
**Estimated Time:** 4-6 hours for critical fixes  
**Files to Modify:** 2 primary files  

## Fix #1: Boat Rental Pricing - CRITICAL ⚠️

**File:** `app/Http/Controllers/BookingController.php`  
**Method:** `calculateBoatRentalPrice`  
**Lines:** 1372-1380  

### Current Code (INCORRECT)

```php
if ($hours >= 2 && $hours <= 4) {
    $price = $listing->price_per_half_day * ($hours / 4);
    $rateType = 'half_day';
    $calculation = $listing->price_per_half_day . ' * (' . $hours . '/4)';
} elseif ($hours >= 4.5 && $hours <= 8) {
    $price = $listing->price_per_day * ($hours / 8);
    $rateType = 'full_day';  
    $calculation = $listing->price_per_day . ' * (' . $hours . '/8)';
}
```

### Required Fix (CORRECT)

```php
if ($hours >= 2 && $hours <= 4) {
    // Use flat half-day rate, not fractional multiplier
    $price = $listing->price_per_half_day ?: $listing->price_per_hour * 4;
    $rateType = 'half_day';
    $calculation = 'Half-day rate: ' . ($listing->price_per_half_day ?: $listing->price_per_hour * 4);
} elseif ($hours >= 4.5 && $hours <= 8) {
    // Use flat full-day rate, not fractional multiplier
    $price = $listing->price_per_day ?: $listing->price_per_hour * 8;
    $rateType = 'full_day';
    $calculation = 'Full-day rate: ' . ($listing->price_per_day ?: $listing->price_per_hour * 8);
}
```

### Impact of This Fix
- **Before Fix:** 3-hour rental with €200 half-day rate = €150 (undercharged by €50)
- **After Fix:** 3-hour rental with €200 half-day rate = €200 (correct)
- **Revenue Recovery:** 25-50% for non-exact duration bookings

## Fix #2: Private Driver City Selection Logic - HIGH ⚠️

**File:** `app/Http/Controllers/BookingController.php`  
**Method:** `calculatePrivateDriverPrice`  
**Lines:** 1488-1490, 1529-1538  

### Current Code (INCONSISTENT)

```php
// Different city selection logic
$cityForPricing = $pickupCity;
if ($isAirportTransfer && $dropoffCity && $dropoffCity != $pickupCity) {
    $cityForPricing = $dropoffCity;
}

$pricing = $listing->pricings()
    ->where('city_id', $cityForPricing)
    ->first();

// Price column selection doesn't match frontend
if ($isAirportTransfer && !$dropoffCity) {
    $price = $isRoundTrip ? $pricing->airport_round : $pricing->airport_one;
} else if ($isIntercity || ($isAirportTransfer && $dropoffCity && $dropoffCity != $pickupCity)) {
    $price = $isRoundTrip ? $pricing->intercity_round : $pricing->intercity_one;
}
```

### Required Fix (ALIGN WITH FRONTEND)

```php
let pricing = null;
let driverPrice = 0;

if (serviceTypes.includes('airport_transfer')) {
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
} else if (serviceTypes.includes('intercity')) {
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

$price = $driverPrice;
```

### Impact of This Fix
- Ensures correct pricing row is selected from private_listing_pricings table
- Matches frontend city selection logic exactly
- Prevents wrong prices from being applied to airport/intercity routes

## Fix #3: Add-ons Validation Enhancement - MEDIUM ⚠️

**File:** `app/Services/BookingValidationService.php`  
**Method:** `calculateAndValidatePricing`  
**Lines:** 250-255  

### Current Code (RISKY)

```php
// Calculate add-ons total
if ($request->has('addons') && !empty($request->addons)) {
    $addonIds = array_filter($request->input('addons', []));
    $addonsTotal = ListingAddon::whereIn('id', $addonIds)
        ->sum('price');
}
```

### Required Fix (SAFER)

```php
// Calculate add-ons total with proper validation
if ($request->has('addons') && !empty($request->addons)) {
    $addonIds = array_filter($request->input('addons', []));
    
    // Get valid addon IDs for this listing through pivot table
    $validAddonIds = $listing->addons()->pluck('addon_id')->toArray();
    
    // Filter to only include addons that belong to this listing
    $validSelectedAddons = array_intersect($addonIds, $validAddonIds);
    
    // Calculate total from valid addons only
    $addonsTotal = ListingAddon::whereIn('id', $validSelectedAddons)
        ->sum('price');
    
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
```

### Impact of This Fix
- Prevents unauthorized add-ons from being included in pricing
- Adds security monitoring for suspicious addon requests
- Ensures only listing-associated add-ons are calculated

## Fix #4: Price Validation Service Architecture - MEDIUM 📊

**File:** `app/Services/BookingValidationService.php`  
**Method:** `calculateBasePrice`  
**Lines:** 301-313  

### Current Code (INEFFICIENT)

```php
private function calculateBasePrice(Request $request, Listing $listing): float
{
    // Use the BookingController's advanced pricing logic
    $controller = new BookingController();
    
    // Build request data for price calculation
    $priceRequest = new Request();
    $priceRequest->merge($request->all());
    
    // Ensure we have the correct listing relationship loaded
    $listing->load(['customBookingOptions', 'pricings', 'addons.addon', 'city']);
    
    $priceCalculation = $controller->calculateAdvancedPrice($listing, $priceRequest);
    
    return $priceCalculation['base_price'];
}
```

### Required Fix (BETTER ARCHITECTURE)

```php
private function calculateBasePrice(Request $request, Listing $listing): float
{
    // Create shared pricing service instead of instantiating controller
    $pricingService = app(PricingService::class);
    
    return $pricingService->calculateBasePrice($listing, $request);
}
```

**Note:** This requires creating a new `PricingService` class that contains the pricing logic extracted from BookingController.

## Implementation Steps

### Step 1: Critical Fixes (Immediate - 2 hours)
1. Fix boat rental fractional multiplier issue
2. Test boat rental pricing with various durations
3. Deploy to staging for validation

### Step 2: Private Driver Logic (Same Day - 2 hours)
1. Align private driver city selection logic
2. Test airport transfer and intercity pricing
3. Validate against frontend calculations

### Step 3: Add-ons Validation (Next Day - 1 hour)
1. Implement safer add-ons validation
2. Add security logging
3. Test with valid and invalid addon scenarios

### Step 4: Architecture Improvement (Within Week - 4 hours)
1. Extract pricing logic to shared service
2. Update both BookingController and BookingValidationService
3. Add comprehensive unit tests

## Testing Strategy

### Unit Tests Required
```php
// Test boat rental pricing
public function test_boat_rental_flat_rates()
{
    // Test that 3-hour booking uses full half-day rate
    // Test that 6-hour booking uses full full-day rate
}

// Test private driver city selection
public function test_private_driver_city_selection()
{
    // Test airport transfer with/without dropoff city
    // Test intercity pricing lookup
}

// Test add-ons validation
public function test_addons_belong_to_listing()
{
    // Test valid addons are included
    // Test invalid addons are rejected
}
```

### Integration Tests Required
```php
// Test frontend vs backend price matching
public function test_price_consistency_across_categories()
{
    // Compare frontend bookingHelpers.js calculations
    // With backend calculateAdvancedPrice results
}
```

## Monitoring and Validation

### Add Price Mismatch Logging
```php
// In BookingValidationService
if (abs($calculatedTotal - $providedTotal) > 0.01) {
    \Log::warning('Price mismatch detected', [
        'listing_id' => $listing->id,
        'category_id' => $listing->category_id,
        'frontend_price' => $providedTotal,
        'backend_price' => $calculatedTotal,
        'difference' => abs($calculatedTotal - $providedTotal)
    ]);
}
```

## Risk Assessment

**High Risk Areas:**
- Boat rental bookings (immediate revenue impact)
- Private driver route pricing (customer confusion)
- Add-ons security (potential exploitation)

**Medium Risk Areas:**
- Car rental calculations (mostly correct)
- Activity pricing (mostly correct)

**Timeline:**
- **Critical fixes:** Within 24 hours
- **Testing and validation:** Within 48 hours
- **Architecture improvements:** Within 1 week

This document provides the exact code changes required to align backend pricing calculations with the correct frontend implementation.