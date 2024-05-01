<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WeatherData>
 */
class WeatherDataFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name'=> fake()->sentence(),
            'temperature' => fake()->numberBetween(0,40),
            'humidity' => fake()->numberBetween(0,10),
            'wind_speed' => fake()->randomFloat(1,1,20),
            'condition' =>fake()
                ->randomElement(['rain','cloud','clear']),
            'user_id'=>1,
            'created_by' => 1,
            'updated_by' => 1,
            'created_at' => time(),
            'updated_at' => time()
        ];
    }
}
