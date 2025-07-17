import { test, expect } from "@playwright/test"

import { SAMPLE_NAMES, MAX_NAME_LEN } from "../lib/testData"
import { makeLongName, INVALID_NAME_MSG } from "../helpers/testHelpers"

test.describe("hello API (list + create)", () => {
  const startingCount = 0

  test.beforeAll(async ({ request }) => {
    await request.delete("/api/hello")
  })

  test("GET empty list", async ({ request }) => {
    const res = await request.get("/api/hello")
    expect(res.status()).toBe(200)

    const body = await res.json()
    expect(Array.isArray(body.items)).toBe(true)
    expect(body.count).toBe(0)
  })

  test("POST valid name", async ({ request }) => {
    const res = await request.post("/api/hello", {
      data: { name: SAMPLE_NAMES.gustavo },
    })
    expect(res.status()).toBe(201)
    const record = await res.json()
    expect(record.name).toBe(SAMPLE_NAMES.gustavo)
    expect(typeof record.id).toBe("number")
    expect(typeof record.createdAt).toBe("string")

    const res2 = await request.get("/api/hello")
    const body2 = await res2.json()
    expect(body2.count).toBeGreaterThanOrEqual(startingCount + 1)

    type NameRecord = { id: number; name: string; createdAt: string }
    const found = (body2.items as NameRecord[]).some(
      (r) => r.name === SAMPLE_NAMES.gustavo
    )
    expect(found).toBe(true)
  })

  test("POST invalid long name", async ({ request }) => {
    const res = await request.post("/api/hello", {
      data: { name: makeLongName() },
    })
    expect(res.status()).toBe(400)
    const err = await res.json()
    expect(err.code).toBe("INVALID_NAME")
    expect(err.error).toBe(INVALID_NAME_MSG(MAX_NAME_LEN))
  })
})
