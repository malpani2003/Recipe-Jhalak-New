import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./RecipePage.module.css";

function FoodfromSameCategory() {
  return (
    <div className="container-fluid mt-4">
      <h3>Popular in Category ( You may also Like these )</h3>
      <div className="row d-flex flex-row">
        <div className="col-sm-4">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeFzEmnNC38AOePpCicjbqvV1yVAa5BC8GWg&usqp=CAU"
            alt="Pancakes"
          ></img>
          <br></br>
          <Link to="/category/dalbati" className="food-item">
            Dal bati
          </Link>
        </div>
        <div className="col-sm-4">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeFzEmnNC38AOePpCicjbqvV1yVAa5BC8GWg&usqp=CAU"
            alt="Pancakes"
          ></img>
          <br></br>
          <Link to="/category/dalbati" className="food-item">
            Dal bati
          </Link>
        </div>
        <div className="col-sm-4">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeFzEmnNC38AOePpCicjbqvV1yVAa5BC8GWg&usqp=CAU"
            alt="Pancakes"
          ></img>
          <br></br>
          <Link to="/category/dalbati" className="food-item">
            Dal bati
          </Link>
        </div>
      </div>
    </div>
  );
}
function RecipeReview() {
  const [review, setreview] = useState([]);
  function handleSelectInput(event) {
    event.preventDefault();
    console.log(event.target.value);
  }
  return (
    <div className={`mt-3 ${styles.recipe_reviews} container`}>
      <div className="d-flex flex-row justify-content-between">
        <h2>Reviews (8)</h2>
        <select
          id="reviewOrder"
          name="reviewOrder"
          onChange={handleSelectInput}
        >
          <option value="new">Newest</option>
          <option value="old">Oldest</option>
        </select>
      </div>
      <h5>
        <img src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fmobile%2Fallrecipes%2Fimages%2Ficon-user-default_v2.png&w=1200&h=1200&c=sc&poi=face&q=60"></img>
        Micheal <span> 8/12/23 </span>
      </h5>
      <p className="">
        That's a great sandwich! But after a round of throat cancer (4+yrs and
        going) I find I need a little more moisture to make things go down .
        DON'T be misled by the word moisture. Just a little is needed. I butter
        both sides of all bread and then put a thin schmear of good mayo (good
        mayo) on the outside of the bread. Now go ahead and air fry. Also, good
        with a SLIGHT sprinkle of Parmesan on the outside before cooking.
      </p>
      <hr className=""></hr>
      <h5>
        <img src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fmobile%2Fallrecipes%2Fimages%2Ficon-user-default_v2.png&w=1200&h=1200&c=sc&poi=face&q=60"></img>{" "}
        Micheal
      </h5>
      <p className="">
        I am just wondering how a sandwich you cut in half before putting it in
        the air fryer came out whole when you removed it?
      </p>
      <hr className=""></hr>
      <h5>
        <img src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fmobile%2Fallrecipes%2Fimages%2Ficon-user-default_v2.png&w=1200&h=1200&c=sc&poi=face&q=60"></img>{" "}
        Micheal
      </h5>
      <p className="">
        I am just wondering how a sandwich you cut in half before putting it in
        the air fryer came out whole when you removed it?
      </p>
      <hr className=""></hr>
      <h5>
        <img src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fmobile%2Fallrecipes%2Fimages%2Ficon-user-default_v2.png&w=1200&h=1200&c=sc&poi=face&q=60"></img>{" "}
        Micheal
      </h5>
      <p className="">
        I am just wondering how a sandwich you cut in half before putting it in
        the air fryer came out whole when you removed it?
      </p>
      <hr className=""></hr>
    </div>
  );
}
function RecipePage() {
  const urlDetail = useParams();
  const [Largeimg, setLargeimg] = useState(
    "https://i.ndtvimg.com/i/2015-09/ginger-tea-625_625x350_71441750276.jpg"
  );

  function handleChangeimg(event) {
    console.log(event.target.src);
    setLargeimg(event.target.src);
  }

  function handleReadBtn() {}
  return (
    <div className="container-fluid">
      <div className="row">
      <div className={`${styles.small_img_group} col-1`}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdz3kAgMoi6T3nHNnN15bmXbx32IjQigv8gA&usqp=CAU"
              alt=""
              className={styles.small_img}
              onClick={handleChangeimg}
            ></img>
            <img
              src="https://i.ndtvimg.com/i/2015-09/ginger-tea-625_625x350_71441750276.jpg"
              alt=""
              className={styles.small_img}
              onClick={handleChangeimg}
            ></img>
            <img
              src="https://i.ndtvimg.com/i/2015-09/ginger-tea-625_625x350_71441750276.jpg"
              alt=""
              className={styles.small_img}
              onClick={handleChangeimg}
            ></img>
          </div>
        <div className="col-md-7">
          <img src={Largeimg} alt="" className={styles.Large_img}></img>
        </div>
        <div className="col-md-4 mt-3">
          <p>
            <Link to="/category">Categories</Link> {">>"}{" "}
            <Link to="/category/Pancakes">Soups</Link> {">>"} {urlDetail.food}
          </p>
          <h1>{urlDetail.food}</h1>
          <h5>
            <span>Category </span> -: Beverage
          </h5>
          
          {/* <h5>
            <span>Preparation Time </span> -: 10 min
          </h5>
          <h5>
            <span>Cooking Time </span> -: 5 min
          </h5>
          <h5>
            <span>Origin of Food </span> -: India
          </h5>
          <h6>
            <span>Difficiulty Level </span> -: Easy
          </h6> */}
        </div>
      </div>
      <div className={styles.recipe_desc}>
        Everyone likes to drink lassi in the summer season and if the taste of
        mango i.e. mango is added to your favorite lassi, then imagine how fun
        that drink will be. That's why today we have brought for you the recipe
        of Mango Lassi to beat the heat.
      </div>
      <button onClick={handleReadBtn}>
        Read More
      </button>
      <hr></hr>
      <h2 className="text-center my-3">Required Ingrediants to Cook Foood </h2>
      <div className={styles.ingrediants}>
        <ul className="row">
          <li className="col-md-6">1 Cup Mango Pulp</li>
          <li className="col-md-6">2 cups Curd</li>
          <li className="col-md-6">1 cup Milk</li>
          <li className="col-md-6">1 tbsp Saffron soaked in water</li>
          <li className="col-md-6">A pinch of Green Cardamom Powder </li>
        </ul>
      </div>
      <div className={styles.recipe}>
        <h2 className="text-center my-3">Recipe to Cook Food</h2>
        <h4 className="text-center">
          Follow these instruction carefully {urlDetail.food} step by step
          today!
        </h4>
        <ol type="i">
          <li className="text-success">
            Boil the water with the neem leaves and ginger for 2 to 3 minutes
          </li>
          <hr></hr>
          <li className="text-success">
            Remove from the gas and add the lemon juice and honey. Stir well{" "}
          </li>
          <hr></hr>
          <li className="text-success">
            Strain the tea and have it immediately.
          </li>
        </ol>
      </div>
      {/* <div className="row">
        <h2 className="col-md-5">Cooking Video for Preparing Food</h2>
        <iframe
          className="col-md-7"
          width="560"
          height="315"
          src="https://www.youtube.com/watch?v=NKJnHewiGdc&list=PPSV"
          title="Youtube Player"
          frameborder="0"
          allowFullScreen
        />
      </div> */}
      {/* <iframe src=""></iframe> */}
      <FoodfromSameCategory></FoodfromSameCategory>
      <hr className={`mt-3`}></hr>

      <RecipeReview></RecipeReview>
    </div>
  );
}

export default RecipePage;
