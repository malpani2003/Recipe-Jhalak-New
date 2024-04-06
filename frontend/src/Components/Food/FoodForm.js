import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const FoodForm = () => {
  const [formData, setFormData] = useState({
    foodName: "",
    foodImg: "",
    previewImg: "",
    foodCategoryId: "",
    foodArea: "Afghanistan",
    foodDesc: "",
    isDrink: "",
    foodInstruction: "",
    foodIngredients: "",
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

  const InputFileHandle = (e) => {
    e.preventDefault();
    let fileList = e.target.files[0];
    let fileName =fileList.name.replace(RegExp(".png"), "").replace(" ", "") + Date.now();
    console.log(fileName);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3001/api/food/add",
        formData
      );
      console.log(response);
    } catch (error) {
      setError(error.response.data);
      console.error("Error in Uploading:", error.response.data);
    } finally {
      setLoading(false);
    }
  };
  const handleInstructionChange = async (e) => {
    // e.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      foodInstruction: e,
    }));
    console.log(e);
  };

  const handleIngreChange = async (e) => {
    // e.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      foodIngredients: e,
    }));
    console.log(e);
  };
  useEffect(() => {
    async function getCategory() {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/category/all"
        );
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
    return <>Loading...</>;
  }

  if (error) {
    return <>{error}</>;
  }

  return (
    <React.Fragment className="bg-dark">
      <h2 className=" fw-bold  text-center mt-4">Add Food Item in Database</h2>
      <p className="m-5 mb-2 mt-3 text-center">
        Fill out the form below to add a new food item to the database. Select
        the category, specify if it's a drink, and choose the country it belongs
        to. Upload images, set preparation and cooking times, and describe the
        food. Use the text editor for detailed cooking instructions and
        ingredients. Click "Submit" to add your delicious creation to the
        database.
      </p>

      {error ? (
        <div className="alert-danger">Error Occurred {error}</div>
      ) : (
        <div></div>
      )}
      <form onSubmit={handleSubmit} className="container">
      <label for="foodName" class="form-label">
        Enter Name of Recipe
        </label>
        <input
          type="text"
          name="foodName"
          id="foodName"
          class="form-control"
          onChange={handleChange}
          value={formData.foodName}
          placeholder="Enter Name of Food"
        />
        <label htmlFor="food_category_id" className="form-label my-3">
          Food Category
        </label>
        <div className="row">
          {category.map((element) => (
            <p key={element._id} className="col-sm-3 col-6">
              <input
                type="radio"
                name="foodCategoryId"
                id={`food_category_${element._id}`}
                value={element._id}
                className="form-check-input mx-2"
                onChange={handleChange}
              />
              {element.Category_Name}
            </p>
          ))}
        </div>

        <label htmlFor="Drink" className="form-label my-3">
          Drink
        </label>
        <p>
          <input
            type="radio"
            name="isDrink"
            id="drink_yes"
            value="Yes"
            className="form-check-input mx-2"
            onChange={handleChange}
          />
          Yes
        </p>
        <p>
          <input
            type="radio"
            name="isDrink"
            id="drink_no"
            value="No"
            className="form-check-input mx-2"
            onChange={handleChange}
          />
          No
        </p>

        <div className="form-group col-md-6 offset-md-0">
          <label htmlFor="foodArea" className="form-label my-3">
            Country Food Belongs
          </label>
          <select
            name="foodArea"
            id="foodArea"
            className="form-select"
            value={formData.foodArea}
            onChange={handleChange}
          >
            <option value="Afghanistan">Afghanistan</option>
            <option value="Albania">Albania</option>
            <option value="Algeria">Algeria</option>
            <option value="American Samoa">American Samoa</option>
          </select>
        </div>

        <div className="row">
          <div className="form-group col-md-6">
            <label htmlFor="foodImg" className="form-label my-3">
              Thumbnail Image
            </label>
            <input
              type="url"
              name="foodImg"
              id="foodImg"
              value={formData.foodImg}
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="previewImg" className="form-label my-3">
              Preview Images
            </label>
            <input
              type="url"
              name="previewImg"
              id="previewImg"
              className="form-control"
              value={formData.previewImg}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* <div class=" form-group col-md-6">
              <label for="preview_image" class="form-label my-3">
                Preview Images-2
              </label>
              <input
                type="url"
                name="preview_image2"
                id="preview_image2"
                class="form-control"
                onChange={handleChange}
              />
            </div> */}
        <div class="row">
          <div class="form-group col-md-6">
            <label for="ptime" class="form-label my-3">
              Total Preparation Time
              <sup class="text-danger fw-bold"> * in minutes</sup>
            </label>
            <input
              type="number"
              name="preparationTime"
              id="preparationTime"
              class="form-control"
              placeholder="Enter Preparation Time..."
              value={formData.preparationTime}
              onChange={handleChange}
            />
          </div>

          <div class="form-group col-md-6">
            <label for="Difficuilt" class="form-label my-3">
              Difficuilt Level
            </label>
            <select
              name="difficulty"
              id="difficulty"
              class="form-select"
              onChange={handleChange}
              value={formData.difficulty}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>

        <label for="ctime" class="form-label my-3">
          Total Cooking Time
          <sup class="text-danger fw-bold"> * in minutes</sup>
        </label>
        <input
          type="number"
          name="cookingTime"
          id="cookingTime"
          class="form-control"
          onChange={handleChange}
          value={formData.cookingTime}
          placeholder="Enter Preparation Time..."
        />

        <label for="food_desc" class="form-label my-3">
          Description about Food
        </label>
        <textarea
          name="foodDesc"
          id="foodDesc"
          cols="30"
          value={formData.foodDesc}
          onChange={handleChange}
          rows="3"
          class="form-control"
        ></textarea>

        <label for="Food_Ingrediants" class="form-label my-3">
          Recipe to Cook Food
        </label>
        <ReactQuill
          type="text"
          style={{ height: "200px" }}
          name="foodInstruction"
          theme="snow"
          id="foodInstruction"
          className="mb-3"
          placeholder="Procedure for Preparation of Recipe"
          value={formData.foodInstruction}
          onChange={handleInstructionChange}
        ></ReactQuill>

        <label for="Food_Ingrediants" class="form-label mt-5">
          Ingrediants Required to Cook Food
        </label>
        <ReactQuill
          type="text"
          style={{ height: "200px" }}
          name="foodIngredients"
          theme="snow"
          id="foodIngredients"
          placeholder="Procedure for Preparation of Recipe"
          className="mb-3"
          value={formData.foodIngredients}
          onChange={handleIngreChange}
        ></ReactQuill>
        {/*   
        <label for="food_Instruction" class="form-label my-3">
          Procedure to Cook Food
          <sup class="text-danger fw-bold">
            After writing each step press ENTER
          </sup>
        </label>
        <textarea
          name="foodInstruction"
          id="foodInstruction"
          cols="30"
          rows="8"
          class="form-control"
          value={formData.foodInstruction}
          onChange={handleChange}
        ></textarea> */}
        {/* 
        <label for="Food_Ingrediants" class="form-label my-3">
          Ingrediants to Cook Food
          <sup class="text-danger fw-bold">
            After writing each Ingrediants press ENTER
          </sup>
        </label>
        <textarea
          name="foodIngredients"
          id="foodIngredients"
          cols="30"
          rows="8"
          class="form-control"
          value={formData.foodIngredients}
          onChange={handleChange}
        ></textarea> */}

        {/* <input
          type="file"
          name="image"
          id="image"
          accept="image/png"
          placeholder="Enter Preview Image"
          title="Enter Preview Image"
          className="mt-5"
          onChange={InputFileHandle}
        /> */}
        <button type="submit" className="btn btn-warning my-3">
          Submit
        </button>
      </form>
    </React.Fragment>
  );
};

export default FoodForm;
