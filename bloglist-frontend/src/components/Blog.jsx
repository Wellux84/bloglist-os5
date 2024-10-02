import { useState } from 'react'

const Blog = ({ blog }) => {
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
          <div>likes {blog.likes} <button>like</button></div>
          <div>added by {blog.user.name}</div>
        </div>
      )}
    </div>
  )
}

export default Blog