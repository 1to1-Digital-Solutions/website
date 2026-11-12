import { useLanguage } from "@/context/LanguageContext";
import { PriceCard } from "@/components/PriceCard";

/** StoryBrand plan: the 4 steps, the price card, with the way to the full detail on /services. */
export function Process() {
  const { t } = useLanguage();

  const steps = [
    { number: "01", title: t("proc1Title"), desc: t("proc1Desc") },
    { number: "02", title: t("proc2Title"), desc: t("proc2Desc") },
    { number: "03", title: t("proc3Title"), desc: t("proc3Desc") },
    { number: "04", title: t("proc4Title"), desc: t("proc4Desc") },
  ];

  return (
    <section id="process" className="mx-auto w-full max-w-7xl px-6 py-24">
      <div className="mb-16 md:text-center">
        <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
          {t("procTitle1")}
          <span className="text-primary">{t("procTitle2")}</span>
        </h2>
        <p className="text-foreground/70 mt-4 text-lg md:mx-auto md:max-w-2xl">{t("procSub")}</p>
      </div>

      <div data-bolt-trigger className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {/* Line joining the 4 numbers when they sit in one row: from the centre of the first
            to the centre of the last, at the height of their middle, solid all the way. */}
        <div
          aria-hidden="true"
          className="bg-primary/60 absolute top-8 right-[12.5%] left-[12.5%] hidden h-0.5 lg:block"
        />

        {steps.map((step, idx) => (
          <div
            key={idx}
            className="relative flex flex-col items-start md:items-center md:text-center"
          >
            <div
              data-bolt-card
              className="bg-anthracite border-primary/40 text-primary relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border text-2xl font-black shadow-[0_0_15px_rgba(64,224,208,0.1)]"
            >
              {step.number}
            </div>
            <h3 className="font-display text-foreground mb-3 text-xl font-bold">
              {step.title as string}
            </h3>
            <p className="text-foreground/70 leading-relaxed">{step.desc as string}</p>
          </div>
        ))}
      </div>

      <PriceCard className="mt-16" compact />
    </section>
  );
}
