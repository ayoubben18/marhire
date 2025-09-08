# MarHire VPS Deployment Guide

## VPS Details
- URL: https://31.97.156.233:8090
- Username: admin
- VPS Code: uH9r#lJ2DoZExfXp:29%

## Prerequisites
1. Access the VPS control panel
2. Create a MySQL database
3. Set up web server (Apache/Nginx)
4. Ensure PHP 7.3+ is installed
5. Upload files via FTP/File Manager

## Database Setup
1. Create database: `marhire` (or similar name)
2. Import the database dump: `marhire_dump_20250831_155342.sql`
3. Note down database credentials

## File Upload Structure
```
public_html/
├── app/
├── bootstrap/
├── config/
├── database/
├── public/
├── resources/
├── routes/
├── storage/
├── vendor/
├── .env
├── artisan
├── composer.json
├── composer.lock
└── ...other files
```

## Environment Configuration
Update `.env` file with:
- Database credentials
- APP_URL (your domain)
- APP_ENV=production
- APP_DEBUG=false
- Mail settings

## Post-Deployment Steps
1. Set proper file permissions (755 for directories, 644 for files)
2. Make storage and bootstrap/cache writable (777)
3. Run `php artisan config:cache`
4. Run `php artisan route:cache`
5. Run `php artisan view:cache`
6. Test the application

## Required Folders to be Writable
- storage/
- bootstrap/cache/
- public/images/