const { Router } = require("express")
const authmiddleware=require("../middleware/authmiddleware");
const authController=require("../Controllers/authcontroller");
const router=Router();

function authenticateToken(request, response, next) {
    authmiddleware.verifyToken(request, response);
    next();
}

router.post("/register",authController.registerUser);
router.post("/login",authController.postLogin); 
router.get("/profile",authenticateToken,authController.userProfile);

// router.get("/otp_verification/:user_id",authmiddleware.get_token,authcontroller.OTP_Verification_get);
// router.post("/otp_verification/:user_id",authmiddleware.get_token,authcontroller.OTP_Verification_post);
// router.get("/OTP_FAIL/:user_id",authmiddleware.get_token,authcontroller.OTP_Verification_fail);
// router.get("/logout",authmiddleware.get_token,authController.Logout_User);


module.exports=router;
// Router