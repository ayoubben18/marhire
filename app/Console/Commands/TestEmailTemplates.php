<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Booking;
use App\Services\Email\EmailService;

class TestEmailTemplates extends Command
{
    protected $signature = 'test:email-templates {booking_id? : The booking ID to test with}';
    protected $description = 'Test email templates for all booking states';

    protected $emailService;

    public function __construct(EmailService $emailService)
    {
        parent::__construct();
        $this->emailService = $emailService;
    }

    public function handle()
    {
        $bookingId = $this->argument('booking_id');
        
        if ($bookingId) {
            $booking = Booking::with(['listing.city', 'addons.addon', 'city'])->find($bookingId);
            if (!$booking) {
                $this->error("Booking with ID {$bookingId} not found.");
                return 1;
            }
        } else {
            // Get the most recent booking
            $booking = Booking::with(['listing.city', 'addons.addon', 'city'])->latest()->first();
            if (!$booking) {
                $this->error("No bookings found in the database.");
                return 1;
            }
        }

        $this->info("Testing email templates with Booking ID: {$booking->id}");
        $this->info("Booking Status: {$booking->status}");
        $this->info("Customer: {$booking->name} ({$booking->email})");
        
        // Test variable replacement
        $this->info("\n--- Testing Variable Replacement ---");
        $testText = "Hello {{client_name}}, your booking {{invoice_no}} for {{service}} from {{start_location}} on {{start_date_time}} to {{end_location}} on {{end_date_time}} is {{currency}} {{total}}.";
        
        $replacedText = $this->replaceVariables($testText, $booking);
        $this->info("Original: {$testText}");
        $this->info("Replaced: {$replacedText}");
        
        // Test each email type
        $this->info("\n--- Testing Email Templates ---");
        
        $emailTypes = [
            'booking_received' => 'Pending',
            'booking_confirmed' => 'Confirmed', 
            'booking_cancelled' => 'Cancelled'
        ];
        
        foreach ($emailTypes as $emailType => $requiredStatus) {
            $this->info("\nTesting {$emailType} (requires status: {$requiredStatus}):");
            
            // Check if current booking status matches required status
            if (strtolower($booking->status) === strtolower($requiredStatus)) {
                $this->info("✓ Status matches - email can be sent");
                
                // Test variable replacement for this email type
                $variables = $this->getVariablesForBooking($booking);
                $this->table(['Variable', 'Value'], array_map(function($key, $value) {
                    return [$key, $value];
                }, array_keys($variables), array_values($variables)));
                
            } else {
                $this->warn("✗ Status mismatch - current status is {$booking->status}, but {$requiredStatus} is required");
            }
        }
        
        return 0;
    }
    
