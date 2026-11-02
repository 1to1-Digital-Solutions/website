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
    heroTitle1: "Understand and bring AI",
    heroTitle2: "into your business, safely.",
    heroSub:
      "I'll guide you through an 8-week mentoring, one session a week, to set up a system adapted to your company and build your own tools without depending on anyone.",
    heroBtnStart: "Write to me",
    heroBtnWork: "How we'll work",

    // Success Cases
    casesTitle1: "Projects I've ",
    casesTitle2: "worked on.",
    casesSub:
      "Before the mentoring I spent years building software for other companies. This is part of that experience.",
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

    // Own products (inside the work section)
    ownTitle: "My own products",
    ownSub: "I also build and run products of my own.",
    own1Cat: "Fitness",
    own1Title: "Hoy Entreno",
    own1Desc:
      "A strength and running plan made for each person, with workout logging, offline use and an app for Garmin watches.",
    own2Cat: "AI",
    own2Title: "Scoura",
    own2Desc: "Personalised newsletters that AI researches, cross-checks, fact-checks and writes.",

    // Testimonials
    testTitle1: "What they say about ",
    testTitle2: "working with me.",
    testSub: "Clients from my years as a developer.",
    test1Quote:
      "A real pleasure working with César. He delivered an interactive web header in record time, precisely replicating the look & feel of a pre-rendered 3D video, but with real-time interactivity, complex animations, and cross-device optimization. For his attitude, drive, and commitment, a 10. It’s a delight to collaborate with someone who quickly understands what’s needed and executes it with judgment and autonomy.",
    test1Author: "David Torrico",
    test1Role: "Creative director at 3DforScience",
    test2Quote:
      "After trying several development teams, thanks to César’s work we were finally able to move our project forward. We now have an MVP that lets us close deals, and we’ll soon launch our app fully operational and with the quality we needed. Thank you.",
    test2Author: "Pedro Casado",
    test2Role: "CEO at Moovle",

    // FAQ
    faqTitle1: "Common ",
    faqTitle2: "questions.",
    faqSub: "What people usually ask me before we start.",
    faq1Q: "Do I need to know about technology?",
    faq1A:
      "No. The mentoring is designed for businesses with no in-house tech profile. We start from what you already do and I explain each concept as we use it.",
    faq2Q: "Is it for freelancers too?",
    faq2A:
      "Yes. I work with freelancers and small businesses with 1 to 50 employees. A freelancer is a business of one.",
    faq3Q: "How much does it cost?",
    faq3A:
      "€1,900 + VAT, the same for everyone. You pay it in 2 halves of €950: one when we sign and the other after the fourth session. The first 15-minute meeting is free and commits you to nothing.",
    faq4Q: "What happens when the 8 weeks are over?",
    faq4A:
      "You keep the system and the first tools, with their documentation. The idea is that from then on you can build your own tools without depending on anyone, me included.",

    // Contact
    contactTitle1: "Shall we ",
    contactTitle2: "talk?",
    contactSub:
      "Write to me by email or on LinkedIn and we'll find a slot for the first 15-minute meeting. It's free, and I usually reply within one or two working days.",
    contactEmailBtn: "Email me",
    contactLinkedinBtn: "Message me on LinkedIn",
    contactEmailNote: "Or copy my address:",
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
    proc1Title: "A first 15-minute meeting, free",
    proc1Desc: "To look at your situation: how you work today and where your hours go.",
    proc2Title: "A plan adapted to your company",
    proc2Desc: "I send it to you in writing, so you know what we'll do before we start.",
    proc3Title: "We put it in motion together",
    proc3Desc: "You learn the concepts and we set up the first tools, one session a week.",
    proc4Title: "You finish with your own system",
    proc4Desc: "To build your applications without depending on anyone.",

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
    heroTitle1: "Entiende e integra la\u00a0IA",
    heroTitle2: "en tu negocio, de forma segura.",
    heroSub:
      "Te acompaño en una mentoría de 8 semanas, una sesión a la semana, para montar un sistema adaptado a tu empresa y crear tus propias herramientas sin depender de nadie.",
    heroBtnStart: "Escríbeme",
    heroBtnWork: "Cómo trabajaremos",

    // Success Cases
    casesTitle1: "Proyectos en los que ",
    casesTitle2: "he trabajado.",
    casesSub:
      "Antes de la mentoría pasé años construyendo software para otras empresas. Esto es parte de esa experiencia.",
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

    // Productos propios (dentro de la sección de proyectos)
    ownTitle: "Productos propios",
    ownSub: "También construyo y mantengo productos propios.",
    own1Cat: "Fitness",
    own1Title: "Hoy Entreno",
    own1Desc:
      "Un plan de fuerza y running hecho para cada persona, con registro de entrenos, uso sin conexión y app para relojes Garmin.",
    own2Cat: "IA",
    own2Title: "Scoura",
    own2Desc: "Newsletters personalizadas que la IA investiga, contrasta, verifica y redacta.",

    // Testimonials
    testTitle1: "Lo que dicen de ",
    testTitle2: "trabajar conmigo.",
    testSub: "Clientes de mis años como desarrollador.",
    test1Quote:
      "Encantadísimo de haber trabajado con César. Ha resuelto en tiempo récord una cabecera interactiva para una web, replicando con precisión el look & feel de un vídeo 3D pre-renderizado, pero con interactividad en tiempo real, animaciones complejas y optimización para distintos dispositivos. Por su actitud, ganas y compromiso, un 10. Da gusto colaborar con alguien que entiende rápido lo que se necesita y lo ejecuta con criterio y autonomía.",
    test1Author: "David Torrico",
    test1Role: "Director creativo en 3DforScience",
    test2Quote:
      "Después de probar con varios equipos de desarrollo, por fin y gracias al trabajo de César, conseguimos avanzar en nuestro proyecto. Tenemos un MVP que nos permite ir cerrando acuerdos y pronto lanzaremos nuestra App operativa y con la calidad que necesitábamos. Gracias.",
    test2Author: "Pedro Casado",
    test2Role: "CEO de Moovle",

    // FAQ
    faqTitle1: "Preguntas ",
    faqTitle2: "frecuentes.",
    faqSub: "Lo que me suelen preguntar antes de empezar.",
    faq1Q: "¿Necesito saber de tecnología?",
    faq1A:
      "No. La mentoría está pensada para negocios sin perfil tecnológico interno. Partimos de lo que ya haces y te explico cada concepto según lo vamos usando.",
    faq2Q: "¿Sirve también para autónomos?",
    faq2A:
      "Sí. Trabajo con autónomos y pymes de 1 a 50 empleados. Un autónomo es un negocio de una persona.",
    faq3Q: "¿Cuánto cuesta?",
    faq3A:
      "1.900 € + IVA, el mismo precio para todos. Se paga en 2 mitades de 950 €: una al firmar y otra después de la cuarta sesión. La primera reunión de 15 minutos es gratis y no te compromete a nada.",
    faq4Q: "¿Qué pasa cuando terminan las 8 semanas?",
    faq4A:
      "Te quedas con el sistema y las primeras herramientas, con su documentación. La idea es que a partir de ahí puedas crear tus propias herramientas sin depender de nadie, tampoco de mí.",

    // Contact
    contactTitle1: "¿Lo ",
    contactTitle2: "hablamos?",
    contactSub:
      "Escríbeme por correo o por LinkedIn y buscamos un hueco para la primera reunión de 15 minutos. Es gratis y suelo responder en uno o dos días laborables.",
    contactEmailBtn: "Escríbeme un correo",
    contactLinkedinBtn: "Escríbeme por LinkedIn",
    contactEmailNote: "O copia mi dirección:",
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
    proc1Title: "Una primera reunión de 15 minutos, gratis",
    proc1Desc: "Para analizar tu situación: cómo trabajáis hoy y dónde se os van las horas.",
    proc2Title: "Un plan adaptado a tu empresa",
    proc2Desc: "Te lo envío por escrito, para que sepas qué vamos a hacer antes de empezar.",
    proc3Title: "Lo ponemos en marcha juntos",
    proc3Desc:
      "Aprendes los conceptos y montamos las primeras herramientas, una sesión a la semana.",
    proc4Title: "Terminas con un sistema propio",
    proc4Desc: "Para crear tus aplicaciones sin depender de nadie.",

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
