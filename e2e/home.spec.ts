import { expect, test } from "@playwright/test";

/**
 * What has to be standing every time the site is published.
 *
 * A landing page has little logic for unit tests: what breaks is a section that stops
 * rendering, a menu anchor that leads nowhere or a legal page that disappears — and all of
 * that only shows when the real page is requested. That is why these run against the
 * **built** site.
 */

/** The home page sections, with their anchors. About and the services detail are separate. */
const SECTIONS = ["services", "work", "testimonials", "faq", "contact"] as const;

test("the home page loads with all its sections", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/1to1/i);

  for (const section of SECTIONS) {
    await expect(page.locator(`#${section}`), `section #${section} is missing`).toHaveCount(1);
  }
});

test("every menu link leads somewhere that exists", async ({ page }) => {
  // A broken anchor raises no error anywhere: nothing happens when it is clicked. The menu
  // mixes home page anchors (`/#faq`) with standalone pages (`/about`), and this covers both.
  await page.goto("/");
  const links = await page
    .locator('nav a[href^="/"]')
    .evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).getAttribute("href") ?? ""));

  expect(links.length, "the menu has no links").toBeGreaterThan(0);
  // One visit per route: going to `/#faq` while on `/` only moves the anchor and returns no response.
  const anchorsByRoute = new Map<string, string[]>();
  for (const link of links) {
    const [route, anchor] = link.split("#");
    anchorsByRoute.set(route, [...(anchorsByRoute.get(route) ?? []), ...(anchor ? [anchor] : [])]);
  }
  for (const [route, anchors] of anchorsByRoute) {
    const response = await page.goto(route);
    expect(response?.status(), `${route} does not answer 200`).toBe(200);
    for (const anchor of new Set(anchors)) {
      await expect(page.locator(`#${anchor}`), `${route}#${anchor} leads nowhere`).toHaveCount(1);
    }
  }
});

test("about and services have their own pages", async ({ page }) => {
  for (const route of ["/about", "/services"]) {
    const response = await page.goto(route);
    expect(response?.status(), `${route} does not answer 200`).toBe(200);
    await expect(page.locator("h1"), `${route} has no heading`).toHaveCount(1);
  }
});

test("the service cards lead to their detail", async ({ page }) => {
  // The home page summary promises one section per service on /services.
  await page.goto("/");
  const targets = await page
    .locator('#services a[href^="/services#"]')
    .evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).getAttribute("href") ?? ""));
  expect(targets.length).toBeGreaterThanOrEqual(5);

  await page.goto("/services");
  for (const target of targets) {
    const anchor = target.split("#")[1];
    await expect(page.locator(`#${anchor}`), `section #${anchor} is missing`).toHaveCount(1);
  }
});

test("the contact button on another page lands on the form", async ({ page }) => {
  await page.goto("/about");
  await page.getByRole("link", { name: "Hablemos" }).last().click();
  await expect(page).toHaveURL(/\/#contact$/);
  await expect(page.locator("#contact")).toBeInViewport();
});

test("the three legal pages are served", async ({ page }) => {
  // They are mandatory and nobody visits them: if one went down, nobody would notice.
  for (const route of ["/privacy-policy", "/cookie-policy", "/terms-conditions"]) {
    const response = await page.goto(route);
    expect(response?.status(), `${route} does not answer 200`).toBe(200);
    await expect(page.locator("body")).not.toBeEmpty();
  }
});

test("a route that does not exist returns 404 without crashing", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist");
  expect(response?.status()).toBe(404);
});
