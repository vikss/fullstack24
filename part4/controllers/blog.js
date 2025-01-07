
const logger = require('../utils/logger')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/api/blogs', (request, response) => {
  Blog.find({})
    .then(blogs => {
      logger.info('Blogs list ', blogs)
      response.json(blogs)
    })
})

blogRouter.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      logger.info('Posted a new blog')
      response.status(201).json(result)
    })
})

module.exports = blogRouter