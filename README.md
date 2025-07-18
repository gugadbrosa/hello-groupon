# Hello Groupon

This project is a QA Technical test using Next.js + TypeScript.
Pages, components, and API were generated with the help of AI.
The test levels we have on this project are: Unit, API, E2E, and Visual.
Unit test: Jest + React Testing Library;
API: Playwright API testing;
E2E: Playwright;
Visual: Playwright visual comparisons.

---

## Prerequisites

Ensure the following dependencies are installed:

- Node.js > 18

## Installation

1. **Clone the repository:**

   ```bash
   git clone git@github.com:gugadbrosa/hello-groupon.git
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Install Playwright with dependencies**

   ```bash
   npx playwright install --with-deps
   ```

## Running the APP

run `npm run dev`

## Running Tests

For each option, run the following command:

- Lint tests: `npm run lint`
- Unit tests: `npm run test:unit`
- API tests: `npm run test:api`
- All E2E tests: `npm run test:e2e`
- Desktop E2E tests: `npm run test:e2e:desktop`
- Mobile E2E tests: `npm run test:e2e:mobile`
- Visual tests: `npm run test:visual`
- Update baseline for visual tests: `npm run test:visual:update`
- All test pipeline: `npm run test:full`

## CI

The project uses [GitHub Actions](https://docs.github.com/en/actions) and tests are run automatically on PRs and on merge to `main` branch.

## Next Steps
If this project were a real project and the application started to grow, the QA team should think about the next steps needed to ensure quality. For that, there are some suggestions:

### Expand Functional testing with Storybook
With Storybook, we can render each component's stories and assert props, states, and accessibility in isolation. 
Speeds feedback vs. full-app boot. 
CI: Storybook is supported on CI. We can build it and also run headless component tests in parallel with unit tests.

### Add Integration testing (Jest/Vitest + Next test utils)
Test how components, hooks, and data-fetching functions work together without a full browser.
Faster than e2e; catches wiring/contract drift early.
CI: Run after unit tests; spin up lightweight mocks (MSW / in-memory API) or test DB fixture.

### Add Cross-browser smoke tests (Playwright grid / BrowserStack)
Run a short happy‑path across Chrome, Firefox, WebKit, and key mobile browsers.
Catches rendering & CSS issues missed in Chromium-only runs.
CI: Trigger on merge to main or nightly matrix job to control cost/time.

### Add Performance budgets (Lighthouse CI)
Measure LCP, CLS, TTI, and bundle size over time.
Prevents performance creep that hurts UX & SEO.
CI: Run Lighthouse against preview URL; enforce score/budget thresholds before merge.

### Add Load & stress tests (k6 / Artillery)
Model concurrent users, peak RPS, and backend latency under load.
Surface scaling limits and resource bottlenecks before production traffic.
CI: Light smoke load on PR; heavier scripted scenarios nightly or pre‑release.

### Add Accessibility scanning (axe-core / @axe-core/playwright)
Automate WCAG checks on key pages & Storybook stories.
Finds common a11y defects early; reduces manual remediation later.
CI: Fast scan on PR (fail critical); deeper crawl nightly with report artifact.

### Preview environments per PR
Deploy ephemeral URL (Vercel / container env) for realistic testing before merge.
Lets visual, a11y, performance, and manual QA all test the same build.
CI: On PR open, create a preview; downstream jobs target that URL.

### Scheduled deep health runs
Nightly: full cross‑browser, deep a11y crawl, Lighthouse trend, dependency & security scans.
Weekly: load/stress, chaos, long‑running regression.
CI: Use cron workflows; publish summary dashboard to PRs or Slack.

### Add Self‑healing tests with Browserstack or TestRail (and finally the one I want to learn the most)
Self‑healing automation detects when a locator breaks (DOM changed) and auto‑finds the intended element using alternate attributes, role, text, or structural similarity—reducing brittle test failures.
Improves test stability in fast‑changing UIs and lowers maintenance cost; still surfaces drift so selectors can be fixed intentionally.
CI: Wrap Playwright locators with a “heal‑then‑warn” helper (primary data-test-id, fallback role/text/XPath similarity); log heals as artifacts and fail the build if heal count > threshold.
