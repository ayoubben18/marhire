# Mission 6: Frontend - Update Things to Do Form

## Status

Current: ✅ COMPLETED

## Objective

Update the Things to Do (Activities) listing form to remove unnecessary fields (Duration Option and Schedule) while maintaining image handling functionality that was already implemented in Mission 2. This simplifies the form for category ID 5 (Things to Do/Activities) making it more user-friendly.

## Dependencies

-   Previous missions:
    -   Mission 1: Database schema updates - COMPLETED
    -   Mission 2: ImageProcessingService with WebP conversion - COMPLETED
    -   Mission 3: CategoryValidationService updates - COMPLETED
    -   Mission 4 & 5: Reference architecture from Car and Boat forms - COMPLETED
-   External:
    -   Existing Laravel Blade template architecture
    -   jQuery/vanilla JS for form interactions (no React in admin forms)
    -   Category ID 5 filtering system

## Architecture Plan

### Current Things to Do Form Analysis

**Existing Structure in `/resources/views/listings/add.blade.php`:**

-   **Duration Options Field** (lines 534-547): Multi-select dropdown for activity durations
    -   Location: `data-categories="5"` section
    -   Field name: `duration_options[]`
    -   Options: 1h, 2h, 3h, Half-Day, Full-Day
-   **Schedule Section** (lines 752-762): Dynamic table for schedule items

    -   Location: `data-categories="5"` section
    -   Field name: `schedules[]`
    -   Allows adding/removing schedule entries dynamically
    -   JavaScript handlers: `#add-schedule` and `.remove-schedule`

-   **Image Handling**: Already implemented with WebP conversion in Mission 2
    -   Size guidelines displayed
    -   Automatic WebP conversion on upload
    -   No changes needed

### Frontend Architecture Design

#### 1. Fields to Remove

**Duration Options Field:**

-   Remove entire `<div class="col-md-4" data-categories="5">` block containing duration_options
-   Remove from required fields validation (line 1100)
-   Clean up any JavaScript references

**Schedule Section:**

-   Remove entire `<div class="col-12" data-categories="5">` block containing Schedule table
-   Remove JavaScript event handlers for add-schedule and remove-schedule
-   Remove schedule loading logic in the initialization section

#### 2. Form Validation Updates

**Current validation includes duration_options as required for category 5:**

```javascript
categoryRequiredMap = {
    5: ['duration_options', 'languages_spoken', 'activity_type', ...]
}
```

**Updated validation should exclude duration_options:**

```javascript
categoryRequiredMap = {
    5: [
        "languages_spoken",
        "activity_type",
        "pickup",
        "meeting_point",
        "private_or_group",
        "difficulty",
    ],
};
```

#### 3. Data Loading Updates

**Remove schedule loading logic (lines 1658-1675):**

-   Remove the entire block that loads existing schedules
-   Ensure no orphaned JavaScript references remain

#### 4. Remaining Things to Do Fields

After removal, these fields remain for category 5:

-   Activity Type
-   Languages Spoken
-   Pickup (Yes/No)
-   Meeting Point
-   Private or Group
-   Difficulty Level
-   Pricing Options (kept)
-   What's Included (kept)
-   What's Not Included (kept)
-   Images with WebP conversion (already working)

### Implementation Strategy

1. **Blade Template Updates**

    - Locate and remove Duration Options field block
    - Locate and remove Schedule section block
    - Ensure proper form layout after removals

2. **JavaScript Updates**

    - Remove schedule-related event handlers
    - Update validation map for category 5
    - Remove schedule data loading logic
    - Test form submission without removed fields

3. **Visual Cleanup**

    - Ensure form sections flow properly
    - Verify responsive layout on mobile/tablet
    - Check that remaining fields are properly spaced

4. **Testing Requirements**
    - Create new Things to Do listing without removed fields
    - Edit existing listing to ensure no errors
    - Verify form validation works correctly
    - Test image upload with WebP conversion still works

## Implementation

### Changes Made

1. **Removed Duration Options Field (lines 533-551)**
   - Deleted entire `<div class="col-md-4" data-categories="5">` block
   - Removed multi-select dropdown for activity durations
   - Field name: `duration_options[]` no longer populated for new listings

2. **Removed Schedule Section (lines 751-764)**
   - Deleted entire `<div class="col-12" data-categories="5">` block
   - Removed dynamic table for schedule items
   - Field name: `schedules[]` no longer populated for new listings

3. **Updated JavaScript Validation (line 1066)**
   - Removed 'duration_options' from required fields for category 5
   - Updated validation map from:
     ```javascript
     5: ['duration_options', 'languages_spoken', 'activity_type', ...]
     ```
   - To:
     ```javascript
     5: ['languages_spoken', 'activity_type', 'pickup', 'meeting_point', 'private_or_group', 'difficulty']
     ```

4. **Removed JavaScript Event Handlers (lines 1326-1344)**
   - Deleted `$('#add-schedule').click()` handler
   - Deleted `$('body').on('click', '.remove-schedule')` handler
   - Removed schedule table manipulation code

5. **Removed Schedule Loading Logic (lines 1604-1621)**
   - Deleted entire block that loads existing schedules into the form
   - Removed schedule.forEach loop that populated table rows

## Files Modified

- `/resources/views/listings/add.blade.php` - Removed form fields and JavaScript handlers

## Testing

✅ **Compilation**: Successfully compiled assets with `npm run dev`
✅ **Form Structure**: Verified form layout remains intact after field removal
✅ **JavaScript Validation**: Updated validation map works correctly
✅ **Backward Compatibility**: Existing listings with schedule/duration data unaffected
✅ **Image Upload**: WebP conversion functionality remains operational

## Notes

-   This is a simplification mission - removing complexity rather than adding features
-   Must ensure backward compatibility with existing listings that have schedule/duration data
-   The database fields can remain but won't be populated for new listings
-   Focus on clean removal without breaking existing functionality
