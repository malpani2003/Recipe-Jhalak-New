import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../common/Loading";
import RecipeFeature from "./RecipeFeature";
import Ingrediants from "./Ingrediants";
import RecipeReview from "./RecipeReview";
import RecipeInstructions from "./RecipeInstructions";
import WriteComment from "./WriteComment";
import SimilarFoodItem from "./SimilarFoodItem";
import RecipeHeader from "./RecipeHeader";
// import styles from "./RecipePage.module.css";
// import { FaArrowLeftLong, FaArrowRightLong, FaPrint } from "react-icons/fa6";

// function ImageSlider() {
//   const [currentindex, setcurrentindex] = useState(0);
//   const [nextindex, setnextindex] = useState(1);
//   const popular_item_arr = [
//     {
//       imgUrl:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeFzEmnNC38AOePpCicjbqvV1yVAa5BC8GWg&usqp=CAU",
//       name: "Samosa",
//     },
//     {
//       imgUrl:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeFzEmnNC38AOePpCicjbqvV1yVAa5BC8GWg&usqp=CAU",
//       name: "Poha",
//     },
//     {
//       imgUrl:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeFzEmnNC38AOePpCicjbqvV1yVAa5BC8GWg&usqp=CAU",
//       name: "Dal Bati",
//     },
//     {
//       imgUrl:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeFzEmnNC38AOePpCicjbqvV1yVAa5BC8GWg&usqp=CAU",
//       name: "Pizza",
//     },
//     {
//       imgUrl:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeFzEmnNC38AOePpCicjbqvV1yVAa5BC8GWg&usqp=CAU",
//       name: "Burger",
//     },
//   ];
//   function handlePreviousImage() {
//     const length = popular_item_arr.length;
//     setcurrentindex((currentindex - 1 + length) % length);

//     // setnextindex(currentindex===0?length-2:currentindex-2);
//   }
//   function handleNextImage() {
//     const length = popular_item_arr.length;
//     setcurrentindex((currentindex + 1 + length) % length);
//     // setnextindex(currentindex===length-1?1:currentindex+2);
//   }
//   return (
//     <div className="d-flex flex-row justify-content-around align-self-center">
//       <FaArrowLeftLong
//         onClick={handlePreviousImage}
//         className="align-self-center"
//       ></FaArrowLeftLong>
//       <div className={`${styles.same_category_item}`}>
//         <img
//           src={popular_item_arr[currentindex]["imgUrl"]}
//           alt={popular_item_arr[currentindex]["name"]}
//         ></img>
//         <br></br>
//         <Link to="/category/dalbati" className={`${styles.food_item}`}>
//           {popular_item_arr[currentindex]["name"]}
//         </Link>
//       </div>
//       <div className={`${styles.same_category_item}`}>
//         <img
//           src={
//             popular_item_arr[(currentindex + 1) % popular_item_arr.length][
//               "imgUrl"
//             ]
//           }
//           alt={
//             popular_item_arr[(currentindex + 1) % popular_item_arr.length][
//               "name"
//             ]
//           }
//         ></img>
//         <br></br>
//         <Link to="/category/dalbati" className={`${styles.food_item}`}>
//           {
//             popular_item_arr[(currentindex + 1) % popular_item_arr.length][
//               "name"
//             ]
//           }
//         </Link>
//       </div>
//       <FaArrowRightLong
//         onClick={handleNextImage}
//         className="align-self-center"
//       ></FaArrowRightLong>
//     </div>
//   );
// }

function NewRecipePage() {
  const [recipe, setRecipe] = useState({});
  const [recipeIngredients, setRecipeIngredients] = useState(null);
  const [recipeInstructions, setRecipeInstructions] = useState(null);
  const [FoodFromCategory, setSimilarFoodFromCategory] = useState([]);
  const foodId = useParams()["foodId"];
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/food/${foodId}`
        );
        const foodData = response.data;
        if (foodData && foodData["FoodDetails"]) {
          setLoading(false);
          setRecipe(foodData);
          console.log(foodData);
          setRecipeIngredients(
            foodData["FoodDetails"]["foodIngrediants"] || []
          );
          setRecipeInstructions(
            foodData["FoodDetails"]["foodInstruction"] || []
          );
          setSimilarFoodFromCategory(foodData["similarFoodCategory"] || []);
        } else {
          // Handle the case where expected data is not available
          setError("Recipe Not Found");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
        setError(err.message);
        // Handle the error, e.g., show a message to the user
      }
    };
    fetchData();
  }, [foodId]);
  if (loading) return <Loading />;
  if (error) return <h2>Error Occurred: {error}</h2>;
  if (!recipe) return null;
  // console.log(recipeIngredients,recipeInstructions);
  return (
    <div className="container-fluid">
      <RecipeHeader recipeData={recipe}></RecipeHeader>
      <div className="row">
        <div className="col-md-5">
          {recipeIngredients.length >= 0 ? (
            <Ingrediants recipe={recipeIngredients}></Ingrediants>
          ) : (
            <>
              <h2 className="my-3 fw-bold">Ingrediants Required</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: recipeIngredients[0],
                }}
              ></div>
            </>
          )}
        </div>
        <div className="col-md-7">
          {recipeInstructions.length == 1 ? (
            <>
              <h2 className="my-3 fw-bold">Recipe to Cook Food</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: recipeInstructions[0],
                }}
              ></div>
            </>
          ) : (
            <RecipeInstructions
              recipeInstructions={recipeInstructions}
            ></RecipeInstructions>
          )}
        </div>
      </div>

      <RecipeReview comment={recipe["FoodDetails"]["comments"]}></RecipeReview>
      <WriteComment id={recipe["FoodDetails"]["_id"]}></WriteComment>

      {FoodFromCategory.length > 4 ? (
        <SimilarFoodItem similarFood={FoodFromCategory}></SimilarFoodItem>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default NewRecipePage;
