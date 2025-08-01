<?php

namespace Database\Factories;

use App\Models\City;
use Illuminate\Database\Eloquent\Factories\Factory;

class CityFactory extends Factory
{
    protected $model = City::class;

    public function definition()
    {
        return [
            'name' => $this->faker->city,
            'country' => 'Morocco',
            'description' => $this->faker->paragraph,
            'image' => 'cities/default.jpg',
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}