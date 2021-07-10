const Category = require("./category.model");

// get all categories
const getAllCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

// creates new category
const createCategory = (req, res) => {
  const category = new Category();
  category.category_name = req.body.name;
  category.save();
  res.json(category);
};

module.exports = {
  getAllCategories,
  createCategory,
};
