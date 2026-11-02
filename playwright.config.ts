import { defineConfig, devices } from "@playwright/test";

/**
 * The landing's end-to-end tests.
 *
 * They run against the **built** site, not `next dev`: the build is what gets published, and
 * it is where a page that breaks during prerendering shows up. Playwright starts the server
 * itself and reuses one that is already listening, so you can iterate without waiting for
 * the build.
 *
 * `E2E_PORT` lets this suite run alongside another repo's without fighting over the port.
 */

const PORT = Number(process.env.E2E_PORT ?? 3210);
const BASE = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: BASE,
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `pnpm build && pnpm start --port ${PORT} --hostname 127.0.0.1`,
    url: BASE,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
