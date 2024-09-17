import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setisLogin] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const navigate = useNavigate();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/users/check",
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          setisLogin(true);
        } else {
          setisLogin(false);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setisLogin(false);
      }
    };
    authCheck();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/logout"
      );
      if (response.status === 200) {
        setisLogin(false);
        navigate("/login");
      }
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    
  };

  return (
    <nav className="bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-row">
              <h1 className="text-2xl text-white font-bold">Recipe Jhalak</h1>
            </Link>
          </div>

          {/* Desktop Navigation Links and Search */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearchSubmit} className="flex flex-grow">
              <input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 rounded-full border border-gray-300 flex-grow focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              {/* <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-r-md"
              >
                Search
              </button> */}
            </form>
            <Link
              to="/category"
              className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
            >
              Categories
            </Link>
            {/* Profile and Logout Links */}
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
            >
              <span className="sr-only">Open main menu</span>
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
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <form onSubmit={handleSearchSubmit} className="flex flex-col mb-4">
            <input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 rounded-md border border-gray-300 mb-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </form>
          <Link
            to="/category"
            className="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
          >
            Categories
          </Link>
          {/* Profile and Logout Links */}
          {isLoggedIn ? (
            <>
              <Link
                to="/profile"
                className="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-white bg-blue-600 hover:bg-blue-700 block px-4 py-2 rounded-md text-base font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-white bg-blue-600 hover:bg-blue-700 block px-4 py-2 rounded-md text-base font-medium"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
