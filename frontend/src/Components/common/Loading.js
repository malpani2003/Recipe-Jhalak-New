import React from "react";
import styles from './Loading.module.css';

function Loading() {
  return (
    <div className={`${styles.spinner_container}`}>
      <div className={`${styles.loading_spinner}`}></div>
    </div>
  );
}

export default Loading;
