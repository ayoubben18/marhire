#!/bin/bash

# FTP Configuration
FTP_HOST="ftp.testdev.info"
FTP_USER="lfzeacipxyas"
FTP_PASS="HkgdXBgzicuy"
FTP_PORT="21"

echo "Starting FTP deployment to $FTP_HOST..."
echo "This will upload your Laravel application to public_html"

# Use lftp to upload files
lftp -c "
set ftp:ssl-allow no
set ftp:passive-mode on
set mirror:use-pget-n 5
open -u $FTP_USER,$FTP_PASS -p $FTP_PORT $FTP_HOST
cd /public_html
lcd .
mirror -R --parallel=5 \
  --exclude=.git/ \
  --exclude=node_modules/ \
  --exclude=tests/ \
  --exclude=.env.example \
  --exclude=.env.local \
  --exclude=deploy_ftp.sh \
  --exclude=deploy_ftp_simple.sh \
  --exclude=.gitignore \
  --exclude=README.md \
  --exclude=phpunit.xml \
  --exclude=.editorconfig \
  --exclude=.styleci.yml \
  --exclude=server.php \
  . .
bye
"

echo "Upload complete!"