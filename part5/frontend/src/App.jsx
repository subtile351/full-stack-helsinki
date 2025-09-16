import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Toggable from './components/Toggable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

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

  const handleLogin = async (event) => {
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
      setMessage(`Hello, ${user.name}!`)
      setMessageType('success')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 5000)
    } catch {
      setMessage('wrong credentials')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
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
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(addedBlog))
      setNewBlogAuthor('')
      setNewBlogTitle('')
      setNewBlogUrl('')
      setMessage('Blog was successfully created')
      setMessageType('success')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 5000)
    } catch {
      setMessage('blog could not be created')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    return (
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    )
  }

  const blogFormRef = useRef()

  const blogForm = () => {
    return(
      <>
        <Toggable buttonLabel='Create blog' ref={blogFormRef}>
          <BlogForm
            newBlogTitle={newBlogTitle}  
            newBlogAuthor={newBlogAuthor}
            newBlogUrl={newBlogUrl}
            handleTitleChange={({ target }) => setNewBlogTitle(target.value)}
            handleAuthorChange={({ target }) => setNewBlogAuthor(target.value)}
            handleUrlChange={({ target }) => setNewBlogUrl(target.value)}
            addBlog={addBlog}
          />
        </Toggable>
      </>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>

      <Notification
        message = {message}
        type = {messageType}
      />
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