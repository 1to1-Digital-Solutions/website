import { expect, test } from "@playwright/test";

/**
 * Lo que tiene que estar en pie cada vez que se publica.
 *
 * Una landing no tiene lógica que probar con tests unitarios: lo que se rompe es que una
 * sección deje de renderizarse, que un ancla del menú no lleve a ningún sitio o que una
 * página legal desaparezca — y todo eso solo se ve pidiendo la página de verdad. Por eso
 * estos van contra el sitio **construido**.
 */

/** Las secciones de la portada, con su ancla. Sobre mí y el detalle de servicios van aparte. */
const SECCIONES = ["services", "work", "testimonials", "faq", "contact"] as const;

test("la portada carga y trae sus secciones", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/1to1/i);

  for (const seccion of SECCIONES) {
    await expect(page.locator(`#${seccion}`), `falta la sección #${seccion}`).toHaveCount(1);
  }
});

test("cada enlace del menú lleva a algo que existe", async ({ page }) => {
  // Un ancla rota no da error en ningún sitio: simplemente no pasa nada al pulsarla. El menú
  // mezcla anclas de la portada (`/#faq`) con páginas propias (`/about`), y vale en todas.
  await page.goto("/");
  const enlaces = await page
    .locator('nav a[href^="/"]')
    .evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).getAttribute("href") ?? ""));

  expect(enlaces.length, "el menú no tiene enlaces").toBeGreaterThan(0);
  // Una visita por ruta: ir a `/#faq` estando en `/` solo mueve el ancla y no devuelve respuesta.
  const anclasPorRuta = new Map<string, string[]>();
  for (const enlace of enlaces) {
    const [ruta, ancla] = enlace.split("#");
    anclasPorRuta.set(ruta, [...(anclasPorRuta.get(ruta) ?? []), ...(ancla ? [ancla] : [])]);
  }
  for (const [ruta, anclas] of anclasPorRuta) {
    const respuesta = await page.goto(ruta);
    expect(respuesta?.status(), `${ruta} no responde 200`).toBe(200);
    for (const ancla of new Set(anclas)) {
      await expect(
        page.locator(`#${ancla}`),
        `${ruta}#${ancla} no lleva a ninguna parte`
      ).toHaveCount(1);
    }
  }
});

test("sobre mí y servicios tienen su página", async ({ page }) => {
  for (const ruta of ["/about", "/services"]) {
    const respuesta = await page.goto(ruta);
    expect(respuesta?.status(), `${ruta} no responde 200`).toBe(200);
    await expect(page.locator("h1"), `${ruta} sin título`).toHaveCount(1);
  }
});

test("las tarjetas de servicios llevan a su detalle", async ({ page }) => {
  // El resumen de la portada promete un apartado por servicio en /services.
  await page.goto("/");
  const destinos = await page
    .locator('#services a[href^="/services#"]')
    .evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).getAttribute("href") ?? ""));
  expect(destinos.length).toBeGreaterThanOrEqual(5);

  await page.goto("/services");
  for (const destino of destinos) {
    const ancla = destino.split("#")[1];
    await expect(page.locator(`#${ancla}`), `falta el apartado #${ancla}`).toHaveCount(1);
  }
});

test("el botón de contacto desde otra página aterriza en el formulario", async ({ page }) => {
  await page.goto("/about");
  await page.getByRole("link", { name: "Hablemos" }).last().click();
  await expect(page).toHaveURL(/\/#contact$/);
  await expect(page.locator("#contact")).toBeInViewport();
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
