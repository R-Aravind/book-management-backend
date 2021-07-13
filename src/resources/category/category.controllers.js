const Category = require("./category.model");

// get all categories
const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

// creates new category
const createCategory = (req, res, next) => {
  try {
    const category = new Category();
    category.category_name = req.body.name;
    category
      .save()
      .then(() => res.json(category))
      .catch((err) => next(err));
  } catch (err) {
    next(err);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    product = await Category.findOneAndDelete({ name: req.body.name });
    res.json({ message: "category is deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  deleteCategory,
};
