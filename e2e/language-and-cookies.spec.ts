import { expect, test } from "@playwright/test";

/**
 * The two things the landing remembers about its visitor.
 *
 * Language and cookie consent are stored in the browser, so the only way to tell whether they
 * work is to open the page, interact and open it again. None of this shows up in a unit test,
 * and consent is also a legal requirement.
 */

test("the language switches and survives a reload", async ({ page }) => {
  await page.goto("/");
  const headline = page.locator("h1").first();
  const before = (await headline.innerText()).trim();

  // The button names the language it leads to, so its name changes with the page language.
  // Naming the language and not just the verb matters: the theme button also says "Switch to…".
  const toggle = page
    .getByRole("button", { name: /cambiar a (inglés|español)|switch to (english|spanish)/i })
    .first();
  await toggle.click();
  await expect(headline).not.toHaveText(before);
  const after = (await headline.innerText()).trim();

  await page.reload();
  await expect(page.locator("h1").first(), "the language was not remembered").toHaveText(after);
});

test("accepting cookies removes the banner and it does not come back", async ({ page }) => {
  await page.goto("/");
  const banner = page.getByLabel("Cookie consent");
  await expect(banner).toBeVisible();

  await banner.getByRole("button", { name: /aceptar|accept/i }).click();
  await expect(banner).toHaveCount(0);

  await page.reload();
  await expect(page.getByLabel("Cookie consent")).toHaveCount(0);
});

test("declining is remembered too: the visitor is not asked again", async ({ page }) => {
  // Declining and having the banner reappear on every visit is the most common way to break
  // this without noticing: the stored decision has to be the visitor's, not the one that
  // suits the site.
  await page.goto("/");
  const banner = page.getByLabel("Cookie consent");
  await banner.getByRole("button", { name: /rechazar|decline/i }).click();
  await expect(banner).toHaveCount(0);

  await page.reload();
  await expect(page.getByLabel("Cookie consent")).toHaveCount(0);
});
