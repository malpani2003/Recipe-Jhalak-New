import React from 'react'
import PopularCategory from './PopularCategory';
import LatestRecipe from './LatestRecipe';
import TopRecipe from './TopRecipe';
import styles from './Home.module.css';
import Newsletter from './Newsletter';

function Index() {
    return (
      <div>
        {/* <img
          src="https://img.sndimg.com/food/image/upload/f_auto,c_thumb,q_55,w_1280,ar_16:9/v1/img/recipes/54/32/04/jaZWq4VnRbeqrr2zc2U6_garlic-bread-beauty-1.jpg"
          className={styles["banner-img"]}
        ></img> */}
        <PopularCategory></PopularCategory>
        <LatestRecipe></LatestRecipe>
        <TopRecipe></TopRecipe>
        <Newsletter></Newsletter>
      </div>
    );  
}

export default Index