# Mission 2: Document Booking Creation Flow from Admin Dashboard to Database

## Status
Current: Completed

## Objective
Document the complete data flow for booking creation from the admin dashboard (Blade templates) through the backend controllers to the database tables, capturing all field mappings and transformations.

## Dependencies
- Previous missions: Mission 1 (Listing creation flow documentation)
- External: Laravel framework, MySQL database

## Scope
- Admin booking creation form (`resources/views/bookings/add.blade.php`)
- Admin booking edit form (`resources/views/bookings/update.blade.php`)
- Booking controller (`app/Http/Controllers/BookingController.php`)
- Booking model and relationships (`app/Models/Booking.php`)
- Related tables: bookings, booking_addons
- BookingValidationService for validation rules
- All 4 categories: Car rental, Private driver, Boat rental, Activities

## Architecture Plan

### Complete Booking Creation Data Flow Documentation

#### 1. Form Fields Analysis by Category

**All Categories (Common Fields)**:
- `category_id` (select) → `category_id` (bookings table)
- `listing_id` (select) → `listing_id` (bookings table)
- `first_name` (text) → `first_name` (bookings table)
- `last_name` (text) → `last_name` (bookings table)
- `email` (email) → `email` (bookings table)
- `whatsapp` (text) → `whatsapp` (bookings table)
- `country` (select) → `country` (bookings table)
- `flight_number` (text) → `flight_number` (bookings table)
- `notes` (textarea) → `notes` (bookings table)
- `discount_or_extra` (number) → `discount_or_extra` (bookings table)
- `addons[]` (select multiple) → `booking_addons` table via `addon_id`

**Category 2 - Car Rental Specific Fields**:
- `pickup_date` (date) → `pickup_date` (bookings table)
- `dropoff_date` (date) → `dropoff_date` (bookings table)
- `pickup_time` (select) → `pickup_time` (bookings table)
- `dropoff_time` (select) → `dropoff_time` (bookings table)
- `pickup_location` (text/select) → `pickup_location` (bookings table)
- `droppoff_location` (text/select) → `droppoff_location` (bookings table) **Note: typo in DB**
- `age` (number) → `age` (bookings table) - **Create form only**
- `date_of_birth` (date) → `date_of_birth` (bookings table) - **Update form only**

**Category 3 - Private Driver Specific Fields**:
- `car_type` (select) → `car_type` (bookings table)
- `airport_or_intercity` (select) → `airport_or_intercity` (bookings table)
- `city_a_id` (select) → `city_a_id` (bookings table)
- `city_b_id` (select) → `city_b_id` (bookings table)
- `prefered_date` (date) → `prefered_date` (bookings table)
- `number_of_people` (number) → `number_of_people` (bookings table)
- `pickup_time` (time) → `pickup_time` (bookings table) - **Update form only**
- `service_types` (select) → `service_types` (bookings table) - **Update form only**
- `road_types` (select) → `road_types` (bookings table) - **Update form only**
- `number_of_passengers` (number) → `number_of_passengers` (bookings table) - **Update form only**
- `number_of_luggage` (number) → `number_of_luggage` (bookings table) - **Update form only**
- `pickup_address` (text) → `pickup_address` (bookings table) - **Update form only**
- `dropoff_address` (text) → `dropoff_address` (bookings table) - **Update form only**

**Category 4 - Boat Rental Specific Fields**:
- `duration` (select) → `duration` (bookings table)
- `propose` (select) → `propose` (bookings table)
- `prefered_date` (date) → `prefered_date` (bookings table)
- `number_of_people` (number) → `number_of_people` (bookings table)

**Category 5 - Activities Specific Fields**:
- `activity_type` (select) → `activity_type` (bookings table)
- `pricing_option_id` (select) → `pricing_option_id` (bookings table)
- `prefered_date` (date) → `prefered_date` (bookings table)
- `number_of_people` (number) → `number_of_people` (bookings table)
- `time_preference` (select) → `time_preference` (bookings table) - **Update form only**

#### 2. Controller Processing Flow

**BookingController::insert()** (Create Flow):
1. **Basic Validation**: Required fields (`category_id`, `listing_id`)
2. **Language Handling**: Gets locale from session/request, validates against supported locales
3. **Base Fields Assembly**: Common fields + calculated fields
   - `city_id` ← `listing.city_id`
   - `booking_source` ← 'Admin Entry'
   - `created_by` ← `Auth::id()`
4. **Category-Specific Fields**: Switch statement based on `category_id`
5. **Database Transaction**: Creates booking record
6. **Addon Processing**: Creates `BookingAddon` records for each selected addon
7. **Email Notifications**: Sends emails if enabled via `EmailServiceInterface`

**BookingController::update()** (Update Flow):
1. **Validation**: Required fields + booking existence
2. **Addon Price Calculation**: Calculates total from `ListingAddon` prices
3. **Total Price Calculation**: `booking_price + total_addons + discount_or_extra`
4. **Field Assembly**: Similar to insert but with additional private driver fields
5. **Database Transaction**: Updates booking + deletes/recreates addons
6. **Addon Sync**: Deletes existing addons, creates new ones with prices

#### 3. Database Field Mappings

