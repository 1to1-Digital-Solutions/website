/**
 * Textos de /about. Primera persona: es la página de César, no la del estudio. Salen de su
 * Acerca de de LinkedIn (v6, septiembre de 2026) y de `linkedin/contexto/00_marca_comun.md`;
 * si cambia algo allí, se cambia aquí.
 */

type Stat = { value: string; label: string };
type Milestone = { title: string; text: string };

type AboutCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title1: string;
  title2: string;
  intro: string;
  stats: Stat[];
  pathTitle: string;
  path: Milestone[];
  howTitle: string;
  how: string[];
  whyTitle: string;
  why: string[];
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
  ctaServices: string;
  imgAlt: string;
};

export const ABOUT: Record<"es" | "en", AboutCopy> = {
  es: {
    metaTitle: "Sobre mí",
    metaDescription:
      "Soy César Peón, fundador de 1to1 Digital Solutions. Más de 8 años construyendo software, 3 de ellos en blockchain. Rescato proyectos atascados, lanzo productos desde cero y digitalizo negocios.",
    eyebrow: "Sobre mí",
    title1: "Hola, soy ",
    title2: "César.",
    intro:
      "Dirijo 1to1 Digital Solutions y construyo software a medida para empresas y emprendedores. Llevo más de 8 años en desarrollo y he pasado por todos los roles, de junior a montar mi propia empresa.",
    stats: [
      { value: "+8 años", label: "construyendo software en producción" },
      { value: "3 años", label: "en proyectos blockchain" },
      { value: "10 proyectos", label: "entregados a 5 clientes en 9 meses" },
    ],
    pathTitle: "De dónde vengo",
    path: [
      {
        title: "Todo el stack",
        text: "Empecé como junior y fui pasando por middle, senior y autónomo. Por el camino he tocado front, back, bases de datos, devops e infraestructura, que es lo que ahora me deja ver un proyecto entero y no solo su parte.",
      },
      {
        title: "IOTA · wallet oficial",
        text: "Fui senior developer en Firefly, el wallet oficial de IOTA y Shimmer. Tres años en cripto, en un entorno donde un error no era una incidencia sino una fuga de capital. Esa exigencia es la que llevo a cada proyecto.",
      },
      {
        title: "Realidad mixta",
        text: "Para Numen Games construí una plataforma que despliega mundos virtuales en minutos, con Three.js e IA para generar el contenido, y para 3DforScience una cabecera web interactiva que replica un vídeo 3D en tiempo real.",
      },
      {
        title: "1to1 Digital Solutions",
        text: "Desde agosto de 2025 trabajo con mis propios clientes y en abril de 2026 constituí la empresa. He participado en el programa de incubación INCIBE Emprende y tengo un máster en Industria 4.0 por la UNIR.",
      },
    ],
    howTitle: "Cómo trabajo",
    how: [
      "Me involucro en tu proyecto desde dentro: tu negocio, analizando tus usuarios, tu contexto, tu forma de trabajar. Construyo exactamente lo que acordamos, sin desaparecer a mitad del camino, y lo vamos haciendo paso a paso para que tú tengas el control en todo momento.",
      "El alcance se cierra por escrito antes de empezar, con lo que entra y lo que no. Vas viendo el producto por fases y no el último día. Y hablas conmigo directamente, sin intermediarios. Cuando terminamos, el código es tuyo al 100 %.",
    ],
    whyTitle: "Por qué lo hago",
    why: [
      "Creo que el futuro pasa por la realidad mixta y por blockchain, y no como una predicción lejana: es algo que ya se puede construir hoy. Llevo años formándome en esas tecnologías y desarrollando mis propias soluciones en ese terreno.",
      "Mientras esa visión madura, ayudo a otros a construir las suyas. Cada proyecto de un cliente me hace mejor en los míos, y trato cada línea de código como si el producto fuera mío.",
    ],
    ctaTitle: "¿Tienes un proyecto que merece la pena construir bien?",
    ctaText:
      "La primera asesoría es gratuita. Me cuentas tu caso, preparo un presupuesto detallado, lo revisamos juntos y arrancamos.",
    ctaButton: "Hablemos",
    ctaServices: "Ver servicios",
    imgAlt: "Retrato de César Peón, fundador de 1to1 Digital Solutions",
  },
  en: {
    metaTitle: "About",
    metaDescription:
      "I'm César Peón, founder of 1to1 Digital Solutions. Over 8 years building software, 3 of them in blockchain. I rescue stuck projects, launch products from scratch and digitalise businesses.",
    eyebrow: "About",
    title1: "Hi, I'm ",
    title2: "César.",
    intro:
      "I run 1to1 Digital Solutions and build custom software for companies and founders. I've been in software development for over 8 years and I've been through every role, from junior to starting my own company.",
    stats: [
      { value: "8+ years", label: "building software in production" },
      { value: "3 years", label: "on blockchain projects" },
      { value: "10 projects", label: "delivered to 5 clients in 9 months" },
    ],
    pathTitle: "Where I come from",
    path: [
      {
        title: "The whole stack",
        text: "I started as a junior and moved through mid, senior and freelance. Along the way I've worked on front end, back end, databases, devops and infrastructure, which is what lets me see a whole project now and not just my part of it.",
      },
      {
        title: "IOTA · official wallet",
        text: "I was a senior developer on Firefly, the official IOTA and Shimmer wallet. Three years in crypto, in an environment where a bug wasn't an incident but a capital leak. That standard is what I bring to every project.",
      },
      {
        title: "Mixed reality",
        text: "For Numen Games I built a platform that deploys virtual worlds in minutes, with Three.js and AI to generate the content, and for 3DforScience an interactive web header that replicates a 3D video in real time.",
      },
      {
        title: "1to1 Digital Solutions",
        text: "Since August 2025 I've been working with my own clients, and in April 2026 I incorporated the company. I took part in the INCIBE Emprende incubation programme and hold a master's degree in Industry 4.0 from UNIR.",
      },
    ],
    howTitle: "How I work",
    how: [
      "I get involved in your project from the inside: your business, your users, your context, the way you work. I build exactly what we agreed, without disappearing halfway through, and we go step by step so you're in control the whole time.",
      "Scope is agreed in writing before we start, with what's in and what isn't. You see the product in phases, not on the last day. And you talk to me directly, with no middlemen. When we're done, the code is 100% yours.",
    ],
    whyTitle: "Why I do it",
    why: [
      "I believe the future runs through mixed reality and blockchain, and not as some distant prediction: it's something you can build today. I've spent years learning those technologies and building my own solutions with them.",
      "While that vision matures, I help others build theirs. Every client project makes me better at my own, and I treat every line of code as if the product were mine.",
    ],
    ctaTitle: "Got a project worth building properly?",
    ctaText:
      "The first consultation is free. You tell me about your case, I prepare a detailed quote, we review it together and get started.",
    ctaButton: "Let's talk",
    ctaServices: "See services",
    imgAlt: "Portrait of César Peón, founder of 1to1 Digital Solutions",
  },
};
