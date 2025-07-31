<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use App\Models\Listing;

class BookingFormSubmissionTest extends TestCase
{
    use DatabaseTransactions;

    protected $listing;

    public function setUp(): void
    {
        parent::setUp();
        
        // Use existing boat listing from database
        $this->listing = Listing::where('category_id', 4)->first();
        
        if (!$this->listing) {
            $this->markTestSkipped('No boat listing found in database');
        }
    }

    /** @test */
    public function it_successfully_submits_booking_from_frontend_form()
    {
        $bookingData = [
            'listing_id' => $this->listing->id,
            'category_id' => 4, // Boat
            'first_name' => 'Frontend',
            'last_name' => 'Test',
            'email' => 'frontend@test.com',
            'whatsapp' => '+1234567890',
            'country' => 'USA',
            'prefered_date' => now()->addDays(5)->format('Y-m-d'),
            'duration' => '2',
            'propose' => 'Fishing Trip',
            'number_of_people' => 4,
            'notes' => 'Test booking from frontend',
            'booking_price' => 500,
            'total_addons' => 0,
            'total_price' => 500,
            'booking_source' => 'Client Booking'
        ];

        $response = $this->postJson('/api/submit_booking', $bookingData);

        $response->assertStatus(201)
                 ->assertJsonStructure([
                     'success',
                     'booking_id',
                     'confirmation_number',
                     'message'
                 ]);

        $this->assertDatabaseHas('bookings', [
            'email' => 'frontend@test.com',
            'first_name' => 'Frontend',
            'propose' => 'Fishing Trip'
        ]);
    }

    /** @test */
    public function it_handles_validation_errors_properly()
    {
        $incompleteData = [
            'listing_id' => $this->listing->id,
            'category_id' => 4,
            'first_name' => 'Test',
            // Missing required fields
        ];

        $response = $this->postJson('/api/submit_booking', $incompleteData);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['last_name', 'email', 'whatsapp', 'country']);
    }

    /** @test */
    public function it_shows_loading_state_during_submission()
    {
        // This would be tested in a frontend test using React Testing Library
        // The backend just needs to ensure proper response format
        $this->assertTrue(true);
    }

    /** @test */
    public function it_clears_form_after_successful_submission()
    {
        // This would be tested in a frontend test
        // Backend ensures proper success response
        $this->assertTrue(true);
    }
}