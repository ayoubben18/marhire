# MarHire Project Constraints

## Critical Constraints

### 🚨 Production Database - NO MODIFICATIONS
**Constraint:** The database contains live production data
**Impact:** 
- NO database tests with RefreshDatabase trait
- NO test data insertion/deletion
- NO factory usage in tests
- Read-only queries only for testing

**Enforcement:**
```php
// ❌ NEVER DO THIS
use RefreshDatabase;
$this->artisan('migrate:fresh');
User::factory()->create();

// ✅ DO THIS INSTEAD
$this->mock(UserRepository::class);
// Use in-memory testing or mocks
```

## Hosting Constraints

### cPanel Shared Hosting Environment
**Platform:** Traditional cPanel shared hosting
**Limitations:**
- No root access
- No custom server software
- No persistent processes
- No WebSocket support
- Limited CPU/memory resources
- No Docker/containerization

**Required Adaptations:**
- File-based sessions (not Redis)
- File-based cache (not Memcached)
- Sync queue driver (no workers)
- Standard ports only (80/443)
- .htaccess for URL rewriting

### File System Constraints
**Storage Limitations:**
- Public directory for web assets
- Limited storage space
- No symlink creation in some cases
- Backup size limitations

**File Permissions:**
```bash
# Typical cPanel permissions
755 for directories
644 for files
Storage directories need 775
```

## Technical Constraints

### PHP Version Constraints
**Minimum:** PHP 7.4
**Maximum:** PHP 8.0 (some hosts)
**Cannot Use:**
- PHP 8.1+ features (enums, readonly properties)
- JIT compilation
- Fiber/async features

### Database Constraints
**Version:** MySQL 5.7 typical
**Limitations:**
- No JSON column indexing
- Limited full-text search
- No window functions (older versions)
- Connection limits on shared hosting
- Query execution time limits

### Process Execution Constraints
**No Background Processes:**
- Cannot run queue workers
- Cannot run WebSocket servers
- Cannot run long-running scripts
- Cron limited to every minute

**Synchronous Processing Only:**
```php
// All jobs run synchronously
'queue' => [
    'default' => 'sync',
]
```

## Development Constraints

### Testing Constraints
**Database Testing:**
- No database modifications allowed
- Must use mocks or in-memory solutions
- Cannot test migrations/seeders
- Read-only integration tests only

**Example Approach:**
```php
// Mock repository instead of database
$this->mock(ListingRepository::class)
    ->shouldReceive('find')
    ->andReturn($mockListing);
```

### Version Control Constraints
**Sensitive Files:**
- Never commit `.env` files
- Never commit database dumps
- Never commit user uploads
- Keep repository size manageable

### Deployment Constraints
**Manual Deployment:**
- No automated CI/CD on server
- FTP/cPanel file manager deployment
- Manual database migrations
- No zero-downtime deployments

## Business Constraints

### Multi-language Requirements
**Mandatory Support:**
- English (primary)
- French
- Spanish
- Fallback to English always

**Implementation Rules:**
- All user-facing text must be translatable
- Admin panel English-only
- Database content needs translation support
- URLs must support locale prefixes

### Data Integrity Constraints
**Booking System:**
- No double bookings allowed
- Price calculations must be accurate
- Availability must be real-time
- Invoice generation must be reliable

### Performance Constraints
**Shared Hosting Limits:**
- Page load < 3 seconds
- Memory usage < 128MB per request
- Execution time < 30 seconds
- Database queries < 1 second

## Security Constraints

### Authentication Requirements
**Mandatory Security:**
- CSRF protection on all forms
- XSS prevention in all outputs
- SQL injection prevention
- Password hashing with bcrypt
- Session security

### Data Protection
**GDPR/Privacy Compliance:**
- User data encryption
- Right to deletion
- Data portability
- Consent management
- Audit logging

### API Security
**Rate Limiting Required:**
```php
Route::middleware('throttle:60,1')->group(function () {
    // 60 requests per minute max
});
```

## Frontend Constraints

### Browser Support
**Minimum Requirements:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

### JavaScript Constraints
**Build Size Limits:**
- Bundle size < 500KB gzipped
- Lazy loading required for large components
- Code splitting for routes
- Tree shaking enabled

