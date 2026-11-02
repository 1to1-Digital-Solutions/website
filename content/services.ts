/**
 * The service, in one place: the home page renders the summary and /services the detail.
 * Since November 2026 there is a single offer: an 8-week mentoring programme to understand
 * and bring AI into the client's business safely. Source of truth: the brand context of
 * 02/11/2026 and César's LinkedIn profile (headline, banner and About section). The English
 * copy is a faithful translation of the Spanish one. One public price: 1.900 € + IVA, paid in
 * two halves (at signing and after the fourth session).
 */

type Step = { title: string; text: string };
type Outcome = { title: string; text: string };
type Price = {
  title: string;
  amount: string;
  tax: string;
  includes: string;
  payment: string;
};

/** The price, as a number, for structured data. One single price for everyone. */
export const PRICE_EUR = 1900;

type MentorshipCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title1: string;
  title2: string;
  intro: string;
  /** Quick facts next to the title. */
  facts: string[];
  forWhoTitle: string;
  forWho: string[];
  stepsTitle: string;
  steps: Step[];
  outcomesTitle: string;
  outcomes: Outcome[];
  price: Price;
  proofTitle: string;
  proofIntro: string;
  proofs: Step[];
  waveTitle: string;
  wave: string;
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
  ctaAbout: string;
  /** Home page block. */
  homeTitle1: string;
  homeTitle2: string;
  homeSub: string;
  homeLink: string;
};

