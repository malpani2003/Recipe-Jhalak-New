const { Router } = require("express")
const categoryControllers = require("../Controllers/categoryControllers");
const authMiddleware=require("../middleware/authmiddleware");
const router=Router();


router.post("/add",authMiddleware.isAdmin,categoryControllers.addCategory);
router.get("/food/:category_id",categoryControllers.getFoodForCategory);
router.get("/all",categoryControllers.getAllCategory);
router.get("/popular",categoryControllers.popularCategory);
router.put("/visit/:categoryID",categoryControllers.incrementVisitCount);


  
module.exports=router;
