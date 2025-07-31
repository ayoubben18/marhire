<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use App\Models\Booking;
use App\Models\Listing;
use App\Models\ListingAddon;
use App\Models\ListingAddonAffected;
use App\Models\City;

class BookingValidationTest extends TestCase
{
    use DatabaseTransactions;

    protected $listing;
    protected $addon;

    public function setUp(): void
    {
        parent::setUp();
        
        // Use existing data from database
        $this->listing = Listing::where('category_id', 2)
            ->first();
            
        if (!$this->listing) {
            $this->markTestSkipped('No car rental listing found in database');
        }

        // Create a test addon for the listing
        $this->addon = ListingAddon::create([
            'addon' => 'Test Insurance',
            'category_id' => 2,
            'price' => 50.00
        ]);

        // Link addon to listing
        ListingAddonAffected::create([
            'listing_id' => $this->listing->id,
            'addon_id' => $this->addon->id
        ]);
    }

    public function tearDown(): void
    {
        // Clean up test data
        if ($this->addon) {
            ListingAddonAffected::where('addon_id', $this->addon->id)->forceDelete();
            $this->addon->forceDelete();
        }
        
        parent::tearDown();
    }

    /** @test */
    public function it_validates_future_dates_for_bookings()
    {
        $bookingData = [
            'category_id' => 2,
            'listing_id' => $this->listing->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'whatsapp' => '+1234567890',
            'country' => 'USA',
            'age' => 25,
            'pickup_date' => now()->format('Y-m-d'), // Today - should fail
            'dropoff_date' => now()->addDays(2)->format('Y-m-d'),
            'pickup_time' => '10:00',
            'dropoff_time' => '18:00',
            'pickup_location' => 'Airport',
            'droppoff_location' => 'Hotel'
        ];

        $response = $this->postJson('/api/submit_booking', $bookingData);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['pickup_date']);
    }

    /** @test */
    public function it_validates_pickup_date_before_dropoff_date()
    {
        $bookingData = [
            'category_id' => 2,
            'listing_id' => $this->listing->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'whatsapp' => '+1234567890',
            'country' => 'USA',
            'age' => 25,
            'pickup_date' => now()->addDays(3)->format('Y-m-d'),
            'dropoff_date' => now()->addDays(1)->format('Y-m-d'), // Before pickup
            'pickup_time' => '10:00',
            'dropoff_time' => '18:00',
            'pickup_location' => 'Airport',
            'droppoff_location' => 'Hotel'
        ];

        $response = $this->postJson('/api/submit_booking', $bookingData);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['dropoff_date']);
    }

    /** @test */
    public function it_validates_listing_category_match()
    {
        // Try to book a car listing with wrong category
        $bookingData = [
            'category_id' => 3, // Private driver category
            'listing_id' => $this->listing->id, // Car rental listing
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'whatsapp' => '+1234567890',
            'country' => 'USA',
            'car_type' => '1',
            'airport_or_intercity' => 'airport',
            'city_a_id' => 1,
            'city_b_id' => 2,
            'prefered_date' => now()->addDays(1)->format('Y-m-d'),
            'number_of_people' => 2
        ];

        $response = $this->postJson('/api/submit_booking', $bookingData);

        $response->assertStatus(422)
                 ->assertJsonPath('errors.listing_id.0', 'The selected listing does not belong to the specified category.');
    }

    /** @test */
    public function it_validates_addons_belong_to_listing()
    {
        // Create an addon that doesn't belong to the listing
        $unrelatedAddon = ListingAddon::create([
            'addon' => 'Unrelated Addon',
            'category_id' => 2,
            'price' => 30.00
        ]);

        $bookingData = [
            'category_id' => 2,
            'listing_id' => $this->listing->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'whatsapp' => '+1234567890',
            'country' => 'USA',
            'age' => 25,
            'pickup_date' => now()->addDays(1)->format('Y-m-d'),
            'dropoff_date' => now()->addDays(3)->format('Y-m-d'),
            'pickup_time' => '10:00',
            'dropoff_time' => '18:00',
            'pickup_location' => 'Airport',
            'droppoff_location' => 'Hotel',
            'addons' => [$unrelatedAddon->id] // Invalid addon
        ];

        $response = $this->postJson('/api/submit_booking', $bookingData);

        $response->assertStatus(422)
                 ->assertJsonPath('errors.addons.0', 'One or more selected add-ons are not available for this listing.');

        // Clean up
        $unrelatedAddon->forceDelete();
    }

    /** @test */
    public function it_accepts_valid_addons_for_listing()
    {
        $bookingData = [
            'category_id' => 2,
            'listing_id' => $this->listing->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'whatsapp' => '+1234567890',
            'country' => 'USA',
            'age' => 25,
            'pickup_date' => now()->addDays(1)->format('Y-m-d'),
            'dropoff_date' => now()->addDays(3)->format('Y-m-d'),
            'pickup_time' => '10:00',
            'dropoff_time' => '18:00',
            'pickup_location' => 'Airport',
            'droppoff_location' => 'Hotel',
            'addons' => [$this->addon->id], // Valid addon
            'booking_price' => 100,
            'total_addons' => 50,
            'total_price' => 150
        ];

        $response = $this->postJson('/api/submit_booking', $bookingData);

        $response->assertStatus(201)
                 ->assertJsonStructure([
                     'success',
                     'booking_id',
                     'confirmation_number'
                 ]);

        // Verify addon was saved
        $booking = Booking::latest()->first();
        $this->assertDatabaseHas('booking_addons', [
            'booking_id' => $booking->id,
            'addon_id' => $this->addon->id
        ]);
    }

    /** @test */
    public function it_validates_minimum_age_for_car_rental()
    {
        $bookingData = [
            'category_id' => 2,
            'listing_id' => $this->listing->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'whatsapp' => '+1234567890',
            'country' => 'USA',
            'age' => 17, // Below minimum
            'pickup_date' => now()->addDays(1)->format('Y-m-d'),
            'dropoff_date' => now()->addDays(3)->format('Y-m-d'),
            'pickup_time' => '10:00',
            'dropoff_time' => '18:00',
            'pickup_location' => 'Airport',
            'droppoff_location' => 'Hotel'
        ];

        $response = $this->postJson('/api/submit_booking', $bookingData);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['age']);
    }

    /** @test */
    public function it_validates_number_of_people_is_positive()
    {
        // Find an activity listing
        $activityListing = Listing::where('category_id', 5)->first();
        
        if (!$activityListing) {
            $this->markTestSkipped('No activity listing found');
        }

        $bookingData = [
            'category_id' => 5,
            'listing_id' => $activityListing->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'whatsapp' => '+1234567890',
            'country' => 'USA',
            'prefered_date' => now()->addDays(1)->format('Y-m-d'),
            'number_of_people' => 0, // Invalid
            'activity_type' => '1'
        ];

        $response = $this->postJson('/api/submit_booking', $bookingData);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['number_of_people']);
    }

    /** @test */
    public function it_validates_email_format()
    {
        $bookingData = [
            'category_id' => 2,
            'listing_id' => $this->listing->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'invalid-email', // Invalid format
            'whatsapp' => '+1234567890',
            'country' => 'USA',
            'age' => 25,
            'pickup_date' => now()->addDays(1)->format('Y-m-d'),
            'dropoff_date' => now()->addDays(3)->format('Y-m-d'),
            'pickup_time' => '10:00',
            'dropoff_time' => '18:00',
            'pickup_location' => 'Airport',
            'droppoff_location' => 'Hotel'
        ];

        $response = $this->postJson('/api/submit_booking', $bookingData);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['email']);
    }
}