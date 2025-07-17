import { test, expect } from "@playwright/test"

test("Homepage matches the baseline", async ({ page }) => {
  await page.goto("/about")

  await expect(page).toHaveScreenshot()
})
