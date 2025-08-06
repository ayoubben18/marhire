# Database Dump Instructions

## File Information
- **File**: `marhire_complete_dump.sql`
- **Created**: August 6, 2025
- **Size**: ~215KB
- **Database**: MariaDB/MySQL

## How to Restore on Production Server

### 1. Upload the SQL file to your server
```bash
# Via git (after pushing to GitHub)
git pull origin main
```

### 2. BACKUP existing database (IMPORTANT!)
```bash
# Create a backup first in case you need to restore
mysqldump -u lfzeacipxyas_marhire_user -pHkgdXBgzicuy lfzeacipxyas_marhire > backup_$(date +%Y%m%d_%H%M%S).sql
```

### 3. Drop and recreate the database (CLEARS ALL DATA)
```bash
# Drop existing database
mysql -u lfzeacipxyas_marhire_user -pHkgdXBgzicuy -e "DROP DATABASE IF EXISTS lfzeacipxyas_marhire;"

# Create fresh database
mysql -u lfzeacipxyas_marhire_user -pHkgdXBgzicuy -e "CREATE DATABASE lfzeacipxyas_marhire;"
```

### 4. Import the database dump
```bash
mysql -u lfzeacipxyas_marhire_user -pHkgdXBgzicuy lfzeacipxyas_marhire < database/dumps/marhire_complete_dump.sql
```

### Alternative: One-liner clean import (USE WITH CAUTION)
```bash
# This will DROP the existing database and import fresh data
mysql -u lfzeacipxyas_marhire_user -pHkgdXBgzicuy -e "DROP DATABASE IF EXISTS lfzeacipxyas_marhire; CREATE DATABASE lfzeacipxyas_marhire;" && \
mysql -u lfzeacipxyas_marhire_user -pHkgdXBgzicuy lfzeacipxyas_marhire < database/dumps/marhire_complete_dump.sql
```

## Important Notes
- This dump includes all tables and data from the local development database
- Make sure to backup your production database before importing
- The dump includes table structure and all data
- Character set is UTF8MB4 for full Unicode support

## What's Included
- All listing data
- Cities and categories
- Agencies
- Booking configurations
- Pricing structures
- All seed data

## After Import
1. Clear Laravel cache: `php artisan cache:clear`
2. Clear config cache: `php artisan config:clear`
3. Run migrations if needed: `php artisan migrate`