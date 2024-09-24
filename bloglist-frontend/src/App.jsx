import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs =>
      setBlogs( blogs ) )
    }
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (event) => {
    event.preventDefault()
    try {
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
  
    blogService
      .create(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
      })

    setMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
    setMessageType('success')
      
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  } catch (error) {
    setMessage('Error: failed to add blog')
    setMessageType('error')
      
    setTimeout(() => {
      setMessage(null)
    }, 5000)

  }
}

  const handleBlogChange = (event) => {
    setNewBlog(event.target.value)
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('wrong credentials')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogForm = () => (
    <form onSubmit={addBlog} >
    <div>
      Title:
       <input 
          value={newTitle}
          onChange={handleTitleChange}
       />
    </div>
    <div>
      Author:
       <input 
          value={newAuthor}
          onChange={handleAuthorChange}
       />
    </div>
    <div>
      Url:
       <input 
          value={newUrl}
          onChange={handleUrlChange}
       />
    </div>
    <div>
      <button type="submit">Create</button>
    </div>
  </form>
  )

  return (
  
    <div>
    <h1>Blogs</h1>
    <Notification message={message} type={messageType} />


    {!user && loginForm()}
    {user &&  <div>
       <p>{user.name} logged in <button onClick={() => window.localStorage.removeItem('loggedBlogappUser')}>log out</button></p>
       {blogForm()}
      </div>
      }

    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  </div>
  )
}

export default App