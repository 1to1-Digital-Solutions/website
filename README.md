<div align="center">
  <img src="public/logo-negative.svg" alt="1to1 Digital Solutions logo" width="80" height="80" />
  <h1>1to1 Digital Solutions website</h1>
  <p>Source of <a href="https://1to1digital.solutions">1to1digital.solutions</a>.</p>
</div>

## What this is

The company website of 1to1 Digital Solutions, a small software studio: a home page with an
point-cloud hero, a services page, an about page, the legal pages and a contact block (email
and LinkedIn links, no form).

- **Bilingual (Spanish / English)** with a `lang` cookie and a React context, without
  per-language routes. Spanish is the default.
- **Analytics** (Google Analytics 4) load only after the visitor accepts cookies.

### Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · three.js · GSAP · Framer
Motion · Jest and Testing Library · Playwright.

### Where things live

| What                                               | Where                         |
| -------------------------------------------------- | ----------------------------- |
| Pages                                              | `app/`                        |
| UI components (hero cloud in `components/canvas/`) | `components/`                 |
| Services copy (home summary and `/services`)       | `content/services.ts`         |
| About page copy                                    | `content/about.ts`            |
| Remaining home page copy (both languages)          | `context/LanguageContext.tsx` |
| Security headers and CSP                           | `next.config.ts`              |

## Running it locally

Requirements: **Node.js 22 or later** and **pnpm 10 or later** (the repo uses `pnpm-lock.yaml`).

```bash
git clone https://github.com/1to1-Digital-Solutions/website.git
cd website
pnpm install
cp .env.example .env.local   # then fill in what you need
pnpm dev
```

Open http://localhost:3000. The site runs without any environment variables.

## Environment variables

All of them are listed, without values, in [`.env.example`](.env.example). Keep real values in
`.env.local` (git-ignored) and in the hosting provider's settings.

| Variable                        | Required | Purpose                                                  |
| ------------------------------- | -------- | -------------------------------------------------------- |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No       | Google Analytics 4 ID, loaded only after cookie consent. |

## Scripts

| Command             | What it does                                               |
| ------------------- | ---------------------------------------------------------- |
| `pnpm dev`          | Development server on port 3000.                           |
| `pnpm build`        | Production build.                                          |
| `pnpm start`        | Serves the production build.                               |
| `pnpm lint`         | ESLint over the source folders.                            |
| `pnpm format`       | Formats everything with Prettier (sorts Tailwind classes). |
| `pnpm format:check` | Checks formatting without writing.                         |
| `pnpm typecheck`    | TypeScript, no emit.                                       |
| `pnpm test`         | Unit and component tests (Jest).                           |
| `pnpm test:e2e`     | End-to-end tests (Playwright).                             |

## Tests

- **Unit and component tests** live in `__tests__/` and run with `pnpm test`.
- **End-to-end tests** live in `e2e/` and run against the **built** site: Playwright builds
  and starts it on its own. The first time, install the browser with
  `pnpm exec playwright install chromium`. Pick the port with `E2E_PORT` (default 3210):

  ```bash
  E2E_PORT=3210 pnpm test:e2e
  ```

Before opening a pull request, run the checks:

```bash
pnpm lint && pnpm format:check && pnpm typecheck && pnpm test && pnpm build
```

The GitHub Actions workflow in `.github/workflows/ci.yml` runs the same steps, but it is
currently disabled, so run them locally.

## Deployment

The site is hosted on [Vercel](https://vercel.com). Deployments are made with the Vercel CLI,
not on merge:

- **Preview:** `vercel deploy --yes`. Previews use the same environment variables as
  production, so a test submission of the form sends a real email.
- **Production:** `vercel deploy --prod --yes` from an up-to-date `main`.

`main` is protected and changes go through pull requests.

## License

There is no license file yet. Until one is added, the code and design in this repository are
© 1to1 Digital Solutions, all rights reserved.
