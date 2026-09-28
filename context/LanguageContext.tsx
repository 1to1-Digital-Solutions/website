"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Language = "en" | "es";

const LANG_COOKIE = "lang";
const LANG_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export const translations = {
  en: {
    // Navbar
    navServices: "Services",
    navAbout: "About",
    navCTA: "Let's talk",

    // Hero
    heroTitle1: "We build the tech",
    heroTitle2: "behind your idea.",
    heroSub:
      "We rescue stuck projects, launch digital products from scratch and digitalise businesses that still run on spreadsheets and paper. With a special focus on mixed reality and Web3.",
    heroBtnStart: "Start your project",
    heroBtnWork: "See our work",

    // Success Cases
    casesTitle1: "Selected ",
    casesTitle2: "work.",
    casesSub: "Real projects, real results. A glimpse of what we can build together.",
    case1Cat: "Web3",
    case1Title: "Firefly: IOTA & Shimmer wallet",
    case1Desc:
      "I was a senior developer on Firefly, the official wallet of IOTA and Shimmer. For years I shipped critical features across the IOTA ecosystem for an application that thousands of users trust to manage real digital assets: always with a focus on security, performance, and UX.",
    case2Cat: "Mixed Reality",
    case2Title: "Numen Games: VR platform",
    case2Desc:
      "I built a platform that deploys virtual worlds in minutes. The worlds themselves run on Three.js and Hyperfy, with integrated AI for dynamic content generation, so anyone can launch immersive experiences without writing code.",
    case3Cat: "MVP",
    case3Title: "Moovle: screen tourism app",
    case3Desc:
      "I rescued a half-built screen tourism MVP: redesigned the visuals, implemented the responsive design, and built the native iOS and Android apps with Capacitor. From stalled to shipped on the stores.",

    // Testimonials
    testTitle1: "Client ",
    testTitle2: "stories.",
    testSub: "Don't just take our word for it.",
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
    faqSub: "Everything you need to know before we start.",
    faq1Q: "How fast can we build an MVP?",
    faq1A:
      "Depending on the complexity, a standard MVP takes 6 to 8 weeks. We prioritize core features to get you to market as quickly as possible.",
    faq2Q: "Do you only work with mixed reality and Web3?",
    faq2A:
      "No. They're the technologies we know best, but most of our work is custom software: web platforms, mobile apps, internal tools and the automations that take manual processes off your plate.",
    faq3Q: "How do we calculate your budget?",
    faq3A:
      "It depends on the kind of project. We work on fixed projects paid by milestones, or by the hour if we join your team. After your first message I\'ll send you a ballpark range, and after our call, a fixed quote in writing.",
    faq4Q: "Will I own the code?",
    faq4A:
      "100%. Upon completion and final payment, all intellectual property and source code are transferred directly to you.",

    // Contact
    contactTitle1: "Ready to ",
    contactTitle2: "start?",
    contactSub: "Let's discuss how we can build your next big idea.",
    contName: "Name",
    contEmail: "Email",
    contBudgetNote:
      "The budget depends on the kind of project. I'll write back with a ballpark range for yours, and a fixed quote after we talk.",
    contType: "What do you need?",
    contTech: "Any technology in particular?",
    contTimeline: "When would you like to start?",
    contSource: "How did you hear about us?",
    contOptional: "optional",
    contSelectPlaceholder: "Choose…",
    contMessage: "Tell me about your idea",
    contSuccessNote:
      "Thanks. I'll read your message and get back to you within one or two working days with a ballpark range and to set up a video call.",
    // Cookie banner
    cookieMessage:
      "We use cookies to improve your experience and analyze traffic. By accepting, you consent to our use of cookies.",
    cookieAccept: "Accept all",
    cookieDecline: "Decline",
    cookiePolicy: "Cookie policy",
    contPrivacy: "I have read and accept the",
    contMessagePlaceholder: "Tell me about your project, goals, and timeline...",
    contBtnIdle: "Send message",
    contBtnLoading: "Sending...",
    contBtnSuccess: "Message sent!",
    contBtnError: "Try again",
    contErrorMsg: "Something went wrong. Please try again.",
    contErrName: "Please enter your name.",
    contErrEmail: "Please enter a valid email address.",
    contErrMessage: "Tell us briefly about your idea.",
    contErrPrivacy: "You must accept the privacy policy.",

    // Footer
    footDesc: "We build your technology, you build your business.",
    footRights: "All rights reserved.",
    footTerms: "Terms & conditions",
    footPrivacy: "Privacy policy",
    footManageCookies: "Manage cookies",
    footIncibeAlt: "INCIBE Ciberemprende seal",
    footIncibeCaption:
      "Participant in the INCIBE Emprende incubation programme. Not a certification or accreditation.",

    // Process (migrated from inline ternaries in Process.tsx)
    procTitle1: "How it ",
    procTitle2: "works.",
    procSub: "Through a streamlined process designed for founders who need results, not excuses.",
    proc1Title: "Discovery & architecture",
    proc1Desc:
      "We understand your vision, define the strict MVP technical scope, and design the optimal architecture to scale from day one.",
    proc2Title: "Rapid execution",
    proc2Desc:
      "No bureaucracy. We write clean code, implement complex integrations (Web3, 3D, AI), and provide weekly updates.",
    proc3Title: "Handoff & scale",
    proc3Desc:
      "We deploy your product to production, transfer 100% of the source code, and provide continuous support if needed.",

    // Aria labels
    ariaToggleLangToEn: "Switch to English",
    ariaToggleLangToEs: "Switch to Spanish",
    ariaOpenMenu: "Open menu",
    ariaCloseMenu: "Close menu",
    srOpensInNewTab: "(opens in new tab)",

    // TechStackMarquee
    techStackTitle: "OUR TECH STACK",

    // HeroCanvas
    heroDragHint: "Drag each shape to its slot",
  },
  es: {
    // Navbar
    navServices: "Servicios",
    navAbout: "Sobre mí",
    navCTA: "Hablemos",

    // Hero
    heroTitle1: "Construimos la tecnología",
    heroTitle2: "detrás de tu idea.",
    heroSub:
      "Rescatamos proyectos atascados, lanzamos productos digitales desde cero y digitalizamos negocios que siguen funcionando a base de Excel y papel. Con especial foco en realidad mixta y Web3.",
    heroBtnStart: "Inicia tu proyecto",
    heroBtnWork: "Ver nuestro trabajo",

    // Success Cases
    casesTitle1: "Proyectos ",
    casesTitle2: "destacados.",
    casesSub: "Proyectos reales, resultados reales. Un vistazo de lo que podemos construir juntos.",
    case1Cat: "Web3",
    case1Title: "Firefly: wallet de IOTA y Shimmer",
    case1Desc:
      "Fui senior developer en Firefly, el wallet oficial de IOTA y Shimmer. Durante años construí funcionalidades críticas dentro del ecosistema IOTA para una aplicación en la que miles de usuarios confían para gestionar activos digitales reales: siempre con foco en seguridad, rendimiento y UX.",
    case2Cat: "Realidad Mixta",
    case2Title: "Numen Games: plataforma VR",
    case2Desc:
      "Desarrollé una plataforma para desplegar mundos virtuales en minutos. Los mundos en sí se ejecutan sobre Three.js y Hyperfy, con IA integrada para la generación dinámica de contenido, pensada para que cualquiera pueda lanzar experiencias inmersivas sin escribir código.",
    case3Cat: "MVP",
    case3Title: "Moovle: app de turismo de pantalla",
    case3Desc:
      "Rescaté un MVP de turismo de pantalla a medio terminar: rediseñé la interfaz, implementé el diseño responsive y desarrollé las apps nativas iOS y Android con Capacitor. De estancado a desplegado en las stores.",

    // Testimonials
    testTitle1: "Historias de ",
    testTitle2: "clientes.",
    testSub: "No te quedes solo con nuestra palabra.",
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
    faqSub: "Todo lo que necesitas saber antes de empezar.",
    faq1Q: "¿Cómo de rápido podemos construir un MVP?",
    faq1A:
      "Dependiendo de la complejidad, un MVP estándar lleva de 6 a 8 semanas. Priorizamos las características principales para que salgas al mercado lo más rápido posible.",
    faq2Q: "¿Solo trabajáis con realidad mixta y Web3?",
    faq2A:
      "No. Son las tecnologías en las que estamos más metidos, pero la mayor parte del trabajo es software a medida: plataformas web, apps móviles, herramientas internas y las automatizaciones que te quitan de encima los procesos que hoy se hacen a mano.",
    faq3Q: "¿Cómo calculamos tu presupuesto?",
    faq3A:
      "Depende del tipo de proyecto. Trabajamos por proyecto cerrado con pagos por hitos, o por horas si nos integramos en tu equipo. Tras tu primer mensaje te mando una horquilla orientativa y, después de la llamada, el presupuesto cerrado por escrito.",
    faq4Q: "¿Seré dueño del código?",
    faq4A:
      "Al 100%. Tras la finalización y el pago final, toda la propiedad intelectual y el código fuente se transfieren directamente a ti.",

    // Contact
    contactTitle1: "¿Listo para ",
    contactTitle2: "empezar?",
    contactSub: "Hablemos sobre cómo podemos construir tu gran idea.",
    contName: "Nombre",
    contEmail: "Correo electrónico",
    contBudgetNote:
      "El presupuesto depende del tipo de proyecto. Te escribo con una horquilla orientativa para el tuyo, y el presupuesto cerrado después de hablar.",
    contType: "¿Qué necesitas?",
    contTech: "¿Alguna tecnología en concreto?",
    contTimeline: "¿Cuándo quieres empezar?",
    contSource: "¿Cómo nos has conocido?",
    contOptional: "opcional",
    contSelectPlaceholder: "Selecciona…",
    contMessage: "Cuéntame sobre tu idea",
    contSuccessNote:
      "Gracias. Leo tu mensaje y te escribo en uno o dos días laborables con una horquilla orientativa y para buscar un hueco para una videollamada.",
    // Cookie banner
    cookieMessage:
      "Usamos cookies para mejorar tu experiencia y analizar el tráfico. Al aceptar, consientes el uso de cookies.",
    cookieAccept: "Aceptar todo",
    cookieDecline: "Rechazar",
    cookiePolicy: "Política de cookies",
    contPrivacy: "He leído y acepto la",
    contMessagePlaceholder: "Cuéntame sobre tu proyecto, objetivos y plazos...",
    contBtnIdle: "Enviar mensaje",
    contBtnLoading: "Enviando...",
    contBtnSuccess: "¡Mensaje enviado!",
    contBtnError: "Intentar de nuevo",
    contErrorMsg: "Algo salió mal. Por favor, inténtalo de nuevo.",
    contErrName: "Por favor, indica tu nombre.",
    contErrEmail: "Introduce un correo electrónico válido.",
    contErrMessage: "Cuéntanos brevemente tu idea.",
    contErrPrivacy: "Debes aceptar la política de privacidad.",

    // Footer
    footDesc: "Construimos tu tecnología, tú construyes tu negocio.",
    footRights: "Todos los derechos reservados.",
    footTerms: "Términos y condiciones",
    footPrivacy: "Política de privacidad",
    footManageCookies: "Gestionar cookies",
    footIncibeAlt: "Sello INCIBE Ciberemprende",
    footIncibeCaption:
      "Participante en el programa de incubación INCIBE Emprende. No constituye certificación ni acreditación.",

    // Process (migrated from inline ternaries in Process.tsx)
    procTitle1: "Cómo ",
    procTitle2: "trabajamos.",
    procSub:
      "A través de un proceso simplificado, diseñado para fundadores que necesitan resultados, no excusas.",
    proc1Title: "Descubrimiento y arquitectura",
    proc1Desc:
      "Entendemos tu visión, definimos el alcance estricto del MVP tech y diseñamos la arquitectura óptima para escalar desde el día uno.",
    proc2Title: "Ejecución rápida",
    proc2Desc:
      "Sin burocracia. Escribimos código limpio, implementamos integraciones complejas (Web3, 3D, IA) y te damos actualizaciones semanales.",
    proc3Title: "Entrega y escala",
    proc3Desc:
      "Desplegamos tu producto en producción, transferimos todo el código fuente al 100% y te damos soporte continuo si lo necesitas.",

    // Aria labels
    ariaToggleLangToEn: "Cambiar a inglés",
    ariaToggleLangToEs: "Cambiar a español",
    ariaOpenMenu: "Abrir menú",
    ariaCloseMenu: "Cerrar menú",
    srOpensInNewTab: "(abre en nueva pestaña)",

    // TechStackMarquee
    techStackTitle: "NUESTRO STACK TÉCNICO",

    // HeroCanvas
    heroDragHint: "Arrastra cada objeto a su hueco",
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
