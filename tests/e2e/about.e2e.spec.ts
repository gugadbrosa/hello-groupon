import { test, expect } from "@playwright/test"
import { HomePage } from "../page-objects/HomePage"
import { AboutPage } from "../page-objects/AboutPage"

test.describe("About page navigation", () => {
  test("navigate to About from Home", async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()

    await home.clickAbout()

    const about = new AboutPage(page)
    await about.expectLoaded()
    expect(new URL(page.url()).pathname).toBe("/about")
  })

  test("directly reach About page", async ({ page }) => {
    const about = new AboutPage(page)
    await page.goto("/about")
    await about.expectLoaded()
    expect(new URL(page.url()).pathname).toBe("/about")
  })

  test("Back Home link takes user to /", async ({ page }) => {
    const about = new AboutPage(page)
    await page.goto("/about")
    await about.expectLoaded()

    await about.backHome()

    const home = new HomePage(page)
    await expect(home.heading).toBeVisible()
    expect(new URL(page.url()).pathname).toBe("/")
  })
})
