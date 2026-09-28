/**
 * @jest-environment node
 */
import { POST } from "@/app/api/contact/route";

const send = jest.fn();
jest.mock("resend", () => ({
  Resend: jest.fn().mockImplementation(() => ({ emails: { send } })),
}));

const ORIGIN = "https://1to1digital.solutions";

function request(body: unknown, ip: string) {
  return new Request(`${ORIGIN}/api/contact`, {
    method: "POST",
    headers: { "content-type": "application/json", origin: ORIGIN, "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

const valid = {
  name: "Ana Pérez",
  email: "ana@example.com",
  message: "Quiero digitalizar los partes de trabajo.",
  privacy: true,
  projectType: "digitalize",
  timeline: "1m",
  source: "linkedin",
  lang: "es",
  attribution: { utm_source: "linkedin", utm_campaign: "octubre", evil: "x" },
};

// Cada test con su IP: el límite de 3 envíos por minuto es por IP y vive en memoria.
let ipCounter = 0;
const nextIp = () => `10.0.0.${++ipCounter}`;

beforeEach(() => {
  send.mockReset();
  send.mockResolvedValue({ data: { id: "1" }, error: null });
  process.env.RESEND_API_KEY = "re_test";
  process.env.RESEND_FROM_EMAIL = "web@1to1digital.solutions";
  process.env.CONTACT_TO_EMAIL = "info@1to1digital.solutions";
  delete process.env.GOOGLE_SHEETS_WEBHOOK_URL;
});

test("un envío válido avisa a César, con la horquilla sugerida, y no escribe al lead", async () => {
  const res = await POST(request(valid, nextIp()));
  expect(res.status).toBe(200);
  // Solo el aviso interno: la primera respuesta al lead es manual.
  expect(send).toHaveBeenCalledTimes(1);

  const [internal] = send.mock.calls[0];
  expect(internal.to).toBe("info@1to1digital.solutions");
  expect(internal.replyTo).toBe("ana@example.com");
  expect(internal.subject).toContain("Digitalizar mi negocio");
  expect(internal.text).toContain("Cuándo empezar: En el próximo mes");
  expect(internal.text).toContain("utm_campaign: octubre");
  // Solo las claves de atribución conocidas llegan al correo.
  expect(internal.text).not.toContain("evil");
  expect(internal.text).toContain("Horquilla orientativa para tu respuesta");
  expect(internal.text).toContain("acompañamiento mensual");
});

test("sin tipo elegido sugiere la horquilla general; con Web3, el suelo de especialidad", async () => {
  const { name, email, message, privacy } = valid;
  await POST(request({ name, email, message, privacy, tech: "web3" }, nextIp()));
  const [internal] = send.mock.calls[0];
  expect(internal.text).toContain("un MVP entre 12.000 € y 25.000 €");
  expect(internal.text).toContain("parten de 15.000 €");
});

test("los desplegables son opcionales", async () => {
  const { name, email, message, privacy } = valid;
  const res = await POST(request({ name, email, message, privacy }, nextIp()));
  expect(res.status).toBe(200);
  expect(send.mock.calls[0][0].text).toContain("Qué necesita: —");
});

test("un valor que no está en la lista se rechaza", async () => {
  const res = await POST(request({ ...valid, timeline: "ayer" }, nextIp()));
  expect(res.status).toBe(400);
  expect(await res.json()).toMatchObject({ error: "invalid_timeline" });
  expect(send).not.toHaveBeenCalled();
});

test("si Resend devuelve error, el envío falla", async () => {
  // Resend no lanza: devuelve { data: null, error }.
  send.mockResolvedValueOnce({ data: null, error: { message: "domain not verified" } });
  jest.spyOn(console, "error").mockImplementation(() => {});
  const res = await POST(request(valid, nextIp()));
  expect(res.status).toBe(500);
});
