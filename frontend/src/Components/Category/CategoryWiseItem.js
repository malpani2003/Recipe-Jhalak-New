import React, { useEffect, useState } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import Loading from "../common/Loading";
import ErrorPage from "../404Page/ErrorPage";

function CategoryWiseItem() {
  const { category: categoryID } = useParams();
  const [foodItem, setFoodItem] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ difficulty: "", time: "", country: "" });
  let [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const incrementVisitCount = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/category/visit/${categoryID}`);
    } catch (err) {
      console.error("Error incrementing visit count:", err);
    }
  };

  useEffect(() => {
    incrementVisitCount();
  }, [categoryID]);

  useEffect(() => {
    async function getItems() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/category/food/${categoryID}?pageNum=${currentPage}&difficulty=${filters.difficulty}&time=${filters.time}&country=${filters.country}`
        );
        setFoodItem(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error occurred while fetching data.");
        setLoading(false);
      }
    }
    setCurrentPage(searchParams.get("page") || 1);
    getItems();
  }, [categoryID, currentPage, filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    const newSearchParams = new URLSearchParams(searchParams);
    if (e.target.value) {
      newSearchParams.set(e.target.name, e.target.value);
    } else {
      newSearchParams.delete(e.target.name);
    }
    setSearchParams(newSearchParams);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage />;
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSearchParams({ page: pageNumber });
  };

  return (
    <div className="p-4 mx-auto min-h-screen max-w-7xl">
      <h2 className="text-center text-4xl font-bold mt-5 text-gray-900">
        Results for <span className="text-yellow-600">{foodItem.categoryName}</span>
      </h2>
      <p className="text-center text-gray-600 mb-8">{foodItem.Category_Desc}</p>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-3 bg-gray-100 p-4 rounded-lg shadow-md mt-6 mb-10">
        <div className="w-full sm:w-1/3 lg:w-1/4">
          <label htmlFor="difficulty" className="block text-gray-700 mb-2">
            Difficulty
          </label>
          <select
            id="difficulty"
            name="difficulty"
            value={filters.difficulty}
            onChange={handleFilterChange}
            className="w-full bg-white p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
          >
            <option value="">Select Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="w-full sm:w-1/3 lg:w-1/4">
          <label htmlFor="time" className="block text-gray-700 mb-2">
            Prep Time
          </label>
          <select
            id="time"
            name="time"
            value={filters.time}
            onChange={handleFilterChange}
            className="w-full bg-white p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
          >
            <option value="">Select Prep Time</option>
            <option value="15">Up to 15 min</option>
            <option value="30">Up to 30 min</option>
            <option value="60">Up to 1 hour</option>
          </select>
        </div>

        <div className="w-full sm:w-1/3 lg:w-1/4">
          <label htmlFor="country" className="block text-gray-700 mb-2">
            Country
          </label>
          <select
            id="country"
            name="country"
            value={filters.country}
            onChange={handleFilterChange}
            className="w-full bg-white p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
          >
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="Italy">Italy</option>
          </select>
        </div>
      </div>

      {/* Food Items Grid */}
      <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foodItem.foodList.length >= 1 ? (
          foodItem.foodList.map((item) => {
            const { _id, foodName, foodImg } = item;
            return (
              <div key={_id} className="relative group bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                <img
                  src={foodImg}
                  alt={foodName}
                  loading="lazy"
                  className="w-full h-56 object-cover transition-transform duration-300"
                />
                <div className="p-4">
                  <Link
                    to={`/food/${_id}`}
                    className="block text-lg font-bold text-gray-800 hover:text-yellow-500 transition-colors duration-300 text-center"
                  >
                    {foodName}
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center my-10 text-gray-700">
            Uh oh, it seems there are no recipes matching your search.
          </div>
        )}
      </div>

      {/* Pagination */}
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={foodItem.totalFoodItem}
        paginate={paginate}
      />
    </div>
  );
}

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center mt-8">
      <ul className="flex space-x-2">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-full transition-all duration-300"
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoryWiseItem;
