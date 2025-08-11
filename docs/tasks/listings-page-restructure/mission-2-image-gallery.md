# Mission 2: Backend/Frontend - Fix Fetching All Images and Display Gallery

## Mission Status

Current: Validated

## Problem Statement

The current image gallery system needs to be enhanced to properly fetch and display all listing images with category-specific gallery layouts. The system should support Viator-style galleries for most categories and single image display for car rentals, with proper image switching functionality.

## Context & Analysis

### Current Image System Architecture

**Backend (Laravel):**

-   `ListingGallery` model stores images with `listing_id`, `file_name`, `file_path`
-   Images stored in `/public/images/listings/` directory
-   Support for WebP format with fallback to original formats (jpg, jpeg, png)
-   Images fetched through `galleries()` relationship in Listing model

**Frontend (React):**

-   `SingleListingGallery.jsx` - Current gallery component (basic grid layout)
-   `ListingGalleryViator.jsx` - Viator-inspired gallery with modal and navigation
-   `ListingGallerySingle.jsx` - Single image display for car rentals
-   `SmartImage` component handles WebP/fallback logic

### Current Issues Identified

1. **Backend Issues:**

    - Images fetched correctly via `->with(['galleries'])` but may have ordering issues
    - No explicit image ordering/priority system
    - Potential missing WebP optimization in some cases

2. **Frontend Issues:**
    - `SingleListingGallery.jsx` shows all images in basic grid (not category-specific)
    - Gallery components exist but not properly integrated based on category
    - Missing proper image switching functionality in some scenarios

## Objectives

1. **Backend Enhancements:**

    - Ensure all listing images are properly fetched and ordered
    - Add image priority/ordering system if needed
    - Optimize image loading and error handling

2. **Frontend Gallery System:**
    - Implement category-specific gallery logic
    - Car Rental (category_id: 2) → Single image gallery
    - All other categories → Viator-style gallery with specific layout requirements:
        * **Layout**: Left thumbnails (vertical strip) + Right main image
        * **Thumbnails**: 4-5 visible thumbnails in a vertical column on the left
        * **Main Image**: Large display area on the right (approximately 75% width)
        * **Navigation**: Arrow buttons overlaid on the main image for prev/next
        * **"See More"**: Button at the bottom of thumbnail strip when >5 images
        * **Clean Design**: Proper borders and spacing matching Viator style
        * **Interactions**: Click on thumbnail changes main image, arrow keys navigation
        * **No Social Features**: No share button or "Add to Wishlist" functionality
    - Enhanced error handling and fallback images

## Deliverables

### Backend Tasks

1. **Image Fetching Enhancement** (`app/Http/Controllers/ListingController.php`)

    - Review `get_listing()` method to ensure proper image fetching
    - Add image ordering (by ID or created_at)
    - Verify WebP optimization is working correctly

2. **Optional: Image Priority System** (`app/Models/ListingGallery.php`)
    - Add `sort_order` or `priority` field if needed for image ordering
    - Create migration if required

### Frontend Tasks

1. **Gallery Selection Logic** (`resources/js/pages/Listing.jsx`)

    - Replace `SingleListingGallery` with category-specific gallery selection
    - Car Rental → Use `ListingGallerySingle`
    - Others → Use `ListingGalleryViator`

2. **Gallery Component Enhancements**

    - **`ListingGallerySingle.jsx`**: Ensure proper single image handling
    - **`ListingGalleryViator.jsx`**: Implement specific Viator-style layout:
        * Left vertical thumbnail strip (4-5 visible thumbnails)
        * Right main image display (75% width)
        * Arrow buttons overlaid on main image
        * "See More" button at bottom of thumbnails when >5 images
        * Clean borders and spacing
        * Click thumbnail to change main image
    - **Image Switching**: Smooth navigation between images with keyboard support (arrow keys)
    - **No Social Features**: Remove any share buttons or wishlist functionality

3. **Error Handling Improvements**
    - Better fallback for missing images
    - Loading states for gallery components
    - Consistent error messaging

## Success Criteria

### Backend Success Criteria

-   [ ] All listing images are fetched correctly for each listing
-   [ ] Images are properly ordered (newest first or by priority)
-   [ ] WebP optimization works with proper fallbacks
-   [ ] No duplicate images in the response
-   [ ] API response includes all necessary image metadata

### Frontend Success Criteria

-   [ ] **Car Rental listings**: Display single image gallery with modal enlargement
-   [ ] **Other categories**: Display Viator-style gallery with left thumbnails (vertical strip of 4-5) + right main image (75% width)
-   [ ] **Image Navigation**: Arrow buttons overlaid on main image + click thumbnails to switch + arrow keys support
-   [ ] **Gallery Layout**: Left vertical thumbnail strip + right main image with proper spacing and borders
-   [ ] **Error Handling**: Graceful fallback for missing/broken images
-   [ ] **Loading States**: Proper skeletons while images load
-   [ ] **Keyboard Navigation**: Arrow keys work in modal
-   [ ] **Mobile Responsive**: Gallery works well on all screen sizes

