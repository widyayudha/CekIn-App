import React, { useState } from "react";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { router } from '@inertiajs/react';

export default function SearchBar() {
    const [city, setCity] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('dashboard'), { city });
    };

    return (
        <div className="relative w-full h-72">
            <img
                src="https://ncas.ac.uk/app/uploads/2020/05/Climate-Weather-Blue-Clouds-1280px.jpg"
                alt=""
                className="w-full h-full object-cover"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <form onSubmit={handleSearch} className="relative w-96 h-10 gap-4 items-center">
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Search City Name"
                        className="text-white w-full py-2 px-4 pr-12 border border-gray-300 rounded-full shadow-md bg-white dark:bg-gray-800 focus:outline-none focus:ring focus:border-blue-300"
                    />
                    <button type="submit" className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <MagnifyingGlassIcon className="h-5 w-5 text-white" />
                    </button>
                </form>
            </div>
        </div>
    );
}
