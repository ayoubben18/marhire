# Admin Routes Testing Documentation

## Testing Date: 2025-08-09

This document tracks the testing of all admin routes in the MarHire application, documenting what works, what was fixed, and important patterns to maintain.

## Important Patterns to Maintain

### 1. Route Naming Conventions
- **ALWAYS check blade templates for the exact route names used**
- Some routes use underscores (listing_addons), others don't (listingaddons)
- When in doubt, create alias routes for both naming conventions

### 2. Locale Handling
- Admin routes DO NOT use locale prefixes
- Admin routes are defined in `/routes/admin.php`
- LocaleMiddleware skips admin routes
- JavaScript localeManager excludes admin paths

### 3. Common Route Patterns
- List: `/{resource}` → `{resource}.list`
- Add/New: `/{resource}/add` or `/{resource}/new` → `{resource}.add` or `{resource}.new`
- Edit: `/{resource}/edit/{id}` → `{resource}.edit`
- Insert: `/{resource}/insert` → `{resource}.insert`
- Update: `/{resource}/update` → `{resource}.update`
- Delete: `/{resource}/delete` → `{resource}.delete`

## Testing Results

### ✅ Dashboard Routes
- [x] `/dashboard` - **WORKING**
  - Route: `dashboard.index`
  - Fixed: Added missing routes for dashboard dependencies

### ✅ Bookings Routes
- [x] `/bookings` - **WORKING** (list page)
- [x] `/bookings/new` - **WORKING**
- [ ] `/bookings/edit/{id}` - NOT TESTED
- [ ] `/bookings/item/{id}` - NOT TESTED
- [ ] `/bookings/download-invoice/{id}` - NOT TESTED
- [ ] POST `/bookings/insert` - NOT TESTED
- [ ] POST `/bookings/update` - NOT TESTED
- [ ] POST `/bookings/delete` - NOT TESTED
- [ ] POST `/bookings/changeStatus` - NOT TESTED
- [ ] POST `/bookings/sendBookingEmail` - NOT TESTED
- [ ] POST `/bookings/send-invoice` - NOT TESTED
- [ ] POST `/bookings/uploads` - NOT TESTED
- [ ] POST `/bookings/unlink` - NOT TESTED
- [ ] POST `/bookings/getListings` - NOT TESTED
- [ ] POST `/bookings/getActivityListings` - NOT TESTED

### ⏳ Categories Routes
- [x] `/categories` - **WORKING** (list page)
- [ ] `/categories/new` - NOT TESTED
- [ ] `/categories/edit/{id}` - NOT TESTED
- [ ] POST `/categories/insert` - NOT TESTED
- [ ] POST `/categories/update` - NOT TESTED
- [ ] POST `/categories/delete` - NOT TESTED
- [ ] POST `/categories/getSubcategories` - NOT TESTED
- [ ] POST `/categories/getListings` - NOT TESTED
- [ ] POST `/categories/getCategoryData` - NOT TESTED

### ⏳ Subcategories Routes
- [x] `/subcategories` - **WORKING** (list page)
- [ ] `/subcategories/new` - NOT TESTED
- [ ] `/subcategories/edit/{id}` - NOT TESTED
- [ ] POST `/subcategories/insert` - NOT TESTED
- [ ] POST `/subcategories/update` - NOT TESTED
- [ ] POST `/subcategories/delete` - NOT TESTED
- [ ] POST `/subcategories/getOptions` - NOT TESTED

