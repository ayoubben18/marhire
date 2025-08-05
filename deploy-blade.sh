#\!/bin/bash
echo "Uploading updated blade template..."
scp -P 21098 resources/views/layouts/app.blade.php lfzeacipxyas@162.254.39.54:~/marhire/resources/views/layouts/

echo "Clearing view cache..."
ssh lfzeacipxyas@162.254.39.54 -p 21098 << 'SSHEOF'
cd ~/marhire
php artisan view:clear
php artisan cache:clear
echo "Cache cleared\!"
exit
SSHEOF

echo "Done\! Please refresh your browser with Ctrl+Shift+R"
