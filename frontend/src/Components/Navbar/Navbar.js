import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
             <h1 className="text-2xl text-white font-bold">Recipe Jhalak</h1>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-4">
            <Link
              to="/category"
              className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
            >
              Categories
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
            >
              Filter By
            </Link>
          </div>

          {/* Sign In Button */}
          <div className="hidden md:flex items-center">
            <Link
              to="/login"
              className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              {/* Mobile menu icon */}
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/about"
            className="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
          >
            About
          </Link>
          <Link
            to="/services"
            className="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
          >
            Services
          </Link>
          <Link
            to="/contact"
            className="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
          >
            Contact Us
          </Link>
        </div>
        <div className="px-2">
          <Link
            to="/signin"
            className="text-white bg-blue-600 hover:bg-blue-700 block px-4 py-2 rounded-md text-base font-medium"
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
