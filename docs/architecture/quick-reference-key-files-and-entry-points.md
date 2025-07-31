# Quick Reference - Key Files and Entry Points

### Critical Files for Understanding the System

- **Main Entry**: `server.php` (Laravel entry point)
- **Configuration**: `.env.example`, `config/app.php`
- **API Routes**: `routes/api.php`, `routes/web.php`
- **Core Business Logic**: `app/Http/Controllers/`, `app/Models/`
- **Frontend Entry**: `resources/js/app.js`
- **Database Models**: `app/Models/`

### Enhancement Impact Areas

#### Booking System
- **Backend Controller**: `app/Http/Controllers/BookingController.php` (admin-only currently)
- **Booking Model**: `app/Models/Booking.php`
- **Frontend Forms**: `resources/js/components/site/BookingFrm.jsx` (UI only, no API connection)
- **API Route**: `routes/api.php:40` - `submit_booking` endpoint (not implemented)
- **Related Components**: `CarRentalForm.jsx`, `PrivateDriverForm.jsx`, `ThingsToDoForm.jsx`, `BoatForm.jsx`

#### Internationalization
- **Language Directory**: `resources/lang/` (only `en` folder exists)
- **Config**: `config/app.php` - locale settings
- **Missing**: No i18n middleware, no route localization, no frontend i18n library

#### UI Components
- **Search Page**: `resources/js/pages/Search.jsx`
- **Listing Page**: `resources/js/pages/Listing.jsx`
- **Search Components**: `SearchFilter.jsx`, `SearchItem.jsx`
- **Listing Components**: `SingleListingGallery.jsx`, `SingleListingInfoCard.jsx`, `BookingFrm.jsx`
