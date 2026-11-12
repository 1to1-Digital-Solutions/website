import { SectionHeading } from "@1to1/ui";
import { useLanguage } from "@/context/LanguageContext";
import { PriceCard } from "@/components/PriceCard";

/** StoryBrand plan: the 4 steps, the price card, with the way to the full detail on /services. */
export function Process() {
  const { t } = useLanguage();

  const steps = [
    { title: t("proc1Title"), desc: t("proc1Desc") },
    { title: t("proc2Title"), desc: t("proc2Desc") },
    { title: t("proc3Title"), desc: t("proc3Desc") },
    { title: t("proc4Title"), desc: t("proc4Desc") },
  ];

  return (
    <section id="process" className="mx-auto w-full max-w-7xl px-6 py-24">
      <div className="mb-16">
        <SectionHeading
          title={t("procTitle1") as string}
          accent={t("procTitle2") as string}
          lead={t("procSub")}
        />
      </div>

      {/* The design system's steps (oto-steps draws the line joining the numbers). The numbers
          are where the bolt lands. */}
      <ol data-bolt-trigger className="oto-steps">
        {steps.map((step, idx) => (
          <li key={idx} className="oto-step">
            <span data-bolt-card className="oto-step__num">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <h3 className="oto-step__title">{step.title as string}</h3>
            <p className="oto-step__text">{step.desc as string}</p>
          </li>
        ))}
      </ol>

      <PriceCard className="mt-16" compact />
    </section>
  );
}
