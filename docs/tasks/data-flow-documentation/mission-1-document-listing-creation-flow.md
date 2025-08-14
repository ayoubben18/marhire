# Mission 1: Document Listing Creation Flow from Admin Dashboard to Database

## Status
Current: Completed

## Objective
Document the complete data flow for listing creation from the admin dashboard (Blade templates) through the backend controllers to the database tables, capturing all field mappings and transformations.

## Dependencies
- Previous missions: None (first mission)
- External: Laravel framework, MySQL database

## Scope
- Admin listing creation form (`resources/views/listings/add.blade.php`)
- Listing controller (`app/Http/Controllers/ListingController.php`)
- Listing model and relationships (`app/Models/Listing.php`)
- Related tables: listings, listing_galleries, listing_pricings, listing_addons, listing_translations
- All 4 categories: Car rental, Private driver, Boat rental, Activities

## Architecture Plan

### Data Flow Overview

1. **Admin Form** (`resources/views/listings/add.blade.php`) → 
2. **Controller Processing** (`ListingController::insert()`) → 
3. **Database Storage** (Multiple tables)

### Form Structure Analysis

The form uses a 3-step wizard:
- Step 1: Information (category-specific fields)
- Step 2: Pricing 
- Step 3: Galleries (image uploads)

### Category-Specific Field Analysis

#### Universal Fields (All Categories)
- **Basic Info**: `title`, `category_id`, `city_id`, `provider_id`
- **SEO**: `meta_title`, `meta_description`, `schema_markup`, `slug`
- **Content**: `description`, `short_description`, `dealer_note`, `special_notes`
- **Pricing**: `price_per_hour`, `price_per_half_day`, `price_per_day`, `price_per_week`, `price_per_month`

#### Car Rental (Category ID: 2)
**Form Fields**:
- `car_types[]` (multi-select checkboxes) → `car_types_new` (JSON)
- `car_model` (select) → `car_model` (integer)
- `year` (select 2016-current) → `year` (integer)
- `fuel_type` (select: Petrol, Diesel, Hybrid, Electric) → `fuel_type` (string)
- `transmission` (select: Manual, Automatic) → `transmission` (string)
- `seats` (select: 2-9+) → `seats` (integer)
- `doors` (select: 2, 4, 5) → `doors` (integer)
- `ac` (select: Yes, No) → `ac` (string)
- `mileage_policy` (select: multiple options) → `mileage_policy` (string)
- `fuel_policy` (select: Full to Full, Same to Same, Prepaid Fuel) → `fuel_policy` (string)
- `driver_requirement` (select: 21-70 years, 26-70 years) → `driver_requirement` (string)
- `deposit_required` (select: yes, no) → `deposit_required` (string)
- `deposit_amount` (number) → `deposit_amount` (float)
- `deposit_note` (text) → `deposit_note` (string)

#### Private Driver (Category ID: 3)
**Form Fields**:
- `vehicule_type` (select) → `vehicule_type` (integer)
- `vehicule_model` (select) → `vehicule_model` (integer)
- `max_passengers` (number) → `max_passengers` (integer)
- `max_luggage` (number) → `max_luggage` (integer)
- `pickup_location` (text) → `pickup_location` (string)
- `languages_spoken[]` (multi-select) → `languages_spoken` (comma-separated string)
- `service_type` (select) → `service_type` (integer)

#### Boat Rental (Category ID: 4)
**Form Fields**:
- `boat_type` (select) → `boat_type` (integer)
- `with_captain` (select: yes, no) → `with_captain` (string)
- `capacity` (number) → `capacity` (integer)
- `departure_location` (text) → `departure_location` (string)
- `duration_options[]` (multi-select) → `duration_options` (comma-separated string)
- Optional: `deposit_required`, `deposit_currency`

#### Activities (Category ID: 5)
**Form Fields**:
- `activity_type` (select) → `activity_type` (integer)
- `pickup` (select: yes, no) → `pickup` (string)
- `meeting_point` (text) → `meeting_point` (string)
- `private_or_group` (select) → `private_or_group` (string)
- `group_size_min` (number) → `group_size_min` (integer)
- `group_size_max` (number) → `group_size_max` (integer)
- `difficulty` (select) → `difficulty` (string)
- `duration_options[]` (multi-select) → `duration_options` (comma-separated string)
- `languages_spoken[]` (multi-select) → `languages_spoken` (comma-separated string)

### Controller Processing Flow

#### Main Method: `ListingController::insert()`

1. **Validation Phase**:
   - Uses `CategoryValidationService` for category-specific rules
   - Uses `ImageProcessingService` for image validation
   - Handles improved error messages for image uploads

2. **Data Processing Phase**:
   - Calls category-specific processing methods:
     - `processCarRentalData()` for Category 2
     - `processPrivateDriverData()` for Category 3
     - `processBoatRentalData()` for Category 4
     - `processActivitiesData()` for Category 5

3. **Database Operations**:
   - Creates main listing record
   - Processes related data (images, pricing, addons, etc.)
   - Handles translations via `TranslationService`

### Database Mapping

#### Main Listings Table (`listings`)

