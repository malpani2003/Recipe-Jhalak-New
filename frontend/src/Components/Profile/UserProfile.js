import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import { FaHeart, FaTimes } from "react-icons/fa";

const UserProfile = () => {
  const [recipes, setRecipes] = useState([]);
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
          `${process.env.REACT_APP_API_URL}/users/profile`,
          { withCredentials: true }
        );
        setUserData(response.data.message);
        fetchRecipes(); // Fetch liked recipes initially
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

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/likedrecipes`, { withCredentials: true });
      setRecipes(response.data.likeRecipe);
    } catch (error) {
      setRecipes([]);
      setError("Unable to fetch liked recipes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} userData={userData} />
      <Content
        recipes={recipes}
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
        <FaHeart />
      </button>
    );

  return (
    <div className="bg-gray-100 p-4 h-screen w-full md:w-72">
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

const Content = ({ recipes, fetchRecipes, loading, error }) => {
  const navigate = useNavigate();
  return (
    <div className="flex-grow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Liked Recipes</h2>
        <div className="flex items-center">
          <FaHeart className="text-red-500 mr-2" />
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
      ) : !recipes.length ? (
        <p>No liked recipes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="bg-white p-2 shadow-md rounded-lg cursor-pointer"
              onClick={() => navigate(`/food/${recipe._id}`)}
            >
              <img
                src={recipe.foodImg}
                alt={recipe.foodName}
                className="w-full h-40 object-cover rounded-lg mb-2"
              />
              <h3 className="text-lg font-semibold text-center">
                {recipe.foodName}
              </h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
