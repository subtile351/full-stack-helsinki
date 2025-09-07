const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('creator', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const blog = new Blog(request.body)

  const creatorId = response.userId

  if (!blog.likes) {
    blog.likes = 0
  }

  if (!blog.title || !blog.url) {
    response.status(400).end()
  }

  blog.creator = creatorId

  const result = await blog.save()

  const creator = await User.findById(creatorId)

  creator.blogs = creator.blogs.concat(result._id)
  await creator.save()

  response.status(201).json(result).end()

})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  try {
    const result = await Blog.findOneAndUpdate(
      { '_id': request.params.id },
      { $set: { likes: body.likes } },
      { new: true }
    )
    response.status(200).json(result).end()
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)

    const userId = response.userId

    if (userId !== blog.creator._id.toString()) {
      return response.status(401).json({ error: 'user is not allowed to delete blog' })
    }

    await Blog.findByIdAndDelete(request.params.id)

    response.status(204).end()
    
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter