const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

// Environmental variables config
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

const dbURI = process.env.DB_URL
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(port))
    .catch((err) => console.log(err))

// Logger
app.use(morgan('dev'))

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})

