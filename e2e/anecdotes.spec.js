import { test, expect } from '@playwright/test'

//A simple test for creating an anecdote
test('can create an anecdote', async ({ page }) => {
  await page.goto('/')

  const input = page.getByTestId('new-anecdote')
  const createButton = page.getByRole('button', { name: 'create' })
  await input.fill('One does not simply write tests')
  await createButton.click()
  await expect(page.getByTestId('anecdote-list')).toContainText('One does not simply write tests')}
)

//A simple test for voting an anecdote
test('can vote an anecdote', async ({ page }) => {

  await page.goto('/')

  const text = 'If it hurts, do it more often'
  const item = page.getByTestId('anecdote-item').filter({ hasText: text })
  await expect(item).toBeVisible()

  const count = item.getByTestId('vote-count')
  const beforeCount = Number(await count.textContent())
  await item.getByTestId('vote-button').click()

  const countAfter = page.getByTestId('anecdote-item')
    .filter({ hasText: text })
    .getByTestId('vote-count')
  await expect(countAfter).toHaveText(String(beforeCount + 1), { timeout: 15000 })
})

//A simple test for the filtering functionality
test('anecdotes can be filtered', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByTestId('anecdote-item').first()).toBeVisible()
  await page.getByTestId('filter').fill('hurts')
  await expect(
    page.getByTestId('anecdote-item').filter({ hasText: 'If it hurts, do it more often' })
  ).toBeVisible()

  await expect(
    page.getByTestId('anecdote-item').filter({ hasText: 'Premature optimization is the root of all evil' })
  ).toHaveCount(0)
})

//These tests are just examples: sorting the anecdotes by votes and the notification functionality could be tested too.