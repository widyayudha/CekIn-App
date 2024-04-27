<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use RakibDevs\Weather\Weather;

class DashboardController extends Controller
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
            'Dashboard',
            compact(
                'wt',
                'weatherDashboard',
                'weatherIcon',
                'city'
            )
        );
    }
}
