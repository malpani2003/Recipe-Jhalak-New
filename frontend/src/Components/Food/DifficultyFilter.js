import React, { useState, useEffect } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const DifficultyFilter = () => {
  const [difficulty, setDifficulty] = useState("Easy");
  const { level } = useParams();
  const [foodItems, setFoodItems] = useState([]);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    limit: 10,
  });

  const fetchFoodByDifficulty = async (difficultyLevel, page = 1) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/food/difficulty/${difficultyLevel}`,
        {
          params: {
            page,
            limit: pagination.limit,
          },
        }
      );
      setFoodItems(response.data.items);
      setPagination({
        totalItems: response.data.totalItems,
        totalPages: response.data.totalPages,
        currentPage: page,
        limit: pagination.limit,
      });
    } catch (error) {
      console.error("Error fetching food items:", error);
    }
  };

  useEffect(() => {
    setDifficulty(level);
    fetchFoodByDifficulty(level);
  }, [level]);

  const handlePageChange = (page) => {
    fetchFoodByDifficulty(difficulty, page);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 my-7 bg-white rounded-lg shadow-md">
      <h3 className="text-4xl font-extrabold mb-2 text-center">
        {difficulty === "Easy"
          ? "Step Into the World of Effortless Cooking!"
          : difficulty === "Medium"
          ? "Elevate Your Cooking Skills with These Recipes!"
          : difficulty === "Hard"
          ? "Challenge Yourself with Gourmet-Level Dishes!"
          : "Dive Into the World of Cooking Delights!"}
      </h3>
      <p className="text-lg text-gray-600 text-center mb-4">
        {difficulty === "Easy"
          ? "Perfect for beginners or busy days, these easy-to-make recipes will help you whip up delicious meals with minimal effort."
          : difficulty === "Medium"
          ? "These recipes strike a balance between simplicity and sophistication—ideal for those looking to hone their culinary skills."
          : difficulty === "Hard"
          ? "Designed for the adventurous cook, these challenging recipes are perfect for when you want to create something extraordinary."
          : "Discover a collection of handpicked recipes that are perfect for every occasion, designed to tantalize your taste buds."}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-6">
        {foodItems.map((item) => (
          <div
            key={item._id}
            className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            <img
              src={item.previewImg}
              alt={item.foodName}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <div className="flex-grow text-center">
              <Link
                to={`/food/${item._id}`}
                className="font-semibold text-lg text-navy hover:text-yellow-500 hover:underline transition duration-300"
              >
                {item.foodName}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-2 mt-6">
        <button
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={pagination.currentPage === 1}
          className={`p-2 rounded-full bg-gray-900 text-white hover:bg-yellow-500 transition duration-300 disabled:opacity-50`}
        >
          <ChevronLeft size={20} />
        </button>
        {Array.from({ length: pagination.totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={index + 1 === pagination.currentPage}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold ${
              index + 1 === pagination.currentPage
                ? "bg-yellow-500 text-white"
                : "bg-gray-900 text-white hover:bg-yellow-500 transition duration-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={pagination.currentPage === pagination.totalPages}
          className={`p-2 rounded-full bg-gray-900 text-white hover:bg-yellow-500 transition duration-300 disabled:opacity-50`}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default DifficultyFilter;
