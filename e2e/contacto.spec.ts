import { expect, test, type Page } from "@playwright/test";

/**
 * El formulario de contacto, que es lo único de la landing que hace algo.
 *
 * **No se envía nada de verdad.** La petición a `/api/contact` se intercepta: al otro lado
 * hay un correo a una persona, y un test que corre en cada publicación no puede estar
 * mandándolo. Lo que se comprueba es lo que sí es del formulario: que no deje enviar sin lo
 * obligatorio, que lleve su trampa para robots, y que al enviar mande lo que se escribió.
 */

/** Lleva el formulario a la vista: la portada lo anima al entrar y antes no se puede pulsar. */
async function irAlFormulario(page: Page) {
  await page.goto("/#contact");
  const formulario = page.locator("#contact form");
  await formulario.scrollIntoViewIfNeeded();
  await expect(formulario).toBeVisible();
  return formulario;
}

/** Rellena lo mínimo obligatorio: nombre, correo, mensaje y el consentimiento. */
async function rellenar(page: Page) {
  await page.locator('input[name="name"]').fill("Prueba");
  await page.locator('input[name="email"]').fill("prueba@example.com");
  await page.locator('textarea[name="message"]').fill("Esto es una prueba automática.");
  await page.locator('input[name="privacy"]').check();
}

/** Se queda con lo que se habría mandado, sin dejar salir la petición. */
async function interceptar(page: Page) {
  const visto: { cuerpo: Record<string, unknown> | null; llamadas: number } = {
    cuerpo: null,
    llamadas: 0,
  };
  await page.route("**/api/contact", async (route) => {
    visto.llamadas += 1;
    visto.cuerpo = route.request().postDataJSON();
    await route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
  });
  return visto;
}

test("sin aceptar la privacidad no se puede ni pulsar enviar", async ({ page }) => {
  // Es el requisito que más fácil se cae al rehacer el formulario, y el que no puede faltar.
  const formulario = await irAlFormulario(page);
  const enviar = formulario.locator('button[type="submit"]');

  await expect(enviar).toBeDisabled();
  await page.locator('input[name="privacy"]').check();
  await expect(enviar).toBeEnabled();
});

test("aceptada la privacidad, sigue sin salir si falta lo demás", async ({ page }) => {
  const visto = await interceptar(page);
  const formulario = await irAlFormulario(page);

  await page.locator('input[name="privacy"]').check();
  await formulario.locator('button[type="submit"]').click();

  // El navegador para el envío en el primer campo que falta: no hay petición.
  expect(visto.llamadas, "se envió el formulario vacío").toBe(0);
  await expect(page.locator('input[name="name"]')).toHaveJSProperty("validity.valid", false);
});

test("lleva una trampa para robots, fuera de la vista y del tabulador", async ({ page }) => {
  // Un humano no la ve ni la alcanza tabulando; un robot que rellena todo lo que encuentra, sí.
  await irAlFormulario(page);
  const trampa = page.locator('input[name="website"]');

  await expect(trampa).toHaveCount(1);
  await expect(trampa).toHaveJSProperty("tabIndex", -1);
  await expect(trampa).toHaveValue("");
  const dentroDeLaPantalla = await trampa.evaluate((campo) => {
    const caja = campo.getBoundingClientRect();
    return caja.right > 0 && caja.width > 0;
  });
  expect(dentroDeLaPantalla, "la trampa se ve: un humano la rellenaría").toBe(false);
});

test("relleno del todo, manda lo que se escribió", async ({ page }) => {
  const visto = await interceptar(page);
  const formulario = await irAlFormulario(page);

  await rellenar(page);
  await formulario.locator('button[type="submit"]').click();

  await expect.poll(() => visto.cuerpo, { message: "no llegó a enviarse" }).not.toBeNull();
  expect(visto.cuerpo).toMatchObject({
    name: "Prueba",
    email: "prueba@example.com",
    message: "Esto es una prueba automática.",
  });
  // Y la trampa viaja vacía: es lo que dice al servidor que no es un robot.
  expect(visto.cuerpo?.website ?? "").toBe("");
});
