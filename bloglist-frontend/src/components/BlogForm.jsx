import { useState } from 'react'
import blogService from '../services/blogs'
import Notification from '../components/Notification'

const BlogForm = ({blogs, setBlogs}) => {

    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')
    const [blogFormVisible, setBlogFormVisible] = useState(false)
    const [message, setMessage] = useState(null)
    const [messageType, setMessageType] = useState(null)

    const handleTitleChange = (event) => {
      setNewTitle(event.target.value)
    }
  
    const handleAuthorChange = (event) => {
      setNewAuthor(event.target.value)
    }
  
    const handleUrlChange = (event) => {
      setNewUrl(event.target.value)
    }

    const addBlog = (event) => {
      blogForm.preventDefault()
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
          setBlogFormVisible(false)
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

  
    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
    const showWhenVisible = { display: blogFormVisible ? '' : 'none' }
    
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogFormVisible(true)}>Create New</button>
        </div>
        <div style={showWhenVisible}>
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
    <button onClick={() => setBlogFormVisible(false)}>cancel</button>
    </div>
    </div>
    )
  }

 


  export default BlogForm