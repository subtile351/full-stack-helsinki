const totalLikes = (blogs) => {
  let sum = 0
  if (blogs) {
    blogs.forEach(blog => {
      sum += typeof blog.likes === 'number' ? blog.likes : 0
    })
  }

  return sum
}

const favoriteBlog = (blogs) => {
  let maxLikes = 0
  let maxBlog = null
  if (blogs) {
    blogs.forEach(blog => {
      if (blog.likes > maxLikes) {
        maxLikes = blog.likes
        maxBlog = blog
      }
    })
  }

  return maxBlog
}

const mostBlogs = (blogs) => {
  let authors = {}
  let maxBlogsAuthor = null
  if (blogs && blogs.length > 0) {
    blogs.forEach(blog => {
      if (authors[blog.author]) {
        authors[blog.author] += 1
      } else {
        authors[blog.author] = 1
      }
    })

    maxBlogsAuthor = Object.entries(authors).reduce(
      (currMaxAuthor, [author, blogs]) => blogs > currMaxAuthor.blogs ? { author, blogs } : currMaxAuthor,
      { author: null, blogs: 0 }
    )
  }

  return maxBlogsAuthor
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs
}