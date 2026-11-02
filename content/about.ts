/**
 * Copy for /about. First person, like the rest of the site since November 2026. It comes from
 * César's final LinkedIn About section (November 2026) and the brand context of 02/11/2026;
 * if something changes there, it changes here too. English is a faithful translation.
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
      "Soy César Peón, ingeniero informático con más de 8 años de experiencia en desarrollo de software. Acompaño a empresas y autónomos a entender e integrar la IA en su negocio de forma segura.",
    eyebrow: "Sobre mí",
    title1: "Hola, soy ",
    title2: "César.",
    intro:
      "Soy ingeniero informático, con más de 8 años de experiencia en desarrollo de software y un máster de transformación digital. Acompaño a empresas y autónomos a entender e integrar la inteligencia artificial en su negocio de forma segura.",
    stats: [
      { value: "+8 años", label: "de experiencia en desarrollo de software" },
      { value: "+4 años", label: "desarrollando software con IA" },
      { value: "8 semanas", label: "de mentoría, una sesión a la semana" },
    ],
    pathTitle: "De dónde vengo",
    path: [
      {
        title: "Desde pequeñito",
        text: "Soy un apasionado de la tecnología desde que mi padre me daba un joystick para jugar al pac-man en lugar de un chupete. Estudié Ingeniería Informática en la Universidad de Alcalá.",
      },
      {
        title: "Todos los roles",
        text: "Pasé 7 años en empresa privada, de junior a desarrollador senior. Mi primer trabajo fue el software de pedidos entre clínicas dentales y laboratorios, con sus estados y sus roles.",
      },
      {
        title: "La última tecnología",
        text: "He trabajado en proyectos desde Blockchain, en el wallet oficial de IOTA, hasta Realidad Virtual, con los 13 juegos de Numen Games. Y por supuesto, con Inteligencia Artificial desde sus inicios.",
      },
      {
        title: "1to1 Digital Solutions",
        text: "Desde agosto de 2025 trabajo por mi cuenta y en abril de 2026 constituí la empresa. Tengo un máster de transformación digital (Industria 4.0, UNIR) y he participado en el programa de incubación INCIBE Emprende.",
      },
    ],
    howTitle: "Cómo trabajaremos",
    how: [
      "Una mentoría de 8 semanas con una sesión de 1 hora semanal. Empezamos con una reunión de 15 minutos, gratis, para analizar tu situación, y con eso desarrollo un plan adaptado a tu empresa.",
      "Después lo ponemos en marcha juntos: aprendes los conceptos y montamos las primeras herramientas. Terminas con un sistema propio para crear tus aplicaciones sin depender de nadie. Y hablas conmigo directamente, sin intermediarios.",
    ],
    whyTitle: "Por qué lo hago",
    why: [
      'En los eventos de networking lo que más me piden es "quiero usar la IA y no sé de qué va". Cuanto más avanza la IA, más complicado es que una empresa se pueda adaptar por sí sola.',
      "Yo también tuve que aprender lo que no dominaba, las ventas y el marketing, de la mano de profesionales que sabían más que yo. Ahora me toca a mí acompañar a otros. Lo que me motiva es adaptarme cada vez a un nuevo cliente, en un nuevo entorno.",
      "También soy scout, runner y me encantan los juegos de mesa, pero esto no creo que sirva para tu negocio (o sí, quién sabe).",
    ],
    ctaTitle: "¿Hacemos esa primera llamada?",
    ctaText:
      "Escríbeme y buscamos un hueco para la reunión de 15 minutos. Es gratis y vemos juntos tu situación.",
    ctaButton: "Escríbeme",
    ctaServices: "Ver la mentoría",
    imgAlt: "Retrato de César Peón, fundador de 1to1 Digital Solutions",
  },
  en: {
    metaTitle: "About",
    metaDescription:
      "I'm César Peón, a computer engineer with over 8 years of experience in software development. I guide companies and freelancers to understand and bring AI into their business safely.",
    eyebrow: "About",
    title1: "Hi, I'm ",
    title2: "César.",
    intro:
      "I'm a computer engineer with over 8 years of experience in software development and a master's degree in digital transformation. I guide companies and freelancers to understand and bring artificial intelligence into their business safely.",
    stats: [
      { value: "8+ years", label: "of experience in software development" },
      { value: "4+ years", label: "building software with AI" },
      { value: "8 weeks", label: "of mentoring, one session a week" },
    ],
    pathTitle: "Where I come from",
    path: [
      {
        title: "Since I was little",
        text: "I've loved technology ever since my dad gave me a joystick to play pac-man instead of a dummy. I studied Computer Engineering at the University of Alcalá.",
      },
      {
        title: "Every role",
        text: "I spent 7 years in private companies, from junior to senior developer. My first job was the ordering software between dental clinics and labs, with their statuses and roles.",
      },
      {
        title: "The latest technology",
        text: "I've worked on projects from Blockchain, on the official IOTA wallet, to Virtual Reality, with the 13 games of Numen Games. And of course, with Artificial Intelligence since its beginnings.",
      },
      {
        title: "1to1 Digital Solutions",
        text: "I've worked on my own since August 2025, and in April 2026 I incorporated the company. I hold a master's degree in digital transformation (Industry 4.0, UNIR) and took part in the INCIBE Emprende incubation programme.",
      },
    ],
    howTitle: "How we'll work",
    how: [
      "An 8-week mentoring with one 1-hour session a week. We start with a free 15-minute meeting to look at your situation, and from there I put together a plan adapted to your company.",
      "Then we put it in motion together: you learn the concepts and we set up the first tools. You finish with your own system to build your applications without depending on anyone. And you talk to me directly, with no middlemen.",
    ],
    whyTitle: "Why I do it",
    why: [
      "At networking events, what people ask me for most is \"I want to use AI and I don't know what it's about\". The further AI goes, the harder it is for a company to adapt on its own.",
      "I also had to learn what I didn't know, sales and marketing, from professionals who knew more than me. Now it's my turn to guide others. What motivates me is adapting every time to a new client, in a new setting.",
      "I'm also a scout and a runner, and I love board games, but I don't think that helps your business (or maybe it does, who knows).",
    ],
    ctaTitle: "Shall we have that first call?",
    ctaText:
      "Write to me and we'll find a slot for the 15-minute meeting. It's free and we'll look at your situation together.",
    ctaButton: "Write to me",
    ctaServices: "See the mentoring",
    imgAlt: "Portrait of César Peón, founder of 1to1 Digital Solutions",
  },
};
