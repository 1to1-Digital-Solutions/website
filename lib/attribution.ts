/**
 * Where the visit comes from, to know which channel brings the leads. The first touch of the
 * session is kept (UTMs, referring page and landing page) and travels with the form. No
 * cookies and no external services: only sessionStorage.
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

/** Reads the current URL and referrer. A referrer from the site itself does not count as a source. */
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
      // malformed referrer: ignored
    }
  }
  found.landing_page = url.pathname.slice(0, MAX_LEN);
  return found;
}

/** Stores the first touch of the session; later ones do not overwrite it. */
export function captureAttribution(): void {
  try {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const data = readAttribution(new URL(window.location.href), document.referrer);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // sessionStorage blocked (strict private mode): the form works the same
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
