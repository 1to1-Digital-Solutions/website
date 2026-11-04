/**
 * Copy for /about. First person, like the rest of the site since November 2026. It comes from
 * César's final LinkedIn About section (November 2026) and the brand context of 02/11/2026;
 * if something changes there, it changes here too. English is a faithful translation.
 */

type Stat = { value: string; label: string };
type Milestone = { title: string; text: string };
type Product = { title: string; category: string; text: string; url: string };

type AboutCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title1: string;
  title2: string;
  intro: string[];
  stats: Stat[];
  pathTitle: string;
  path: Milestone[];
  whyTitle: string;
  why: string[];
  productsTitle: string;
  productsSub: string;
  githubText: string;
  githubPersonal: string;
  githubCompany: string;
  products: Product[];
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
    intro: [
      "Soy ingeniero informático, con más de 8 años de experiencia en desarrollo de software y un máster de transformación digital. Me apasiona la tecnología desde pequeñito, cuando mi padre me daba un joystick para jugar al pac-man en lugar de un chupete.",
      "He trabajado en proyectos con la última tecnología, desde Blockchain hasta Realidad Virtual, y por supuesto con Inteligencia Artificial desde sus inicios.",
      "También soy scout, runner y me encantan los juegos de mesa, pero esto no creo que sirva para tu negocio (o sí, quién sabe).",
    ],
    stats: [
      { value: "+8 años", label: "de experiencia en desarrollo de software" },
      { value: "+4 años", label: "desarrollando software con IA" },
    ],
    pathTitle: "De dónde vengo",
    path: [
      {
        title: "Ingeniería Informática",
        text: "Estudié Ingeniería Informática en la Universidad de Alcalá.",
      },
      {
        title: "De becario a senior",
        text: "Empecé con unas prácticas y pasé a junior en una empresa de software de gestión para clínicas dentales. Después trabajé como middle en una gran consultora, en proyectos de banca y seguros, y luego 3 años como senior en una startup crypto, en proyectos de alto riesgo con criptomonedas.",
      },
      {
        title: "Por mi cuenta",
        text: "En agosto de 2025 decidí embarcarme solo. Como autónomo he desarrollado aplicaciones OTT de streaming, de Realidad Virtual, aplicaciones nativas de móvil y proyectos de transformación digital para empresas.",
      },
      {
        title: "1to1 Digital Solutions",
        text: "En abril de 2026 monté mi propia empresa para dedicarme solo a esto. En la era de la IA tiene más valor que una empresa pueda desarrollar su propio software que depender de alguien externo que no conoce su negocio por dentro. Tengo un máster de transformación digital (Industria 4.0, UNIR) y he participado en el programa de incubación INCIBE Emprende.",
      },
    ],
    whyTitle: "Por qué lo hago",
    why: [
      "La IA está cambiando la industria del software y la está haciendo accesible a todos. Cada vez tiene menos sentido depender de software de terceros: se ha democratizado tanto que cualquiera puede crear el suyo propio.",
      "Pero me encuentro con que no se hace bien. Faltan las bases de software necesarias, y el desarrollo lo guía lo que va recomendando la propia IA, sin una persona que dirija esas respuestas.",
      "Bien usada, la inteligencia artificial tiene un potencial enorme. Pero si te dejas guiar por el camino que ella te marca, te lleva a donde ella quiere ir, no a donde quieres ir tú.",
    ],
    productsTitle: "Desarrollos propios",
    productsSub: "También construyo y mantengo desarrollos propios.",
    githubText: "Puedes encontrar más en mi GitHub y en el de la empresa.",
    githubPersonal: "Mi GitHub",
    githubCompany: "GitHub de 1to1",
    products: [
      {
        title: "Hoy Entreno",
        category: "Fitness",
        text: "Un plan de fuerza y running hecho para cada persona, con registro de entrenos, uso sin conexión y app para relojes Garmin.",
        url: "https://hoy-entreno.app/",
      },
      {
        title: "Scoura",
        category: "Newsletters",
        text: "Newsletters personalizadas que la IA investiga, contrasta, verifica y redacta.",
        url: "https://scoura.app/",
      },
    ],
    ctaTitle: "¿Hacemos esa primera llamada?",
    ctaText:
      "Escríbeme por LinkedIn y buscamos un hueco para la reunión de 15 minutos. Es gratis y vemos juntos tu situación.",
    ctaButton: "Hablemos",
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
    intro: [
      "I'm a computer engineer with over 8 years of experience in software development and a master's degree in digital transformation. I've loved technology since I was little, when my dad gave me a joystick to play pac-man instead of a dummy.",
      "I've worked on projects with the latest technology, from Blockchain to Virtual Reality, and of course with Artificial Intelligence since its beginnings.",
      "I'm also a scout, a runner and I love board games, but I don't think that helps your business (or maybe it does, who knows).",
    ],
    stats: [
      { value: "8+ years", label: "of experience in software development" },
      { value: "4+ years", label: "building software with AI" },
    ],
    pathTitle: "Where I come from",
    path: [
      {
        title: "Computer Engineering",
        text: "I studied Computer Engineering at the University of Alcalá.",
      },
      {
        title: "From intern to senior",
        text: "I started with an internship and moved up to junior at a company making management software for dental clinics. Then I worked as a mid-level developer at a large consultancy, on banking and insurance projects, and then 3 years as a senior at a crypto startup, on high-risk cryptocurrency projects.",
      },
      {
        title: "On my own",
        text: "In August 2025 I decided to go solo. As a freelancer I've built OTT streaming apps, Virtual Reality apps, native mobile apps and digital transformation projects for companies.",
      },
      {
        title: "1to1 Digital Solutions",
        text: "In April 2026 I set up my own company to focus only on this. In the age of AI it's worth more for a company to be able to build its own software than to depend on someone external who doesn't know its business from the inside. I hold a master's degree in digital transformation (Industry 4.0, UNIR) and took part in the INCIBE Emprende incubation programme.",
      },
    ],
    whyTitle: "Why I do it",
    why: [
      "AI is changing the software industry and making it accessible to everyone. It makes less and less sense to depend on third-party software: it has become so democratised that anyone can build their own.",
      "But I find it isn't done well. The necessary software foundations are missing, and development is driven by whatever the AI itself keeps recommending, with no person steering those answers.",
      "Used well, artificial intelligence has huge potential. But if you let yourself be guided down the path it sets, it takes you where it wants to go, not where you want to go.",
    ],
    productsTitle: "My own developments",
    productsSub: "I also build and run developments of my own.",
    githubText: "You can find more on my GitHub and on the company's.",
    githubPersonal: "My GitHub",
    githubCompany: "1to1 GitHub",
    products: [
      {
        title: "Hoy Entreno",
        category: "Fitness",
        text: "A strength and running plan made for each person, with workout logging, offline use and an app for Garmin watches.",
        url: "https://hoy-entreno.app/",
      },
      {
        title: "Scoura",
        category: "Newsletters",
        text: "Personalised newsletters that AI researches, cross-checks, fact-checks and writes.",
        url: "https://scoura.app/",
      },
    ],
    ctaTitle: "Shall we have that first call?",
    ctaText:
      "Message me on LinkedIn and we'll find a slot for the 15-minute meeting. It's free and we'll look at your situation together.",
    ctaButton: "Let's talk",
    ctaServices: "See the mentoring",
    imgAlt: "Portrait of César Peón, founder of 1to1 Digital Solutions",
  },
};
