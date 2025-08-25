<?php

// Database configuration
$host = 'localhost';
$db = 'marhire';
$user = 'root';
$pass = 'root';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Add common car type options
    $carTypeOptions = [
        'Luxury',
        'Economy', 
        'Cheap',
        'Compact',
        'Family'
    ];
    
    // Get the Car Type subcategory ID
    $stmt = $pdo->prepare("SELECT id FROM sub_categories WHERE subcategory = 'Car Type' AND id_category = 2");
    $stmt->execute();
    $carType = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($carType) {
        $subcategoryId = $carType['id'];
        
        foreach ($carTypeOptions as $option) {
            // Check if option already exists
            $checkStmt = $pdo->prepare("SELECT id FROM sub_category_options WHERE option = :option AND subcategory_id = :subcategory_id");
            $checkStmt->execute(['option' => $option, 'subcategory_id' => $subcategoryId]);
            
            if (!$checkStmt->fetch()) {
                // Insert the option
                $insertStmt = $pdo->prepare("INSERT INTO sub_category_options (option, subcategory_id, created_at, updated_at) VALUES (:option, :subcategory_id, NOW(), NOW())");
                $insertStmt->execute(['option' => $option, 'subcategory_id' => $subcategoryId]);
                echo "Added: $option\n";
            } else {
                echo "Already exists: $option\n";
            }
        }
    }
    
    echo "Done!\n";
    
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage() . "\n";
}