# UnifiedListings Component - Data Structure Documentation

## API Endpoint
`GET /api/get_filtered_listings`

## Request Parameters
- `categories` - Single category ID or comma-separated list (2,3,4,5)
- `category_id` - Single category ID (alternative to categories)
- `subcategory_ids` - Comma-separated list of subcategory IDs
- `cities` - Single city name or comma-separated list
- `city` - Single city name (alternative to cities)
- `agency_ids` - Comma-separated list of agency/provider IDs
- `page` - Page number (default: 1)
- `per_page` - Items per page (default: 8)
- `locale` - Locale for translations (default: en)

## Response Structure
```json
{
  "success": true,
  "listings": {
    "data": [...], // Array of listing objects
    "current_page": 1,
    "per_page": 8,
    "total": 100,
    "last_page": 13
  },
  "total": 100,
  "per_page": 8,
  "current_page": 1,
  "last_page": 13,
  "has_more": true
}
```

## Common Fields (All Listing Types)
```json
{
  "id": 123,
  "slug": "luxury-car-rental-agadir",
  "title": "Luxury Car Rental",
  "category_id": 2,
  "galleries": [
    {
      "id": 1,
      "file_path": "uploads/listings/image.webp",
      "file_name": "image.webp"
    }
  ],
  "city": {
    "id": 1,
    "city_name": "Agadir"
  },
  "provider": {
    "id": 1,
    "agency_name": "Premium Rentals",
    "logo": "uploads/agencies/logo.png"
  },
  "translated_fields": {
    "title": {
      "en": "Luxury Car Rental",
      "fr": "Location de Voiture de Luxe",
      "ar": "تأجير سيارة فاخرة"
    },
    "description": {
      "en": "Description in English",
      "fr": "Description en français"
    }
  },
  "deposit_required": true,
  "deposit_amount": 500,
  "special_notes": "Special terms and conditions",
  "short_description": "Brief description",
  "description": "Full detailed description"
}
```

## Category-Specific Fields

### Car Rentals (category_id: 2)
```json
{
  ...common_fields,
  "price_per_day": 50,
  "price_per_week": 300,
  "price_per_month": 1000,
  "car_model": 1, // ID reference to car model
  "car_type": 2, // ID reference to car type (SUV, Sedan, etc.)
  "year": 2023,
  "fuel_type": "Diesel",
  "transmission": "Automatic",
  "seats": 5,
  "doors": 4,
  "ac": true,
  "mileage_policy": "Unlimited",
  "fuel_policy": "Full to Full"
}
```

### Private Drivers (category_id: 3)
```json
{
  ...common_fields,
  "price_per_hour": 20,
  "price_per_day": 150,
  "vehicule_type": 1, // ID reference to vehicle type
  "vehicule_model": 2, // ID reference to vehicle model
  "languages_spoken": "English, French, Arabic",
  "max_passengers": 4,
  "max_luggage": 3,
  "pickup_location": "Airport, Hotel, City Center",
  "pricings": [
    {
      "id": 1,
      "listing_id": 123,
      "airport_one": 30,
      "airport_round": 50,
      "city_day": 100,
      "city_half": 60,
      "droppoff_location": "Marrakech",
      "droppoff_price": 200
    }
  ]
}
```

### Boat Rentals (category_id: 4)
```json
{
  ...common_fields,
  "price_per_hour": 100,
  "price_per_half_day": 400,
  "price_per_day": 700,
  "boat_type": 1, // ID reference to boat type
  "with_captain": true,
  "capacity": 8,
  "departure_location": "Marina Agadir"
}
```

### Activities (category_id: 5)
```json
{
  ...common_fields,
  "price_per_person": 25,
  "price_per_group": 150,
  "activity_type": 1, // ID reference to activity type
  "duration_options": "2 hours",
  "schedule_options": "Morning, Afternoon, Evening",
  "meeting_point": "Hotel lobby or designated location",
  "pickup": true,
  "private_or_group": "Both",
  "group_size_min": 2,
  "group_size_max": 10,
  "difficulty": "Moderate",
  "act_pricings": [
    {
      "id": 1,
      "listing_id": 123,
      "price": 25,
      "price_type": "per_person",
      "min_persons": 2,
      "max_persons": 10
    }
  ]
}
```

## Usage Examples

### Fetch all car rentals in Agadir
```javascript
const listings = UnifiedListings({
  categories: 2,
  cities: "Agadir",
  perPage: 10
});
```

### Fetch boats and activities from multiple cities
```javascript
const listings = UnifiedListings({
  categories: [4, 5],
  cities: ["Agadir", "Marrakech", "Casablanca"],
  perPage: 12
});
```

### Fetch specific agency listings
```javascript
const listings = UnifiedListings({
  agencies: [1, 2, 3],
  perPage: 20
});
```

### Access translated fields
```javascript
const listing = listings[0];
const title = listing.translated_fields?.title?.[currentLocale] || listing.title;
const description = listing.translated_fields?.description?.[currentLocale] || listing.description;
```

## Helper Methods

The UnifiedListings component provides helper methods:

- `getTranslatedField(listing, field)` - Get translated field with fallback
- `getListingType(categoryId)` - Get listing type string ('car', 'driver', 'boat', 'activity')
- `reload()` - Manually trigger data reload

## Notes

1. All price fields are in Euros (€)
2. Translation fallback order: requested locale → English → direct field
3. The `subcategory_ids` filter maps to different fields based on category:
   - Cars: `car_type`
   - Drivers: `vehicule_type`
   - Boats: `boat_type`
   - Activities: `activity_type`
4. Images in galleries array should be prefixed with `/` if not already absolute URLs
5. The `deposit_required` field is a boolean (may come as "Yes"/"No" string from older data)