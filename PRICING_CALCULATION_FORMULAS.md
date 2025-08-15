# PRICING CALCULATION FORMULAS - DEFINITIVE REFERENCE

**Source of Truth:** `resources/js/utils/bookingHelpers.js`  
**Status:** CORRECT IMPLEMENTATION - Use as reference for backend alignment  
**Last Updated:** 2025-01-15

## Overview

This document contains the definitive, correct pricing calculation formulas used in the MarHire booking platform. These formulas are implemented in the frontend and must be exactly replicated in the backend to ensure pricing consistency.

## Category 1: Car Rental (category_id: 2)

### Base Price Calculation

```javascript
// Calculate exact hours between pickup and dropoff
const start = new Date(`${startDate} ${pickupTime || '10:00'}`);
const end = new Date(`${endDate} ${dropoffTime || '10:00'}`);
const totalMinutes = (end - start) / (1000 * 60);

// Every 24h (1440 minutes) = 1 day, any excess = +1 day
const days = Math.ceil(totalMinutes / 1440);

// Apply tiered pricing
let pricePerDay;
if (days < 7) {
    // Daily rate for less than 7 days
    pricePerDay = listing.price_per_day || basePrice;
    totalPrice = pricePerDay * days;
} else if (days < 30) {
    // Weekly rate for 7-29 days
    pricePerDay = (listing.price_per_week || listing.price_per_day * 7) / 7;
    totalPrice = pricePerDay * days;
} else {
    // Monthly rate for 30+ days
    pricePerDay = (listing.price_per_month || listing.price_per_day * 30) / 30;
    totalPrice = pricePerDay * days;
}
```

### Add-ons Calculation

```javascript
// Add selected add-ons to the total price
if (selectedAddons && Array.isArray(selectedAddons) && listing?.addons?.length > 0) {
    const addonsPrice = selectedAddons.reduce((total, addonId) => {
        const addon = listing.addons.find(item => item?.addon?.id === addonId);
        return total + (addon?.addon?.price ? parseFloat(addon.addon.price) : 0);
    }, 0);
    totalPrice += addonsPrice;
}
```

### Final Calculation

```javascript
return Math.round(totalPrice * 100) / 100; // Round to 2 decimal places
```

## Category 2: Private Driver (category_id: 3)

### Service and Road Type Logic

```javascript
const serviceTypes = ['airport_transfer', 'intercity']; // Array of selected services
const roadTypes = ['one_way', 'road_trip'];            // Array of selected road types
const isRoundTrip = roadTypes?.includes('road_trip');
```

### Pricing Lookup Logic

```javascript
let driverPrice = 0;

// Use the pricings structure (from private_listing_pricings table)
if (listing?.pricings?.length > 0) {
    let pricing = null;
    
    if (serviceTypes.includes('airport_transfer')) {
        // For airport transfer:
        // - If dropoff city is selected, use that city's row
        // - Otherwise, use the listing's city row (same city transfer)
        const cityToFind = dropoffCity || listing?.city_id;
        pricing = listing.pricings.find(p => p?.city_id == cityToFind);
        
        if (pricing) {
            // Use airport prices if available, otherwise use intercity prices
            // (some cities might have their airport transfer prices stored as intercity)
            if (isRoundTrip) {
                driverPrice = parseFloat(pricing.airport_round || pricing.intercity_round) || 0;
            } else {
                driverPrice = parseFloat(pricing.airport_one || pricing.intercity_one) || 0;
            }
        }
    } else if (serviceTypes.includes('intercity')) {
        // For intercity, use the dropoff city's row
        pricing = listing.pricings.find(p => p?.city_id == dropoffCity);
        
        if (pricing) {
            if (isRoundTrip) {
                driverPrice = parseFloat(pricing.intercity_round) || 0;
            } else {
                driverPrice = parseFloat(pricing.intercity_one) || 0;
            }
        }
    }
}
```

### Add-ons Calculation (Same as Car Rental)

```javascript
// Add selected add-ons to the total price
if (selectedAddons && Array.isArray(selectedAddons) && listing?.addons?.length > 0) {
    const addonsPrice = selectedAddons.reduce((total, addonId) => {
        const addon = listing.addons.find(item => item?.addon?.id === addonId);
        return total + (addon?.addon?.price ? parseFloat(addon.addon.price) : 0);
    }, 0);
    driverTotalPrice += addonsPrice;
}
```

### Final Calculation

```javascript
return Math.round(driverTotalPrice * 100) / 100;
```

## Category 3: Boat Rental (category_id: 4)

### Duration Parsing

```javascript
let hours = 1;
if (boatDuration) {
    if (typeof boatDuration === 'string') {
        if (boatDuration.includes('min')) {
            const minutes = parseFloat(boatDuration.replace('min', ''));
            hours = minutes / 60;
        } else if (boatDuration.includes('h')) {
            hours = parseFloat(boatDuration.replace('h', ''));
        } else {
            // Handle plain numbers like "3" or "5.5"
            hours = parseFloat(boatDuration);
        }
    } else if (typeof boatDuration === 'number') {
        hours = boatDuration;
    }
}
```

### Tiered Pricing Logic ⚠️ CRITICAL

```javascript
// Apply exact hour range pricing as backend
let price = 0;
if (hours >= 0.5 && hours <= 1.5) {
    // 30min to 1.5 hours: price_per_hour * hours
    price = (listing.price_per_hour || basePrice) * hours;
} else if (hours >= 2 && hours <= 4) {
    // 2 to 4 hours: use flat half-day rate (NO FRACTIONAL MULTIPLIER)
    price = listing.price_per_half_day || listing.price_per_hour * 4;
} else if (hours >= 4.5 && hours <= 8) {
    // 4.5 to 8 hours: use flat full-day rate (NO FRACTIONAL MULTIPLIER)
    price = listing.price_per_day || listing.price_per_hour * 8;
} else {
    // Invalid duration - use hourly rate as fallback
    price = (listing.price_per_hour || basePrice) * hours;
}
```

