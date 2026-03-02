import { useLanguage } from "@/context/LanguageContext";

export function Process() {
  const { lang } = useLanguage();

  const isEs = lang === "es";

  const steps = [
    {
      number: "01",
      title: isEs ? "Descubrimiento y Arquitectura" : "Discovery & Architecture",
      desc: isEs
        ? "Entendemos tu visión, definimos el alcance estricto del MVP tech y diseñamos la arquitectura óptima para escalar desde el día uno."
        : "We understand your vision, define the strict MVP technical scope, and design the optimal architecture to scale from day one.",
    },
    {
      number: "02",
      title: isEs ? "Ejecución Rápida" : "Rapid Execution",
      desc: isEs
        ? "Sin burocracia. Escribimos código limpio, implementamos integraciones complejas (Web3, 3D, IA) y te damos actualizaciones semanales."
        : "No bureaucracy. We write clean code, implement complex integrations (Web3, 3D, AI), and provide weekly updates.",
    },
    {
      number: "03",
      title: isEs ? "Entrega y Escala" : "Handoff & Scale",
      desc: isEs
        ? "Desplegamos tu producto en producción, transferimos todo el código fuente al 100% y te damos soporte continuo si lo necesitas."
        : "We deploy your product to production, transfer 100% of the source code, and provide continuous support if needed.",
    },
  ];

  return (
    <section id="process" className="mx-auto w-full max-w-7xl px-6 py-24">
      <div className="mb-16 md:text-center">
        <h2 className="font-outfit text-4xl font-bold tracking-tight md:text-5xl">
          {isEs ? "Cómo " : "How it "}
          <span className="text-primary">{isEs ? "Trabajamos." : "Works."}</span>
        </h2>
        <p className="text-foreground/70 mt-4 text-lg md:mx-auto md:max-w-2xl">
          {isEs
            ? "Un proceso simplificado diseñado para fundadores que necesitan resultados, no excusas."
            : "A streamlined process designed for founders who need results, not excuses."}
        </p>
      </div>

      <div className="relative grid gap-8 md:grid-cols-3">
        {/* Connecting line for desktop */}
        <div className="via-primary/30 absolute top-[20%] left-[10%] -z-10 hidden h-px w-[80%] bg-gradient-to-r from-transparent to-transparent md:block" />

        {steps.map((step, idx) => (
          <div
            key={idx}
            className="group relative flex flex-col items-start md:items-center md:text-center"
          >
            <div className="bg-anthracite border-foreground/10 text-primary group-hover:border-primary/50 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border text-2xl font-black shadow-[0_0_15px_rgba(64,224,208,0.1)] transition-all group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(64,224,208,0.3)]">
              {step.number}
            </div>
            <h3 className="font-outfit text-foreground mb-3 text-2xl font-bold">{step.title}</h3>
            <p className="text-foreground/70 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
