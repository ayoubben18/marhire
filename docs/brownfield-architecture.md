# MarHire Brownfield Architecture Document

## Introduction

This document captures the CURRENT STATE of the MarHire codebase, including technical debt, workarounds, and real-world patterns. It serves as a reference for AI agents working on enhancements.

### Document Scope

Focused on areas relevant to:
1. **Booking System Enhancement** - Make booking functional for clients across all categories (car, boat, driver, activity)
2. **Internationalization (i18n)** - Multilingual support (EN, FR, ES) with SEO-friendly implementation
3. **UI Redesign** - Fix search results and single listing pages

### Change Log

| Date       | Version | Description                 | Author    |
| ---------- | ------- | --------------------------- | --------- |
| 2025-07-29 | 1.0     | Initial brownfield analysis | AI Agent  |

## Quick Reference - Key Files and Entry Points

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

## High Level Architecture

### Technical Summary

This is a Laravel 8 + React application using a traditional MVC pattern with API endpoints for the React frontend. The system appears to be a marketplace for booking various services in Morocco.

### Actual Tech Stack (from package.json/composer.json)

| Category    | Technology        | Version | Notes                                           |
| ----------- | ----------------- | ------- | ----------------------------------------------- |
| Runtime     | PHP               | 7.3+    | Laravel requirement                             |
| Framework   | Laravel           | 8.75    | MVC backend                                     |
| Frontend    | React             | 18.3.1  | SPA frontend with TypeScript support            |
| Database    | MySQL/MariaDB     | -       | Based on Laravel config                         |
| Auth        | Laravel Passport  | 10.4    | OAuth2 authentication                           |
| UI Library  | Material UI       | 6.5.0   | Component library                               |
| CSS         | Tailwind CSS      | 3.4.17  | Utility-first CSS                               |
| Build Tool  | Laravel Mix       | 6.0.6   | Webpack wrapper                                 |
| Icons       | React Icons       | 5.5.0   | Icon library                                    |
| Router      | React Router      | 7.0.2   | Client-side routing                             |

### Repository Structure Reality Check

```text
MarHire/
├── app/
│   ├── Http/
│   │   ├── Controllers/     # HTTP controllers (BookingController is admin-only)
│   │   └── Middleware/      # Request middleware
│   ├── Models/              # Eloquent models
│   └── Services/            # Business logic services
├── resources/
│   ├── js/
│   │   ├── components/      # React components
│   │   │   ├── site/        # Frontend components (booking forms, listings)
│   │   │   └── utils/       # Utility components
│   │   ├── pages/           # React page components
│   │   └── dashboard.tsx    # Admin dashboard
│   ├── views/               # Blade templates
│   └── lang/                # Language files (only EN exists)
├── routes/
│   ├── api.php              # API routes (booking endpoint not implemented)
│   └── web.php              # Web routes
├── database/
│   └── migrations/          # Database migrations
└── public/                  # Public assets
```

## Data Models and APIs

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

## Technical Debt and Known Issues

### Critical Technical Debt

1. **Booking System**: 
   - `submitBooking` method missing in BookingController
   - BookingFrm.jsx has no API integration (just UI)
   - No client authentication for bookings
   - Category-specific booking forms not connected to backend

2. **Internationalization**:
   - No i18n system implemented
   - Only English language files exist
   - No URL localization
   - No frontend i18n library (react-i18next missing)
   - No SEO meta tags for different languages

3. **Frontend Architecture**:
   - Mixed TypeScript and JavaScript files
   - No consistent state management (no Redux/Context)
   - Hardcoded text in components
   - No error handling in API calls

### Workarounds and Gotchas

- **Booking Categories**: Category IDs are hardcoded (2=Car, 3=Driver, 4=Boat, 5=Activity)
- **Admin Only**: All booking management is admin-only through dashboard
- **No Client Auth**: No user registration/login for clients
- **Search Forms**: Each category has its own form component but they don't submit to backend

