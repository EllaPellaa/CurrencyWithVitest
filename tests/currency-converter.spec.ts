import { test, expect } from '@playwright/test';

test.describe('Successful conversion', () => {
  test('Should convert EUR to SEK successfully', async({ page }) => {
    await page.goto('/')

    const responsePromise = page.waitForResponse('**/api/convert/amount')
    await page.getByLabel('EUR').fill('100')
    await page.getByRole('button', { name: 'Convert' }).click()

    await responsePromise

    const output = page.getByLabel('SEK')
    await expect(output).toContainText(/^\d+(\.\d+)?$/)
  })
})