import React from 'react'
import styles from './RecipePage.module.css';

function RecipeInstructions({ recipeInstructions }) {
    return (
      <div className={styles.recipe}>
        <h2 className="my-3 fw-bold">Recipe to Cook Food</h2>
        {/* <h4 className="text-center">
            Follow these instruction carefully step by step today!
          </h4> */}
        <ol type="1">
          {recipeInstructions.map((element, index) => (
            <>
              <li className="my-2" key={index}>
                {element}
              </li>
            </>
          ))}
        </ol>
      </div>
    );
  }
  
export default RecipeInstructions