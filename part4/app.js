const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blog')
const config = require('./utils/config')



const mongoUrl = config.URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.use(blogRouter)


module.exports = app

