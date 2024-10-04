const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:3003')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('login')
    await expect(locator).toBeVisible()
})

describe('Login', () => {
  test('succeeds with correct credentials', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click()
    await page.getByRole('textbox').first().fill('mluukkai')
    await page.getByRole('textbox').last().fill('salainen')
    await page.getByRole('button', { name: 'login' }).click()
      
    await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
  })
    

  test('fails with wrong credentials', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click()
    await page.getByRole('textbox').first().fill('mluukkai')
    await page.getByRole('textbox').last().fill('wrong')
    await page.getByRole('button', { name: 'login' }).click()

    const error = await page.locator('.error')
    await expect(error).toBeVisible()
    await expect(error).toContainText('wrong credentials')

    const loginForm = await page.locator('form')
    await expect(loginForm).toBeVisible()
 })
})

describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByRole('textbox').first().fill('mluukkai')
      await page.getByRole('textbox').last().fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'Create New' }).click()
      
      await page.fill('input[placeholder="Title"]', 'A New Blog')
      await page.fill('input[placeholder="Author"]', 'Author Name')
      await page.fill('input[placeholder="Url"]', 'http://newblog.com')
      
      await page.getByRole('button', { name: 'Create' }).click()
      
      await expect(page.getByText('a new blog A New Blog by Author Name added')).toBeVisible()
    })
    })
  })