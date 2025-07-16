import { test, expect } from "@playwright/test"

test("homepage loads and shows Next.js banner", async ({ page }) => {
  await page.goto("/")

  await expect(page).toHaveTitle("Create Next App")
})
