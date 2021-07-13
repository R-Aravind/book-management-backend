const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const categoryRouter = require("./resources/category/category.router");
const productRouter = require("./resources/product/product.router");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

app.use(allowCrossDomain);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger
app.use(morgan("dev"));

// Routes
app.use("/api/product/", productRouter);
app.use("/api/category/", categoryRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("server listening");
    app.listen(port);
  })
  .catch((err) => console.log(err));
