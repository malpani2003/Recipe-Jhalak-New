import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../authContext";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isLogin, setIsLogin } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const navigate = useNavigate();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/check`,
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          setIsLogin(true);
        } else {
          setIsLogin(false);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsLogin(false);
      }
    };
    authCheck();
  }, [setIsLogin]);

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/logout`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setIsLogin(false);
        navigate("/login");
      }
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log("Search query:", searchQuery);
  };

  const handleCategorySelect = (category) => {
    navigate(`/type/${category}`);
  };

  const handleAreaSelect = (area) => {
    navigate(`/area/${area}`);
  };

  const handleDifficultySelect = (difficulty) => {
    navigate(`/difficulty/${difficulty}`);
  };

  return (
    <nav className="bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-row">
              <h1 className="text-2xl text-white font-bold">Recipe Jhalak</h1>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearchSubmit} className="flex flex-grow">
              <input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 rounded-full border border-gray-300 flex-grow focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </form>

            {/* Desktop Filter Dropdown
            <div className="relative inline-block text-left">
              <div>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="inline-flex justify-between w-full rounded-md shadow-sm px-4 py-2 bg-gray-900 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  Filter
                  <FaChevronDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              {isDropdownOpen && (
                <div className="absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <div className="px-4 py-2 text-sm font-semibold text-gray-700">Filter By Category</div>
                    {["Vegetarian", "Non-Vegetarian", "Vegan"].map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategorySelect(category)}
                        className="flex justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        {category}
                        <FaChevronRight className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                      </button>
                    ))}
                    <div className="border-t border-gray-300 my-2"></div>
                    <div className="px-4 py-2 text-sm font-semibold text-gray-700">Filter By Area</div>
                    {["Indian", "Italian", "Mexican"].map((area) => (
                      <button
                        key={area}
                        onClick={() => handleAreaSelect(area)}
                        className="flex justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        {area}
                        <FaChevronRight className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                      </button>
                    ))}
                    <div className="border-t border-gray-300 my-2"></div>
                    <div className="px-4 py-2 text-sm font-semibold text-gray-700">Filter By Difficulty</div>
                    {["Easy", "Medium", "Hard"].map((difficulty) => (
                      <button
                        key={difficulty}
                        onClick={() => handleDifficultySelect(difficulty)}
                        className="flex justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        {difficulty}
                        <FaChevronRight className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div> */}

            <Link
              to="/category"
              className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
            >
              Categories
            </Link>
            <Link
              to="/filterPage"
              className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
            >
              Filter Recipe
            </Link>

            {/* Profile and Logout Links */}
            {isLogin ? (
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
            to="/filterPage"
            className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-base font-medium"
          >
            Filter Recipe
          </Link>

          <Link
            to="/category"
            className="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
          >
            Categories
          </Link>

          {/* Profile and Logout Links */}
          {isLogin ? (
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
