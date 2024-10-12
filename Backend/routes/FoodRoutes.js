const { Router } = require("express")
const FoodControllers=require("../Controllers/foodController");
const authMiddleware=require("../middleware/authmiddleware");
const foodController = require("../Controllers/foodController");
const upload=require("../middleware/multermiddlerware");
const router=Router();

router.get("/",FoodControllers.getSearchFoodItem); 
router.get("/get",FoodControllers.getTotalfilterFood); 
router.post("/add",authMiddleware.verifyToken,upload.single('foodImg'),FoodControllers.addFood2);
router.get("/latest",foodController.latestRecipe);
router.get("/mostLiked",foodController.mostLikeRecipe);
router.post("/like",authMiddleware.verifyToken,FoodControllers.likeRecipe);
router.get("/filter",FoodControllers.getFilterFoodData);
router.delete("/:food_id",authMiddleware.isAdmin,FoodControllers.deleteFood);
router.put("/visit/:foodId",FoodControllers.visitRecipe);
router.get("/:food_id",FoodControllers.getFoodDetails);
router.get("/likes/:foodId", FoodControllers.getLikeCount);
router.get("/isLiked/:foodId", authMiddleware.verifyToken, FoodControllers.isLikedByUser);
router.get("/share/:foodId", FoodControllers.shareRecipe);
router.get("/difficulty/:level", FoodControllers.getFoodByDifficulty);
router.get("/foodType/:type", FoodControllers.getFoodByType);
// router.post("/report/:foodId", authMiddleware.verifyToken, FoodControllers.reportRecipe);
// router.get("/reported", authMiddleware.isAdmin, FoodControllers.getReportedRecipes);

module.exports=router;