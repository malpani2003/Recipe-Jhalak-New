import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const LatestRecipe = () => {
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    async function allFoodGetRequest() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/food/latest`);
        setRecipe(response.data);
      } catch (err) {
        console.log("Error Occurred");
      }
    }
    allFoodGetRequest();
  }, []);

  return (
    <div className="container mx-auto mb-5 px-4">
      <h2 className="text-3xl font-bold mb-4">Latest Recipes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestRecipe;
