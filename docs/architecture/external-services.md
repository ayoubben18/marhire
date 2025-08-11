# MarHire External Services Documentation

## Email Services

### SMTP Configuration
**Purpose:** Primary email delivery mechanism
**Configuration:** `.env` file and `config/mail.php`

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=
MAIL_FROM_NAME="${APP_NAME}"
```

**Usage Points:**
- Booking confirmations
- Password reset emails
- Admin notifications
- Customer reminders
- Invoice delivery

**Implementation:**
- `app/Services/Email/EmailService.php` - Primary service class
- `app/Mail/DatabaseTemplateEmail.php` - Template-based emails
- Database-driven templates with multi-language support
- Retry mechanism for failed sends
- Email logging in `email_logs` table

### Email Template System
**Features:**
- Database-stored templates
- Multi-language support (EN/FR/ES)
- Variable replacement system
- HTML and plain text versions
- Preview functionality in admin panel

## Translation Services

### Google Gemini API
**Purpose:** AI-powered translation for dynamic content
**Configuration:** `config/services.php`

```php
'gemini' => [
    'api_key' => env('GEMINI_API_KEY'),
    'model' => env('GEMINI_MODEL', 'gemini-pro'),
]
```

**Usage:**
- `app/Services/GeminiTranslationService.php`
- Translates listing descriptions
- Translates dynamic content
- Fallback to manual translations
- Caching of translated content

**Rate Limits:**
- API key required
- Request throttling implemented
- Graceful degradation on failure

## Payment Services (Configured but not fully implemented)

### Stripe
**Purpose:** Payment processing for bookings
**Status:** Configuration present, implementation pending

```env
STRIPE_KEY=
STRIPE_SECRET=
STRIPE_WEBHOOK_SECRET=
```

**Planned Integration:**
- Online booking payments
- Deposit handling
- Refund processing
- Payment method storage

### PayPal
**Purpose:** Alternative payment method
**Status:** Placeholder configuration only

```env
PAYPAL_CLIENT_ID=
PAYPAL_SECRET=
PAYPAL_MODE=sandbox
```

## Cloud Storage Services

### Local Storage (Current)
**Purpose:** File and image storage
**Implementation:** Laravel's local filesystem

```php
'disks' => [
    'public' => [
        'driver' => 'local',
        'root' => storage_path('app/public'),
        'url' => env('APP_URL').'/storage',
    ],
]
```

**Stored Assets:**
- Listing images: `public/images/listings/`
- User uploads: `storage/app/public/`
- PDF invoices: `storage/app/invoices/`
- Temporary files: `storage/app/temp/`

### Potential Cloud Storage (Future)
**Options for scalability:**
- AWS S3
- Google Cloud Storage
- Cloudflare R2
- DigitalOcean Spaces

## SEO and Analytics Services

### Sitemap Generation
**Internal Service:** `app/Services/SitemapGeneratorService.php`
**Output:** 
- `public/sitemap.xml` - Main sitemap
- `public/sitemap-en.xml` - English sitemap
- `public/sitemap-fr.xml` - French sitemap
- `public/sitemap-es.xml` - Spanish sitemap

### Schema.org Markup
**Implementation:** `app/Services/SEOService.php`
**Features:**
- Structured data for listings
- LocalBusiness schema
- Product schema for rentals
- BreadcrumbList for navigation

### Google Analytics (Placeholder)
```javascript
// Placeholder in layout files
// GA_MEASUREMENT_ID to be configured
```

### Google Tag Manager (Placeholder)
```javascript
// GTM container placeholder
// GTM_CONTAINER_ID to be configured
```

## Authentication Services

### Session Management
**Driver:** File-based (cPanel compatible)
**Configuration:** `config/session.php`

```php
'driver' => env('SESSION_DRIVER', 'file'),
'lifetime' => env('SESSION_LIFETIME', 120),
'expire_on_close' => false,
'encrypt' => false,
'files' => storage_path('framework/sessions'),
```

### OAuth Providers (Configured routes, not implemented)
**Potential Integrations:**
- Google OAuth
- Facebook Login
- Apple Sign In

**Route Structure:**
```php
Route::get('/auth/{provider}', 'Auth\SocialController@redirect');
Route::get('/auth/{provider}/callback', 'Auth\SocialController@callback');
```

## Caching Services

### File Cache (Current)
**Purpose:** Application caching
**Configuration:** File-based for cPanel compatibility

```php
'default' => env('CACHE_DRIVER', 'file'),
'stores' => [
    'file' => [
        'driver' => 'file',
        'path' => storage_path('framework/cache/data'),
    ],
]
```

**Cached Data:**
- Configuration cache
- Route cache
- View cache
- Translation cache
- Query results (selective)

### Redis (Future Option)
**Benefits:**
- Faster cache operations
- Session storage
- Queue backend
- Real-time features

## Queue Services

### Sync Driver (Current)
**Purpose:** Synchronous job processing
**Limitation:** No background processing

```php
'default' => env('QUEUE_CONNECTION', 'sync'),
```

**Jobs Processed:**
- Email sending (synchronous)
- PDF generation (synchronous)
- Image processing (synchronous)

### Database Queue (Alternative)
**Configuration available but unused:**
```php
'database' => [
    'driver' => 'database',
    'table' => 'jobs',
    'queue' => 'default',
    'retry_after' => 90,
]
```

## Image Processing Services

### Intervention Image
**Purpose:** Image manipulation and optimization
**Usage:** Listing image processing

**Operations:**
- Resize for thumbnails
- Optimize for web
- Format conversion
- Watermarking (if needed)

## PDF Generation Services

### DOMPDF
**Purpose:** Invoice and document generation
**Implementation:** `app/Services/PDFService.php`

**Generated Documents:**
- Booking invoices (multi-language)
- Category-specific invoices:
  - Car rental invoices
  - Boat rental invoices
  - Private driver invoices
  - Activities invoices
- Booking confirmations
- Terms and conditions

## Database Services

### MySQL
**Primary Database:** Production data
**Configuration:** `.env` database settings

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=marhire
DB_USERNAME=
DB_PASSWORD=
```

