-- Production Database Image Path Fix
-- This SQL script fixes image paths in the database
-- Run this directly in MySQL/MariaDB if needed

-- Fix listing_galleries table - add leading slash to file_path
UPDATE listing_galleries 
SET file_path = CONCAT('/', file_path)
WHERE file_path IS NOT NULL 
  AND file_path != ''
  AND file_path NOT LIKE '/%'
  AND file_path NOT LIKE 'http%';

-- Fix listing_galleries table - add leading slash to file_name if it exists
UPDATE listing_galleries 
SET file_name = CONCAT('/', file_name)
WHERE file_name IS NOT NULL 
  AND file_name != ''
  AND file_name NOT LIKE '/%'
  AND file_name NOT LIKE 'http%';

-- If listings table has an image column, fix it too
-- (This may not exist in all installations)
UPDATE listings 
SET image = CONCAT('/', image)
WHERE image IS NOT NULL 
  AND image != ''
  AND image NOT LIKE '/%'
  AND image NOT LIKE 'http%';

-- Show results
SELECT 'Fixed image paths in database' as Status;
SELECT COUNT(*) as 'Total Gallery Images' FROM listing_galleries WHERE file_path IS NOT NULL AND file_path != '';
SELECT COUNT(*) as 'Images with correct path' FROM listing_galleries WHERE file_path LIKE '/%';