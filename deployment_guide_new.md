# MarHire VPS Deployment Guide

## SSH Access Setup

### 1. Generate SSH Keys
```bash
ssh-keygen -t rsa -b 4096 -C "ayoub@marhire-vps" -f ~/.ssh/marhire_vps -N ""
```

### 2. Add SSH Key to CyberPanel
1. Login to CyberPanel: https://31.97.156.233:8090
2. Go to Security → Secure SSH → SSH Keys tab
3. Click "Add Key" and paste the public key:
```bash
cat ~/.ssh/marhire_vps.pub
```

### 3. SSH Connection
```bash
# Direct connection
ssh -i ~/.ssh/marhire_vps root@31.97.156.233

# Or use the configured alias
ssh marhire-vps
```

## Server Information
- **IP**: 31.97.156.233
- **User**: root
- **Hostname**: srv877627.hstgr.cloud
- **SSH Key**: ~/.ssh/marhire_vps

## Database Credentials
```
DB_HOST=127.0.0.1
DB_DATABASE=marh_main
DB_USERNAME=marh_root
DB_PASSWORD=+jpDKkflrN%m-@w4
```

## Deployment Script

### Fixed Deployment Script Location
`/home/marhire.com/deploy.sh`

### Key Fixes Applied:
- **Correct Paths**: Uses `/home/marhire.com/marhire/` instead of `/root/marhire/`
- **PHP 8.1**: Uses `/usr/local/lsws/lsphp81/bin/php` instead of default PHP 8.0
- **Composer**: Set `COMPOSER_ALLOW_SUPERUSER=1`
- **Git**: Added safe directory exception

### Run Deployment
```bash
cd /home/marhire.com
./deploy.sh
```

## Database Management

### Connect to Database
```bash
mysql -u marh_root -p'+jpDKkflrN%m-@w4' marh_main
```

### Clear Specific Tables (Keep Structure)
```bash
mysql -u marh_root -p'+jpDKkflrN%m-@w4' marh_main -e "
SET FOREIGN_KEY_CHECKS = 0;
DELETE FROM email_logs WHERE booking_id IS NOT NULL;
DELETE FROM bookings;
DELETE FROM listings;
DELETE FROM articles;
DELETE FROM agencies;
SET FOREIGN_KEY_CHECKS = 1;
"
```

### Reset Database with Dump
```bash
# Drop all tables
mysql -u marh_root -p'+jpDKkflrN%m-@w4' marh_main -e "
SET FOREIGN_KEY_CHECKS = 0;
SELECT CONCAT('DROP TABLE IF EXISTS \`', table_name, '\`;') 
FROM information_schema.tables 
WHERE table_schema = 'marh_main';" | grep "DROP TABLE" > /tmp/drop_tables.sql

mysql -u marh_root -p'+jpDKkflrN%m-@w4' marh_main < /tmp/drop_tables.sql

# Import new dump
mysql -u marh_root -p'+jpDKkflrN%m-@w4' marh_main < your_dump_file.sql
```

## Common Issues & Solutions

### HTTP 500 Error
**Problem**: Escaped dollar signs in `/home/marhire.com/public_html/index.php`

**Solution**: Fix the index.php file:
```bash
cat > /home/marhire.com/public_html/index.php << 'EOF'
<?php

use Illuminate\Contracts\Http\Kernel;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

if (file_exists($maintenance = __DIR__.'/../marhire/storage/framework/maintenance.php')) {
    require $maintenance;
}

require __DIR__.'/../marhire/vendor/autoload.php';

$app = require_once __DIR__.'/../marhire/bootstrap/app.php';

$kernel = $app->make(Kernel::class);

$response = $kernel->handle(
    $request = Request::capture()
)->send();

$kernel->terminate($request, $response);
EOF
```

### PHP Version Issues
- Web server uses PHP 8.0 by default
- Deployment script uses PHP 8.1: `/usr/local/lsws/lsphp81/bin/php`
- Laravel requires PHP 8.1+

### Git Ownership Issues
```bash
git config --global --add safe.directory /home/marhire.com/marhire
```

## Quick Commands Reference

### Check Website Status
```bash
# Laravel logs
tail -50 /home/marhire.com/marhire/storage/logs/laravel.log

# Web server logs
tail -50 /home/marhire.com/logs/marhire.com.error_log

# Test artisan
cd /home/marhire.com/marhire
/usr/local/lsws/lsphp81/bin/php artisan --version
```

### File Locations
- **Laravel Project**: `/home/marhire.com/marhire/`
- **Public Files**: `/home/marhire.com/public_html/`
- **Deploy Script**: `/home/marhire.com/deploy.sh`
- **Logs**: `/home/marhire.com/logs/`