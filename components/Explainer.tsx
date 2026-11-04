import { useLanguage } from "@/context/LanguageContext";
import { HOME } from "@/content/home";

/**
 * StoryBrand "explanatory paragraph": the whole story in a few paragraphs (the client, the
 * problem, the plan, the result), for whoever wants to stop and think it over.
 */
export function Explainer() {
  const { lang } = useLanguage();
  const c = HOME[lang];

  return (
    <section id="explain" className="mx-auto w-full max-w-3xl px-6 pt-24 pb-4">
      <p className="text-primary text-sm font-semibold tracking-widest uppercase">
        {c.explainEyebrow}
      </p>
      <h2 className="font-outfit mt-3 text-4xl font-bold tracking-tight md:text-5xl">
        {c.explainTitle1}
        <span className="text-primary">{c.explainTitle2}</span>
      </h2>
      <div className="text-foreground/80 mt-8 flex flex-col gap-5 text-lg leading-relaxed">
        {c.explain.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>
    </section>
  );
}
