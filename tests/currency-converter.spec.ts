import { test, expect } from '@playwright/test';

// Add alerts to an array and don't show them normally
async function stubAlerts(page: import('@playwright/test').Page) {
  await page.addInitScript(() => {
    (window as any).__alerts = [];
    const originalAlert = window.alert;
    window.alert = (msg?: any) => {
      (window as any).__alerts.push(String(msg ?? ''))
    };
  });
}

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

test.describe('Error handling', () => {
  test('Should display error with empty input', async({ page }) => {
    await stubAlerts(page)
    await page.goto('/')
    await page.getByRole('button', { name: 'Convert' }).click()
    await page.waitForFunction(() => (window as any).__alerts as string[]);
    const alerts = await page.evaluate(() => (window as any).__alerts as string[]);
    expect(alerts[0]).toContain('Please enter a valid number');
  })
})