    private function replaceVariables($text, $booking)
    {
        // Load necessary relationships
        $booking->load(['listing.city', 'addons.addon', 'city']);
        
        // Handle date formatting properly
        $checkInDate = $booking->check_in;
        $checkOutDate = $booking->check_out;
        $checkInTime = '10:00'; // Default time
        $checkOutTime = '10:00'; // Default time
        
        // Format dates if they exist
        if ($checkInDate) {
            $checkInCarbon = \Carbon\Carbon::parse($checkInDate);
            $checkInDateFormatted = $checkInCarbon->format('M d, Y');
            // Extract time if available
            if ($checkInCarbon->format('H:i') !== '00:00') {
                $checkInTime = $checkInCarbon->format('H:i');
            }
        } else {
            $checkInDateFormatted = 'N/A';
        }
        
        if ($checkOutDate) {
            $checkOutCarbon = \Carbon\Carbon::parse($checkOutDate);
            $checkOutDateFormatted = $checkOutCarbon->format('M d, Y');
            // Extract time if available
            if ($checkOutCarbon->format('H:i') !== '00:00') {
                $checkOutTime = $checkOutCarbon->format('H:i');
            }
        } else {
            $checkOutDateFormatted = 'N/A';
        }
        
        // Get start and end locations based on booking category
        $startLocation = 'N/A';
        $endLocation = 'N/A';
        
        // Check if it's a car rental (category_id = 2) which uses pickup/dropoff locations
        if ($booking->category_id == 2) {
            // Try to resolve pickup location - it might be a city ID or a string
            if (is_numeric($booking->pickup_location)) {
                $pickupCity = \App\Models\City::find($booking->pickup_location);
                $startLocation = $pickupCity ? $pickupCity->city_name : 'N/A';
            } else {
                $startLocation = $booking->pickup_location ?? 'N/A';
            }
            
            // Try to resolve dropoff location
            if ($booking->droppoff_location) {
                if (is_numeric($booking->droppoff_location)) {
                    $dropoffCity = \App\Models\City::find($booking->droppoff_location);
                    $endLocation = $dropoffCity ? $dropoffCity->city_name : $startLocation;
                } else {
                    $endLocation = $booking->droppoff_location;
                }
            } else {
                $endLocation = $startLocation;
            }
        } elseif ($booking->listing && $booking->listing->city) {
            // For other categories, use the listing's city
            $startLocation = $booking->listing->city->city_name ?? 'N/A';
            $endLocation = $startLocation;
        } elseif ($booking->city) {
            // Fallback to booking's city if available
            $startLocation = $booking->city->city_name ?? 'N/A';
            $endLocation = $startLocation;
        }
        
        // Get client phone (prioritize WhatsApp number)
        $clientPhone = $booking->whatsapp ?? $booking->whatsapp_number ?? 'N/A';
        
        // Get date of birth
        $clientDob = 'N/A';
        if ($booking->date_of_birth) {
            $clientDob = \Carbon\Carbon::parse($booking->date_of_birth)->format('Y-m-d');
        }
        
        // Get client note
        $clientNote = $booking->notes ?? $booking->additional_notes ?? 'N/A';
        
        // Format currency
        $currency = 'EUR';
        
        $replacements = [
            '{{client_name}}' => $booking->name,
            '{{client_email}}' => $booking->email,
            '{{client_phone}}' => $clientPhone,
            '{{client_dob}}' => $clientDob,
            '{{client_note}}' => $clientNote,
            '{{booking_reference}}' => $booking->invoice_no ?: 'N/A',
            '{{invoice_no}}' => $booking->invoice_no ?: 'N/A',
            '{{booking_id}}' => $booking->id,
            '{{listing_title}}' => $booking->listing->title ?? 'N/A',
            '{{service}}' => $booking->listing->title ?? 'N/A',
            '{{total_amount}}' => number_format($booking->total_amount, 2),
            '{{total}}' => number_format($booking->total_amount, 2),
            '{{currency}}' => $currency,
            '{{admin_email}}' => 'info@marhire.com',
            '{{check_in_date}}' => $checkInDateFormatted,
            '{{check_out_date}}' => $checkOutDateFormatted,
            '{{check_in}}' => $checkInDateFormatted,
            '{{check_out}}' => $checkOutDateFormatted,
            '{{start_date_time}}' => $checkInDateFormatted . ' at ' . $checkInTime,
            '{{end_date_time}}' => $checkOutDateFormatted . ' at ' . $checkOutTime,
            '{{start_location}}' => $startLocation,
            '{{end_location}}' => $endLocation,
        ];
        
        return str_replace(array_keys($replacements), array_values($replacements), $text);
    }
    
