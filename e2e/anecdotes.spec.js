import { test, expect } from '@playwright/test'

test('can create an anecdote', async ({ page }) => {
  await page.goto('/')

  const input = page.getByTestId('new-anecdote')
  const createButton = page.getByRole('button', { name: 'create' })
  await input.fill('One does not simply write tests')
  await createButton.click()
  await expect(page.getByTestId('anecdote-list')).toContainText('One does not simply write tests')}
)

test('can vote an anecdote', async ({ page }) => {
  await page.goto('/')

  const text = 'If it hurts, do it more often'
  const item = page.getByTestId('anecdote-item').filter({ hasText: text })

  await expect(item).toBeVisible()

  const beforeText = await item.getByTestId('anecdote-votes').textContent()
  const beforeCount = Number(beforeText.match(/has (\d+)/)[1])

  await item.getByTestId('vote-button').click()

  const votesAfter = page
    .getByTestId('anecdote-item')
    .filter({ hasText: text })
    .getByTestId('anecdote-votes')

  await expect(votesAfter).toHaveText(`has ${beforeCount + 1}`, { timeout: 15000 })
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