require("dotenv").config();
const mongoose = require("mongoose");
const validator = require("validator");
mongoose.set("strictQuery", false);

const url = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/RecipeApp";

mongoose
  .connect(url)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => console.error("Database is not connected:", err.message));

const categorySchema = new mongoose.Schema(
  {
    Category_Name: {
      type: String,
      maxlength: 25,
      minlength: 5,
      required: true,
      unique: true,
      trim: true,
    },
    Category_Img: {
      type: String,
      required: true,
    },
    Category_Desc: {
      type: String,
      maxlength: 500,
    },
    TotalRecipe: {
      type: Number,
      default: 0,
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const foodSchema = new mongoose.Schema(
  {
    foodName: {
      type: String,
      maxlength: 25,
      minlength: 5,
      required: true,
      unique: true,
      trim: true,
    },
    foodImg: {
      type: String,
      required: true,
    },
    previewImg: {
      type: String,
      default:
        "https://media.istockphoto.com/id/168731372/photo/fresh-homemade-chocolate-brownie.jpg?s=612x612&w=0&k=20&c=DOWddwc5EBO7gedFIL7SC5absmtACBOefRRc8YLyh-w=",
    },
    foodCategoryId: {
      type:String,
      required: true
    },
    foodArea: String,
    foodDesc: [String],
    isDrink: Boolean,
    foodInstruction: [String],
    foodIngredients: [String],
    preparationTime: Number,
    cookingTime: Number,
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
    },
    comments: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
        },
        text: String,
        rating: {
          type: Number,
          min: 1,
          max: 5,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    likesUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    nutritionalInfo: {
      calories: Number,
      protein: Number,
      carbs: Number,
      fat: Number,
    },
    tags: [String],
    servings: Number,
  },
  {
    timestamps: true,
  }
);

const userSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      maxlength: 25,
      minlength: 5,
      required: true,
      trim: true,
    },
    Email_id: {
      type: String,
      maxlength: 50,
      minlength: 5,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Incorrect Format of Email-Id"],
      validate: {
        validator: function (v) {
          return validator.isEmail(v);
        },
        message: "Please Enter Correct Email-ID",
      },
    },
    Password: {
      type: String,
      minlength: 8,
      required: true,
      match: [
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/,
        "Please Password Strength",
      ],
    },
    LikedRecipe: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "items",
      },
    ],
    TotalComments: {
      type: Number,
      default: 0,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    Verified: {
      type: Boolean,
      default: false,
    },
    Bio: {
      type: String,
      maxlength: 200,
    }
  },
  {
    timestamps: true,
  }
);

const userVerificationSchema = new mongoose.Schema({
  userId: {
    type:String,
    required: true,
  },
  verificationString: {
    type: String,
    unique: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "24h"
  },
});

const categories = mongoose.model("categories", categorySchema);
const items = mongoose.model("items", foodSchema);
const users = mongoose.model("users", userSchema);
const verification = mongoose.model("verification", userVerificationSchema);

module.exports = {
  categories: categories,
  items: items,
  users: users,
  verification: verification,
};
