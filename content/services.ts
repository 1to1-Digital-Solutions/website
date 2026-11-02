/**
 * The service, in one place: the home page renders the summary and /services the detail.
 * Since November 2026 there is a single offer: an 8-week mentoring programme to understand
 * and bring AI into the client's business safely. Source of truth: the brand context of
 * 02/11/2026 and César's LinkedIn profile (headline, banner and About section). The English
 * copy is a faithful translation of the Spanish one. One public price: 2.900 € + IVA, paid in
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
  guaranteeTitle: string;
  guarantee: string;
};

/** The price, as a number, for structured data. One single price for everyone. */
export const PRICE_EUR = 2900;

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
  notForTitle: string;
  notFor: string[];
  stepsTitle: string;
  steps: Step[];
  outcomesTitle: string;
  outcomes: Outcome[];
  price: Price;
  safetyTitle: string;
  safetyIntro: string;
  safety: Step[];
  safetyNote: string;
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
  homeAudience: string;
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
      "Durante 8 semanas, con una sesión online de 1 hora a la semana, entiendes qué está pasando con la IA y la integras en tu negocio de forma segura. Creamos, uno a uno, un sistema adaptado a tu empresa, para que al terminar el control sea tuyo y no necesites a nadie externo para seguir avanzando con la IA.",
    facts: ["8 semanas", "1 sesión online de 1 hora a la semana", "Primera reunión gratis"],
    forWhoTitle: "¿Para quién es?",
    forWho: [
      "Autónomos y pymes de 1 a 50 empleados, sin perfil tecnológico interno, que llevan años con el mismo sistema de trabajo y sienten que la IA va más rápido de lo que pueden seguir.",
      "Ves cómo tu competencia ya usa la IA y no sabes ni por dónde empezar. Cada semana sale una noticia nueva, todo tu círculo habla de inteligencia artificial y mientras tanto hay tareas manuales que le siguen comiendo horas a tu gente.",
    ],
    notForTitle: "¿Para quién no es?",
    notFor: [
      "Empresas que ya tienen perfiles tecnológicos en plantilla y podrían hacer esta integración por su cuenta.",
      "Quien ya está al día de las novedades de la IA y la usa a diario en su trabajo.",
      "Quien busca que se lo hagan todo. Aquí aprendes tú, para no depender de nadie.",
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
        text: "Para crear tus aplicaciones.",
      },
    ],
    outcomesTitle: "¿Qué te llevas?",
    outcomes: [
      {
        title: "Formar parte de la revolución de la IA",
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
        text: "Montado uno a uno sobre cómo trabaja tu empresa, para que construyas tus propias herramientas (o mejores las que ya tienes) explicándolas con tus palabras.",
      },
      {
        title: "Las primeras herramientas ya funcionando",
        text: "Automatizaciones, herramientas internas o integraciones con lo que ya usas, con su documentación.",
      },
      {
        title: "El control es tuyo",
        text: "Cuando termina la mentoría no necesitas a nadie externo para seguir avanzando con la IA. El sistema y las herramientas son de tu negocio.",
      },
    ],
    price: {
      title: "Precio",
      amount: "2.900 €",
      tax: "+ IVA",
      includes:
        "Incluye todo lo anterior: las 8 sesiones, el plan, el sistema, las primeras herramientas, la formación del equipo y la política de uso seguro.",
      payment:
        "En 2 pagos de 1.450 €: la mitad al firmar y la otra mitad a mitad de la mentoría, después de la cuarta sesión.",
      guaranteeTitle: "Garantía",
      guarantee:
        "Si después de la segunda sesión no estás conforme o ves que no te está sirviendo, te devuelvo íntegro lo que hayas pagado.",
    },
    safetyTitle: "Seguridad y normativa",
    safetyIntro:
      "Usar la IA sin unas reglas claras es la forma más rápida de poner en riesgo los datos de tu negocio. Por eso la seguridad va desde la primera sesión.",
    safety: [
      {
        title: "Tus datos y los de tus clientes (RGPD)",
        text: "Decidimos qué información puede entrar en cada herramienta de IA y cuál no, para que los datos personales de tus clientes no acaben donde no deben.",
      },
      {
        title: "El Reglamento Europeo de IA",
        text: "Desde febrero de 2025 pide que quien usa la IA en una empresa tenga la formación suficiente para hacerlo. La formación del equipo y la política de uso seguro van justo en esa dirección.",
      },
      {
        title: "Herramientas revisadas por un ingeniero",
        text: "Las herramientas que vais a usar quedan bien configuradas: quién tiene acceso, a qué datos y dónde se guardan.",
      },
    ],
    safetyNote:
      "No es asesoramiento legal. Si tu sector tiene requisitos propios, los tenemos en cuenta junto con tu asesor.",
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
      "Escríbeme por LinkedIn y buscamos un hueco para la reunión de 15 minutos. Es gratis y te sirve para ver por dónde empezar.",
    ctaButton: "Hablemos",
    ctaAbout: "Quién soy",
    homeTitle1: "La IA en tu negocio, ",
    homeTitle2: "bajo tu control.",
    homeSub:
      "De 0 a 100 en 8 semanas: entiendes la IA, la integras en tu negocio y terminas con un sistema para construir tus propias aplicaciones de forma segura.",
    homeAudience: "Para autónomos y pymes sin perfil técnico",
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
      "For 8 weeks, with one 1-hour online session a week, you understand what's happening with AI and bring it into your business safely. We build, one to one, a system adapted to your company, so that when it ends the control is yours and you don't need anyone external to keep moving forward with AI.",
    facts: ["8 weeks", "One 1-hour online session a week", "First meeting free"],
    forWhoTitle: "Who is it for?",
    forWho: [
      "Freelancers and small businesses with 1 to 50 employees, with no in-house tech profile, that have used the same way of working for years and feel AI is moving faster than they can keep up.",
      "You see your competitors already using AI and you don't even know where to start. Every week there's new news, everyone around you is talking about artificial intelligence, and meanwhile there are manual tasks still eating up your people's hours.",
    ],
    notForTitle: "Who is it not for?",
    notFor: [
      "Companies that already have tech profiles on staff and could do this integration on their own.",
      "People who already keep up with AI news and use it every day in their work.",
      "People looking for someone to do it all for them. Here you are the one who learns, so you don't depend on anyone.",
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
        text: "To build your applications.",
      },
    ],
    outcomesTitle: "What do you take away?",
    outcomes: [
      {
        title: "Being part of the AI revolution",
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
        text: "Set up one to one around how your company works, so you can build your own tools (or improve the ones you already have) by describing them in your own words.",
      },
      {
        title: "The first tools already working",
        text: "Automations, internal tools or integrations with what you already use, with their documentation.",
      },
      {
        title: "The control is yours",
        text: "When the mentoring ends you don't need anyone external to keep moving forward with AI. The system and the tools belong to your business.",
      },
    ],
    price: {
      title: "Price",
      amount: "€2,900",
      tax: "+ VAT",
      includes:
        "It includes everything above: the 8 sessions, the plan, the system, the first tools, the team training and the safe use policy.",
      payment:
        "In 2 payments of €1,450: half when we sign and the other half halfway through the mentoring, after the fourth session.",
      guaranteeTitle: "Guarantee",
      guarantee:
        "If after the second session you're not satisfied or you see it isn't helping you, I'll refund everything you've paid in full.",
    },
    safetyTitle: "Security and regulation",
    safetyIntro:
      "Using AI without clear rules is the fastest way to put your business's data at risk. That's why security is there from the first session.",
    safety: [
      {
        title: "Your data and your clients' (GDPR)",
        text: "We decide what information can go into each AI tool and what can't, so your clients' personal data doesn't end up where it shouldn't.",
      },
      {
        title: "The EU AI Act",
        text: "Since February 2025 it requires people who use AI in a company to have enough training to do so. The team training and the safe use policy go exactly in that direction.",
      },
      {
        title: "Tools reviewed by an engineer",
        text: "The tools you'll use are set up properly: who has access, to what data and where it's stored.",
      },
    ],
    safetyNote:
      "This isn't legal advice. If your sector has its own requirements, we take them into account together with your adviser.",
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
      "Message me on LinkedIn and we'll find a slot for the 15-minute meeting. It's free and it helps you see where to start.",
    ctaButton: "Let's talk",
    ctaAbout: "Who I am",
    homeTitle1: "AI in your business, ",
    homeTitle2: "under your control.",
    homeSub:
      "From 0 to 100 in 8 weeks: you understand AI, bring it into your business and finish with a system to build your own applications safely.",
    homeAudience: "For freelancers and small businesses with no tech profile",
    homeLink: "See the mentoring in detail",
  },
};
