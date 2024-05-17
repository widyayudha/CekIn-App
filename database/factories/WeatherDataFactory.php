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
            'city_name'=> fake()
                ->randomElement([
                    'Jakarta','Paris','Tokyo','Dubai','London','Berlin','Chicago','Beijing','Moscow','Cairo',
                    'Athens', 'Bandung', 'Madrid', 'Manchester', 'Barcelona', 'Ontario', 'Bangkok', 'Taipei', 'Seoul', 'Ankara',
                    'Lisbon', 'Doha', 'Warsaw', 'Manila', 'Lima', 'Singapore', 'Oslo', 'Amsterdam', 'Rome,', 'New Delhi', 'Cairo'
                ]),
            'temperature' => fake()->numberBetween(0,40),
            'humidity' => fake()->numberBetween(0,10),
            'wind_speed' => fake()->randomFloat(1,1,20),
            'condition' =>fake()
                ->randomElement(['rain','cloud','clear']),
            'description' =>fake()
                ->randomElement(['heavy rain','cloudy','clear sky']),
            'created_by' => 1,
            'updated_by' => 1,
            'created_at' => time(),
            'updated_at' => time()
        ];
    }
}