### ⏳ Listings Routes
- [x] `/listings` - **WORKING** (list page)
- [ ] `/listings/add` - NOT TESTED
- [ ] `/listings/new` - NOT TESTED (alias for add)
- [ ] `/listings/edit/{id}` - NOT TESTED
- [ ] `/listings/translation-test` - NOT TESTED
- [ ] POST `/listings/insert` - NOT TESTED
- [ ] POST `/listings/update` - NOT TESTED
- [ ] POST `/listings/delete` - NOT TESTED
- [ ] POST `/listings/uploads` - NOT TESTED
- [ ] POST `/listings/unlink` - NOT TESTED
- [ ] POST `/listings/setAsPrimary` - NOT TESTED
- [ ] POST `/listings/switchStatus` - NOT TESTED
- [ ] POST `/listings/deleteAllListingImages` - NOT TESTED
- [ ] POST `/listings/get-listing-details` - NOT TESTED
- [ ] POST `/listings/getPricing` - NOT TESTED
- [ ] POST `/listings/getAddons` - NOT TESTED

### ⏳ Listing Addons Routes
- [x] `/listing_addons` - **WORKING** (list page)
  - Fixed: Added alias routes for both `listing_addons` and `listingaddons`
- [ ] `/listing_addons/add` - NOT TESTED
- [ ] `/listing_addons/new` - NOT TESTED (alias for add)
- [ ] `/listing_addons/edit/{id}` - NOT TESTED
- [ ] POST `/listing_addons/insert` - NOT TESTED
- [ ] POST `/listing_addons/update` - NOT TESTED
- [ ] POST `/listing_addons/delete` - NOT TESTED

### ⏳ Agencies Routes
- [x] `/agencies` - **WORKING** (list page)
- [ ] `/agencies/add` - NOT TESTED
- [ ] `/agencies/new` - NOT TESTED (alias for add)
- [ ] `/agencies/edit/{id}` - NOT TESTED
- [ ] POST `/agencies/insert` - NOT TESTED
- [ ] POST `/agencies/update` - NOT TESTED
- [ ] POST `/agencies/delete` - NOT TESTED
- [ ] POST `/agencies/changeStatus` - NOT TESTED

### ⏳ Articles Routes
- [x] `/articles` - **WORKING** (list page)
  - Fixed: Added `articles.new` route as alias for `articles.add`
- [ ] `/articles/add` - NOT TESTED
- [ ] `/articles/new` - NOT TESTED (alias for add)
- [ ] `/articles/edit/{id}` - NOT TESTED
- [ ] POST `/articles/insert` - NOT TESTED
- [ ] POST `/articles/update` - NOT TESTED
- [ ] POST `/articles/delete` - NOT TESTED

### ⏳ Pages Routes
- [x] `/pages` - **WORKING** (list page)
- [ ] `/pages/new` - NOT TESTED
- [ ] `/pages/edit/{id}` - NOT TESTED
- [ ] POST `/pages/insert` - NOT TESTED
- [ ] POST `/pages/update` - NOT TESTED
- [ ] POST `/pages/delete` - NOT TESTED

### ⏳ Terms Routes
- [x] `/terms` - **WORKING** (list page)
  - Fixed: Removed conflicting catch-all redirect in web.php
- [ ] `/terms/new` - NOT TESTED
- [ ] `/terms/edit/{id}` - NOT TESTED
- [ ] POST `/terms/insert` - NOT TESTED
- [ ] POST `/terms/update` - NOT TESTED
- [ ] POST `/terms/delete` - NOT TESTED

### ⏳ Cities Routes
- [x] `/cities` - **WORKING** (list page)
- [ ] `/cities/new` - NOT TESTED
- [ ] `/cities/edit/{id}` - NOT TESTED
- [ ] POST `/cities/insert` - NOT TESTED
- [ ] POST `/cities/update` - NOT TESTED
- [ ] POST `/cities/delete` - NOT TESTED

### ⏳ Coupons Routes
- [x] `/coupons` - **WORKING** (list page)
- [ ] `/coupons/new` - NOT TESTED
- [ ] `/coupons/add` - NOT TESTED
- [ ] `/coupons/edit/{id}` - NOT TESTED
- [ ] POST `/coupons/insert` - NOT TESTED
- [ ] POST `/coupons/update` - NOT TESTED
- [ ] POST `/coupons/delete` - NOT TESTED

