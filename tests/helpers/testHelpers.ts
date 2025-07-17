import { MAX_NAME_LEN } from "../lib/testData"

// API Test Helpers

export function makeLongName(len = MAX_NAME_LEN + 1): string {
  return "x".repeat(len)
}

export const INVALID_NAME_MSG = (len = MAX_NAME_LEN) =>
  `Name must be 1-${len} characters.`
