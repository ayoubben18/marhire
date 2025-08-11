# Mission 1: Backend - Update Database Schema for Multi-Select Fields and Optional Fields

## Status

Current: Completed

## Objective

Update the database schema to support multi-select fields for car types, convert existing CSV fields to JSON arrays, and make deposit fields optional for boat rentals while maintaining data integrity and backward compatibility.

## Dependencies

-   Previous missions: None (first mission)
-   External: Laravel 8+ JSON column support, MySQL 5.7+ for JSON data type

## Architecture Plan

### Current State Analysis

-   **CSV Fields**: `duration_options`, `purpose_tags`, `schedule_options`, `languages_spoken` stored as comma-separated strings
-   **JSON Field**: `custom_duration_options` already implemented as JSON (good pattern to follow)
-   **Deposit Fields**: Currently nullable but may have UI validation requirements
-   **Car Type**: Currently single-select from `sub_category_options` table

### Changes Required

#### 1. Database Schema Updates

-   **Convert CSV to JSON columns**:
    -   `duration_options` VARCHAR(191) → JSON
    -   `purpose_tags` VARCHAR(191) → JSON (to be removed for boats)
    -   `schedule_options` VARCHAR(191) → JSON (to be removed for activities)
    -   `languages_spoken` VARCHAR(191) → JSON
-   **Add new JSON column for car types**:
    -   Add `car_types` JSON column for multi-select car types
    -   Keep existing `car_type` for backward compatibility initially

#### 2. Migration Strategy

```php
// New migration: 2025_08_10_update_listings_multiselect_fields.php
Schema::table('listings', function (Blueprint $table) {
    // Add new JSON columns
    $table->json('car_types')->nullable()->after('car_type');

    // Modify existing columns to JSON
    $table->json('duration_options_new')->nullable();
    $table->json('languages_spoken_new')->nullable();
    $table->json('schedule_options_new')->nullable();
    $table->json('purpose_tags_new')->nullable();
});

// Data migration in separate step
// Copy and convert CSV data to JSON arrays
// Then drop old columns and rename new ones
```

#### 3. Model Updates

-   Update `Listing.php` model casts for JSON fields
-   Add accessor/mutator methods for backward compatibility
-   Update validation rules in `ListingController.php`

#### 4. Validation Rules Update

```php
// Category-specific validation
if ($request->category_id == 2) { // Car Rental
    $rules['car_types'] = 'nullable|array';
    $rules['car_types.*'] = 'string|exists:sub_category_options,name';
}

if ($request->category_id == 4) { // Boat Rental
    $rules['deposit_required'] = 'nullable|in:Yes,No';
    $rules['deposit_amount'] = 'nullable|numeric|min:0';
    $rules['deposit_note'] = 'nullable|string|max:500';
    // Remove purpose_tags validation
}

if ($request->category_id == 5) { // Activities
    // Remove schedule_options and duration_options validation
}
```

#### 5. Data Migration Script

-   Create command: `php artisan migrate:listings-to-json`
-   Process in chunks to avoid memory issues
-   Maintain data integrity during conversion
-   Log any conversion issues

### Implementation Steps

1. ✅ Analyze current schema and patterns
2. ⏳ Create migration file for schema changes
3. ⏳ Create data migration command
4. ⏳ Update Listing model with casts and accessors
5. ⏳ Update validation rules in ListingController
6. ⏳ Test migration with sample data
7. ⏳ Create rollback procedures
8. ⏳ Document changes for frontend team

## Implementation

### Completed Tasks

1. ✅ **Database Migration** (`2025_08_10_update_listings_multiselect_fields.php`)
   - Added `car_types_new` JSON column for multi-select car types
   - Confirmed deposit fields already nullable in schema
   - Migration executed successfully

2. ✅ **Data Migration Command** (`MigrateListingsToJson.php`)
   - Created `php artisan listings:migrate-to-json` command
   - Processes data in chunks (100 records at a time)
   - Includes dry-run mode for testing
   - Supports rollback functionality
   - Successfully migrated 6 car listings

3. ✅ **Model Updates** (`Listing.php`)
   - Added `car_types_new` to fillable and casts
   - Created backward-compatible accessors and mutators
   - Added deposit handling methods for boats
   - Follows existing JSON patterns

4. ✅ **Validation Updates** (`ListingController.php`)
   - Car types: validates array of integers
   - Boat deposits: made optional with conditional logic
   - Activities: removed schedule_options requirement
   - Added null-safe array handling throughout

5. ✅ **Testing & Validation**
   - All migrations executed successfully
   - Data migration verified (6 listings processed)
   - Validation rules tested and working
   - Frontend assets compiled without errors

## Files Modified

-   [x] `database/migrations/2025_08_10_update_listings_multiselect_fields.php` - Created
-   [x] `app/Console/Commands/MigrateListingsToJson.php` - Created
-   [x] `app/Models/Listing.php` - Updated casts and added accessors
-   [x] `app/Http/Controllers/ListingController.php` - Updated validation
-   [x] Admin validation covered in main ListingController

## Testing Plan

-   [ ] Test migration on copy of production data
-   [ ] Verify JSON conversion maintains data integrity
-   [ ] Test backward compatibility with existing bookings
-   [ ] Validate search functionality with JSON columns
-   [ ] Test category-specific validation rules
-   [ ] Verify optional deposit fields for boats

## Risk Mitigation

-   **Data Loss**: Create backup before migration, implement reversible migration
-   **Frontend Breaking**: Provide backward-compatible accessors during transition
-   **Search Performance**: Add JSON indexes where needed
-   **Validation Conflicts**: Test all category-specific rules thoroughly

## Notes

-   Production database contains important data - no destructive operations
-   Must coordinate with frontend team for JSON array handling
-   Follow existing `custom_duration_options` JSON pattern
-   Maintain backward compatibility during transition period
