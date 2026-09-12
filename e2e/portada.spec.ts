import { expect, test } from "@playwright/test";

/**
 * Lo que tiene que estar en pie cada vez que se publica.
 *
 * Una landing no tiene lógica que probar con tests unitarios: lo que se rompe es que una
 * sección deje de renderizarse, que un ancla del menú no lleve a ningún sitio o que una
 * página legal desaparezca — y todo eso solo se ve pidiendo la página de verdad. Por eso
 * estos van contra el sitio **construido**.
 */

/** Las secciones de la portada, con su ancla. El menú las promete todas. */
const SECCIONES = ["services", "work", "testimonials", "about", "faq", "contact"] as const;

test("la portada carga y trae sus secciones", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/1to1/i);

  for (const seccion of SECCIONES) {
    await expect(page.locator(`#${seccion}`), `falta la sección #${seccion}`).toHaveCount(1);
  }
});

test("cada enlace del menú apunta a una sección que existe", async ({ page }) => {
  // Un ancla rota no da error en ningún sitio: simplemente no pasa nada al pulsarla.
  await page.goto("/");
  const anclas = await page
    .locator('header a[href^="#"], nav a[href^="#"]')
    .evaluateAll((enlaces) =>
      enlaces.map((enlace) => (enlace as HTMLAnchorElement).getAttribute("href") ?? ""),
    );

  expect(anclas.length, "el menú no tiene enlaces").toBeGreaterThan(0);
  for (const ancla of new Set(anclas)) {
    await expect(page.locator(ancla), `${ancla} no lleva a ninguna parte`).toHaveCount(1);
  }
});

test("las tres páginas legales se sirven", async ({ page }) => {
  // Son obligatorias y nadie las visita: si una se cayera, no se enteraría nadie.
  for (const ruta of ["/privacy-policy", "/cookie-policy", "/terms-conditions"]) {
    const respuesta = await page.goto(ruta);
    expect(respuesta?.status(), `${ruta} no responde 200`).toBe(200);
    await expect(page.locator("body")).not.toBeEmpty();
  }
});

test("una ruta que no existe da 404 y no revienta", async ({ page }) => {
  const respuesta = await page.goto("/no-existe-esta-pagina");
  expect(respuesta?.status()).toBe(404);
});
