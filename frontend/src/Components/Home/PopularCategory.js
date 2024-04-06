import React,{useState,useEffect} from 'react'
import axios from 'axios';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';

function PopularCategory() {
    const [category, setCategory] = useState([]);

    useEffect(() => {
      async function categoryGetRequest() {
        try {
          const response = await axios.get(
            "http://localhost:3001/api/category/all"
          );
          // console.log(response.data);
          setCategory(response.data.splice(0, 6));
        } catch (err) {
          console.log("Error Occurred");
        }
      }
  
      categoryGetRequest();
    }, []);
  return (
    <div className={`${styles["popular-category"]} container mt-3`}>
          <h2 className="fw-bold">Popular Category</h2>
          <div className={`row mt-4 ${styles["category"]}`}>
            {category.map((item, index) => (
              <div
                className={`col-lg-2 col-md-3 col-4 ${styles["category-item"]}`}
                key={index}
              >
                <img src={item.Category_Img} alt={item.Category_Name}></img>
                <Link
                  to={`/category/${item._id}`}
                  className={`fw-bold ${styles["category-link"]}`}
                >
                  {item.Category_Name}
                </Link>
              </div>
            ))}
          </div>
          <div class="d-flex justify-content-center">
            <Link
              to="/category"
              className={`${styles["category-show"]} btn btn-outline-dark mt-4`}
            >
              Show All
            </Link>
          </div>
        </div>
  )
}

export default PopularCategory