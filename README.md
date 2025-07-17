# Hello Groupon

This project is a QA Technical test using Next.js + TypeScript.
Pages, components and API were generated with the help of AI.
The test levels we have on this project are: Unit, API, E2E and Visual.
Unit test: Jest + React Testing Library;
API: Playwright API testing;
E2E: Playwright;
Visual: Playwright visual comparisons.

---

### Prerequisites

Ensure the following dependencies are installed:

- Node.js > 18

### Installation

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

### Running the APP

run `npm run dev`

### Running Tests

- Lint tests `npm run lint`
- Unit tests `npm run test:unit`
- API tests `npm run test:api`
- All E2E tests `npm run test:e2e`
- Desktop E2E tests `npm run test:e2e:desktop`
- Mobile E2E tests `npm run test:e2e:mobile`
- Visual tests `npm run test:visual`
- Update baseline for visual tests `npm run test:visual:update`
- All test pipeline `npm run test:full`

### CI

The project uses [GitHub Actions](https://docs.github.com/en/actions) and tests are run automatically on PRs and on merge to `main` branch.
