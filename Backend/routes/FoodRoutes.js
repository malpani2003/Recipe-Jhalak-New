const { Router } = require("express")
const FoodControllers=require("../Controllers/foodController");
const authMiddleware=require("../middleware/authmiddleware");
const foodController = require("../Controllers/foodController");
const router=Router();

router.get("/",FoodControllers.getSearchFoodItem);
router.post("/add",authMiddleware.isAdmin,FoodControllers.addFood2);
router.get("/latest",foodController.latestRecipe);
router.get("/mostLiked",foodController.mostLikeRecipe);
router.post("/like",authMiddleware.verifyToken,FoodControllers.likeRecipe);
router.get("/filter",FoodControllers.getFilterFoodData);
router.delete("/:food_id",authMiddleware.isAdmin,FoodControllers.deleteFood);
router.post("/:food_id",authMiddleware.verifyToken,FoodControllers.addComment);
router.put("/visit/:foodId",FoodControllers.visitRecipe);
router.get("/:food_id",FoodControllers.getFoodDetails);


module.exports=router;