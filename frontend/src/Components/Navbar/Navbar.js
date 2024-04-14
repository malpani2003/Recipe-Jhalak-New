import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
function SearchForm() {
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    const searchTerm = event.target.fsearch.value;
    if (searchTerm.trim() !== "") {
      navigate(`/category/${searchTerm}`);
    }
  };

  return (
    <form className="d-flex justify-content-end align-items-center me-5 mx-5" onSubmit={handleSearch}>
      <input
        className="form-control me-2"
        type="search"
        name="fsearch"
        placeholder="Enter Food Item name"
      />
      <button className="btn btn-outline-warning" type="submit">
        Search
      </button>
    </form>
  );
}

function Navbar() {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
  };

  useEffect(() => {
    setAuthToken(localStorage.getItem("authToken"));
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark">
        <h2 className="fw-bold text-warning mx-2">Recipe Jhalak</h2>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Filter Recipe
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/filter?name=area">
                    Filter by Area
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/filter?name=veg">
                    Filter by Veg / Non-Veg
                  </Link>
                </li>
              </ul>
            </li>

            {authToken ? (
              <>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
          <SearchForm />
        </div>
      </nav>
    </>
  );
}

export default Navbar;
