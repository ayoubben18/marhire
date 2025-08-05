#!/bin/bash

echo "🚀 Deploying compiled assets to server..."

# Upload compiled JavaScript
echo "📦 Uploading JavaScript files..."
scp -P 21098 public/js/dashboard.js public/js/dashboard.js.LICENSE.txt lfzeacipxyas@162.254.39.54:~/public_html/js/

# Upload compiled CSS
echo "🎨 Uploading CSS files..."
scp -P 21098 public/css/tailwind.css lfzeacipxyas@162.254.39.54:~/public_html/css/

# Upload mix manifest (IMPORTANT for versioning)
echo "📋 Uploading mix-manifest.json..."
scp -P 21098 public/mix-manifest.json lfzeacipxyas@162.254.39.54:~/public_html/

# Clear server cache
echo "🧹 Clearing server cache..."
ssh lfzeacipxyas@162.254.39.54 -p 21098 << 'EOF'
cd ~/marhire
php artisan cache:clear
php artisan config:clear
php artisan view:clear
echo "✅ Cache cleared successfully"
exit
EOF

echo "✅ Deployment complete! Please refresh your browser with Ctrl+Shift+R"