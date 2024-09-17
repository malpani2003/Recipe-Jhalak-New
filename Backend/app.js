require("dotenv").config();
const express = require("express");
const cookie_parser = require("cookie-parser");
const logger=require("morgan");
const compression=require("compression");

// const importModules=require("./ModuleImport");
const authroutes = require("./routes/authroutes");
const verificationroutes = require("./routes/verificationroutes");
const categoryroutes = require("./routes/categoryRoutes");
const foodRoutes = require("./routes/FoodRoutes");
const cors=require("cors")
// const port = process.env.PORT;

const app = express(); 
const port = 3001;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookie_parser());
app.use(express.json());
app.use(compression());
app.use(
  cors({
      origin: 'http://localhost:3000',
      optionsSuccessStatus: 200,
      credentials: true,
  })
); 

app.use(logger("dev"));

app.get("/api", (request, response) => {
  response.status(200).send({ message: "Recipe Jhalak API" });
});
app.use("/api/category", categoryroutes);
app.use("/api/food", foodRoutes);
app.use("/api/users", authroutes);
app.get("*", (request, response) => {
  response.status(404).send({ Error: "404 Error" });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

// app.get("/area", async (request, response) => {
//   // response.send("Area");
//   Food_data = await Item_Collection.find({});
//   Food_Area = [];
//   Food_data.forEach((ele) => {
//     console.log("Elemenet is", ele);
//     let Area = ele.Food_Area;
//     if (!Food_Area.includes(Area)) {
//       Food_Area.push(Area);
//     }
//   });
//   response.render("sort_area", { list: Food_Area });
//   // response.send(Food_Area);
// });

// app.get("/area/:country", async (request, response) => {
//   // response.send("Area");
//   Food_data = await Item_Collection.find({ Food_Area: request.params.country });
//   response.render("category_show", {
//     list: Food_data,
//     category: request.params.country,
//   });
// });
// app.get("/meal/:meal_id/like", async (request, response) => {
//   Food_id = request.params.meal_id;
//   Food_data = await Item_Collection.find({ Food_id: Food_id });
//   User_data = await UserCollection.find({ _id: response.locals.user._id });

//   Liked = Food_data[0].Like;
//   User_likes = User_data[0].LikedRecipe;
//   Found = 0;
//   Liked.forEach((key) => {
//     // console.log((response.locals.user._id).toString())
//     if (key === response.locals.user._id.toString()) {
//       Found = 1;
//     }
//   });
//   // console.log(Found)
//   if (Found == 0) {
//     Liked.push(response.locals.user._id.toString());
//     User_likes.push(Food_id);
//     await Item_Collection.updateOne(
//       { Food_id: Food_id },
//       { $set: { Like: Liked } }
//     );
//     await UserCollection.updateOne(
//       { _id: response.locals.user._id },
//       { $set: { LikedRecipe: User_likes } }
//     );
//   }
//   // response.send(Liked)
//   // response.send(response.locals.user);
//   response.redirect(`/meal/${Food_id}`);
// });

// app.get("/contact", (req, res) => {
//   res.render("contact");
// });
