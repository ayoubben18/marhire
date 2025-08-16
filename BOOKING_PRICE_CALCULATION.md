# MarHire Booking Price Calculation Documentation

## Overview
This document describes the server-side total price calculation logic for bookings in the MarHire application. The pricing calculation is centralized in the `PricingService` class and is used throughout the application to ensure consistency.

## Key Files
- **Main Pricing Service**: `app/Services/PricingService.php`
- **Booking Validation Service**: `app/Services/BookingValidationService.php`
- **Booking Controller**: `app/Http/Controllers/BookingController.php`

## Price Components

### Total Price Formula
```
Total Price = Base Price + Addons Total + Discount/Extra Charge
```

### 1. Base Price
Base price varies by category and is calculated using the `PricingService::calculateBasePrice()` method.

### 2. Addons Total
Addons are validated to ensure they belong to the listing and calculated using `PricingService::calculateAddonsTotal()`.

### 3. Discount/Extra Charge
Applied if provided in the request as `discount_or_extra` field.

## Category-Specific Price Calculations

### Category 2: Car Rental
**Method**: `PricingService::calculateCarRentalPrice()`

#### Calculation Logic:
1. Parse pickup and dropoff dates/times
2. Calculate total minutes between dates
3. Convert to days: `days = ceil(totalMinutes / 1440)`
4. Apply tiered pricing:
   - **< 7 days**: Use `price_per_day`
   - **7-29 days**: Use `price_per_week / 7` (or fallback to `price_per_day * 7 / 7`)
   - **≥ 30 days**: Use `price_per_month / 30` (or fallback to `price_per_day * 30 / 30`)

#### Example Code:
```php
$start = Carbon::parse("$startDate $pickupTime");
$end = Carbon::parse("$endDate $dropoffTime");
$totalMinutes = $end->diffInMinutes($start);
$days = ceil($totalMinutes / 1440);

if ($days < 7) {
    $pricePerDay = $listing->price_per_day ?: 0;
    $totalPrice = $pricePerDay * $days;
} elseif ($days < 30) {
    $pricePerDay = ($listing->price_per_week ?: $listing->price_per_day * 7) / 7;
    $totalPrice = $pricePerDay * $days;
} else {
    $pricePerDay = ($listing->price_per_month ?: $listing->price_per_day * 30) / 30;
    $totalPrice = $pricePerDay * $days;
}
```

### Category 3: Private Driver
**Method**: `PricingService::calculatePrivateDriverPrice()`

#### Calculation Logic:
1. Determine service type (airport_transfer or intercity)
2. Determine road type (one_way or round_trip)
3. Find the appropriate pricing row based on city
4. Select the correct price column

#### Price Column Selection:
- **Airport Transfer**:
  - Round Trip: Use `airport_round` (fallback to `intercity_round`)
  - One Way: Use `airport_one` (fallback to `intercity_one`)
- **Intercity**:
  - Round Trip: Use `intercity_round`
  - One Way: Use `intercity_one`

#### City Selection Logic:
- **Airport Transfer**: Use dropoff city if specified, otherwise listing city
- **Intercity**: Use the dropoff city

#### Example Code:
```php
if ($isAirportTransfer) {
    $cityToFind = $dropoffCity ?: $listing->city_id;
    $pricing = $listing->pricings()
        ->where('city_id', $cityToFind)
        ->first();
        
    if ($pricing) {
        if ($isRoundTrip) {
            $driverPrice = floatval($pricing->airport_round ?: $pricing->intercity_round);
        } else {
            $driverPrice = floatval($pricing->airport_one ?: $pricing->intercity_one);
        }
    }
} elseif ($isIntercity) {
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
```

### Category 4: Boat Rental
**Method**: `PricingService::calculateBoatRentalPrice()`

#### Calculation Logic:
Based on duration (in hours), apply FLAT rates:

1. **0.5 - 1.5 hours**: `price_per_hour * hours`
2. **2 - 4 hours**: FLAT `price_per_half_day` (or fallback to `price_per_hour * 4`)
3. **4.5 - 8 hours**: FLAT `price_per_day` (or fallback to `price_per_hour * 8`)
4. **Other durations**: `price_per_hour * hours` (fallback)

