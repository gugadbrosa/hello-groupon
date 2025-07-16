import { test, expect } from "@playwright/test"

test("Homepage matches the baseline", async ({ page }) => {
  await page.goto("/")

  await expect(page).toHaveScreenshot()
})
