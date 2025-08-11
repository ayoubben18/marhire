# MarHire Application Entry Points

## Web Entry Points

### Public Entry Point
**URL:** `/public/index.php`
- Main application entry point for all HTTP requests
- Bootstraps Laravel application
- Handles all routing through Laravel's router
- Serves static assets when not found by web server

### Artisan Console
**Command:** `php artisan`
- CLI entry point for administrative tasks
- Runs migrations, seeders, custom commands
- Manages cache, queues, and maintenance mode

## Frontend Entry Points

### Main React Application
**File:** `/resources/js/app.js`
```javascript
// Primary React mounting point
// Initializes i18n, axios interceptors, and global configurations
// Mounts React components to Blade-defined DOM elements
```

### Dashboard Application
**File:** `/resources/js/dashboard.tsx`
```javascript
// Admin dashboard entry point
// Separate bundle for authenticated admin users
// Includes dashboard-specific components and logic
```

## Route Entry Points

### Web Routes
**File:** `/routes/web.php`

#### Public Routes
- `/` - Home page (multi-language)
- `/{locale}` - Localized home page
- `/{locale}/listing/{slug}` - Listing details
- `/{locale}/search` - Search results
- `/{locale}/category/{slug}` - Category listings
- `/{locale}/about` - About page
- `/{locale}/contact` - Contact page

#### Authentication Routes
- `/login` - User login
- `/register` - User registration
- `/logout` - User logout
- `/password/reset` - Password recovery

### Admin Routes
**File:** `/routes/admin.php`
- `/admin/dashboard` - Admin dashboard
- `/admin/listings/*` - Listing management
- `/admin/bookings/*` - Booking management
- `/admin/users/*` - User management
- `/admin/agencies/*` - Agency management
- `/admin/email-templates/*` - Email template management
- `/admin/settings/*` - System settings

### API Routes
**File:** `/routes/api.php`
- `/api/v1/listings` - Listing API endpoints
- `/api/v1/bookings` - Booking API endpoints
- `/api/v1/search` - Search API
- `/api/v1/translations` - Translation API

## Laravel Bootstrap Sequence

### 1. Public Index
```
public/index.php
├── Register Composer autoloader
├── Bootstrap Laravel application
├── Create HTTP kernel
├── Handle request
└── Send response
```

### 2. Application Bootstrap
```
bootstrap/app.php
├── Create application instance
├── Bind important interfaces
├── Register HTTP/Console kernels
└── Return application instance
```

### 3. Service Providers
```
config/app.php → providers[]
├── App\Providers\AppServiceProvider
├── App\Providers\AuthServiceProvider
├── App\Providers\EventServiceProvider
├── App\Providers\RouteServiceProvider
├── App\Providers\SeoBladeServiceProvider
└── Third-party providers
```

## React Component Entry Points

### Page Components
These components serve as entry points for specific pages:

```
resources/js/pages/
├── Home.jsx - Homepage component
├── Listing.jsx - Listing detail page
├── Search.jsx - Search results page
├── BookingDetails.jsx - Booking information
├── Dashboard.jsx - Admin dashboard
└── [Other page components]
```

### Component Mounting Strategy
```javascript
// Blade template defines mount points
<div id="react-home-component"></div>

// React app.js finds and mounts components
const homeElement = document.getElementById('react-home-component');
if (homeElement) {
    ReactDOM.render(<Home />, homeElement);
}
```

## Middleware Entry Points

### Global Middleware
Applied to all requests:
- `TrustProxies`
- `CheckForMaintenanceMode`
- `ValidatePostSize`
- `TrimStrings`
- `ConvertEmptyStringsToNull`

### Route Middleware
Applied selectively:
- `auth` - Authentication check
- `locale` - Language detection and setting
- `admin` - Admin access verification
- `api.locale` - API language handling

## Command Entry Points

### Scheduled Commands
**File:** `app/Console/Kernel.php`
```php
protected function schedule(Schedule $schedule)
{
    $schedule->command('reminders:send')->daily();
    $schedule->command('sitemap:generate')->weekly();
    $schedule->command('cleanup:temp')->hourly();
}
```