**Important**: Half-day and full-day rates are FLAT rates, not multiplied by hours.

#### Example Code:
```php
$hours = floatval($request->duration);

if ($hours >= 0.5 && $hours <= 1.5) {
    $price = ($listing->price_per_hour ?: 0) * $hours;
} elseif ($hours >= 2 && $hours <= 4) {
    // FLAT half-day rate
    $price = $listing->price_per_half_day ?: $listing->price_per_hour * 4;
} elseif ($hours >= 4.5 && $hours <= 8) {
    // FLAT full-day rate
    $price = $listing->price_per_day ?: $listing->price_per_hour * 8;
} else {
    $price = ($listing->price_per_hour ?: 0) * $hours;
}
```

### Category 5: Activities/Things to Do
**Method**: `PricingService::calculateActivityPrice()`

#### Calculation Logic:
1. Get selected duration option from `actPricings` table
2. Check if activity is private or group
3. Calculate based on type:
   - **Group**: Fixed price for the whole group
   - **Private**: Price per person

#### Example Code:
```php
$people = intval($request->input('number_of_people', 1));
$selectedDurationOption = $request->input('pricing_option_id');

if ($selectedDurationOption) {
    $selectedOption = $listing->actPricings()->find($selectedDurationOption);
    
    if ($selectedOption) {
        $optionPrice = floatval($selectedOption->price);
        
        if (strtolower($listing->private_or_group) === 'group') {
            // Group: Fixed price
            $activityPrice = $optionPrice;
        } else {
            // Private: Price per person
            $activityPrice = $optionPrice * $people;
        }
    }
}
```

## Add-ons Calculation
**Method**: `PricingService::calculateAddonsTotal()`

### Validation Process:
1. Get addon IDs from request
2. Validate addons belong to the listing (through pivot table)
3. Filter out invalid addons
4. Calculate total from valid addons only

### Pricing Logic:
- **Category 5 Private Activities**: Multiply addon price by number of people
- **All other categories/Group activities**: Fixed addon price

### Security Features:
- Invalid addons are logged for monitoring
- Only addons that belong to the listing are calculated
- Price mismatches are logged

### Example Code:
```php
// Get valid addon IDs for this listing
$validAddonIds = $listing->addons()->pluck('addon_id')->toArray();

// Filter to only include valid addons
$validSelectedAddons = array_intersect($addonIds, $validAddonIds);

// Calculate total
$addonsBaseTotal = ListingAddon::whereIn('id', $validSelectedAddons)->sum('price');

// For private activities, multiply by number of people
if ($listing->category_id == 5 && strtolower($listing->private_or_group) === 'private') {
    $numberOfPeople = $request->input('number_of_people', 1);
    $addonsTotal = $addonsBaseTotal * $numberOfPeople;
} else {
    $addonsTotal = $addonsBaseTotal;
}

// Log invalid addons for security
$invalidAddons = array_diff($addonIds, $validSelectedAddons);
if (!empty($invalidAddons)) {
    \Log::warning('Invalid addons attempted', [...]);
}
```

## Booking Flow Integration

### 1. Form Submission (`BookingController::submitBooking`)
When a booking form is submitted:

```php
// Validate booking data
$validationResult = $validationService->validateBookingData($request);
$listing = $validationResult['listing'];
$pricingData = $validationResult['pricing'];

// Create booking with server-calculated prices
$bookingFields = [
    'booking_price' => $pricingData['booking_price'],
    'total_addons' => $pricingData['total_addons'],
    'total_price' => $pricingData['total_price'],
    'discount_or_extra' => $request->discount_or_extra ?? 0,
    // ... other fields
];

$booking = Booking::create($bookingFields);
```

### 2. Price Validation (`BookingValidationService::calculateAndValidatePricing`)
The validation service ensures price consistency:

