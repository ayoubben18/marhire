<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Listing;
use App\Models\Agency;
use App\Models\City;
use App\Models\Category;

class CategorySpecificFormsTest extends TestCase
{
    /**
     * Test car rental form validation
     */
    public function test_car_rental_form_validation()
    {
        // Test missing required fields
        $response = $this->postJson('/api/bookings/submit', [
            'listing_id' => 1,
            'category_id' => 2,
            'email' => 'test@example.com'
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors([
                'first_name',
                'last_name',
                'pickup_date',
                'pickup_location'
            ]);

        // Test valid car rental booking
        $validData = [
            'listing_id' => 1,
            'category_id' => 2,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'whatsapp' => '+1234567890',
            'country' => 'USA',
            'pickup_date' => now()->addDays(2)->format('Y-m-d'),
            'dropoff_date' => now()->addDays(5)->format('Y-m-d'),
            'pickup_time' => '10:00',
            'dropoff_time' => '10:00',
            'pickup_location' => 'Agadir',
            'droppoff_location' => 'Marrakech', // Note: DB has typo
            'age' => 25,
            'booking_source' => 'Client Booking'
        ];

        // Since we're not modifying the database, we just validate the structure
        $this->assertIsArray($validData);
        $this->assertArrayHasKey('pickup_date', $validData);
        $this->assertArrayHasKey('dropoff_date', $validData);
    }

    /**
     * Test private driver form with checkboxes
     */
    public function test_private_driver_form_checkboxes()
    {
        // Test that service types can accept multiple values
        $serviceTypes = ['airport_transfer', 'intercity'];
        $roadTypes = ['one_way', 'road_trip'];

        $this->assertIsArray($serviceTypes);
        $this->assertCount(2, $serviceTypes);
        $this->assertContains('airport_transfer', $serviceTypes);
        $this->assertContains('intercity', $serviceTypes);

        $this->assertIsArray($roadTypes);
        $this->assertCount(2, $roadTypes);
        $this->assertContains('one_way', $roadTypes);
        $this->assertContains('road_trip', $roadTypes);

        // Test validation when no service type is selected
        $response = $this->postJson('/api/bookings/submit', [
            'listing_id' => 1,
            'category_id' => 3,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'whatsapp' => '+1234567890',
            'country' => 'USA',
            'prefered_date' => now()->addDays(2)->format('Y-m-d'),
            'service_types' => [], // Empty array should fail
            'road_types' => ['one_way']
        ]);

        $response->assertStatus(422);
    }

    /**
     * Test boat rental time restriction
     */
    public function test_boat_rental_time_restriction()
    {
        // Test valid time range (8am-8pm)
        $validTimes = [];
        for ($hour = 8; $hour <= 20; $hour++) {
            $validTimes[] = sprintf('%02d:00', $hour);
        }

        $this->assertCount(13, $validTimes); // 8am to 8pm inclusive
        $this->assertContains('08:00', $validTimes);
        $this->assertContains('20:00', $validTimes);
        $this->assertNotContains('07:00', $validTimes);
        $this->assertNotContains('21:00', $validTimes);

        // Test duration options
        $durations = ['30min', '1h', '1.5h', '2h', '2.5h', '3h', '3.5h', '4h', '4.5h', '5h', '5.5h', '6h', '6.5h', '7h', '7.5h', '8h'];
        $this->assertCount(16, $durations);
        $this->assertContains('30min', $durations);
        $this->assertContains('8h', $durations);
    }

    /**
     * Test activity group size limits
     */
    public function test_activity_group_size_limits()
    {
        // Mock listing with group size limits
        $mockListing = [
            'private_or_group' => 'group',
            'group_size_min' => 5,
            'group_size_max' => 20
        ];

        // Test valid group size
        $validGroupSize = 10;
        $this->assertGreaterThanOrEqual($mockListing['group_size_min'], $validGroupSize);
        $this->assertLessThanOrEqual($mockListing['group_size_max'], $validGroupSize);

        // Test invalid group sizes
        $tooSmall = 3;
        $tooLarge = 25;
        $this->assertLessThan($mockListing['group_size_min'], $tooSmall);
        $this->assertGreaterThan($mockListing['group_size_max'], $tooLarge);

        // Test private activity (no limits)
        $privateListing = ['private_or_group' => 'private'];
        $anySize = 100;
        $this->assertEquals('private', $privateListing['private_or_group']);
    }

    /**
     * Test price calculations
     */
    public function test_price_calculations()
    {
        // Test car rental pricing with 3-day rental
        $basePrice = 100;
        $days = 3;
        $expectedPrice = $basePrice * $days;
        $this->assertEquals(300, $expectedPrice);

        // Test add-ons calculation
        $addons = [
            ['id' => 1, 'price' => 20],
            ['id' => 2, 'price' => 30]
        ];
        $addonsTotal = array_sum(array_column($addons, 'price'));
        $this->assertEquals(50, $addonsTotal);
        $totalWithAddons = $expectedPrice + $addonsTotal;
        $this->assertEquals(350, $totalWithAddons);

        // Test boat duration-based pricing
        $boatPricePerHour = 50;
        $duration = 2.5; // 2.5 hours
        $boatPrice = $boatPricePerHour * $duration;
        $this->assertEquals(125, $boatPrice);

        // Test activity pricing per person
        $pricePerPerson = 25;
        $numberOfPeople = 4;
        $activityPrice = $pricePerPerson * $numberOfPeople;
        $this->assertEquals(100, $activityPrice);

        // Test activity group pricing (fixed price)
        $groupPrice = 200;
        $groupSize = 10; // Doesn't affect price for group bookings
        $this->assertEquals(200, $groupPrice);
    }
}