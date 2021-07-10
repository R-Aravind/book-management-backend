const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const categoryRouter = require("./resources/category/category.router");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger
app.use(morgan("dev"));

// Routes
app.use("/api/category/", categoryRouter);

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