**⚠️ CRITICAL NOTE:** The backend incorrectly uses fractional multipliers:
- WRONG: `price = listing.price_per_half_day * (hours / 4)`
- CORRECT: `price = listing.price_per_half_day` (flat rate)

### Add-ons Calculation (Same Pattern)

```javascript
// Add selected add-ons to the total price
if (selectedAddons && Array.isArray(selectedAddons) && listing?.addons?.length > 0) {
    const addonsPrice = selectedAddons.reduce((total, addonId) => {
        const addon = listing.addons.find(item => item?.addon?.id === addonId);
        return total + (addon?.addon?.price ? parseFloat(addon.addon.price) : 0);
    }, 0);
    price += addonsPrice;
}
```

### Final Calculation

```javascript
return Math.round(price * 100) / 100;
```

## Category 4: Activities/Things to Do (category_id: 5)

### Base Price Calculation

```javascript
const people = parseInt(numberOfPeople) || 1;
let activityPrice = 0;

// Activities use act_pricings (snake_case from Laravel API)
const activityPricings = listing?.act_pricings || listing?.actPricings || [];

if (selectedDurationOption && activityPricings.length > 0) {
    const selectedOption = activityPricings.find(opt => opt?.id == selectedDurationOption);
    if (selectedOption?.price) {
        const optionPrice = parseFloat(selectedOption.price);
        // Check activity type (private vs group)
        if (listing?.private_or_group?.toLowerCase() === 'group') {
            // Group activities: Fixed price for the whole group
            activityPrice = optionPrice;
        } else {
            // Private activities: Price per person
            activityPrice = optionPrice * people;
        }
    }
} else if (!selectedDurationOption) {
    // If no option selected for activities, start with 0
    activityPrice = 0;
} else {
    // Final fallback: base price × number of people
    activityPrice = people * basePrice;
}
```

### Add-ons Calculation (Person-Aware)

```javascript
// Add selected add-ons to the total price
if (selectedAddons && Array.isArray(selectedAddons) && listing?.addons?.length > 0) {
    const addonsPrice = selectedAddons.reduce((total, addonId) => {
        const addon = listing.addons.find(item => item?.addon?.id === addonId);
        const addonBasePrice = addon?.addon?.price ? parseFloat(addon.addon.price) : 0;
        // For private activities, multiply addon price by number of people
        if (listing?.private_or_group?.toLowerCase() === 'private') {
            return total + (addonBasePrice * people);
        }
        // For group activities, addon price is fixed
        return total + addonBasePrice;
    }, 0);
    activityPrice += addonsPrice;
}
```

### Final Calculation

```javascript
return Math.round(activityPrice * 100) / 100;
```

## Common Add-ons Calculation Pattern

All categories use this pattern for add-ons, with variations for person multiplication:

```javascript
const calculateAddonsTotal = (selectedAddons, listing, numberOfPeople = 1) => {
    if (!Array.isArray(selectedAddons) || !listing?.addons?.length) return 0;
    
    return selectedAddons.reduce((total, addonId) => {
        const addon = listing.addons.find(item => item?.addon?.id === addonId);
        const addonBasePrice = addon?.addon?.price ? parseFloat(addon.addon.price) : 0;
        
        // For private activities (category 5), multiply addon price by number of people
        if (listing?.category_id === 5 && listing?.private_or_group?.toLowerCase() === 'private') {
            return total + (addonBasePrice * numberOfPeople);
        }
        
        // For other categories or group activities, addon price is fixed
        return total + addonBasePrice;
    }, 0);
};
```

## Data Relationships and Fields

### Required Database Fields

**listings table:**
- `price_per_hour` - Hourly rate (boats, fallback)
- `price_per_half_day` - Half-day flat rate (boats)
- `price_per_day` - Daily rate (cars, boats)
- `price_per_week` - Weekly rate (cars)
- `price_per_month` - Monthly rate (cars)
- `private_or_group` - Activity pricing type
- `category_id` - Category identifier

**private_listing_pricings table:**
- `listing_id` - FK to listings
- `city_id` - Destination city
- `airport_one` - One-way airport transfer price
- `airport_round` - Round-trip airport transfer price
- `intercity_one` - One-way intercity price
- `intercity_round` - Round-trip intercity price

**act_pricings table:**
- `listing_id` - FK to listings
- `element` - Option name/description
- `price` - Option price

**listing_addons table (pivot):**
- `listing_id` - FK to listings
- `addon_id` - FK to addons
- `price` - Addon price for this listing

## Implementation Notes

1. **Rounding:** Always round final price to 2 decimal places
2. **Fallbacks:** Use sensible defaults when pricing data is missing
3. **Validation:** Ensure add-ons belong to the listing before including in calculations
4. **Type Safety:** Parse string numbers to float/int as needed
5. **Array Handling:** Always check if arrays exist and have length before processing

## Backend Alignment Requirements

To fix the backend inconsistencies:

1. **Boat Rental Fix:** Remove fractional multipliers, use flat rates
2. **Private Driver Fix:** Match city selection logic exactly
3. **Add-ons Fix:** Validate listing relationship before calculating
4. **Architecture:** Consider extracting to shared service/utility class

This document serves as the definitive reference for all pricing calculations in the MarHire platform.