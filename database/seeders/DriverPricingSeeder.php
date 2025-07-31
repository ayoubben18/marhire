<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Listing;
use App\Models\DriverPricing;
use App\Models\City;

class DriverPricingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all private driver listings (category 3)
        $driverListings = Listing::where('category_id', 3)->get();
        
        // Get all cities
        $cities = City::all();
        
        foreach ($driverListings as $listing) {
            // Get the listing's city
            $listingCity = $listing->city_id;
            
            // Add airport transfer pricing for the listing's city
            DriverPricing::create([
                'listing_id' => $listing->id,
                'service_type' => 'airport_transfer',
                'road_type' => 'one_way',
                'city_a_id' => $listingCity,
                'city_b_id' => null,
                'price' => rand(300, 500)
            ]);
            
            DriverPricing::create([
                'listing_id' => $listing->id,
                'service_type' => 'airport_transfer',
                'road_type' => 'road_trip',
                'city_a_id' => $listingCity,
                'city_b_id' => null,
                'price' => rand(500, 800)
            ]);
            
            // Add intercity pricing for routes from listing city to other cities
            foreach ($cities as $destinationCity) {
                if ($destinationCity->id !== $listingCity) {
                    // One way pricing
                    DriverPricing::create([
                        'listing_id' => $listing->id,
                        'service_type' => 'intercity',
                        'road_type' => 'one_way',
                        'city_a_id' => $listingCity,
                        'city_b_id' => $destinationCity->id,
                        'price' => rand(500, 2000) // Price varies by distance
                    ]);
                    
                    // Round trip pricing
                    DriverPricing::create([
                        'listing_id' => $listing->id,
                        'service_type' => 'intercity',
                        'road_type' => 'road_trip',
                        'city_a_id' => $listingCity,
                        'city_b_id' => $destinationCity->id,
                        'price' => rand(800, 3500) // Higher for round trip
                    ]);
                }
            }
        }
    }
}