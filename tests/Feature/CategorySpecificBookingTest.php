<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use App\Models\Listing;
use App\Models\City;
use App\Models\PrivateListingPricing;
use App\Models\ListingPricing;
use Carbon\Carbon;

class CategorySpecificBookingTest extends TestCase
{
    use DatabaseTransactions;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Set timezone for consistent test results
        date_default_timezone_set('UTC');
    }

    /**
     * Car Rental Tests (Category 2)
     */
    
    /** @test */
    public function it_requires_minimum_3_days_for_car_rental()
    {
        $listing = Listing::where('category_id', 2)->first();
        if (!$listing) {
            $this->markTestSkipped('No car rental listing found');
        }

        $bookingData = [
            'category_id' => 2,
            'listing_id' => $listing->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'whatsapp' => '+1234567890',
            'country' => 'USA',
            'age' => 25,
            'pickup_date' => now()->addDays(2)->format('Y-m-d'),
            'dropoff_date' => now()->addDays(3)->format('Y-m-d'), // Only 1 day duration
            'pickup_time' => '10:00',
            'dropoff_time' => '10:00',
            'pickup_location' => City::first()->id,
            'droppoff_location' => City::first()->id,
            'terms_accepted' => true
        ];

        $response = $this->postJson('/api/bookings/submit', $bookingData);
        
        $response->assertStatus(422)
                 ->assertJsonPath('errors.dropoff_date.0', 'Car rental requires a minimum of 3 days booking duration.');
    }

    /** @test */
    public function it_calculates_car_rental_duration_correctly()
    {
        $listing = Listing::where('category_id', 2)->first();
        if (!$listing) {
            $this->markTestSkipped('No car rental listing found');
        }

        // Test that 48 hours and 1 minute counts as 3 days
        $bookingData = [
            'category_id' => 2,
            'listing_id' => $listing->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'whatsapp' => '+1234567890',
            'country' => 'USA',
            'age' => 25,
            'pickup_date' => now()->addDays(2)->format('Y-m-d'),
            'dropoff_date' => now()->addDays(4)->format('Y-m-d'),
            'pickup_time' => '10:00',
            'dropoff_time' => '10:01', // 1 minute over 48 hours = 3 days
            'pickup_location' => City::first()->id,
            'droppoff_location' => City::first()->id,
            'terms_accepted' => true,
            'booking_price' => 100,
            'total_price' => 100
        ];

        $response = $this->postJson('/api/bookings/submit', $bookingData);
        
        $response->assertStatus(201);
    }

    /** @test */
    public function it_validates_surf_rack_only_for_suv_mpv()
    {
        // Find a non-SUV/MPV listing
        $listing = Listing::where('category_id', 2)
            ->whereNotIn('vehicule_type', ['SUV', 'MPV'])
            ->first();
            
        if (!$listing) {
            $this->markTestSkipped('No suitable car rental listing found');
        }

        $bookingData = [
            'category_id' => 2,
            'listing_id' => $listing->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'whatsapp' => '+1234567890',
            'country' => 'USA',
            'age' => 25,
            'pickup_date' => now()->addDays(2)->format('Y-m-d'),
            'dropoff_date' => now()->addDays(5)->format('Y-m-d'),
            'pickup_time' => '10:00',
            'dropoff_time' => '10:00',
            'pickup_location' => City::first()->id,
            'droppoff_location' => City::first()->id,
            'surf_rack' => true,
            'terms_accepted' => true
        ];

        $response = $this->postJson('/api/bookings/submit', $bookingData);
        
        $response->assertStatus(422)
                 ->assertJsonPath('errors.surf_rack.0', 'Surf rack is only available for SUV and MPV vehicles.');
    }

    /** @test */
    public function it_validates_pickup_dropoff_cities_exist()
    {
        $listing = Listing::where('category_id', 2)->first();
        if (!$listing) {
            $this->markTestSkipped('No car rental listing found');
        }

        $bookingData = [
            'category_id' => 2,
            'listing_id' => $listing->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'whatsapp' => '+1234567890',
            'country' => 'USA',
            'age' => 25,
            'pickup_date' => now()->addDays(2)->format('Y-m-d'),
            'dropoff_date' => now()->addDays(5)->format('Y-m-d'),
            'pickup_time' => '10:00',
            'dropoff_time' => '10:00',
            'pickup_location' => 99999, // Non-existent city
            'droppoff_location' => City::first()->id,
            'terms_accepted' => true
        ];

        $response = $this->postJson('/api/bookings/submit', $bookingData);
        
        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['pickup_location']);
    }

    /**
     * Private Driver Tests (Category 3)
     */
    
    /** @test */
    public function it_validates_private_driver_service_type_array()
    {
        $listing = Listing::where('category_id', 3)->first();
        if (!$listing) {
            $this->markTestSkipped('No private driver listing found');
        }

        $bookingData = [
            'category_id' => 3,
            'listing_id' => $listing->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'whatsapp' => '+1234567890',
            'country' => 'USA',
            'car_type' => 1,
            'service_type' => 'airport_transfer', // Should be array
            'road_type' => ['one_way'],
            'city_a_id' => City::first()->id,
            'city_b_id' => City::first()->id,
            'prefered_date' => now()->addDays(3)->format('Y-m-d'),
            'number_of_passengers' => 2,
            'number_of_luggage' => 2,
            'terms_accepted' => true
        ];

        $response = $this->postJson('/api/bookings/submit', $bookingData);
        
        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['service_type']);
    }

    /** @test */
    public function it_validates_private_driver_route_pricing_exists()
    {
        $listing = Listing::where('category_id', 3)->first();
        if (!$listing) {
            $this->markTestSkipped('No private driver listing found');
        }

        // Ensure no pricing exists for this route
        PrivateListingPricing::where('listing_id', $listing->id)->delete();

        $bookingData = [
            'category_id' => 3,
            'listing_id' => $listing->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'whatsapp' => '+1234567890',
            'country' => 'USA',
            'car_type' => 1,
            'service_type' => ['intercity'],
            'road_type' => ['one_way'],
            'city_a_id' => City::first()->id,
            'city_b_id' => City::skip(1)->first()->id,
            'prefered_date' => now()->addDays(3)->format('Y-m-d'),
            'number_of_passengers' => 2,
            'number_of_luggage' => 2,
            'terms_accepted' => true
        ];

        $response = $this->postJson('/api/bookings/submit', $bookingData);
        
        $response->assertStatus(422)
                 ->assertJsonPath('errors.city_b_id.0', 'No pricing available for the selected route.');
    }

    /** @test */
    public function it_validates_passenger_count_against_capacity()
    {
        $listing = Listing::where('category_id', 3)
            ->where('max_passengers', '>', 0)
            ->first();
            
        if (!$listing) {
            $this->markTestSkipped('No suitable private driver listing found');
        }

        // Create pricing for this listing
        PrivateListingPricing::create([
            'listing_id' => $listing->id,
            'city_id' => City::first()->id,
            'airport_one' => 100,
            'airport_round' => 180,
            'intercity_one' => 0,
            'intercity_round' => 0
        ]);

        $bookingData = [
            'category_id' => 3,
            'listing_id' => $listing->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'whatsapp' => '+1234567890',
            'country' => 'USA',
            'car_type' => 1,
            'service_type' => ['airport_transfer'],
            'road_type' => ['one_way'],
            'city_a_id' => City::first()->id,
            'prefered_date' => now()->addDays(3)->format('Y-m-d'),
            'number_of_passengers' => $listing->max_passengers + 1, // Exceed capacity
            'number_of_luggage' => 2,
            'terms_accepted' => true
        ];

        $response = $this->postJson('/api/bookings/submit', $bookingData);
        
        $response->assertStatus(422)
                 ->assertJsonPath('errors.number_of_passengers.0', 
                     'Number of passengers exceeds vehicle capacity of ' . $listing->max_passengers . '.');
    }

    /** @test */
    public function it_requires_luggage_count_for_private_driver()
    {
        $listing = Listing::where('category_id', 3)->first();
        if (!$listing) {
            $this->markTestSkipped('No private driver listing found');
        }

        $bookingData = [
            'category_id' => 3,
            'listing_id' => $listing->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'whatsapp' => '+1234567890',
            'country' => 'USA',
            'car_type' => 1,
            'service_type' => ['airport_transfer'],
            'road_type' => ['one_way'],
            'city_a_id' => City::first()->id,
            'prefered_date' => now()->addDays(3)->format('Y-m-d'),
            'number_of_passengers' => 2,
            // 'number_of_luggage' => missing
            'terms_accepted' => true
        ];

        $response = $this->postJson('/api/bookings/submit', $bookingData);
        
        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['number_of_luggage']);
    }

    /**
     * Boat Rental Tests (Category 4)
     */
    
    /** @test */
    public function it_validates_boat_rental_time_restrictions()
    {
        $listing = Listing::where('category_id', 4)->first();
        if (!$listing) {
            $this->markTestSkipped('No boat rental listing found');
        }

        // Test early morning (before 8am)
        $bookingData = [
            'category_id' => 4,
            'listing_id' => $listing->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'whatsapp' => '+1234567890',
            'country' => 'USA',
            'prefered_date' => now()->addDays(3)->format('Y-m-d'),
            'duration' => 2,
            'number_of_people' => 4,
            'pickup_time' => '07:30', // Before 8am
            'terms_accepted' => true
        ];

        $response = $this->postJson('/api/bookings/submit', $bookingData);
        
        $response->assertStatus(422)
                 ->assertJsonPath('errors.pickup_time.0', 'Boat rental time must be between 8:00 AM and 8:00 PM.');

        // Test late evening (after 8pm)
        $bookingData['pickup_time'] = '20:30'; // After 8pm
        
        $response = $this->postJson('/api/bookings/submit', $bookingData);
        
        $response->assertStatus(422)
                 ->assertJsonPath('errors.pickup_time.0', 'Boat rental time must be between 8:00 AM and 8:00 PM.');
    }

    /** @test */
    public function it_validates_boat_duration_increments()
    {
        $listing = Listing::where('category_id', 4)->first();
        if (!$listing) {
            $this->markTestSkipped('No boat rental listing found');
        }

        $bookingData = [
            'category_id' => 4,
            'listing_id' => $listing->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'whatsapp' => '+1234567890',
            'country' => 'USA',
            'prefered_date' => now()->addDays(3)->format('Y-m-d'),
            'duration' => 1.25, // Not in 30-minute increments
            'number_of_people' => 4,
            'pickup_time' => '10:00',
            'terms_accepted' => true
        ];

        $response = $this->postJson('/api/bookings/submit', $bookingData);
        
        $response->assertStatus(422)
                 ->assertJsonPath('errors.duration.0', 'Duration must be in 30-minute increments (0.5 hours).');
    }

    /** @test */
    public function it_validates_boat_rental_ends_before_8pm()
    {
        $listing = Listing::where('category_id', 4)->first();
        if (!$listing) {
            $this->markTestSkipped('No boat rental listing found');
        }

        $bookingData = [
            'category_id' => 4,
            'listing_id' => $listing->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'whatsapp' => '+1234567890',
            'country' => 'USA',
            'prefered_date' => now()->addDays(3)->format('Y-m-d'),
            'duration' => 6, // 6 hours from 3pm = 9pm (too late)
            'number_of_people' => 4,
            'pickup_time' => '15:00',
            'terms_accepted' => true
        ];

        $response = $this->postJson('/api/bookings/submit', $bookingData);
        
        $response->assertStatus(422)
                 ->assertJsonPath('errors.duration.0', 'Boat rental must end by 8:00 PM. Please adjust duration or start time.');
    }

    /** @test */
    public function it_validates_boat_capacity()
    {
        $listing = Listing::where('category_id', 4)
            ->where('capacity', '>', 0)
            ->first();
            
        if (!$listing) {
            $this->markTestSkipped('No suitable boat rental listing found');
        }

        $bookingData = [
            'category_id' => 4,
            'listing_id' => $listing->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'whatsapp' => '+1234567890',
            'country' => 'USA',
            'prefered_date' => now()->addDays(3)->format('Y-m-d'),
            'duration' => 2,
            'number_of_people' => $listing->capacity + 1, // Exceed capacity
            'pickup_time' => '10:00',
            'terms_accepted' => true
        ];

        $response = $this->postJson('/api/bookings/submit', $bookingData);
        
        $response->assertStatus(422)
                 ->assertJsonPath('errors.number_of_people.0', 
                     'Number of people exceeds boat capacity of ' . $listing->capacity . '.');
    }

    /**
     * Things to Do Tests (Category 5)
     */
    
    /** @test */
    public function it_validates_time_preference_for_activities()
    {
        $listing = Listing::where('category_id', 5)->first();
        if (!$listing) {
            $this->markTestSkipped('No activity listing found');
        }

        $bookingData = [
            'category_id' => 5,
            'listing_id' => $listing->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'whatsapp' => '+1234567890',
            'country' => 'USA',
            'prefered_date' => now()->addDays(3)->format('Y-m-d'),
            'time_preference' => 'midnight', // Invalid preference
            'number_of_people' => 2,
            'activity_type' => 1,
            'terms_accepted' => true
        ];

        $response = $this->postJson('/api/bookings/submit', $bookingData);
        
        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['time_preference']);
    }

    /** @test */
    public function it_validates_group_size_limits()
    {
        $listing = Listing::where('category_id', 5)
            ->where('private_or_group', 'group')
            ->where('group_size_max', '>', 0)
            ->first();
            
        if (!$listing) {
            $this->markTestSkipped('No suitable group activity listing found');
        }

        $bookingData = [
            'category_id' => 5,
            'listing_id' => $listing->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'whatsapp' => '+1234567890',
            'country' => 'USA',
            'prefered_date' => now()->addDays(3)->format('Y-m-d'),
            'time_preference' => 'morning',
            'number_of_people' => $listing->group_size_max + 1, // Exceed max
            'activity_type' => 1,
            'terms_accepted' => true
        ];

        $response = $this->postJson('/api/bookings/submit', $bookingData);
        
        $response->assertStatus(422)
                 ->assertJsonPath('errors.number_of_people.0', 
                     'Number of people exceeds maximum group size of ' . $listing->group_size_max . '.');
    }

    /** @test */
    public function it_validates_minimum_group_size()
    {
        $listing = Listing::where('category_id', 5)
            ->where('private_or_group', 'group')
            ->where('group_size_min', '>', 1)
            ->first();
            
        if (!$listing) {
            $this->markTestSkipped('No suitable group activity listing found');
        }

        $bookingData = [
            'category_id' => 5,
            'listing_id' => $listing->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'whatsapp' => '+1234567890',
            'country' => 'USA',
            'prefered_date' => now()->addDays(3)->format('Y-m-d'),
            'time_preference' => 'morning',
            'number_of_people' => $listing->group_size_min - 1, // Below min
            'activity_type' => 1,
            'terms_accepted' => true
        ];

        $response = $this->postJson('/api/bookings/submit', $bookingData);
        
        $response->assertStatus(422)
                 ->assertJsonPath('errors.number_of_people.0', 
                     'Minimum ' . $listing->group_size_min . ' people required for this group activity.');
    }

    /** @test */
    public function it_allows_unlimited_people_for_private_activities()
    {
        $listing = Listing::where('category_id', 5)
            ->where('private_or_group', 'private')
            ->first();
            
        if (!$listing) {
            $this->markTestSkipped('No private activity listing found');
        }

        $bookingData = [
            'category_id' => 5,
            'listing_id' => $listing->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'whatsapp' => '+1234567890',
            'country' => 'USA',
            'prefered_date' => now()->addDays(3)->format('Y-m-d'),
            'time_preference' => 'morning',
            'number_of_people' => 100, // Large number should be allowed
            'activity_type' => 1,
            'terms_accepted' => true,
            'booking_price' => 100,
            'total_price' => 100
        ];

        $response = $this->postJson('/api/bookings/submit', $bookingData);
        
        $response->assertStatus(201); // Should succeed
    }

    /** @test */
    public function it_validates_duration_option_exists()
    {
        $listing = Listing::where('category_id', 5)->first();
        if (!$listing) {
            $this->markTestSkipped('No activity listing found');
        }

        $bookingData = [
            'category_id' => 5,
            'listing_id' => $listing->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'whatsapp' => '+1234567890',
            'country' => 'USA',
            'prefered_date' => now()->addDays(3)->format('Y-m-d'),
            'time_preference' => 'morning',
            'duration_option_id' => 99999, // Non-existent option
            'number_of_people' => 2,
            'activity_type' => 1,
            'terms_accepted' => true
        ];

        $response = $this->postJson('/api/bookings/submit', $bookingData);
        
        $response->assertStatus(422)
                 ->assertJsonPath('errors.duration_option_id.0', 
                     'Selected duration option is not available for this activity.');
    }

    /** @test */
    public function it_enforces_minimum_advance_booking_days()
    {
        // Test car rental (1 day advance)
        $carListing = Listing::where('category_id', 2)->first();
        if ($carListing) {
            $response = $this->postJson('/api/submit_booking', [
                'category_id' => 2,
                'listing_id' => $carListing->id,
                'first_name' => 'Test',
                'last_name' => 'User',
                'email' => 'test@example.com',
                'whatsapp' => '+1234567890',
                'country' => 'USA',
                'age' => 25,
                'terms_accepted' => true,
                'pickup_date' => now()->format('Y-m-d'), // Today
                'dropoff_date' => now()->addDays(3)->format('Y-m-d'),
                'pickup_time' => '10:00',
                'dropoff_time' => '10:00',
                'pickup_location' => City::first()->id,
                'droppoff_location' => City::first()->id
            ]);
            
            $response->assertStatus(422)
                     ->assertJsonValidationErrors(['pickup_date']);
        }

        // Test boat rental (2 days advance)
        $boatListing = Listing::where('category_id', 4)->first();
        if ($boatListing) {
            $response = $this->postJson('/api/submit_booking', [
                'category_id' => 4,
                'listing_id' => $boatListing->id,
                'first_name' => 'Test',
                'last_name' => 'User',
                'email' => 'test@example.com',
                'whatsapp' => '+1234567890',
                'country' => 'USA',
                'terms_accepted' => true,
                'duration' => 4,
                'prefered_date' => now()->addDay()->format('Y-m-d'), // Tomorrow
                'number_of_people' => 4,
                'pickup_time' => '10:00'
            ]);
            
            $response->assertStatus(422)
                     ->assertJsonValidationErrors(['prefered_date']);
        }
    }
}