const express = require("express");
const productController = require("./product.controller");

const productRouter = express.Router();

productRouter.get("/", productController.getAllProducts);
productRouter.post("/", productController.createProduct);
productRouter.put("/:id", productController.updateProduct);
productRouter.delete("/:id", productController.deleteProduct);
productRouter.get("/categories/:id", productController.getByCategory);

module.exports = productRouter;
