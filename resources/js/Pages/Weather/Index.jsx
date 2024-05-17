import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import TableHeading from "@/Components/TableHeading";

export default function Index({ auth, weathers, queryParams = null, success }) {
  queryParams = queryParams || {};
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("weather.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;

    searchFieldChanged(name, e.target.value);
  };

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }

    router.get(route("weather.index"), queryParams);
  };

  const deleteWeatherData = (weather) => {
    if (!window.confirm('Are you sure want to delete the weather data?')) {
      return;
    }
    router.delete(route('weather.destroy', weather.id))
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            My Weather
          </h2>
          <Link
            href={route("weather.create")}
            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
          >
            Add new
          </Link>
        </div>
      }
    >
      <Head title="My Weather" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {success && (
            <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
              {success}
            </div>
          )}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <TableHeading
                        name="id"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        ID
                      </TableHeading>
                      <th>
                        <div className="px-3 py-3 text-left">Image</div>
                      </th>
                      <TableHeading
                        name="name"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Weather Name
                      </TableHeading>
                      <TableHeading
                        name="city_name"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        City Name
                      </TableHeading>
                      <TableHeading
                        name="temperature"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Temperature
                      </TableHeading>
                      <TableHeading
                        name="created_at"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Create Date
                      </TableHeading>
                      <th>
                        <div className="px-3 py-3 text-center">Actions</div>
                      </th>
                    </tr>
                  </thead>
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.name}
                          placeholder="Weather Name"
                          onBlur={(e) =>
                            searchFieldChanged("name", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("name", e)}
                        />
                      </th>
                      <th className="px-3 py-3">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.city_name}
                          placeholder="City Name"
                          onBlur={(e) =>
                            searchFieldChanged("city_name", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("city_name", e)}
                        />
                      </th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {weathers.data.map((weather) => (
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        key={weather.id}
                      >
                        <td className="px-3 py-2">{weather.id}</td>
                        <td className="px-3 py-2">
                          <img
                            src={weather.image_path}
                            style={{ width: 60 }}
                            alt=""
                          />
                        </td>
                        <th className="px-3 py-2 text-gray-100 hover:underline">
                          <Link href={route("weather.show", weather.id)}>
                            {weather.name}
                          </Link>
                        </th>
                        <th className="px-3 py-2 text-gray-100">
                            {weather.city_name}
                        </th>
                        <th className="px-3 py-2 text-gray-100">
                          {weather.temperature ? `${Math.round(weather.temperature)}°C` : 'N/A'}
                        </th>
                        <td className="px-3 py-2 text-nowrap">
                          {weather.created_at}
                        </td>
                        <td className="px-2 py-4 text-nowrap justify-end">
                          <Link
                            href={route("weather.edit", weather.id)}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={(e) => deleteWeatherData(weather)}
                            href={route("weather.destroy", weather.id)}
                            className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination links={weathers.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
