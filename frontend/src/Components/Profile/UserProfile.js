// UserProfile.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./UserProfile.module.css";

const UserProfile = () => {
  const [selectedTab, setSelectedTab] = useState("liked");
  const [recipes, setRecipes] = useState([]);

  const showLikedRecipes = () => {
    // Simulate fetching liked recipes (replace this with actual logic)
    const likedRecipes = ["Liked Recipe 1", "Liked Recipe 2", "Liked Recipe 3"];
    setRecipes(likedRecipes);
    setSelectedTab("liked");
  };

  const showSavedRecipes = () => {
    // Simulate fetching saved recipes (replace this with actual logic)
    const savedRecipes = ["Saved Recipe A", "Saved Recipe B", "Saved Recipe C"];
    setRecipes(savedRecipes);
    setSelectedTab("saved");
  };

  return (
    <div className={styles.App}>
      <Sidebar
        showLikedRecipes={showLikedRecipes}
        showSavedRecipes={showSavedRecipes}
      />
      <Content recipes={recipes} selectedTab={selectedTab} />
    </div>
  );
};

const Sidebar = ({ showLikedRecipes, showSavedRecipes }) => (
  <div className={styles.sidebar}>
    <div className={styles.profileHeader}>
     <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJLKcbjWaX2RL8_ZJWTf276BAKWIe_TDoKLg&usqp=CAU" alt="User Profile"
        className={styles.profileImage}
      />
      <div className={styles.profileInfo}>
        <h2 className={styles.profileName}>Pranav Malpani</h2>
      </div>
    </div>
      <div className={styles.profileDetails}>
        <p className={styles.detailItem}>
          <strong>Email:</strong> john.doe@example.com
        </p>
        <p className={styles.detailItem}>
          <strong>Member Since:</strong> January 2020
        </p>
        <p className="text-success fw-bold">Verifed User</p>
      </div>
    <button onClick={showLikedRecipes}>Liked Recipes</button>
    <button onClick={showSavedRecipes}>Saved Recipes</button>
  </div>
);

const Content = ({ recipes, selectedTab }) => (
  <div className={styles.content}>
    <ul className={styles.recipe_list}>
      {recipes.map((recipe, index) => (
        <li key={index}>{recipe}</li>
      ))}
    </ul>
  </div>
);
export default UserProfile;
