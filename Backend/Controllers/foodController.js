const Category_Collection = require("../models/database").categories;
const UserCollection = require("../models/database").users;
const Item_Collection = require("../models/database").items;
const Like_collection = require("../models/database").like;

module.exports = {
  addFood: async (req, res) => {
    try {
      const { food_Instruction, Food_Ingrediants, ...rest } = req.body;

      const newRecipe = new Item_Collection({
        ...rest,
        Food_Instruction: food_Instruction.trim().split("\n"),
        Food_Ingrediants: Food_Ingrediants.trim().split("\n"),
      });

      const result = await newRecipe.save();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: `Internal Server Error ${error.message}` });
    }
  },

  addFood2: async (req, res) => {
    try {
      const food = req.body;
      if (req.file && req.file.path) {
        food.foodImg = req.file.path;
        food.previewImg = req.file.path;
      } else {
        res.status(400).json({ error: "No file Selected" });
      }
      // console.log(food);
      food["isDrink"] = food["isDrink"] === "Yes";
      const newRecipe = new Item_Collection(food);
      const result = await newRecipe.save();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: `Internal Server Error ${error.message}` });
    }
  },

  getFoodDetails: async (req, res) => {
    try {
      const { food_id } = req.params;
      const foodData = await Item_Collection.findById(food_id);
      if (!foodData)
        return res.status(404).json({ error: "Food item not found" });

      const foodSameCategoryData = await Item_Collection.find({
        foodCategoryId: foodData.foodCategoryId,
      });

      const categoryData = await Category_Collection.findById(
        foodData.foodCategoryId
      );
      const categoryName = categoryData?.Category_Name || "Unknown";

      const similarArray = [];
      const total = Math.min(foodSameCategoryData.length, 4);
      while (similarArray.length < total) {
        const randomItem =
          foodSameCategoryData[
            Math.floor(Math.random() * foodSameCategoryData.length)
          ];
        if (!similarArray.find((item) => item._id.equals(randomItem._id))) {
          similarArray.push({
            _id: randomItem._id,
            foodImg: randomItem.foodImg,
            foodName: randomItem.foodName,
          });
        }
      }

      res.status(200).json({
        FoodDetails: foodData,
        similarFoodCategory: similarArray,
        category: categoryName,
      });
    } catch (error) {
      res.status(500).json({ error: `Internal Server Error ${error.message}` });
    }
  },

  getSearchFoodItem: async (req, res) => {
    try {
      const { fname } = req.query;
      const searchFoodItem = await Item_Collection.find({
        foodName: new RegExp(fname, "i"),
      });
      res.status(200).json(searchFoodItem);
    } catch (error) {
      res.status(500).json({ error: `Internal Server Error ${error.message}` });
    }
  },

  deleteFood: async (req, res) => {
    try {
      const { food_id } = req.params;
      const result = await Item_Collection.findByIdAndDelete(food_id);
      if (!result)
        return res.status(404).json({ error: "Food item not found" });
      res.status(200).json({ msg: "Successfully Deleted" });
    } catch (error) {
      res.status(500).json({ error: `Internal Server Error ${error.message}` });
    }
  },

  updateFood: async (req, res) => {
    try {
      const { food_id } = req.params;
      const newFoodData = req.body;
      const result = await Item_Collection.findByIdAndUpdate(
        food_id,
        { $set: newFoodData },
        { new: true }
      );
      if (!result)
        return res.status(404).json({ error: "Food item not found" });
      res.status(200).json({ msg: "Successfully Updated", data: result });
    } catch (error) {
      res.status(500).json({ error: `Internal Server Error ${error.message}` });
    }
  },

  latestRecipe: async (req, res) => {
    try {
      const foodItemList = await Item_Collection.find(
        {},
        { foodName: 1, foodImg: 1, likeCount: 1, visitorCount: 1 }
      )
        .sort({ createdAt: -1 })
        .limit(6);

      res.status(200).json(foodItemList);
    } catch (error) {
      res.status(500).json({ error: `Internal Server Error ${error.message}` });
    }
  },

  mostLikeRecipe: async (req, res) => {
    try {
      const foodItemList = await Item_Collection.find(
        {},
        { foodName: 1, foodImg: 1, likeCount: 1, visitorCount: 1 }
      )
        .sort({ likeCount: -1, visitorCount: -1 })
        .limit(9);

      res.status(200).json(foodItemList);
    } catch (error) {
      res.status(500).json({ error: `Internal Server Error ${error.message}` });
    }
  },

  likeRecipe: async (req, res) => {
    const userId = req.user;
    const { foodId } = req.body;

    try {
      if (!foodId || !userId) {
        return res
          .status(400)
          .json({ error: "Food ID and User ID are required" });
      }

      const existingLike = await Like_collection.findOne({ userId, foodId });
      if (existingLike) {
        return res
          .status(400)
          .json({ message: "You have already liked this recipe" });
      }

      const newLike = new Like_collection({ userId, foodId });
      const result = await newLike.save();

      if (!result) {
        return res.status(500).json({ message: "Failed to like the recipe" });
      }

      const updatedRecipe = await Item_Collection.findByIdAndUpdate(
        foodId,
        { $inc: { likeCount: 1 } },
        { new: true }
      );

      if (!updatedRecipe) {
        return res
          .status(500)
          .json({ message: "Failed to update recipe like count" });
      }

      return res
        .status(200)
        .json({ message: "Recipe liked successfully", like: newLike });
    } catch (error) {
      console.error("Error in liking the recipe:", error);
      return res
        .status(500)
        .json({ error: `Internal Server Error: ${error.message}` });
    }
  },

  getFilterFoodData: async (req, res) => {
    try {
      const { name } = req.query;
      if (name === "area") {
        const result = await Item_Collection.distinct("foodArea");
        res.status(200).json(result);
      } else if (name === "veg") {
        // Add your logic for vegetarian filtering
      } else {
        res.status(200).json({ result: "Yes" });
      }
    } catch (error) {
      res.status(500).json({ error: `Internal Server Error ${error.message}` });
    }
  },
  getTotalfilterFood:async(req,res)=>{
    try{
      const filterQuery={};
      // {foodType:{$in:[]}}
      const {foodType,difficulty,page,limit}=req.query;
      console.log(foodType,difficulty,page,limit);
      if(foodType){
         filterQuery["foodType"]={"$in":foodType.split(",")};
      }
      if(difficulty){
        filterQuery["difficulty"]={"$in":difficulty.split(",")};
      }
      const skip=(page-1)*limit;
      console.log(filterQuery);
      const result = await Item_Collection.find(filterQuery).limit(limit).skip(skip); 
      const totalFoodItem=await Item_Collection.countDocuments(filterQuery);
      res.status(200).json({data:result,totalFoodItem}); 
    } 
    catch(error){
      res.status(500).json({ error: `Internal Server Error ${error.message}` });
    }
  },

  visitRecipe: async (req, res) => {
    try {
      const { foodId } = req.params;
      const updatedItem = await Item_Collection.findByIdAndUpdate(
        foodId,
        { $inc: { visitorCount: 1 } },
        { new: true }
      );
      if (!updatedItem)
        return res.status(404).json({ error: "Food item not found" });
      res.status(200).json(updatedItem);
    } catch (error) {
      res.status(500).json({ error: `Internal Server Error ${error.message}` });
    }
  },
  shareRecipe: (req, res) => {
    const { foodId } = req.params;
    const shareUrl = `${req.protocol}://${req.get("host")}/food/${foodId}`;
    res.json({ message: "Shareable link generated", shareUrl });
  },
  getLikeCount: async (req, res) => {
    const { foodId } = req.params;

    try {
      const recipe = await Item_Collection.findById(foodId);
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      res.json({ foodId: foodId, likeCount: recipe.likeCount });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  isLikedByUser: async (req, res) => {
    try {
      const { foodId } = req.params;
      const userId = req.user;
      const isLiked = await Like_collection.exists({ foodId, userId });
      if (isLiked) {
        return res.status(200).json({ isLiked: true });
      }
      return res.status(200).json({ isLiked: false });
    } catch (error) {
      console.error("Error checking like status:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  getFoodByDifficulty: async (req, res) => {
    const { level } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    try {
      const foodItems = await Item_Collection.find( {difficulty: level},{foodName:1,previewImg:1,foodDesc:1})
        .limit(limit)
        .skip((page - 1) * limit);
      const totalItems = await Item_Collection.countDocuments({
        difficulty: level,
      });
      const totalPages = Math.ceil(totalItems / limit);
      if (foodItems.length === 0) {
        return res
          .status(404)
          .json({ message: "No food items found for this difficulty level." });
      }

      res.json({
        totalItems,
        totalPages,
        currentPage: page,
        items: foodItems,
      });
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  },
  getFoodByType: async (req, res) => {
    const { type } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    try {
      const foodItems = await Item_Collection.find( {foodType: type},{foodName:1,previewImg:1,foodDesc:1})
        .limit(limit)
        .skip((page - 1) * limit);
        
      const totalItems = await Item_Collection.countDocuments({
        difficulty: level,
      });
      const totalPages = Math.ceil(totalItems / limit);
      if (foodItems.length === 0) {
        return res
          .status(404)
          .json({ message: "No food items found for this difficulty level." });
      }

      res.json({
        totalItems,
        totalPages,
        currentPage: page,
        items: foodItems,
      });
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  }
};
