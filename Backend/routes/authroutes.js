const { Router } = require("express")
const authmiddleware = require("../middleware/authmiddleware");
const authController = require("../Controllers/authcontroller");
const VerifcationController = require("../Controllers/verificationController");

const router = Router();
 

router.post("/register", authController.registerUser); 
router.get("/check",authController.authCheck); 
router.post("/login", authController.postLogin);
router.get("/logout",authmiddleware.verifyToken,authController.logout);  
router.get("/profile", authmiddleware.verifyToken, authController.userProfile);
router.get("/likedrecipes", authmiddleware.verifyToken, authController.getLikedRecipes);
router.get("/verify-email/:userId/:verifyString", VerifcationController.verifyLink);

module.exports = router;