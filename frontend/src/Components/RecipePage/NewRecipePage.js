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
import ErrorPage from "../404Page/ErrorPage";

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
          `${process.env.REACT_APP_API_URL}/food/${foodId}`
        );
        const foodData = response.data;
        if (foodData && foodData["FoodDetails"]) {
          setLoading(false);
          setRecipe(foodData);
          setRecipeIngredients(
            foodData["FoodDetails"]["foodIngredients"] || []
          );
          setRecipeInstructions(
            foodData["FoodDetails"]["foodInstruction"] || []
          );
          setSimilarFoodFromCategory(foodData["similarFoodCategory"] || []);

          // Send a PUT request to increment recipe visits
          await axios.put(
            `${process.env.REACT_APP_API_URL}/food/visit/${foodId}`
          );
        } else {
          setError("Recipe Not Found");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
        setError(err.message);
      } 
    };
    fetchData();
  }, [foodId]);

  if (loading) return <Loading />;
  if (error) return <h2 className="text-red-500 text-center"><ErrorPage></ErrorPage></h2>;
  if (!recipe) return null;

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100">
      <RecipeHeader recipeData={recipe} />
      <div className="flex flex-col md:flex-row gap-5 mt-5 p-3">
        <div className="md:w-1/2">
          {recipeIngredients?.length >= 2 ? (
            <Ingrediants recipe={recipeIngredients[0]} />
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4">Ingredients Required</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: recipeIngredients?.[0] || "No ingredients available.",
                }}
                className="prose"
              />
            </>
          )}
        </div>
        <div className="md:w-1/2">
          {recipeInstructions?.length === 1 ? (
            <>
              <h2 className="text-2xl font-bold mb-4">Recipe to Cook Food</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: recipeInstructions[0],
                }}
                className="prose"
              />
            </>
          ) : (
            <RecipeInstructions recipeInstructions={recipeInstructions} />
          )}
        </div>
      </div>
    </div>
  );
}

export default NewRecipePage;
