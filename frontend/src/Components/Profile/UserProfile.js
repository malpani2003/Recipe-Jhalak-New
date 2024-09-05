import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import { FaHeart, FaBookmark, FaTimes } from "react-icons/fa";

const UserProfile = () => {
  const [selectedTab, setSelectedTab] = useState("liked");
  const [recipes, setRecipes] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/users/profile",
          {
            headers: { Authorization: `Bearer ${authToken}` },
            withCredentials: true,
          }
        );
        setUserData(response.data.message);
        fetchRecipes("liked");
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchData();
  }, [navigate]);

  const fetchRecipes = async (type) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/users/${type}recipes`,
        {
          withCredentials: true,
        }
      );
      setRecipes(response.data);
      setSelectedTab(type);
    } catch (error) {
      console.error(`Error fetching ${type} recipes:`, error);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} userData={userData} />
      <Content
        recipes={recipes}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        fetchRecipes={fetchRecipes}
      />
    </div>
  );
};

const Sidebar = ({ isOpen, setIsOpen, userData }) => {
  if (!isOpen)
    return (
      <button className="btn btn-primary m-2" onClick={() => setIsOpen(true)}>
        <FaBookmark />
      </button>
    );

  return (
    <div
      className="sidebar bg-light p-3"
      style={{ width: "300px", height: "100vh" }}
    >
      <div className="d-flex justify-content-between mb-4">
        <h2>Profile</h2>
        <button className="btn btn-light" onClick={() => setIsOpen(false)}>
          <FaTimes />
        </button>
      </div>
      <div className="text-center mb-4">
        <Avatar name={userData?.Name || "User"} round={true} size="100" />
        <h3 className="mt-3">{userData?.Name || "User"}</h3>
      </div>
      <div className="mb-4">
        <p>
          <strong>Email:</strong> {userData?.Email_id}
        </p>
        <p>
          <strong>Member Since:</strong> {userData?.createdAt?.split("T")[0]}
        </p>
        <p
          className={`${
            userData?.Verified ? "text-success" : "text-danger"
          } fw-bold`}
        >
          {userData?.Verified ? "Verified User" : "Not Verified User"}
        </p>
      </div>
    </div>
  );
};
const Content = ({ recipes, selectedTab, setSelectedTab, fetchRecipes }) => (
  <div className="flex-grow-1 p-4">
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>{selectedTab === "liked" ? "Liked Recipes" : "Saved Recipes"}</h2>
      <div className="d-flex align-items-center">
        <FaHeart
          className={`me-2 ${
            selectedTab === "liked" ? "text-danger" : "text-muted"
          }`}
        />
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="flexSwitchCheckDefault"
            checked={selectedTab === "saved"}
            onChange={() =>
              fetchRecipes(selectedTab === "liked" ? "saved" : "liked")
            }
            style={{ width: "3rem", height: "1.5rem" }}
          />
        </div>
        <FaBookmark
          className={`ms-2 ${
            selectedTab === "saved" ? "text-primary" : "text-muted"
          }`}
        />
      </div>
    </div>
    {recipes.length === 0 ? (
      <p>No {selectedTab} recipes found.</p>
    ) : (
      <ul className="list-group">
        {recipes.map((recipe, index) => (
          <li key={index} className="list-group-item">
            {recipe.name}
          </li>
        ))}
      </ul>
    )}
  </div>
);
export default UserProfile;
