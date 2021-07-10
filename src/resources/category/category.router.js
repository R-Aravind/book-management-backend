const express = require("express");
const categoryController = require("./category.controllers");

const categoryRouter = express.Router();

categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.post("/", categoryController.createCategory);

module.exports = categoryRouter;
