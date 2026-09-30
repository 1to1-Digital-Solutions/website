import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  LEAD_LABELS,
  LEAD_OPTIONS,
  PRIVACY_POLICY_VERSION,
  type LeadField,
  type LeadValue,
} from "@/content/lead-options";
import { priceGuide } from "@/content/pricing";
import { ATTRIBUTION_KEYS, type Attribution } from "@/lib/attribution";
import { crmConfigured, sendToCrm } from "@/lib/crm";

export const runtime = "nodejs";

type Lang = "es" | "en";

/** Los desplegables son opcionales: si faltan quedan en `undefined`, si traen algo raro se rechaza. */
type Choices = { [F in LeadField]?: LeadValue<F> };

type Lead = Choices & {
  name: string;
  email: string;
  message: string;
  privacy: true;
  lang: Lang;
  attribution: Attribution;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_MAX_TRACKED_IPS = 1000;
const MAX_BODY_BYTES = 16_384; // 16 KB — generous for a short form
const MAX_ATTRIBUTION_LEN = 200;

// El correo a César va siempre en castellano; `lang` le dice en qué idioma contestar.
// Al lead no se le manda nada automático: la primera respuesta, con la horquilla, es manual.
const INTERNAL_LABELS = LEAD_LABELS.es;

const FIELD_NAMES: Record<LeadField, string> = {
  projectType: "Qué necesita",
  tech: "Tecnología",
  timeline: "Cuándo empezar",
  source: "Cómo nos conoció",
};

// In-memory rate limit. Per-instance on Vercel (acceptable for low-volume marketing site).
// Migrate to Vercel KV / Upstash if abuse seen — tracked in TODO.md.
const requestLog = new Map<string, number[]>();

function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

function withinRateLimit(ip: string): boolean {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;

  // Lazy GC: prune expired entries so the map can't grow unbounded.
  for (const [storedIp, timestamps] of requestLog) {
    const remaining = timestamps.filter((t) => t > cutoff);
    if (remaining.length === 0) requestLog.delete(storedIp);
    else if (remaining.length !== timestamps.length) requestLog.set(storedIp, remaining);
  }

  // Hard cap as a second safety net against memory growth.
  if (requestLog.size >= RATE_LIMIT_MAX_TRACKED_IPS && !requestLog.has(ip)) return false;

  const recent = requestLog.get(ip) ?? [];
  if (recent.length >= RATE_LIMIT_MAX) return false;
  recent.push(now);
  requestLog.set(ip, recent);
  return true;
}

function isAllowedOrigin(req: Request): boolean {
  // Build the set of expected origins lazily so env can change between deployments.
  const expected = new Set<string>();
  if (process.env.NEXT_PUBLIC_SITE_URL) expected.add(process.env.NEXT_PUBLIC_SITE_URL);
  expected.add("https://1to1digital.solutions");
  expected.add("https://www.1to1digital.solutions");
  // Preview deployments on Vercel answer on their own *.vercel.app host.
  if (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL) {
    expected.add(`https://${process.env.VERCEL_URL}`);
    if (process.env.VERCEL_BRANCH_URL) expected.add(`https://${process.env.VERCEL_BRANCH_URL}`);
  }
  if (process.env.NODE_ENV !== "production") {
    expected.add("http://localhost:3000");
    expected.add("http://127.0.0.1:3000");
  }

  const origin = req.headers.get("origin");
  if (origin) return expected.has(origin);

  // No Origin (some browsers omit it for same-origin POSTs in older specs) — fall back to Referer host check.
  const referer = req.headers.get("referer");
  if (!referer) return false;
  try {
    const refererOrigin = new URL(referer).origin;
    return expected.has(refererOrigin);
  } catch {
    return false;
  }
}

function isString(v: unknown): v is string {
  return typeof v === "string";
}

/** Un desplegable opcional: vacío o ausente vale; un valor fuera de la lista, no. */
function readChoice<F extends LeadField>(
  field: F,
  raw: unknown
): { ok: true; value?: LeadValue<F> } | { ok: false } {
  if (raw === undefined || raw === null || raw === "") return { ok: true };
  const allowed = LEAD_OPTIONS[field] as readonly string[];
  if (!isString(raw) || !allowed.includes(raw)) return { ok: false };
  return { ok: true, value: raw as LeadValue<F> };
}

/** Solo las claves conocidas, solo texto y recortado: esto lo escribe el navegador. */
function readAttributionPayload(raw: unknown): Attribution {
  if (!raw || typeof raw !== "object") return {};
  const source = raw as Record<string, unknown>;
  const clean: Attribution = {};
  for (const key of ATTRIBUTION_KEYS) {
    const value = source[key];
    if (isString(value) && value.trim()) clean[key] = value.trim().slice(0, MAX_ATTRIBUTION_LEN);
  }
  return clean;
}

function validate(input: unknown): { ok: true; lead: Lead } | { ok: false; error: string } {
  if (!input || typeof input !== "object") return { ok: false, error: "invalid_body" };
  const b = input as Record<string, unknown>;

  if (!isString(b.name) || b.name.trim().length === 0 || b.name.length > 200) {
    return { ok: false, error: "invalid_name" };
  }
  if (!isString(b.email) || !EMAIL_RE.test(b.email) || b.email.length > 320) {
    return { ok: false, error: "invalid_email" };
  }
  if (!isString(b.message) || b.message.trim().length === 0 || b.message.length > 5000) {
    return { ok: false, error: "invalid_message" };
  }
  if (b.privacy !== true) {
    return { ok: false, error: "privacy_required" };
  }

  const choices: Choices = {};
  for (const field of Object.keys(LEAD_OPTIONS) as LeadField[]) {
    const read = readChoice(field, b[field]);
    if (!read.ok) return { ok: false, error: `invalid_${field}` };
    if (read.value) (choices as Record<string, string>)[field] = read.value;
  }

  return {
    ok: true,
    lead: {
      ...choices,
      name: b.name.trim(),
      email: b.email.trim(),
      message: b.message.trim(),
      privacy: true,
      lang: b.lang === "en" ? "en" : "es",
      attribution: readAttributionPayload(b.attribution),
    },
  };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Los desplegables que el lead rellenó, con su etiqueta en castellano. */
function choiceRows(lead: Lead): [string, string][] {
  return (Object.keys(FIELD_NAMES) as LeadField[]).map((field) => {
    const value = lead[field];
    const labels = INTERNAL_LABELS[field] as Record<string, string>;
    return [FIELD_NAMES[field], value ? labels[value] : "—"];
  });
}

function attributionRows(lead: Lead): [string, string][] {
  return ATTRIBUTION_KEYS.flatMap((key) => {
    const value = lead.attribution[key];
    return value ? [[key, value] as [string, string]] : [];
  });
}

function emailHtml(lead: Lead): string {
  const row = ([label, value]: [string, string]) =>
    `<tr><td style="padding: 8px 0; color: #666; width: 160px;">${escapeHtml(label)}</td><td style="padding: 8px 0;">${escapeHtml(value)}</td></tr>`;
  const origin = attributionRows(lead);
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; padding: 24px; color: #1a1a1a;">
      <h2 style="margin: 0 0 16px; font-size: 20px;">Nuevo lead desde la landing</h2>
      <table style="border-collapse: collapse; width: 100%;">
        <tr><td style="padding: 8px 0; color: #666; width: 160px;">Nombre</td><td style="padding: 8px 0;"><strong>${escapeHtml(lead.name)}</strong></td></tr>
        <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a></td></tr>
        ${choiceRows(lead).map(row).join("")}
        <tr><td style="padding: 8px 0; color: #666;">Idioma</td><td style="padding: 8px 0;">${lead.lang}</td></tr>
      </table>
      <h3 style="margin: 24px 0 8px; font-size: 16px;">Mensaje</h3>
      <p style="margin: 0; padding: 16px; background: #f5f5f5; border-radius: 8px; white-space: pre-wrap;">${escapeHtml(lead.message)}</p>
      <h3 style="margin: 24px 0 8px; font-size: 16px;">Horquilla orientativa para tu respuesta</h3>
      ${priceGuide(lead.lang, lead.projectType, lead.tech)
        .map((p) => `<p style="margin: 0 0 8px; color: #444;">${escapeHtml(p)}</p>`)
        .join("")}
      ${
        origin.length
          ? `<h3 style="margin: 24px 0 8px; font-size: 16px;">Origen de la visita</h3><table style="border-collapse: collapse; width: 100%;">${origin.map(row).join("")}</table>`
          : ""
      }
    </div>
  `;
}

function emailText(lead: Lead): string {
  const origin = attributionRows(lead);
  return [
    "Nuevo lead desde la landing",
    "",
    `Nombre: ${lead.name}`,
    `Email: ${lead.email}`,
    ...choiceRows(lead).map(([label, value]) => `${label}: ${value}`),
    `Idioma: ${lead.lang}`,
    "",
    "Mensaje:",
    lead.message,
    "",
    "Horquilla orientativa para tu respuesta:",
    ...priceGuide(lead.lang, lead.projectType, lead.tech),
    ...(origin.length ? ["", "Origen de la visita:", ...origin.map(([k, v]) => `${k}: ${v}`)] : []),
  ].join("\n");
}

async function appendToSheet(lead: Lead, consentAt: string): Promise<void> {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const secret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;
  if (!url || !secret) {
    // Con el CRM configurado, que falte la hoja es lo esperado: es su sustituto.
    if (!crmConfigured())
      console.warn("[contact] Google Sheets webhook not configured; skipping sheet append");
    return;
  }

  const label = <F extends LeadField>(field: F) => {
    const value = lead[field];
    return value ? (INTERNAL_LABELS[field] as Record<string, string>)[value] : "";
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret,
      lead: {
        name: lead.name,
        email: lead.email,
        projectType: label("projectType"),
        message: lead.message,
        privacyConsent: lead.privacy,
        // Campos nuevos (septiembre 2026): el Apps Script tiene que tener columna para ellos.
        tech: label("tech"),
        timeline: label("timeline"),
        source: label("source"),
        lang: lead.lang,
        consentAt,
        privacyPolicyVersion: PRIVACY_POLICY_VERSION,
        ...lead.attribution,
      },
    }),
  });

  if (!res.ok) {
    throw new Error(`Sheets webhook responded ${res.status}`);
  }

  const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
  if (!data?.ok) {
    throw new Error(`Sheets webhook error: ${data?.error || "unknown"}`);
  }
}

export async function POST(request: Request) {
  // 1) Origin / Referer must match an allowed deployment.
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ ok: false, error: "forbidden_origin" }, { status: 403 });
  }

  // 2) Only accept JSON bodies.
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return NextResponse.json({ ok: false, error: "unsupported_media_type" }, { status: 415 });
  }

  // 3) Reject oversized bodies before parsing.
  const contentLength = request.headers.get("content-length");
  if (contentLength && Number.parseInt(contentLength, 10) > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "payload_too_large" }, { status: 413 });
  }

  // 4) Read raw body with an upper byte limit (Content-Length can be missing or wrong).
  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "payload_too_large" }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // 5) Honeypot: any non-whitespace content in the hidden field = bot. Silently accept + discard.
  const honeypot = (body as { website?: unknown })?.website;
  if (typeof honeypot === "string" && honeypot.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const ip = getClientIp(request);
  if (!withinRateLimit(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const validated = validate(body);
  if (!validated.ok) {
    return NextResponse.json({ ok: false, error: validated.error }, { status: 400 });
  }
  const lead = validated.lead;
  const consentAt = new Date().toISOString();

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !from || !to) {
    console.error("[contact] Missing Resend env vars");
    return NextResponse.json({ ok: false, error: "server_misconfigured" }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const projectLabel = lead.projectType
    ? INTERNAL_LABELS.projectType[lead.projectType]
    : "sin especificar";

  try {
    const [emailResult, sheetResult, crmResult] = await Promise.allSettled([
      resend.emails.send({
        from,
        to,
        replyTo: lead.email,
        subject: `Nuevo lead (${projectLabel}): ${lead.name}`,
        html: emailHtml(lead),
        text: emailText(lead),
      }),
      appendToSheet(lead, consentAt),
      sendToCrm({
        name: lead.name,
        email: lead.email,
        message: lead.message,
        lang: lead.lang,
        projectType: lead.projectType,
        tech: lead.tech,
        timeline: lead.timeline,
        heardFrom: lead.source ? INTERNAL_LABELS.source[lead.source] : undefined,
        attribution: lead.attribution,
        consentAt,
        policyVersion: PRIVACY_POLICY_VERSION,
      }),
    ]);

    // Resend reports API errors in the resolved value (`{ data: null, error }`), not by throwing.
    const emailError =
      emailResult.status === "rejected" ? emailResult.reason : emailResult.value.error;
    if (emailError) {
      console.error("[contact] Resend failed:", emailError);
      return NextResponse.json({ ok: false, error: "email_failed" }, { status: 500 });
    }

    if (sheetResult.status === "rejected") {
      // Email already sent; log but don't fail the request to the user
      console.error("[contact] Sheets append failed:", sheetResult.reason);
    }
    if (crmResult.status === "rejected") {
      // El aviso por correo ya ha salido: el lead no se pierde, pero hay que darlo de alta a mano.
      console.error("[contact] CRM ingest failed:", crmResult.reason);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json({ ok: false, error: "internal_error" }, { status: 500 });
  }
}
