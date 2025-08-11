<?php

// Test script to verify car listing creation validation

require_once __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$request = Illuminate\Http\Request::capture();
$kernel->handle($request);

use App\Services\CategoryValidationService;
use Illuminate\Http\Request;

// Create a mock request for car rental
$mockRequest = new Request([
    'category_id' => 2, // Car Rental
    'car_types' => [], // Empty array to test validation
]);

$service = new CategoryValidationService();

echo "Testing Car Rental Validation Rules:\n";
echo "=====================================\n\n";

// Get validation rules for car rental
$rules = $service->getValidationRules(2, $mockRequest);

// Check car_types validation
if (isset($rules['car_types'])) {
    echo "✓ car_types validation rule: " . $rules['car_types'] . "\n";
    
    // Parse the rule
    $carTypesRule = $rules['car_types'];
    if (strpos($carTypesRule, 'required') !== false) {
        echo "  → Field is REQUIRED\n";
    } else {
        echo "  → Field is OPTIONAL (sometimes)\n";
    }
    
    if (strpos($carTypesRule, 'array') !== false) {
        echo "  → Must be an ARRAY\n";
    }
    
    if (preg_match('/min:(\d+)/', $carTypesRule, $matches)) {
        echo "  → Minimum items: " . $matches[1] . "\n";
    }
} else {
    echo "✗ car_types validation rule NOT FOUND\n";
}

echo "\n";

// Test validation with empty array
echo "Testing with empty car_types array:\n";
$validator = \Validator::make(
    ['car_types' => []],
    ['car_types' => $rules['car_types'] ?? 'required|array|min:1']
);

if ($validator->fails()) {
    echo "✓ Validation FAILED (as expected)\n";
    echo "  Error: " . implode(', ', $validator->errors()->get('car_types')) . "\n";
} else {
    echo "✗ Validation PASSED (unexpected - should fail with empty array)\n";
}

echo "\n";

// Test validation with valid array
echo "Testing with valid car_types array:\n";
$validator = \Validator::make(
    ['car_types' => [1, 2, 3]],
    ['car_types' => 'required|array|min:1']
);

if ($validator->fails()) {
    echo "✗ Validation FAILED (unexpected)\n";
    echo "  Error: " . implode(', ', $validator->errors()->all()) . "\n";
} else {
    echo "✓ Validation PASSED (as expected)\n";
}

echo "\n";
echo "Validation test complete!\n";