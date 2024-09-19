// import React, { useEffect, useState } from "react"; 
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { AiFillLike } from "react-icons/ai";
// import { IoStarSharp } from "react-icons/io5";
// import { ArrowBigDown } from "lucide-react";

// function LatestRecipe() {
//   const [recipe, setRecipe] = useState([]);
  
//   useEffect(() => {
//     async function allFoodGetRequest() {
//       console.log(process.env.REACT_APP_API_URL);
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_URL}/food/latest`);
//         setRecipe(response.data); 
//       } catch (err) {
//         console.log("Error Occurred");
//       }
//     }
//     allFoodGetRequest();
//   }, []);

//   const handleLikeIncrement = async (foodId) => {
//     const userID = localStorage.getItem("authToken");
//     const config = {
//       headers: {
//         Auth: localStorage.getItem("authToken"),
//       },
//     };
//     try {
//       const response = await axios.post(
//         "https://recipe-jhalak-new.onrender.com/api/food/like/",
//         { foodId: foodId },
//         config
//       );
//       console.log(response);
//     } catch (error) {
//       alert("Recipe Cannot Be Liked");
//       console.log(error.message);
//     }
//   };

//   return (
//     <div className="container mx-auto mb-5 px-4">
//       <h2 className="text-3xl font-bold mb-4">Latest Recipes</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {recipe.map((item, index) => (
//           <div
//             className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
//             key={index}
//           >
//             <img
//               src={item.foodImg}
//               alt={item.foodName}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <div className="flex justify-between items-center mb-2">
//                 <Link
//                   to={`/food/${item._id}`}
//                   className="text-lg font-semibold text-gray-800 hover:text-orange-500"
//                 >
//                   {item.foodName}
//                 </Link>
//               </div>
//               <div className="flex">
//                 {[...Array(Math.floor(Math.random() * 10))].map((_, starIndex) => (
//                   <IoStarSharp
//                     key={starIndex}
//                     className={`text-yellow-400 ${starIndex > 0 ? "ml-1" : ""}`}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function TopRecipe() {
//   const [recipe, setRecipe] = useState([]);

//   useEffect(() => {
//     async function allFoodGetRequest() {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_URL}/food/mostLiked`);
//         const recipeData = response.data;
//         recipeData.sort((a, b) => b.likes - a.likes);
//         setRecipe(recipeData.slice(0, 9));
//       } catch (err) {
//         console.log("Error Occurred");
//       } 
//     }

//     allFoodGetRequest();
//   }, []);

//   // Function to calculate the rating based on likeCount and visitorCount
//   const calculateRating = (likeCount, visitorCount) => {
//     const maxLikes = 1000; // Define a maximum value for likes for scaling purposes
//     const maxVisitors = 5000; // Define a maximum value for visitors for scaling purposes

//     // Normalizing the likes and visitor counts (scaling them to 0 - 1 range)
//     const likeRatio = Math.min(likeCount / maxLikes, 1); 
//     const visitorRatio = Math.min(visitorCount / maxVisitors, 1);

//     // Calculating the weighted rating
//     const rating = (likeRatio * 0.7 + visitorRatio * 0.3) * 5;

//     // Returning the rating rounded to 1 decimal place
//     return rating.toFixed(1);
//   };

//   const handleLikeIncrement = async (foodId) => {
//     const userID = localStorage.getItem("authToken");
//     const config = {
//       headers: {
//         Auth: localStorage.getItem("authToken"),
//       },
//     };
//     try {
//       const response = await axios.post(
//         "https://recipe-jhalak-new.onrender.com/api/food/like/",
//         { foodId: foodId },
//         config
//       );
//       console.log(response);
//     } catch (error) {
//       alert("Recipe Cannot Be Liked");
//       console.log(error.message);
//     }
//   };

//   return (
//     <div className="container mx-auto mb-5 px-4">
//       <h2 className="text-3xl font-bold mb-4">Top Most Liked Recipes</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {recipe.map((item, index) => (
//           <div
//             className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
//             key={index}
//           >
//             <img
//               src={item.foodImg}
//               alt={item.foodName}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <div className="flex justify-between items-center mb-2">
//                 <Link
//                   to={`/food/${item._id}`}
//                   className="text-lg font-semibold text-gray-800 hover:text-orange-500"
//                 >
//                   {item.foodName}
//                 </Link>
//               </div>
//               <div className="flex">
//                 {/* Displaying rating based on visitorCount and likeCount */}
//                 {[...Array(5)].map((_, starIndex) => (
//                   <IoStarSharp
//                     key={starIndex}
//                     className={`text-yellow-400 ${starIndex < Math.floor(calculateRating(item.likes, item.visitorCount)) ? "ml-1" : ""}`}
//                   />
//                 ))}
//                 <span className="ml-2 text-gray-500">
//                   {calculateRating(item.likeCount, item.visitorCount)} / 5
//                 </span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



