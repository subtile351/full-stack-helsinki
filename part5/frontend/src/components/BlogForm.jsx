import { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const submitBlog = (event) => {
    event.preventDefault()

    const newBlog = {title: newBlogTitle, author: newBlogAuthor, url: newBlogUrl}

    addBlog(newBlog)
    setNewBlogAuthor('')
    setNewBlogTitle('')
    setNewBlogUrl('')
  }

  return(
    <>
      <form onSubmit={submitBlog}>
        <div>
          <label>
            Title:
            <input value={newBlogTitle} onChange={({ target }) => setNewBlogTitle(target.value)} />
          </label>
        </div>
        <div>
          <label>
            Author:
            <input value={newBlogAuthor} onChange={({ target }) => setNewBlogAuthor(target.value)} />
          </label>
        </div>
        <div>
          <label>
            URL:
            <input value={newBlogUrl} onChange={({ target }) => setNewBlogUrl(target.value)} />
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
    </>
  )
}

export default BlogForm