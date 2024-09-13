import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

function ShowCategory() {
  const [category, setCategory] = useState([]);
  const [filterCategoryArr, setFilterCategoryArr] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortParams, setSortParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/category/all');
        console.log('Fetched data:', response.data); // Debug: Check the data structure
        setCategory(response.data);
        setFilterCategoryArr(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error); // Debug: Check the error
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleSorting = () => {
      const sortedArr = [...filterCategoryArr];
      const sortBy = sortParams.get('sortBy') || 'asc';
      if (sortBy === 'asc') {
        sortedArr.sort((a, b) => a['Category_Name'].localeCompare(b['Category_Name']));
      } else if (sortBy === 'desc') {
        sortedArr.sort((a, b) => b['Category_Name'].localeCompare(a['Category_Name']));
      }
      setFilterCategoryArr(sortedArr);
    };
    handleSorting();
  }, [sortParams]);

  function handleSearchInput(event) {
    const searchName = event.target.value.toLowerCase();
    setSearchParams({ sname: searchName });
    const filterArr = category.filter((element) =>
      element['Category_Name'].toLowerCase().includes(searchName)
    );
    setFilterCategoryArr(filterArr);
  }

  function handleSortAsc() {
    setSortParams({ sortBy: 'asc' });
  }

  function handleSortDesc() {
    setSortParams({ sortBy: 'desc' });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="spinner-border animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Categories Listed</h1>
      <p className="text-gray-700 mb-6">
        We proudly present a curated collection of culinary categories that cater to every palate. From savory mains to delectable desserts, our extensive range covers a myriad of cuisines, ensuring there's something for everyone. Explore the rich tapestry of flavors and discover new inspirations for your next kitchen adventure. Each category features a delightful array of recipes, accompanied by mouthwatering images and detailed descriptions.
      </p>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <input
          type="text"
          name="scategory"
          placeholder="Search by keyword"
          id="scategory"
          className="form-input w-full md:w-1/3 mb-4 md:mb-0 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onInput={handleSearchInput}
        />
        <div className="relative">
          <button
            className="btn btn-primary px-4 py-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
            type="button"
            id="categoryDropdownMenuButton"
            aria-expanded="false"
          >
            Sort By
          </button>
          <div className="dropdown-menu absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
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
                <p className="text-gray-600 mt-2">{element["recipeListed"] || 120} Recipes</p>
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
