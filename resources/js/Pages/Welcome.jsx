import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "./constant";

export default function Welcome({ auth, weatherDashboard,
  weatherIcon,
  city }) {
  return (
    <GuestLayout user={auth.user}>
      <Head title="Dashboard Guest" />
      <img
        src="https://ncas.ac.uk/app/uploads/2020/05/Climate-Weather-Blue-Clouds-1280px.jpg"
        alt=""
        className="w-full h-48 object-cover"
      />
      <div className="py-8">
        <div className="max-w-lg mx-auto sm:px-2 lg:px-4  text-center">
          <h3 className="text-white text-4xl font-semibold leading-tight">
            "Secure Steps Begin by Grasping Weather, Using the CekIn App!"
          </h3>
        </div>
      </div>
      <div className="max-w-2xl mx-auto sm:px-6 lg:px-8 mt-2">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 className="text-gray-200 text-xl font-semibold">
                {city}
              </h3>
              <h3 className="text-gray-200 text-xl font-semibold justify-end">
                Saturday, 4 April 2024 | Local Time: 12.58
              </h3>
            </div>
          </div>
        </div>
      <div className="py-2">
        <div className="max-w-2xl mx-auto sm:px-6 lg:px-8 grid grid-cols-3 gap-2">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100 text-center">
              <h3 className="text-amber-500 text-2xl font-semibold">
                Temperature
              </h3>
              <p className="text-2xl mt-6 font-bold">
                {weatherDashboard.main.temp}°
              </p>
              <p className="text-4xl mt-6 font-extrabold">
                Celcius
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg  text-center">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 className="text-blue-500 text-2xl font-semibold">
                Wind Speed
              </h3>
              <p className="text-2xl mt-6 font-bold">
                {weatherDashboard.wind.speed}
              </p>
              <p className="text-3xl mt-7 font-extrabold">
                Meter/sec
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100 text-center">
              <h3 className="text-red-500 text-2xl font-semibold">Condition</h3>
              <img src={weatherIcon} className="w-16 mx-auto mt-3"/>
              <p className="text-4xl mt-2 font-extrabold">
                Cloudy
              </p>
            </div>
          </div>
        </div>

      </div>
    </GuestLayout>
  );
}
