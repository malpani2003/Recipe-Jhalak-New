const { Router } = require("express")
const categoryControllers = require("../Controllers/categoryControllers");
const authMiddleware=require("../middleware/authmiddleware");
const router=Router();


router.post("/add",authMiddleware.isAdmin,categoryControllers.addCategory);
router.get("/food/:category_id",categoryControllers.getFoodForCategory);
router.get("/all",categoryControllers.getAllCategory);
router.get("/popular",categoryControllers.popularCategory);
router.put("/visit/:categoryID",categoryControllers.incrementVisitCount);

// Delete Category (Admin Only)
router.put("/update/:categoryID", authMiddleware.isAdmin, categoryControllers.updateCategory);

// Delete Category (Admin Only)
router.delete("/delete/:categoryID", authMiddleware.isAdmin, categoryControllers.deleteCategory);

// Get Categories with Pagination
// router.get("/paginated", categoryControllers.getPaginatedCategories);

// Search Categories by Name
router.get("/search", categoryControllers.searchCategoryByName);

  
module.exports=router;
