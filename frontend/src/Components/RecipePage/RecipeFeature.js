import React from "react";
import { useState,useEffect } from "react";

function RecipeFeature({ recipe }) {
  const [recipes, setrecipe] = useState({});

  useEffect(() => {
    if (recipe && recipe["FoodDetails"]) {
      setrecipe(recipe["FoodDetails"]);
    }
  }, [recipe]);

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-4 mb-2">
          <h6 className="fw-bold">Total Time</h6>
          <p>{recipes["cookingtime"] || "N/A"} minutes</p>
        </div>
        <div className="col-4 mb-2">
          <h6 className="fw-bold">Preparation Time</h6>
          <p>{recipes["preparationTime"] || "N/A"} minutes</p>
        </div>
        <div className="col-4 mb-2">
          <h6 className="fw-bold">Number of Servings</h6>
          <p>5 serving(s)</p>
        </div>
        <div className="col-4 mb-3">
          <h6 className="fw-bold">Difficulty Level</h6>
          <p>{recipes["difficulty"] || "N/A"}</p>
        </div>
        <div className="col-4 mb-3">
          <h6 className="fw-bold">Country</h6>
          <p>{recipes["foodArea"] || "N/A"}</p>
        </div>
        <div className="col-4 mb-3">
          <h6 className="fw-bold">Veg/Non-Veg</h6>
          <p>{"Veg" || "N/A"}</p>
        </div>
      </div>
    </div>
  );
}

export default RecipeFeature;
