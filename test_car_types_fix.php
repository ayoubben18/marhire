<?php

// Test to verify car_types are handled as integers

$testData = [
    'Empty array' => [],
    'Array with empty string' => [''],
    'Array with string numbers' => ['1', '2', '3'],
    'Array with mixed' => ['', '1', '2', '', '3'],
    'Array with zero' => ['0', '1', '2'],
];

foreach ($testData as $label => $input) {
    echo "\nTesting: $label\n";
    echo "Input: " . json_encode($input) . "\n";
    
    // Filter out empty values
    $filtered = array_filter($input, function($value) {
        return !empty($value) && $value !== '' && $value !== '0';
    });
    
    // Cast to integers and re-index
    $integerTypes = array_map('intval', array_values($filtered));
    
    echo "Output: " . json_encode($integerTypes) . "\n";
    echo "Valid: " . (count($integerTypes) > 0 ? 'Yes' : 'No (will fail validation)') . "\n";
}

echo "\n--- Testing validation ---\n";

// Simulate what happens with checkbox values
$checkboxValues = ['1', '2', '3']; // These come as strings from HTML forms
echo "Checkbox values (strings): " . json_encode($checkboxValues) . "\n";

$processed = array_map('intval', $checkboxValues);
echo "After intval: " . json_encode($processed) . "\n";

foreach ($processed as $value) {
    echo "  - Value: $value, Type: " . gettype($value) . ", Is Integer: " . (is_int($value) ? 'Yes' : 'No') . "\n";
}