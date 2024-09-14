const UserCollection = require("../models/database").users;
const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();

const secretId = process.env.SECERTKEY || "RecipeDekh";

const isAdmin = async (req, res, next) => {
  const token = req.cookies["Token"];
  
  if (!token) {
    return res.status(401).json({ message: "Please login first." });
  }

  try {
    const decoded = jsonwebtoken.verify(token, secretId);
    const userId = decoded.id;
    
    const userData = await UserCollection.findById(userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found." });
    }

    if (userData.isAdmin) {
      return next();
    } else {
      return res.status(403).json({ error: "Access forbidden. Admins only." });
    }

  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

const verifyToken = async (req, res, next) => {
  const token = req.cookies["Token"];

  if (!token) {
    return res.status(401).json({ message: "Please Login" });
  }

  try {
    console.log("Token ",token);
    console.log(secretId);
    const decoded = jsonwebtoken.verify(token,secretId);
    console.log(decoded);
    req.user = decoded.id;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = {
  isAdmin,
  verifyToken,
};
