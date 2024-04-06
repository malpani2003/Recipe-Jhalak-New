const mongoose = require("mongoose");
const validator=require("validator");
mongoose.set("strictQuery", false);

<<<<<<< HEAD
const url = "mongodb://127.0.0.1:27017/RecipeApp";
// console.log("hi");
=======
const url="mongodb://localhost:27017/RecipeApp"
// const url = "mongodb+srv://pranavmaheshwari123:DWmyNYsOIlTP9jaU@cluster0.vzvevlk.mongodb.net/RecipeApp";
>>>>>>> 820f384966f394e8bd3fc1222f50c76a79fad409
mongoose
  .connect(url)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => console.error("Database is not connected:", err.message));

const categorySchema = new mongoose.Schema({
  Category_Name: {
    type: String,
    maxlength: 25,
    minlength: 5,
    required: true,
    unique: true,
  },
  Category_Img: String,
  Category_Desc: String,
},{
  timestamps:true
});

const foodSchema = new mongoose.Schema({
  foodName: {
    type: String,
    maxlength: 25,
    minlength: 5,
    required: true,
    unique: true,
  },
  foodImg: String,
  previewImg: {
    type: String,
    default:
      "https://media.istockphoto.com/id/168731372/photo/fresh-homemade-chocolate-brownie.jpg?s=612x612&w=0&k=20&c=DOWddwc5EBO7gedFIL7SC5absmtACBOefRRc8YLyh-w=",
  },
  foodCategoryId: String,
  foodArea: String,
  foodDesc:[String],
  isDrink: Boolean,
  foodInstruction: [String],
  foodIngredients: [String],
  preparationTime: Number,
  cookingTime: Number,
  difficulty: String,
  comments: {
    type: [Object],
    default: [],
  },
  likesUsers: {
    type: [String],
    default: [],
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}); 

const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    maxlength: 25,
    minlength: 5,
    required: true,
  },
  Email_id: {
    type: String,
    maxlength: 50,
    minlength: 5,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/,"Incorrect Format of Email-Id"], // Simple email format validation
    validate:{
      validator:function(v){
        return validator.isEmail(v);
      },
      message:"Please Enter Correct Email-ID"
    }
  }, 
  Password: {
    type: String,
    minlength: 8,
    required: true,
    match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/,"Please Password Strength"], // Password complexity: at least one digit, one lowercase and one uppercase letter, one special character
  },
  LikedRecipe: {
    type: [String],
    default: [],
  },
  TotalComments: {
    type: Number,
    default: 0,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
},{
  timestamps:true
});

const categories = mongoose.model("categories", categorySchema);
const items = mongoose.model("items", foodSchema);
const users = mongoose.model("users", userSchema);

module.exports = {
  categories: categories,
  items: items,
  users: users,
};
