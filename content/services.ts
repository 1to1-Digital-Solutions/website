import { Blocks, Glasses, LifeBuoy, Rocket, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Los servicios, en un solo sitio: la portada pinta el resumen (`summary`) y /services
 * el detalle. La oferta sigue la de LinkedIn (reordenada en septiembre de 2026): tres
 * ámbitos, que es lo que se contrata, y las tecnologías en las que estamos más metidos.
 * El streaming (OTT) queda fuera de la web a propósito (decisión de septiembre de 2026).
 */

export type ServiceSlug = "rescue" | "launch" | "digitalize" | "xr" | "web3";
export type ServiceGroup = "scope" | "tech";

type ServiceCopy = {
  title: string;
  /** Una o dos líneas: la tarjeta de la portada. */
  summary: string;
  /** Cuándo tiene sentido, contado desde la situación del cliente. */
  situation: string;
  /** Cómo lo hacemos. */
  approach: string;
  /** Lo que te llevas: entregables concretos, no beneficios. */
  deliverables: string[];
  /** Dato rápido junto al título (plazo, formato…). */
  fact?: string;
  /** La prueba: un caso real o, si no lo hay, de dónde sale lo que sabemos. */
  proof?: string;
};

export type Service = {
  slug: ServiceSlug;
  group: ServiceGroup;
  icon: LucideIcon;
  stack: string[];
  es: ServiceCopy;
  en: ServiceCopy;
};

export const SERVICES: Service[] = [
  {
    slug: "rescue",
    group: "scope",
    icon: LifeBuoy,
    stack: ["Auditoría de código", "Tests", "CI/CD", "Refactor", "Documentación"],
    es: {
      title: "Rescate de proyectos",
      summary:
        "Tu proyecto se ha quedado atascado: un proveedor que te viene dando vueltas, un equipo que no da abasto o un desarrollo hecho con IA que nadie ha revisado.",
      situation:
        "Llevas meses con un producto que no termina de salir. Puede que el proveedor con el que empezaste haya desaparecido, que tu equipo interno esté desbordado o que lo hayas levantado con IA y ahora no sepas si lo que tienes está bien hecho. Pasa mucho más de lo que parece y casi siempre tiene arreglo.",
      approach:
        "Primero auditamos lo que hay: código, infraestructura, lo que funciona y lo que se va a romper. Con eso te decimos claro qué merece la pena conservar y qué no, y cerramos por escrito un plan para llevarlo a producción. Después lo ejecutamos por fases, para que vayas viendo el avance cada semana y no el último día.",
      deliverables: [
        "Informe de auditoría con los riesgos priorizados",
        "Plan de rescate con alcance y plazos cerrados por escrito",
        "El producto estabilizado y desplegado en producción",
        "Tests y documentación para que el siguiente que lo toque no empiece de cero",
      ],
      fact: "Empieza con una auditoría",
      proof:
        "Moovle: rescatamos un MVP de turismo de pantalla a medio terminar y lo llevamos hasta las stores de iOS y Android.",
    },
    en: {
      title: "Project rescue",
      summary:
        "Your project got stuck: a vendor who keeps going in circles, a team that can't keep up, or something built with AI that nobody has reviewed.",
      situation:
        "You've spent months on a product that never quite ships. Maybe the vendor you started with disappeared, maybe your in-house team is overwhelmed, or maybe you built it with AI and now you're not sure it's done right. It happens far more often than it seems, and it can almost always be fixed.",
      approach:
        "First we audit what's there: code, infrastructure, what works and what is about to break. Then we tell you plainly what's worth keeping, and we agree in writing on a plan to take it to production. We execute it in phases, so you see progress every week instead of on the last day.",
      deliverables: [
        "Audit report with prioritised risks",
        "Rescue plan with scope and timeline agreed in writing",
        "The product stabilised and deployed to production",
        "Tests and documentation, so whoever touches it next doesn't start from scratch",
      ],
      fact: "Starts with an audit",
      proof:
        "Moovle: we rescued a half-built screen tourism MVP and took it all the way to the iOS and Android stores.",
    },
  },
  {
    slug: "launch",
    group: "scope",
    icon: Rocket,
    stack: ["Next.js", "React", "Node.js", "Supabase", "Capacitor", "Stripe"],
    es: {
      title: "Producto digital desde cero",
      summary:
        "De la idea al mercado en 6-8 semanas. Y si ya tienes un software en marcha, nos integramos en tu equipo para desarrollar con ellos.",
      situation:
        "Tienes una idea clara y necesitas un producto funcionando para validarla, enseñárselo a inversores o empezar a cobrar. O ya tienes un software en marcha y te falta un perfil senior que tire del desarrollo junto a tu equipo.",
      approach:
        "Antes de tocar código dejamos por escrito qué entra en esta fase y qué no. Lo que queda fuera no se tira: se documenta para las siguientes. Construimos web, móvil, integraciones o pasarelas de pago según lo que necesite tu producto, con entregas cada semana. Si vienes con equipo, trabajamos dentro como uno más, por horas.",
      deliverables: [
        "Alcance del MVP cerrado por escrito antes de empezar",
        "Producto desplegado en producción, en web y, si hace falta, en iOS y Android",
        "El código fuente, 100 % tuyo",
        "Soporte después del lanzamiento si lo necesitas",
      ],
      fact: "6-8 semanas",
      proof:
        "Numen Games: una plataforma para desplegar mundos virtuales en minutos, con IA integrada para generar contenido.",
    },
    en: {
      title: "Digital product from scratch",
      summary:
        "From idea to market in 6-8 weeks. And if you already have software running, we join your team and build alongside them.",
      situation:
        "You have a clear idea and need a working product to validate it, show it to investors or start charging. Or you already have software in production and you're missing a senior profile to push development forward with your team.",
      approach:
        "Before writing any code we put in writing what's in this phase and what isn't. What's left out isn't thrown away: it's documented for the next phases. We build web, mobile, integrations or payment gateways depending on what your product needs, with weekly deliveries. If you already have a team, we work inside it as one more member, by the hour.",
      deliverables: [
        "MVP scope agreed in writing before we start",
        "Product deployed to production, on the web and, if needed, on iOS and Android",
        "The source code, 100% yours",
        "Post-launch support if you need it",
      ],
      fact: "6-8 weeks",
      proof:
        "Numen Games: a platform to deploy virtual worlds in minutes, with integrated AI for content generation.",
    },
  },
  {
    slug: "digitalize",
    group: "scope",
    icon: Workflow,
    stack: ["Herramientas internas", "Automatizaciones", "Integraciones", "IA aplicada"],
    es: {
      title: "Digitalización del negocio",
      summary:
        "Miramos qué procesos te están comiendo las horas y construimos las herramientas para quitártelos de encima. Si quieres meter la IA en tu empresa y no sabes por dónde empezar, también entra aquí.",
      situation:
        "Tu empresa funciona, pero a base de Excel compartidos, partes en papel y pedidos que se pierden en un WhatsApp. Nunca es buen momento para cambiarlo. O has oído hablar de la IA, sabes que algo te podría ahorrar y no tienes claro qué.",
      approach:
        "Nos sentamos contigo a ver cómo trabajáis de verdad, paso a paso, y buscamos dónde se van las horas. Proponemos solo lo que te quite trabajo, sea una herramienta interna, una integración entre lo que ya usas o un sitio concreto donde la IA ahorra tiempo. Y lo construimos a medida, por fases, sin cambiarte la forma de trabajar de golpe.",
      deliverables: [
        "Mapa de procesos con lo que conviene digitalizar primero",
        "Herramientas a medida para tu equipo y para tus clientes",
        "Integraciones con lo que ya usas (facturación, email, hojas de cálculo)",
        "Formación para que tu equipo lo use desde el primer día",
      ],
      fact: "Por fases",
      proof:
        "Lo respalda el máster en Industria 4.0 (UNIR), centrado en la transformación digital de empresas.",
    },
    en: {
      title: "Business digitalisation",
      summary:
        "We look at which processes are eating your hours and build the tools to take them off your plate. If you want to bring AI into your company and don't know where to start, that's here too.",
      situation:
        "Your company works, but it runs on shared spreadsheets, paper forms and orders that get lost in a WhatsApp chat. It's never a good time to change it. Or you've heard about AI, you know something could save you time, and you're not sure what.",
      approach:
        "We sit down with you to see how you really work, step by step, and find where the hours go. We only propose what takes work off your plate, whether that's an internal tool, an integration between the things you already use or a specific place where AI saves time. Then we build it to measure, in phases, without changing how you work overnight.",
      deliverables: [
        "Process map with what's worth digitalising first",
        "Custom tools for your team and for your customers",
        "Integrations with what you already use (invoicing, email, spreadsheets)",
        "Training so your team uses it from day one",
      ],
      fact: "In phases",
      proof:
        "Backed by a master's degree in Industry 4.0 (UNIR), focused on the digital transformation of companies.",
    },
  },
  {
    slug: "xr",
    group: "tech",
    icon: Glasses,
    stack: ["WebXR", "Three.js", "React Three Fiber", "WebGL", "WebGPU"],
    es: {
      title: "Realidad mixta en el navegador",
      summary:
        "Diseño 3D y entornos inmersivos dentro del navegador, sin ninguna instalación: se abre desde un enlace, como una web.",
      situation:
        "Quieres enseñar un producto, un espacio o una experiencia de una forma que no se olvide: un configurador 3D, una visita virtual, una formación inmersiva o un juego. Y no quieres que tu cliente tenga que descargarse una app para verlo.",
      approach:
        "Lo construimos con tecnologías web (WebXR, Three.js, React Three Fiber), así que funciona en el móvil, en el ordenador y en visores como Meta Quest desde el mismo enlace. Cuidamos el rendimiento desde el principio, porque en 3D una experiencia lenta no se usa.",
      deliverables: [
        "Experiencia 3D o de realidad virtual y aumentada accesible desde un enlace",
        "Funcionamiento en móvil, escritorio y visores",
        "Rendimiento optimizado para cada dispositivo",
      ],
      fact: "Sin instalar nada",
      proof:
        "3DforScience: una cabecera web interactiva que replica un vídeo 3D prerrenderizado, en tiempo real.",
    },
    en: {
      title: "Mixed reality in the browser",
      summary:
        "3D design and immersive environments inside the browser, with nothing to install: it opens from a link, like a website.",
      situation:
        "You want to show a product, a space or an experience in a way people remember: a 3D configurator, a virtual tour, immersive training or a game. And you don't want your customer to download an app to see it.",
      approach:
        "We build it with web technologies (WebXR, Three.js, React Three Fiber), so it runs on phones, desktops and headsets like Meta Quest from the same link. We take care of performance from the start, because in 3D a slow experience doesn't get used.",
      deliverables: [
        "3D, virtual or augmented reality experience reachable from a link",
        "Works on mobile, desktop and headsets",
        "Performance tuned for each device",
      ],
      fact: "Nothing to install",
      proof:
        "3DforScience: an interactive web header that replicates a pre-rendered 3D video, in real time.",
    },
  },
  {
    slug: "web3",
    group: "tech",
    icon: Blocks,
    stack: ["Smart contracts", "dApps", "Wallets", "IOTA", "EVM"],
    es: {
      title: "Web3 y blockchain",
      summary:
        "Trazabilidad para demostrar de dónde viene un producto, tokenización de activos reales y aplicaciones descentralizadas, que no dependen de una sola empresa.",
      situation:
        "Necesitas demostrar el origen de lo que vendes, dividir un activo real (un inmueble, una cosecha) en partes que se puedan vender y seguir, o construir una aplicación que no dependa de un único servidor. Y quieres a alguien que haya trabajado donde un error cuesta dinero de verdad.",
      approach:
        "Empezamos por ver si blockchain aporta algo a tu caso, porque muchas veces no hace falta. Si aporta, diseñamos los contratos y la aplicación con la seguridad por delante y una experiencia de uso que no obligue a tu cliente a saber qué es una wallet.",
      deliverables: [
        "Smart contracts revisados y probados",
        "Aplicación web conectada a la cadena",
        "Integración de wallets y pagos",
      ],
      fact: "3 años en cripto",
      proof:
        "Firefly: el wallet oficial de IOTA y Shimmer, donde durante años construimos funcionalidades críticas para miles de usuarios con activos reales.",
    },
    en: {
      title: "Web3 and blockchain",
      summary:
        "Traceability to prove where a product comes from, tokenisation of real-world assets and decentralised applications that don't depend on a single company.",
      situation:
        "You need to prove the origin of what you sell, split a real asset (a property, a harvest) into parts that can be sold and tracked, or build an application that doesn't depend on a single server. And you want someone who has worked where a mistake costs real money.",
      approach:
        "We start by checking whether blockchain actually adds something to your case, because often it doesn't. If it does, we design the contracts and the application with security first and a user experience that doesn't require your customer to know what a wallet is.",
      deliverables: [
        "Reviewed and tested smart contracts",
        "Web application connected to the chain",
        "Wallet and payment integration",
      ],
      fact: "3 years in crypto",
      proof:
        "Firefly: the official IOTA and Shimmer wallet, where for years we shipped critical features for thousands of users managing real assets.",
    },
  },
];

export const servicesByGroup = (group: ServiceGroup) => SERVICES.filter((s) => s.group === group);

type ServicesPageCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title1: string;
  title2: string;
  intro: string;
  scopeTitle: string;
  scopeSub: string;
  techTitle: string;
  techSub: string;
  situationLabel: string;
  approachLabel: string;
  deliverablesLabel: string;
  proofLabel: string;
  serviceCta: string;
  modelTitle: string;
  model: { title: string; text: string }[];
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
  ctaAbout: string;
  /** Portada: enlace de cada tarjeta y botón al detalle. */
  cardLink: string;
  allServices: string;
  techRowTitle: string;
};

