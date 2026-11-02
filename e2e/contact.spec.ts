import { expect, test, type Page } from "@playwright/test";

/**
 * The contact form, the only part of the landing that actually does something.
 *
 * **Nothing is really sent.** The request to `/api/contact` is intercepted: on the other end
 * there is an email to a person, and a test that runs on every release cannot keep sending
 * it. What is checked is what belongs to the form: it does not submit without the required
 * fields, it carries its bot trap, and on submit it sends what was typed.
 */

/** Brings the form into view: the home page animates it in and it cannot be clicked before. */
async function goToForm(page: Page) {
  await page.goto("/#contact");
  const form = page.locator("#contact form");
  await form.scrollIntoViewIfNeeded();
  await expect(form).toBeVisible();
  return form;
}

/** Fills in the required minimum: name, email, message and consent. */
async function fillIn(page: Page) {
  await page.locator('input[name="name"]').fill("Test");
  await page.locator('input[name="email"]').fill("test@example.com");
  await page.locator('textarea[name="message"]').fill("This is an automated test.");
  await page.locator('input[name="privacy"]').check();
}

/** Keeps what would have been sent, without letting the request out. */
async function intercept(page: Page) {
  const seen: { body: Record<string, unknown> | null; calls: number } = {
    body: null,
    calls: 0,
  };
  await page.route("**/api/contact", async (route) => {
    seen.calls += 1;
    seen.body = route.request().postDataJSON();
    await route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
  });
  return seen;
}

test("without accepting the privacy policy, submit cannot even be clicked", async ({ page }) => {
  // The requirement most easily lost when the form is redone, and the one that cannot be missing.
  const form = await goToForm(page);
  const submit = form.locator('button[type="submit"]');

  await expect(submit).toBeDisabled();
  await page.locator('input[name="privacy"]').check();
  await expect(submit).toBeEnabled();
});

test("with privacy accepted, it still does not go out if the rest is missing", async ({ page }) => {
  const seen = await intercept(page);
  const form = await goToForm(page);

  await page.locator('input[name="privacy"]').check();
  await form.locator('button[type="submit"]').click();

  // The browser stops the submit at the first missing field: no request.
  expect(seen.calls, "the empty form was sent").toBe(0);
  await expect(page.locator('input[name="name"]')).toHaveJSProperty("validity.valid", false);
});

test("carries a bot trap, out of view and out of the tab order", async ({ page }) => {
  // A human neither sees it nor reaches it by tabbing; a bot that fills everything it finds does.
  await goToForm(page);
  const trap = page.locator('input[name="website"]');

  await expect(trap).toHaveCount(1);
  await expect(trap).toHaveJSProperty("tabIndex", -1);
  await expect(trap).toHaveValue("");
  const onScreen = await trap.evaluate((field) => {
    const box = field.getBoundingClientRect();
    return box.right > 0 && box.width > 0;
  });
  expect(onScreen, "the trap is visible: a human would fill it in").toBe(false);
});

test("fully filled in, it sends what was typed", async ({ page }) => {
  const seen = await intercept(page);
  const form = await goToForm(page);

  await fillIn(page);
  await form.locator('button[type="submit"]').click();

  await expect.poll(() => seen.body, { message: "it was never sent" }).not.toBeNull();
  expect(seen.body).toMatchObject({
    name: "Test",
    email: "test@example.com",
    message: "This is an automated test.",
  });
  // And the trap travels empty: that is what tells the server it is not a bot.
  expect(seen.body?.website ?? "").toBe("");
});

test("also sends where the visit came from and the dropdown choices", async ({ page }) => {
  const seen = await intercept(page);
  // First page of the session with UTMs: the form carries them even when sent from another page.
  await page.goto("/about?utm_source=linkedin&utm_campaign=october");
  const form = await goToForm(page);

  await fillIn(page);
  await form.locator('select[name="projectType"]').selectOption("digitalize");
  await form.locator('button[type="submit"]').click();

  await expect.poll(() => seen.body, { message: "it was never sent" }).not.toBeNull();
  expect(seen.body).toMatchObject({
    projectType: "digitalize",
    timeline: "",
    lang: "es",
    attribution: { utm_source: "linkedin", utm_campaign: "october", landing_page: "/about" },
  });
});
