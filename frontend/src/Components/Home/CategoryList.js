import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ArrowBigDown } from "lucide-react";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/category/popular`);
        setCategories(response.data.slice(0, 6)); // Only take the first 6 categories
      } catch (err) {
        console.log("Error Occurred:", err);
      }
    }
    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-6">Popular Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
        {categories?.map((item) => (
          <Link
            to={`/category/${item._id}`}
            key={item._id}
            className="bg-gray-200 rounded-lg shadow-md flex flex-col items-center p-2 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="w-28 h-28 bg-gray-300 rounded-full overflow-hidden mb-4 flex items-center mt-2 justify-center">
              <img
                src={item.Category_Img}
                alt={item.Category_Name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-lg font-semibold text-gray-800">
              {item.Category_Name}
            </div>
          </Link>
        ))}
      </div>
      <div className="text-center mt-6">
        <Link
          to="/category"
          className="btn btn-outline-dark border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-6 py-2 rounded-lg inline-flex items-center justify-center"
        >
          <ArrowBigDown className="w-6 h-6" />
        </Link>
      </div>
    </div>
  );
};

export default CategoryList;
