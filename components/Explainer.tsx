import { useLanguage } from "@/context/LanguageContext";
import { HOME } from "@/content/home";
import { GlowBackground } from "@/components/GlowBackground";

/**
 * StoryBrand "explanatory paragraph": the whole story in a few paragraphs (the client, the
 * problem, the plan, the result), for whoever wants to stop and think it over. Over a soft
 * background of turquoise glows and a dot grid that echoes the hero's point cloud.
 */
export function Explainer() {
  const { lang } = useLanguage();
  const c = HOME[lang];

  return (
    <div className="relative w-full overflow-hidden rounded-t-[3rem]">
      <GlowBackground />

      <section id="explain" className="relative mx-auto w-full max-w-3xl px-6 py-28">
        <p className="text-primary text-sm font-semibold tracking-widest uppercase">
          {c.explainEyebrow}
        </p>
        <h2 className="font-outfit mt-3 text-4xl font-bold tracking-tight md:text-5xl">
          {c.explainTitle1}
          <span className="text-primary">{c.explainTitle2}</span>
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
