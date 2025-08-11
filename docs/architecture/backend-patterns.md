# Backend Architecture - MarHire Platform

## Framework & Runtime

### Core Technology Stack
- **Framework**: Laravel 8.75+ (PHP Web Framework)
- **PHP Version**: ^7.3|^8.0 (Multi-version support for compatibility)
- **Runtime Environment**: Apache/Nginx on cPanel hosting
- **Database**: MySQL (Primary database system)
- **Session Management**: File-based sessions (SESSION_DRIVER=file)
- **Cache Strategy**: File-based caching (CACHE_DRIVER=file)

### Key Dependencies
```json
"require": {
    "laravel/framework": "^8.75",
    "laravel/passport": "^10.4",        // API Authentication
    "laravel/sanctum": "^2.15",         // SPA Authentication  
    "laravel/socialite": "^5.16",       // OAuth Integration
    "barryvdh/laravel-dompdf": "^2.0",  // PDF Generation
    "spatie/laravel-sitemap": "^6.4",   // SEO Sitemap
    "yajra/laravel-datatables": "^9.21", // Admin Tables
    "maatwebsite/excel": "^3.1"         // Excel Operations
}
```

## API Design

### Architecture Style
- **Primary Pattern**: Traditional Web Application (Server-side rendered with React components)
- **API Endpoints**: RESTful for AJAX operations and admin functionality
- **Data Transfer**: JSON for API responses, Form data for traditional submissions
- **Authentication**: Session-based for web, Token-based for API routes

### Route Organization
```php
// Public Routes (with locale prefix)
Route::group(['prefix' => '{locale?}'], function () {
    Route::name('entere.')->group(function () {
        Route::get('/', [EntereController::class, 'home'])->name('home');
        Route::get('/details/{slug}', [EntereController::class, 'listing'])->name('listing');
        // ... other public routes
    });
});

// Admin Routes (no locale prefix)
Route::name('listings.')->middleware(['auth'])->prefix('listings')->group(function () {
    Route::get('/', [ListingController::class, 'list'])->name('list');
    Route::post('/insert', [ListingController::class, 'insert'])->name('insert');
    // ... admin CRUD operations
});
```

### API Response Patterns
- **Admin Operations**: DataTables integration with JSON responses
- **Form Submissions**: Redirect with session flash messages
- **AJAX Operations**: Consistent JSON structure
- **Error Handling**: Blade error pages for web, JSON for API

## Data Layer

### Database Architecture
- **Primary Database**: MySQL with Eloquent ORM
- **Schema Design**: Traditional relational structure with foreign key relationships
- **Migration Strategy**: Laravel migrations with 52+ migration files
- **Soft Deletes**: Implemented on critical models (Booking, Listing, User)

### Core Entity Relationships
```php
// Primary Entities
Listing (Properties/Services)
├── belongsTo Category
├── belongsTo City  
├── belongsTo Agency (provider)
├── hasMany ListingTranslation (i18n)
├── hasMany ListingAddonAffected
├── hasMany ListingGallery
└── hasMany Booking

Booking (Customer Reservations)
├── belongsTo Listing
├── belongsTo Category
├── belongsTo User (createdBy)
├── belongsTo City
└── hasMany BookingAddon

User (Multi-role system)
├── type_compte: admin|client|staff|livreur
├── hasMany Booking (as createdBy)
└── Role-based access control
```

### Data Translation Strategy
```php
// Translatable Trait Implementation
class Listing extends Model {
    use Translatable;
    
    protected $translatable = [
        'title', 'description', 'short_description',
        'special_notes', 'cancellation_policy', 'rental_terms'
    ];
    
    public function translations() {
        return $this->hasMany(ListingTranslation::class);
    }
}
```

### Caching Strategy
- **File-based Cache**: Simple caching for configuration and views
- **Query Optimization**: Eager loading with `with()` relationships
- **Session Caching**: User preferences and locale settings
- **View Caching**: Compiled Blade templates

## Authentication & Security

### Authentication Implementation
```php
// Multi-Guard Authentication
'guards' => [
    'web' => [
        'driver' => 'session',
        'provider' => 'users',
    ],
    'api' => [
        'driver' => 'sanctum',
        'provider' => 'users',
    ],
]
```

