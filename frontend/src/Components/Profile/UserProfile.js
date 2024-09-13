import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import { FaHeart, FaBookmark, FaTimes } from "react-icons/fa";

const UserProfile = () => {
  const [selectedTab, setSelectedTab] = useState("liked");
  const [recipes, setRecipes] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3001/api/users/profile",
          { withCredentials: true }
        );
        setUserData(response.data.message);
        fetchRecipes("liked");
      } catch (error) {
        setUserData(null);
        setError("Unable to fetch profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (!userData && !loading) {
    navigate("/login");
  }
  
  const fetchRecipes = async (type) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3001/api/users/${type}recipes`,
        { withCredentials: true }
      );
      setRecipes(response.data);
      setSelectedTab(type); // Ensure this is updated correctly
    } catch (error) {
      setRecipes(null);
      setError(`Unable to fetch ${type} recipes.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} userData={userData} />
      <Content
        recipes={recipes}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        fetchRecipes={fetchRecipes}
        loading={loading}
        error={error}
      />
    </div>
  );
};

const Sidebar = ({ isOpen, setIsOpen, userData }) => {
  if (!isOpen)
    return (
      <button
        className="btn btn-primary m-2 p-2"
        onClick={() => setIsOpen(true)}
      >
        <FaBookmark />
      </button>
    );

  return (
    <div className="bg-gray-100 p-4 h-screen w-72">
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-bold">Profile</h2>
        <button className="text-gray-500" onClick={() => setIsOpen(false)}>
          <FaTimes />
        </button>
      </div>
      <div className="text-center mb-6">
        <Avatar name={userData?.Name || "User"} round={true} size="100" />
        <h3 className="mt-3 text-lg">{userData?.Name || "User"}</h3>
      </div>
      <div className="space-y-2">
        <p>
          <strong>Email:</strong> {userData?.Email_id}
        </p>
        <p>
          <strong>Member Since:</strong> {userData?.createdAt?.split("T")[0]}
        </p>
        <p
          className={`${
            userData?.Verified ? "text-green-600" : "text-red-600"
          } font-bold`}
        >
          {userData?.Verified ? "Verified User" : "Not Verified User"}
        </p>
      </div>
    </div>
  );
};

const Content = ({
  recipes,
  selectedTab,
  setSelectedTab,
  fetchRecipes,
  loading,
  error,
}) => (
  <div className="flex-grow p-6">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">
        {selectedTab === "liked" ? "Liked Recipes" : "Saved Recipes"}
      </h2>
      <div className="flex items-center">
        <FaHeart
          className={`mr-2 ${
            selectedTab === "liked" ? "text-red-500" : "text-gray-500"
          }`}
        />
        <label className="flex items-center cursor-pointer">
          <span className="mr-2">Toggle</span>
          <input
            type="checkbox"
            className="hidden"
            checked={selectedTab === "saved"}
            onChange={() =>
              fetchRecipes(selectedTab === "liked" ? "saved" : "liked")
            }
          />
          <span
            className={`block w-14 h-8 rounded-full ${
              selectedTab === "saved" ? "bg-blue-600" : "bg-gray-300"
            } relative`}
          >
            <span
              className={`block w-6 h-6 bg-white rounded-full absolute transition-transform duration-300 ${
                selectedTab === "saved" ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </span>
        </label>
        <FaBookmark
          className={`ml-2 ${
            selectedTab === "saved" ? "text-blue-500" : "text-gray-500"
          }`}
        />
      </div>
    </div>

    {loading ? (
      <div className="flex justify-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    ) : error ? (
      <p className="text-red-500">{error}</p>
    ) : !recipes ? (
      <p>No {selectedTab} recipes found.</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes?.map((recipe, index) => (
          <div key={index} className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-lg font-semibold">{recipe.name}</h3>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default UserProfile;
