import React, { useEffect, useState } from "react";
import { IoStarSharp } from "react-icons/io5";
import { FaThumbsUp, FaShareAlt } from "react-icons/fa";
import styles from "./RecipePage.module.css";
import {Link} from 'react-router-dom';
import { FaArrowLeftLong, FaArrowRightLong, FaPrint } from "react-icons/fa6";
import axios from "axios";
function RecipeHeader({recipeData}) {
  const [recipe,setRecipe]=useState();
  
  useEffect(()=>{
    setRecipe(recipeData);
  },[recipeData]);

  const handlePrint = () => {
    window.print();
  };
  const handleLikeIncrement = async (foodId) => {
    const userID = localStorage.getItem("authToken");
    console.log(foodId, userID);
    const config = {
      headers: {
        Auth: localStorage.getItem("authToken"),
      },
    };
    const response = await axios.post(
      "http://localhost:3001/api/food/like/",
      { foodId: foodId },
      config
    );
    console.log(response);
  };
  return (
    <div className="mt-3">
      <p>
        <Link to="/category">Categories</Link>
        {">>"}
        <Link to={`/category/${recipe.FoodDetails["foodCategoryId"]}`}>
          {recipe["category"]}
        </Link>
        {">>"} {recipe.FoodDetails["foodName"]}
      </p>
      <div className="d-flex flex-md-row flex-column justify-content-between">
        <div>
          <h1 className="fw-bold" style={{ fontSize: "350%" }}>
            {recipe.FoodDetails["foodName"]}
          </h1>
          {["Veg", "Salad", "Breakfast"].map((item, index) => (
            <span
              className="mx-1 btn btn-outline-warning text-dark my-2"
              key={index}
            >
              {item}
            </span>
          ))}
        </div>
        <div className="d-flex mt-3 mb-3 mb-md-0">
          <span className="mx-2" title="Like Recipe">
            <FaThumbsUp size={30} color="black" style={{ cursor: "pointer" }} />
          </span>
          <span className="mx-2" title="Share Recipe">
            <FaShareAlt
              size={30}
              color="#ffc107"
              style={{ cursor: "pointer" }}
            />
          </span>
          <span className="mx-2" title="Print Recipe" onClick={handlePrint}>
            <FaPrint size={30} color="black" style={{ cursor: "pointer" }} />
          </span>
        </div>
      </div>
      <p>
        By -: <em>Pranav Malpani</em>
      </p>
      <div className="d-flex flex-row">
        {[...Array(Math.floor(Math.random() * 10))].map((_, starIndex) => (
          <p key={starIndex}>
            <IoStarSharp className={starIndex > 0 ? "mx-1" : ""} />
          </p>
        ))}
      </div>
      <div className={styles.recipe_desc}>
        {recipe.FoodDetails["foodDesc"] || "N/A"}
      </div>
      <div className="col-md-11 col-sm-12">
        <img
          src={recipe.FoodDetails["previewImg"]}
          alt=""
          className={styles.Large_img}
        ></img>
      </div>
    </div>
  );
}

export default RecipeHeader;
