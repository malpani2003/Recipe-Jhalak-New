import React, { useEffect, useState } from "react";
import { IoStarSharp } from "react-icons/io5";
import {
  FaThumbsUp,
  FaShareAlt,
  FaPrint,
  FaClock,
  FaMapMarkerAlt,
  FaLeaf,FaChartLine,
  FaUtensils,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../common/Loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RecipeHeader = ({ recipeData }) => {
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    if (recipeData) {
      setRecipe(recipeData);
    }
  }, [recipeData]);

  const handlePrint = () => {
    window.print();
  };

  const handleLikeIncrement = async (foodId) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/food/like/`,
        { foodId: foodId },
        { withCredentials: true }
      );
      console.log(response);
      toast.success("Recipe liked successfully!");
    } catch (error) {
      console.error("Error liking the recipe:", error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  const handleShare = () => {
    navigator
      .share({
        title: "Check out this recipe!",
        url: window.location.href,
      })
      .then(() => console.log("Shared successfully"))
      .catch(console.error);
  };

  if (!recipe.FoodDetails) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-0">
      <div
        className="relative rounded-lg overflow-hidden mt-3"
        style={{ height: "60vh" }}
      >
        <div
          className="absolute inset-0 bg-center bg-cover rounded-lg"
          style={{
            backgroundImage: `url(${recipe.FoodDetails.previewImg})`,
            filter: "blur(3px)",
          }}
        ></div>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-4xl font-bold mb-3">
            {recipe.FoodDetails.foodName}
          </h1>
        </div>
      </div>

      <div className="container mx-auto mt-4">
        <nav aria-label="breadcrumb" className="text-sm breadcrumbs">
          <ul className="flex justify-center gap-2">
            <li>
              <Link to="/category" className="text-blue-800 hover:underline hover:font-semibold">
                Categories
              </Link>
            </li>
            <li>
              <span>/</span>
            </li>
            <li>
              <Link
                to={`/category/${recipe.FoodDetails.foodCategoryId}`}
                className="text-blue-800 hover:font-semibold hover:underline"
              >
                {recipe.category}
              </Link>
            </li>
            <li>
              <span>/</span>
            </li>
            <li>
              <span className="text-gray-600">
                {recipe.FoodDetails.foodName}
              </span>
            </li>
          </ul>
        </nav>

        <div className="mt-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-wrap justify-between items-center mb-3">
              <div className="mb-2 md:mb-0">
                {["Veg", "Salad", "Breakfast"].map((item, index) => (
                  <span
                    key={index}
                    className="bg-green-500 text-white text-xs px-3 py-2 rounded-full mr-2 mb-1"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="flex items-center">
                {/* {[...Array(5)].map((_, starIndex) => (
                  <IoStarSharp key={starIndex} className="text-yellow-400" />
                ))} */}
                {/* <span className="ml-2 text-gray-500 hidden sm:inline">
                  (Random rating)
                </span> */}
                <div>
                  <div className="flex flex-wrap justify-around">
                    {[
                      {
                        icon: FaThumbsUp,
                        label: "Like",
                        action: () =>
                          handleLikeIncrement(recipe.FoodDetails._id),
                      },
                      {
                        icon: FaShareAlt,
                        label: "Share",
                        action: handleShare,
                      },
                      {
                        icon: FaPrint,
                        label: "Print",
                        action: handlePrint,
                      },
                    ].map((item, index) => (
                      <button
                        key={index}
                        className="btn border mr-2 p-2 rounded transition duration-300 flex flex-row justify-center hover:bg-blue-800 hover:text-white"
                        onClick={item.action}
                      >
                        <item.icon className="mb-1" />
                        <span className="block text-sm mx-1 ">
                          {item.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <p className="text-lg mb-4">
              {recipe.FoodDetails.foodDesc || "No description available."}
            </p>
            <div className="grid grid-cols-3 md:grid-cols-6 justify-around text-center mt-4">
              {[
                {
                  icon: FaClock, // Time-related icon
                  label: "Prep Time",
                  value: `${recipe.FoodDetails.preparationTime} min`,
                },
                {
                  icon: FaClock, // Time-related icon
                  label: "Cook Time",
                  value: `${recipe.FoodDetails.cookingTime} min`,
                },
                {
                  icon: FaUtensils, // Serving or dining icon
                  label: "Servings",
                  value: "4 people",
                },
                {
                  icon: FaChartLine, // Difficulty icon
                  label: "Difficulty",
                  value: recipe.FoodDetails.difficulty,
                },
                {
                  icon: FaMapMarkerAlt, // Location icon
                  label: "Country",
                  value: recipe.FoodDetails.foodArea,
                },
                {
                  icon: FaLeaf, 
                  label: "Veg / Non-Veg",
                  value: "",
                },
              ].map((item, index) => (
                <div key={index} className="mb-3 mx-2">
                  <item.icon
                    className="text-yellow-400 mb-2 mx-auto"
                    size={24}
                  />
                  <p className="mb-0 text-sm">{item.label}</p>
                  <p className="font-bold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeHeader;
