# Integration Points and External Dependencies

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
