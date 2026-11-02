/**
 * Webhook de la hoja «Leads» (Google Apps Script). El código que se ejecuta vive en el editor
 * de Apps Script de la hoja; este fichero es su copia versionada.
 *
 * `/api/contact` de la landing hace POST con `{ secret, lead: { … } }`. Cada lead es una fila.
 * Se escribe POR NOMBRE DE CABECERA: cada campo va a la columna que lleva su nombre, esté
 * donde esté, y si la hoja no la tiene se añade al final. Un campo nuevo del formulario nunca
 * se pierde en silencio, y las columnas se pueden reordenar a mano sin romper nada.
 *
 * Puesta en marcha (una vez, y cada vez que cambie este código):
 * 1. En la hoja: Extensiones → Apps Script, y pegar este fichero entero.
 * 2. Configuración del proyecto → Propiedades de la secuencia de comandos:
 *    `WEBHOOK_SECRET` = el mismo valor que `GOOGLE_SHEETS_WEBHOOK_SECRET` en Vercel.
 * 3. Implementar → Gestionar implementaciones → editar la implementación web → «Nueva versión»
 *    (ejecutar como: yo; acceso: cualquier usuario). La URL no cambia.
 */

/** La pestaña donde van los leads; si no existe, la primera. */
var HOJA = "Leads";

/**
 * Qué cabecera de la hoja recibe cada campo del lead, en el orden en que se crean las que
 * falten. Las diez primeras son las que la hoja ya tenía.
 */
var COLUMNAS = [
  ["Create Date", "createdAt"],
  ["First Name", "firstName"],
  ["Last Name", "lastName"],
  ["Email", "email"],
  ["Project Type", "projectType"],
  ["Budget Range", "budget"],
  ["Message", "message"],
  ["GDPR Consent", "privacyConsent"],
  ["Original Source", "source"],
  ["Lead Status", "status"],
  ["Technology", "tech"],
  ["Timeline", "timeline"],
  ["Language", "lang"],
  ["Consent At", "consentAt"],
  ["Privacy Policy Version", "privacyPolicyVersion"],
  ["UTM Source", "utm_source"],
  ["UTM Medium", "utm_medium"],
  ["UTM Campaign", "utm_campaign"],
  ["UTM Content", "utm_content"],
  ["UTM Term", "utm_term"],
  ["Referrer", "referrer"],
  ["Landing Page", "landing_page"],
];

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    var secreto = PropertiesService.getScriptProperties().getProperty("WEBHOOK_SECRET");
    if (!secreto || body.secret !== secreto) return responder({ ok: false, error: "unauthorized" });
    if (!body.lead || typeof body.lead !== "object") {
      return responder({ ok: false, error: "invalid_lead" });
    }

    // Dos envíos a la vez no pueden pisarse la fila ni crear dos veces la misma columna.
    var candado = LockService.getScriptLock();
    candado.waitLock(10000);
    try {
      var libro = SpreadsheetApp.getActiveSpreadsheet();
      var hoja = libro.getSheetByName(HOJA) || libro.getSheets()[0];
      var valores = porCabecera(body.lead);
      var cabeceras = asegurarCabeceras(hoja, Object.keys(valores));
      hoja.appendRow(
        cabeceras.map(function (cabecera) {
          return valorSeguro(valores[cabecera]);
        })
      );
    } finally {
      candado.releaseLock();
    }
    return responder({ ok: true });
  } catch (err) {
    return responder({ ok: false, error: String(err) });
  }
}

/** El lead, con cada valor bajo el nombre de su cabecera. Lo que no se conoce conserva su clave. */
function porCabecera(lead) {
  var datos = {};
  Object.keys(lead).forEach(function (clave) {
    datos[clave] = lead[clave];
  });

  var nombre = String(datos.name || "").trim();
  var corte = nombre.indexOf(" ");
  datos.firstName = corte === -1 ? nombre : nombre.slice(0, corte);
  datos.lastName = corte === -1 ? "" : nombre.slice(corte + 1).trim();
  delete datos.name;
  datos.createdAt = new Date();
  datos.status = "New";

  var valores = {};
  var conocidas = {};
  COLUMNAS.forEach(function (par) {
    conocidas[par[1]] = true;
    if (datos[par[1]] !== undefined) valores[par[0]] = datos[par[1]];
  });
  Object.keys(datos).forEach(function (clave) {
    if (!conocidas[clave]) valores[clave] = datos[clave];
  });
  return valores;
}

/** Las cabeceras de la hoja, tras añadir al final las que falten para este lead. */
function asegurarCabeceras(hoja, necesarias) {
  var ancho = hoja.getLastColumn();
  var actuales = ancho ? hoja.getRange(1, 1, 1, ancho).getValues()[0].map(String) : [];
  var orden = COLUMNAS.map(function (par) {
    return par[0];
  });
  var nuevas = necesarias
    .filter(function (cabecera) {
      return actuales.indexOf(cabecera) === -1;
    })
    .sort(function (a, b) {
      var ia = orden.indexOf(a);
      var ib = orden.indexOf(b);
      return (ia === -1 ? orden.length : ia) - (ib === -1 ? orden.length : ib);
    });
  if (nuevas.length) {
    hoja.getRange(1, actuales.length + 1, 1, nuevas.length).setValues([nuevas]);
    actuales = actuales.concat(nuevas);
  }
  return actuales;
}

/**
 * Lo que escribe un visitante no puede acabar ejecutándose como fórmula en la hoja: un texto
 * que empieza por =, +, - o @ se guarda con un apóstrofo delante.
 */
function valorSeguro(valor) {
  if (valor === undefined || valor === null) return "";
  if (valor instanceof Date || typeof valor === "boolean" || typeof valor === "number") {
    return valor;
  }
  var texto = String(valor);
  return /^[=+\-@]/.test(texto) ? "'" + texto : texto;
}

function responder(datos) {
  return ContentService.createTextOutput(JSON.stringify(datos)).setMimeType(
    ContentService.MimeType.JSON
  );
}
