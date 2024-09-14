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
    async function getItems() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/category/food/${categoryID}?pageNum=${currentPage}&difficulty=${filters.difficulty}&time=${filters.time}&country=${filters.country}`
        );
        setFoodItem(response.data);
        setLoading(false);
        incrementVisitCount();
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
  };


  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage/>;
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSearchParams({ page: pageNumber });
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h2 className="text-center text-3xl font-bold mt-5 text-gray-800">
        Results for {foodItem.categoryName}
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mt-6 mb-8">
        <select
          name="difficulty"
          value={filters.difficulty}
          onChange={handleFilterChange}
          className="bg-gray-200 p-2 rounded"
        >
          <option value="">Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <select
          name="time"
          value={filters.time}
          onChange={handleFilterChange}
          className="bg-gray-200 p-2 rounded"
        >
          <option value="">Prep Time</option>
          <option value="15">Up to 15 min</option>
          <option value="30">Up to 30 min</option>
          <option value="60">Up to 1 hour</option>
        </select>

        <select
          name="country"
          value={filters.country}
          onChange={handleFilterChange}
          className="bg-gray-200 p-2 rounded"
        >
          <option value="">Country</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="Italy">Italy</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {foodItem.foodList.length >= 1 ? (
          foodItem.foodList.map((item) => {
            const { _id, foodName, foodImg } = item;
            return (
              <div key={_id} className="relative group">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img
                    src={foodImg}
                    alt={foodName}
                    className="w-full h-56 object-cover transition-transform duration-300 transform group-hover:scale-105"
                  />
                  <div className="p-4">
                    <Link
                      to={`/food/${_id}`}
                      className="block text-lg font-bold text-gray-800 hover:text-red-500 transition-colors duration-200 text-center"
                    >
                      {foodName}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center my-10">
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
    <nav>
      <ul className="flex justify-center mt-8">
        {pageNumbers.map((number) => (
          <li key={number} className="mx-1">
            <button
              onClick={() => paginate(number)}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-600 transition duration-300"
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