## Implementation Approach

### Phase 1: Backend Review & Enhancement (1-2 hours)

1. **Review Current Image Fetching**

    ```php
    // In ListingController@get_listing
    $listing = Listing::where('slug', $request->slug)
        ->with(['galleries' => function($query) {
            $query->orderBy('created_at', 'asc'); // or by priority
        }])
        ->firstOrFail();
    ```

2. **Verify Image Paths & WebP Support**
    - Ensure all images have correct paths
    - Test WebP fallback functionality
    - Add any missing image metadata

### Phase 2: Frontend Gallery Logic (2-3 hours)

1. **Update Main Listing Page**

    ```jsx
    // In Listing.jsx
    const renderGallery = () => {
        if (listing.category_id === 2) {
            // Car Rental
            return (
                <ListingGallerySingle
                    image={listing.galleries[0]}
                    title={getTranslatedField(listing, "title", currentLocale)}
                />
            );
        } else {
            return (
                <ListingGalleryViator
                    images={listing.galleries}
                    title={getTranslatedField(listing, "title", currentLocale)}
                    layout="viator" // Left thumbnails + right main image
                />
            );
        }
    };
    ```

2. **Enhance Gallery Components**
    - Implement exact Viator layout: left thumbnails (4-5 visible, vertical strip) + right main image (75% width)
    - Add arrow buttons overlaid on main image
    - "See More" button at bottom of thumbnails when >5 images
    - Add keyboard navigation (ArrowLeft, ArrowRight, Escape)
    - Click thumbnail changes main image
    - Remove any social features (share, wishlist)
    - Improve loading states and error handling
    - Optimize image preloading

### Phase 3: Testing & Polish (1 hour)

1. **Test All Categories**

    - Car Rental → Single image
    - Boat Rental → Viator gallery
    - Private Driver → Viator gallery
    - Things to Do → Viator gallery

2. **Mobile & Desktop Testing**
    - Gallery responsiveness
    - Modal functionality
    - Touch/swipe gestures

## Testing Requirements

### Manual Testing Checklist

-   [ ] **Car Rental Listing**: Single image displays correctly with modal
-   [ ] **Boat/Activity/Driver Listings**: Viator-style gallery (left vertical thumbnails + right main image)
-   [ ] **Image Navigation**: Arrow buttons overlaid on main image work + thumbnail clicks
-   [ ] **Keyboard Navigation**: Arrow keys and Escape work
-   [ ] **Mobile Experience**: Touch gestures work, responsive layout
-   [ ] **Error Scenarios**: Broken images show appropriate fallbacks
-   [ ] **Loading States**: Skeleton displays while images load
-   [ ] **WebP Support**: Images optimize to WebP with fallbacks

### Cross-browser Testing

-   [ ] Chrome (Desktop & Mobile)
-   [ ] Firefox (Desktop & Mobile)
-   [ ] Safari (Desktop & Mobile)
-   [ ] Edge (Desktop)

## Files to Modify

### Backend

-   `/app/Http/Controllers/ListingController.php` (get_listing method)
-   `/app/Models/ListingGallery.php` (potential ordering enhancement)

### Frontend

-   `/resources/js/pages/Listing.jsx` (gallery selection logic)
-   `/resources/js/components/site/listing/ListingGalleryViator.jsx` (enhancements)
-   `/resources/js/components/site/listing/ListingGallerySingle.jsx` (enhancements)

## Dependencies

-   Existing `SmartImage` component for WebP handling
-   React Icons for navigation buttons
-   Existing translation system for error messages
-   CSS/Tailwind for styling gallery components

## Risks & Mitigation

**Risk**: Large images cause slow loading
**Mitigation**: Implement progressive loading and image optimization

**Risk**: Modal accessibility issues  
**Mitigation**: Ensure proper focus management and keyboard navigation

**Risk**: Category detection fails
**Mitigation**: Add fallback to Viator gallery for unknown categories

## Notes

-   Reference Viator gallery: https://www.viator.com/tours/Marrakech/Private-Transfer-From-or-To-Marrakech-Essaouira-in-an-A-C-4x4-Car/d5408-438655P8
-   Maintain existing MarHire color palette and design system
-   Ensure accessibility compliance (ARIA labels, keyboard navigation)
-   Gallery components already exist and are well-structured - mainly need integration
-   Consider adding image lazy loading for performance optimization

## Definition of Done

-   [ ] Backend fetches all images properly with correct ordering
-   [ ] Car rentals show single image gallery
-   [ ] Other categories show Viator-style gallery with exact layout: left thumbnails (vertical strip) + right main image (75% width)
-   [ ] Gallery navigation works smoothly: arrow buttons on main image, thumbnail clicks, and keyboard support (arrow keys)
-   [ ] All error scenarios are handled gracefully
-   [ ] Mobile experience is optimized
-   [ ] Code is tested across different browsers and devices
-   [ ] Performance is acceptable (images load < 3 seconds)