### Custom Artisan Commands
```
app/Console/Commands/
├── SendScheduledReminders.php
├── TestPDFInvoices.php
├── TestMultiLanguageEmails.php
└── [Other custom commands]
```

## Database Entry Points

### Migrations
**Directory:** `/database/migrations/`
- Entry point for database schema changes
- Run via `php artisan migrate`
- Rollback via `php artisan migrate:rollback`

### Seeders
**Directory:** `/database/seeders/`
- Entry point for initial/test data
- Run via `php artisan db:seed`
- Specific seeder: `php artisan db:seed --class=UserSeeder`

## Asset Entry Points

### Webpack Configuration
**File:** `webpack.mix.js`
```javascript
// Defines asset compilation entry points
mix.js('resources/js/app.js', 'public/js')
   .js('resources/js/dashboard.tsx', 'public/js')
   .sass('resources/sass/app.scss', 'public/css')
   .postCss('resources/css/tailwind.css', 'public/css');
```

### Compiled Assets
```
public/
├── js/
│   ├── app.js - Main application bundle
│   ├── dashboard.js - Dashboard bundle
│   └── [Vendor bundles]
├── css/
│   ├── app.css - Main styles
│   ├── tailwind.css - Tailwind utilities
│   └── [Component styles]
└── mix-manifest.json - Asset versioning
```

## Error Entry Points

### Exception Handler
**File:** `app/Exceptions/Handler.php`
- Central error handling entry point
- Logs exceptions
- Renders error responses
- Handles API vs web errors differently

### Error Pages
```
resources/views/errors/
├── 404.blade.php - Not found
├── 403.blade.php - Forbidden
├── 500.blade.php - Server error
└── 503.blade.php - Maintenance mode
```

## Testing Entry Points

### PHPUnit Configuration
**File:** `phpunit.xml`
- Defines test suites and environment
- Entry point: `vendor/bin/phpunit`

### Test Directories
```
tests/
├── Unit/ - Unit test entry points
├── Feature/ - Feature test entry points
└── TestCase.php - Base test class
```

## Development Entry Points

### Local Development Server
```bash
# PHP built-in server
php artisan serve
# Starts on http://localhost:8000

# Asset compilation watch
npm run watch
# Watches and recompiles assets on change
```

### Development Tools
- **Laravel Debugbar** - Injected into responses in development
- **Telescope** - (If configured) Debug dashboard at `/telescope`
- **Tinker** - REPL via `php artisan tinker`

## Production Entry Points

### Web Server Configuration
```
.htaccess (Apache/LiteSpeed)
├── Redirects all requests to public/index.php
├── Handles URL rewriting
├── Sets security headers
└── Manages compression
```

### Queue Workers
```bash
# If using queues (currently sync driver)
php artisan queue:work
```

### Cron Jobs
```bash
# Single cron entry for Laravel scheduler
* * * * * cd /path/to/project && php artisan schedule:run
```

## Security Entry Points

### CSRF Token Verification
- All POST/PUT/DELETE requests require CSRF token
- Token generated per session
- Verified by `VerifyCsrfToken` middleware

### Authentication Gates
```php
// Defined in AuthServiceProvider
Gate::define('admin-access', function ($user) {
    return $user->role === 'admin';
});
```

### API Authentication
- Token-based via Laravel Sanctum
- Tokens stored in `personal_access_tokens` table
- Verified on each API request

## External Service Entry Points

### Webhook Endpoints
- `/webhooks/stripe` - Stripe payment notifications
- `/webhooks/email` - Email delivery status

### OAuth Callbacks
- `/auth/google/callback` - Google OAuth
- `/auth/facebook/callback` - Facebook OAuth

## Monitoring Entry Points

### Health Checks
- `/health` - Application health status
- `/status` - Detailed system status

### Log Files
```
storage/logs/
├── laravel.log - Main application log
├── worker.log - Queue worker log
└── [Daily rotating logs]
```