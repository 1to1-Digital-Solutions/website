import { useLanguage } from "@/context/LanguageContext";
import { HOME } from "@/content/home";

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
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-primary/25 absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full blur-3xl" />
        <div className="bg-neon/20 absolute -right-40 -bottom-40 h-[32rem] w-[32rem] rounded-full blur-3xl" />
        <div className="text-primary/45 absolute inset-0 bg-[radial-gradient(currentColor_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)] bg-[size:22px_22px]" />
      </div>

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
