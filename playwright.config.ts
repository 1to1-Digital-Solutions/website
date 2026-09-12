import { defineConfig, devices } from "@playwright/test";

/**
 * Los e2e de la landing.
 *
 * Contra el sitio **construido** y no contra `next dev`: lo que se publica es el build, y es
 * ahí donde se ve si una página se rompe al prerenderizarse. El servidor lo levanta el propio
 * Playwright y lo reutiliza si ya hay uno escuchando, para poder iterar sin esperar al build.
 *
 * `E2E_PORT` permite correr esta suite a la vez que la de otro repo sin pelearse por el
 * puerto, que es como se usan en esta máquina.
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
    command: `npm run build && npm run start -- --port ${PORT} --hostname 127.0.0.1`,
    url: BASE,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
