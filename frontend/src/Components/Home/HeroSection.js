import React, { useEffect, useState } from "react";

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const content = [
    {
      image: "https://media.istockphoto.com/id/1365398175/photo/chef-decorate-plate-with-food-on-kitchen.jpg?s=612x612&w=0&k=20&c=1WP0yJahorROwRJpkUb6jMJudpYTAFeqHT9yqZYmZyg=",
      title: "Spice Delight",
      description: "Discover the bold flavors of Indian spices in this exciting dish. Taste the heat, balance the flavor, and enjoy!"
    },
    {
      image: "https://media.istockphoto.com/id/1365398175/photo/chef-decorate-plate-with-food-on-kitchen.jpg?s=612x612&w=0&k=20&c=1WP0yJahorROwRJpkUb6jMJudpYTAFeqHT9yqZYmZyg=",
      title: "Traditional Feast",
      description: "A feast fit for royalty! Experience the rich traditions of Indian culinary art with every bite."
    },
    {
      image: "https://media.istockphoto.com/id/1365398175/photo/chef-decorate-plate-with-food-on-kitchen.jpg?s=612x612&w=0&k=20&c=1WP0yJahorROwRJpkUb6jMJudpYTAFeqHT9yqZYmZyg=",
      title: "Modern Twist",
      description: "A fusion of modern techniques and classic flavors. Try this contemporary dish with an Indian twist!"
    }
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % content.length);
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-100 p-4 md:p-40 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row p-4 md:p-8 max-w-4xl w-full relative">
        <div className="relative w-full md:w-1/2 bg-gray-50 flex items-center justify-center rounded-t-lg md:rounded-l-lg md:rounded-tr-none overflow-hidden">
          <img
            src={content[currentIndex].image}
            alt="Recipe Jhalak"
            className="w-full h-auto object-cover transition duration-500 ease-in-out rounded-lg transform hover:scale-105"
          />
        </div>
        <div className="w-full md:w-1/2 pl-0 md:pl-8 flex flex-col justify-center py-4 md:py-0 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
            {content[currentIndex].title}
          </h2>
          <p className="text-gray-600 mb-4 text-sm md:text-base">
            {content[currentIndex].description}
          </p>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition duration-200 mx-auto md:mx-0">
            View Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
