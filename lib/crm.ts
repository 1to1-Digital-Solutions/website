import { createHash, createHmac } from "node:crypto";

/**
 * El envío de un lead al CRM propio (`POST /api/leads`), firmado.
 *
 * El CRM no se fía de un secreto en el cuerpo: cada fuente firma `${timestamp}.${cuerpo}` con
 * HMAC-SHA256 y su secreto, y manda una `Idempotency-Key`. La clave sale del contenido del
 * envío, así que quien reintenta el formulario porque algo falló no deja dos leads.
 *
 * El lead se guarda en tres sitios a la vez y ninguno depende de otro: el correo de aviso, la
 * hoja de Google y el CRM. Sin `CRM_URL` o sin `CRM_SECRET_LANDING` este envío se salta.
 */

export type CrmLead = {
  name: string;
  email: string;
  message: string;
  lang: "es" | "en";
  projectType?: string;
  tech?: string;
  timeline?: string;
  /** Cómo nos conoció, según el desplegable del formulario. */
  heardFrom?: string;
  attribution: Partial<Record<string, string>>;
  consentAt: string;
  policyVersion: string;
};

/** Deja sitio al arranque en frío de la base del CRM sin colgar el formulario. */
const TIMEOUT_MS = 4_000;
/** Un reintento corto: el aviso por correo ya ha salido y el formulario no puede colgarse. */
const ATTEMPTS = 2;

export function crmPayload(lead: CrmLead) {
  const a = lead.attribution;
  return {
    person: { name: lead.name, email: lead.email, lang: lead.lang },
    opportunity: {
      scope: lead.projectType,
      tech: lead.tech,
      timeline: lead.timeline,
      message: lead.message,
    },
    source: {
      utmSource: a.utm_source,
      utmMedium: a.utm_medium,
      utmCampaign: a.utm_campaign,
      utmContent: a.utm_content,
      utmTerm: a.utm_term,
      referrer: a.referrer,
      landingPage: a.landing_page,
    },
    consent: { at: lead.consentAt, policyVersion: lead.policyVersion, medium: "formulario web" },
    activity: {
      type: "form",
      summary: lead.heardFrom
        ? `${lead.message}\n\nNos conoció por: ${lead.heardFrom}`
        : lead.message,
      at: lead.consentAt,
    },
  };
}

/** La misma persona con el mismo mensaje es el mismo envío, lo mande las veces que lo mande. */
export function idempotencyKey(lead: Pick<CrmLead, "email" | "message">): string {
  return createHash("sha256").update(`${lead.email.toLowerCase()}\n${lead.message}`).digest("hex");
}

export function sign(secret: string, timestamp: string, body: string): string {
  return `sha256=${createHmac("sha256", secret).update(`${timestamp}.${body}`).digest("hex")}`;
}

/** Manda el lead al CRM. Lanza si el CRM no lo acepta tras los reintentos. */
export async function sendToCrm(lead: CrmLead, fetcher: typeof fetch = fetch): Promise<void> {
  const url = process.env.CRM_URL;
  const secret = process.env.CRM_SECRET_LANDING;
  if (!url || !secret) return;

  const body = JSON.stringify(crmPayload(lead));
  const key = idempotencyKey(lead);
  let lastError: unknown;
  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    const timestamp = String(Date.now());
    try {
      const res = await fetcher(new URL("/api/leads", url), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Crm-Source": "landing",
          "X-Crm-Timestamp": timestamp,
          "X-Crm-Signature": sign(secret, timestamp, body),
          "Idempotency-Key": key,
        },
        body,
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      if (res.ok) return;
      lastError = new Error(`CRM responded ${res.status}`);
      // Un 4xx no se arregla reintentando: el cuerpo o la firma están mal.
      if (res.status < 500) break;
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}
