import React from "react";
import { Link } from "react-router-dom"; 

export default function Navbar() {
  return (
    <nav className="bg-gray-800 border-gray-200 dark:bg-gray-900 fixed top-0 left-0 right-0 z-50">
        <ul className="flex flex-col p-6 md:p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 text-xl">

        <li>
          <Link
            to="/"
            className="block py-4 px-6 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            Home
          </Link>
        </li>
        
        <li>
          <Link
            to="/statistics"
            className="block py-4 px-6 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            Statistics
          </Link>
        </li>

        <li>
          <Link
            to="/endpoints"
            className="block py-4 px-6 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            Endpoints
          </Link>
        </li>

        <li>
          <Link
            to="/api_status"
            className="block py-4 px-6 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            Api Status
          </Link>
        </li>

      </ul>
    </nav>
  );
}
