# High Level Architecture

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
