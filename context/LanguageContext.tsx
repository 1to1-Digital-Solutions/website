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
    navWork: "Work",
    navTestimonials: "Testimonials",
    navFAQ: "FAQ",
    navCTA: "Let's talk",

    // Hero
    heroTitle1: "We build the tech",
    heroTitle2: "behind your idea.",
    heroSub:
      "We offer premium Blockchain & Mixed Reality solutions for ambitious startups. Stop worrying about the code, start focusing on the growth.",
    heroBtnStart: "Start your project",
    heroBtnWork: "See our work",

    // Services
    servicesTitle1: "What we ",
    servicesTitle2: "do.",
    servicesSub: "Specialized technical execution for startups that can't afford to waste time.",
    serv1Title: "MVP development",
    serv1Desc:
      "Transform your idea into a working product fast. We build scalable foundations so you can validate your market securely.",
    serv2Title: "Blockchain integration",
    serv2Desc:
      "Smart contracts, dApps, and Web3 infrastructure. Secure, efficient, and tailored to your specific use case.",
    serv3Title: "Mixed Reality & 3D",
    serv3Desc:
      "Immersive experiences using Three.js, React Three Fiber, and WebXR. Stand out with cutting-edge visual technology.",
    serv4Title: "Architecture & scalability",
    serv4Desc:
      "We design robust cloud infrastructures and microservices that can handle millions of users without breaking a sweat.",

    // About
    aboutTitle1: "Who is ",
    aboutTitle2: "behind?",
    aboutP1:
      "Hi, I'm César, the founder of 1to1 Digital Solutions. I specialize in building high-performance applications with a focus on ",
    aboutP1Span: "Blockchain and Mixed Reality",
    aboutP2:
      "I've seen too many startups fail because of slow development cycles, bad technical decisions, or bloated agency contracts. That's why I created 1to1 Digital Solutions:",
    aboutList1: "To work directly with founders.",
    aboutList2: "To ship products in weeks, not months.",
    aboutList3: "To build software that scales from day one.",
    aboutP3:
      "If you need a full platform from scratch, an immersive 3D experience, or to rescue a stalled or slowed-down project, I'm here to build it with you.",
    aboutBtn: "Let's talk directly",

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
      "Depending on the complexity, a standard MVP can take anywhere from 3 to 6 weeks. We prioritize core features to get you to market as quickly as possible.",
    faq2Q: "Do we only work with Blockchain and 3D?",
    faq2A:
      "No! While those are our specialties, we have extensive experience building traditional Web2 SaaS platforms, mobile apps, and enterprise dashboards.",
    faq3Q: "How do we calculate your budget?",
    faq3A:
      "We offer both milestone-based project pricing and monthly retainers. We'll discuss your specific needs and propose a structure that aligns with your startup's runway.",
    faq4Q: "Will I own the code?",
    faq4A:
      "100%. Upon completion and final payment, all intellectual property and source code are transferred directly to you.",

    // Contact
    contactTitle1: "Ready to ",
    contactTitle2: "start?",
    contactSub: "Let's discuss how we can build your next big idea.",
    contName: "Name",
    contEmail: "Email",
    contBudget: "Project budget",
    contType: "Project type",
    contMessage: "Tell me about your idea",
    contOpt1: "MVP creation",
    contOpt2: "Rescue existing MVP",
    contOpt3: "Blockchain / Web3 project",
    contOpt4: "Mixed Reality / WebXR project",
    contOpt5: "Other",
    contBudOptUnder5: "< €5k",
    contBudOpt5to10: "€5k – €10k",
    contBudOpt1: "€10k – €15k",
    contBudOpt2: "€15k – €20k",
    contBudOpt3: "€20k – €30k",
    contBudOpt4: "> €30k",
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
    aboutImgAlt: "Portrait of the founder of 1to1 Digital Solutions",
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
    navWork: "Proyectos",
    navTestimonials: "Opiniones",
    navFAQ: "FAQ",
    navCTA: "Hablemos",

    // Hero
    heroTitle1: "Construimos la tecnología",
    heroTitle2: "detrás de tu idea.",
    heroSub:
      "Ofrecemos soluciones premium de Blockchain y Realidad Mixta para startups ambiciosas. Deja de preocuparte por el código, empieza a centrarte en el crecimiento.",
    heroBtnStart: "Inicia tu proyecto",
    heroBtnWork: "Ver nuestro trabajo",

    // Services
    servicesTitle1: "Lo que ",
    servicesTitle2: "hacemos.",
    servicesSub:
      "Ejecución técnica especializada para startups que no pueden permitirse perder el tiempo.",
    serv1Title: "Desarrollo de MVP",
    serv1Desc:
      "Transforma tu idea en un producto funcional de foma rápida. Construimos bases escalables para que valides tu mercado de forma segura.",
    serv2Title: "Integración Blockchain",
    serv2Desc:
      "Smart contracts, dApps e infraestructura Web3. Seguro, eficiente y adaptado a tu caso de uso específico.",
    serv3Title: "Realidad Mixta y 3D",
    serv3Desc:
      "Experiencias inmersivas usando Three.js, React Three Fiber y WebXR. Destaca con tecnología visual de vanguardia.",
    serv4Title: "Arquitectura y escalabilidad",
    serv4Desc:
      "Diseñamos infraestructuras cloud robustas y microservicios preparados para soportar millones de usuarios sin despeinarse.",

    // About
    aboutTitle1: "¿Quién está ",
    aboutTitle2: "detrás?",
    aboutP1:
      "Hola, soy César, el fundador de 1to1 Digital Solutions. Me especializo en construir aplicaciones de alto rendimiento con enfoque en ",
    aboutP1Span: "Blockchain y Realidad Mixta.",
    aboutP2:
      "He visto fracasar demasiadas startups debido a ciclos de desarrollo lentos, malas decisiones técnicas o contratos inflados de agencias. Por eso creé 1to1 Digital Solutions:",
    aboutList1: "Para trabajar directamente con los fundadores.",
    aboutList2: "Para entregar productos en semanas, no meses.",
    aboutList3: "Para construir software que escale desde el primer día.",
    aboutP3:
      "Si necesitas una plataforma completa desde cero, una experiencia 3D inmersiva o rescatar un proyecto atascado o ralentizado, estoy aquí para construirlo contigo.",
    aboutBtn: "Hablemos directamente",

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
      "Dependiendo de la complejidad, un MVP estándar puede tomar de 3 a 6 semanas. Priorizamos las características principales para que salgas al mercado lo más rápido posible.",
    faq2Q: "¿Solo trabajamos con Blockchain y 3D?",
    faq2A:
      "¡No! Aunque son nuestras especialidades, tenemos amplia experiencia construyendo plataformas SaaS Web2 tradicionales, aplicaciones móviles y paneles empresariales.",
    faq3Q: "¿Cómo calculamos tu presupuesto?",
    faq3A:
      "Ofrecemos precios por proyecto basados en hitos o contratos mensuales (retainer). Discutiremos tus necesidades específicas y propondremos una estructura que se adapte al presupuesto de tu startup.",
    faq4Q: "¿Seré dueño del código?",
    faq4A:
      "Al 100%. Tras la finalización y el pago final, toda la propiedad intelectual y el código fuente se transfieren directamente a ti.",

    // Contact
    contactTitle1: "¿Listo para ",
    contactTitle2: "empezar?",
    contactSub: "Hablemos sobre cómo podemos construir tu gran idea.",
    contName: "Nombre",
    contEmail: "Correo electrónico",
    contBudget: "Presupuesto estimado",
    contType: "Tipo de proyecto",
    contMessage: "Cuéntame sobre tu idea",
    contOpt1: "Creación de MVP",
    contOpt2: "Rescatar MVP existente",
    contOpt3: "Proyecto Blockchain / Web3",
    contOpt4: "Proyecto Realidad Mixta / WebXR",
    contOpt5: "Otros",
    contBudOptUnder5: "< 5.000 €",
    contBudOpt5to10: "5.000 € – 10.000 €",
    contBudOpt1: "10.000 € – 15.000 €",
    contBudOpt2: "15.000 € – 20.000 €",
    contBudOpt3: "20.000 € – 30.000 €",
    contBudOpt4: "> 30.000 €",
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
    aboutImgAlt: "Retrato del fundador de 1to1 Digital Solutions",
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
