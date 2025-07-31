<?php

namespace Database\Factories;

use App\Models\Agency;
use Illuminate\Database\Eloquent\Factories\Factory;

class AgencyFactory extends Factory
{
    protected $model = Agency::class;

    public function definition()
    {
        return [
            'name' => $this->faker->company,
            'email' => $this->faker->companyEmail,
            'whatsapp' => $this->faker->phoneNumber,
            'phone' => $this->faker->phoneNumber,
            'address' => $this->faker->address,
            'city' => $this->faker->city,
            'description' => $this->faker->paragraph,
            'image' => 'agencies/default.png',
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}