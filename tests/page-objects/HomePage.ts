import { Page, Locator, expect } from "@playwright/test"

export class HomePage {
  readonly page: Page
  readonly heading: Locator
  readonly input: Locator
  readonly submitBtn: Locator
  readonly errorMsg: Locator
  readonly count: Locator
  readonly listItems: Locator
  readonly aboutLink: Locator

  constructor(page: Page) {
    this.page = page
    this.heading = page.getByTestId("home-heading")
    this.input = page.getByTestId("name-input")
    this.submitBtn = page.getByTestId("submit-btn")
    this.errorMsg = page.getByTestId("error-msg")
    this.count = page.getByTestId("name-count")
    this.listItems = page.getByTestId("name-item")
    this.aboutLink = page.getByTestId("about-link")
  }

  async goto() {
    await this.page.goto("/")
    await expect(this.heading).toBeVisible()
  }

  async addName(name: string) {
    await this.input.fill(name)
    await this.submitBtn.click()
  }

  async expectNameVisible(name: string) {
    await expect(this.listItems.filter({ hasText: name })).toHaveCount(1, {
      timeout: 5000,
    })
  }

  async expectErrorContains(text: string) {
    await expect(this.errorMsg).toContainText(text)
  }

  async clickAbout() {
    await this.aboutLink.click()
  }

  async currentURLPath(): Promise<string> {
    const url = this.page.url()
    return new URL(url).pathname
  }
}
