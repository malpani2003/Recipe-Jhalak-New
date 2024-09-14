import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Loading from "../common/Loading";

const FoodForm = () => {
  const [formData, setFormData] = useState({
    foodName: "",
    foodImg: "",
    previewImg: "",
    foodCategoryId: "",
    foodArea: "Afghanistan",
    foodDesc: "",
    isDrink: "",
    foodInstruction: [],
    foodIngredients: [],
    preparationTime: 0,
    cookingTime: 0,
    difficulty: "Easy",
    keyPoints: "",
  });

  const [category, setCategory] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
      foodInstruction: value.split('\n').filter(Boolean), // Convert instructions to array
    }));
  };

  const handleIngreChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      foodIngredients: value.split('\n').filter(Boolean), // Convert ingredients to array
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3001/api/food/add", formData);
      console.log(response);
    } catch (error) {
      setError(error.response.data);
      console.error("Error in Uploading:", error.response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function getCategory() {
      try {
        const response = await axios.get("http://localhost:3001/api/category/all");
        if (response.data) {
          setCategory(response.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Error Occurred");
      } finally {
        setLoading(false);
      }
    }
    getCategory();
  }, []);

  if (loading) {
    return <Loading></Loading>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-100 p-8">
      <h2 className="text-2xl font-bold text-center mb-4">Add Food Item in Database</h2>
      <p className="text-center mb-6 text-gray-600">
        Fill out the form below to add a new food item to the database. Select the category, specify if it's a drink, and choose the country it belongs to. Upload images, set preparation and cooking times, and describe the food. Use the text editor for detailed cooking instructions and ingredients. Click "Submit" to add your delicious creation to the database.
      </p>

      {error && (
        <div className="bg-red-100 text-red-500 p-3 rounded mb-4">
          Error Occurred: {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="foodName" className="block text-lg font-medium mb-2">
            Enter Name of Recipe
          </label>
          <input
            type="text"
            name="foodName"
            id="foodName"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={handleChange}
            value={formData.foodName}
            placeholder="Enter Name of Food"
          />
        </div>

        <div>
          <label htmlFor="food_category_id" className="block text-lg font-medium mb-2">
            Food Category
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {category.map((element) => (
              <label key={element._id} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="foodCategoryId"
                  id={`food_category_${element._id}`}
                  value={element._id}
                  className="form-radio text-yellow-500"
                  onChange={handleChange}
                />
                <span>{element.Category_Name}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="Drink" className="block text-lg font-medium mb-2">
            Is it a Drink?
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="isDrink"
                id="drink_yes"
                value="Yes"
                className="form-radio text-yellow-500"
                onChange={handleChange}
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="isDrink"
                id="drink_no"
                value="No"
                className="form-radio text-yellow-500"
                onChange={handleChange}
              />
              <span>No</span>
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="foodArea" className="block text-lg font-medium mb-2">
            Country Food Belongs
          </label>
          <select
            name="foodArea"
            id="foodArea"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.foodArea}
            onChange={handleChange}
          >
            <option value="Afghanistan">Afghanistan</option>
            <option value="Albania">Albania</option>
            <option value="Algeria">Algeria</option>
            <option value="American Samoa">American Samoa</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="foodImg" className="block text-lg font-medium mb-2">
              Thumbnail Image
            </label>
            <input
              type="url"
              name="foodImg"
              id="foodImg"
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.foodImg}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="previewImg" className="block text-lg font-medium mb-2">
              Preview Images
            </label>
            <input
              type="url"
              name="previewImg"
              id="previewImg"
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.previewImg}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="preparationTime" className="block text-lg font-medium mb-2">
              Total Preparation Time (minutes)
            </label>
            <input
              type="number"
              name="preparationTime"
              id="preparationTime"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter Preparation Time..."
              value={formData.preparationTime}
              onChange={handleChange}
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
        </div>

        <div>
          <label htmlFor="cookingTime" className="block text-lg font-medium mb-2">
            Total Cooking Time (minutes)
          </label>
          <input
            type="number"
            name="cookingTime"
            id="cookingTime"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter Cooking Time..."
            value={formData.cookingTime}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="foodDesc" className="block text-lg font-medium mb-2">
            Description about Food
          </label>
          <textarea
            name="foodDesc"
            id="foodDesc"
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
            placeholder="Enter Description..."
            value={formData.foodDesc}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="foodInstruction" className="block text-lg font-medium mb-2">
            Food Instructions
          </label>
          <ReactQuill
            theme="snow"
            value={formData.foodInstruction.join('\n')}
            onChange={handleInstructionChange}
          />
        </div>

        <div>
          <label htmlFor="foodIngredients" className="block text-lg font-medium mb-2">
            Food Ingredients
          </label>
          <ReactQuill
            theme="snow"
            value={formData.foodIngredients.join('\n')}
            onChange={handleIngreChange}
          />
        </div>

        <div>
          <label htmlFor="keyPoints" className="block text-lg font-medium mb-2">
            Key Points
          </label>
          <textarea
            name="keyPoints"
            id="keyPoints"
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
            placeholder="Enter Key Points..."
            value={formData.keyPoints}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FoodForm;
