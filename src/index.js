const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

// Environmental variables config
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Database Config
const dbURI = process.env.DB_URL;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("server listening");
    app.listen(port);
  })
  .catch((err) => console.log(err));

// Logger
app.use(morgan("dev"));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});
