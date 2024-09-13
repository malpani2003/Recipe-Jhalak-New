const express = require("express");
const Category_Collection = require("../models/database").categories;
const UserCollection = require("../models/database").users;
const Item_Collection = require("../models/database").items;
const { request } = require("express");

module.exports = {
  addFood: async (request, response) => {
    try {
      const food = request.body;
      // console.log(food);

      const Instruction = food["food_Instruction"].trim();
      const Ingredient = food["Food_Ingrediants"].trim();

      const newRecipe = new Item_Collection({
        Food_Name: food["food_nm"].trim(),
        Food_Img: food["link"].trim(),
        Preview_Img: food["preview_image"].trim(),
        Food_Category_ID: food["food_category_id"].trim(),
        ptime: food["ptime"].trim(),
        ctime: food["ctime"].trim(),
        Food_Area: food["foodArea"].trim(),
        IsDrink: food["Drink"].trim(),
        Food_Instruction: Instruction.split("\n"),
        Food_Ingrediants: Ingredient.split("\n"),
        Difficult: food["Difficuilt"].trim(),
        Food_Desc: food["food_desc"].trim().split("\n"),
      });

      const result = await newRecipe.save();
      if (result) {
        response.status(200).json(result);
      } else {
        response.status(500).json({ Error: "Cannot be added" });
      }
    } catch (error) {
      response
        .status(500)
        .json({ error: `Internal Server Error ${error.message}` });
    }
  },
  addFood2: async (request, response) => {
    try {
      const food = request.body;
      // console.log(food);
      food["isDrink"] = food["isDrink"] == "Yes" ? true : false;
      const newRecipe = new Item_Collection(food);
      const result = await newRecipe.save();
      if (result) {
        response.status(200).json(result);
      } else {
        response.status(500).json({ Error: "Cannot be added" });
      }
    } catch (error) {
      response
        .status(500)
        .json({ error: `Internal Server Error ${error.message}` });
    }
  },


  getFoodDetails: async (request, response) => {
    try {
      const foodId = request.params.food_id.trim();
      const foodData = await Item_Collection.findById(foodId);
      // console.log(foodData);
      const foodSameCategoryData = await Item_Collection.find({
        foodCategoryId: foodData["foodCategoryId"],
      });

      const categoryData = await Category_Collection.findById(
        foodData["foodCategoryId"]
      );
      // console.log(categoryData);
      const categoryName = categoryData["Category_Name"];

      const len = foodSameCategoryData.length;
      const similarArray = [];
      const total = len < 4 ? len : 4;
      for (let index = 0; index < total; index++) {
        const randomNum = Math.floor(Math.random() * len);
        const item = foodSameCategoryData[randomNum];
        if (similarArray.includes(item)) {
          index = index - 1;
        } else {
          const jsonData = {
            "_id": item["_id"],
            "foodImg": item["foodImg"],
            "foodName": item["foodName"]
          }
          similarArray.push(jsonData);
        }
      }

      const jsonData = {
        FoodDetails: foodData,
        similarFoodCategory: similarArray,
        category: categoryName,
      };

      // console.log(jsonData);
      response.status(200).json(jsonData);
    } catch (error) {
      response
        .status(500)
        .json({ error: `Internal Server Error ${error.message}` });
    }
  },
  getSearchFoodItem: async (request, response) => {
    try {
      const foodName = request.query.fname;
      // console.log(foodName);
      const searchFoodItem = await Item_Collection.find({
        foodName: new RegExp(foodName, 'i'),
      });
      // console.log(searchFoodItem);
      response.status(200).send(searchFoodItem);
    } catch (error) {
      response
        .status(500)
        .json({ error: `Internal Server Error ${error.message}` });
    }
  },

  deleteFood: async (request, response) => {
    try {
      const foodId = request.params.food_id.trim();
      await Item_Collection.findByIdAndDelete(foodId);
      response.status(200).send({ "msg": "Successfully Deleted" });
    } catch (error) {
      response
        .status(500)
        .json({ error: `Internal Server Error ${error.message}` });
    }
  },
  updateFood: async (request, response) => {
    try {
      const foodId = request.params.food_id.trim();
      const newFoodData = request.body;
      await Item_Collection.findByIdAndUpdate(foodId, { $set: newFoodData });
      response.status(200).send({ "msg": "Successfully Deleted" });
    } catch (error) {
      response
        .status(500)
        .json({ error: `Internal Server Error ${error.message}` });
    }
  },
  getAllFood: async (request, response) => {
    try {
      const foodItemList = await Item_Collection.find();
      // console.log(foodItemList);
      response.status(200).send(foodItemList);
    } catch (error) {
      response
        .status(500)
        .json({ error: `Internal Server Error ${error.message}` });
    }
  },
  addComment: async (request, response) => {
    try {
      const commentJson = request.body;
      // console.log(request.user);
      // console.log(request.body);
      const UserData = await UserCollection.findById(request.user, { Name: 1 });
      // console.log(UserData);
      const json = {
        'userName': UserData["Name"],
        'comment': request.body["comment"],
        'date': request.body["date"]
      };
      const UpdatedItem = await Item_Collection.findByIdAndUpdate(request.body["foodId"], { $push: { comments: json } });
      response.status(200).send(UpdatedItem);
    }
    catch (error) {
      response
        .status(500)
        .json({ error: `Internal Server Error ${error.message}` });
    }
  },

  likeRecipe: async (request, response) => {
    // console.log("enter");
    try {
      const userData = request.user;
      response.send(userData);
      const UpdatedItem = await Item_Collection.findByIdAndUpdate(request.body["foodId"], { $push: { likesUsers: userData } });
      response.status(200).send(UpdatedItem);
    } catch (error) {
      response
        .status(500)
        .json({ error: `Internal Server Error ${error.message}` });
    }
  },

  getFilterFoodData: async (request, response) => {
    // console.log(request.query);
    if (request.query["name"] == "area") {
      const result = await Item_Collection.distinct("foodArea");
      response.status(200).json(result);
    }
    else if (request.query["name"] == "veg") {
      // const result=await Item_Collection.find()
    }
    else {
      response.status(200).json({ result: "Yes" });
    }
  }
};
