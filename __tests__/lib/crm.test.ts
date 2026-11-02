/**
 * @jest-environment node
 */
import { createHmac } from "node:crypto";
import { crmPayload, idempotencyKey, sendToCrm, sign, type CrmLead } from "@/lib/crm";

const lead: CrmLead = {
  name: "Ana Pérez",
  email: "Ana@Example.com",
  message: "Quiero digitalizar los partes de trabajo.",
  lang: "es",
  projectType: "digitalize",
  timeline: "1m",
  heardFrom: "LinkedIn",
  attribution: { utm_source: "linkedin", landing_page: "/services" },
  consentAt: "2026-09-30T10:00:00.000Z",
  policyVersion: "2026-09",
};

const ok = () => Promise.resolve(new Response("{}", { status: 201 }));

beforeEach(() => {
  process.env.CRM_URL = "https://crm.example.com";
  process.env.CRM_SECRET_LANDING = "secreto-de-prueba";
});

test("sin CRM configurado no se llama a nada", async () => {
  delete process.env.CRM_URL;
  const fetcher = jest.fn(ok);
  await sendToCrm(lead, fetcher);
  expect(fetcher).not.toHaveBeenCalled();
});

test("el envío va firmado sobre timestamp y cuerpo, con clave de idempotencia", async () => {
  const fetcher = jest.fn(ok);
  await sendToCrm(lead, fetcher);
  const [url, init] = fetcher.mock.calls[0] as unknown as [URL, RequestInit];
  expect(String(url)).toBe("https://crm.example.com/api/leads");
  const headers = init.headers as Record<string, string>;
  const expected = createHmac("sha256", "secreto-de-prueba")
    .update(`${headers["X-Crm-Timestamp"]}.${init.body}`)
    .digest("hex");
  expect(headers["X-Crm-Signature"]).toBe(`sha256=${expected}`);
  expect(headers["X-Crm-Source"]).toBe("landing");
  expect(headers["Idempotency-Key"]).toBe(idempotencyKey(lead));
  expect(sign("secreto-de-prueba", "1", "{}")).toMatch(/^sha256=[0-9a-f]{64}$/);
});

test("el cuerpo lleva persona, oportunidad, origen, consentimiento y la actividad del formulario", () => {
  const p = crmPayload(lead);
  expect(p.person).toEqual({ name: "Ana Pérez", email: "Ana@Example.com", lang: "es" });
  expect(p.opportunity.scope).toBe("digitalize");
  expect(p.source.utmSource).toBe("linkedin");
  expect(p.source.landingPage).toBe("/services");
  expect(p.consent).toEqual({
    at: lead.consentAt,
    policyVersion: "2026-09",
    medium: "formulario web",
  });
  expect(p.activity.summary).toContain("Nos conoció por: LinkedIn");
});

test("reintentar el mismo formulario da la misma clave, aunque cambien las mayúsculas del correo", () => {
  expect(idempotencyKey(lead)).toBe(idempotencyKey({ ...lead, email: "ana@example.com" }));
  expect(idempotencyKey(lead)).not.toBe(idempotencyKey({ ...lead, message: "Otro mensaje" }));
});

test("un fallo del servidor se reintenta una vez; un rechazo del cuerpo, no", async () => {
  const caido = jest.fn(() => Promise.resolve(new Response("", { status: 503 })));
  await expect(sendToCrm(lead, caido)).rejects.toThrow("503");
  expect(caido).toHaveBeenCalledTimes(2);

  const rechazado = jest.fn(() => Promise.resolve(new Response("", { status: 422 })));
  await expect(sendToCrm(lead, rechazado)).rejects.toThrow("422");
  expect(rechazado).toHaveBeenCalledTimes(1);
});
