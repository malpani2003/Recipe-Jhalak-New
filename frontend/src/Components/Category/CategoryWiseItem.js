import React, { useEffect, useState } from "react";
import styles from "./CategoryWise.module.css";
import { useParams, Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import Loading from "../common/Loading";

function CategoryWiseItem() {
  const { category: categoryID } = useParams();
  const [foodItem, setFoodItem] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  let [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Number of items per page

  useEffect(() => {

    async function getItems() {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/category/food/${categoryID}?pageNum=${currentPage}`
        );
        console.log(response.data)
        setFoodItem(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error occurred while fetching data.");
        setLoading(false);
      }
    }
    setCurrentPage(searchParams.get("page") || 1);
    getItems();
  }, [categoryID, currentPage]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSearchParams({ page: pageNumber });
  };

  return (
    <div className={`container ${styles["popular-category"]}`}>
      <h2 className="text-center my-3">Results for {foodItem.categoryName}</h2>
      <div className={`row ${styles.category}`}>
        {foodItem.foodList.length >= 1 ? (
          foodItem.foodList.map((item) => {
            const { _id, foodName, foodImg } = item;
            return (
              <div
                className={`col-lg-4 col-md-6 col-10 ${styles["category-item"]}`}
                key={_id}
              >
                <img src={foodImg} alt={foodName} />
                <Link to={`/food/${_id}`} className={styles["food-item"]}>
                  {foodName}
                </Link>
              </div>
            );
          })
        ) : (
          <div>No recipe Found 404 Error</div>
        )}
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={foodItem.totalFoodItem}
        paginate={paginate}
      />
    </div>
  );
}

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination justify-content-center mt-3">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item mx-2" >
            <button onClick={() => paginate(number)} className="page-link bg-dark rounded-circle text-warning">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoryWiseItem;
