/**
 * The FAQ, in a plain module so the home page can render it and also publish it as
 * schema.org `FAQPage` (and in /llms.txt) from the server. Six questions, no more: the ones
 * a pyme or an autónomo asks before the first meeting. English is a faithful translation.
 */

export type FaqItem = { q: string; a: string };

type FaqCopy = { title1: string; title2: string; sub: string; items: FaqItem[] };

export const FAQ: Record<"es" | "en", FaqCopy> = {
  es: {
    title1: "Preguntas ",
    title2: "frecuentes.",
    sub: "Lo que me suelen preguntar antes de empezar.",
    items: [
      {
        q: "¿Necesito algún conocimiento previo de IA?",
        a: "No. Partimos de cero, de lo que ya haces en tu negocio, y cada concepto lo vemos según lo vamos usando. Está pensada para autónomos y pymes sin perfil técnico.",
      },
      {
        q: "¿Las sesiones son online?",
        a: "Sí. Todas las sesiones son online, por videollamada: una sesión de 1 hora a la semana durante 8 semanas.",
      },
      {
        q: "¿Cuánto cuesta?",
        a: "2.500 € + IVA. Se paga en 2 mitades de 1.250 €: una al firmar y otra después de la cuarta sesión. La primera reunión de 15 minutos es gratis y no te compromete a nada.",
      },
      {
        q: "¿Y si no me sirve?",
        a: "Si después de la segunda sesión no estás conforme o ves que no te está sirviendo, te devuelvo íntegro lo que hayas pagado.",
      },
      {
        q: "¿Tengo que pagar alguna herramienta aparte?",
        a: "No es obligatorio. Eso sí, te recomiendo una suscripción de pago a Claude o a ChatGPT, porque las versiones gratuitas tienen límites que se notan en el día a día.",
      },
      {
        q: "¿Qué pasa cuando terminan las 8 semanas?",
        a: "Te quedas con el sistema y las primeras herramientas, con su documentación. El control es tuyo: no necesitas a nadie externo para seguir avanzando con la IA, tampoco a mí.",
      },
    ],
  },
  en: {
    title1: "Common ",
    title2: "questions.",
    sub: "What people usually ask me before we start.",
    items: [
      {
        q: "Do I need any prior knowledge of AI?",
        a: "No. We start from scratch, from what you already do in your business, and we go through each concept as we use it. It's designed for freelancers and small businesses with no tech profile.",
      },
      {
        q: "Are the sessions online?",
        a: "Yes. All sessions are online, by video call: one 1-hour session a week for 8 weeks.",
      },
      {
        q: "How much does it cost?",
        a: "€2,500 + VAT. You pay it in 2 halves of €1,250: one when we sign and the other after the fourth session. The first 15-minute meeting is free and commits you to nothing.",
      },
      {
        q: "What if it doesn't work for me?",
        a: "If after the second session you're not satisfied or you see it isn't helping you, I'll refund everything you've paid in full.",
      },
      {
        q: "Do I have to pay for any tools on top?",
        a: "It isn't required. That said, I recommend a paid Claude or ChatGPT subscription, because the free versions have limits you notice in your day to day.",
      },
      {
        q: "What happens when the 8 weeks are over?",
        a: "You keep the system and the first tools, with their documentation. The control is yours: you don't need anyone external to keep moving forward with AI, me included.",
      },
    ],
  },
};
