const Product = require("./product.model");
const Category = require("../category/category.model");
const {
  initBucket,
  uploadMultiple,
  deleteImages,
} = require("../../util/storage");

var bucket = initBucket();

// get all products
const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

// returns products of a category
const getByCategory = async (req, res, next) => {
  try {
    const category = await Category.findOne({ category_name: req.params.id });
    const products = await Product.find({ item_category: category.id });
    res.json(products);
  } catch (err) {
    next(err);
  }
};

// creates new product
const createProduct = async (req, res, next) => {
  try {
    const product = new Product();
    var fileLinks = [];
    if (req.files) {
      fileLinks = await uploadMultiple(bucket, product.id, req.files);
    }
    const category = await Category.findOne({
      category_name: req.body.category,
    });

    product.item_type = req.body.type;
    product.item_name = req.body.name;
    product.item_code = req.body.code;
    product.item_description = req.body.description;
    product.item_images = fileLinks;
    product.item_category = category.id;
    product.item_category_name = category.category_name;
    product.from_inventory = req.body.from_inventory;
    product.unit = req.body.unit;
    product.opening_stock = req.body.opening_stock;
    product.as_of_date = req.body.as_of_date;
    product.pricing_purchase_price = req.body.purchase_price;
    product.gst_tax_rate = req.body.gst_tax_rate;
    product.inclusive_of_tax = req.body.inclusive_of_tax;
    product.low_stock_warning = req.body.low_stock_warning;

    product
      .save()
      .then(() => res.json(product))
      .catch((err) => next(err));

    await Category.findByIdAndUpdate(product.item_category, {
      $inc: { products_count: 1 },
    });

    res.json(product);
  } catch (err) {
    next(err);
  }
};

// updates product
const updateProduct = async (req, res, next) => {
  try {
    deleteImages(bucket, `${req.body.id}`);
    var fileLinks = [];
    if (req.files) {
      fileLinks = await uploadMultiple(bucket, req.body.id, req.files);
    }
    const category = await Category.findOne({
      category_name: req.body.category,
    });

    product = await Product.findOne({ _id: req.body.id });
    if (product.item_category != category.id) {
      await Category.findByIdAndUpdate(category.id, {
        $inc: { products_count: 1 },
      });
      await Category.findByIdAndUpdate(product.item_category, {
        $inc: { products_count: -1 },
      });
    }

    product.item_type = req.body.type;
    product.item_name = req.body.name;
    product.item_code = req.body.code;
    product.item_description = req.body.description;
    product.item_images = fileLinks;
    product.item_category = category.id;
    product.item_category_name = category.category_name;
    product.from_inventory = req.body.from_inventory;
    product.unit = req.body.unit;
    product.opening_stock = req.body.opening_stock;
    product.as_of_date = req.body.as_of_date;
    product.pricing_purchase_price = req.body.purchase_price;
    product.gst_tax_rate = req.body.gst_tax_rate;
    product.inclusive_of_tax = req.body.inclusive_of_tax;
    product.low_stock_warning = req.body.low_stock_warning;

    product
      .save()
      .then(() => res.json(product))
      .catch((err) => next(err));

    res.json(product);
  } catch (err) {
    next(err);
  }
};

// deletes a product
const deleteProduct = async (req, res, next) => {
  try {
    product = await Product.findOneAndDelete({ _id: req.body.id });
    await Category.findByIdAndUpdate(product.item_category, {
      $inc: { products_count: -1 },
    });
    deleteImages(bucket, `${product.id}`);
    res.json({ message: "product is deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllProducts,
  getByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
};
