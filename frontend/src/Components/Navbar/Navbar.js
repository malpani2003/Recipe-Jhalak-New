import React, { useState } from "react";
import "./Navbar.css";
import {
  Routes,
  Route,
  BrowserRouter,
  Link,
  useNavigate,
  redirect,
} from "react-router-dom";
import CategoryWiseItem from "../Category/CategoryWiseItem";
import RecipePage from "../RecipePage/RecipePage";
import Login from "../Login/Login";
import Register from "../Register/Register";
import ErrorPage from "../404Page/ErrorPage";
import Reviews from "../Reviews/Reviews";
import ShowCategory from "../Category/ShowCategory";
import Filter from "../Filter/Filter";
import NewRecipePage from "../RecipePage/NewRecipePage";
import FoodForm from "../Food/FoodForm";
import UserProfile from "../Profile/UserProfile";
import Index from "../Home/Index";

function SearchForm() {
  const navigate = useNavigate();
  const [searchArr, SetsearchArr] = useState([]);

  // const handleInput = (event) => {
  //   event.preventDefault();
  //   console.log("Target : ", event.target.value);

  //   const arr = ["Snacks", "Breakfast"];
  //   const arr2 = [];
  //   arr.forEach((element) => {
  //     if (element.toLowerCase().includes(event.target.value)) {
  //       console.log(element);
  //       arr2.push(element);
  //     }
  //   });
  //   SetsearchArr(arr2);
  // };
  const handleSearch = (event) => {
    event.preventDefault();
    // console.log(event.target.fsearch.value);
    // redirectDocument(`/category/${event.target.fsearch.value}`)
    navigate(`/category/${event.target.fsearch.value}`);
  };

  return (
    <form class="d-flex justify-content-end align-items-center me-5 mx-5" onSubmit={handleSearch}>
      <input
        class="form-control me-2"
        type="search"
        name="fsearch"
        placeholder="Enter Food Item name"
        // onInput={handleInput}
      ></input>
      {/* <select>
        {searchArr.map((element) => (
          <option key={element} value={element}>
            {element}
          </option>
        ))}
      </select> */}
      <button class="btn btn-outline-warning" type="submit">
        Search
      </button>
    </form>
  );
}

function Logout(){
  localStorage.clear();
  redirect("/login");
  // return ; 
}
function Navbar() {
  console.log(localStorage.getItem("authToken"))
  return (
    <BrowserRouter>
      <nav class="navbar navbar-expand-lg bg-dark">
        <h2 class="fw-bold text-warning mx-2"> Recipe Jhalak</h2>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link to="/" class="nav-link">
                Home
              </Link>
            </li>
            <li class="nav-item dropdown">
              <Link
                class="nav-link dropdown-toggle"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Filter Receipe
              </Link>
              <ul class="dropdown-menu">
                {/* <li>
                  <Link class="dropdown-item" to="/filter?name=ingrediants">
                    Filter by Ingrediants
                  </Link>
                </li> */}
                {/* <hr class="dropdown-divider"></hr> */}
                {/* <li>
                  <Link class="dropdown-item" to="/filter?name=category">
                    Filter by Category
                  </Link>
                </li> */}
                {/* <li>
                  <hr class="dropdown-divider"></hr>
                </li> */}
                <li>
                  <Link class="dropdown-item" to="/filter?name=area">
                    Filter by Area
                  </Link>
                </li>
                <li>
                  <Link class="dropdown-item" to="/filter?name=veg">
                    Filter by Veg / Non-Veg
                  </Link>
                </li>
              </ul>
            </li>

            {/* <li class="nav-item dropdown">
            <a
              href="#"
              class="nav-link dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
            >
              User Icon
            </a>
            <ul class="dropdown-menu">
              <a href="/Userprofile/<%=user._id%>" class="dropdown-item">
                Profile
              </a>
              <li>
                <a href="/logout" class="dropdown-item">
                  Logout
                </a>
              </li>
            </ul>
          </li> */}
            {localStorage.getItem("authToken") ? (
             <>
             <li class="nav-item">
               <Link to="/profile" class="nav-link">
                 Profile
               </Link>
             </li>
             <li class="nav-item">
               <Link to="/logout" class="nav-link">
                 Logout
               </Link>
             </li>
           </>
            ) : (
              <>
                <li class="nav-item">
                  <Link to="/login" class="nav-link">
                    Login
                  </Link>
                </li>
                <li class="nav-item">
                  <Link to="/register" class="nav-link">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
          <SearchForm></SearchForm>
        </div>
      </nav>
      <Routes>
        <Route
          element={
            <>
              <Index></Index>
              <Reviews></Reviews>
            </>
          }
          path="/"
        ></Route>
        <Route
          path="/category/:category"
          element={<CategoryWiseItem></CategoryWiseItem>}
        ></Route>
        <Route path="/food/add" element={<FoodForm></FoodForm>}></Route>
        <Route path="/category" element={<ShowCategory></ShowCategory>}></Route>
        <Route
          exact
          path="/food/:foodId"
          element={<NewRecipePage></NewRecipePage>}
          // element={<RecipePage></RecipePage>}
        ></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/filter" element={<Filter></Filter>}></Route>
        <Route path="/logout" element={<Logout></Logout>}></Route>
        <Route path="/profile" element={<UserProfile></UserProfile>}></Route>
        <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Navbar;
