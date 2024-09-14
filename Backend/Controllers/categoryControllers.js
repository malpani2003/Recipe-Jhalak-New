const Category_Collection = require("../models/database").categories;
const Item_Collection = require("../models/database").items;

const addCategory = async (request, response) => {
  try {
    const { Category_nm, Category_img, Category_desc } = request.body;

    if (!Category_nm || !Category_img || !Category_desc) {
      return response.status(400).json({ error: "All fields are required." });
    }
    const newCategory = new Category_Collection({
      Category_Name: Category_nm.trim(),
      Category_Img: Category_img.trim(),
      Category_Desc: Category_desc.trim(),
    });

    const savedCategory = await newCategory.save();

    response.status(201).json(savedCategory);
  } catch (error) {
    return response
      .status(500)
      .json({ error: `Failed to add category: ${error.message}` });
  }
};

const getAllCategory = async (request, response) => {
  try {
    let allCategories;
    // console.log(request)
    if (request.query && request.query["item"]) {
      const itemNameRegex = new RegExp(request.query["item"], "i");
      allCategories = await Category_Collection.find(
        { name: itemNameRegex },
        { Category_Name: 1, Category_Img: 1, TotalRecipe: 1 }
      );
    } else {
      allCategories = await Category_Collection.find(
        {},
        { Category_Name: 1, Category_Img: 1, TotalRecipe: 1 }
      );
    }

    // console.log(allCategories);
    return response.status(200).json(allCategories || []);
  } catch (error) {
    return response
      .status(500)
      .json({ error: `Internal Server Error ${error.message}` });
  }
};
const getFoodForCategory = async (request, response) => {
  try {
    const categoryId = request.params.category_id.trim();
    const pageNum = request.query.pageNum.trim();
    // GET /api/category/food/66c89de4a7bd26d66142db62?pageNum=1&difficulty=Easy&time=15&country=USA
    const difficulty = request.query.difficulty.trim();
    const country = request.query.country.trim();
    const time = request.query.time;
    // console.log(pageNum)
    const categoryData = await Category_Collection.findById(categoryId);

    if (!categoryData) {
      return response.status(404).json({ error: "Category not found" });
    }

    const skip = (pageNum - 1) * 6;
    const categoryName = categoryData.Category_Name;
    const filterQuery = { foodCategoryId: categoryId };
    if (difficulty) {
      filterQuery.difficulty = difficulty;
    }

    if (country) {
      filterQuery.foodArea = country;
    }

    const totalLength = await Item_Collection.countDocuments(filterQuery);
    const categoryFoodItems = await Item_Collection.find(filterQuery, {
      foodName: 1,
      foodImg: 1,
    })
      .limit(6)
      .skip(skip);

    const jsonData = {
      categoryName: categoryName,
      totalFoodItem: totalLength,
      foodList: categoryFoodItems,
    };

    response.status(200).json(jsonData);
  } catch (error) {
    return response
      .status(500)
      .json({ error: `Internal Server Error ${error.message}` });
  }
};
const incrementVisitCount = async (req, res) => {
  const { categoryID } = req.params;

  try {
    // Increment the visit count by 1
    console.log("Hi", categoryID);
    const category = await Category_Collection.findByIdAndUpdate(
      categoryID,
      { $inc: { visitorCount: 1 } }, // increment visitCount field
      { new: true }
    );
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Visit count incremented", category });
  } catch (error) {
    res.status(500).json({ message: "Error incrementing visit count", error });
  }
};

const popularCategory = async (req, res) => {
  try {
    const categories = await Category_Collection.find(
      {},
      { Category_Img: 1, Category_Name: 1 }
    )
      .sort({ visitorCount: -1 })
      .limit(6);
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching popular categories:", error);
    res.status(500).json({ message: "Error fetching popular categories" });
  }
};

module.exports = {
  addCategory,
  getFoodForCategory,
  getAllCategory,
  incrementVisitCount,
  popularCategory,
  updateCategory: async (request, response) => {
    try {
      const categoryId = request.params.category_id.trim();
      const { Category_nm, Category_img, Category_desc } = request.body;

      const category = await Category_Collection.findById(categoryId);
      if (!category) {
        return response.status(404).json({ error: "Category not found" });
      }

      category.Category_Name = Category_nm.trim();
      category.Category_Img = Category_img.trim();
      category.Category_Desc = Category_desc.trim();

      const updatedCategory = await category.save();
      response.status(200).json(updatedCategory);
    } catch (error) {
      response
        .status(500)
        .json({ error: `Failed to update category: ${error.message}` });
    }
  },
  deleteCategory: async (request, response) => {
    try {
      const categoryId = request.params.category_id.trim();

      const category = await Category_Collection.findById(categoryId);
      if (!category) {
        return response.status(404).json({ error: "Category not found" });
      }

      await category.remove();
      response.status(204).send();
    } catch (error) {
      response
        .status(500)
        .json({ error: `Failed to delete category: ${error.message}` });
    }
  },
};