**Backup Considerations:**
- Regular backups required
- No test database modifications
- Migration rollback capability

## Monitoring and Logging Services

### Laravel Logs
**Location:** `storage/logs/`
**Channels:**
- `single` - Single log file
- `daily` - Daily rotating logs
- `stack` - Multiple channels

### Error Tracking (Future)
**Potential Services:**
- Sentry
- Bugsnag
- Rollbar
- Laravel Telescope

## API Services

### Internal APIs
**RESTful Endpoints:**
- `/api/v1/listings` - Listing management
- `/api/v1/bookings` - Booking operations
- `/api/v1/search` - Search functionality
- `/api/v1/translations` - Translation API

### External API Integrations (Future)
**Potential Integrations:**
- Weather API for activity planning
- Maps API for location services
- SMS gateway for notifications
- WhatsApp Business API

## Development Services

### Version Control
**Platform:** GitHub
**Repository:** Private repository
**Branching Strategy:** 
- `main` - Production branch
- `develop` - Development branch
- Feature branches as needed

### CI/CD (Future)
**Potential Services:**
- GitHub Actions
- GitLab CI
- Jenkins
- CircleCI

## Security Services

### SSL/TLS
**Provider:** Managed by hosting provider
**Implementation:** Force HTTPS in production

### CSRF Protection
**Built-in Laravel protection**
**Token generation per session**

### Rate Limiting
**Implementation:** Laravel's built-in throttling
```php
Route::middleware('throttle:60,1')->group(function () {
    // API routes
});
```

## Hosting and Infrastructure

### cPanel
**Purpose:** Web hosting control panel
**Features Used:**
- File manager
- Database management
- Email accounts
- Cron jobs
- SSL certificates
- Backup management

### Web Server
**Type:** Apache/LiteSpeed
**Configuration:** `.htaccess` for routing

## Service Integration Best Practices

### Environment Variables
All service credentials stored in `.env`:
- Never commit credentials
- Use `.env.example` as template
- Rotate keys regularly

### Graceful Degradation
All external services implement fallbacks:
- Email: Queue for retry
- Translation: Fallback to source language
- Payment: Manual processing option
- Storage: Local fallback

### Service Abstraction
Services wrapped in interfaces:
```php
interface EmailServiceInterface {
    public function send($to, $template, $data);
}
```

### Error Handling
All external service calls wrapped in try-catch:
```php
try {
    $result = $externalService->call();
} catch (Exception $e) {
    Log::error('Service failed', ['error' => $e->getMessage()]);
    // Fallback logic
}
```

## Service Monitoring

### Health Checks
- Email service: Test send capability
- Database: Connection test
- Storage: Write permission test
- Cache: Read/write test

### Performance Metrics
- API response times
- Email delivery rates
- Translation API usage
- Storage usage

## Cost Considerations

### Current Services
- **Hosting:** cPanel shared hosting
- **Email:** SMTP included with hosting
- **Storage:** Local storage included
- **Database:** MySQL included

### Potential Service Costs
- **Gemini API:** Pay per request
- **Stripe:** Transaction fees
- **Cloud Storage:** Per GB stored/transferred
- **Premium Email:** Volume-based pricing

## Service Migration Plan

### Phase 1 (Current)
- Local storage
- File-based cache
- Sync queue processing
- Basic email via SMTP

### Phase 2 (Short-term)
- Implement Stripe payments
- Add Gemini translations
- Setup error tracking

### Phase 3 (Long-term)
- Migrate to cloud storage
- Implement Redis caching
- Add queue workers
- Enhanced monitoring