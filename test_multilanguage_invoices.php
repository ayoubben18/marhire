<?php

require_once 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Services\PDFService;
use App\Models\Booking;
use App\Services\Email\EmailService;

try {
    $pdfService = new PDFService();
    $emailService = app(\App\Services\Email\EmailServiceInterface::class);
    
    // Test data for all categories
    $testCategories = [
        2 => 'Car Rental',
        3 => 'Private Driver',
        4 => 'Boat Rental',
        5 => 'Activities'
    ];
    
    $testLocales = ['en', 'fr', 'es'];
    
    echo "\n=== Testing Multi-Language PDF Invoice Generation ===\n\n";
    
    // Find a sample booking for each category or create test data
    foreach ($testCategories as $categoryId => $categoryName) {
        echo "Testing Category: $categoryName (ID: $categoryId)\n";
        echo str_repeat('-', 50) . "\n";
        
        // Try to find a real booking or create test data
        $booking = Booking::where('category_id', $categoryId)->first();
        
        if (!$booking) {
            echo "  No booking found for this category, using test data\n";
            
            // Create test invoice data
            $invoiceData = [
                'booking_id' => 'TEST-' . $categoryId,
                'invoice_number' => 'INV-TEST-' . $categoryId,
                'invoice_date' => date('F d, Y'),
                'status' => 'Confirmed',
                'client_name' => 'Test Customer',
                'client_email' => 'test@example.com',
                'client_phone' => '+212 600 123456',
                'client_country' => 'Morocco',
                'service_name' => 'Test ' . $categoryName . ' Service',
                'booking_price' => 500.00,
                'total_addons' => 50.00,
                'discount_or_extra' => -25.00,
                'grand_total' => 525.00,
                'addons' => [
                    ['name' => 'GPS Navigation', 'price' => 30.00],
                    ['name' => 'Child Seat', 'price' => 20.00]
                ],
                'check_in' => date('Y-m-d'),
                'check_out' => date('Y-m-d', strtotime('+3 days')),
                'pickup_location' => 'Marrakech Airport',
                'dropoff_location' => 'Casablanca',
                'pickup_date' => date('Y-m-d'),
                'dropoff_date' => date('Y-m-d', strtotime('+3 days')),
                'pickup_time' => '10:00',
                'dropoff_time' => '14:00',
                'rental_duration' => '3 Days',
                'daily_rate' => 166.67,
                'transmission' => 'Automatic',
                'number_of_people' => 4,
                'company_name' => 'MarHire',
                'company_email' => 'info@marhire.com',
                'company_phone' => '+212 600 000000'
            ];
        } else {
            // Use reflection to access the private method
            $reflection = new \ReflectionClass($emailService);
            $method = $reflection->getMethod('prepareInvoiceData');
            $method->setAccessible(true);
            $invoiceData = $method->invoke($emailService, $booking);
            echo "  Using real booking ID: {$booking->id}\n";
        }
        
        // Test generation for each locale
        foreach ($testLocales as $locale) {
            try {
                $filename = "test-invoice-{$categoryId}-{$locale}.pdf";
                $path = "invoices/test/{$filename}";
                
                // Ensure test directory exists
                if (!Storage::exists('invoices/test')) {
                    Storage::makeDirectory('invoices/test');
                }
                
                // Generate the invoice
                $pdfPath = $pdfService->generateInvoice($invoiceData, $categoryId, $locale);
                
                // Copy to test location for easier access
                Storage::copy($pdfPath, $path);
                
                $fullPath = storage_path('app/' . $path);
                $fileSize = filesize($fullPath);
                
                echo "  ✓ {$locale}: Generated successfully - {$filename} ({$fileSize} bytes)\n";
            } catch (\Exception $e) {
                echo "  ✗ {$locale}: Failed - " . $e->getMessage() . "\n";
            }
        }
        
        echo "\n";
    }
    
    echo "=== Summary ===\n";
    echo "Test PDFs have been generated in: storage/app/invoices/test/\n";
    echo "You can review them to verify translations and formatting.\n\n";
    
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo "Stack trace:\n" . $e->getTraceAsString() . "\n";
}