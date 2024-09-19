require("dotenv").config();
const UserCollection = require("../models/database").users;
const Verification = require("../models/database").verification;
const Like = require("../models/database").like;

const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const secretId = process.env.SECERTKEY || "RecipeDekh";
const expiresIn = 1;

const transportar = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS, 
  },
});
function getToken(id) {
  return jsonwebtoken.sign({ id }, secretId, { expiresIn: expiresIn + "h" }); 
}

// function EmailSend() {
//   transportar.verify((err, success) => {
//     if (err) {
//       console.log(err);
//     }
//     else {
//       console.log("Ready for Sending Messages");
//       console.log(success)
//     }
//   })
// }

// EmailSend()
async function sendVerificationEmail({ _id, Email_id, Name }) {
  try {
    const uniqueString = uuidv4() + _id;
    const verificationLink = `https://recipe-jhalak-new.onrender.com/api/users/verify-email/${_id}/${uniqueString}`;

    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2>Email Verification</h2>
        <p>Dear, ${Name}</p>
        <p>Thank you for registering with RecipeJhalak. To complete registration, click the following link to verify your email address:</p>
        <p><a href="${verificationLink}" target="_blank">Verify Email</a></p>
        <p>If you did not request this, please ignore this email.</p>
        <p>Thank you,<br/>Recipe Jhalak</p>
      </div>
    `;

    // Create a hashed unique verification string
    const hashUniqueString = await bcryptjs.hash(uniqueString, 10);
    const newVerification = new Verification({
      userId: _id,
      verificationString: hashUniqueString,
      createdAt: Date.now(),
      expiresAt: Date.now() + 1000 * 60 * 5, // 5 minutes expiration
    });

    await newVerification.save();

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: Email_id,
      subject: "Recipe Jhalak - Verify Your Email",
      html: emailContent,
    };

    // Send the email
    await transportar.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Failed to send verification email:", error.message);
    return false;
  }
}

const registerUser = async (request, response) => {
  try {
    const userData = request.body;
    // console.log(userData);

    if (userData.password !== userData.cpassword) {
      return response.status(400).send({
        error: true,
        message: "Confirm Password is not the same as Password",
      });
    }

    const checkUserAlready = await UserCollection.find({
      Email_id: userData.email,
    });

    // console.log(checkUserAlready)
    if (checkUserAlready.length !== 0) {
      return response.status(409).send({
        error: true,
        message: "User with Email id Already Exist",
      });
    }

    const hashPassword = bcryptjs.hashSync(userData.password, 10);

    const newUser = new UserCollection({
      Name: userData.name.trim(),
      Email_id: userData.email.toLowerCase().trim(),
      Password: hashPassword.trim(),
      isAdmin: userData.isAdmin == 1 ? true : false,
    });

    const result = await newUser.save();
    if (!result) {
      return response
        .status(400)
        .send({ error: true, message: "User cannot be Registered" });
    }
    // console.log(result);
    const isVerificationLinkSent = await sendVerificationEmail(result);
    // console.log(isVerificationLinkSent);
    const tokenId = getToken(result._id);
    // console.log(tokenId);
    response.header("Auth", tokenId);

    const successMessage = isVerificationLinkSent
      ? "Registration Completed, Verification Link Sent on Email"
      : "Registration Completed";
    return response.status(201).send({
      error: false,
      message: successMessage,
      token: tokenId,
    });
  } catch (error) {
    return response
      .status(500)
      .json({
        error: true,
        message: `Internal Server Error as ${error.message}`,
      });
  }
};

const postLogin = async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response
        .status(422)
        .send({ error: true, message: "Please Entered Correct Details" });
    }
    const checkUserAlready = await UserCollection.findOne({
      Email_id: email.toLowerCase(),
    });
    console.log(checkUserAlready);

    if (!checkUserAlready) {
      return response.status(400).send({
        error: true,
        message: "User Does not Exist. Please Register",
      });
    }
    const realPassword = checkUserAlready.Password;
    const checkPassword = bcryptjs.compareSync(password, realPassword);

    if (!checkPassword) {
      return response.status(400).send({
        error: true,
        message: "Entered Incorrect Password",
      });
    }

    const tokenId = getToken(checkUserAlready._id);
    response.cookie("Token", tokenId, {
      path: "/",
      maxAge: 1000 * 60 * 60 * 24, // Set the expiration time
      sameSite:"None",
      secure:true,
      httpOnly: true,
    });
    // response.header("Authorization", `Bearer ${tokenId}`);
    response.header("Access-Control-Allow-Credentials", true);
    response.status(200).send({
      error: false,
      message: "Successfully Login",
      token: tokenId,
    });
  } catch (error) {
    response
      .status(500)
      .json({ error: true, message: `Internal Server Error ${error.message}` });
  }
};

const userProfile = async (request, response) => {
  const userId = request.user;
  try {
    const user_data = await UserCollection.findOne( 
      {
        _id: userId,
      },
      { Password: 0 }
    );

    if (user_data) {
      // console.log(user_data);
      return response.status(200).send({ error: false, message: user_data });
    }
    return response
      .status(404)
      .send({ error: true, message: "User not found" });
  } catch (error) {
    return response
      .status(500)
      .json({ error: true, message: `Internal Server Error ${error.message}` });
  }
};

const getLikedRecipes = async (req, res) => {
  try {
    const userId = req.user; 
    console.log(userId);
    const likes = await Like.find({ userId:userId},{createdAt:0,updatedAt:0}).populate("foodId","foodName foodImg");
    const likeRecipe=likes.map((like)=>like.foodId);
    return res.status(200).json({ likeRecipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to fetch liked recipes" });
  }
};

const authCheck = (req, res) => {
  const token = req.cookies["Token"];
  console.log(token);
  if (!token) return res.status(401).send({ message: false,error:"No Token Present" });
  try {
    const decoded = jsonwebtoken.verify(token, secretId);
    return res.status(200).send({ message: true, user: decoded });
  } catch (error) {
    return res.status(401).send({ message: false, error: "Invalid token" });
  }
};
const logout=(req, res) => {
    res.clearCookie('Token', {
      httpOnly: true, 
      secure:true,  
      path:"/",
      sameSite: 'None',
    });
    res.status(200).send({ message: "Logout successful" });
}

module.exports = {
  registerUser,
  postLogin,
  userProfile,
  logout,
  authCheck,
  getLikedRecipes
};
