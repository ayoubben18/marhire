<?php

echo "PHP Upload Configuration:\n";
echo "=========================\n\n";

echo "upload_max_filesize: " . ini_get('upload_max_filesize') . "\n";
echo "post_max_size: " . ini_get('post_max_size') . "\n";
echo "max_file_uploads: " . ini_get('max_file_uploads') . "\n";
echo "max_input_time: " . ini_get('max_input_time') . " seconds\n";
echo "max_execution_time: " . ini_get('max_execution_time') . " seconds\n";
echo "memory_limit: " . ini_get('memory_limit') . "\n";

echo "\n";
echo "Calculated Limits:\n";
echo "==================\n";

function return_bytes($val) {
    $val = trim($val);
    $last = strtolower($val[strlen($val)-1]);
    $val = (int)$val;
    switch($last) {
        case 'g':
            $val *= 1024;
        case 'm':
            $val *= 1024;
        case 'k':
            $val *= 1024;
    }
    return $val;
}

$upload_max = return_bytes(ini_get('upload_max_filesize'));
$post_max = return_bytes(ini_get('post_max_size'));

echo "Max single file size: " . ($upload_max / 1024 / 1024) . " MB\n";
echo "Max total POST size: " . ($post_max / 1024 / 1024) . " MB\n";
echo "Max number of files: " . ini_get('max_file_uploads') . "\n";

echo "\nFor multiple 5MB images:\n";
echo "========================\n";
$max_images_by_post = floor($post_max / (5 * 1024 * 1024));
$max_images_by_count = (int)ini_get('max_file_uploads');
$practical_max = min($max_images_by_post, $max_images_by_count);

echo "Max images (limited by post_max_size): " . $max_images_by_post . "\n";
echo "Max images (limited by max_file_uploads): " . $max_images_by_count . "\n";
echo "Practical maximum 5MB images: " . $practical_max . "\n";

if ($practical_max < 5) {
    echo "\n⚠️  WARNING: Low upload limits! You may only be able to upload " . $practical_max . " images at once.\n";
}