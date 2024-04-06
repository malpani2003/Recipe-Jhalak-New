const UserCollection = require("../models/database").users;
const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();


const secretId = process.env.SECERTKEY;

const isAdmin = async (request, response, next) => {
  const token = request.header("Auth");
  console.log(token);
  if (!token) return response.status(401).send("Please Login first");
  try {
    const decoded = jsonwebtoken.verify(token, secretId);
    console.log(decoded);
    const userId = decoded.id;
    const userData = await UserCollection.findById(userId);
    console.log(userData);
    const isAdmin = userData["isAdmin"] || false;
    if (isAdmin) {
      next();
    } else {
      response
        .status(403)
        .json({ error: "Forbidden. Only admins can perform this action." });
    }
  } catch (error) {
    return response.status(401).send("Invalid Token");
  }
};
const verifyToken = async (request, response) => {
  const token = request.header("Auth");
  console.log(token);
  if (!token) return response.status(401).send("Access Denied");

  try {
    const decoded = jsonwebtoken.verify(token, secretId);
    request.user = decoded.id;
    return;
  } catch (error) { 
    return response.status(401).send("Invalid Token");
  }
};
module.exports = {
  isAdmin,
  verifyToken,
};
