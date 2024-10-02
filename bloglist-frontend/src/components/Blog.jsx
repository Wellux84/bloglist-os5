import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlog }) => {
  const [showAll, setShowAll] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const toggleAll = () => {
    setShowAll(!showAll)
  };

  const handleLike = async () => {
    const updatedBlog = {
      ...blog, 
      likes: blog.likes + 1,
      user: blog.user.id
    };

    try {
      const returnedBlog = await blogService.update(blog.id, updatedBlog)
      updateBlog(returnedBlog)
    } catch (error) {
      console.error('Error liking the blog:', error)
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleAll}>
          {showAll ? 'hide' : 'view'}
        </button>
      </div>
      {showAll && (
        <div>
          <div>{blog.url}</div>
          <div>likes {blog.likes} <button onClick={handleLike} >like</button></div>
          <div>added by {blog.user.name}</div>
        </div>
      )}
    </div>
  )
}

export default Blog