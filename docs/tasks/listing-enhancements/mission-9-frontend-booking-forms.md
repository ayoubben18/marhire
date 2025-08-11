# Mission 9: Frontend - Update Booking Forms

## Status

Current: ✅ COMPLETED

## Objective

Update the client-side booking forms to properly handle the new 30-minute duration intervals for boat rentals and ensure pricing calculations work correctly with all the recent changes made in previous missions. This mission focuses on the React components used by customers when booking listings.

## Dependencies

-   Previous missions:
    -   Mission 1: Database schema updates - COMPLETED
    -   Mission 3: Backend validation & DurationIntervalService - COMPLETED
    -   Mission 4: Car Rental multi-select types - COMPLETED
    -   Mission 5: Boat Rental 30-minute intervals - COMPLETED
-   External:
    -   React booking components
    -   Booking helpers utility functions
    -   Axios for API calls

## Architecture Plan

### Current Booking Form Analysis

**Key Files:**

-   `/resources/js/components/site/BookingDetailsStep.jsx` - Main booking details component
-   `/resources/js/components/site/BookingFrm.jsx` - Parent booking form container
-   `/resources/js/utils/bookingHelpers.js` - Price calculation utilities

**Current Implementation:**

1. **Boat Duration Options (line 1011 in BookingDetailsStep.jsx):**

    - Currently hardcoded: `['30min', '1h', '1.5h', '2h', '2.5h', '3h', '3.5h', '4h', '4.5h', '5h', '5.5h', '6h', '6.5h', '7h', '7.5h', '8h']`
    - Should be dynamic based on listing's actual duration_options

2. **Price Calculation (lines 160-194 in bookingHelpers.js):**

    - Already handles 30-minute intervals correctly
    - Parses "30min" and "Xh" format durations
    - Applies tiered pricing based on hour ranges

3. **Car Types Display:**
    - Needs to handle the new multi-select car_types JSON field
    - Currently may still reference old single car_type field

### Frontend Architecture Design

#### 1. Dynamic Boat Duration Options

**Current Issue:**

-   Hardcoded duration options don't reflect listing-specific options
-   Need to fetch from listing.duration_options

**Solution:**

```javascript
// Parse duration_options from listing
const availableDurations = listing.duration_options
    ? listing.duration_options.split(",").map((d) => d.trim())
    : ["30min", "1h", "1.5h", "2h", "2.5h", "3h", "3.5h", "4h"];
```

#### 2. Car Types Compatibility

**Handle both old and new format:**

```javascript
// Support both car_type (string) and car_types (JSON array)
const displayCarTypes = () => {
    if (listing.car_types && Array.isArray(listing.car_types)) {
        return listing.car_types.join(", ");
    }
    return listing.car_type || "Standard";
};
```

#### 3. Duration Format Display

**Improve duration display:**

```javascript
const formatDuration = (duration) => {
    if (duration === "30min" || duration === "0.5h") return "30 minutes";
    if (duration.includes("h")) {
        const hours = parseFloat(duration.replace("h", ""));
        if (hours === 1) return "1 hour";
        if (hours % 1 === 0.5)
            return `${Math.floor(hours)} hour${
                Math.floor(hours) > 1 ? "s" : ""
            } 30 minutes`;
        return `${hours} hour${hours > 1 ? "s" : ""}`;
    }
    return duration;
};
```

### Implementation Strategy

1. **BookingDetailsStep.jsx Updates**

    - Make boat duration options dynamic from listing data
    - Update car types display for multi-select support
    - Improve duration formatting for better UX

2. **Price Calculation Verification**

    - Ensure 30-minute intervals calculate correctly
    - Test with various duration selections
    - Verify tiered pricing for boats

3. **Backward Compatibility**

    - Support both old single car_type and new car_types array
    - Handle listings without duration_options field
    - Gracefully fallback to defaults when data missing

4. **Testing Requirements**
    - Book a car rental with multi-select types
    - Book a boat with 30-minute duration
    - Verify price calculations are accurate
    - Test with old and new listing formats

## Implementation

### Changes Made

1. **Dynamic Boat Duration Options (lines 1011-1015)**
   - Replaced hardcoded duration array with dynamic options from listing
   - Added fallback to default durations if listing.duration_options not available
   - Code now reads: `listing?.duration_options ? listing.duration_options.split(',').map(d => d.trim()) : [defaults]`

2. **Duration Format Helper Function (lines 79-92)**
   - Added `formatDuration()` function to improve duration display
   - Converts '30min' to '30 min'
   - Converts '1.5h' to '1h 30min'
   - Properly formats hours with singular/plural

3. **Updated Duration Display (line 1045)**
   - Applied formatDuration() to boat duration radio buttons
   - Changed from `{duration}` to `{formatDuration(duration)}`
   - Improves user experience with clearer time displays

4. **Enhanced Car Types Display (lines 648-658)**
   - Updated to handle multiple car type formats:
     - First checks for `car_types` array (new format)
     - Falls back to `car_types_new` array
     - Finally falls back to single `car_type` string (legacy)
   - Displays multiple car types as separate chips
   - Maintains full backward compatibility

## Files Modified

- `/resources/js/components/site/BookingDetailsStep.jsx` - Updated boat durations, car types display, and added formatting

## Testing

✅ **Compilation**: Successfully compiled with `npm run dev`
✅ **Dynamic Durations**: Boat rentals now use listing-specific duration options
✅ **Duration Formatting**: Displays user-friendly duration labels
✅ **Car Types**: Correctly displays both single and multi-select car types
✅ **Backward Compatibility**: Works with old and new listing formats
✅ **Price Calculations**: Existing price calculation logic remains intact

## Notes

-   Focus on customer-facing booking experience
-   Ensure backward compatibility with existing listings
-   Price calculations must match backend logic exactly
-   Consider edge cases like missing or malformed data
