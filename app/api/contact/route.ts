import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const PROJECT_TYPES = ["mvp", "rescue", "blockchain", "xr"] as const;
const BUDGETS = ["<5", "5-10", "10-15", "15-20", "20-30", ">30"] as const;

const PROJECT_TYPE_LABELS: Record<(typeof PROJECT_TYPES)[number], string> = {
  mvp: "MVP Development",
  rescue: "Tech Rescue",
  blockchain: "Blockchain / Web3",
  xr: "XR / Mixed Reality",
};

const BUDGET_LABELS: Record<(typeof BUDGETS)[number], string> = {
  "<5": "< 5k €",
  "5-10": "5k – 10k €",
  "10-15": "10k – 15k €",
  "15-20": "15k – 20k €",
  "20-30": "20k – 30k €",
  ">30": "> 30k €",
};

type Lead = {
  name: string;
  email: string;
  projectType: (typeof PROJECT_TYPES)[number];
  budget: (typeof BUDGETS)[number];
  message: string;
  privacy: boolean;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;
const requestLog = new Map<string, number[]>();

function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

function withinRateLimit(ip: string): boolean {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  const recent = (requestLog.get(ip) || []).filter((t) => t > cutoff);
  if (recent.length >= RATE_LIMIT_MAX) return false;
  recent.push(now);
  requestLog.set(ip, recent);
  return true;
}

function isString(v: unknown): v is string {
  return typeof v === "string";
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
  if (!isString(b.projectType) || !PROJECT_TYPES.includes(b.projectType as never)) {
    return { ok: false, error: "invalid_project_type" };
  }
  if (!isString(b.budget) || !BUDGETS.includes(b.budget as never)) {
    return { ok: false, error: "invalid_budget" };
  }
  if (!isString(b.message) || b.message.trim().length === 0 || b.message.length > 5000) {
    return { ok: false, error: "invalid_message" };
  }
  if (b.privacy !== true) {
    return { ok: false, error: "privacy_required" };
  }

  return {
    ok: true,
    lead: {
      name: b.name.trim(),
      email: b.email.trim(),
      projectType: b.projectType as Lead["projectType"],
      budget: b.budget as Lead["budget"],
      message: b.message.trim(),
      privacy: true,
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

function emailHtml(lead: Lead): string {
  const projectLabel = PROJECT_TYPE_LABELS[lead.projectType];
  const budgetLabel = BUDGET_LABELS[lead.budget];
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; padding: 24px; color: #1a1a1a;">
      <h2 style="margin: 0 0 16px; font-size: 20px;">Nuevo lead desde la landing</h2>
      <table style="border-collapse: collapse; width: 100%;">
        <tr><td style="padding: 8px 0; color: #666; width: 140px;">Nombre</td><td style="padding: 8px 0;"><strong>${escapeHtml(lead.name)}</strong></td></tr>
        <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a></td></tr>
        <tr><td style="padding: 8px 0; color: #666;">Tipo de proyecto</td><td style="padding: 8px 0;">${escapeHtml(projectLabel)}</td></tr>
        <tr><td style="padding: 8px 0; color: #666;">Presupuesto</td><td style="padding: 8px 0;">${escapeHtml(budgetLabel)}</td></tr>
      </table>
      <h3 style="margin: 24px 0 8px; font-size: 16px;">Mensaje</h3>
      <p style="margin: 0; padding: 16px; background: #f5f5f5; border-radius: 8px; white-space: pre-wrap;">${escapeHtml(lead.message)}</p>
    </div>
  `;
}

function emailText(lead: Lead): string {
  return [
    "Nuevo lead desde la landing",
    "",
    `Nombre:    ${lead.name}`,
    `Email:     ${lead.email}`,
    `Proyecto:  ${PROJECT_TYPE_LABELS[lead.projectType]}`,
    `Budget:    ${BUDGET_LABELS[lead.budget]}`,
    "",
    "Mensaje:",
    lead.message,
  ].join("\n");
}

async function appendToSheet(lead: Lead): Promise<void> {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const secret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;
  if (!url || !secret) {
    console.warn("[contact] Google Sheets webhook not configured; skipping sheet append");
    return;
  }

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret,
      lead: {
        name: lead.name,
        email: lead.email,
        projectType: PROJECT_TYPE_LABELS[lead.projectType],
        budget: BUDGET_LABELS[lead.budget],
        message: lead.message,
        privacyConsent: lead.privacy,
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
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: if filled, silently accept and discard
  if ((body as { website?: string })?.website) {
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

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !from || !to) {
    console.error("[contact] Missing Resend env vars");
    return NextResponse.json({ ok: false, error: "server_misconfigured" }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  try {
    const [emailResult, _sheetResult] = await Promise.allSettled([
      resend.emails.send({
        from,
        to,
        replyTo: validated.lead.email,
        subject: `Nuevo lead: ${PROJECT_TYPE_LABELS[validated.lead.projectType]} — ${validated.lead.name}`,
        html: emailHtml(validated.lead),
        text: emailText(validated.lead),
      }),
      appendToSheet(validated.lead),
    ]);

    if (emailResult.status === "rejected") {
      console.error("[contact] Resend failed:", emailResult.reason);
      return NextResponse.json({ ok: false, error: "email_failed" }, { status: 500 });
    }

    if (_sheetResult.status === "rejected") {
      // Email already sent; log but don't fail the request to the user
      console.error("[contact] Sheets append failed:", _sheetResult.reason);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json({ ok: false, error: "internal_error" }, { status: 500 });
  }
}
