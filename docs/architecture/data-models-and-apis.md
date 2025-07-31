# Data Models and APIs

### Data Models

- **Booking Model**: See `app/Models/Booking.php`
  - Handles all booking types (car, boat, driver, activity)
  - Has category-specific fields (pickup/dropoff for cars, duration for boats, etc.)
  - Relationships: belongsTo Category, Listing, City, User
  - Has soft deletes enabled

- **Listing Model**: See `app/Models/Listing.php`
  - Main entity for bookable items
  - Related to Agency, Category, City
  - Has pricing, addons, specifications

- **Related Models**: Category, City, Agency, ListingAddon, BookingAddon

### API Specifications

#### Current API Endpoints (api.php)

- **Booking Related**:
  - `POST /api/submit_booking` - **NOT IMPLEMENTED** in controller
  - `POST /api/bookings-per-month` - Admin only (requires auth)
  - `POST /api/get-filters` - Admin only (requires auth)

- **Public APIs**:
  - `GET /api/get_listing` - Get single listing details
  - `GET /api/get_search_results` - Search listings
  - `GET /api/get_categories` - List categories
  - `GET /api/get_cities` - List cities
  - `GET /api/related_products` - Get related listings
