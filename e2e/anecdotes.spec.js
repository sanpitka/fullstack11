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
  console.log('➡️ Test started')

  await page.goto('/')
  console.log('✅ Page loaded')

  const text = 'If it hurts, do it more often'
  const item = page.getByTestId('anecdote-item').filter({ hasText: text })

  await expect(item).toBeVisible()
  console.log('✅ Anecdote item found')

  const beforeText = await item.getByTestId('anecdote-votes').textContent()
  console.log('🔢 Votes before:', beforeText)

  const count = item.getByTestId('vote-count')
  const beforeCount = Number(await count.textContent())

  await item.getByTestId('vote-button').click()

  const countAfter = page.getByTestId('anecdote-item')
    .filter({ hasText: text })
    .getByTestId('vote-count')

  await expect(countAfter).toHaveText(String(beforeCount + 1), { timeout: 15000 })
})