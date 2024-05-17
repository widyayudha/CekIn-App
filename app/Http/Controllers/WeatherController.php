<?php

namespace App\Http\Controllers;

use App\Models\Weather;
use App\Http\Requests\StoreWeatherRequest;
use App\Http\Requests\UpdateWeatherRequest;
use App\Http\Resources\WeatherResource;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use GuzzleHttp\Promise;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class WeatherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        $query = Weather::query()->where('assigned_user_id', $user->id);

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("city_name")) {
            $query->where("city_name", "like", "%" . request("city_name") . "%");
        }

        $cityNames = Weather::distinct()->pluck('city_name');
        $weatherInfos = $this->getWeathersFromOpenWeatherAPI($cityNames);
        $weather = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

        $combinedWeatherData = $this->mergeWeatherDatas($weather, $weatherInfos);
        return inertia("Weather/Index", [
            "weathers" => WeatherResource::collection($combinedWeatherData),
            "queryParams" => request()->query() ?: null,
            "success" => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $cities = [
            'Jakarta', 'Paris', 'Tokyo', 'Dubai', 'London', 'Berlin', 'Chicago', 'Beijing', 'Moscow', 'Cairo',
            'Athens', 'Bandung', 'Madrid', 'Manchester', 'Barcelona', 'Ontario', 'Bangkok', 'Taipei', 'Seoul', 'Ankara',
            'Lisbon', 'Doha', 'Warsaw', 'Manila', 'Lima', 'Singapore', 'Oslo', 'Amsterdam', 'Rome', 'New Delhi'
        ];

        return inertia("Weather/Create", [
            'weatherCities' => $cities,
            'userId' => auth()->user()->id,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWeatherRequest $request)
    {
        $data = $request->validated();
        //dd($data);
        /** @var $image \Illuminate\Http\UploadedFile */
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        if ($image) {
            $data['image_path'] = $image->store('weather/'.Str::random(), 'public');
        }
        Weather::create($data);

        return to_route("weather.index")
            ->with('success', 'Weather Data was Created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Weather $weather)
    {
        $cityName = $weather->city_name;
        $weatherAPI = $this->getWeatherFromOpenWeatherAPI($cityName);
        $mergedWeatherData = $this->mergeWeatherData($weather, $weatherAPI);

        //dd($weatherAPI);

        $weatherAPI = $weatherAPI[$cityName];
        $icon = $weatherAPI["weather"][0]["icon"];

        $weatherIcon = "https://openweathermap.org/img/wn/" . $icon . "@2x.png";
        //dd($mergedWeatherData);
        return inertia('Weather/Show', [
            'weather' => new WeatherResource($mergedWeatherData),
            "weatherIcon" => $weatherIcon,
            "success" => session('success')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Weather $weather)
    {
        $cities = [
            'Jakarta', 'Paris', 'Tokyo', 'Dubai', 'London', 'Berlin', 'Chicago', 'Beijing', 'Moscow', 'Cairo',
            'Athens', 'Bandung', 'Madrid', 'Manchester', 'Barcelona', 'Ontario', 'Bangkok', 'Taipei', 'Seoul', 'Ankara',
            'Lisbon', 'Doha', 'Warsaw', 'Manila', 'Lima', 'Singapore', 'Oslo', 'Amsterdam', 'Rome', 'New Delhi'
        ];

        return inertia('Weather/Edit', [
            'weather' => new WeatherResource($weather),
            'weatherCities' => $cities,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWeatherRequest $request, Weather $weather)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['updated_by'] = Auth::id();
        if ($image) {
            if ($weather->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($weather->image_path));
            }
            $data['image_path'] = $image->store('project/'.Str::random(), 'public');
        }
        $weather->update($data);
        return to_route('weather.index')
            ->with('success',"\"$weather->name\" Weather Data was Updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Weather $weather)
    {
        $name = $weather->name;
        $weather->delete();
        return to_route('weather.index')->with('success', "\"$name\" Weather Data was Deleted");
    }

    /**public function myWeather() {
        $user = auth()->user();
        $query = Weather::query()->where('assigned_user_id', $user->id);

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query-> where("name", "like", "%".request("name")."%");
        }
        if (request("city_name")) {
            $query-> where("city_name", "like", "%".request("city_name")."%");
        }

        $cityNames = Weather::distinct()->pluck('city_name');
        $weatherInfos = $this->getWeathersFromOpenWeatherAPI($cityNames);
        $weather = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

        $combinedWeatherData = $this->mergeWeatherDatas($weather, $weatherInfos);
        return inertia("Weather/Index", [
            "weatherdata" => WeatherResource::collection($combinedWeatherData),
            "queryParams" => request()->query() ?: null,
            "success" => session('success')
        ]);
    }*/

    private function getWeathersFromOpenWeatherAPI($cityNames)
    {
        $apiKey = env('OPENWEATHER_API_KEY', "");
        $weatherInfos = [];

        foreach ($cityNames as $cityName) {
            $weatherInfos[$cityName] = Cache::remember("weather_{$cityName}", 1800, function () use ($cityName, $apiKey) {
                $url = "http://api.openweathermap.org/data/2.5/weather?q={$cityName}&units=metric&appid={$apiKey}";
                $response = Http::get($url);

                return $response->successful() ? $response->json() : null;
            });
        }

        return $weatherInfos;
    }

    private function mergeWeatherDatas($weatherData, $weatherInfos)
    {
        $collection = $weatherData->getCollection();

        foreach ($collection as $data) {
            if (isset($weatherInfos[$data->city_name])) {
                $weatherInfo = $weatherInfos[$data->city_name];
                $data->condition = $weatherInfo['weather'][0]['main'];
                $data->description = $weatherInfo['weather'][0]['description'];
                $data->temperature = $weatherInfo['main']['temp'];
                $data->pressure = $weatherInfo['main']['pressure'];
                $data->humidity = $weatherInfo['main']['humidity'];
                $data->wind_speed = $weatherInfo['wind']['speed'];
            }
        }

        $weatherData->setCollection($collection);
        return $weatherData;
    }

    private function getWeatherFromOpenWeatherAPI($cityName)
    {
        $apiKey = env('OPENWEATHER_API_KEY', "");
        $weatherInfo = [];


        $weatherInfo[$cityName] = Cache::remember("weather_{$cityName}", 1800, function () use ($cityName, $apiKey) {
            $url = "http://api.openweathermap.org/data/2.5/weather?q={$cityName}&units=metric&appid={$apiKey}";
            $response = Http::get($url);

            return $response->successful() ? $response->json() : null;
        });


        return $weatherInfo;
    }

    private function mergeWeatherData($weatherData, $weatherInfo)
    {
        // Jika informasi cuaca ditemukan, tambahkan ke data cuaca
        if (!empty($weatherInfo)) {
            $weatherInfo = $weatherInfo[$weatherData->city_name];
            $weatherData->temperature = $weatherInfo['main']['temp'];
            $weatherData->wind_speed = $weatherInfo['wind']['speed'];
            $weatherData->pressure = $weatherInfo['main']['pressure'];
            $weatherData->humidity = $weatherInfo['main']['humidity'];
            $weatherData->condition = $weatherInfo['weather'][0]['main'];
            $weatherData->description = $weatherInfo['weather'][0]['description'];
        }

        return $weatherData;
    }
}
