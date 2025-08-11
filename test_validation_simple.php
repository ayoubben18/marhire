<?php

// Simple test to check if validation service is configured correctly

require_once __DIR__ . '/vendor/autoload.php';

// Bootstrap minimal Laravel app
$app = new \Illuminate\Foundation\Application(
    $_ENV['APP_BASE_PATH'] ?? dirname(__DIR__)
);

$app->singleton(
    Illuminate\Contracts\Http\Kernel::class,
    App\Http\Kernel::class
);

$app->singleton(
    Illuminate\Contracts\Console\Kernel::class,
    App\Console\Kernel::class
);

$app->singleton(
    Illuminate\Contracts\Debug\ExceptionHandler::class,
    App\Exceptions\Handler::class
);

$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Services\CategoryValidationService;

echo "Testing CategoryValidationService for Car Rental\n";
echo "=================================================\n\n";

$service = new CategoryValidationService();

// Use reflection to access private method
$reflection = new ReflectionClass($service);
$method = $reflection->getMethod('getCarRentalValidationRules');
$method->setAccessible(true);

$rules = $method->invoke($service, null);

echo "Car Rental Validation Rules:\n";
echo "----------------------------\n";

// Check car_types rule
if (isset($rules['car_types'])) {
    echo "✓ car_types: " . $rules['car_types'] . "\n";
    
    if (strpos($rules['car_types'], 'required') !== false) {
        echo "  ✓ Field is REQUIRED (good!)\n";
    } else {
        echo "  ✗ Field is NOT required (should be required)\n";
    }
} else {
    echo "✗ car_types rule not found!\n";
}

// Check other important fields
$importantFields = ['car_model', 'year', 'transmission', 'fuel_type', 'seats', 'doors'];
foreach ($importantFields as $field) {
    if (isset($rules[$field])) {
        echo "✓ $field: " . substr($rules[$field], 0, 50) . "...\n";
    } else {
        echo "✗ $field: NOT FOUND\n";
    }
}

echo "\nValidation configuration check complete!\n";