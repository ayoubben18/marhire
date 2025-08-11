# MarHire Technology Stack

## Core Technologies

### Backend Framework
- **Laravel 8.75+** - PHP web application framework
- **PHP 7.4+** - Server-side scripting language
- **Composer** - Dependency management for PHP

### Frontend Framework
- **React 18.3.1** - JavaScript library for building user interfaces
- **TypeScript 5.7.2** - Typed superset of JavaScript
- **Laravel Mix 6.0.6** - Asset compilation and webpack wrapper

### Database
- **MySQL** - Primary relational database
- **Eloquent ORM** - Laravel's ActiveRecord implementation
- **52+ Migrations** - Database schema version control

## Frontend Technologies

### UI Frameworks & Libraries
- **Tailwind CSS** - Utility-first CSS framework
- **Material-UI (MUI)** - React component library
- **shadcn/ui** - Radix UI + Tailwind components
- **Bootstrap 4.6** - CSS framework (legacy, being phased out)

### State Management
- **React Context API** - Global state management
- **Local Component State** - Form and UI state
- **No Redux/MobX** - Simplified state architecture

### Build Tools
- **Webpack** (via Laravel Mix) - Module bundler
- **Babel** - JavaScript compiler
- **PostCSS** - CSS processing

### JavaScript Libraries
- **Axios** - HTTP client with interceptors
- **i18next** - Internationalization framework
- **React Router DOM** - Declarative routing
- **React Hook Form** - Form validation and handling
- **date-fns** - Date utility library
- **cross-fetch** - Universal fetch API

## Backend Technologies

### Authentication & Security
- **Laravel Sanctum** - API token authentication
- **Multi-guard System** - Web and API authentication
- **CSRF Protection** - Built-in Laravel protection
- **bcrypt** - Password hashing

### Services & Processing
- **DOMPDF** - PDF generation for invoices
- **PHPMailer** - Email sending
- **Intervention Image** - Image manipulation
- **Laravel Queues** - Job processing (sync driver for cPanel)

### Development Tools
- **PHPUnit** - Testing framework
- **Laravel Debugbar** - Debug toolbar
- **Laravel IDE Helper** - IDE autocompletion

## DevOps & Infrastructure

### Hosting Environment
- **cPanel** - Web hosting control panel
- **Apache/LiteSpeed** - Web server
- **File-based Sessions** - Session storage
- **File-based Cache** - Cache storage

### Version Control
- **Git** - Source code management
- **GitHub** - Repository hosting

### Package Management
- **npm** - Node package manager
- **Composer** - PHP dependency manager

## Internationalization Stack

### Language Support
- **i18next** - Frontend translations
- **Laravel Localization** - Backend translations
- **Database Translations** - Dynamic content translations
- **Gemini Translation Service** - AI-powered translations

### Supported Languages
- English (en) - Primary
- French (fr)
- Spanish (es)

## External Service Integrations

### Email Services
- **SMTP** - Primary email delivery
- **Database Templates** - Dynamic email content

### AI Services
- **Google Gemini API** - Translation services
- **OpenAI** (potential) - AI features

### Payment Processing
- **Stripe** (configured but not fully implemented)
- **PayPal** (placeholder configuration)

## Development Environment

### Required Software
- **PHP 7.4+**
- **Node.js 14+**
- **MySQL 5.7+**
- **Composer 2.0+**

### Recommended Tools
- **VS Code** - IDE with Laravel/React extensions
- **phpMyAdmin** - Database management
- **Postman** - API testing
- **React DevTools** - React debugging

## Production Optimizations

### Performance
- **OPcache** - PHP bytecode caching
- **File caching** - Application cache
- **Asset minification** - JS/CSS optimization
- **Lazy loading** - Component code splitting

### Monitoring
- **Laravel Logs** - Application logging
- **Error tracking** - Custom error handlers
- **Email logs** - Communication tracking

## Technology Decisions

### Why This Stack?

1. **Laravel + React Hybrid**
   - Server-side routing with Laravel
   - Interactive components with React
   - SEO-friendly with SSR capabilities

2. **cPanel Compatibility**
   - Shared hosting friendly
   - No special server requirements
   - File-based storage systems

3. **Multi-language First**
   - Built-in i18n from the start
   - Database-driven translations
   - URL-based locale routing

### Trade-offs

**Advantages:**
- Mature, stable technologies
- Large community support
- cPanel hosting compatibility
- Strong i18n capabilities

**Limitations:**
- No real-time features (WebSockets)
- Synchronous processing only
- Full page refreshes (no SPA)
- Limited scalability on shared hosting

## Future Technology Considerations

### Potential Upgrades
- **Laravel 10+** - Framework modernization
- **Next.js** - Full-stack React framework
- **PostgreSQL** - Advanced database features
- **Redis** - Caching and queues

### Avoided Technologies
- **Node.js Backend** - Keeping PHP for stability
- **NoSQL Databases** - Relational data model preferred
- **Microservices** - Monolithic architecture for simplicity
- **Docker/Kubernetes** - cPanel deployment constraint