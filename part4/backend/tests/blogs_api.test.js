const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const Blog = require('../models/blog')
const blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 3
  }
]

const newCompleteBlog = {
  title: 'Understanding JavaScript Closures',
  author: 'Kyle Simpson',
  url: 'https://github.com/getify/You-Dont-Know-JS',
  likes: 10
}

const newBlogNoLikes = {
  title: 'Understanding JavaScript Closures',
  author: 'Kyle Simpson',
  url: 'https://github.com/getify/You-Dont-Know-JS'
}

const newBlogNoTitle = {
  author: 'Kyle Simpson',
  url: 'https://github.com/getify/You-Dont-Know-JS',
  likes: 10
}

const newBlogNoUrl = {
  title: 'Understanding JavaScript Closures',
  author: 'Kyle Simpson',
  likes: 10
}

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
})

describe('when existing blgos are requested', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, initialBlogs.length)
  })

  test('unique id of a specific blog is named correctly', async () => {
    const response = await api.get('/api/blogs')
    const specificBlog = response.body[0]

    assert.ok(specificBlog.id, 'specific blog has id property')
    assert.strictEqual(blog._id, undefined, '_id property does not exist')
  })
})

describe('when new blogs are created', () => {
  test('new complete blog is created correctly', async () => {
    const postResponse = await api
      .post('/api/blogs')
      .send(newCompleteBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(postResponse.body.title, newCompleteBlog.title, 'title saved correclty')
    assert.strictEqual(postResponse.body.author, newCompleteBlog.author, 'author saved correclty')
    assert.strictEqual(postResponse.body.url, newCompleteBlog.url, 'url saved correclty')
    assert.strictEqual(postResponse.body.likes, newCompleteBlog.likes, 'likes saved correclty')

    const getResponse = await api.get('/api/blogs')
    assert.strictEqual(getResponse.body.length, initialBlogs.length + 1, 'new blog increases the size of the collection by one')
  })

  test('new blog without likes is created correctly', async () => {
    const response = await api
      .post('/api/blogs')
      .send(newBlogNoLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, 0, 'blogs without likes automatically defaults to zero likes')
  })

  test('new blog without title is handled correctly', async () => {
    await api
      .post('/api/blogs')
      .send(newBlogNoTitle)
      .expect(400)
  })

  test('new blog without url is handled correctly', async () => {
    await api
      .post('/api/blogs')
      .send(newBlogNoUrl)
      .expect(400)
  })
})

after(async () => {
  await mongoose.connection.close()
})