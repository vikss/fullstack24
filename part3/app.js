const logger = require('./utils/logger')
const express = require('express')
const cors = require('cors')
const phonebookRouter = require('./controllers/phonebook')
const middleware = require('./utils/middleware')
const config = require('./utils/config')



const mongoose = require('mongoose')

mongoose.set('strictQuery', false)


console.log(`Connecting to ${config.URI}`)
mongoose
  .connect(config.URI)
  .then(() => {
    console.log('Connection to MongoDB was a success')
  })
  .catch((error) => console.log(error.message))

const app = express()
app.use(cors())
app.use(express.static('dist'))


logger.info('Fire your queries!')


app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/persons', phonebookRouter)





// handler of requests with unknown endpoint
app.use(middleware.unknownEndpoint)



// handler of requests with result to errors
app.use(middleware.errorHandler)

module.exports = app