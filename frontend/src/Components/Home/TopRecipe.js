import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoStarSharp } from "react-icons/io5";

const TopRecipe = () => {
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    async function allFoodGetRequest() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/food/mostLiked`);
        const recipeData = response.data;
        setRecipe(recipeData);
      } catch (err) {
        console.log("Error Occurred");
      }
    }
    allFoodGetRequest();
  }, []);

  const calculateRating = (likeCount, visitorCount) => {
    const maxLikes = 1000;
    const maxVisitors = 5000;
    const likeRatio = Math.min(likeCount / maxLikes, 1);
    const visitorRatio = Math.min(visitorCount / maxVisitors, 1);
    const rating = (likeRatio * 0.7 + visitorRatio * 0.3) * 5;
    return rating.toFixed(1);
  };

  return (
    <div className="container mx-auto mb-5 px-4">
      <h2 className="text-3xl font-bold mb-4">Top Most Liked Recipes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipe.map((item, index) => (
          <div
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
            key={index}
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
              <div className="flex">
                {[...Array(5)].map((_, starIndex) => (
                  <IoStarSharp
                    key={starIndex}
                    className={`text-yellow-400 ${starIndex < Math.floor(calculateRating(item.likes, item.visitorCount)) ? "ml-1" : ""}`}
                  />
                ))}
                <span className="ml-2 text-gray-500">
                  {calculateRating(item.likeCount, item.visitorCount)} / 5
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
