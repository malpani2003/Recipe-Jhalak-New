const { Router } = require("express")
const authmiddleware = require("../middleware/authmiddleware");
const authController = require("../Controllers/authcontroller");
const VerifcationController = require("../Controllers/verificationController");

const router = Router();

function authenticateToken(request, response, next) {
    authmiddleware.verifyToken(request, response);
    next();
}


router.post("/register", authController.registerUser);
router.post("/login", authController.postLogin);
router.get("/profile", authenticateToken, authController.userProfile);

router.get("/verify-email/:userId/:verifyString", VerifcationController.verifyLink);

module.exports = router;
// Router