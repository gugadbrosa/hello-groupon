import { test, expect } from "@playwright/test"
import { HomePage } from "../page-objects/HomePage"
import { SAMPLE_NAMES } from "../lib/testData"
import { makeLongName } from "../helpers/testHelpers"

test.describe("Add name flow", () => {
  let home: HomePage

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page)
    await home.goto()
  })

  test("list is empty when home is acessed", async ({}) => {
    await expect(home.listItems).toHaveCount(0)
  })

  test("user adds name", async ({ page }) => {
    await home.addName(SAMPLE_NAMES.ana)
    await home.expectNameVisible(SAMPLE_NAMES.ana)

    expect(new URL(page.url()).pathname).toBe("/")
  })

  test("adds three names to the list", async ({}) => {
    await home.addName(SAMPLE_NAMES.gustavo)
    await home.addName(SAMPLE_NAMES.ana)
    await home.addName(SAMPLE_NAMES.julia)

    await expect(home.listItems).toHaveCount(3)
  })

  test("not able to add name with more than 50 characters", async ({}) => {
    await home.addName(makeLongName())

    await expect(home.errorMsg).toBeVisible()
  })

  test("not able to add empty name", async ({}) => {
    await home.addName(SAMPLE_NAMES.empty)

    await expect(home.errorMsg).toBeVisible()
  })
})
