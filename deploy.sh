#!/bin/bash
FTP_HOST="162.254.39.54"
FTP_USER="lfzeacipxyas"
FTP_PASS="HkgdXBgzicuy"
echo "Starting deployment..."
lftp -e "set ftp:ssl-allow no; mirror -R --parallel=5 --exclude-glob=.git/* --exclude-glob=node_modules/* --exclude-glob=tests/* . /public_html/; bye" -u $FTP_USER,$FTP_PASS $FTP_HOST
echo "Deployment complete!"