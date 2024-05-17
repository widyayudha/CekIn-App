import TimeComp from "@/Components/TimeComp";
import TimePicker from "@/Components/TimePicker";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Show({ auth, weather, weatherIcon }) {
  const deleteWeatherData = (weather) => {
    if (!window.confirm("Are you sure want to delete the weather data?")) {
      return;
    }
    router.delete(route("weather.destroy", weather.id));
  };
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {`${weather.name} Weather Data`}
          </h2>
          <div className="flex justify-end space-x-2">
            <Link
              href={route("weather.edit", weather.id)}
              className="bg-emerald-500 py-1 px-3 text-white rounded shadow-md transition-all hover:bg-emerald-600 hover:shadow-lg"
            >
              Edit
            </Link>
            <button
              onClick={(e) => deleteWeatherData(weather)}
              className="bg-red-600 py-1 px-3 text-white rounded shadow-md transition-all hover:bg-red-500 hover:shadow-lg"
            >
              Delete
            </button>
          </div>
        </div>
      }
    >
      <Head title={`${weather.name} Weather Data`}></Head>
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div>
              <img
                src={weather.image_path}
                alt=""
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="grid gap-1 grid-cols-2 mt-2">
                <div>
                  <div>
                    <label className="font-bold text-lg">Current Weather</label>
                    <TimeComp />
                  </div>
                  <div className="flex items-center">
                    <label className="font-extrabold text-6xl">
                      {weather.city_name} /
                    </label>
                    <img src={weatherIcon} className="w-25" />
                    <span className="text-4xl">
                      {weather.temperature
                        ? `${Math.round(weather.temperature)}°C`
                        : "N/A"}
                    </span>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Weather Type</label>
                    <p className="mt-1 capitalize">{weather.condition}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Condition</label>
                    <p className="mt-1 capitalize">{weather.description}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Temperature</label>
                    <p className="mt-1">{weather.temperature}°C</p>
                  </div>
                </div>
                <div>
                  <div>
                    <label className="font-bold text-lg">Pressure</label>
                    <p className="mt-1">{weather.pressure} hPA</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Humidity</label>
                    <p className="mt-1">{weather.humidity}%</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Wind Speed</label>
                    <p className="mt-1">{weather.wind_speed} meter/sec</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Create Date</label>
                    <p className="mt-1">{weather.created_at}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
