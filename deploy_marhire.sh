#\!/bin/bash
FTP_HOST="ftp.testdev.info"
FTP_USER="lfzeacipxyas"
FTP_PASS="HkgdXBgzicuy"
FTP_PORT="21"

echo "Starting FTP deployment to $FTP_HOST..."

lftp -c "set ftp:ssl-allow no; set ftp:passive-mode on; open -u $FTP_USER,$FTP_PASS -p $FTP_PORT $FTP_HOST; cd /public_html; lcd .; mirror -R --parallel=5 --exclude=.git/ --exclude=node_modules/ --exclude=tests/ --exclude=.env.example --exclude=deploy*.sh . .; bye"

echo "Upload complete\!"
EOF < /dev/null
