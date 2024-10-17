import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Loader } from "lucide-react";

const RecipeFilter = () => {
  const [recipes, setRecipes] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [difficultyFilter, setDifficultyFilter] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalFoodItems, setTotalFoodItems] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  const fetchRecipes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      let url = `${process.env.REACT_APP_API_URL}/food/get?`;
      const params = new URLSearchParams();

      if (categoryFilter.length > 0) {
        params.append("foodType", categoryFilter.join(","));
      }
      if (difficultyFilter.length > 0) {
        params.append("difficulty", difficultyFilter.join(","));
      }
      params.append("page", currentPage);
      params.append("limit", itemsPerPage);

      url += params.toString();

      const response = await axios.get(url);
      setRecipes(response.data.data);
      setTotalFoodItems(response.data.totalFoodItem);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setError("Failed to fetch recipes. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [categoryFilter, difficultyFilter, currentPage]);

  const handleFilterChange = () => {
    setCurrentPage(1);
    setIsSidebarOpen(false);
    fetchRecipes();
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategoryFilter((prev) => {
      const updatedFilter = prev.includes(value)
        ? prev.filter((category) => category !== value)
        : [...prev, value];

      setCurrentPage(1);
      return updatedFilter;
    });
  };

  const handleDifficultyChange = (e) => {
    const value = e.target.value;
    setDifficultyFilter((prev) => {
      const updatedData = prev.includes(value)
        ? prev.filter((difficulty) => difficulty !== value)
        : [...prev, value];

      setCurrentPage(1);
      return updatedData;
    });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(totalFoodItems / itemsPerPage);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">
        Explore Delicious Recipes
      </h1>

      <div className="flex flex-col lg:flex-row">
        {/* Mobile Filter Button */}
        <button
          className="lg:hidden mb-4 bg-blue-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-500 transition duration-300 ease-in-out"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "Close Filters" : "Open Filters"}
        </button>

        {/* Filters Sidebar */}
        <div
          className={`lg:w-1/4 bg-blue-50 p-6 rounded-lg shadow-lg mb-6 lg:mb-0 lg:mr-6 transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "block" : "hidden lg:block"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-6 text-blue-600">Filters</h2>

          <div className="mb-6">
            <h3 className="font-medium text-lg mb-3 text-blue-800">
              Categories
            </h3>
            <div className="space-y-2">
              {["Vegan", "Vegetarian", "Non-Vegetarian"].map((category) => (
                <label
                  key={category}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition duration-200"
                >
                  <input
                    type="checkbox"
                    value={category}
                    onChange={handleCategoryChange}
                    checked={categoryFilter.includes(category)}
                    className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium text-lg mb-3 text-blue-800">
              Difficulty
            </h3>
            <div className="space-y-2">
              {["Easy", "Medium", "Hard"].map((difficulty) => (
                <label
                  key={difficulty}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition duration-200"
                >
                  <input
                    type="checkbox"
                    value={difficulty}
                    onChange={handleDifficultyChange}
                    checked={difficultyFilter.includes(difficulty)}
                    className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span>{difficulty}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handleFilterChange}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full transition duration-300 ease-in-out w-full font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            Apply Filters
          </button>
        </div>

        {/* Recipes List */}
        <div className="lg:w-3/4">
          {isLoading ? (
             <Loader></Loader>
          ) : error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : recipes.length === 0 ? (
            <div className="bg-yellow-100 text-yellow-800 text-center p-6 rounded-md">
              <p className="text-lg font-semibold">No recipes found</p>
              <p>Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <div
                  key={recipe._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
                >
                  <img
                    src={recipe.previewImg}
                    alt={recipe.foodName}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <Link
                      className="text-xl font-semibold text-gray-800 mb-2"
                      to={`/food/${recipe._id}`}
                    >
                      {recipe.foodName}
                    </Link>
                    <p className="text-sm text-gray-600">
                      {recipe.foodDesc.join(", ")}
                    </p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-blue-600 font-medium">
                        {recipe.difficulty}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {recipe.foodArea}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {!isLoading && !error && totalPages > 1 && (
            <div className="flex justify-center items-center mt-8">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="mx-1 px-4 py-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="mx-2 text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  handlePageChange(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="mx-1 px-4 py-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeFilter;
