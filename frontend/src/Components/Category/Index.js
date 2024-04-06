import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./Category.module.css"; // Import the styles from your module
import { Link } from "react-router-dom";
import axios from "axios";
import { AiFillLike } from "react-icons/ai";
import { IoStarSharp } from "react-icons/io5";
function LatestRecipe() {
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    async function allFoodGetRequest() {
      try {
        const response = await axios.get("http://localhost:3001/api/food/all");
        setRecipe(response.data.splice(0, 6));
      } catch (err) {
        console.log("Error Occurred");
      }
    }

    allFoodGetRequest();
  }, []);

  const handleLikeIncrement = async (foodId) => {
    const userID = localStorage.getItem("authToken");
    console.log(foodId, userID);
    const config = {
      headers: {
        Auth: localStorage.getItem("authToken"),
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
      alert("Recipe Cannot Be Liked");
      console.log(error.message);
    }
  };
  return (
    <div className="container mb-5">
      <h2 className="fw-bold my-3">Latest Recipe</h2>
      <div className={`row ${styles["recipeContainer"]}`}>
        {recipe.map((item, index) => (
          <div
            className={`col-md-4 col-6 ${styles["latestRecipeItem"]}`}
            key={index}
          >
            <img
              src={item.foodImg}
              alt={item.Category_Name}
              className="w-100 rounded"
            ></img>
            <div
              className={`d-flex flex-row justify-content-between ${styles["itemLinkContainer"]}`}
            >
              <Link
                to={`/food/${item._id}`}
                className={`fw-bold ${styles["itemLink"]}`}
              >
                {item.foodName}
              </Link>
              <AiFillLike
                color="orange"
                className={styles["likeText"]}
                onClick={() => handleLikeIncrement(item._id)}
              />
            </div>
            <div className="d-flex flex-row">
              {[...Array(Math.floor(Math.random() * 10))].map(
                (_, starIndex) => (
                  <p key={starIndex}>
                    <IoStarSharp className={starIndex > 0 ? "mx-1" : ""} />
                  </p>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TopRecipe() {
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    async function allFoodGetRequest() {
      try {
        const response = await axios.get("http://localhost:3001/api/food/all");
        const recipeData = response.data;
        recipeData.sort((a, b) => b.likes - a.likes);
        setRecipe(recipeData.slice(0, 9));
      } catch (err) {
        console.log("Error Occurred");
      }
    }

    allFoodGetRequest();
  }, []);

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
    <div className="container mb-5">
      <h2 className="fw-bold my-3">Top Most Liked Recipe</h2>
      <div className={`row ${styles["recipeContainer"]}`}>
        {recipe.map((item, index) => (
          <div
            className={`col-lg-3 col-md-4 col-6 ${styles["latestRecipeItem"]}`}
            key={index}
          >
            <img
              src={item.foodImg}
              alt={item.Category_Name}
              className="w-100 rounded"
            ></img>
            <div
              className={`d-flex flex-row justify-content-between ${styles["itemLinkContainer"]}`}
            >
              <Link
                to={`/food/${item._id}`}
                className={`fw-bold ${styles["itemLink"]}`}
              >
                {item.foodName}
              </Link>
              <AiFillLike
                color="orange"
                className={`${styles["likeText"]}`}
                onClick={() => handleLikeIncrement(item._id)}
              />
            </div>
            <div className="d-flex flex-row">
              {[...Array(Math.floor(Math.random() * 10))].map(
                (_, starIndex) => (
                  <p key={starIndex}>
                    <IoStarSharp className={starIndex > 0 ? "mx-1" : ""} />
                  </p>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function Index() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    async function categoryGetRequest() {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/category/all"
        );
        // console.log(response.data);
        setCategory(response.data.splice(0, 6));
      } catch (err) {
        console.log("Error Occurred");
      }
    }

    categoryGetRequest();
  }, []);

  return (
    <div>
      <img
        src="https://img.sndimg.com/food/image/upload/f_auto,c_thumb,q_55,w_1280,ar_16:9/v1/img/recipes/54/32/04/jaZWq4VnRbeqrr2zc2U6_garlic-bread-beauty-1.jpg"
        className={styles["banner-img"]}
      ></img>

      <div className={`${styles["popular-category"]} container mt-3`}>
        <h2 className="fw-bold">Popular Category</h2>
        <div className={`row ${styles["category"]}`}>
          {category.map((item, index) => (
            <div
              className={`col-lg-2 col-md-3 col-4 ${styles["category-item"]}`}
              key={index}
            >
              <img src={item.Category_Img} alt={item.Category_Name}></img>
              <Link
                to={`/category/${item._id}`}
                className={`fw-bold ${styles["category-link"]}`}
              >
                {item.Category_Name}
              </Link>
            </div>
          ))}
        </div>
        <div class="d-flex justify-content-center">
          <Link
            to="/category"
            className={`${styles["category-show"]} btn btn-outline-dark mt-4`}
          >
            Show All
          </Link>
        </div>
      </div>
      <LatestRecipe></LatestRecipe>
      <TopRecipe></TopRecipe>
    </div>
  );
}

export default Index;
