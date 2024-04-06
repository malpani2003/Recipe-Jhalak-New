import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./Filter.module.css";
function Filter() {
  const [param, setParams] = useSearchParams();
  const [filterResult, setfilterResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function getFoodData() {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/food/filter?name=${param.get("name")}`
        );
        setfilterResult(response.data);
        setLoading(false);
        // console.log(response);
      } catch (err) {
        // console.log(err);
        setError(err.message);
      }
    }
    // setFilterChoice(param.get("name"));
    getFoodData();
  }, [param]);

  if (loading) {
    return (
      <div className={`${styles.spinner_container}`}>
        <div className={`${styles.loading_spinner}`}></div>
      </div>
    );
  }
  if (error) {
    return <>Error...</>;
  }
  return (
    <div>
      {filterResult.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
  );
}

export default Filter;
