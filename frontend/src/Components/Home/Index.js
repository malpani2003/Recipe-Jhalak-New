import React from "react";
import HeroSection from "./HeroSection";
import LatestRecipe from "./LatestRecipe";
import TopRecipe from "./TopRecipe";
import CategoryList from "./CategoryList";
import Newsletter from "./Newsletter";

const Index = () => {
  return (
    <div>
      <HeroSection />
      <CategoryList />
      <LatestRecipe />
      <TopRecipe />
      <Newsletter/>
    </div>
  );
};

export default Index;
