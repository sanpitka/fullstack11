import { test, expect } from '@playwright/test'

test('Adding anecdote', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('textbox').fill('One does not simply test anecdotes')
  await page.getByRole('button', { name: /create/i }).click()

  await expect(page.getByText('One does not simply test anecdotes')).toBeVisible()
})

test('Voting anecdote', async ({ page }) => {
  await page.goto('/')

  const firstVoteButton = page.getByRole('button', { name: /vote/i }).first()
  const row = firstVoteButton.locator('..')
  const votesText = row.getByText(/has \d+/)

  const initial = await votesText.textContent()
  const initialCount = Number(initial?.match(/has (\d+)/)?.[1])

  await firstVoteButton.click()

  await expect(votesText).not.toHaveText(initial ?? '')
  const updated = await votesText.textContent()
  const updatedCount = Number(updated?.match(/has (\d+)/)?.[1])

  expect(updatedCount).toBe(initialCount + 1)
})
