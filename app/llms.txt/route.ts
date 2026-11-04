import { MENTORSHIP } from "@/content/services";
import { FAQ } from "@/content/faq";
import { ABOUT } from "@/content/about";
import { CONTACT_EMAIL, LINKEDIN_URL } from "@/content/contact";

const SITE_URL = "https://1to1digital.solutions";

// Built at deploy time from the same content the pages render, so it never drifts.
export const dynamic = "force-static";

/**
 * /llms.txt: a plain summary of the site for AI assistants (llmstxt.org). Spanish, like the
 * audience; the pages themselves are where the detail lives.
 */
export function GET() {
  const m = MENTORSHIP.es;
  const a = ABOUT.es;
  const faq = FAQ.es;

  const body = `# 1to1 Digital Solutions

> ${m.metaDescription}

Mentoría de IA impartida por César Peón, ingeniero informático (Universidad de Alcalá) con más de 8 años de experiencia en desarrollo de software y más de 4 desarrollando software con IA. Empresa: 1TO1 DIGITAL SOLUTIONS SL, Guadalajara (España). Las sesiones son online.

## La mentoría

- Duración: 8 semanas, una sesión online de 1 hora a la semana.
- Primera reunión de 15 minutos gratis y sin compromiso.
- Precio: ${m.price.amount} ${m.price.tax}, el mismo para todos. ${m.price.payment}
- ${m.price.guaranteeTitle}: ${m.price.guarantee}

### Para quién es
${m.forWho.map((p) => `- ${p}`).join("\n")}

### Para quién no es
${m.notFor.map((p) => `- ${p}`).join("\n")}

### Cómo se trabaja
${m.steps.map((s, i) => `${i + 1}. ${s.title}. ${s.text}`).join("\n")}

### Qué se lleva el cliente
${m.outcomes.map((o) => `- ${o.title}: ${o.text}`).join("\n")}

### ${m.safetyTitle}
${m.safety.map((s) => `- ${s.title}: ${s.text}`).join("\n")}
- ${m.safetyNote}

## Preguntas frecuentes

${faq.items.map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}

## Sobre César Peón

${a.intro.join(" ")}

## Contacto

- LinkedIn (preferido): ${LINKEDIN_URL}
- Correo: ${CONTACT_EMAIL}

## Páginas

- [Inicio](${SITE_URL}/): resumen de la mentoría, precio, proceso y preguntas frecuentes.
- [La mentoría](${SITE_URL}/services): el detalle completo, para quién es y para quién no, seguridad y normativa.
- [Sobre mí](${SITE_URL}/about): trayectoria de César Peón.
- [Términos y condiciones](${SITE_URL}/terms-conditions): condiciones de contratación de la mentoría.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
