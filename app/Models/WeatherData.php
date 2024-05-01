<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WeatherData extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'temperature',
        'humidity',
        'wind_speed',
        'condition',
        'user_id',
        'created_by',
        'updated_by',
        'weather_source_id'
    ];

    public function weatherSources() {
        return $this->belongsTo(WeatherSources::class);
    }

    public function assignedUser() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function createdBy() {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy() {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
