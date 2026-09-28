/**
 * De dónde llega la visita, para saber qué canal trae los contactos. Se guarda el primer
 * toque de la sesión (UTM, página de procedencia y página de entrada) y viaja con el
 * formulario. Sin cookies ni servicios externos: solo sessionStorage.
 */

export const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "referrer",
  "landing_page",
] as const;

export type Attribution = Partial<Record<(typeof ATTRIBUTION_KEYS)[number], string>>;

const STORAGE_KEY = "attribution";
const MAX_LEN = 200;

/** Lee la URL y el referrer actuales. Un referrer del propio sitio no cuenta como origen. */
export function readAttribution(url: URL, referrer: string): Attribution {
  const found: Attribution = {};
  for (const key of ATTRIBUTION_KEYS) {
    const value = url.searchParams.get(key);
    if (value) found[key] = value.slice(0, MAX_LEN);
  }
  if (referrer) {
    try {
      if (new URL(referrer).host !== url.host) found.referrer = referrer.slice(0, MAX_LEN);
    } catch {
      // referrer malformado: se ignora
    }
  }
  found.landing_page = url.pathname.slice(0, MAX_LEN);
  return found;
}

/** Guarda el primer toque de la sesión; los siguientes no lo pisan. */
export function captureAttribution(): void {
  try {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const data = readAttribution(new URL(window.location.href), document.referrer);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // sessionStorage bloqueado (modo privado estricto): el formulario funciona igual
  }
}

export function storedAttribution(): Attribution {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}
