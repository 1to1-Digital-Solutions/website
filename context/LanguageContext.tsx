"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "es";

export const translations = {
  en: {
    // Navbar
    navServices: "Services",
    navAbout: "About",
    navWork: "Work",
    navTestimonials: "Testimonials",
    navFAQ: "FAQ",
    navCTA: "Let's Talk",

    // Hero
    heroTitle1: "We build the tech",
    heroTitle2: "behind your idea.",
    heroSub:
      "Premium Blockchain & Mixed Reality solutions for ambitious startups. Stop worrying about the code, start focusing on the growth.",
    heroBtnStart: "Start Your Project",
    heroBtnWork: "See Our Work",

    // Services
    servicesTitle1: "What We ",
    servicesTitle2: "Do.",
    servicesSub: "Specialized technical execution for startups that can't afford to waste time.",
    serv1Title: "MVP Development",
    serv1Desc:
      "Transform your idea into a working product fast. We build scalable foundations so you can validate your market securely.",
    serv2Title: "Blockchain Integration",
    serv2Desc:
      "Smart contracts, dApps, and Web3 infrastructure. Secure, efficient, and tailored to your specific use case.",
    serv3Title: "Mixed Reality & 3D",
    serv3Desc:
      "Immersive experiences using Three.js, React Three Fiber, and WebXR. Stand out with cutting-edge visual technology.",
    serv4Title: "Architecture & Scalability",
    serv4Desc:
      "We design robust cloud infrastructures and microservices that can handle millions of users without breaking a sweat.",

    // About
    aboutTitle1: "Who is ",
    aboutTitle2: "Behind?",
    aboutP1:
      "Hi, I'm the founder of 1to1 Studio. I specialize in building high-performance applications with a focus on ",
    aboutP1Span: "Blockchain and Mixed Reality",
    aboutP2:
      "I've seen too many startups fail because of slow development cycles, bad technical decisions, or bloated agency contracts. That's why I created 1to1 Studio:",
    aboutList1: "To work directly with founders.",
    aboutList2: "To ship products in weeks, not months.",
    aboutList3: "To build software that scales from day one.",
    aboutP3:
      "Whether you need a full platform from scratch, or an immersive 3D experience to wow your investors, I'm here to build it.",
    aboutBtn: "Let's Talk Directly",

    // Success Cases
    casesTitle1: "Selected ",
    casesTitle2: "Work.",
    casesSub: "Real projects, real results. A glimpse into what we can build together.",
    case1Cat: "Web3",
    case1Title: "DeFi Analytics Dashboard",
    case1Desc:
      "A real-time dashboard tracking on-chain metrics across multiple networks. Built with Next.js, Ethers.js, and a highly optimized custom indexer.",
    case2Cat: "Mixed Reality",
    case2Title: "Virtual Art Gallery",
    case2Desc:
      "An immersive 3D experience allowing users to walk through an exhibition, interact with 3D models, and purchase NFTs directly from the canvas.",
    case3Cat: "MVP",
    case3Title: "SaaS Launchpad",
    case3Desc:
      "A fully functional SaaS MVP delivered in 4 weeks, featuring authentication, Stripe billing, and AI-powered text generation.",

    // Testimonials
    testTitle1: "Client ",
    testTitle2: "Stories.",
    testSub: "Don't just take our word for it.",
    test1Quote:
      '"1to1 Studio completely rescued our launch. The previous agency left us with a broken codebase, and within two weeks, it was fixed, deployed, and scaling."',
    test1Author: "Sarah Jenkins",
    test1Role: "CEO, TechFlow",
    test2Quote:
      '"The 3D interactive elements they built for our landing page increased our conversion rate by 40%. The technical execution was flawless."',
    test2Author: "Marcus Chen",
    test2Role: "Founder, Horizon VR",
    test3Quote:
      '"Finding a reliable Blockchain developer is hard. Finding one who also understands product design and user experience is nearly impossible. Highly recommended."',
    test3Author: "David Elson",
    test3Role: "CTO, BlockTrust",

    // FAQ
    faqTitle1: "Common ",
    faqTitle2: "Questions.",
    faqSub: "Everything you need to know before we start.",
    faq1Q: "How fast can you build an MVP?",
    faq1A:
      "Depending on the complexity, a standard MVP can take anywhere from 3 to 6 weeks. We prioritize core features to get you to market as quickly as possible.",
    faq2Q: "Do you only work with Blockchain and 3D?",
    faq2A:
      "No! While those are our specialties, we have extensive experience building traditional Web2 SaaS platforms, mobile apps, and enterprise dashboards.",
    faq3Q: "How does the pricing work?",
    faq3A:
      "We offer both milestone-based project pricing and monthly retainers. We'll discuss your specific needs and propose a structure that aligns with your startup's runway.",
    faq4Q: "Will I own the code?",
    faq4A:
      "100%. Upon completion and final payment, all intellectual property and source code are transferred directly to you.",

    // Contact
    contactTitle1: "Ready to ",
    contactTitle2: "Start?",
    contactSub: "Let's discuss how we can build your next big idea.",
    contName: "Name",
    contEmail: "Email",
    contBudget: "Project Budget",
    contType: "Project Type",
    contMessage: "Tell me about your idea",
    contOpt1: "MVP Creation",
    contOpt2: "Rescue Existing MVP",
    contOpt3: "Blockchain / Web3 Project",
    contOpt4: "Mixed Reality / WebXR Project",
    contBudOpt1: "< €10k",
    contBudOpt2: "€10k – €15k",
    contBudOpt3: "€15k – €20k",
    contBudOpt4: "> €20k",
    contPrivacy: "I have read and accept the",
    contBtnIdle: "Send Message",
    contBtnLoading: "Sending...",
    contBtnSuccess: "Message Sent!",

    // Footer
    footDesc: "Premium technical execution for startups that move fast.",
    footRights: "All rights reserved.",
    footTerms: "Terms & Conditions",
    footPrivacy: "Privacy Policy",

    // Aria labels
    ariaToggleLangToEn: "Switch to English",
    ariaToggleLangToEs: "Switch to Spanish",
    ariaOpenMenu: "Open menu",
    ariaCloseMenu: "Close menu",
  },
  es: {
    // Navbar
    navServices: "Servicios",
    navAbout: "Sobre Mí",
    navWork: "Proyectos",
    navTestimonials: "Opiniones",
    navFAQ: "FAQ",
    navCTA: "Hablemos",

    // Hero
    heroTitle1: "Construimos la tecnología",
    heroTitle2: "detrás de tu idea.",
    heroSub:
      "Soluciones Premium de Blockchain y Realidad Mixta para startups ambiciosas. Deja de preocuparte por el código, empieza a centrarte en el crecimiento.",
    heroBtnStart: "Inicia tu Proyecto",
    heroBtnWork: "Ver Nuestro Trabajo",

    // Services
    servicesTitle1: "Lo Que ",
    servicesTitle2: "Hacemos.",
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
    serv4Title: "Arquitectura y Escalabilidad",
    serv4Desc:
      "Diseñamos infraestructuras cloud robustas y microservicios preparados para soportar millones de usuarios sin despeinarse.",

    // About
    aboutTitle1: "¿Quién está ",
    aboutTitle2: "Detrás?",
    aboutP1:
      "Hola, soy el fundador de 1to1 Studio. Me especializo en construir aplicaciones de alto rendimiento con enfoque en ",
    aboutP1Span: "Blockchain y Realidad Mixta.",
    aboutP2:
      "He visto fracasar demasiadas startups debido a ciclos de desarrollo lentos, malas decisiones técnicas o contratos inflados de agencias. Por eso creé 1to1 Studio:",
    aboutList1: "Para trabajar directamente con los fundadores.",
    aboutList2: "Para entregar productos en semanas, no meses.",
    aboutList3: "Para construir software que escale desde el primer día.",
    aboutP3:
      "Ya sea que necesites una plataforma completa desde cero, o una experiencia 3D inmersiva para sorprender a tus inversores, estoy aquí para construirlo.",
    aboutBtn: "Hablemos Directamente",

    // Success Cases
    casesTitle1: "Proyectos ",
    casesTitle2: "Destacados.",
    casesSub: "Proyectos reales, resultados reales. Un vistazo a lo que podemos construir juntos.",
    case1Cat: "Web3",
    case1Title: "Dashboard Analítico DeFi",
    case1Desc:
      "Un panel en tiempo real que rastrea métricas on-chain en múltiples redes. Construido con Next.js, Ethers.js y un indexador personalizado altamente optimizado.",
    case2Cat: "Realidad Mixta",
    case2Title: "Galería de Arte Virtual",
    case2Desc:
      "Una experiencia 3D inmersiva que permite a los usuarios recorrer una exposición, interactuar con modelos 3D y comprar NFTs directamente desde el canvas.",
    case3Cat: "MVP",
    case3Title: "SaaS Launchpad",
    case3Desc:
      "Un MVP SaaS completamente funcional entregado en 4 semanas, con autenticación, facturación con Stripe y generación de texto por IA.",

    // Testimonials
    testTitle1: "Historias de ",
    testTitle2: "Clientes.",
    testSub: "No te quedes solo con nuestra palabra.",
    test1Quote:
      '"1to1 Studio rescató completamente nuestro lanzamiento. La agencia anterior nos dejó con un código roto, y en dos semanas, estaba arreglado, desplegado y escalando."',
    test1Author: "Sarah Jenkins",
    test1Role: "CEO, TechFlow",
    test2Quote:
      '"Los elementos interactivos 3D que construyeron para nuestra landing page aumentaron nuestra tasa de conversión en un 40%. La ejecución técnica fue impecable."',
    test2Author: "Marcus Chen",
    test2Role: "Fundador, Horizon VR",
    test3Quote:
      '"Encontrar un desarrollador Blockchain confiable es difícil. Encontrar uno que también entienda el diseño de productos y la experiencia del usuario es casi imposible. Altamente recomendado."',
    test3Author: "David Elson",
    test3Role: "CTO, BlockTrust",

    // FAQ
    faqTitle1: "Preguntas ",
    faqTitle2: "Frecuentes.",
    faqSub: "Todo lo que necesitas saber antes de empezar.",
    faq1Q: "¿Qué tan rápido pueden construir un MVP?",
    faq1A:
      "Dependiendo de la complejidad, un MVP estándar puede tomar de 3 a 6 semanas. Priorizamos las características principales para que salgas al mercado lo más rápido posible.",
    faq2Q: "¿Solo trabajan con Blockchain y 3D?",
    faq2A:
      "¡No! Aunque son nuestras especialidades, tenemos amplia experiencia construyendo plataformas SaaS Web2 tradicionales, aplicaciones móviles y paneles empresariales.",
    faq3Q: "¿Cómo funciona la estructura de precios?",
    faq3A:
      "Ofrecemos precios por proyecto basados en hitos o contratos mensuales (retainer). Discutiremos tus necesidades específicas y propondremos una estructura que se adapte al presupuesto de tu startup.",
    faq4Q: "¿Seré dueño del código?",
    faq4A:
      "Al 100%. Tras la finalización y el pago final, toda la propiedad intelectual y el código fuente se transfieren directamente a ti.",

    // Contact
    contactTitle1: "¿Listo para ",
    contactTitle2: "Empezar?",
    contactSub: "Hablemos sobre cómo podemos construir tu gran idea.",
    contName: "Nombre",
    contEmail: "Correo electrónico",
    contBudget: "Presupuesto Estimado",
    contType: "Tipo de Proyecto",
    contMessage: "Cuéntame sobre tu idea",
    contOpt1: "Creación de MVP",
    contOpt2: "Rescatar MVP existente",
    contOpt3: "Proyecto Blockchain / Web3",
    contOpt4: "Proyecto Realidad Mixta / WebXR",
    contBudOpt1: "< 10.000 €",
    contBudOpt2: "10.000 € – 15.000 €",
    contBudOpt3: "15.000 € – 20.000 €",
    contBudOpt4: "> 20.000 €",
    contPrivacy: "He leído y acepto la",
    contBtnIdle: "Enviar Mensaje",
    contBtnLoading: "Enviando...",
    contBtnSuccess: "¡Mensaje Enviado!",

    // Footer
    footDesc: "Ejecución técnica premium para startups que se mueven rápido.",
    footRights: "Todos los derechos reservados.",
    footTerms: "Términos y Condiciones",
    footPrivacy: "Política de Privacidad",

    // Aria labels
    ariaToggleLangToEn: "Cambiar a inglés",
    ariaToggleLangToEs: "Cambiar a español",
    ariaOpenMenu: "Abrir menú",
    ariaCloseMenu: "Cerrar menú",
  },
};

export type Translations = typeof translations.en;

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: keyof Translations) => string | React.ReactNode;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("es");

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
