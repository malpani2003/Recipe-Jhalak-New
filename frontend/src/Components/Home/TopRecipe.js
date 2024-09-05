import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { AiFillLike } from "react-icons/ai";
import { IoStarSharp } from "react-icons/io5";
import styles from './Home.module.css';
import { Link } from 'react-router-dom';

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
    <div className="container-fluid px-5  mb-5">
      <h2 className="fw-bold my-3">Top Most Liked Recipe</h2>
      <div className={`row ${styles["recipeContainer"]}`}>
        {recipe.map((item, index) => (
          <div
            className={`col-lg-3 col-md-6 col-6 ${styles["latestRecipeItem"]}`}
            key={index}
          >
            <div style={{ display: "flex", width: "100%", height: "300px" }}>
              <img
                src={item.foodImg}
                alt={item.Category_Name}
                style={{
                  minWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            </div>
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

export default TopRecipe;