## Integration Points and External Dependencies

### External Services

| Service        | Purpose         | Integration Type | Key Files                               |
| -------------- | --------------- | ---------------- | --------------------------------------- |
| Laravel Passport | OAuth2 Auth    | Package          | `config/auth.php`                       |
| Spatie Sitemap | SEO Sitemap     | Package          | Used for sitemap generation             |
| Pusher         | Real-time       | SDK              | For notifications (configured)          |

### Internal Integration Points

- **Frontend-Backend**: REST API on `/api/*` routes
- **Authentication**: Laravel Sanctum for API auth
- **File Storage**: Laravel's storage system for images
- **Email**: Laravel Mail (SendContactMail implemented)

## Development and Deployment

### Local Development Setup

1. Clone repository
2. Copy `.env.example` to `.env`
3. Run `composer install`
4. Run `npm install`
5. Generate key: `php artisan key:generate`
6. Run migrations: `php artisan migrate`
7. Run `npm run dev` for frontend
8. Run `php artisan serve` for backend

### Build and Deployment Process

- **Frontend Build**: `npm run production` (Laravel Mix)
- **Backend**: Standard Laravel deployment
- **Assets**: Compiled to `public/js` and `public/css`

## Enhancement Impact Analysis

### 1. Booking System Implementation

**Files That Need Modification**:
- `app/Http/Controllers/BookingController.php` - Add `submitBooking` method
- `routes/api.php` - Ensure route is properly configured
- `resources/js/components/site/BookingFrm.jsx` - Add API integration
- `resources/js/components/site/CarRentalForm.jsx` - Connect to booking API
- `resources/js/components/site/PrivateDriverForm.jsx` - Connect to booking API
- `resources/js/components/site/ThingsToDoForm.jsx` - Connect to booking API
- `resources/js/components/site/BoatForm.jsx` - Connect to booking API

**New Files/Modules Needed**:
- Client notification system for booking confirmations
- Booking validation service
- Guest checkout or simple auth system

### 2. Internationalization Implementation

**Files That Need Modification**:
- `config/app.php` - Add supported locales
- `routes/web.php` - Add locale prefix to routes
- All React components - Extract hardcoded strings
- `resources/views/layouts/app.blade.php` - Add language switcher

**New Files/Modules Needed**:
- `resources/lang/fr/` - French translations
- `resources/lang/es/` - Spanish translations
- `app/Http/Middleware/SetLocale.php` - Locale middleware
- Frontend i18n setup (react-i18next)
- SEO meta tags system

### 3. UI Component Fixes

**Files That Need Modification**:
- `resources/js/pages/Search.jsx` - Redesign search results
- `resources/js/pages/Listing.jsx` - Redesign single listing
- `resources/js/components/site/SearchItem.jsx` - Update item cards
- `resources/js/components/site/SingleListingGallery.jsx` - Fix gallery
- CSS files for responsive design

## Appendix - Useful Commands and Scripts

### Frequently Used Commands

```bash
# Development
npm run dev         # Start frontend dev server
php artisan serve   # Start backend server

# Build
npm run production  # Production build

# Database
php artisan migrate # Run migrations
php artisan db:seed # Seed database

# Cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear
```

### Debugging and Troubleshooting

- **Logs**: Check `storage/logs/laravel.log`
- **Debug Mode**: Set `APP_DEBUG=true` in `.env`
- **API Testing**: Use Postman or curl for API endpoints
- **React DevTools**: For debugging React components

## Key Observations

1. **Booking System Status**: The booking system exists but is completely disconnected from the frontend. The API endpoint exists but the controller method is missing.

2. **No Client-Facing Booking**: All booking functionality is currently admin-only through the dashboard.

3. **i18n Not Implemented**: The project has no internationalization infrastructure despite being a tourism platform.

4. **Component Organization**: Good component structure but lacks proper state management and API integration.

5. **Database**: Booking model supports all categories but needs client-facing implementation.