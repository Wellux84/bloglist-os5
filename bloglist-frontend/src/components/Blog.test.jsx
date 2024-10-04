import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Blog from './Blog'
import BlogForm from './BlogForm'

// Teshtävät 5.13 ja 5.14 
test('renders first only title & author, then after view button clicked show all', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 5,
    user: {
      username: 'testuser',
      name: 'Test User',
    },
  }

  const { container } = render(<Blog blog={blog} />)

  expect(container).toHaveTextContent('Test Blog')
  expect(container).toHaveTextContent('Test Author')
  expect(container).not.toHaveTextContent('http://testurl.com')
  expect(container).not.toHaveTextContent('5')
  expect(container).not.toHaveTextContent('Test User')

  const button = screen.getByText('view')
  fireEvent.click(button)

  expect(container).toHaveTextContent('http://testurl.com')
  expect(container).toHaveTextContent('5')
  expect(container).toHaveTextContent('Test User')

})


test('if like button is clicked twice, the event handler is called twice', async () => {
    const blog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://testurl.com',
      likes: 5,
      user: {
        username: 'testuser',
        name: 'Test User',
      },
    }
  
  const mockHandler = vi.fn()
  render(<Blog blog={blog} handleLike={mockHandler} />)

  const button = screen.getByText('view')
    fireEvent.click(button)

  const user = userEvent.setup()
  const likebutton = screen.getByText('like')
  await user.click(likebutton)
  await user.click(likebutton)

  expect(blog.likes === 7)
})


test('test blogform', () => {
    const addBlog = vi.fn() 
  
    render(<BlogForm addBlog={addBlog} />)

    const button = screen.getByText('Create New')
    fireEvent.click(button)
    
    const titleInput = screen.getByPlaceholderText('Title')
    const authorInput = screen.getByPlaceholderText('Author')
    const urlInput = screen.getByPlaceholderText('Url')
    const submitbutton= screen.getByText('Create')

    userEvent.type(titleInput, 'Test Title')
    userEvent.type(authorInput, 'Test Author')
    userEvent.type(urlInput, 'http://testurl.com')
  
    userEvent.click(submitbutton)
  
    expect(addBlog.title === 'Test Title')
    expect(addBlog.author === 'Test Author')
    expect(addBlog.url === 'http://testurl.com')
})
