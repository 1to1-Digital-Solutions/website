<div align="center">
  <img src="public/logo-negative.svg" alt="1to1 Digital Solutions logo" width="80" height="80" />
  <h1>1to1 Digital Solutions website</h1>
  <p>Source of <a href="https://1to1digital.solutions">1to1digital.solutions</a>.</p>
</div>

## What this is

The company website of 1to1 Digital Solutions, a small software studio: a home page with an
interactive 3D hero, a services page, an about page, the legal pages and a contact form.

- **Bilingual (Spanish / English)** with a `lang` cookie and a React context, without
  per-language routes. Spanish is the default.
- **Contact form** posted to a route handler (`app/api/contact/route.ts`) that validates the
  input, applies a honeypot and a per-IP rate limit, emails the lead to the team through
  [Resend](https://resend.com) and, optionally, appends it to a Google Sheet. Nothing is sent
  automatically to the person who fills in the form.
- **Visit attribution** (UTM parameters, referrer and landing page) is kept in
  `sessionStorage` and travels with the form. No cookies, no third parties.
- **Analytics** (Google Analytics 4) load only after the visitor accepts cookies.

### Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · three.js with React Three
Fiber and drei · GSAP · Framer Motion · Resend · Jest and Testing Library · Playwright.

### Where things live

| What                                            | Where                         |
| ----------------------------------------------- | ----------------------------- |
| Pages and the contact API                       | `app/`                        |
| UI components (3D hero in `components/canvas/`) | `components/`                 |
| Services copy (home summary and `/services`)    | `content/services.ts`         |
| About page copy                                 | `content/about.ts`            |
| Contact form options, shared client/server      | `content/lead-options.ts`     |
| Remaining home page copy (both languages)       | `context/LanguageContext.tsx` |
| Visit attribution                               | `lib/attribution.ts`          |
| Security headers and CSP                        | `next.config.ts`              |

## Running it locally

Requirements: **Node.js 22 or later** and **pnpm 10 or later** (the repo uses `pnpm-lock.yaml`).

```bash
git clone https://github.com/1to1-Digital-Solutions/website.git
cd website
pnpm install
cp .env.example .env.local   # then fill in what you need
pnpm dev
```

Open http://localhost:3000. The site runs without any environment variables; only the contact
form needs the Resend ones to actually send (without them it answers with an error).

## Environment variables

All of them are listed, without values, in [`.env.example`](.env.example). Keep real values in
`.env.local` (git-ignored) and in the hosting provider's settings.

| Variable                                                     | Required     | Purpose                                                                                        |
| ------------------------------------------------------------ | ------------ | ---------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`                                             | For the form | Resend API key.                                                                                |
| `RESEND_FROM_EMAIL`                                          | For the form | Sender address on a domain verified in Resend.                                                 |
| `CONTACT_TO_EMAIL`                                           | For the form | Inbox that receives the lead notifications.                                                    |
| `GOOGLE_SHEETS_WEBHOOK_URL` / `GOOGLE_SHEETS_WEBHOOK_SECRET` | No           | Google Apps Script web app that appends each lead to a sheet. Skipped if unset.                |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`                              | No           | Google Analytics 4 ID, loaded only after cookie consent.                                       |
| `NEXT_PUBLIC_SITE_URL`                                       | No           | Extra origin accepted by the contact API (production domains and Vercel previews already are). |

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

- **Unit and component tests** live in `__tests__/` and run with `pnpm test`. The contact API
  tests mock Resend, so they never send email.
- **End-to-end tests** live in `e2e/` and run against the **built** site: Playwright builds
  and starts it on its own. The first time, install the browser with
  `pnpm exec playwright install chromium`. Pick the port with `E2E_PORT` (default 3210):

  ```bash
  E2E_PORT=3210 pnpm test:e2e
  ```

  The form tests intercept the request to `/api/contact`, so no email is sent.

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
