const express = require("express");
const productController = require("./product.controller");
const Multer = require("multer");

const multer = Multer({
  storage: Multer.memoryStorage(),
});

const productRouter = express.Router({ mergeParams: true });

productRouter.get("/", productController.getAllProducts);

productRouter.get("/:id", productController.getByCategory);

productRouter.post(
  "/",
  multer.array("images"),
  productController.createProduct
);

productRouter.put("/", multer.array("images"), productController.updateProduct);

productRouter.delete("/", multer.fields([]), productController.deleteProduct);

module.exports = productRouter;
