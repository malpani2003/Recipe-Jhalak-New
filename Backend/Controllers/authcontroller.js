require("dotenv").config();
const UserCollection = require("../models/database").users;
const Verification = require("../models/database").verification;

const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require('uuid');
const secretId = process.env.SECERTKEY || "RecipeDekh";
const expiresIn = 1;

const transportar = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS
  }
})
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

  // Email content
  const emailContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
</head>
<body>
    <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2>Email Verification</h2>
        <p>Dear, {{Name}}</p>
        <p>Thank you for Registering with RecipeJhalak . To Complete registration Please click the following link to verify your email address:</p>
        <p><a href="http://localhost:3001/api/users/verify-email/{{id}}/{{verificationToken}}" target="_blank">Verify Email</a></p>
        <p>Once your Account is Verified you can access any recipe on our Platform</p>
        <p>If you did not request this, please ignore this email.</p>
        <p>Thank you,</p>
        <p>Recipe Jhalak</p>
    </div>
</body>
</html>
`;
  const uniqueString = uuidv4() + _id;

  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: Email_id, // receiver
    subject: "Recipe Jhalak - Verification Link", // Subject line
    html: emailContent.replace('{{Name}}', Name).replace('{{verificationToken}}', uniqueString).replace('{{id}}', _id)
  }

  const hashUniqueString = await bcryptjs.hash(uniqueString, 10);
  const newVerificationData = new Verification({
    userId: _id,
    verificationString: hashUniqueString,
    createdAt: Date.now(),
    expiresAt: Date.now() + 1000 * 60 * 5
  })
  const result = await newVerificationData.save();
  if (!result) {
    console.log("Verifcation Link cannot be not send")
    return false;
  }
  transportar.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("Verification link is not send");
      return false;
    }
    else {
      console.log("Verification Link is send: ", info)
      return true;
    }
  })
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
      return response.status(400).send({ error: true, message: "User cannot be Registered" });
    }
    console.log(result)
    const isVerificationLinkSent = await sendVerificationEmail(result);
    console.log(isVerificationLinkSent)
    const tokenId = getToken(result._id);
    console.log(tokenId)
    response.header("Auth", tokenId);

    const successMessage = isVerificationLinkSent ? "Registration Completed, Verification Link Sent on Email" : "Registration Completed";
    return response.status(201).send({
      error: false,
      message: successMessage,
      token: authToken,
    });
  }
  catch (error) {
    return response
      .status(500)
      .json({ error: true, message: `Internal Server Error as ${error.message}` });
  }
}

const postLogin = async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(422).send({ error: true, message: "Please Entered Correct Details" });
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
    response.cookie('Token', tokenId, { path: "/", expiresIn: new Date(Date.now() + 1000 * 60 * 60 * 24), sameSite: "lax", httpOnly: true });
    response.header("Authorization", `Bearer ${tokenId}`);
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
}

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
      console.log(user_data)
      return response.status(200).send({ error: false, message: user_data });
    }
    return response.status(404).send({ error: true, message: "User not found" });
  } catch (error) {
    return response
      .status(500)
      .json({ error: true, message: `Internal Server Error ${error.message}` });
  }
}
module.exports = {
  registerUser,
  postLogin,
  userProfile
}
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
