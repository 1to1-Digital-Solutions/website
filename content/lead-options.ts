/**
 * The contact form options, shared by the form (which renders them) and by `/api/contact`
 * (which validates them and puts them in the email). Since November 2026 they are aimed at
 * the mentoring client: what they want to achieve and how big their business is. The key
 * `projectType` is kept so the Google Sheet column keeps working. The budget is not asked.
 */

export const LEAD_OPTIONS = {
  projectType: ["understand", "manual", "tools", "team", "other"],
  businessSize: ["solo", "2-10", "11-50", "50+"],
  timeline: ["now", "1m", "2-3m", "exploring"],
  source: ["linkedin", "google", "referral", "other"],
} as const;

export type LeadField = keyof typeof LEAD_OPTIONS;
export type LeadValue<F extends LeadField> = (typeof LEAD_OPTIONS)[F][number];

type Labels = { [F in LeadField]: Record<LeadValue<F>, string> };

export const LEAD_LABELS: Record<"es" | "en", Labels> = {
  es: {
    projectType: {
      understand: "Entender qué puede hacer la IA por mi negocio",
      manual: "Quitarme tareas manuales que me comen horas",
      tools: "Crear mis propias herramientas",
      team: "Que mi equipo aprenda a trabajar con IA",
      other: "Otra cosa",
    },
    businessSize: {
      solo: "Soy autónomo",
      "2-10": "De 2 a 10 personas",
      "11-50": "De 11 a 50 personas",
      "50+": "Más de 50 personas",
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
      understand: "Understand what AI can do for my business",
      manual: "Get rid of manual tasks that eat up my hours",
      tools: "Build my own tools",
      team: "Have my team learn to work with AI",
      other: "Something else",
    },
    businessSize: {
      solo: "I'm a freelancer",
      "2-10": "2 to 10 people",
      "11-50": "11 to 50 people",
      "50+": "More than 50 people",
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
