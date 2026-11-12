"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Language = "en" | "es";

const LANG_COOKIE = "lang";
const LANG_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export const translations = {
  en: {
    // Navbar
    navServices: "Mentoring",
    navAbout: "About",
    navCTA: "Let's talk",

    // Hero
    heroKeyword: "Understand and bring",
    heroTitleRest: "AI into your business, safely.",
    heroSub:
      "Your competitors already use AI, there's something new every week and you don't even know where to start. I'll guide you to build a system adapted to your business, one to one.",
    heroBtnStart: "Let's talk",
    heroBtnWork: "How we'll work",

    // Success Cases
    casesTitle1: "Projects I've ",
    casesTitle2: "worked on.",
    casesSub:
      "Real applications, in production and used by thousands of people. It's the experience behind the system we set up in your business.",
    case1Cat: "Blockchain",
    case1Title: "Firefly: IOTA & Shimmer wallet",
    case1Desc:
      "I was a senior developer on Firefly, the official IOTA and Shimmer wallet: an application that thousands of users trust to manage real digital assets, where security came before everything else.",
    case2Cat: "Virtual Reality",
    case2Title: "Numen Games: VR platform",
    case2Desc:
      "Deploying their virtual worlds was done by hand. I built them a platform so it now takes one button, with AI integrated to generate the content.",
    case3Cat: "Mobile app",
    case3Title: "Moovle: screen tourism app",
    case3Desc:
      "After trying several development teams, Moovle had a screen tourism app half built. I redesigned it and took it to the iOS and Android stores.",

    // Who guides you (home)
    whoEyebrow: "who guides you",
    whoTitle: "I'm César Peón.",
    whoText:
      "I've loved technology since my dad handed me a joystick to play pac-man instead of a dummy. In my career I've jumped between completely different projects, from Blockchain to Virtual Reality, so I know how it feels when everything changes and you have to adapt.",
    who1: "Computer engineer (Universidad de Alcalá)",
    who2: "University master's in digital transformation (UNIR)",
    who3: "Over 8 years building applications, over 4 with AI",
    whoLink: "Get to know me",
    whoImgAlt: "Portrait of César Peón",

    // Testimonials
    testTitle1: "What they say about ",
    testTitle2: "working with me.",
    testSub: "Companies that already counted on me to move their projects forward.",
    test1Quote:
      "A real pleasure working with César. He delivered an interactive web header in record time, precisely replicating the look & feel of a pre-rendered 3D video, but with real-time interactivity, complex animations, and cross-device optimization. For his attitude, drive, and commitment, a 10. It’s a delight to collaborate with someone who quickly understands what’s needed and executes it with judgment and autonomy.",
    test1Author: "David Torrico",
    test1Role: "Creative director at 3DforScience",
    test2Quote:
      "After trying several development teams, thanks to César’s work we were finally able to move our project forward. We now have an MVP that lets us close deals, and we’ll soon launch our app fully operational and with the quality we needed. Thank you.",
    test2Author: "Pedro Casado",
    test2Role: "CEO at Moovle",

    // Contact
    contactEmailBtn: "I'd rather email",
    contactLinkedinBtn: "Let's talk on LinkedIn",
    contactEmailNote: "Or write to me at",
    contactMailSubject: "First meeting about the AI mentoring",
    // Cookie banner
    cookieMessage:
      "We use cookies to improve your experience and analyze traffic. By accepting, you consent to our use of cookies.",
    cookieAccept: "Accept all",
    cookieDecline: "Decline",
    cookiePolicy: "Cookie policy",

    // Footer
    footDesc: "I guide you to understand and bring AI into your business, safely.",
    footRights: "All rights reserved.",
    footTerms: "Terms & conditions",
    footPrivacy: "Privacy policy",
    footManageCookies: "Manage cookies",
    footIncibeAlt: "INCIBE Ciberemprende seal",
    footIncibeCaption:
      "Participant in the INCIBE Emprende incubation programme. Not a certification or accreditation.",

    // Process: the 4 steps of the mentoring
    procTitle1: "How we'll ",
    procTitle2: "work.",
    procSub: "An 8-week mentoring with one 1-hour session a week.",
    proc1Title: "A free first 15-minute meeting",
    proc1Desc: "To look at your situation: how you work today and where your hours go.",
    proc2Title: "A plan adapted to your company",
    proc2Desc: "I send it to you in writing, so you know what we'll do before we start.",
    proc3Title: "We put it in motion together",
    proc3Desc: "You learn the concepts and we set up the first tools, one session a week.",
    proc4Title: "You finish with your own system",
    proc4Desc: "To build the tools your business needs.",

    // Aria labels
    ariaToggleLangToEn: "Switch to English",
    ariaToggleLangToEs: "Switch to Spanish",
    ariaOpenMenu: "Open menu",
    ariaCloseMenu: "Close menu",
    srOpensInNewTab: "(opens in new tab)",
  },
  es: {
    // Navbar
    navServices: "Mentoría",
    navAbout: "Sobre mí",
    navCTA: "Hablemos",

    // Hero
    heroKeyword: "Entiende e integra",
    heroTitleRest: "la\u00a0IA en tu negocio, de forma segura.",
    heroSub:
      "Tu competencia ya usa la IA, cada semana sale algo nuevo y no sabes ni por dónde empezar. Te acompaño a crear un sistema adaptado a tu negocio, uno a uno.",
    heroBtnStart: "Hablemos",
    heroBtnWork: "Cómo trabajaremos",

    // Success Cases
    casesTitle1: "Proyectos en los que ",
    casesTitle2: "he trabajado.",
    casesSub:
      "Aplicaciones reales, en producción y usadas por miles de personas. Es la experiencia que hay detrás del sistema que montamos en tu negocio.",
    case1Cat: "Blockchain",
    case1Title: "Firefly: wallet de IOTA y Shimmer",
    case1Desc:
      "Fui desarrollador senior en Firefly, el wallet oficial de IOTA y Shimmer: una aplicación en la que miles de usuarios confían para gestionar activos digitales reales, donde la seguridad iba por delante de todo.",
    case2Cat: "Realidad Virtual",
    case2Title: "Numen Games: plataforma VR",
    case2Desc:
      "Desplegar sus mundos virtuales se hacía a mano. Les construí una plataforma para que ahora se haga con un botón, con IA integrada para generar el contenido.",
    case3Cat: "App móvil",
    case3Title: "Moovle: app de turismo de pantalla",
    case3Desc:
      "Después de probar con varios equipos de desarrollo, Moovle tenía una app de turismo de pantalla a medio hacer. La rediseñé y la llevé hasta las tiendas de iOS y Android.",

    // Quién te acompaña (home)
    whoEyebrow: "quién te acompaña",
    whoTitle: "Soy César Peón.",
    whoText:
      "Me apasiona la tecnología desde que mi padre me daba un joystick para jugar al pac-man en lugar de un chupete. En mi carrera he saltado entre proyectos completamente distintos, de Blockchain a Realidad Virtual, así que sé lo que se siente cuando todo cambia y hay que adaptarse.",
    who1: "Ingeniero informático (Universidad de Alcalá)",
    who2: "Máster universitario en transformación digital (UNIR)",
    who3: "Más de 8 años desarrollando aplicaciones, más de 4 con IA",
    whoLink: "Conóceme mejor",
    whoImgAlt: "Retrato de César Peón",

    // Testimonials
    testTitle1: "Lo que dicen de ",
    testTitle2: "trabajar conmigo.",
    testSub: "Empresas que ya contaron conmigo para sacar adelante sus proyectos.",
    test1Quote:
      "Encantadísimo de haber trabajado con César. Ha resuelto en tiempo récord una cabecera interactiva para una web, replicando con precisión el look & feel de un vídeo 3D pre-renderizado, pero con interactividad en tiempo real, animaciones complejas y optimización para distintos dispositivos. Por su actitud, ganas y compromiso, un 10. Da gusto colaborar con alguien que entiende rápido lo que se necesita y lo ejecuta con criterio y autonomía.",
    test1Author: "David Torrico",
    test1Role: "Director creativo en 3DforScience",
    test2Quote:
      "Después de probar con varios equipos de desarrollo, por fin y gracias al trabajo de César, conseguimos avanzar en nuestro proyecto. Tenemos un MVP que nos permite ir cerrando acuerdos y pronto lanzaremos nuestra App operativa y con la calidad que necesitábamos. Gracias.",
    test2Author: "Pedro Casado",
    test2Role: "CEO de Moovle",

    // Contact
    contactEmailBtn: "Prefiero el correo",
    contactLinkedinBtn: "Hablemos por LinkedIn",
    contactEmailNote: "O escríbeme a",
    contactMailSubject: "Primera reunión sobre la mentoría de IA",
    // Cookie banner
    cookieMessage:
      "Usamos cookies para mejorar tu experiencia y analizar el tráfico. Al aceptar, consientes el uso de cookies.",
    cookieAccept: "Aceptar todo",
    cookieDecline: "Rechazar",
    cookiePolicy: "Política de cookies",

    // Footer
    footDesc: "Te acompaño a entender e integrar la IA en tu negocio, de forma segura.",
    footRights: "Todos los derechos reservados.",
    footTerms: "Términos y condiciones",
    footPrivacy: "Política de privacidad",
    footManageCookies: "Gestionar cookies",
    footIncibeAlt: "Sello INCIBE Ciberemprende",
    footIncibeCaption:
      "Participante en el programa de incubación INCIBE Emprende. No constituye certificación ni acreditación.",

    // Process: the 4 steps of the mentoring
    procTitle1: "Cómo ",
    procTitle2: "trabajaremos.",
    procSub: "Una mentoría de 8 semanas con una sesión de 1 hora semanal.",
    proc1Title: "Primera reunión de 15 minutos gratuita",
    proc1Desc: "Para analizar tu situación: cómo trabajáis hoy y dónde se os van las horas.",
    proc2Title: "Un plan adaptado a tu empresa",
    proc2Desc: "Te lo envío por escrito, para que sepas qué vamos a hacer antes de empezar.",
    proc3Title: "Lo ponemos en marcha juntos",
    proc3Desc:
      "Aprendes los conceptos y montamos las primeras herramientas, una sesión a la semana.",
    proc4Title: "Terminas con un sistema propio",
    proc4Desc: "Para crear las herramientas que tu negocio necesita.",

    // Aria labels
    ariaToggleLangToEn: "Cambiar a inglés",
    ariaToggleLangToEs: "Cambiar a español",
    ariaOpenMenu: "Abrir menú",
    ariaCloseMenu: "Cerrar menú",
    srOpensInNewTab: "(abre en nueva pestaña)",
  },
};

export type Translations = typeof translations.en;

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: keyof Translations) => string | React.ReactNode;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  children,
  initialLang = "es",
}: {
  children: ReactNode;
  initialLang?: Language;
}) {
  const [lang, setLang] = useState<Language>(initialLang);

  // Persist language as a cookie so the server can render <html lang> correctly on next request.
  // Also keep document.documentElement.lang in sync for current session (SR / locale-aware features).
  useEffect(() => {
    document.cookie = `${LANG_COOKIE}=${lang}; path=/; max-age=${LANG_COOKIE_MAX_AGE}; samesite=lax`;
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: keyof Translations) => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
