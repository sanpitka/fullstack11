import { test, expect } from '@playwright/test'

test('shows anecdotes', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText(/anecdote/i)).toBeVisible()
})

test('can create an anecdote', async ({ page }) => {
  await page.goto('/')
  const text = `One does not simply write tests at ${new Date().toISOString()}`
  await page.getByRole('textbox').fill(text)
  await page.getByRole('button', { name: /create/i }).click()
  await expect(page.getByText(text)).toBeVisible()
})

test('can vote an anecdote', async ({ page }) => {
  await page.goto('/')

  const item = page
    .getByTestId('anecdote-item')
    .filter({ hasText: 'One does not simply write tests at' })
  const votes = item.getByTestId('anecdote-votes')
  const voteButton = item.getByTestId('vote-button')

  const before = await votes.textContent()
  const beforeCount = Number(before.match(/has (\d+)/)[1])

  await voteButton.click()

  await expect(votes).toHaveText(`has ${beforeCount + 1}`)
})