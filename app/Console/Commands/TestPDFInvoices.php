<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Booking;
use App\Services\PDFService;
use App\Services\Email\EmailService;

class TestPDFInvoices extends Command
{
    protected $signature = 'test:pdf-invoices {booking_id? : The booking ID to test with}';
    protected $description = 'Test PDF invoice generation for different categories';

    protected $pdfService;
    protected $emailService;

    public function __construct(PDFService $pdfService, EmailService $emailService)
    {
        parent::__construct();
        $this->pdfService = $pdfService;
        $this->emailService = $emailService;
    }

    public function handle()
    {
        $bookingId = $this->argument('booking_id');
        
        if ($bookingId) {
            // Test with specific booking
            $booking = Booking::with(['listing', 'addons.addon', 'city'])->find($bookingId);
            if (!$booking) {
                $this->error("Booking with ID {$bookingId} not found.");
                return 1;
            }
            
            $this->generatePDFForBooking($booking);
        } else {
            // Test with sample bookings from each category
            $categories = [
                2 => 'Car Rental',
                3 => 'Private Car with Driver',
                4 => 'Boat Rentals',
                5 => 'Things to do'
            ];
            
            foreach ($categories as $categoryId => $categoryName) {
                $this->info("\n--- Testing {$categoryName} (Category ID: {$categoryId}) ---");
                
                // Find a booking for this category
                $booking = Booking::with(['listing', 'addons.addon', 'city'])
                    ->where('category_id', $categoryId)
                    ->first();
                
                if ($booking) {
                    $this->generatePDFForBooking($booking);
                } else {
                    $this->warn("No bookings found for category: {$categoryName}");
                }
            }
        }
        
        return 0;
    }
    
    private function generatePDFForBooking($booking)
    {
        $this->info("Generating PDF for Booking ID: {$booking->id}");
        $this->info("Category: {$booking->category_id}");
        $this->info("Customer: {$booking->name}");
        $this->info("Status: {$booking->status}");
        
        try {
            // Prepare invoice data using the EmailService method
            $invoiceData = $this->prepareInvoiceData($booking);
            
            // Generate PDF
            $pdfPath = $this->pdfService->generateInvoice($invoiceData, $booking->category_id);
            
            $this->info("✓ PDF generated successfully: {$pdfPath}");
            
            // Display some key data points
            $this->table(
                ['Field', 'Value'],
                [
                    ['Invoice Number', $invoiceData['invoice_number']],
                    ['Service', $invoiceData['service_name']],
                    ['Total', '€' . number_format($invoiceData['grand_total'], 2)],
                    ['Template Used', $this->getTemplateNameForCategory($booking->category_id)]
                ]
            );
            
        } catch (\Exception $e) {
            $this->error("✗ Failed to generate PDF: " . $e->getMessage());
            $this->error("Stack trace: " . $e->getTraceAsString());
        }
    }
    
    private function getTemplateNameForCategory($categoryId)
    {
        switch ($categoryId) {
            case 2: return 'Car Rental Invoice';
            case 3: return 'Private Driver Invoice';
            case 4: return 'Boat Rental Invoice';
            case 5: return 'Activity Booking Invoice';
            default: return 'Generic Invoice';
        }
    }
    
