import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs)
    })
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const addBlog = async event => {
    event.preventDefault()

    try {
      const addedBlog = await blogService.createBlog(
        {'title': newBlogTitle, 'author': newBlogAuthor, 'url': newBlogUrl}
      )
      setBlogs(blogs.concat(addedBlog))
      setNewBlogAuthor('')
      setNewBlogTitle('')
      setNewBlogUrl('')
    } catch {
      setErrorMessage('blog could not be created')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    return(
      <>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>
              username
              <input
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              password
              <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </div>
          <button type="submit">Login</button>
        </form>
      </>
    )
  }

  const blogForm = () => {
    return(
      <>
        <form onSubmit={addBlog}>
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
          <button type="submit">Create blog</button>
        </form>
      </>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>

      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.username} logged</p>
          <button onClick={handleLogout}>Logout</button>
          <h2>Create new blog</h2>
          {blogForm()}
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      )}
    </div>
  )
}

export default App