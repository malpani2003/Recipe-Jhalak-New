// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import styles from "./UserProfile.module.css";
// import { redirect, useNavigation } from 'react-router-dom'
// import Avatar from 'react-avatar';
// import Hamburger from 'hamburger-react'

// const NewProfile = () => {
//   const [userData, setUserData] = useState(null);
//   const [authToken, setAuthToken] = useState(null);

//   useEffect(() => {
//     const getToken = () => {
//       const authToken = localStorage.getItem("authToken");
//       console.log(authToken)
//       setAuthToken(authToken);
//     }
//     getToken();
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("https://recipe-jhalak-new.onrender.com/api/users/profile", {
//           withCredentials: true
//         });
//         console.log(response);
//         setUserData(response.data.message);
//       } catch (error) {
//         console.error("Error fetching profile data:", error);
//       }
//     };

//     fetchData();
//   }, [authToken]);

//   return (
//     <>
//       <div>{authToken}</div>
//       {userData &&
//         <div className="container-fluid">
//            <div className="col-md-4">
//                 <h3>{userData["Name"]}</h3>
//            </div>
//            <div className="col-md-8"></div>
//         </div>}
//     </>
//   );
// }


// export default NewProfile