    private function prepareInvoiceData(Booking $booking): array
    {
        // Load booking addons with their details
        $booking->load(['addons.addon', 'listing.city', 'city']);
        
        // Prepare addons array for display
        $addons = [];
        foreach ($booking->addons as $bookingAddon) {
            $addons[] = [
                'name' => $bookingAddon->addon->addon ?? 'Unknown Addon',
                'price' => $bookingAddon->price
            ];
        }
        
        // Get pickup and dropoff locations
        $pickupLocation = 'N/A';
        $dropoffLocation = 'N/A';
        if ($booking->category_id == 2) { // Car Rental
            if (is_numeric($booking->pickup_location)) {
                $pickupCity = \App\Models\City::find($booking->pickup_location);
                $pickupLocation = $pickupCity ? $pickupCity->city_name : 'N/A';
            } else {
                $pickupLocation = $booking->pickup_location ?? 'N/A';
            }
            
            if ($booking->droppoff_location) {
                if (is_numeric($booking->droppoff_location)) {
                    $dropoffCity = \App\Models\City::find($booking->droppoff_location);
                    $dropoffLocation = $dropoffCity ? $dropoffCity->city_name : $pickupLocation;
                } else {
                    $dropoffLocation = $booking->droppoff_location;
                }
            } else {
                $dropoffLocation = $pickupLocation;
            }
        } elseif ($booking->listing && $booking->listing->city) {
            $pickupLocation = $booking->listing->city->city_name ?? 'N/A';
            $dropoffLocation = $pickupLocation;
        }
        
        // Calculate rental duration and rates
        $rentalDuration = 'N/A';
        $rentalDays = 0;
        $rentalHours = 0;
        if ($booking->check_in && $booking->check_out) {
            $checkIn = \Carbon\Carbon::parse($booking->check_in);
            $checkOut = \Carbon\Carbon::parse($booking->check_out);
            $days = $checkIn->diffInDays($checkOut);
            $hours = $checkIn->diffInHours($checkOut);
            if ($days > 0) {
                $rentalDays = $days;
                $rentalDuration = $days . ' ' . ($days == 1 ? 'Day' : 'Days');
            } elseif ($hours > 0) {
                $rentalHours = $hours;
                $rentalDuration = $hours . ' ' . ($hours == 1 ? 'Hour' : 'Hours');
            } elseif ($booking->duration) {
                $rentalDuration = $booking->duration;
                // Try to extract hours from duration string
                if (preg_match('/(\d+)\s*hour/i', $booking->duration, $matches)) {
                    $rentalHours = intval($matches[1]);
                }
            }
        }
        
        // Calculate daily/hourly rates
        $dailyRate = 0;
        $hourlyRate = 0;
        $pricePerPerson = 0;
        if ($rentalDays > 0 && $booking->booking_price > 0) {
            $dailyRate = $booking->booking_price / $rentalDays;
        }
        if ($rentalHours > 0 && $booking->booking_price > 0) {
            $hourlyRate = $booking->booking_price / $rentalHours;
        }
        if ($booking->number_of_people > 0 && $booking->booking_price > 0) {
            $pricePerPerson = $booking->booking_price / $booking->number_of_people;
        }
        
        // Get client date of birth
        $clientDob = null;
        if ($booking->date_of_birth) {
            $clientDob = \Carbon\Carbon::parse($booking->date_of_birth)->format('Y-m-d');
        }
        
        $data = [
            'booking_id' => $booking->id,
            'invoice_number' => $booking->invoice_no ?? ('INV-' . $booking->id),
            'invoice_date' => now()->format('F d, Y'),
            'status' => ucfirst($booking->status),
            
            // Customer info
            'client_name' => $booking->name,
            'client_email' => $booking->email,
            'client_phone' => $booking->whatsapp ?? $booking->whatsapp_number ?? 'N/A',
            'client_dob' => $clientDob,
            'client_country' => $booking->country ?? $booking->country_of_residence ?? null,
            'client_note' => $booking->notes ?? $booking->additional_notes ?? null,
            
            // Booking details
            'service_name' => $booking->listing->title ?? 'N/A',
            'check_in' => $booking->check_in ? \Carbon\Carbon::parse($booking->check_in)->format('F d, Y') : 'N/A',
            'check_out' => $booking->check_out ? \Carbon\Carbon::parse($booking->check_out)->format('F d, Y') : 'N/A',
            'total_amount' => $booking->total_amount,
            'rental_duration' => $rentalDuration,
            
            // Location details
            'pickup_location' => $pickupLocation,
            'dropoff_location' => $dropoffLocation,
            'pickup_date' => $booking->pickup_date ? \Carbon\Carbon::parse($booking->pickup_date)->format('Y-m-d') : null,
            'pickup_time' => $booking->pickup_time ?? '10:00',
            'dropoff_date' => $booking->dropoff_date ? \Carbon\Carbon::parse($booking->dropoff_date)->format('Y-m-d') : null,
            'dropoff_time' => $booking->dropoff_time ?? '10:00',
            
            // Activity specific
            'activity_date' => $booking->prefered_date ? \Carbon\Carbon::parse($booking->prefered_date)->format('Y-m-d') : null,
            'activity_time' => $booking->pickup_time ?? '10:00',
            'activity_duration' => $booking->duration ?? $rentalDuration,
            'activity_type' => $booking->private_or_group ?? null,
            'number_of_people' => $booking->number_of_people ?? null,
            
            // Boat specific
            'departure_location' => isset($booking->listing->departure_location) ? $booking->listing->departure_location : $pickupLocation,
            'departure_date' => $booking->check_in ? \Carbon\Carbon::parse($booking->check_in)->format('Y-m-d') : null,
            'departure_time' => $booking->pickup_time ?? '10:00',
            
            // Driver service specific
            'service_duration' => $rentalDuration,
            'service_type' => $rentalHours >= 8 ? 'Full Day' : ($rentalHours >= 4 ? 'Half Day' : 'Hourly'),
            
            // Pricing calculations
            'daily_rate' => $dailyRate,
            'hourly_rate' => $hourlyRate,
            'price_per_person' => $pricePerPerson,
            'transmission' => isset($booking->listing->transmission) ? $booking->listing->transmission : 'Manual',
            
            // Pricing breakdown
            'booking_price' => $booking->booking_price,
            'addons' => $addons,
            'total_addons' => $booking->total_addons,
            'discount_or_extra' => $booking->discount_or_extra,
            'discount_label' => $booking->discount_or_extra < 0 ? 'Discount' : 'Extra Charge',
            'grand_total' => $booking->total_price,
            
            // Company info
            'company_email' => 'info@marhire.com',
            'company_phone' => '+212 660 745 055',
        ];
        
        return $data;
    }
}