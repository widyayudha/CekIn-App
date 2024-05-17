<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateWeatherRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" => ['required', 'max:255'],
            "image" => ['nullable', 'image'],
            "assigned_user_id" => ['required', 'exists:users,id'],
            "city_name" => ['required', Rule::in('Jakarta', 'Paris', 'Tokyo', 'Dubai', 'London', 'Berlin', 'Chicago', 'Beijing', 'Moscow', 'Cairo',
            'Athens', 'Bandung', 'Madrid', 'Manchester', 'Barcelona', 'Ontario', 'Bangkok', 'Taipei', 'Seoul', 'Ankara',
            'Lisbon', 'Doha', 'Warsaw', 'Manila', 'Lima', 'Singapore', 'Oslo', 'Amsterdam', 'Rome', 'New Delhi')]
        ];
    }
}
