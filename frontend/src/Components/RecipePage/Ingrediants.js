import React from 'react'
import styles from './RecipePage.module.css';

function Ingrediants({ recipe, className }) {
  console.log(recipe,className)
    return (
      <div className={className}>
        <h2 className="fw-bold my-3">Ingrediants Required </h2>
        <div className={styles.ingrediants}>
          <ul className="row">
            {recipe.split(",").map((element, index) => (
              <li key={index} className="my-1">
                {element}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  

export default Ingrediants