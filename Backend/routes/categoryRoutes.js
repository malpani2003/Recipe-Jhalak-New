const { Router } = require("express")
const categoryControllers = require("../Controllers/categoryControllers");
const authMiddleware=require("../middleware/authmiddleware");
const router=Router();


router.post("/add",authMiddleware.isAdmin,categoryControllers.addCategory);
router.get("/food/:category_id",categoryControllers.getFoodForCategory);
router.get("/all",categoryControllers.getAllCategory);



  
module.exports=router;
