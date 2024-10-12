import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import Loading from "../common/Loading";
import ErrorPage from "../404Page/ErrorPage";

function ShowCategory() {
  const [category, setCategory] = useState([]);
  const [filterCategoryArr, setFilterCategoryArr] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortParams, setSortParams] = useSearchParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/category/all`
        );
        console.log("Fetched data:", response.data);
        setCategory(response.data);
        setFilterCategoryArr(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSorting = () => {
    const sortedArr = [...filterCategoryArr];
    const sortBy = sortParams.get("sortBy") || "asc";

    if (sortBy === "asc") {
      sortedArr.sort((a, b) => {
        if (a["Category_Name"] < b["Category_Name"]) return -1;
        if (a["Category_Name"] > b["Category_Name"]) return 1;
        return 0;
      });
    } else if (sortBy === "desc") {
      sortedArr.sort((a, b) => {
        if (a["Category_Name"] < b["Category_Name"]) return 1;
        if (a["Category_Name"] > b["Category_Name"]) return -1;
        return 0;
      });
    }
    setFilterCategoryArr(sortedArr);
  };

  useEffect(() => {
    handleSorting();
  }, [sortParams]);

  function handleSearchInput(event) {
    const searchName = event.target.value.toLowerCase();
    setSearchParams({ sname: searchName });
    if (searchName.trim() === "") {
      setFilterCategoryArr(category);
    } else {
      const filterArr = category.filter((element) =>
        element["Category_Name"].toLowerCase().includes(searchName)
      );
      setFilterCategoryArr(filterArr);
    }
  }

  function handleSortAsc() {
    // console.log(searchParams.get("sname"))
    const newSearchParams=new URLSearchParams(searchParams);
    console.log(newSearchParams.get("sname"));
    if(newSearchParams.get("sname")){
      newSearchParams.set("sortBy","asc");
    }else{
      newSearchParams.delete("sname");
      newSearchParams.set("sortBy","asc");
    }
    setSortParams(newSearchParams);
    setIsDropdownOpen(false);
  }

  function handleSortDesc() {
    const newSearchParams=new URLSearchParams(searchParams);
    console.log(newSearchParams.get("sname"));
    if(newSearchParams.get("sname")){
      newSearchParams.set("sortBy","desc");
    }else{
      newSearchParams.delete("sname");
      newSearchParams.set("sortBy","desc");
    }
    setSortParams(newSearchParams);
    setIsDropdownOpen(false);
  }

  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Categories Listed
      </h1>
      <p className="text-gray-700 mb-6">
        We proudly present a curated collection of culinary categories that
        cater to every palate. From savory mains to delectable desserts, our
        extensive range covers a myriad of cuisines, ensuring there's something
        for everyone. Explore the rich tapestry of flavors and discover new
        inspirations for your next kitchen adventure. Each category features a
        delightful array of recipes, accompanied by mouthwatering images and
        detailed descriptions.
      </p>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <input
          type="text"
          name="scategory"
          placeholder="Search by keyword"
          id="scategory"
          className="w-full md:w-1/3 mb-4 md:mb-0 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onInput={handleSearchInput}
        />
        <div className="relative">
          <button
            className="px-4 py-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
            type="button"
            onClick={toggleDropdown}
          >
            Sort By
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <button
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={handleSortAsc}
              >
                Sort Ascending
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={handleSortDesc}
              >
                Sort Descending
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filterCategoryArr.length > 0 ? (
          filterCategoryArr.map((element) => (
            <div
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              key={element["_id"]}
            >
              <img
                src={element["Category_Img"]}
                alt={element["Category_Name"]}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <Link
                  to={`/category/${element["_id"]}`}
                  className="text-xl font-semibold text-gray-800 hover:text-teal-700"
                >
                  {element["Category_Name"]}
                </Link>
                {/* <p className="text-gray-600 mt-2">
                  {element["recipeListed"] || 120} Recipes
                </p> */} 
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600">No categories found.</div>
        )}
      </div>
    </div>
  );
}

export default ShowCategory;