### Responsive Design
**Required Breakpoints:**
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+
- Must work without JavaScript (basic functionality)

## Integration Constraints

### Email Service
**SMTP Limitations:**
- Rate limits on sending
- Attachment size limits
- HTML email compatibility
- Spam filter considerations

### Payment Processing
**PCI Compliance:**
- No credit card storage
- Use tokenization only
- SSL required for payment pages
- Audit trail required

### Third-party APIs
**Rate Limiting:**
- Gemini API: Request limits
- Google services: Quota management
- Graceful degradation required
- Caching of API responses

## Architectural Constraints

### Monolithic Architecture
**Required Structure:**
- Single Laravel application
- No microservices
- No separate API server
- Shared database for all modules

### State Management
**Session-based Architecture:**
- Server-side sessions
- No JWT for web auth
- Cookie-based CSRF tokens
- File-based session storage

### Routing Constraints
**Server-side Routing:**
- Laravel handles all routing
- No client-side routing (SPA)
- Full page reloads
- SEO-friendly URLs required

## Maintenance Constraints

### Backup Requirements
**Regular Backups:**
- Daily database backups
- Weekly file backups
- Offsite backup storage
- Restore testing required

### Update Constraints
**Dependency Management:**
- Conservative updates only
- Test before production updates
- Maintain compatibility matrix
- Document breaking changes

### Monitoring Constraints
**Limited Monitoring:**
- Basic error logging only
- No APM tools on shared hosting
- Manual log review
- Email alerts for critical errors

## Scalability Constraints

### Horizontal Scaling
**Not Possible:**
- Single server only
- No load balancing
- No clustering
- No distributed caching

### Vertical Scaling
**Limited Options:**
- Upgrade hosting plan only
- Resource limits per plan
- Shared resource contention
- Migration required for major upgrades

## Code Quality Constraints

### Coding Standards
**Enforced Standards:**
- PSR-12 for PHP
- ESLint for JavaScript
- Prettier for formatting
- Type hints required

### Documentation Requirements
**Mandatory Documentation:**
- API endpoints must be documented
- Complex logic needs comments
- README for setup instructions
- Architecture decisions recorded

## Operational Constraints

### Maintenance Windows
**Downtime Required For:**
- Database migrations
- Major updates
- Server maintenance
- Backup operations

### Support Requirements
**User Support:**
- Email support only
- No real-time chat
- FAQ documentation required
- Response time SLA

## Future Migration Constraints

### Lock-in Considerations
**Avoid Vendor Lock-in:**
- Use standard technologies
- Portable database schema
- Framework-agnostic business logic
- Exportable data formats

### Upgrade Path
**Must Maintain:**
- Backward compatibility
- Data migration scripts
- Rollback procedures
- Feature flags for transitions

## Compliance Constraints

### Legal Requirements
**Must Comply With:**
- GDPR (European users)
- CCPA (California users)
- Accessibility standards (WCAG 2.1)
- Cookie consent laws

### Industry Standards
**Follow Best Practices:**
- OWASP security guidelines
- RESTful API principles
- Semantic versioning
- ISO date formats

## Communication Constraints

### Admin Panel
**English Only:**
- No internationalization needed
- All admin features in English
- Documentation in English
- Error messages in English

### Customer Communication
**Multi-language Required:**
- Emails in user's language
- Invoices in booking language
- Support in three languages
- Automated messages translated

## Performance Budgets

### Page Load Metrics
**Target Metrics:**
- First Contentful Paint < 1.5s
- Time to Interactive < 3.5s
- Cumulative Layout Shift < 0.1
- Total Page Size < 2MB

### Database Performance
**Query Limits:**
- No N+1 queries
- Index all foreign keys
- Limit eager loading depth
- Cache expensive queries

## Error Handling Constraints

### User-Facing Errors
**Requirements:**
- Graceful error messages
- Fallback to English
- No technical details exposed
- Log all errors

### System Errors
**Recovery Requirements:**
- Automatic retry for transient failures
- Circuit breakers for external services
- Graceful degradation
- Manual intervention alerts