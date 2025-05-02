const totalLikes = (blogs) => {
  let sum = 0
  if (blogs) {
    blogs.forEach(blog => {
      sum += typeof blog.likes === 'number' ? blog.likes : 0
    })
  }

  return sum
}

module.exports = {
  totalLikes
}