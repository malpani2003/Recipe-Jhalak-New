import React, { useEffect, useState } from "react";
import { IoStarSharp } from "react-icons/io5";
import {
  FaThumbsUp,
  FaShareAlt,
  FaPrint,
  FaClock,
  FaUtensils,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

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
    const userID = localStorage.getItem("authToken");
    const config = {
      headers: {
        Auth: userID,
      },
    };
    try {
      const response = await axios.post(
        "http://localhost:3001/api/food/like/",
        { foodId: foodId },
        config
      );
      console.log(response);
    } catch (error) {
      console.error("Error liking the recipe:", error);
    }
  };

  if (!recipe.FoodDetails) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-0">
      <div className="position-relative">
        <img
          src={recipe.FoodDetails.previewImg}
          alt={recipe.FoodDetails.foodName}
          className="w-100"
          style={{
            height: "50vh",
            objectFit: "cover",
            filter: "brightness(50%)",
          }}
        />
        <div className="position-absolute top-50 start-50 translate-middle text-center text-white">
          <h1 className="display-3 fw-bold mb-3">
            {recipe.FoodDetails.foodName}
          </h1>
          <p className="lead">
            By: <em>Pranav Malpani</em>
          </p>
        </div>
      </div>

      <div className="container mt-4">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/category">Categories</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/category/${recipe.FoodDetails.foodCategoryId}`}>
                {recipe.category}
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {recipe.FoodDetails.foodName}
            </li>
          </ol>
        </nav>

        <div className="row g-4">
          <div className="col-md-12">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    {["Veg", "Salad", "Breakfast"].map((item, index) => (
                      <span key={index} className="badge bg-success me-2">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="d-flex align-items-center">
                    {[...Array(5)].map((_, starIndex) => (
                      <IoStarSharp key={starIndex} className="text-warning" />
                    ))}
                    <span className="ms-2 text-muted">(Random rating)</span>
                  </div>
                </div>
                <p className="lead">
                  {recipe.FoodDetails.foodDesc || "No description available."}
                </p>
                <div className="d-flex flex-wrap justify-content-around text-center mt-4">
                  <div>
                    <FaClock className="text-warning mb-2" size={24} />
                    <p className="mb-0">Prep Time</p>
                    <p className="fw-bold">
                      {recipe.FoodDetails.preparationTime} min
                    </p>
                  </div>
                  <div>
                    <FaUtensils className="text-warning mb-2" size={24} />
                    <p className="mb-0">Cook Time</p>
                    <p className="fw-bold">
                      {recipe.FoodDetails.cookingTime} min
                    </p>
                  </div>
                  <div>
                    <FaUtensils className="text-warning mb-2" size={24} />
                    <p className="mb-0">Servings</p>
                    <p className="fw-bold">4 people</p>
                  </div>

                  <div>
                    <FaUtensils className="text-warning mb-2" size={24} />
                    <p className="mb-0">Difficulty Level</p>
                    <p className="fw-bold"> {recipe.FoodDetails.difficulty}</p>
                  </div>
                  <div>
                    <FaUtensils className="text-warning mb-2" size={24} />
                    <p className="mb-0">Country</p>
                    <p className="fw-bold"> {recipe.FoodDetails.foodArea}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-3">Recipe Actions</h5>
                <div className="d-grid gap-2">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleLikeIncrement(recipe.FoodDetails._id)}
                  >
                    <FaThumbsUp className="me-2" /> Like Recipe
                  </button>
                  <button className="btn btn-success">
                    <FaShareAlt className="me-2" /> Share Recipe
                  </button>
                  <button className="btn btn-secondary" onClick={handlePrint}>
                    <FaPrint className="me-2" /> Print Recipe
                  </button>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default RecipeHeader;
