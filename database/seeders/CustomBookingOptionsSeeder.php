<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Listing;
use App\Models\CustomBookingOption;

class CustomBookingOptionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all Things to Do listings (category 5)
        $thingsToDoListings = Listing::where('category_id', 5)->get();
        
        foreach ($thingsToDoListings as $listing) {
            // Create different duration options
            CustomBookingOption::create([
                'listing_id' => $listing->id,
                'name' => '30min',
                'price' => rand(20, 50)
            ]);
            
            CustomBookingOption::create([
                'listing_id' => $listing->id,
                'name' => '1h',
                'price' => rand(40, 100)
            ]);
            
            CustomBookingOption::create([
                'listing_id' => $listing->id,
                'name' => '2h',
                'price' => rand(70, 150)
            ]);
            
            CustomBookingOption::create([
                'listing_id' => $listing->id,
                'name' => 'Half Day',
                'price' => rand(100, 250)
            ]);
            
            CustomBookingOption::create([
                'listing_id' => $listing->id,
                'name' => 'Full Day',
                'price' => rand(150, 400)
            ]);
        }
        
        // Get all Boat listings (category 4) for custom durations
        $boatListings = Listing::where('category_id', 4)->get();
        
        foreach ($boatListings as $listing) {
            // Create different duration options
            CustomBookingOption::create([
                'listing_id' => $listing->id,
                'name' => '30min',
                'price' => rand(50, 100)
            ]);
            
            CustomBookingOption::create([
                'listing_id' => $listing->id,
                'name' => '1h',
                'price' => rand(80, 150)
            ]);
            
            CustomBookingOption::create([
                'listing_id' => $listing->id,
                'name' => '1.5h',
                'price' => rand(100, 200)
            ]);
            
            CustomBookingOption::create([
                'listing_id' => $listing->id,
                'name' => '2h',
                'price' => rand(150, 300)
            ]);
            
            CustomBookingOption::create([
                'listing_id' => $listing->id,
                'name' => '3h',
                'price' => rand(200, 400)
            ]);
            
            CustomBookingOption::create([
                'listing_id' => $listing->id,
                'name' => '4h',
                'price' => rand(250, 500)
            ]);
            
            CustomBookingOption::create([
                'listing_id' => $listing->id,
                'name' => '5h',
                'price' => rand(300, 600)
            ]);
            
            CustomBookingOption::create([
                'listing_id' => $listing->id,
                'name' => '6h',
                'price' => rand(350, 700)
            ]);
            
            CustomBookingOption::create([
                'listing_id' => $listing->id,
                'name' => '7h',
                'price' => rand(400, 800)
            ]);
            
            CustomBookingOption::create([
                'listing_id' => $listing->id,
                'name' => '8h',
                'price' => rand(450, 900)
            ]);
        }
    }
}