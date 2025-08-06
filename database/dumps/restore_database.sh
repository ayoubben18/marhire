#!/bin/bash

# Database Restore Script for MarHire Production
# WARNING: This will DROP and recreate the database!

# Configuration
DB_USER="lfzeacipxyas_marhire_user"
DB_PASS="HkgdXBgzicuy"
DB_NAME="lfzeacipxyas_marhire"
DUMP_FILE="database/dumps/marhire_complete_dump.sql"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}MarHire Database Restore Script${NC}"
echo "================================"
echo ""
echo -e "${RED}WARNING: This will DELETE all existing data in the database!${NC}"
echo ""
read -p "Do you want to create a backup first? (y/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    BACKUP_FILE="backup_$(date +%Y%m%d_%H%M%S).sql"
    echo -e "${GREEN}Creating backup: $BACKUP_FILE${NC}"
    mysqldump -u "$DB_USER" -p"$DB_PASS" "$DB_NAME" > "$BACKUP_FILE" 2>/dev/null
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Backup created successfully!${NC}"
    else
        echo -e "${YELLOW}Backup may have failed (database might not exist yet)${NC}"
    fi
fi

echo ""
read -p "Are you sure you want to DROP and recreate the database? (yes/no): " -r
echo ""

if [[ $REPLY != "yes" ]]; then
    echo -e "${YELLOW}Operation cancelled.${NC}"
    exit 1
fi

echo -e "${YELLOW}Step 1: Dropping existing database...${NC}"
mysql -u "$DB_USER" -p"$DB_PASS" -e "DROP DATABASE IF EXISTS $DB_NAME;" 2>/dev/null

echo -e "${YELLOW}Step 2: Creating fresh database...${NC}"
mysql -u "$DB_USER" -p"$DB_PASS" -e "CREATE DATABASE $DB_NAME;" 2>/dev/null

if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to create database. Check your credentials.${NC}"
    exit 1
fi

echo -e "${YELLOW}Step 3: Importing database dump...${NC}"
mysql -u "$DB_USER" -p"$DB_PASS" "$DB_NAME" < "$DUMP_FILE" 2>/dev/null

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Database restored successfully!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Clear Laravel cache: php artisan cache:clear"
    echo "2. Clear config cache: php artisan config:clear"
    echo "3. Restart your web server if needed"
else
    echo -e "${RED}Failed to import database dump.${NC}"
    exit 1
fi