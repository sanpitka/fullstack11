require('dotenv').config()
const { test, expect } = require('@playwright/test')

test('Adding anecdote', async ({ page }) => {
  await page.goto(process.env.FRONTEND_URL || 'http://localhost:5173')
  
  // Add a new anecdote
  await page.getByRole('textbox').fill('One does not simply test anecdotes')
  await page.getByRole('button', { name: /create/i }).click()

  // Check that the new anecdote appears in the list
  await expect(page.locator('text=One does not simply test anecdotes')).toBeVisible()
})

test('Voting anecdote', async ({ page }) => {
  await page.goto(process.env.FRONTEND_URL || 'http://localhost:5173')
  // Vote for the first anecdote in the list
  const firstAnecdote = page.locator('div').filter({ hasText: 'has' }).first()
  const voteButton = firstAnecdote.getByRole('button', { name: /vote/i })
  const votesText = firstAnecdote.locator('text=has').first()
  const initialVotes = await votesText.textContent()
  const initialVoteCount = parseInt(initialVotes.match(/has (\d+)/)[1], 10)
  await voteButton.click()

  // Check that the vote count has increased by 1
  const updatedVotesText = await votesText.textContent()
  const updatedVoteCount = parseInt(updatedVotesText.match(/has (\d+)/)[1], 10)
  expect(updatedVoteCount).toBe(initialVoteCount + 1)
})
