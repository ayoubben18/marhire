#!/bin/bash

# Production Image Fix Script
# This script fixes all image-related issues on the production server
# Run with: bash fix_production_images.sh

echo "========================================="
echo "  PRODUCTION IMAGE FIX SCRIPT"
echo "========================================="
echo ""

# Check if we're in the right directory
if [ ! -f "artisan" ]; then
    echo "Error: This script must be run from the Laravel root directory"
    echo "Please cd to your Laravel application directory and run again"
    exit 1
fi

# Step 1: Run the PHP fix script
echo "Step 1: Running image fix script..."
echo "------------------------------------"
php fix_production_images.php

if [ $? -ne 0 ]; then
    echo "Error: PHP script failed to execute"
    echo "Please check PHP is installed and working"
    exit 1
fi

# Step 2: Clear Laravel caches
echo ""
echo "Step 2: Clearing Laravel caches..."
echo "-----------------------------------"
php artisan cache:clear
php artisan config:clear
php artisan view:clear
php artisan route:clear

# Step 3: Rebuild assets if needed
echo ""
echo "Step 3: Checking for asset compilation..."
echo "------------------------------------------"
if [ -f "package.json" ]; then
    echo "Found package.json - Compiling assets..."
    if command -v npm &> /dev/null; then
        npm run production
    else
        echo "Warning: npm not found - skipping asset compilation"
        echo "You may need to run 'npm run production' manually"
    fi
else
    echo "No package.json found - skipping asset compilation"
fi

# Step 4: Set proper ownership (adjust user:group as needed)
echo ""
echo "Step 4: Setting file ownership..."
echo "----------------------------------"
# Get the web server user (usually www-data on Ubuntu/Debian, apache on CentOS/RHEL)
WEB_USER="www-data"
if id "apache" &>/dev/null; then
    WEB_USER="apache"
fi

echo "Setting ownership to $WEB_USER for storage and images..."
sudo chown -R $WEB_USER:$WEB_USER storage/
sudo chown -R $WEB_USER:$WEB_USER public/images/
sudo chmod -R 755 storage/
sudo chmod -R 755 public/images/

# Step 5: Restart services if needed
echo ""
echo "Step 5: Restarting services..."
echo "-------------------------------"

# Check and restart PHP-FPM
if systemctl is-active --quiet php*-fpm; then
    echo "Restarting PHP-FPM..."
    sudo systemctl restart php*-fpm
elif systemctl is-active --quiet php-fpm; then
    echo "Restarting PHP-FPM..."
    sudo systemctl restart php-fpm
fi

# Check and restart Apache if it's running
if systemctl is-active --quiet apache2; then
    echo "Restarting Apache..."
    sudo systemctl restart apache2
elif systemctl is-active --quiet httpd; then
    echo "Restarting Apache..."
    sudo systemctl restart httpd
fi

# Check and restart Nginx if it's running
if systemctl is-active --quiet nginx; then
    echo "Restarting Nginx..."
    sudo systemctl restart nginx
fi

echo ""
echo "========================================="
echo "  SCRIPT COMPLETED!"
echo "========================================="
echo ""
echo "✅ All image fixes have been applied"
echo ""
echo "Please check your website to verify images are displaying correctly."
echo ""
echo "If you still have issues:"
echo "1. Check the browser console for errors"
echo "2. Verify file permissions: ls -la public/images/listings/"
echo "3. Check your web server error logs"
echo "4. Ensure GD library with WebP support is installed"
echo ""