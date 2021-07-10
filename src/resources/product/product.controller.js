const Product = require("./product.model");
const Category = require("../category/category.model");
const {
  initBucket,
  uploadMultiple,
  deleteImages,
} = require("../../util/storage");

var bucket = initBucket();

// get all products
const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// returns products of a category
const getByCategory = async (req, res) => {
  const category = await Category.findOne({ category_name: req.body.category });
  const products = await Product.find({ item_category: category.id });
  res.json(products);
};

// creates new product
const createProduct = async (req, res) => {
  const product = new Product();
  const fileLinks = await uploadMultiple(bucket, product.id, req.files);
  const category = await Category.findOne({ category_name: req.body.category });

  product.item_type = req.body.type;
  product.item_name = req.body.name;
  product.item_code = req.body.code;
  product.item_description = req.body.description;
  product.item_images = fileLinks;
  product.item_category = category.id;
  product.from_inventory = req.body.from_inventory;
  product.unit = req.body.unit;
  product.opening_stock = req.body.opening_stock;
  product.as_of_date = req.body.as_of_date;
  product.pricing_purchase_price = req.body.purchase_price;
  product.gst_tax_rate = req.body.gst_tax_rate;
  product.inclusive_of_tax = req.body.inclusive_of_tax;
  product.save();

  await Category.findByIdAndUpdate(product.item_category, {
    $inc: { products_count: 1 },
  });

  res.json(product);
};

// TODO: update product
const updateProduct = (req, res) => {};

// deletes a product
const deleteProduct = async (req, res) => {
  product = await Product.findOneAndDelete({ _id: req.body.id });
  await Category.findByIdAndUpdate(product.item_category, {
    $inc: { products_count: -1 },
  });
  deleteImages(bucket, `${product.id}`);
  res.json({ message: "product is deleted" });
};

module.exports = {
  getAllProducts,
  getByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
};
