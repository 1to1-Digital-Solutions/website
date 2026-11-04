/**
 * Home page copy for the StoryBrand order (November 2026): stakes (what the client risks by
 * doing nothing), the explanatory paragraph and the closing call to action. Everything here
 * is built from what César already wrote (LinkedIn About, /services, /about) and is pending
 * his review. No figures, no invented cases. English is a faithful translation.
 */

type Item = { title: string; text: string };

type HomeCopy = {
  stakesEyebrow: string;
  stakesTitle1: string;
  stakesTitle2: string;
  stakes: Item[];
  stakesWave: string;
  whoEmpathy: string;
  planLink: string;
  explainEyebrow: string;
  explainTitle1: string;
  explainTitle2: string;
  explain: string[];
  ctaEyebrow: string;
  ctaTitle1: string;
  ctaTitle2: string;
  ctaSub: string;
  ctaGuarantee: string;
  footNav: string;
  footContact: string;
};

export const HOME: Record<"es" | "en", HomeCopy> = {
  es: {
    stakesEyebrow: "Lo que te juegas",
    stakesTitle1: "¿Y si lo dejas ",
    stakesTitle2: "para más adelante?",
    stakes: [
      {
        title: "Tu competencia se adelanta",
        text: "Mientras esperas el momento perfecto, otros negocios como el tuyo ya trabajan con la IA y llegan antes a tus clientes.",
      },
      {
        title: "Las horas se siguen yendo",
        text: "Las tareas manuales y repetitivas les siguen comiendo horas a ti y a tu gente, semana tras semana.",
      },
      {
        title: "Tus datos, en riesgo",
        text: "Si tu equipo ya usa la IA por su cuenta, sin unas reglas claras, la información de tu negocio y la de tus clientes puede acabar donde no debe.",
      },
      {
        title: "Dependes de otros",
        text: "Cada cambio pasa por alguien externo, o acabas pagando herramientas que no encajan con cómo trabajas.",
      },
    ],
    stakesWave:
      "El mejor momento para adaptarse era hace un año, cuando empezó la ola de la IA. El segundo mejor momento es ahora.",
    whoEmpathy:
      "Sé lo que es sentir que la IA va más rápido de lo que puedes seguir. En los eventos de networking es lo que más me piden: «quiero usar la IA y no sé de qué va».",
    planLink: "Ver la mentoría en detalle",
    explainEyebrow: "En pocas palabras",
    explainTitle1: "Tu negocio, ",
    explainTitle2: "preparado para la IA.",
    explain: [
      "Llevas años sacando adelante tu negocio con un sistema de trabajo que funciona. Pero la IA ha cambiado las reglas, cada semana sale algo nuevo y no sabes por dónde empezar ni en qué herramientas confiar. Ves que tu competencia ya la usa y que tu equipo la prueba por su cuenta, sin saber qué datos puede meter en cada herramienta.",
      "En 8 semanas, con una sesión online a la semana, entiendes qué está pasando con la IA y la integras en tu negocio de forma segura. Creamos, uno a uno, un sistema adaptado a cómo trabaja tu empresa, tu equipo aprende a usarlo y tenéis por escrito qué se puede hacer con la IA y qué no.",
      "Al terminar, el control es tuyo. Tienes tus primeras herramientas funcionando, sabes crear las siguientes con tus palabras y no dependes de nadie externo para seguir avanzando con la IA.",
    ],
    ctaEyebrow: "La primera reunión es gratis",
    ctaTitle1: "La IA no va a esperar ",
    ctaTitle2: "a que encuentres el momento.",
    ctaSub:
      "Escríbeme por LinkedIn y en una primera reunión de 15 minutos vemos por dónde empezar en tu negocio. Es gratis y no te compromete a nada.",
    ctaGuarantee:
      "Y si empiezas y después de la segunda sesión ves que no te está sirviendo, te devuelvo íntegro lo que hayas pagado.",
    footNav: "Navegación",
    footContact: "Contacto",
  },
  en: {
    stakesEyebrow: "What's at stake",
    stakesTitle1: "What if you leave it ",
    stakesTitle2: "for later?",
    stakes: [
      {
        title: "Your competitors get ahead",
        text: "While you wait for the perfect moment, other businesses like yours already work with AI and reach your clients first.",
      },
      {
        title: "The hours keep slipping away",
        text: "Manual, repetitive tasks keep eating hours from you and your people, week after week.",
      },
      {
        title: "Your data, at risk",
        text: "If your team already uses AI on their own, without clear rules, your business's information and your clients' can end up where it shouldn't.",
      },
      {
        title: "You depend on others",
        text: "Every change goes through someone external, or you end up paying for tools that don't fit the way you work.",
      },
    ],
    stakesWave:
      "The best time to adapt was a year ago, when the AI wave began. The second best time is now.",
    whoEmpathy:
      "I know what it's like to feel AI moves faster than you can keep up with. At networking events it's what people ask me most: \"I want to use AI and I don't know what it's about\".",
    planLink: "See the mentoring in detail",
    explainEyebrow: "In a few words",
    explainTitle1: "Your business, ",
    explainTitle2: "ready for AI.",
    explain: [
      "You've spent years running your business with a way of working that works. But AI has changed the rules, something new comes out every week and you don't know where to start or which tools to trust. You see your competitors already using it and your team trying it on their own, without knowing what data they can put into each tool.",
      "In 8 weeks, with one online session a week, you understand what's happening with AI and bring it into your business safely. We create, one to one, a system adapted to the way your company works, your team learns to use it and you have in writing what can and can't be done with AI.",
      "When it ends, the control is yours. You have your first tools working, you know how to create the next ones in your own words and you don't depend on anyone external to keep moving forward with AI.",
    ],
    ctaEyebrow: "The first meeting is free",
    ctaTitle1: "AI won't wait ",
    ctaTitle2: "for you to find the right moment.",
    ctaSub:
      "Message me on LinkedIn and in a first 15-minute meeting we'll see where to start in your business. It's free and commits you to nothing.",
    ctaGuarantee:
      "And if you start and after the second session you see it isn't helping you, I'll refund everything you've paid in full.",
    footNav: "Navigation",
    footContact: "Contact",
  },
};
