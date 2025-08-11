# Task: Listings Page Restructure

## Task Status

Current: In dev

## Problem Statement

The current listings page layout is disorganized and needs a complete restructuring to provide a better user experience. The page should follow modern booking platform standards with clear sections, proper hierarchy, and category-specific specifications.

## Context & Constraints

-   Use Viator.com as design inspiration (specifically their tour details page)
-   Maintain MarHire's existing color palette
-   Support 4 listing categories: Car Rental, Boat Rental, Private Driver, Things to Do
-   Each category has unique specifications to display
-   Must work with existing Laravel + React stack
-   Preserve all existing functionality
-   Follow responsive design principles
-   Use existing translation system for multi-language support

## Expected Outcome

A professionally restructured listings page with:

-   Clear visual hierarchy with breadcrumbs and H1 title
-   Location info with provider branding
-   Category-specific galleries (single image for car rental, Viator-style for others)
-   Dynamic specifications based on listing category
-   Trust badges/notes section
-   Well-organized content sections (Overview, Terms, What's Included, etc.)
-   Related listings comparison section
-   Sticky booking form with proper pricing display
-   Consistent styling inspired by Viator but using MarHire colors

## Task Type

Frontend

## Missions

-   [x] Mission 1 : FrontEnd - fix navbar overlapping - COMPLETED
    -   Navbar no longer overlaps content
    -   Breadcrumbs and title are now visible
-   [x] Mission 2 : Backend/FrontEnd - fix fetching all images and display gallery for images like the website provided and make switching between images possible - COMPLETED
    -   Backend properly fetches all gallery images
    -   Viator-style gallery with left thumbnails and right main image
    -   Category-specific galleries (single image for car rental)
    -   Full keyboard navigation and image switching
    -   "See More" functionality for >5 images
-   [x] Mission 3 : FrontEnd - fix layout the layout of the listing page - COMPLETED
    -   Restructured listing page following exact layout order
    -   Implemented category-specific specifications
    -   Fixed category_id mappings
    -   No hardcoded colors - uses existing Tailwind classes
    -   All existing functionality preserved
-   [ ] Mission 4 : FrontEnd - Make booking form sticky to the top of the window

## Notes

-   Task created: 2025-01-11
-   Status: Brainstormed → Validated → In dev → Testing → Completed
-   Reference: https://www.viator.com/tours/Marrakech/Private-Transfer-From-or-To-Marrakech-Essaouira-in-an-A-C-4x4-Car/d5408-438655P8
-   Secondary reference for booking terms: https://www.oneclickdrive.com/details/index/search-car-rentals-dubai/BMW/430i-Convertible-M-Kit/?id=22388
-   All missions defined based on comprehensive page restructuring requirements
-   Each mission builds incrementally on previous ones

## Layout Structure

```
1. Breadcrumbs
2. Title (H1)
3. Location + Provider Logo

Gallery
Car rental: one image medium size
Other categories: same style as viator

Specifications with icons
Things to do : activity type , pickup uncluded (yes or no ), private or group , group size for (group activity),  defuculty

Boat rental: Boat Type , captain: Yes or No, capacity , departure location: city + Marina,

Private driver: vecule type, vecule module, Max Passengers, Max Luggage, Languages

Car rental : car type, car brand , year, fuel type , transmition , number of seats , number of doors,
A/C : Yes , millage policy , fuel policy , driver age requirement, deposit ( deposit required  or No deposit)

Note (same style like viator ) :

Free cancellation up to 48 hours before your experience begins (local time) – no worries, change your plans stress-free.
Best Price Guarantee – Find a better price elsewhere? We’ll match it, ensuring you always get the best deal.
Local Expertise – Travel with confidence, guided by local experts who know the best spots and insider tips.

Overview
Short description

Booking Terms
With icons Design: https://www.oneclickdrive.com/details/index/search-car-rentals-dubai/BMW/430i-Convertible-M-Kit/?id=22388

Terms & Conditions
Cancelation Policy
Insurance Conditions

Special Notes and Requirements
Special Notes or Requirements

What's Included
Included + not included

Meeting and Pickup (For things to do)
Meeting Point address

Dealer Note
Dealer Note

Everything You Need to Know
Description

```

## Category-Specific Specifications

### Things to Do

-   Activity Type
-   Pickup Included (Yes/No)
-   Private or Group
-   Group Size (for group activities)
-   Difficulty Level

### Boat Rental

-   Boat Type
-   Captain (Yes/No)
-   Capacity
-   Departure Location (City + Marina)

### Private Driver

-   Vehicle Type
-   Vehicle Model
-   Max Passengers
-   Max Luggage
-   Languages

### Car Rental

-   Car Type
-   Car Brand
-   Year
-   Fuel Type
-   Transmission
-   Number of Seats
-   Number of Doors
-   A/C (Yes/No)
-   Mileage Policy
-   Fuel Policy
-   Driver Age Requirement
-   Deposit (Required/No deposit)
