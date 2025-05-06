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

module.exports = {
  totalLikes,
  favoriteBlog
}