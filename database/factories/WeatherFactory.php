<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Weather>
 */
class WeatherFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->sentence(2),
            'city_name' => fake()
                ->randomElement([
                    'Jakarta','Paris','Tokyo','Dubai','London','Berlin','Chicago','Beijing','Moscow','Cairo',
                    'Athens', 'Bandung', 'Madrid', 'Manchester', 'Barcelona', 'Ontario', 'Bangkok', 'Taipei', 'Seoul', 'Ankara',
                    'Lisbon', 'Doha', 'Warsaw', 'Manila', 'Lima', 'Singapore', 'Oslo', 'Amsterdam', 'Rome', 'New Delhi', 'Cairo']),
            'image_path' => fake()->imageUrl(),
            'condition' => fake()
                ->randomElement(['Rain','Cloud','Clear']),
            'description' => fake()
                ->randomElement(['Heavy Rain', 'Light Rain','Cloudy','Clear Sky']),
            'temperature' => fake()->randomFloat(1, -10, 40),
            'pressure' => fake()->numberBetween(500,3000),
            'humidity' => fake()->numberBetween(20,80),
            'wind_speed' => fake()->randomFloat(2,0.1,10),
            'assigned_user_id' => 1,
            'created_by' => 1,
            'updated_by' => 1,
            'created_at' => time(),
            'updated_at' => time()
        ];
    }
}
