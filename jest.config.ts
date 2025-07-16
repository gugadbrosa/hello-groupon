import nextJest from "next/jest"
import type { Config } from "jest"

const createJestConfig = nextJest({ dir: "./" })

const customConfig: Config = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",

  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
  },

  testMatch: ["**/__tests__/**/*.test.[jt]s?(x)", "**/?(*.)+(test).[jt]s?(x)"],
}

export default createJestConfig(customConfig)
