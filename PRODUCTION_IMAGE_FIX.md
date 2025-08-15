# Production Image Upload Fix Guide

## Issue Summary
Images uploaded to the production server (PHP 8.1) are showing "Image unavailable" while they work correctly on the local development environment.

## Root Causes Identified and Fixed

### 1. **Code Bug Fixed** ✅
The backend API was incorrectly accessing a non-existent `image` property on the ListingGallery model. The correct property is `file_path`.

**Files Fixed:**
- `/app/Http/Controllers/ListingController.php` (line 1430)
- `/app/Http/Controllers/EntereController.php` (lines 227-228)

**Change:** 
```php
// Before (incorrect):
asset('images/listings/' . $listing->galleries[0]->image)

// After (correct):
asset($listing->galleries[0]->file_path)
```

### 2. **Production Server Checks Required**

Run the following checks on your production server:

#### A. Directory Permissions
```bash
# SSH into your server and run:
cd /path/to/your/public_html
ls -la public/images/listings/

# Should show permissions like: drwxr-xr-x (755)
# If not, fix with:
chmod 755 public/images/listings
```

#### B. Check PHP Extensions
Ensure these PHP extensions are enabled in cPanel:
- **gd** (with WebP support)
- **fileinfo**
- **exif** (optional but recommended)

In cPanel:
1. Go to "Select PHP Version"
2. Ensure PHP 8.1 is selected
3. Enable the extensions listed above
4. Click "Save"

#### C. Upload Limits
Check PHP configuration in cPanel:
- `upload_max_filesize`: Should be at least `2M`
- `post_max_size`: Should be at least `8M`
- `memory_limit`: Should be at least `128M`

### 3. **Deployment Steps**

1. **Upload Code Changes:**
   ```bash
   # Upload these modified files to production:
   - app/Http/Controllers/ListingController.php
   - app/Http/Controllers/EntereController.php
   - public/images/listings/.htaccess
   ```

2. **Clear Laravel Cache:**
   ```bash
   php artisan cache:clear
   php artisan config:clear
   php artisan route:clear
   php artisan view:clear
   ```

3. **Test Image Upload:**
   - Visit: `https://yourdomain.com/test-images.php?key=debug123`
   - This will show a comprehensive diagnostic report
   - **Delete test-images.php after testing!**

### 4. **Troubleshooting Checklist**

If images still don't work after the above steps:

- [ ] Check if existing images are accessible directly: `https://yourdomain.com/images/listings/[filename]`
- [ ] Check Laravel logs: `storage/logs/laravel.log`
- [ ] Verify database records have correct `file_path` values
- [ ] Check if server has mod_rewrite enabled
- [ ] Ensure no conflicting .htaccess rules in parent directories
- [ ] Verify the APP_URL in .env matches your production domain
- [ ] Check if storage symlink exists (if using storage disk)

### 5. **Quick Test Commands**

```bash
# Test if images directory is writable
php -r "echo is_writable('public/images/listings') ? 'Writable' : 'Not writable';"

# Test GD library
php -r "var_dump(gd_info());"

# Test WebP support
php -r "echo function_exists('imagewebp') ? 'WebP supported' : 'WebP not supported';"
```

### 6. **Alternative Solutions if WebP Fails**

If WebP is not supported on your server, you can modify `ImageProcessingService.php` to only save JPG/PNG:

```php
// In processImage() method, comment out WebP conversion:
// $webpSaved = imagewebp($resizedImage, $webpPath, 85);
// And modify the return to only use original format
```

### 7. **Security Notes**

- Always delete `test-images.php` after debugging
- Ensure directory permissions are 755, not 777
- Keep the .htaccess file in place to prevent directory browsing

## Contact Support

If issues persist after following this guide, check:
1. cPanel error logs
2. PHP error logs
3. Apache/Nginx error logs
4. Contact your hosting provider about GD library with WebP support

## Files Modified in This Fix

1. `/app/Http/Controllers/ListingController.php`
2. `/app/Http/Controllers/EntereController.php`
3. `/public/images/listings/.htaccess` (created)
4. `/public/test-images.php` (diagnostic tool - delete after use)