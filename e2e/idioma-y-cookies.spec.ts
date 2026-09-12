import { expect, test } from "@playwright/test";

/**
 * Las dos cosas que la landing recuerda de quien la visita.
 *
 * El idioma y el consentimiento de cookies se guardan en el navegador, así que lo único que
 * dice si funcionan es abrir la página, tocar y volver a abrirla. Nada de esto se ve desde
 * un test unitario, y el consentimiento además es un requisito legal.
 */

test("el idioma se cambia y aguanta la recarga", async ({ page }) => {
  await page.goto("/");
  const titular = page.locator("h1").first();
  const antes = (await titular.innerText()).trim();

  // El botón dice a qué idioma lleva, así que su nombre cambia con el idioma de la página.
  // Nombrar el idioma y no solo el verbo importa: el botón del tema también dice «Switch to…».
  const cambiar = page
    .getByRole("button", { name: /cambiar a (inglés|español)|switch to (english|spanish)/i })
    .first();
  await cambiar.click();
  await expect(titular).not.toHaveText(antes);
  const despues = (await titular.innerText()).trim();

  await page.reload();
  await expect(page.locator("h1").first(), "el idioma no se recordó").toHaveText(despues);
});

test("aceptar las cookies quita el aviso y no vuelve", async ({ page }) => {
  await page.goto("/");
  const aviso = page.getByLabel("Cookie consent");
  await expect(aviso).toBeVisible();

  await aviso.getByRole("button", { name: /aceptar|accept/i }).click();
  await expect(aviso).toHaveCount(0);

  await page.reload();
  await expect(page.getByLabel("Cookie consent")).toHaveCount(0);
});

test("rechazarlas también se recuerda: no se vuelve a preguntar", async ({ page }) => {
  // Rechazar y que el aviso reaparezca en cada visita es la forma más común de incumplir
  // esto sin darse cuenta: la decisión guardada tiene que ser la de quien visita, no la
  // que le conviene al sitio.
  await page.goto("/");
  const aviso = page.getByLabel("Cookie consent");
  await aviso.getByRole("button", { name: /rechazar|decline/i }).click();
  await expect(aviso).toHaveCount(0);

  await page.reload();
  await expect(page.getByLabel("Cookie consent")).toHaveCount(0);
});
