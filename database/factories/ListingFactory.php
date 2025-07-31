<?php

namespace Database\Factories;

use App\Models\Listing;
use App\Models\Agency;
use App\Models\Category;
use App\Models\City;
use Illuminate\Database\Eloquent\Factories\Factory;

class ListingFactory extends Factory
{
    protected $model = Listing::class;

    public function definition()
    {
        return [
            'agency_id' => Agency::factory(),
            'category_id' => $this->faker->randomElement([2, 3, 4, 5]),
            'city_id' => City::factory(),
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph,
            'short_description' => $this->faker->sentence,
            'price' => $this->faker->numberBetween(50, 500),
            'image' => 'listings/default.jpg',
            'images' => json_encode(['listings/default1.jpg', 'listings/default2.jpg']),
            'specifications' => json_encode([]),
            'included_items' => json_encode([]),
            'addons' => json_encode([]),
            'policies' => json_encode([]),
            'video' => null,
            'is_active' => true,
            'is_featured' => false,
            'views' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}