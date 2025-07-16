import { test, expect } from "@playwright/test"

test("GET /api/hello returns default JSON", async ({ request }) => {
  const res = await request.get("/api/hello")

  expect(res.ok()).toBeTruthy()
  expect(res.status()).toBe(200)

  const body = await res.json()
  expect(body).toEqual({ name: "John Doe" })
})
