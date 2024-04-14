import React from "react";
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

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} exact />
          <Route path="/category/:category" element={<CategoryWiseItem />} />
          <Route path="/food/add" element={<FoodForm />} />
          <Route path="/category" element={<ShowCategory />} />
          <Route path="/food/:foodId" element={<NewRecipePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
