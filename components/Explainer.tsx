import { useLanguage } from "@/context/LanguageContext";
import { HOME } from "@/content/home";
import { Eyebrow } from "@1to1/ui";

/**
 * StoryBrand "explanatory paragraph": the whole story in a few paragraphs (the client, the
 * problem, the plan, the result), for whoever wants to stop and think it over. No glow behind:
 * in the design system the brand glow only lives in the hero and the CTA card.
 */
export function Explainer() {
  const { lang } = useLanguage();
  const c = HOME[lang];

  return (
    <div className="relative w-full overflow-hidden rounded-t-[3rem]">
      <section id="explain" className="relative mx-auto w-full max-w-3xl px-6 py-28">
        <Eyebrow>{c.explainEyebrow}</Eyebrow>
        <h2 className="oto-h2">
          {c.explainTitle1}
          <span className="oto-accent">{c.explainTitle2}</span>
        </h2>
        <div className="text-foreground/85 mt-8 flex flex-col gap-5 text-lg leading-relaxed">
          {c.explain.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>
    </div>
  );
}