    private function getVariablesForBooking($booking)
    {
        // Load necessary relationships
        $booking->load(['listing.city', 'addons.addon', 'city']);
        
        // Handle date formatting properly
        $checkInDate = $booking->check_in;
        $checkOutDate = $booking->check_out;
        $checkInTime = '10:00'; // Default time
        $checkOutTime = '10:00'; // Default time
        
        // Format dates if they exist
        if ($checkInDate) {
            $checkInCarbon = \Carbon\Carbon::parse($checkInDate);
            $checkInDateFormatted = $checkInCarbon->format('M d, Y');
            // Extract time if available
            if ($checkInCarbon->format('H:i') !== '00:00') {
                $checkInTime = $checkInCarbon->format('H:i');
            }
        } else {
            $checkInDateFormatted = 'N/A';
        }
        
        if ($checkOutDate) {
            $checkOutCarbon = \Carbon\Carbon::parse($checkOutDate);
            $checkOutDateFormatted = $checkOutCarbon->format('M d, Y');
            // Extract time if available
            if ($checkOutCarbon->format('H:i') !== '00:00') {
                $checkOutTime = $checkOutCarbon->format('H:i');
            }
        } else {
            $checkOutDateFormatted = 'N/A';
        }
        
        // Get start and end locations based on booking category
        $startLocation = 'N/A';
        $endLocation = 'N/A';
        
        // Check if it's a car rental (category_id = 2) which uses pickup/dropoff locations
        if ($booking->category_id == 2) {
            // Try to resolve pickup location - it might be a city ID or a string
            if (is_numeric($booking->pickup_location)) {
                $pickupCity = \App\Models\City::find($booking->pickup_location);
                $startLocation = $pickupCity ? $pickupCity->city_name : 'N/A';
            } else {
                $startLocation = $booking->pickup_location ?? 'N/A';
            }
            
            // Try to resolve dropoff location
            if ($booking->droppoff_location) {
                if (is_numeric($booking->droppoff_location)) {
                    $dropoffCity = \App\Models\City::find($booking->droppoff_location);
                    $endLocation = $dropoffCity ? $dropoffCity->city_name : $startLocation;
                } else {
                    $endLocation = $booking->droppoff_location;
                }
            } else {
                $endLocation = $startLocation;
            }
        } elseif ($booking->listing && $booking->listing->city) {
            // For other categories, use the listing's city
            $startLocation = $booking->listing->city->city_name ?? 'N/A';
            $endLocation = $startLocation;
        } elseif ($booking->city) {
            // Fallback to booking's city if available
            $startLocation = $booking->city->city_name ?? 'N/A';
            $endLocation = $startLocation;
        }
        
        // Get client phone (prioritize WhatsApp number)
        $clientPhone = $booking->whatsapp ?? $booking->whatsapp_number ?? 'N/A';
        
        // Get date of birth
        $clientDob = 'N/A';
        if ($booking->date_of_birth) {
            $clientDob = \Carbon\Carbon::parse($booking->date_of_birth)->format('Y-m-d');
        }
        
        // Get client note
        $clientNote = $booking->notes ?? $booking->additional_notes ?? 'N/A';
        
        // Format currency
        $currency = 'EUR';
        
        return [
            '{{client_name}}' => $booking->name,
            '{{client_email}}' => $booking->email,
            '{{client_phone}}' => $clientPhone,
            '{{client_dob}}' => $clientDob,
            '{{client_note}}' => $clientNote,
            '{{booking_reference}}' => $booking->invoice_no ?: 'N/A',
            '{{invoice_no}}' => $booking->invoice_no ?: 'N/A',
            '{{booking_id}}' => $booking->id,
            '{{listing_title}}' => $booking->listing->title ?? 'N/A',
            '{{service}}' => $booking->listing->title ?? 'N/A',
            '{{total_amount}}' => number_format($booking->total_amount, 2),
            '{{total}}' => number_format($booking->total_amount, 2),
            '{{currency}}' => $currency,
            '{{start_date_time}}' => $checkInDateFormatted . ' at ' . $checkInTime,
            '{{end_date_time}}' => $checkOutDateFormatted . ' at ' . $checkOutTime,
            '{{start_location}}' => $startLocation,
            '{{end_location}}' => $endLocation,
        ];
    }
}