**Primary Table: `bookings`**
```
Form Field Name → Database Column → Data Type → Notes
category_id → category_id → integer → Foreign key to categories
listing_id → listing_id → integer → Foreign key to listings
first_name → first_name → string → 
last_name → last_name → string → 
email → email → string → 
whatsapp → whatsapp → string → 
country → country → string → 
age → age → integer → Car rental only (create form)
date_of_birth → date_of_birth → string → Update form only
pickup_date → pickup_date → string → Car rental only
dropoff_date → dropoff_date → string → Car rental only
pickup_time → pickup_time → string → Car rental + Private driver
dropoff_time → dropoff_time → string → Car rental only
pickup_location → pickup_location → string → Car rental
droppoff_location → droppoff_location → string → Car rental (typo in DB)
duration → duration → string → Boat rental
propose → propose → string → Boat rental
prefered_date → prefered_date → string → Private driver, Boat, Activities
number_of_people → number_of_people → integer → Private driver, Boat, Activities
pricing_option_id → pricing_option_id → integer → Activities
activity_type → activity_type → integer → Activities
car_type → car_type → integer → Private driver
airport_or_intercity → airport_or_intercity → string → Private driver
city_a_id → city_a_id → integer → Private driver (departure city)
city_b_id → city_b_id → integer → Private driver (arrival city)
service_types → service_types → string → Private driver (update only)
road_types → road_types → string → Private driver (update only)
number_of_passengers → number_of_passengers → integer → Private driver (update only)
number_of_luggage → number_of_luggage → integer → Private driver (update only)
pickup_address → pickup_address → string → Private driver (update only)
dropoff_address → dropoff_address → string → Private driver (update only)
time_preference → time_preference → string → Activities (update only)
flight_number → flight_number → string → All categories
notes → notes → string → All categories
discount_or_extra → discount_or_extra → double → All categories
booking_price → booking_price → double → Calculated server-side
total_addons → total_addons → double → Calculated server-side
total_price → total_price → double → Calculated server-side
booking_source → booking_source → string → Fixed: 'Admin Entry'
created_by → created_by → integer → Auth::id()
city_id → city_id → integer → From listing.city_id
```

**Related Table: `booking_addons`**
```
Form Field → Database Column → Data Type → Notes
addons[] → booking_id → integer → Foreign key to bookings.id
addons[] → addon_id → integer → Foreign key to listing_addons.id
(calculated) → price → double → From listing_addons.price
```

#### 4. Key Differences Between Create and Update Forms

**Create Form (`add.blade.php`)**:
- Uses `age` field for car rentals
- Limited private driver fields (basic route selection)
- Uses text inputs for pickup/dropoff locations in car rentals
- Flight number only shown for car rentals (`data-categories="2"`)

**Update Form (`update.blade.php`)**:
- Uses `date_of_birth` instead of `age`
- Extended private driver fields (service types, road types, passenger details)
- Uses city selects for pickup/dropoff locations in car rentals
- Flight number shown for all categories
- Shows `time_preference` for activities
- Pre-populates existing addon selections
- Displays current pricing summary

#### 5. Private Driver Fields from Recent Migration

**Added by `2025_08_13_193400_add_private_driver_fields_to_bookings.php`**:
- `number_of_passengers` (integer, nullable)
- `number_of_luggage` (integer, nullable)  
- `service_types` (string, nullable)
- `road_types` (string, nullable)
- `pickup_address` (string, nullable)
- `dropoff_address` (string, nullable)
- `time_preference` (string, nullable) - Actually for activities

#### 6. Validation Rules (BookingValidationService)

**Common Validation**:
- `category_id`: required, integer, in:2,3,4,5
- `listing_id`: required, integer, exists:listings,id
- `email`: required, email, max:255
- `whatsapp`: required, string, regex for international format
- `country`: required, string, max:255
- `date_of_birth`: required, date, must be 18+ years old
- `terms_accepted`: required, accepted

**Category-Specific Validation**:
- **Car Rental**: 24h advance booking, 3-day minimum duration, city validation
- **Private Driver**: 48h advance booking, passenger capacity validation, pricing existence
- **Boat Rental**: 48h advance booking, 8am-8pm time slots, 30-minute increments, capacity validation
- **Activities**: 48h advance booking, group size limits, duration option validation

#### 7. Special Handling and Inconsistencies

**Database Column Typos**:
- `droppoff_location` (should be `dropoff_location`) - cannot be changed without migration

**Field Name Mappings**:
- Form uses `dropoff_location` but maps to `droppoff_location` in database
- Update form handles both old and new private driver field structures

**Price Calculations**:
- Server-side calculated in validation service using `BookingController::calculateAdvancedPrice()`
- Categories have different pricing models (daily rates, hourly rates, fixed prices)
- Addon prices are summed separately and stored in `total_addons`

**Email Integration**:
- Uses `EmailServiceInterface` for sending notifications
- Supports multiple languages based on customer preference
- Checks `EmailSetting` for enabled email types per category

#### 8. Addon Processing Flow

1. **Form**: Multiple select dropdowns populated via AJAX from `ListingAddon`
2. **Controller**: Filters empty values, validates addon belongs to listing
3. **Database**: Creates `BookingAddon` records with `booking_id`, `addon_id`, and `price`
4. **Update**: Deletes all existing addons, recreates from form data

#### 9. JavaScript Dynamic Behavior

**Create Form**:
- Category selection shows/hides relevant fields
- Listing dropdown populated via AJAX based on category/filters
- Price calculation in real-time
- Addon management (add/remove rows)

**Update Form**:
- Pre-loads existing values
- Preserves addon selections during listing changes
- Complex initialization for different categories
- Handles legacy data structures

## Implementation
(To be filled by developer agent)

## Files Modified
(Updated during development)

## Testing
(Test results and validation)

## Key Questions to Answer
1. What fields are present in the admin booking form for each category?
2. How are these fields mapped to database columns?
3. What transformations happen during save?
4. How are booking addons handled?
5. What validation rules are applied via BookingValidationService?
6. How do the create and update flows differ?
7. What are the private driver specific fields added by migration?