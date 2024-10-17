require("dotenv").config();
const express = require("express");
const cookie_parser = require("cookie-parser");
const logger=require("morgan");
const compression=require("compression");

const authroutes = require("./routes/authroutes");
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
    origin: 'https://recipe-jhalak.netlify.app',
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    optionsSuccessStatus: 200,
  })
);

// app.use(
//   cors({ 
//     origin: 'http://localhost:3000', 
//     credentials: true, 
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],  
//     allowedHeaders: ['Content-Type', 'Authorization'], 
//     optionsSuccessStatus: 200,  
//   })
// );

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
