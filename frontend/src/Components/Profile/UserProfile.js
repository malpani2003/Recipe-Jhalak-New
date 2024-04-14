import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./UserProfile.module.css";
import { redirect, useNavigation } from 'react-router-dom'
import Avatar from 'react-avatar';

const UserProfile = () => {
  const [selectedTab, setSelectedTab] = useState("liked");
  const [recipes, setRecipes] = useState([]);
  const [userData,setUserData]=useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [show,setShow]=useState(0);

  // const navigate = useNavigation();

  // if(!userData){
  //   redirect("/")
  useEffect(()=>{
    const getToken=()=>{
      const authToken = localStorage.getItem("authToken");
      // console.log(authToken)
      setAuthToken(authToken);
    }
    getToken();
  },[show])
  // }
  useEffect(() => {
    // if (!authToken) {
    //   navigate("/login");
    //   return;
    // }


    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/users/profile", {
          withCredentials: true
        });
        console.log(response);
        setUserData(response.data.message);
      } catch (error) {
        console.error("Error fetching profile data:", error); 
      }
    };

    fetchData();
  },[authToken]);

  const showLikedRecipes = () => {
    const likedRecipes = ["Liked Recipe 1", "Liked Recipe 2", "Liked Recipe 3"];
    setRecipes(likedRecipes);
    setSelectedTab("liked");
  };

  const showSavedRecipes = () => {
    const savedRecipes = ["Saved Recipe A", "Saved Recipe B", "Saved Recipe C"];
    setRecipes(savedRecipes);
    setSelectedTab("saved");
  };

  return (
    <div className={styles.App}>
      {/* <button onClick={()=>setShow(1)}>Click Here</button> */}
      {userData && <Sidebar
        showLikedRecipes={showLikedRecipes}
        showSavedRecipes={showSavedRecipes}
        userData={userData}
      />
}      <Content recipes={recipes} selectedTab={selectedTab} />
    </div>
  );
};
const Sidebar = ({ showLikedRecipes, showSavedRecipes,userData}) => (
  <div className={styles.sidebar}>
    <div className={styles.profileHeader}>
      {/* <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJLKcbjWaX2RL8_ZJWTf276BAKWIe_TDoKLg&usqp=CAU"
        alt="User Profile"
        className={styles.profileImage}
      /> */}
      <Avatar name={userData["Name"] || "Pranav"} round={true} size="100" className={styles.profileImage} />
      <div className={styles.profileInfo}>
        <h2 className={styles.profileName}>{userData["Name"] || "Pranav"}</h2>
      </div>
    </div>
    <div className={styles.profileDetails}>
      <p className={styles.detailItem}>
        <strong>Email:</strong> {userData["Email_id"] || "Pranav"}
      </p>
      <p className={styles.detailItem}>
        <strong>Member Since:</strong> {userData["createdAt"].split("T")[0] || "Pranav"}
      </p>
      <p className={styles.detailItem}>
        <span className={`${userData["Verified"]?"text-success":"text-danger"} fw-bold`}>{userData["Verified"]?"Verified User":"Not Verified User"}</span>
      </p>
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
