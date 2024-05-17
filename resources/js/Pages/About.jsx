import TimeComp from "@/Components/TimeComp";
import TimePicker from "@/Components/TimePicker";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function About({ auth, weather, weatherIcon }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="About Page"></Head>
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div>
              <img
                src="https://i.pinimg.com/736x/40/c1/a2/40c1a21f3aabc0f6626bce59cff2ca5e.jpg"
                alt="https://ncas.ac.uk/app/uploads/2020/05/Climate-Weather-Blue-Clouds-1280px.jpg"
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div>
                <label className="font-bold text-4xl">About Us</label>
                <p className="mt-2 ">
                  CekIn is a weather data storage application developed by
                  CekInteractive, utilizing the powerful OpenWeather API to
                  provide accurate and real-time weather information. Our
                  platform is designed to help users stay informed about the
                  latest weather conditions, ensuring they can make
                  well-informed decisions whether they're planning daily
                  activities or preparing for severe weather events. At
                  CekInteractive, we understand the importance of reliable
                  weather data, and we are committed to delivering a seamless
                  and user-friendly experience through our CekIn application.{" "}
                </p>
                <p className="mt-2">
                  At CekInteractive, our mission goes beyond just providing
                  weather data. We aim to create a comprehensive ecosystem where
                  users can access detailed weather reports, historical data,
                  and forecasts tailored to their specific needs. By leveraging
                  the advanced capabilities of the OpenWeather API, CekIn offers
                  a robust solution for individuals, businesses, and
                  organizations looking to integrate weather data into their
                  daily operations. Our team of dedicated professionals
                  continuously works on enhancing the features of CekIn,
                  ensuring that it remains a cutting-edge tool in the world of
                  weather data applications.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
