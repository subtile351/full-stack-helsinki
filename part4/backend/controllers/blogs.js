const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('creator', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (!blog.likes) {
    blog.likes = 0
  }

  if (!blog.title || !blog.url) {
    response.status(400).end()
  }

  const creator = await User.findOne()

  if (!creator) {
    return response.status(400).json({ error: 'user not found' })
  }

  blog.creator = creator._id

  const result = await blog.save()

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

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter