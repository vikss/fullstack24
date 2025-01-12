
const logger = require('../utils/logger')
const phonebookRouter = require('express').Router()
const Entry = require('../models/entries')


phonebookRouter.post('/', (request, response, next) => {
  const body = request.body

  logger.info('Request body is ', request.body)
  let name = body.name
  let number = body.number
  let person = { name, number }
  let id
  logger.info(person)

  if (!name || !number) {
    response.status(400).json({ error: 'content is missing' })
  }
  Entry.find({ name: name }).then((res) => {
    logger.info('Matched entry id ', id)
    logger.info('No. of matches ', res.length)
    if (res.length === 0) {
      logger.info('Adding a new entry in the phonebook')
      const entry = new Entry({ ...person })
      entry
        .save()
        .then((res) => {
          logger.info(name, number)

          response.json(res)
        })
        .catch((error) => {
          logger.info(error.message)

          next(error)
        })
    } else {
      id = res[0].id

      logger.info('An entry by this name already exists')
      logger.info('Modifying it')

      const body = request.body

      const updatedDoc = { name: body.name, number: body.number }
      logger.info('Updated entry is ', updatedDoc)
      Entry.findByIdAndUpdate(id, updatedDoc, { new: true })
        .then((result) => {
          logger.info('Updated the number for this phonebook entry')
          logger.info('Result is ', result)
          response.json(result)
        })
        .catch((error) => next(error))
    }
  })
})
phonebookRouter.put('/:id', (request, response, next) => {
  const id = request.params.id
  const body = request.body

  const updatedDoc = { name: body.name, number: body.number }
  Entry.findByIdAndUpdate(id, updatedDoc, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((result) => {
      logger.info(result)
      response.json(result)
    })
    .catch((error) => next(error))
})
phonebookRouter.get('/', (request, response, next) => {
  logger.info('Trying to get all the phonebook entries')
  logger.info(Entry.find({}))
  Entry.find({})
    .then((persons) => {
      logger.info(persons)

      response.json(persons)
    })
    .catch((error) => {
      next(error)
    })
  //response.json(persons)
})
phonebookRouter.delete('/:id', (request, response, next) => {
  const id = request.params.id
  logger.info(`Id of the document to be deleted ${id}`)
  Entry.findByIdAndDelete(id)
    .then((res) => {
      logger.info('Delete document operation status: ', res)
      response.status(204).end()
    })
    .catch((error) => {
      next(error)
    })
})
phonebookRouter.get('/:id', (request, response, next) => {
  const id = request.params.id
  logger.info(`Id is ${id}`)
  Entry.findById(id)
    .then((res) => {
      logger.info('Person is ', res)
      if (res) response.json(res)
      else {
        response.status(404).end()
      }
    })
    .catch((error) => {
      next(error)
    })
})
phonebookRouter.get('/info', (request, response, next) => {
  let date = new Date()
  Entry.find({})
    .then((res) => {
      response.send(`<div>Phonebook has info for ${res.length} people
        <p>${date}</p>
        </div>`)
    })
    .catch((error) => {
      next(error)
    })
})

module.exports = phonebookRouter