### Authorization Patterns
```php
// Role-based Authorization
public function isAdmin() {
    return $this->type_compte == 'admin';
}

public function isClient() {
    return $this->type_compte == 'client';
}

// Permission-based Access
public function hasPermission($permission) {
    return $this->$permission == 1;
}
```

### Security Middleware Stack
```php
// Global Middleware
protected $middleware = [
    \App\Http\Middleware\TrustProxies::class,
    \Fruitcake\Cors\HandleCors::class,
    \App\Http\Middleware\PreventRequestsDuringMaintenance::class,
    // Security & validation middleware
];

// Route-specific Middleware  
'auth' => \App\Http\Middleware\Authenticate::class,
'checkPermission' => \App\Http\Middleware\CheckPermission::class,
```

### Security Measures
- **CSRF Protection**: VerifyCsrfToken middleware on web routes
- **Rate Limiting**: Throttle middleware for sensitive operations
- **Input Validation**: Request validation with sanitization
- **SQL Injection Prevention**: Eloquent ORM with parameterized queries
- **XSS Protection**: Blade template escaping by default

## Service Architecture

### Service Layer Organization
```
app/Services/
├── Email/
│   ├── EmailService.php (Main email service)
│   ├── EmailServiceInterface.php (Contract)
│   └── EmailConfigService.php (Configuration)
├── PDFService.php (Invoice generation)
├── TranslationService.php (Content translation)
├── LanguageService.php (Locale management) 
├── BookingService.php (Business logic)
├── SEOService.php (Search optimization)
└── SitemapGeneratorService.php (Sitemap generation)
```

### Service Pattern Implementation
```php
// Service Interface Pattern
interface EmailServiceInterface {
    public function send(string $recipient, string $emailType, Booking $booking): bool;
    public function sendBulk(array $recipients, string $emailType, Booking $booking): bool;
    public function getFailedEmails(int $days = 7): Collection;
}

// Dependency Injection
public function __construct(
    EmailLogRepository $emailLogRepository, 
    PDFService $pdfService
) {
    $this->emailLogRepository = $emailLogRepository;
    $this->pdfService = $pdfService;
}
```

### Business Logic Patterns
- **Repository Pattern**: For complex data operations
- **Service Layer**: Business logic abstraction from controllers
- **Strategy Pattern**: Multiple PDF templates based on categories
- **Observer Pattern**: Model events for automatic operations

## External Services

### Third-party Integrations
```php
// Email Service Integration
'mailers' => [
    'smtp' => [
        'transport' => 'smtp',
        'host' => env('MAIL_HOST', 'smtp.mailgun.org'),
        'port' => env('MAIL_PORT', 587),
        'encryption' => env('MAIL_ENCRYPTION', 'tls'),
    ]
]
```

### PDF Generation System
```php
class PDFService {
    // Multi-category Invoice Templates
    private const CATEGORY_TEMPLATES = [
        2 => 'invoice-car-rental',
        3 => 'invoice-private-driver', 
        4 => 'invoice-boat-rental',
        5 => 'invoice-activities'
    ];
    
    // Multi-language Support
    public function generateInvoice(array $data, ?int $categoryId, string $locale = 'en'): string
}
```

### SEO & Sitemap Services
- **Dynamic Sitemap Generation**: Multi-language sitemaps
- **Schema Markup**: Structured data for search engines  
- **Hreflang Implementation**: International SEO optimization
- **Meta Tag Management**: Dynamic SEO meta information

## Background Processing

### Job Queue System
```php
// Simple Job Processing
'connections' => [
    'sync' => [
        'driver' => 'sync',  // Synchronous processing for cPanel
    ],
]
```

### Scheduled Tasks
```php
// Console Commands
protected $commands = [
    \App\Console\Commands\SendScheduledReminders::class,
    \App\Console\Commands\TestPDFInvoices::class,
];
```

### Background Operations
- **Email Processing**: Immediate sending with error logging
- **PDF Generation**: On-demand invoice creation
- **Sitemap Generation**: Scheduled sitemap updates
- **Reminder System**: Automated booking reminders

## Internationalization System