```php
// Calculate prices server-side
$basePrice = $this->calculateBasePrice($request, $listing);
$addonsTotal = // ... calculate addons

$calculatedTotal = $basePrice + $addonsTotal;

// Check if frontend price matches (with tolerance)
if ($request->has('total_price')) {
    $providedTotal = (float) $request->total_price;
    
    if (abs($calculatedTotal - $providedTotal) > 0.01) {
        // Log mismatch for security
        \Log::warning('Price mismatch detected', [...]);
    }
}

// Always use server-calculated price
return [
    'booking_price' => round($basePrice, 2),
    'total_addons' => round($addonsTotal, 2),
    'total_price' => round($calculatedTotal, 2)
];
```

### 3. Price Calculation API (`BookingController::calculatePrice`)
Public endpoint for price calculation:

```php
public function calculatePrice(Request $request)
{
    $listing = Listing::findOrFail($request->listing_id);
    
    // Calculate base price
    $priceCalculation = $this->calculateAdvancedPrice($listing, $request);
    
    // Calculate addons
    $totalAddons = 0;
    if ($request->has('addon_ids')) {
        // Validate and calculate addon prices
    }
    
    return response()->json([
        'success' => true,
        'data' => [
            'base_price' => round($priceCalculation['base_price'], 2),
            'total_addons' => round($totalAddons, 2),
            'total' => round($priceCalculation['base_price'] + $totalAddons, 2),
            'currency' => '€'
        ]
    ]);
}
```

## Security Considerations

### 1. Price Validation
- Frontend prices are never trusted
- Server always recalculates prices
- Price mismatches are logged for monitoring

### 2. Addon Validation
- Only addons belonging to the listing are accepted
- Invalid addon attempts are logged
- Prices are fetched from database, not request

### 3. Logging
The system logs:
- Price mismatches between frontend and backend
- Invalid addon attempts
- All pricing calculations for audit trail

### Example Security Log:
```php
\Log::warning('Price mismatch detected', [
    'listing_id' => $listing->id,
    'category_id' => $listing->category_id,
    'frontend_price' => $frontendPrice,
    'backend_price' => $backendPrice,
    'difference' => abs($frontendPrice - $backendPrice),
    'percentage_diff' => // ... calculate percentage
    'request_data' => $request->all(),
    'ip' => $request->ip()
]);
```

## Database Considerations

### Important Tables:
- `listings`: Main listing information with base prices
- `driver_pricings`: City-based pricing for private drivers
- `listing_addons`: Available addons with prices
- `listing_addon_affecteds`: Pivot table linking listings to addons
- `custom_booking_options`: Activity duration options with prices
- `bookings`: Stores final calculated prices

### Key Fields:
- `booking_price`: Base price without addons
- `total_addons`: Sum of all addon prices
- `total_price`: Final price (base + addons)
- `discount_or_extra`: Additional charges or discounts
- `droppoff_location`: Note the typo in database column (not dropoff)

## Testing Price Calculations

To test price calculations:

1. **Unit Tests**: Test each category's price calculation method
2. **Integration Tests**: Test full booking flow with price validation
3. **Manual Testing**: Compare frontend and backend calculations

### Example Test Case:
```php
// Car rental for 3 days
$request = new Request([
    'category_id' => 2,
    'listing_id' => 1,
    'pickup_date' => '2024-01-01',
    'pickup_time' => '10:00',
    'dropoff_date' => '2024-01-04',
    'dropoff_time' => '10:00',
    'addons' => [1, 2]
]);

$listing = Listing::find(1);
$pricingService = app(PricingService::class);
$result = $pricingService->calculateTotalPrice($listing, $request);

// Assert prices
$this->assertEquals(300, $result['base_price']); // 100/day * 3 days
$this->assertEquals(50, $result['addons_total']); // Sum of addon prices
$this->assertEquals(350, $result['total_price']); // 300 + 50
```

## Important Notes

1. **Always use server-side calculations** for final prices
2. **Frontend prices** are for display only and should not be trusted
3. **Log all price mismatches** for security monitoring
4. **Validate all addons** belong to the listing
5. **Round prices to 2 decimal places** to avoid floating-point issues
6. **Use PricingService** for consistency across the application