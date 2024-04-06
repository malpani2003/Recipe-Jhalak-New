import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import CategoryWiseItem from "./Components/Category/CategoryWiseItem";
import Footer from "./Components/Footer/Footer"
import Navbar from "./Components/Navbar/Navbar";
import RecipePage from "./Components/RecipePage/RecipePage";
import 'react-router-dom'
function App() {
  return <div>
    <Navbar></Navbar>
    {/* <Category></Category> */}
    {/* <RecipePage></RecipePage> */}
    {/* <CategoryWiseItem serach="Rajasthani Food"></CategoryWiseItem> */}
    <Footer></Footer>
    </div>;
}

export default App;
