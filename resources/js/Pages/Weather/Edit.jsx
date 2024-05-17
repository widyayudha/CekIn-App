import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ auth, weather, weatherCities, users }) {
  const { data, setData, post, errors, reset } = useForm({
    image: "",
    image_path: weather.image_path || "",
    name: weather.name ||"",
    city_name: weather.city_name || "",
    assigned_user_id: auth.user.id,
    _method: "PUT",
  });

  const handleSelectChange = (e) => {
    setData("city_name", e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("weather.update", weather.id));
  };
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Edit Weather Data
          </h2>
        </div>
      }
    >
      <Head title="Edit Weather Data" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
          {weather.image_path && (
              <div>
              <img
                src={weather.image_path}
                alt=""
                className="w-full h-48 object-cover"
              />
            </div>)}
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
            >
              <div>
                <InputLabel
                  htmlFor="weather_image_path"
                  value="Weather Image"
                />
                <TextInput
                  id="weather_image_path"
                  type="file"
                  name="image"
                  className="mt-1 block w-full"
                  onChange={(e) => setData("image", e.target.files[0])}
                />
                <InputError message={errors.image} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="weather_name" value="Weather Name" />
                <TextInput
                  id="weather_name"
                  type="text"
                  name="name"
                  value={data.name}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) => setData("name", e.target.value)}
                />
                <InputError message={errors.name} className="mt-2" />
              </div>
              <div className="mt-4">
      <InputLabel htmlFor="weather_city_name" value="City Name" />

      <SelectInput
        name="city_name"
        id="weather_city_name"
        className="mt-1 block w-full"
        onChange={handleSelectChange}
        value={data.city_name}
      >
        <option value="">Select City</option>
        {weatherCities.map((city, index) => (
          <option value={city} key={index}>{city}</option>
        ))}
      </SelectInput>

      {errors && <InputError message={errors.city_name} className="mt-2" />}
    </div>
              <div className="mt-4 text-right">
                <Link
                  href={route("weather.index")}
                  className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                >
                  Cancel
                </Link>
                <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
