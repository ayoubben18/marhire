# Development and Deployment

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