### Multi-language Architecture
```php
// Locale Configuration
'supported_locales' => ['en', 'fr', 'es'],
'locale' => 'en',
'fallback_locale' => 'en',
```

### Translation Implementation
- **Database Translations**: Dynamic content (listings, emails)
- **File Translations**: Static interface elements
- **Route Localization**: URL prefix strategy (`/en/`, `/fr/`, `/es/`)
- **Fallback Strategy**: English as universal fallback

### Locale Middleware
```php
class LocaleMiddleware {
    // URL-based locale detection
    // Cookie/Session persistence  
    // Browser language detection
    // Admin route locale separation
}
```

## Error Handling & Logging

### Error Handling Strategy
```php
// Exception Handling
'log' => [
    'default' => env('LOG_CHANNEL', 'stack'),
    'channels' => [
        'stack' => [
            'driver' => 'stack',
            'channels' => ['single'],
        ],
    ]
]
```

### Logging Patterns
- **Email Logging**: Comprehensive email delivery tracking
- **Error Logging**: Application errors and exceptions
- **Debug Logging**: Development and troubleshooting
- **Performance Logging**: Query and response time tracking

### Error Recovery
- **Email Retry System**: Failed email retry mechanism
- **Graceful Degradation**: Fallback templates and translations
- **Data Validation**: Input sanitization and validation
- **Transaction Safety**: Database consistency protection

## DevOps & Deployment

### Environment Configuration
```php
// Environment-based Configuration
APP_ENV=local|staging|production
APP_DEBUG=true|false  
DB_CONNECTION=mysql
MAIL_MAILER=smtp
```

### cPanel Deployment Strategy
- **File-based Sessions**: Compatible with shared hosting
- **No Redis/Queue Workers**: Synchronous processing for simplicity
- **Static Asset Management**: Laravel Mix for frontend builds
- **Database Migration**: Manual migration deployment

### Monitoring & Health Checks
- **Email Delivery Monitoring**: Failed email tracking
- **Error Reporting**: Log-based error tracking
- **Performance Monitoring**: Manual performance review
- **Backup Strategy**: Database and file system backups

## Testing Infrastructure

### Testing Constraints
```php
// Production Database Protection
// NEVER use RefreshDatabase trait
// NEVER create destructive tests
// Use mocking for database interactions
```

### Testing Patterns
- **Unit Testing**: Business logic with mocked dependencies
- **Integration Testing**: Read-only database queries
- **Manual Testing**: Production-safe testing approach
- **Mock Testing**: External service simulation

## Technical Debt & Improvements

### Current Technical Debt
1. **Mixed Route Organization**: Admin routes partially mixed with public routes
2. **Legacy Naming**: Inconsistent naming conventions (livreur vs agency)
3. **File-based Cache**: Could benefit from Redis for production
4. **Synchronous Processing**: Email/PDF generation blocks requests
5. **Limited Test Coverage**: Production database constraints limit testing

### Recommended Improvements
1. **Queue Implementation**: Move to proper queue system for background tasks
2. **API Standardization**: Implement consistent API response format
3. **Caching Layer**: Redis implementation for better performance
4. **Service Container**: Better dependency injection organization
5. **Repository Pattern**: More consistent data access patterns

### Scalability Considerations
1. **Database Optimization**: Query optimization and indexing review
2. **Asset Optimization**: CDN implementation for static assets
3. **Session Management**: Database or Redis sessions for scaling
4. **Email Queue**: Proper queue system for email processing
5. **Monitoring System**: Application performance monitoring

## Architecture Strengths

### Design Strengths
- **Clear Separation**: Public vs Admin route separation
- **Service Layer**: Good business logic abstraction
- **Multi-language Support**: Comprehensive i18n implementation
- **Security Focus**: Multiple layers of security measures
- **Maintainable Structure**: Laravel conventions followed

### Production Readiness
- **cPanel Compatible**: Designed for shared hosting deployment
- **Error Handling**: Comprehensive error logging and recovery
- **Data Integrity**: Soft deletes and transaction safety
- **User Experience**: Multi-language, responsive design
- **Business Logic**: Complete booking and listing management

This architecture represents a well-structured Laravel application designed for the booking platform domain, with particular attention to internationalization, multi-category support, and cPanel hosting constraints.