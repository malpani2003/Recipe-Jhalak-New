import React, { useEffect, useState } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import Loading from "../common/Loading";

function CategoryWiseItem() {
  const { category: categoryID } = useParams();
  const [foodItem, setFoodItem] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  let [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Number of items per page

  useEffect(() => {
    async function getItems() {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/category/food/${categoryID}?pageNum=${currentPage}`
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
  }, [categoryID, currentPage]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSearchParams({ page: pageNumber });
  };

  return (
    <div className="container mx-auto min-h-screen p-6">
      <h2 className="text-center text-3xl font-bold mt-5 text-gray-800">
        Results for {foodItem.categoryName}
      </h2>
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
          <div className="text-center my-7">
            Uh oh, it seems there are no recipes matching your search
          </div>
        )}
      </div>
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