// const HeroSection = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const content = [
//     {
//       image: "https://media.istockphoto.com/id/1365398175/photo/chef-decorate-plate-with-food-on-kitchen.jpg?s=612x612&w=0&k=20&c=1WP0yJahorROwRJpkUb6jMJudpYTAFeqHT9yqZYmZyg=",
//       title: "Spice Delight",
//       description:
//         "Discover the bold flavors of Indian spices in this exciting dish. Taste the heat, balance the flavor, and enjoy!"
//     },
//     {
//       image: "https://media.istockphoto.com/id/1365398175/photo/chef-decorate-plate-with-food-on-kitchen.jpg?s=612x612&w=0&k=20&c=1WP0yJahorROwRJpkUb6jMJudpYTAFeqHT9yqZYmZyg=",
//       title: "Traditional Feast",
//       description:
//         "A feast fit for royalty! Experience the rich traditions of Indian culinary art with every bite."
//     },
//     {
//       image: "https://media.istockphoto.com/id/1365398175/photo/chef-decorate-plate-with-food-on-kitchen.jpg?s=612x612&w=0&k=20&c=1WP0yJahorROwRJpkUb6jMJudpYTAFeqHT9yqZYmZyg=",
//       title: "Modern Twist",
//       description:
//         "A fusion of modern techniques and classic flavors. Try this contemporary dish with an Indian twist!"
//     }
//   ];

//   const handleNext = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % content.length);
//   };

//   useEffect(() => {
//     const interval = setInterval(handleNext, 3000); // Automatically slide every 5 seconds
//     return () => clearInterval(interval); // Clean up on unmount
//   }, []);

//   return (
//     <div className="bg-gray-100 p-4 md:p-40 flex justify-center items-center ">
//       <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row p-4 md:p-8 max-w-4xl w-full relative">
//         {/* Image Section */}
//         <div className="relative w-full md:w-1/2 bg-gray-50 flex items-center justify-center rounded-t-lg md:rounded-l-lg md:rounded-tr-none overflow-hidden">
//           {/* <span
//             onClick={handlePrev}
//             className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-gray-200"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//             </svg>
//           </span> */}

//           <img
//             src={content[currentIndex].image}
//             alt="Recipe Jhalak"
//             className="w-full h-auto object-cover transition duration-500 ease-in-out rounded-lg transform hover:scale-105"
//           />

//           {/* <span
//             onClick={handleNext}
//             className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-gray-200"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//             </svg>
//           </span> */}
//         </div>

//         {/* Text Section */}
//         <div className="w-full md:w-1/2 pl-0 md:pl-8 flex flex-col justify-center py-4 md:py-0 text-center md:text-left">
//           <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
//             {content[currentIndex].title}
//           </h2>
//           <p className="text-gray-600 mb-4 text-sm md:text-base">
//             {content[currentIndex].description}
//           </p>
//           <button className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition duration-200 mx-auto md:mx-0">
//             View Recipe
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };


// function Index() {
//   const [category, setCategory] = useState([]);

//   useEffect(() => {
//     async function categoryGetRequest() {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_API_URL}/category/popular`
//         );
//         setCategory(response.data.slice(0, 6));
//       } catch (err) {
//         console.log("Error Occurred");
//       }
//     }

//     categoryGetRequest();
//   }, []);

//   return (
//     <div>
//       {/* <img
//         src="https://img.sndimg.com/food/image/upload/f_auto,c_thumb,q_55,w_1280,ar_16:9/v1/img/recipes/54/32/04/jaZWq4VnRbeqrr2zc2U6_garlic-bread-beauty-1.jpg"
//         alt="Banner"
//         className="w-full h-96 object-cover mb-6"
//       /> */}
//       {/* <HeroSection></HeroSection> */}
//       <div className="container mx-auto px-4 mt-6">
//         <h2 className="text-3xl font-bold mb-4">Popular Categories</h2>
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
//           {category.map((item, index) => (
//             <div className="bg-gray-100 rounded-xl shadow-md hover:bg-gray-200 transform transition-transform duration-300 hover:scale-105">
//             <img
//               src={item.Category_Img}
//               alt={item.Category_Name}
//               className="w-full h-40 object-cover rounded-t-xl"
//             />
//             <div className="py-1 text-center">
//               <Link
//                 to={`/category/${item._id}`}
//                 className="text-lg font-semibold text-gray-800 hover:text-orange-500"
//               >
//                 {item.Category_Name}
//               </Link>
//             </div>
//           </div>
//           ))}
//         </div>
//         <div className="flex justify-center mt-6">
//           <Link
//             to="/category"
//             className="btn btn-outline-dark border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-6 py-2 rounded-lg"
//           >
//            <ArrowBigDown></ArrowBigDown>
//           </Link>
//         </div>
//       </div>
//       <LatestRecipe />
//       <TopRecipe />
//     </div>
//   );
// }

// // export default Index;
