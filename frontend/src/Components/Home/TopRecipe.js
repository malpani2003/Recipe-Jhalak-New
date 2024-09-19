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

  const calculateRating = (likeCount, visitorCount) => {
    if (visitorCount === 0) return 0; // Avoid division by zero
    const likeRatio = Math.min(likeCount / visitorCount, 1);
    return (likeRatio * 5).toFixed(1);
  };

  return (
    <div className="container mx-auto mb-5 px-4">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Top Most Liked Recipes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.map((item) => (
          <div
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
            key={item._id}
          >
            <img
              src={item.foodImg}
              alt={item.foodName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <Link
                  to={`/food/${item._id}`}
                  className="text-lg font-semibold text-gray-800 hover:text-orange-500"
                >
                  {item.foodName}
                </Link>
              </div>
              <div className="flex items-center mb-2">
                {/* Star Rating */}
                {/* <div className="flex items-center">
                  {[...Array(5)].map((_, starIndex) => (
                    <IoStarSharp
                      key={starIndex}
                      className={`text-yellow-400 ${starIndex < Math.floor(calculateRating(item.likeCount, item.visitorCount)) ? "text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="ml-2 text-gray-500">
                    {calculateRating(item.likeCount, item.visitorCount)} / 5
                  </span>
                </div> */}
              </div>
              <div className="flex justify-between text-gray-600 text-sm">
                <span className="bg-yellow-400 p-2 font-semibold text-violet-900 rounded-xl">Likes: {item.likeCount}</span>
                {/* <span className="bg-yellow-400 p-2 font-semibold text-violet-900 rounded-xl">Visitors: {item.visitorCount}</span> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRecipe;
