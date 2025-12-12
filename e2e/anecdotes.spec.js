import { test, expect } from '@playwright/test'

test('can create an anecdote', async ({ page }) => {
  await page.goto('/')
  const text = `One does not simply write tests`

  await page.getByTestId('new-anecdote').fill(text)
  await page.getByRole('button', { name: 'create' }).click()

  const item = page.getByTestId('anecdote-item').filter({ hasText: text })
  await expect(item).toBeVisible()
})

/*test('can vote an anecdote', async ({ page }) => {
  await page.goto('/')

  const item = page
    .getByTestId('anecdote-item')
    .filter({ hasText: 'One does not simply write tests' })
  const votes = item.getByTestId('anecdote-votes')
  const voteButton = item.getByTestId('vote-button')

  const before = await votes.textContent()
  const beforeCount = Number(before.match(/has (\d+)/)[1])

  await voteButton.click()

  await expect(votes).toHaveText(`has ${beforeCount + 1}`)
}) */