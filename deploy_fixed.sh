#!/bin/bash

# MarHire Deployment Script (Fixed)

echo "========================================="
echo "Starting MarHire Deployment..."
echo "========================================="

# Set the correct paths
PROJECT_DIR="/home/marhire.com/marhire"
PUBLIC_HTML="/home/marhire.com/public_html"

# Navigate to project directory
echo "🗂️ Navigating to project directory: $PROJECT_DIR"
cd "$PROJECT_DIR" || { echo "❌ Failed to navigate to project directory"; exit 1; }

# Pull latest changes
echo "📥 Pulling latest changes from Git..."
git pull origin main

# Install/Update composer dependencies
echo "📦 Installing Composer dependencies..."
composer install --no-dev --optimize-autoloader

# Run migrations
echo "🗄️ Running database migrations..."
php artisan migrate --force

# Copy public files to public_html
echo "📂 Copying public files to public_html..."
cp -r "$PROJECT_DIR/public/"* "$PUBLIC_HTML/"

# Create the correct index.php file
echo "📝 Creating index.php for Laravel..."
cat > "$PUBLIC_HTML/index.php" << 'EOF'
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

# Clear all Laravel caches
echo "🧹 Clearing Laravel caches..."
cd "$PROJECT_DIR"
php artisan config:clear
php artisan cache:clear
php artisan view:clear
php artisan route:clear
php artisan optimize:clear

# Clear compiled views
echo "🗑️ Clearing compiled views..."
rm -rf "$PROJECT_DIR/storage/framework/views/"*

# Set proper permissions
echo "🔒 Setting correct permissions..."
chmod -R 775 "$PROJECT_DIR/storage"
chmod -R 775 "$PROJECT_DIR/bootstrap/cache"
find "$PUBLIC_HTML" -type d -exec chmod 755 {} \;
find "$PUBLIC_HTML" -type f -exec chmod 644 {} \;

echo "========================================="
echo "✅ Deployment Complete!"
echo "========================================="
echo ""
echo "Your site should now be updated at http://marhire.com/"
echo ""