### ⏳ Users Routes
- [x] `/users` - **WORKING** (list page)
  - Fixed: Added standalone route `list_utilisateurs`
- [ ] `/users/new` - NOT TESTED
- [ ] `/users/edit/{id}` - NOT TESTED
- [ ] `/users/edit-password/{id}` - NOT TESTED
- [ ] `/users/permissions/{id}` - NOT TESTED
- [ ] `/users/update/{id}` - NOT TESTED (utilisateur.update)
- [ ] POST `/users/insert` - NOT TESTED
- [ ] POST `/users/save` - NOT TESTED (utilisateur.save)
- [ ] POST `/users/delete` - NOT TESTED (utilisateur.delete)
- [ ] POST `/users/updatePermissions` - NOT TESTED
- [ ] PATCH `/users/update/{user}` - NOT TESTED
- [ ] PATCH `/users/update-password/{user}` - NOT TESTED

### ⏳ Profile Routes
- [x] `/profile` - **WORKING**
  - Fixed: Added profile routes group
- [ ] `/profile/edit` - NOT TESTED
- [ ] POST `/profile` (save) - NOT TESTED
- [ ] POST `/profile/upload` - NOT TESTED
- [ ] POST `/profile/update` - NOT TESTED

### ⏳ Settings Routes
- [ ] `/settings` - NOT TESTED
- [ ] POST `/settings` (save) - NOT TESTED
- [ ] POST `/settings/upload` - NOT TESTED

### ⏳ Societes Routes
- [ ] `/societes` - NOT TESTED
- [ ] `/societes/add` - NOT TESTED
- [ ] `/societes/edit/{id}` - NOT TESTED
- [ ] POST `/societes/insert` - NOT TESTED
- [ ] POST `/societes/update` - NOT TESTED
- [ ] POST `/societes/delete` - NOT TESTED

### ⏳ Email Management Routes
- [ ] `/admin/email-templates` - NOT TESTED
- [ ] `/admin/email-templates/{template}/edit` - NOT TESTED
- [ ] `/admin/email-templates/{template}/preview` - NOT TESTED
- [ ] `/admin/email-templates/{template}/preview-multilingual` - NOT TESTED
- [ ] PUT `/admin/email-templates/{template}` - NOT TESTED
- [ ] `/admin/email-settings` - NOT TESTED
- [ ] POST `/admin/email-settings` - NOT TESTED
- [ ] POST `/admin/email-settings/test` - NOT TESTED
- [ ] `/admin/email-history` - NOT TESTED

### ⏳ Notification Routes
- [ ] POST `/notifications/getNotifications` - NOT TESTED
- [ ] POST `/notifications/getMessages` - NOT TESTED
- [ ] POST `/notifications/seen` - NOT TESTED
- [ ] POST `/notifications/seenMessages` - NOT TESTED

## Fixes Applied

### 1. Missing Routes Fixed
- Added `bookings.new` route
- Added `bookings.edit` route
- Added `articles.new` route (alias for add)
- Added `list_utilisateurs` standalone route
- Added `parametrage.get` route for settings
- Added `profile.get` route
- Added alias routes for `listingaddons` (without underscore)

### 2. Route Conflicts Resolved
- Removed `/terms` catch-all redirect that was conflicting with admin terms routes
- Created both `listing_addons` and `listingaddons` route groups for compatibility

### 3. Middleware Changes
- Updated LocaleMiddleware to skip admin routes
- Updated JavaScript localeManager to exclude admin paths

## Next Steps

1. Test all "Add/New" pages for each module
2. Test all "Edit" pages with sample IDs
3. Test POST operations (insert, update, delete)
4. Test special operations (uploads, status changes, etc.)
5. Test email management system
6. Test notification system

## Important Notes

- Always check blade templates for exact route names before making changes
- Some modules use different naming conventions (underscore vs no underscore)
- POST routes can only be tested through form submissions or AJAX calls
- Some routes may require specific data or permissions to test properly