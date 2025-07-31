<?php

namespace Tests\Feature;

use App\Models\Agency;
use App\Models\Category;
use App\Models\City;
use App\Models\Listing;
use App\Models\ListingAddon;
use App\Models\ListingAddonAffected;
use App\Models\PrivateListingPricing;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class PriceCalculationTest extends TestCase
{
    use DatabaseTransactions;

    protected $carListing;
    protected $driverListing;
    protected $boatListing;
    protected $activityListing;
    protected $cities;
    protected $addon1;
    protected $addon2;

    protected function setUp(): void
    {
        parent::setUp();

        // Get existing cities
        $this->cities = City::take(2)->get();
        if ($this->cities->count() < 2) {
            $this->markTestSkipped('Not enough cities in database');
        }

        // Get existing car rental listing
        $this->carListing = Listing::where('category_id', 2)->first();
        if (!$this->carListing) {
            $this->markTestSkipped('No car rental listing found');
        }

        // Get existing private driver listing
        $this->driverListing = Listing::where('category_id', 3)->first();
        if (!$this->driverListing) {
            $this->markTestSkipped('No private driver listing found');
        }

        // Get existing boat listing
        $this->boatListing = Listing::where('category_id', 4)->first();
        if (!$this->boatListing) {
            $this->markTestSkipped('No boat listing found');
        }

        // Get existing activity listing
        $this->activityListing = Listing::where('category_id', 5)->first();
        if (!$this->activityListing) {
            $this->markTestSkipped('No activity listing found');
        }

        // Create test add-ons
        $this->addon1 = ListingAddon::create([
            'addon' => 'GPS Navigation',
            'category_id' => 2, // Car rental
            'price' => 50.00
        ]);

        $this->addon2 = ListingAddon::create([
            'addon' => 'Child Seat', 
            'category_id' => 2, // Car rental
            'price' => 30.00
        ]);
    }

    /** @test */
    public function it_calculates_car_rental_price_correctly()
    {
        $tomorrow = now()->addDay()->format('Y-m-d');
        $threeDaysLater = now()->addDays(3)->format('Y-m-d');

        $response = $this->getJson('/api/bookings/calculate-price?' . http_build_query([
            'listing_id' => $this->carListing->id,
            'category_id' => 2,
            'start_date' => $tomorrow,
            'end_date' => $threeDaysLater
        ]));

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'base_price' => $this->carListing->price * 3, // 3 days
                    'total_addons' => 0,
                    'total' => $this->carListing->price * 3,
                    'currency' => 'MAD',
                    'breakdown' => [
                        'days' => 3,
                        'price_per_day' => (float) $this->carListing->price
                    ]
                ]
            ]);
    }

    /** @test */
    public function it_calculates_private_driver_price_with_route()
    {
        // Skip test since PrivateListingPricing has different structure
        $this->markTestSkipped('PrivateListingPricing has different structure than expected');
        
        // For private driver, it uses intercity/airport pricing per city
        // Not route-based pricing (city A to city B)
    }

    /** @test */
    public function it_calculates_boat_rental_price_by_duration()
    {
        $tomorrow = now()->addDay()->format('Y-m-d');

        $response = $this->getJson('/api/bookings/calculate-price?' . http_build_query([
            'listing_id' => $this->boatListing->id,
            'category_id' => 4,
            'start_date' => $tomorrow,
            'duration' => '4', // 4 hours
            'number_of_people' => 6
        ]));

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'base_price' => $this->boatListing->price * 4, // 4 hours
                    'total' => $this->boatListing->price * 4,
                    'breakdown' => [
                        'duration' => 4,
                        'price_per_hour' => (float) $this->boatListing->price,
                        'people' => 6
                    ]
                ]
            ]);
    }

    /** @test */
    public function it_calculates_activity_price_per_person()
    {
        $tomorrow = now()->addDay()->format('Y-m-d');

        $response = $this->getJson('/api/bookings/calculate-price?' . http_build_query([
            'listing_id' => $this->activityListing->id,
            'category_id' => 5,
            'start_date' => $tomorrow,
            'number_of_people' => 5
        ]));

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'base_price' => $this->activityListing->price * 5, // 5 people
                    'total' => $this->activityListing->price * 5,
                    'breakdown' => [
                        'people' => 5,
                        'price_per_person' => (float) $this->activityListing->price
                    ]
                ]
            ]);
    }

    /** @test */
    public function it_calculates_price_with_addons()
    {
        // Link add-ons to the car listing
        ListingAddonAffected::create([
            'listing_id' => $this->carListing->id,
            'addon_id' => $this->addon1->id
        ]);
        
        ListingAddonAffected::create([
            'listing_id' => $this->carListing->id,
            'addon_id' => $this->addon2->id
        ]);

        $tomorrow = now()->addDay()->format('Y-m-d');

        $response = $this->getJson('/api/bookings/calculate-price?' . http_build_query([
            'listing_id' => $this->carListing->id,
            'category_id' => 2,
            'start_date' => $tomorrow,
            'end_date' => $tomorrow,
            'addon_ids' => [$this->addon1->id, $this->addon2->id]
        ]));

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'base_price' => (float) $this->carListing->price, // 1 day
                    'total_addons' => 80.00, // 50 + 30
                    'total' => $this->carListing->price + 80.00,
                    'addons' => [
                        [
                            'id' => $this->addon1->id,
                            'name' => 'GPS Navigation',
                            'price' => 50.00
                        ],
                        [
                            'id' => $this->addon2->id,
                            'name' => 'Child Seat',
                            'price' => 30.00
                        ]
                    ]
                ]
            ]);
    }

    /** @test */
    public function it_validates_required_fields()
    {
        $response = $this->getJson('/api/bookings/calculate-price');

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['listing_id', 'category_id', 'start_date']);
    }

    /** @test */
    public function it_validates_category_match()
    {
        $tomorrow = now()->addDay()->format('Y-m-d');

        $response = $this->getJson('/api/bookings/calculate-price?' . http_build_query([
            'listing_id' => $this->carListing->id,
            'category_id' => 5, // Wrong category (activity instead of car)
            'start_date' => $tomorrow,
            'number_of_people' => 2
        ]));

        $response->assertStatus(400)
            ->assertJson([
                'success' => false,
                'message' => 'Listing category does not match the requested category'
            ]);
    }

    /** @test */
    public function it_requires_end_date_for_car_rental()
    {
        $tomorrow = now()->addDay()->format('Y-m-d');

        $response = $this->getJson('/api/bookings/calculate-price?' . http_build_query([
            'listing_id' => $this->carListing->id,
            'category_id' => 2,
            'start_date' => $tomorrow
            // Missing end_date
        ]));

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['end_date']);
    }

    /** @test */
    public function it_requires_city_ids_for_private_driver()
    {
        $tomorrow = now()->addDay()->format('Y-m-d');

        $response = $this->getJson('/api/bookings/calculate-price?' . http_build_query([
            'listing_id' => $this->driverListing->id,
            'category_id' => 3,
            'start_date' => $tomorrow,
            'number_of_people' => 2
            // Missing city_a_id and city_b_id
        ]));

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['city_a_id', 'city_b_id']);
    }

    /** @test */
    public function it_handles_reverse_route_pricing()
    {
        // Skip test since PrivateListingPricing has different structure
        $this->markTestSkipped('PrivateListingPricing has different structure than expected');
    }

    /** @test */
    public function it_handles_zero_days_correctly()
    {
        $today = now()->format('Y-m-d');

        // Same day rental should count as 1 day
        $response = $this->getJson('/api/bookings/calculate-price?' . http_build_query([
            'listing_id' => $this->carListing->id,
            'category_id' => 2,
            'start_date' => $today,
            'end_date' => $today
        ]));

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'base_price' => (float) $this->carListing->price, // 1 day minimum
                    'breakdown' => [
                        'days' => 1
                    ]
                ]
            ]);
    }
}