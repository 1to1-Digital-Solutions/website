/**
 * The contact form options, shared by the form (which renders them) and by `/api/contact`
 * (which validates them and puts them in the email). The engagements and technologies are
 * the ones in `content/services.ts`. The budget is not asked: the internal notification
 * suggests an indicative price range by project type (`content/pricing.ts`).
 */

export const LEAD_OPTIONS = {
  projectType: ["rescue", "launch", "digitalize", "other"],
  tech: ["none", "xr", "web3"],
  timeline: ["now", "1m", "2-3m", "exploring"],
  source: ["linkedin", "google", "referral", "other"],
} as const;

export type LeadField = keyof typeof LEAD_OPTIONS;
export type LeadValue<F extends LeadField> = (typeof LEAD_OPTIONS)[F][number];

type Labels = { [F in LeadField]: Record<LeadValue<F>, string> };

export const LEAD_LABELS: Record<"es" | "en", Labels> = {
  es: {
    projectType: {
      rescue: "Rescatar un proyecto atascado",
      launch: "Lanzar un producto desde cero",
      digitalize: "Digitalizar mi negocio",
      other: "Otra cosa",
    },
    tech: {
      none: "Ninguna en concreto o no lo sé",
      xr: "Realidad mixta o 3D",
      web3: "Web3 o blockchain",
    },
    timeline: {
      now: "Cuanto antes",
      "1m": "En el próximo mes",
      "2-3m": "En 2 o 3 meses",
      exploring: "Solo estoy explorando",
    },
    source: {
      linkedin: "LinkedIn",
      google: "Google u otro buscador",
      referral: "Me lo recomendaron",
      other: "Otro",
    },
  },
  en: {
    projectType: {
      rescue: "Rescue a stuck project",
      launch: "Launch a product from scratch",
      digitalize: "Digitalise my business",
      other: "Something else",
    },
    tech: {
      none: "None in particular, or not sure",
      xr: "Mixed reality or 3D",
      web3: "Web3 or blockchain",
    },
    timeline: {
      now: "As soon as possible",
      "1m": "Within the next month",
      "2-3m": "In 2 or 3 months",
      exploring: "Just exploring",
    },
    source: {
      linkedin: "LinkedIn",
      google: "Google or another search engine",
      referral: "Someone recommended you",
      other: "Other",
    },
  },
};

/** Privacy policy version accepted on submit; it is stored with the record. */
export const PRIVACY_POLICY_VERSION = "2026-09";
