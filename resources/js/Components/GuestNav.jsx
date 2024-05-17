import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import Footer from "@/Components/Footer";

export default function GuestNav({ header, children }) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="shrink-0 flex items-center">
                <Link href="/welcome">
                  <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                </Link>
              </div>

              <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                <NavLink
                  href={route("welcome")}
                  active={route().current("welcome")}
                >
                  Home
                </NavLink>
              </div>
            </div>

            <div className="flex">
              <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                <NavLink
                  href={route("register")}
                  active={route().current("register")}
                >
                  <div className="font-bold text-md">Register</div>
                </NavLink>
              </div>
              <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                <NavLink
                  href={route("login")}
                  active={route().current("login")}
                >
                  <div className="font-bold text-md">Login</div>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {header && (
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {header}
          </div>
        </header>
      )}
    </div>
  );
}
