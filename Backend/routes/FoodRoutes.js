const { Router } = require("express")
const FoodControllers=require("../Controllers/foodController");
const authMiddleware=require("../middleware/authmiddleware");
const foodController = require("../Controllers/foodController");
const router=Router();

// authMiddleware.isAdmin,
function authenticateToken(request, response, next) {
    authMiddleware.verifyToken(request, response);
    next();
}

router.get("/",FoodControllers.getSearchFoodItem);
router.post("/add",FoodControllers.addFood2);
router.get("/all",foodController.getAllFood);
router.post("/like",authenticateToken,FoodControllers.likeRecipe);
router.get("/filter",FoodControllers.getFilterFoodData);
router.delete("/:food_id",authMiddleware.isAdmin,FoodControllers.deleteFood);
router.post("/:food_id",authenticateToken,FoodControllers.addComment);
router.get("/:food_id",FoodControllers.getFoodDetails);


module.exports=router;