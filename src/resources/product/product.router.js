const express = require("express");
const productController = require("./product.controller");
const Multer = require("multer");

const multer = Multer({
  storage: Multer.memoryStorage(),
});

const productRouter = express.Router();

productRouter.get("/", productController.getAllProducts);

productRouter.post(
  "/",
  multer.array("images"),
  productController.createProduct
);

productRouter.put("/", multer.array("images"), productController.updateProduct);

productRouter.delete("/", multer.fields([]), productController.deleteProduct);

productRouter.post(
  "/categories",
  multer.fields([]),
  productController.getByCategory
);

module.exports = productRouter;
