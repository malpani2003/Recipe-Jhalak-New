import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Loading from "../common/Loading";
import ErrorPage from "../404Page/ErrorPage";

const FoodForm = () => {
  const [formData, setFormData] = useState({
    foodName: "",
    foodCategoryId: "",
    foodArea: "",
    foodDesc: "",
    isDrink: "",
    foodInstruction: [],
    foodIngredients: [],
    preparationTime: 0,
    cookingTime: 0,
    difficulty: "Easy",
  });

  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [foodImgFile, setFoodImgFile] = useState(null);
  const [previewImgFile, setPreviewImgFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch categories
        const categoryResponse = await axios.get(`${process.env.REACT_APP_API_URL}category/all`);
        setCategories(categoryResponse.data);

        // Fetch countries
        const countryResponse = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(countryResponse.data.map(country => country.name.common));
      } catch (error) {
        setError("Error fetching data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleInstructionChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      foodInstruction: value.split('\n').filter(Boolean),
    }));
  };

  const handleIngreChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      foodIngredients: value.split('\n').filter(Boolean),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formDataToSubmit = new FormData();

      for (const [key, value] of Object.entries(formData)) {
        if (Array.isArray(value)) {
          value.forEach(item => formDataToSubmit.append(`${key}[]`, item));
        } else {
          formDataToSubmit.append(key, value);
        }
      }

      if (foodImgFile) {
        formDataToSubmit.append('foodImg', foodImgFile);
      }

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/food/add`, formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },withCredentials:true
      });

      console.log(response);
    } catch (error) {
      setError("Error in uploading data. Please try again.");
      console.error("Error in Uploading:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <div className="bg-gray-100 p-8">
      <h2 className="text-2xl font-bold text-center mb-4">Add Food Item to Database</h2>
      <p className="text-center mb-6 text-gray-600">
        Fill out the form below to add a new food item to the database. 
        Select the category, specify if it's a drink, and choose the country it belongs to. 
        Upload images, set preparation and cooking times, and describe the food. 
        Use the text editor for detailed cooking instructions and ingredients. 
        Click "Submit" to add your delicious creation to the database.
      </p>

      {error && (
        <div className="bg-red-100 text-red-500 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="foodName" className="block text-lg font-medium mb-2">
            Recipe Name
          </label>
          <input
            type="text"
            name="foodName"
            id="foodName"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={handleChange}
            value={formData.foodName}
            placeholder="Enter Recipe Name"
          />
        </div>

        <div>
          <label htmlFor="foodCategoryId" className="block text-lg font-medium mb-2">
            Food Category
          </label>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <label key={category._id} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="foodCategoryId"
                  id={`food_category_${category._id}`}
                  value={category._id}
                  className="form-radio text-yellow-500"
                  onChange={handleChange}
                />
                <span className="text-gray-700">{category.Category_Name}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="foodArea" className="block text-lg font-medium mb-2">
            Country of Origin
          </label>
          <select
            name="foodArea"
            id="foodArea"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={handleChange}
            value={formData.foodArea}
          >
            <option value="">Select Country</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="foodDesc" className="block text-lg font-medium mb-2">
            Description
          </label>
          <textarea
            name="foodDesc"
            id="foodDesc"
            rows="4"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={handleChange}
            value={formData.foodDesc}
            placeholder="Enter Description"
          />
        </div>

        <div>
          <label htmlFor="isDrink" className="block text-lg font-medium mb-2">
            Is this a drink?
          </label>
          <select
            name="isDrink"
            id="isDrink"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={handleChange}
            value={formData.isDrink}
          >
            <option value="">Select Option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label htmlFor="preparationTime" className="block text-lg font-medium mb-2">
            Preparation Time (in minutes)
          </label>
          <input
            type="number"
            name="preparationTime"
            id="preparationTime"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={handleChange}
            value={formData.preparationTime}
            placeholder="Enter Preparation Time"
          />
        </div>

        <div>
          <label htmlFor="cookingTime" className="block text-lg font-medium mb-2">
            Cooking Time (in minutes)
          </label>
          <input
            type="number"
            name="cookingTime"
            id="cookingTime"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={handleChange}
            value={formData.cookingTime}
            placeholder="Enter Cooking Time"
          />
        </div>

        <div>
          <label htmlFor="difficulty" className="block text-lg font-medium mb-2">
            Difficulty Level
          </label>
          <select
            name="difficulty"
            id="difficulty"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={handleChange}
            value={formData.difficulty}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div>
          <label htmlFor="foodInstruction" className="block text-lg font-medium mb-2">
            Cooking Instructions
          </label>
          <ReactQuill
            theme="snow"
            value={formData.foodInstruction.join('\n')}
            onChange={handleInstructionChange}
          />
        </div>

        <div>
          <label htmlFor="foodIngredients" className="block text-lg font-medium mb-2">
            Ingredients
          </label>
          <ReactQuill
            theme="snow"
            value={formData.foodIngredients.join('\n')}
            onChange={handleIngreChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="foodImg" className="block text-lg font-medium mb-2">
              Thumbnail Image
            </label>
            <input
              type="file"
              name="foodImg"
              id="foodImg"
              className="w-full p-2 border border-gray-300 rounded"
              accept="image/*"
              onChange={(e) => setFoodImgFile(e.target.files[0])}
            />
          </div>
          {/* <div>
            <label htmlFor="previewImg" className="block text-lg font-medium mb-2">
              Preview Image
            </label>
            <input
              type="file"
              name="previewImg"
              id="previewImg"
              className="w-full p-2 border border-gray-300 rounded"
              accept="image/*"
              onChange={(e) => setPreviewImgFile(e.target.files[0])}
            />
          </div> */}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FoodForm;
