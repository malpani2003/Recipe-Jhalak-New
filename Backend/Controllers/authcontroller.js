require("dotenv").config();
const UserCollection = require("../models/database").users;
const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const secretId = process.env.SECERTKEY;
const expiresIn = 10;

function getToken(id) {
  return jsonwebtoken.sign({ id }, secretId, { expiresIn: expiresIn + "h" });
}
 
module.exports = {
  registerUser: async (request, response) => {
    try {
      const userData = request.body;
      console.log(userData);
      if (userData.password !== userData.cpassword && false) {
        response.status(400).send({
          message: "Confirm Password is not the same as Password",
        });
      } else {
        const checkUserAlready = await UserCollection.find({
          Email_id: userData.email,
        });
        if (checkUserAlready.length !== 0) {
          response.status(409).send({
            message: "User with Email id Already Exist",
          });
        } else {
          const hashPassword = bcryptjs.hashSync(userData.password, 10);

          const newUser = new UserCollection({
            Name: userData.name.trim(),
            Email_id: userData.email.toLowerCase().trim(),
            Password: hashPassword.trim(),
            isAdmin: userData.isAdmin == 1 ? true : false,
          });

          const result = await newUser.save();
          const tokenId = getToken(result._id);
          response.header("Auth",tokenId);
          response.status(201).send({
            message: "Successfully Register",
            token: tokenId,
          });
        }
      }
    } catch (error) {
      response
        .status(500)
        .json({ error: `Internal Server Error ${error.message}` });
    }
  },

  postLogin: async (request, response) => {
    try {
      const { email, password } = request.body;
      const checkUserAlready = await UserCollection.findOne({
        Email_id: email.toLowerCase(),
      });
      console.log(checkUserAlready);

      if (checkUserAlready) {
        const realPassword = checkUserAlready.Password;
        const checkPassword = bcryptjs.compareSync(password, realPassword);

        if (checkPassword) {
          const tokenId = getToken(checkUserAlready._id);
          response.header("authorization",`Bearer ${tokenId}`);
          response.header("Access-Control-Allow-Credentials", true);
          response.status(200).send({
            message: "Successfully Login",
            token: tokenId,
          });
        } else {
          response.status(400).send({
            message: "Entered Incorrect Password",
          });
        }
      } else {
        response.status(400).send({
          message: "User Does not Exist. Please Register",
        });
      }
    } catch (error) {
      response
        .status(500)
        .json({ error: `Internal Server Error ${error.message}` });
    }
  },

  userProfile: async (request, response) => {
    const userId = request.user;

    try {
      const user_data = await UserCollection.findOne(
        {
          _id: userId,
        },
        { Password: 0 }
      );

      if (user_data) {
        response.status(200).send(user_data);
      } else {
        response.status(404).send({ message: "User not found" });
      }
    } catch (error) {
      response
        .status(500)
        .json({ error: `Internal Server Error ${error.message}` });
    }
  },
};

// module.exports = {

//     Post_Register: async (request, response) => {
//         // response.render("login");
//         User_data = request.body;
//         if (request.body.password != request.body.cpassword) {

//             response.render("register", { error: 1, message: "Confirm Password is not same as Password" });

//         }
//         else {
//             Check_User_Already = await UserCollection.find({ Email_id: User_data.email });
//             if (Check_User_Already.length != 0) {
//                 response.render("register", { error: 1, message: "User with Email id Already Exist" });
//             }
//             else {
//                 const Hash_password = bcryptjs.hashSync(User_data.password, 10);
//                 const new_user = new UserCollection({
//                     Name: (User_data.name).trim(),
//                     Email_id: ((User_data.email).toLowerCase()).trim(),
//                     Password: (Hash_password).trim()
//                 });
//                 Result = await new_user.save();
//                 if (Result) {

//                     let Token_id=get_token(Result._id);
//                     // request.setcookie()
//                     response.cookie("ID",Token_id,{secure:true,httpOnly:true});
//                     const Today=new Date().toLocaleDateString()
//                     await UserCollection.updateOne({ _id: Result._id}, { $set: { LastActive: Today } });
//                     // response.redirect(`/otp_verification/${Result._id}`,);
//                     // response.redirect("/login");
//                     response.redirect(`/UserProfile/${Result._id}`);
//                 }
//                 else {
//                     response.redirect("/register");
//                 }
//             }
//         }
//     },
//     Get_login: (request, response) => {