export const SERVICES_PAGE: Record<"es" | "en", ServicesPageCopy> = {
  es: {
    metaTitle: "Servicios",
    metaDescription:
      "Rescate de proyectos, productos digitales desde cero en 6-8 semanas y digitalización de negocios. Especialistas en realidad mixta en el navegador y Web3.",
    eyebrow: "Servicios",
    title1: "Lo que ",
    title2: "hacemos.",
    intro:
      "Tres tipos de encargo y dos tecnologías en las que estamos más metidos. En todos hablas directo con quien construye y el alcance se cierra por escrito antes de empezar.",
    scopeTitle: "Qué podemos hacer por ti",
    scopeSub: "Lo que se contrata, según en qué punto esté tu proyecto.",
    techTitle: "Las tecnologías en las que estamos más metidos",
    techSub: "Cuando tu proyecto necesita algo más que una web o una app al uso.",
    situationLabel: "Cuándo tiene sentido",
    approachLabel: "Cómo lo hacemos",
    deliverablesLabel: "Qué te llevas",
    proofLabel: "Lo hemos hecho",
    serviceCta: "Cuéntanos tu caso",
    modelTitle: "Cómo trabajamos",
    model: [
      {
        title: "La primera asesoría es gratuita",
        text: "Nos cuentas tu caso en una llamada, preparamos un presupuesto detallado y lo revisamos juntos antes de arrancar.",
      },
      {
        title: "Alcance cerrado por escrito",
        text: "Antes de empezar queda claro qué entra en esta fase y qué no. Lo que queda fuera se documenta para las siguientes.",
      },
      {
        title: "Precio por hitos o por horas",
        text: "Proyecto cerrado con pagos por hitos, o tarifa por horas si nos integramos en tu equipo. Lo elegimos según tu caso.",
      },
      {
        title: "El código es tuyo",
        text: "Al terminar y con el pago final, toda la propiedad intelectual y el código fuente pasan a ser tuyos, al 100 %.",
      },
    ],
    ctaTitle: "¿Tienes un proyecto que merece la pena construir bien?",
    ctaText: "Cuéntanos en qué punto está y te decimos cómo lo haríamos. Sin compromiso.",
    ctaButton: "Hablemos",
    ctaAbout: "Quién está detrás",
    cardLink: "Ver detalle",
    allServices: "Ver todos los servicios en detalle",
    techRowTitle: "Y las tecnologías en las que estamos más metidos",
  },
  en: {
    metaTitle: "Services",
    metaDescription:
      "Project rescue, digital products from scratch in 6-8 weeks and business digitalisation. Specialists in browser-based mixed reality and Web3.",
    eyebrow: "Services",
    title1: "What we ",
    title2: "do.",
    intro:
      "Three kinds of engagement and two technologies we know inside out. In all of them you talk directly to whoever builds it, and scope is agreed in writing before we start.",
    scopeTitle: "What we can do for you",
    scopeSub: "What you hire us for, depending on where your project stands.",
    techTitle: "The technologies we know inside out",
    techSub: "When your project needs more than an ordinary website or app.",
    situationLabel: "When it makes sense",
    approachLabel: "How we do it",
    deliverablesLabel: "What you get",
    proofLabel: "We've done it",
    serviceCta: "Tell us about your case",
    modelTitle: "How we work",
    model: [
      {
        title: "The first consultation is free",
        text: "You tell us about your case on a call, we prepare a detailed quote and review it together before we start.",
      },
      {
        title: "Scope agreed in writing",
        text: "Before we start it's clear what's in this phase and what isn't. Whatever is left out gets documented for the next ones.",
      },
      {
        title: "Milestone or hourly pricing",
        text: "A fixed project paid by milestones, or an hourly rate if we join your team. We pick what fits your case.",
      },
      {
        title: "The code is yours",
        text: "Upon completion and final payment, all intellectual property and source code become yours, 100%.",
      },
    ],
    ctaTitle: "Got a project worth building properly?",
    ctaText: "Tell us where it stands and we'll tell you how we'd do it. No commitment.",
    ctaButton: "Let's talk",
    ctaAbout: "Who's behind it",
    cardLink: "See details",
    allServices: "See all services in detail",
    techRowTitle: "And the technologies we know inside out",
  },
};
