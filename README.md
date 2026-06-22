# hands-on-playwright

Professional Playwright automation framework using TypeScript for UI and API testing against the RealWorld Conduit application.

Application under test: https://demo.realworld.show/  
API documentation: https://realworld-docs.netlify.app/

## What This Project Demonstrates

- Playwright with TypeScript and strict typing
- Page Object Model with assertion-free page classes
- API clients for backend setup, test data creation, and cleanup
- Fixtures for reusable dependency injection
- Factories for dynamic test data
- Validators for API contract assertions
- Multi-browser execution: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- Multi-environment configuration: QA, Staging, Production
- Dockerized execution
- GitHub Actions pipeline for pull requests, main branch, and nightly runs
- HTML, list, and JUnit reporting
- Screenshots and videos on failure, traces on retry

## Architecture

Tests contain business flow and assertions only. Page objects contain locators and UI actions only. API clients own backend setup and cleanup capabilities. Fixtures inject API clients, authenticated users, and page objects so tests stay readable and focused.

```text
tests/              UI and API specs
ui/pages/           Page Objects
ui/components/      Reusable UI components
api/clients/        API interaction layer
api/validators/     Assertion helpers for API contracts
factories/          Dynamic test data builders
fixtures/           Playwright fixture composition
config/             Browser and environment configuration
utils/              Shared framework utilities
docker/             Docker runtime
```

## Setup

```bash
npm install
npx playwright install
```

On Windows PowerShell, if script execution is blocked, use the `.cmd` executables:

```powershell
npm.cmd install
npx.cmd playwright install
```

## Running Tests

```bash
ENV=qa npm test
ENV=staging npm test
ENV=prod npm test
```

On Windows PowerShell:

```powershell
$env:ENV="qa"
npm.cmd test
```

Useful scripts:

```bash
npm run test:chrome
npm run test:firefox
npm run test:webkit
npm run test:mobile
npm run test:api
npm run test:smoke
npm run test:browserstack
npm run report
```

Recommended local UI execution against the public demo environment:

```bash
npx playwright test tests/auth tests/articles tests/profile --project=chromium --workers=1
```

On Windows, the project also includes:

```powershell
.\run-local.cmd
```

This runs the Chromium project with `ENV=qa` and one worker.

## Docker

```bash
ENV=qa npm run test:docker
```

By default, Docker Compose builds the Playwright image, executes the smoke suite, and mounts `reports/` plus `test-results/` back to the host.

Override the Docker test command with `TEST_COMMAND`:

```bash
ENV=qa TEST_COMMAND="npx playwright test --project=chromium --workers=1" docker compose up --build --abort-on-container-exit --exit-code-from e2e
```

On Windows PowerShell:

```powershell
$env:ENV="qa"
$env:TEST_COMMAND="npx playwright test --project=chromium --workers=1"
docker compose up --build --abort-on-container-exit --exit-code-from e2e
```

## BrowserStack

BrowserStack execution is enabled with `TEST_TARGET=browserstack`.

Required environment variables:

- `BROWSERSTACK_USERNAME`
- `BROWSERSTACK_ACCESS_KEY`

Local execution:

```bash
BROWSERSTACK_USERNAME=your_username BROWSERSTACK_ACCESS_KEY=your_access_key npm run test:browserstack
```

On Windows PowerShell:

```powershell
$env:BROWSERSTACK_USERNAME="your_username"
$env:BROWSERSTACK_ACCESS_KEY="your_access_key"
npm.cmd run test:browserstack
```

Docker execution:

```bash
TEST_TARGET=browserstack BROWSERSTACK_USERNAME=your_username BROWSERSTACK_ACCESS_KEY=your_access_key TEST_COMMAND="npx playwright test --project=browserstack-chrome-windows --workers=1" docker compose up --build --abort-on-container-exit --exit-code-from e2e
```

Available BrowserStack projects:

- `browserstack-chrome-windows`
- `browserstack-firefox-windows`
- `browserstack-webkit-osx`

For GitHub Actions, configure these repository secrets:

- `BROWSERSTACK_USERNAME`
- `BROWSERSTACK_ACCESS_KEY`

## Environments

The active environment is selected with `ENV`.

Supported values:

- `qa`
- `staging`
- `prod`
- `dev`

Each environment controls:

- `baseUrl`
- `apiUrl`
- default credentials
- feature flags

Runtime overrides are supported:

```bash
ENV=qa BASE_URL=https://demo.realworld.show API_URL=https://api.realworld.show/api npm test
```

## CI/CD Strategy

GitHub Actions workflow:

- Pull requests to `main`: smoke suite in Docker
- Pushes to `main`: Chromium full suite in Docker with one worker
- Nightly schedule: Docker cross-browser matrix across desktop and mobile projects
- Manual workflow dispatch: Docker cross-browser execution
- Manual workflow dispatch: BrowserStack matrix execution when BrowserStack secrets are configured
- Each execution uploads `reports/` and `test-results/` as GitHub Actions artifacts

The HTML report is generated at:

```text
reports/html-report/index.html
```

Failure artifacts are stored under:

```text
test-results/
```

Videos are retained only for failed tests, screenshots are captured only on failure, and traces are captured on the first retry.

## Sample Coverage

- Register user via API and login via UI
- Create article via UI
- Favorite article
- Delete article
- API-only user and article tests

## Notes For Portfolio Reviewers

This repository is intentionally structured to show scalable QA engineering practices. The sample tests are concise because setup is delegated to fixtures and API clients, while page objects remain clean and assertion-free.