//         response.render("login", { error: 0, message: null });
//     },
//     Post_login: async(request, response) => {
//         // response.render("login");
//         console.log(request.body);
//         Check_User_Already = await UserCollection.find({ Email_id: (request.body.email).toLowerCase()});
//         // response.send(Check_User_Already);
//         if(Check_User_Already.length==1){
//             const RealPassword=Check_User_Already[0].Password;
//             const CheckPassword=bcryptjs.compareSync(request.body.password,RealPassword);
//             console.log(CheckPassword);
//             if(CheckPassword){
//                 // response.send("User Exist");
//                 const Today=new Date().toLocaleDateString()

//                 let Token_id=get_token(Check_User_Already[0]._id);
//                 // request.setcookie()
//                 response.cookie("ID",Token_id,{secure:true,httpOnly:true});
//                 await UserCollection.updateOne({ _id: Check_User_Already[0]._id}, { $set: { LastActive: Today } });

//                  response.redirect(`/UserProfile/${Check_User_Already[0]._id}`);

//             }
//             else{
//                 response.render("login", { error: 1, message: "Entered Incorrect Password" });

//             }
//         }
//         else{
//             // response.send("User not Exist")
//             response.render("login", { error: 1, message: "User Doesnot Exist . Please Register" });

//         }

//     },
//     // OTP_Verification_get: async (request, response) => {

//     //     // response.send(request.params);

//     //     let random_number = ""
//     //     for (i = 0; i < 4; i++) {
//     //         random_number += Math.floor(Math.random() * 10);
//     //     }
//     //     OTP = {
//     //         user_id: request.params.user_id,
//     //         number: random_number
//     //     }

//     //     user_data = await UserCollection.find({ _id: request.params.user_id });
//     //     if (user_data[0].OTP == null && user_data[0].Verified==false) {
//     //         await UserCollection.updateOne({ _id: request.params.user_id }, { $set: { "OTP": random_number } });
//     //     }
//     //     user_data = await UserCollection.find({ _id: request.params.user_id });
//     //     // response.send(user_data);
//     //     response.render("otp_verification", { id: request.params.user_id });
//     //     // response.send(OTP);

//     // },
//     // OTP_Verification_post: async (request, response) => {
//     //     // response.send(request.params);

//     //     user_data = await UserCollection.find({ _id: request.params.user_id });
//     //     // response.send(user_data);
//     //     console.log(user_data[0].OTP, request.body.otp);
//     //     if (parseInt(user_data[0].OTP) == request.body.otp) {
//     //         // response.send("Verified");
//     //         await UserCollection.updateOne({ _id: request.params.user_id }, { $set: { "Verified": true } });
//     //         UserCollection.updateOne({ _id: request.params.user_id },{$unset:{"OTP":1}})

//     //         response.redirect(`/UserProfile/${request.params.user_id}`);

//     //       }
//     //     else {
//     //         response.send("NOOOOOOO")
//     //     }
//     //     // response.render("otp_verification",{id:request.params.user_id});
//     //     // response.send(OTP);

//     // },
//     // OTP_Verification_fail:async(request,response)=>{
//     //     // response.send(request.params.user_id);
//     //     await UserCollection.updateOne({ _id: request.params.user_id }, { $set: { "OTP": null } });
//     //     response.clearCookie("ID");
//     //     // response.render("login", { error: 1, message: "Verification Failed . Verify by Login " });
//     //     response.redirect("/logout")

//     // },
//     User_profile:async(request,response)=>{
//         // response.send(request.params.user_id);
//         user_data = await UserCollection.find({ _id: request.params.user_id });
//         // cons
//         response.render("UserProfile",{list:user_data})

//     },
//     Logout_User:async(request,response)=>{
//         response.clearCookie("ID");
//         response.redirect("/login");
//     }
// }
