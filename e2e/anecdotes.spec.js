import { test, expect } from '@playwright/test'

test('can create an anecdote', async ({ page }) => {
  await page.goto('/')

  const text = `One does not simply write tests ${Date.now()}`
  await page.getByTestId('new-anecdote').fill(text)

  // Wait for the POST request to complete
  const postPromise = page.waitForResponse(res =>
    res.url().endsWith('/anecdotes') &&
    res.request().method() === 'POST' &&
    res.status() === 200
  )

  await page.getByRole('button', { name: 'create' }).click()
  await postPromise

  // Wait for the new anecdote to appear in the list
  const item = page
    .getByTestId('anecdote-item')
    .filter({ hasText: text })

  await expect(item).toBeVisible({ timeout: 15_000 })
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