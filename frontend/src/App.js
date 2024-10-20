import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import CategoryWiseItem from "./Components/Category/CategoryWiseItem";
import NewRecipePage from "./Components/RecipePage/NewRecipePage";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import ErrorPage from "./Components/404Page/ErrorPage";
import Reviews from "./Components/Reviews/Reviews";
import ShowCategory from "./Components/Category/ShowCategory";
import Filter from "./Components/Filter/Filter";
import FoodForm from "./Components/Food/FoodForm";
import UserProfile from "./Components/Profile/UserProfile";
import Index from "./Components/Home/Index";
import SearchFood from "./Components/Food/SearchFood";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewProfile from "./Components/Profile/NewUserProfile";
import ContactUs from "./Components/Contact/ContactUs";
import { AuthContext } from "./authContext";
import DifficultyFilter from "./Components/Food/DifficultyFilter";
import FoodTypeFilter from "./Components/Food/FoodTypeFilter";
import RecipeFilter from "./Components/Food/RecipeFilter";
function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <AuthContext.Provider value={{isLogin,setIsLogin}}>
      <BrowserRouter>
        <Navbar />
        <Routes> 
          <Route path="/" element={<Index />} />
          <Route path="/category/:category" element={<CategoryWiseItem />} />
          <Route path="/food/add" element={<FoodForm />} />
          <Route path="/category" element={<ShowCategory />} />
          <Route path="/food/:foodId" element={<NewRecipePage />} />
          <Route path="/food" element={<SearchFood />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/difficulty/:level" element={<DifficultyFilter></DifficultyFilter>} />
          <Route path="/type/:type" element={<FoodTypeFilter></FoodTypeFilter>}></Route>
          <Route path="/filterPage" element={<RecipeFilter></RecipeFilter>}></Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
        <ToastContainer />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
