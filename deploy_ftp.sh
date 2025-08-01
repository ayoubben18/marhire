#!/bin/bash

# FTP Configuration
FTP_HOST="ftp.testdev.info"
FTP_USER="lfzeacipxyas"
FTP_PASS="HkgdXBgzicuy"
FTP_PORT="21"
REMOTE_DIR="/public_html"

echo "Starting FTP deployment to $FTP_HOST..."

# Create a list of files to exclude
cat > .ftpignore << EOF
.git
.gitignore
.env.example
.env.local
.env.testing
.phpunit.result.cache
docker-compose.yml
tests
phpunit.xml
README.md
deploy_ftp.sh
.ftpignore
storage/app/*
storage/framework/cache/*
storage/framework/sessions/*
storage/framework/testing/*
storage/framework/views/*
storage/logs/*
bootstrap/cache/*
node_modules
.idea
.vscode
.DS_Store
Thumbs.db
vendor
EOF

# First, let's clear the public_html directory (backup first)
echo "Backing up and clearing public_html directory..."

lftp -c "
set ftp:ssl-allow no
open -u $FTP_USER,$FTP_PASS -p $FTP_PORT $FTP_HOST
cd $REMOTE_DIR
mkdir -p backup_$(date +%Y%m%d_%H%M%S)
mirror -R --parallel=5 --exclude-glob .git/ --exclude-glob node_modules/ --exclude-glob vendor/ --exclude-glob storage/logs/* --exclude-glob storage/framework/cache/* --exclude-glob storage/framework/sessions/* --exclude-glob storage/framework/views/* --exclude-glob bootstrap/cache/* --exclude-glob .env.example --exclude-glob .env.local --exclude-glob tests/ --exclude-glob deploy_ftp.sh --exclude-glob .ftpignore . $REMOTE_DIR/
bye
"

echo "Upload complete!"
echo ""
echo "Next steps:"
echo "1. Go to cPanel > MySQL Databases"
echo "2. Create a database and user"
echo "3. Update the .env file on the server with the database credentials"
echo "4. Run migrations using a cron job or through cPanel Terminal (if available)"
echo "5. Set proper permissions (755 for directories, 644 for files)"
echo "6. Configure document root to point to public/ directory"

# Clean up
rm .ftpignore