<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Booking;
use App\Models\Listing;
use App\Models\Category;
use App\Models\City;
use App\Models\Agency;

class BookingSubmissionTest extends TestCase
{
    use DatabaseTransactions;

    protected $listing;

    public function setUp(): void
    {
        parent::setUp();
        
        // Use existing data from database
        $this->listing = Listing::where('category_id', 2)
            ->first();
            
        if (!$this->listing) {
            $this->markTestSkipped('No car rental listing found in database');
        }
    }

    /** @test */
    public function it_can_create_a_car_rental_booking()
    {
        $bookingData = [
            'category_id' => 2,
            'listing_id' => $this->listing->id,
            'fullName' => 'John Doe',
            'email' => 'john@example.com',
            'whatsAppNumber' => '+1234567890',
            'countryOfResidence' => 'USA',
            'dateOfBirth' => '1998-01-01',
            'termsAccepted' => true,
            'pickup_date' => now()->addDays(1)->format('Y-m-d'),
            'dropoff_date' => now()->addDays(3)->format('Y-m-d'),
            'pickup_time' => '10:00',
            'dropoff_time' => '18:00',
            'pickup_location' => 'Airport',
            'droppoff_location' => 'Hotel',
            'flightNumber' => 'FL123',
            'booking_price' => 100,
            'total_price' => 100
        ];

        $response = $this->postJson('/api/bookings/submit', $bookingData);

        $response->assertStatus(201)
                 ->assertJsonStructure([
                     'success',
                     'booking_id',
                     'confirmation_number',
                     'message'
                 ])
                 ->assertJson([
                     'success' => true,
                     'message' => 'Thank you! Your booking has been successfully submitted. We\'ve received your request and our team is reviewing the details. You\'ll receive a confirmation shortly by email or WhatsApp.'
                 ]);

        $this->assertDatabaseHas('bookings', [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'status' => 'Pending',
            'booking_source' => 'Client Booking',
            'created_by' => -1,
            'age' => 27 // Calculated from dateOfBirth
        ]);
    }

    /** @test */
    public function it_validates_required_fields()
    {
        $response = $this->postJson('/api/bookings/submit', []);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors([
                     'category_id',
                     'listing_id',
                     'fullName',
                     'email',
                     'whatsAppNumber',
                     'countryOfResidence',
                     'dateOfBirth',
                     'termsAccepted'
                 ]);
    }

    /** @test */
    public function it_validates_category_specific_fields_for_car_rental()
    {
        $incompleteData = [
            'category_id' => 2,
            'listing_id' => $this->listing->id,
            'fullName' => 'John Doe',
            'email' => 'john@example.com',
            'whatsAppNumber' => '+1234567890',
            'countryOfResidence' => 'USA',
            'dateOfBirth' => '1998-01-01',
            'termsAccepted' => true
            // Missing car-specific fields
        ];

        $response = $this->postJson('/api/bookings/submit', $incompleteData);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors([
                     'pickup_date',
                     'dropoff_date',
                     'pickup_time',
                     'dropoff_time',
                     'pickup_location',
                     'droppoff_location'
                 ]);
    }

    /** @test */
    public function it_rejects_invalid_category_ids()
    {
        $bookingData = [
            'category_id' => 99, // Invalid category
            'listing_id' => $this->listing->id,
            'fullName' => 'John Doe',
            'email' => 'john@example.com',
            'whatsAppNumber' => '+1234567890',
            'countryOfResidence' => 'USA',
            'dateOfBirth' => '1998-01-01',
            'termsAccepted' => true
        ];

        $response = $this->postJson('/api/bookings/submit', $bookingData);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['category_id']);
    }

    /** @test */
    public function it_rejects_nonexistent_listing_id()
    {
        $bookingData = [
            'category_id' => 2,
            'listing_id' => 99999, // Non-existent listing
            'fullName' => 'John Doe',
            'email' => 'john@example.com',
            'whatsAppNumber' => '+1234567890',
            'countryOfResidence' => 'USA',
            'dateOfBirth' => '1998-01-01',
            'termsAccepted' => true
        ];

        $response = $this->postJson('/api/bookings/submit', $bookingData);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['listing_id']);
    }
    
    /** @test */
    public function it_validates_advance_booking_for_car_rental()
    {
        $bookingData = [
            'category_id' => 2,
            'listing_id' => $this->listing->id,
            'fullName' => 'John Doe',
            'email' => 'john@example.com',
            'whatsAppNumber' => '+1234567890',
            'countryOfResidence' => 'USA',
            'dateOfBirth' => '1998-01-01',
            'termsAccepted' => true,
            'pickup_date' => now()->format('Y-m-d'), // Today - should fail (needs 1 day advance)
            'dropoff_date' => now()->addDays(2)->format('Y-m-d'),
            'pickup_time' => '10:00',
            'dropoff_time' => '18:00',
            'pickup_location' => 'Airport',
            'droppoff_location' => 'Hotel',
            'booking_price' => 100,
            'total_price' => 100
        ];

        $response = $this->postJson('/api/bookings/submit', $bookingData);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['pickup_date']);
    }
    
    /** @test */
    public function it_validates_whatsapp_number_format()
    {
        $bookingData = [
            'category_id' => 2,
            'listing_id' => $this->listing->id,
            'fullName' => 'John Doe',
            'email' => 'john@example.com',
            'whatsAppNumber' => '1234567890', // Missing country code
            'countryOfResidence' => 'USA',
            'dateOfBirth' => '1998-01-01',
            'termsAccepted' => true
        ];

        $response = $this->postJson('/api/bookings/submit', $bookingData);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['whatsAppNumber']);
    }
    
    /** @test */
    public function it_validates_terms_accepted()
    {
        $bookingData = [
            'category_id' => 2,
            'listing_id' => $this->listing->id,
            'fullName' => 'John Doe',
            'email' => 'john@example.com',
            'whatsAppNumber' => '+1234567890',
            'countryOfResidence' => 'USA',
            'dateOfBirth' => '1998-01-01',
            'termsAccepted' => false // Not accepted
        ];

        $response = $this->postJson('/api/bookings/submit', $bookingData);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['termsAccepted']);
    }
}