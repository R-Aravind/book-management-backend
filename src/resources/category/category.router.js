const express = require("express");
const categoryController = require("./category.controllers");
const Multer = require("multer");

const multer = Multer({
  storage: Multer.memoryStorage(),
});

const categoryRouter = express.Router();

categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.post("/", multer.fields([]), categoryController.createCategory);
categoryRouter.delete(
  "/",
  multer.fields([]),
  categoryController.deleteCategory
);

module.exports = categoryRouter;