export const MENTORSHIP: Record<"es" | "en", MentorshipCopy> = {
  es: {
    metaTitle: "Mentoría de IA para tu negocio",
    metaDescription:
      "Mentoría de 8 semanas para pymes y autónomos: entiende e integra la IA en tu negocio de forma segura y termina con un sistema propio para crear tus herramientas sin depender de nadie.",
    eyebrow: "La mentoría",
    title1: "Entiende e integra la IA ",
    title2: "en tu negocio.",
    intro:
      "Te acompaño durante 8 semanas, con una sesión de 1 hora a la semana, a entender qué está pasando con la IA y a integrarla en tu negocio de forma segura. Terminas con un sistema adaptado a tu empresa para crear tus propias herramientas sin depender de nadie.",
    facts: [
      "8 semanas",
      "1 sesión de 1 hora a la semana",
      "Primera reunión gratis",
      "1.900 € + IVA",
    ],
    forWhoTitle: "¿Para quién es?",
    forWho: [
      "Autónomos y pymes de 1 a 50 empleados, sin perfil tecnológico interno, que llevan años con el mismo sistema de trabajo y sienten que la IA va más rápido de lo que pueden seguir.",
      "Ves cómo tu competencia ya usa la IA y no sabes ni por dónde empezar. Cada semana sale una noticia nueva, todo tu círculo habla de inteligencia artificial y mientras tanto hay tareas manuales que le siguen comiendo horas a tu gente.",
    ],
    stepsTitle: "¿Cómo trabajaremos?",
    steps: [
      {
        title: "Una primera reunión de 15 minutos, gratis",
        text: "Para analizar tu situación: cómo trabajáis hoy y dónde se os van las horas.",
      },
      {
        title: "Un plan adaptado a tu empresa",
        text: "Te lo envío por escrito, para que sepas qué vamos a hacer antes de empezar.",
      },
      {
        title: "Lo ponemos en marcha juntos",
        text: "Aprendes los conceptos y montamos las primeras herramientas, una sesión a la semana.",
      },
      {
        title: "Terminas con un sistema propio",
        text: "Para crear tus aplicaciones sin depender de nadie.",
      },
    ],
    outcomesTitle: "Qué te llevas",
    outcomes: [
      {
        title: "Entender lo que está pasando",
        text: "Qué es la IA, qué está ocurriendo y cómo afecta a tu empresa.",
      },
      {
        title: "Formación para ti y tu equipo",
        text: "Tu equipo también aprende a trabajar con la IA en su día a día y a adaptarse a los cambios que vayan llegando, no solo tú.",
      },
      {
        title: "Una política de uso seguro de la IA",
        text: "Por escrito y adaptada a tu empresa: qué herramientas se usan, con qué datos y cómo, para que nadie ponga en riesgo la información de tu negocio ni la de tus clientes.",
      },
      {
        title: "Un sistema seguro, verificado por un ingeniero",
        text: "Montado y adaptado a tu empresa, para que construyas tus propias herramientas (o mejores las que ya tienes) explicándolas con tus palabras.",
      },
      {
        title: "Las primeras herramientas ya funcionando",
        text: "Automatizaciones, herramientas internas o integraciones con lo que ya usas, con su documentación.",
      },
      {
        title: "Hablas directamente conmigo",
        text: "Sin intermediarios, durante toda la mentoría.",
      },
    ],
    price: {
      title: "Precio",
      amount: "1.900 €",
      tax: "+ IVA",
      includes:
        "El mismo precio para todos e incluye todo lo anterior: las 8 sesiones, el plan, el sistema, las primeras herramientas, la formación del equipo y la política de uso seguro.",
      payment:
        "En 2 pagos de 950 €: la mitad al firmar y la otra mitad a mitad de la mentoría, después de la cuarta sesión.",
    },
    proofTitle: "Lo que ya he hecho por otras empresas",
    proofIntro:
      "Antes de la mentoría he pasado años convirtiendo procesos anticuados en herramientas. Algunos ejemplos:",
    proofs: [
      {
        title: "NFConnect",
        text: "Cobraban con un Word y una transferencia bancaria. Les construí una pasarela de pago.",
      },
      {
        title: "Numen Games",
        text: "Desplegar sus mundos virtuales se hacía a mano. Ahora es una plataforma y se hace con un botón.",
      },
      {
        title: "Clínicas dentales",
        text: "Mi primer trabajo: el software para gestionar los pedidos entre clínica y laboratorio, con sus estados y sus roles.",
      },
    ],
    waveTitle: "¿Por qué ahora?",
    wave: "El mejor momento para adaptarse era hace un año, cuando empezó la ola de la IA. El segundo mejor momento es ahora, que estamos en la cresta. Si esperas a mañana, puede que la ola ya te haya arrastrado a la orilla.",
    ctaTitle: "¿Hacemos esa primera llamada?",
    ctaText:
      "Escríbeme y buscamos un hueco para la reunión de 15 minutos. Es gratis y te sirve para ver por dónde empezar.",
    ctaButton: "Escríbeme",
    ctaAbout: "Quién soy",
    homeTitle1: "Una mentoría de ",
    homeTitle2: "8 semanas.",
    homeSub:
      "Una sesión de 1 hora a la semana para entender e integrar la IA en tu negocio de forma segura.",
    homeLink: "Ver la mentoría en detalle",
  },
  en: {
    metaTitle: "AI mentoring for your business",
    metaDescription:
      "An 8-week mentoring programme for small businesses and freelancers: understand and bring AI into your business safely, and finish with your own system to build your tools without depending on anyone.",
    eyebrow: "The mentoring",
    title1: "Understand and bring AI ",
    title2: "into your business.",
    intro:
      "I'll guide you for 8 weeks, with one 1-hour session a week, to understand what's happening with AI and bring it into your business safely. You finish with a system adapted to your company to build your own tools without depending on anyone.",
    facts: ["8 weeks", "One 1-hour session a week", "First meeting free", "€1,900 + VAT"],
    forWhoTitle: "Who is it for?",
    forWho: [
      "Freelancers and small businesses with 1 to 50 employees, with no in-house tech profile, that have used the same way of working for years and feel AI is moving faster than they can keep up.",
      "You see your competitors already using AI and you don't even know where to start. Every week there's new news, everyone around you is talking about artificial intelligence, and meanwhile there are manual tasks still eating up your people's hours.",
    ],
    stepsTitle: "How will we work?",
    steps: [
      {
        title: "A first 15-minute meeting, free",
        text: "To look at your situation: how you work today and where your hours go.",
      },
      {
        title: "A plan adapted to your company",
        text: "I send it to you in writing, so you know what we'll do before we start.",
      },
      {
        title: "We put it in motion together",
        text: "You learn the concepts and we set up the first tools, one session a week.",
      },
      {
        title: "You finish with your own system",
        text: "To build your applications without depending on anyone.",
      },
    ],
    outcomesTitle: "What you take away",
    outcomes: [
      {
        title: "Understanding what's going on",
        text: "What AI is, what's happening and how it affects your company.",
      },
      {
        title: "Training for you and your team",
        text: "Your team learns to work with AI in their day to day and to adapt to the changes as they come, not just you.",
      },
      {
        title: "A policy for using AI safely",
        text: "In writing and adapted to your company: which tools are used, with what data and how, so nobody puts your business's information or your clients' at risk.",
      },
      {
        title: "A safe system, verified by an engineer",
        text: "Set up and adapted to your company, so you can build your own tools (or improve the ones you already have) by describing them in your own words.",
      },
      {
        title: "The first tools already working",
        text: "Automations, internal tools or integrations with what you already use, with their documentation.",
      },
      {
        title: "You talk directly to me",
        text: "No middlemen, for the whole mentoring.",
      },
    ],
    price: {
      title: "Price",
      amount: "€1,900",
      tax: "+ VAT",
      includes:
        "The same price for everyone, and it includes everything above: the 8 sessions, the plan, the system, the first tools, the team training and the safe use policy.",
      payment:
        "In 2 payments of €950: half when we sign and the other half halfway through the mentoring, after the fourth session.",
    },
    proofTitle: "What I've already done for other companies",
    proofIntro:
      "Before the mentoring I spent years turning outdated processes into tools. Some examples:",
    proofs: [
      {
        title: "NFConnect",
        text: "They took payments with a Word document and a bank transfer. I built them a payment gateway.",
      },
      {
        title: "Numen Games",
        text: "Deploying their virtual worlds was done by hand. Now it's a platform and it takes one button.",
      },
      {
        title: "Dental clinics",
        text: "My first job: the software to manage orders between clinic and lab, with their statuses and roles.",
      },
    ],
    waveTitle: "Why now?",
    wave: "The best time to adapt was a year ago, when the AI wave started. The second best time is now, while we're on the crest. If you wait until tomorrow, the wave may already have dragged you to the shore.",
    ctaTitle: "Shall we have that first call?",
    ctaText:
      "Write to me and we'll find a slot for the 15-minute meeting. It's free and it helps you see where to start.",
    ctaButton: "Write to me",
    ctaAbout: "Who I am",
    homeTitle1: "An ",
    homeTitle2: "8-week mentoring.",
    homeSub: "One 1-hour session a week to understand and bring AI into your business safely.",
    homeLink: "See the mentoring in detail",
  },
};
