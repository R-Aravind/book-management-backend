const express = require("express");
const categoryController = require("./category.controllers");

const categoryRouter = express.Router();

categoryRouter.get("/", categoryController.getAll);
categoryRouter.post("/", categoryController.create);

module.exports = categoryRouter;
