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

module.exports = {
  getAllCategories,
  createCategory,
};
