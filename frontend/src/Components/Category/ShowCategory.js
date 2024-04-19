import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import styles from "./AllCategory.module.css";

function ShowCategory() {
  const [category, setCategory] = useState([]);
  const [filterCategoryArr, setFilterCategoryArr] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortParams, setSortParams] = useSearchParams();
  // const []

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/category/all');
        setCategory(response.data);
        setFilterCategoryArr(response.data);
        setLoading(false);
      } catch (error) {
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
  },[category,sortParams.get("sortBy")]);

  function handleSearchInput(event) {
    const searchName = event.target.value.toLowerCase();
    setSearchParams({ sname: searchName });
    const filterArr = category.filter((element) =>
      element['Category_Name'].toLowerCase().includes(searchName)
    );
    setFilterCategoryArr(filterArr);
  }

  function handleSortAsc() {
    setSortParams({sortBy: 'asc' });
  }

  function handleSortDesc() {
      setSortParams({sortBy: 'desc' });
  }

  if (loading) {
    return (
      <div className="spinner_container">
        <div className="loading_spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div style={{ height: '100%' }}>{error}</div>
  }

  return (
    <div className={`container-fluid`}>
      <h1 className="mt-5 fw-bold">Categories Listed</h1>
      <p className="my-3">
        We proudly present a curated collection of culinary categories that
        cater to every palate. From savory mains to delectable desserts, our
        extensive range covers a myriad of cuisines, ensuring there's something
        for everyone. Explore the rich tapestry of flavors and discover new
        inspirations for your next kitchen adventure. Each category features a
        delightful array of recipes, accompanied by mouthwatering images and
        detailed descriptions.
      </p>
      <div className="d-flex flex-md-row justify-content-between align-items-center mb-3">
        <input
          type="text"
          name="scategory"
          placeholder="Enter the Search Keyword"
          id="scategory"
          className="form-control w-25"
          onInput={handleSearchInput}
        />
        <div className="d-flex align-items-center">
          <div className="dropdown me-2">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="categoryDropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Sort Name By
            </button>
            <ul
              className="dropdown-menu"
              aria-labelledby="categoryDropdownMenuButton"
            >
              <li>
                <button
                  className="dropdown-item"
                  onClick={handleSortDesc}
                >
                 Sort Descending
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={handleSortAsc}
                >
                  Sort Ascending
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={`${styles.category} row mt-3`}>
        {filterCategoryArr.map((element) => (
          <div
            className={`${styles.category_item} col-md-4 col-12`}
            key={element["_id"]}
          >
            <img
              src={element["Category_Img"]}
              alt={element["Category_Name"]}
            ></img>
            <div className={styles.category_details}>
              <Link
                to={`/category/${element["_id"]}`}
                className={styles.categories_name}
              >
                {element["Category_Name"]}
              </Link>
              <p>{element["recipeListed"] || 120} Recipe</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowCategory;
