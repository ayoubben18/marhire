<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\DriverPricing;
use App\Models\Listing;
use App\Models\City;

class TestPrivateDriverPricingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Find the test-private-driver listing
        $listing = Listing::where('slug', 'test-private-driver')->first();
        
        if (!$listing) {
            $this->command->error('test-private-driver listing not found!');
            return;
        }
        
        // Get cities
        $agadir = City::where('city_name', 'Agadir')->first();
        $marrakech = City::where('city_name', 'Marrakech')->first();
        $casablanca = City::where('city_name', 'Casablanca')->first();
        $essaouira = City::where('city_name', 'Essaouira')->first();
        $tangier = City::where('city_name', 'Tangier')->first();
        
        // Delete existing pricings for this listing
        DriverPricing::where('listing_id', $listing->id)->delete();
        
        // Create intercity pricings (Agadir as pickup city - city_id 3)
        $intercityPricings = [
            ['city_b' => $marrakech, 'price' => 1500],
            ['city_b' => $casablanca, 'price' => 2500],
            ['city_b' => $essaouira, 'price' => 800],
            ['city_b' => $tangier, 'price' => 4000],
        ];
        
        foreach ($intercityPricings as $pricing) {
            if ($pricing['city_b']) {
                // One way pricing
                DriverPricing::create([
                    'listing_id' => $listing->id,
                    'service_type' => 'intercity',
                    'road_type' => 'one_way',
                    'city_a_id' => $agadir->id, // Agadir as pickup
                    'city_b_id' => $pricing['city_b']->id,
                    'price' => $pricing['price']
                ]);
                
                // Round trip pricing (usually double)
                DriverPricing::create([
                    'listing_id' => $listing->id,
                    'service_type' => 'intercity',
                    'road_type' => 'road_trip',
                    'city_a_id' => $agadir->id, // Agadir as pickup
                    'city_b_id' => $pricing['city_b']->id,
                    'price' => $pricing['price'] * 2
                ]);
            }
        }
        
        // Create airport transfer pricings
        DriverPricing::create([
            'listing_id' => $listing->id,
            'service_type' => 'airport_transfer',
            'road_type' => 'one_way',
            'city_a_id' => $agadir->id,
            'city_b_id' => null, // Airport transfers don't need city_b
            'price' => 300
        ]);
        
        DriverPricing::create([
            'listing_id' => $listing->id,
            'service_type' => 'airport_transfer',
            'road_type' => 'road_trip',
            'city_a_id' => $agadir->id,
            'city_b_id' => null,
            'price' => 500
        ]);
        
        $this->command->info('Driver pricings created for test-private-driver listing!');
    }
}