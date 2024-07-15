import React from 'react';
import styles from './Home.module.css';


function Newsletter() {
  return (
    <div className={`container-fluid p-5 ${styles.newsletterContainer}`}>
      <h1 className='fw-bold'>Deliciousness to your inbox</h1>
      <p>Enjoy weekly handpicked recipes and recommendations.</p>
      <form className={styles.newsletterForm}>
        <input type="email" placeholder="Email address" className={styles.formControl} />
        {/* <input type="submit" value="Join" className={`btn btn-dark ${styles.submitButton}`} /> */}
      </form>
    </div>
  );
}

export default Newsletter;
