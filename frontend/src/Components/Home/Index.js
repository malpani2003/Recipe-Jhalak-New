import React from 'react';
import PopularCategory from './PopularCategory';
import LatestRecipe from './LatestRecipe';
import TopRecipe from './TopRecipe';
import Newsletter from './Newsletter';
import styles from './Home.module.css';

function Index() {
    return (
      <div className={styles.container}>
        {/* <section className={styles.heroSection}>
          <img
            src="https://img.sndimg.com/food/image/upload/f_auto,c_thumb,q_55,w_1280,ar_16:9/v1/img/recipes/54/32/04/jaZWq4VnRbeqrr2zc2U6_garlic-bread-beauty-1.jpg"
            alt="Delicious garlic bread"
            className={styles.bannerImg}
          />
          <div className={styles.heroText}>
            <h1>Welcome to Our Recipe Blog</h1>
            <p>Discover the best recipes, tips, and more!</p>
            <button className={styles.ctaButton}>Get Started</button>
          </div>
        </section> */}
        <PopularCategory />
        <LatestRecipe />
        <TopRecipe />
        <Newsletter />
      </div>
    );  
}

export default Index;