| Form Field | Processing | Database Column | Data Type | Notes |
|------------|------------|-----------------|-----------|--------|
| `title` | Direct | `title` | string | Required |
| `category_id` | Direct | `category_id` | integer | Required |
| `city_id` | Direct | `city_id` | integer | Required |
| `provider_id` | Direct | `provider_id` | integer | FK to agencies |
| `car_types[]` | JSON array | `car_types_new` | json | Multi-select for cars |
| `car_model` | Direct | `car_model` | integer | FK to sub_category_options |
| `vehicule_type` | Direct | `vehicule_type` | integer | FK to sub_category_options |
| `boat_type` | Direct | `boat_type` | integer | FK to sub_category_options |
| `activity_type` | Direct | `activity_type` | integer | FK to sub_category_options |
| `languages_spoken[]` | Comma-separated | `languages_spoken` | string | Array to string |
| `duration_options[]` | Comma-separated | `duration_options` | string | Array to string |

#### Related Tables

**listing_galleries**:
- `listing_id` (FK)
- `file_path` (WebP and original formats)
- `file_name`

**listing_pricings**:
- `listing_id` (FK)
- `element` (pricing type)
- `price` (amount)

### Special Processing Notes

1. **Image Processing**:
   - Uses `ImageProcessingService` for WebP conversion
   - Saves both WebP and original formats
   - Validates file size (max 2MB) and format (JPG/PNG)

2. **Multi-select Fields**:
   - `car_types[]` → stored as JSON in `car_types_new`
   - `languages_spoken[]` → stored as comma-separated string
   - `duration_options[]` → stored as comma-separated string

3. **Validation**:
   - Category-specific validation via `CategoryValidationService`
   - Base rules apply to all categories
   - Foreign key validation for subcategory options

4. **Translations**:
   - Handled via `TranslationService`
   - Supports pending translations from form input
   - Uses `Translatable` trait on Listing model

### Data Flow Inconsistencies Identified

1. **Field Type Mismatches**:
   - Some fields are stored as strings in DB but processed as integers (e.g., `seats`, `doors`)
   - Model casts handle the conversion properly

2. **Legacy vs New Fields**:
   - `car_type` (legacy) vs `car_types_new` (JSON array)
   - Migration added `car_types_new` for multi-select support

3. **Nullable vs Required**:
   - Database allows most fields as nullable
   - Validation enforces requirements based on category

4. **Deposit Fields**:
   - Available for cars and boats but handled differently
   - Cars: `deposit_required`, `deposit_amount`, `deposit_note`
   - Boats: `deposit_required`, `deposit_currency`

## Implementation
(To be filled by developer agent)

## Files Modified
(Updated during development)

## Testing
(Test results and validation)

## Key Questions Answered

### 1. What fields are present in the admin form for each category?

**All Categories (Universal)**:
- Basic: title, category_id, city_id, provider_id
- SEO: meta_title, meta_description, schema_markup, slug
- Content: description, short_description, dealer_note, special_notes
- Pricing: price_per_hour, price_per_half_day, price_per_day, price_per_week, price_per_month

**Car Rental (Category 2) - 15 specific fields**:
- car_types[] (multi-select), car_model, year, fuel_type, transmission
- seats, doors, ac, mileage_policy, fuel_policy, driver_requirement
- deposit_required, deposit_amount, deposit_note

**Private Driver (Category 3) - 7 specific fields**:
- vehicule_type, vehicule_model, max_passengers, max_luggage
- pickup_location, languages_spoken[], service_type

**Boat Rental (Category 4) - 6 specific fields**:
- boat_type, with_captain, capacity, departure_location
- duration_options[], optional deposit fields

**Activities (Category 5) - 8 specific fields**:
- activity_type, pickup, meeting_point, private_or_group
- group_size_min, group_size_max, difficulty, duration_options[], languages_spoken[]

### 2. How are these fields mapped to database columns?

**Direct Mapping**: Most fields map directly to same-named database columns
**Transformations**:
- `car_types[]` → `car_types_new` (JSON array)
- `languages_spoken[]` → `languages_spoken` (comma-separated string)
- `duration_options[]` → `duration_options` (comma-separated string)
- Foreign keys map to integer IDs in sub_category_options table

### 3. What transformations happen during save?

1. **Array to JSON**: Multi-select car types stored as JSON
2. **Array to String**: Languages and duration options stored as comma-separated
3. **Image Processing**: WebP conversion + validation (2MB limit, JPG/PNG only)
4. **Slug Generation**: Auto-generated from title via SEOService
5. **Category Processing**: Dedicated methods for each category type
6. **Type Casting**: Model handles string to integer conversions

### 4. How are related tables populated?

**listing_galleries**:
- Images processed through ImageProcessingService
- Both WebP and original formats saved
- Files stored in public/images/listings

**listing_pricings**:
- Custom pricing elements (element name + price)
- Handled separately from base pricing fields

**Translations**:
- Via TranslationService and Translatable trait
- Supports pending translations from form

### 5. What validation rules are applied?

**Base Rules**: Required title, city_id, category_id; optional SEO and content fields
**Category-Specific Rules**:
- Car Rental: car_types[] required (min 1), car_model required, year 1990-current+2
- Private Driver: vehicule_type, vehicule_model required
- Boat Rental: boat_type, capacity required
- Activities: activity_type, meeting_point required

**Image Validation**: Max 2MB, JPG/PNG formats only

### 6. How are translations handled?

- Listing model uses `Translatable` trait
- `TranslationService` processes pending translations from form
- Multi-language support for EN, FR, ES
- Translation data stored in separate translation tables