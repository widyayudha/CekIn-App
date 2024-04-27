<?php

namespace App\Http\Controllers;

use RakibDevs\Weather\Weather;

class WelcomeController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $wt = new Weather();
        $city = 'Tokyo';
        $weatherDashboard = $wt->getCurrentByCity($city);
        $icon = $weatherDashboard->weather[0]->icon;
        $weatherIcon = "https://openweathermap.org/img/wn/".$icon."@2x.png";
        return inertia(
            'Welcome',
            compact(
                'wt',
                'weatherDashboard',
                'weatherIcon',
                'city'
            )
        );
    }
}
