import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoStarSharp } from "react-icons/io5";

const TopRecipe = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchTopRecipes() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/food/mostLiked`);
        setRecipes(response.data);
      } catch (err) {
        console.error("Error Occurred:", err.message);
      }
    }
    fetchTopRecipes();
  }, []);

  const calculateRating = (likes, visitorCount) => {
    const rating = (likes / (visitorCount + 1)) * 5;
    return Math.min(Math.max(Math.round(rating), 1), 5);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Top Most Liked Recipes</h2>
      <div className="text-center mb-6">
        <div className="text-xl text-gray-600 italic font-medium bg-yellow-100 p-3 rounded-md shadow-md inline-block">
          "A crowd favorite with an impressive number of likes!"
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 lg:gap-3 xl:gap-8">
        {recipes.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="relative">
              <img
                src={item.foodImg}
                alt={item.foodName}
                loading="lazy"
                className="w-full h-56 object-cover"
              />
              <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold px-3 py-1 m-2 rounded-full">
                {item.likeCount} Likes
              </div>
            </div>
            <div className="p-3 space-y-3">
              <Link
                to={`/food/${item._id}`}
                className="block text-xl font-semibold text-gray-800 hover:text-orange-500 transition-colors duration-200"
              >
                {item.foodName}
              </Link>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, starIndex) => (
                    <IoStarSharp
                      key={starIndex}
                      className={`w-5 h-5 transition-colors duration-200 ${
                        starIndex < calculateRating(item.likeCount, item.visitorCount)
                          ? "text-yellow-400 animate-pulse"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 text-sm">
                  {item.visitorCount} visitors
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRecipe;
