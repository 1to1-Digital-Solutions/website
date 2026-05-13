import { useLanguage } from "@/context/LanguageContext";

export function Process() {
  const { t } = useLanguage();

  const steps = [
    { number: "01", title: t("proc1Title"), desc: t("proc1Desc") },
    { number: "02", title: t("proc2Title"), desc: t("proc2Desc") },
    { number: "03", title: t("proc3Title"), desc: t("proc3Desc") },
  ];

  return (
    <section id="process" className="mx-auto w-full max-w-7xl px-6 py-24">
      <div className="mb-16 md:text-center">
        <h2 className="font-outfit text-4xl font-bold tracking-tight md:text-5xl">
          {t("procTitle1")}
          <span className="text-primary">{t("procTitle2")}</span>
        </h2>
        <p className="text-foreground/70 mt-4 text-lg md:mx-auto md:max-w-2xl">{t("procSub")}</p>
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
            <h3 className="font-outfit text-foreground mb-3 text-2xl font-bold">
              {step.title as string}
            </h3>
            <p className="text-foreground/70 leading-relaxed">{step.desc as string}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
