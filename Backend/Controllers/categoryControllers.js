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
}

const getAllCategory = async (request, response) => {
  try {
    const allCategories = await Category_Collection.find();
    console.log(allCategories)
    return response.status(200).json(allCategories);
  } catch (error) {
    return response
      .status(500) 
      .json({ error: `Internal Server Error ${error.message}` });
  }
}
const getFoodForCategory = async (request, response) => {
  try {
    const categoryId = request.params.category_id.trim();
    const pageNum = request.query.pageNum.trim();
    console.log(pageNum)
    const categoryData = await Category_Collection.findById(categoryId);

    if (!categoryData) {
      return response.status(404).json({ error: "Category not found" });
    }

    const skip = (pageNum - 1) * 6;
    const categoryName = categoryData.Category_Name;

    const totalLength = await Item_Collection.countDocuments({ foodCategoryId: categoryId });

    const categoryFoodItems = await Item_Collection.find({
      foodCategoryId: categoryId,
    }, { foodName: 1, previewImg: 1, foodImg: 1 }).limit(6).skip(skip);

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
}
module.exports = {
  addCategory,
  getFoodForCategory,
  getAllCategory,
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
