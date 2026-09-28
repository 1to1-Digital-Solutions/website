import type { LeadValue } from "@/content/lead-options";

/**
 * Las horquillas orientativas según lo que el lead eligió en el formulario. Precios de
 * septiembre de 2026. Van en el aviso a César como texto sugerido para su primera respuesta,
 * que de momento se manda a mano. No son un presupuesto: el cerrado va después de la llamada.
 */

type Lang = "es" | "en";

const BY_TYPE: Record<Lang, Record<LeadValue<"projectType">, string>> = {
  es: {
    rescue:
      "El rescate empieza por una auditoría de precio cerrado, entre 2.500 € y 4.000 € + IVA según el tamaño del proyecto. Con ella en la mano te digo cuánto costaría llevarlo a producción.",
    launch:
      "Un producto desde cero (un MVP llave en mano, de 6 a 8 semanas) suele estar entre 12.000 € y 25.000 € + IVA. Si lo que necesitas es que me integre en tu equipo, trabajo por horas, entre 75 € y 110 € + IVA la hora.",
    digitalize:
      "La digitalización va por fases. Lo habitual es un acompañamiento mensual de entre 3.000 € y 6.000 € + IVA mientras construimos las herramientas.",
    other:
      "Depende mucho del tipo de proyecto: una auditoría está entre 2.500 € y 4.000 €, un MVP entre 12.000 € y 25.000 € y el trabajo por horas entre 75 € y 110 € la hora, todo + IVA.",
  },
  en: {
    rescue:
      "A rescue starts with a fixed-price audit, between €2,500 and €4,000 + VAT depending on the size of the project. With that in hand I'll tell you what it would cost to take it to production.",
    launch:
      "A product from scratch (a turnkey MVP, 6 to 8 weeks) usually lands between €12,000 and €25,000 + VAT. If what you need is for me to join your team, I work by the hour, between €75 and €110 + VAT.",
    digitalize:
      "Digitalisation happens in phases. The usual setup is a monthly engagement of €3,000 to €6,000 + VAT while we build the tools.",
    other:
      "It depends a lot on the kind of project: an audit is €2,500 to €4,000, an MVP €12,000 to €25,000 and hourly work €75 to €110 an hour, all + VAT.",
  },
};

const SPECIALIST: Record<Lang, string> = {
  es: "Los proyectos de realidad mixta o Web3 parten de 15.000 € + IVA.",
  en: "Mixed reality and Web3 projects start at €15,000 + VAT.",
};

const DISCLAIMER: Record<Lang, string> = {
  es: "Son horquillas orientativas: el presupuesto cerrado, por escrito, te lo preparo después de la llamada, cuando entienda bien tu caso.",
  en: "These are ballpark ranges: I'll prepare a fixed quote, in writing, after our call, once I understand your case.",
};

/** Los párrafos de precio sugeridos; sin tipo elegido, la horquilla general. */
export function priceGuide(
  lang: Lang,
  projectType?: LeadValue<"projectType">,
  tech?: LeadValue<"tech">
): string[] {
  const specialist = tech === "xr" || tech === "web3" ? [SPECIALIST[lang]] : [];
  return [BY_TYPE[lang][projectType ?? "other"], ...specialist, DISCLAIMER[lang]];
}
