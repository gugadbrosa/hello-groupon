import { Page, Locator, expect } from "@playwright/test"

export class AboutPage {
  readonly page: Page
  readonly heading: Locator
  readonly homeLink: Locator

  constructor(page: Page) {
    this.page = page
    this.heading = page.getByTestId("about-heading")
    this.homeLink = page.getByTestId("home-link")
  }

  async expectLoaded() {
    await expect(this.heading).toBeVisible()
  }

  async backHome() {
    await this.homeLink.click()
  }
}
