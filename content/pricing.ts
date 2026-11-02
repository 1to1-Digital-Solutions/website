/**
 * The suggested price text for César's first reply, included in the internal notification.
 * Prices are under review since November 2026 (the mentoring replaced the old engagements),
 * so for now it carries no figures: the quote goes with the plan after the first meeting.
 * When César sets the prices, add them here (by `projectType` or `businessSize` if needed,
 * passing those from the route again).
 */

type Lang = "es" | "en";

const NO_FIGURES: Record<Lang, string> = {
  es: "El presupuesto te lo envío junto con el plan adaptado a tu empresa, después de la primera reunión de 15 minutos, que es gratis.",
  en: "I'll send you the quote together with the plan adapted to your company, after the first 15-minute meeting, which is free.",
};

/** The suggested price paragraphs for the reply, in the lead's language. */
export function priceGuide(lang: Lang): string[] {
  return [NO_FIGURES[lang]];
}
