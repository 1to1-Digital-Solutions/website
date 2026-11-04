import { Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { MENTORSHIP } from "@/content/services";

/** StoryBrand value proposition: what the client takes away. The price lives in the plan. */
export function Services() {
  const { lang } = useLanguage();
  const c = MENTORSHIP[lang];

  return (
    <section
      id="services"
      className="relative mx-auto w-full max-w-7xl overflow-visible px-6 py-24"
    >
      <div className="mb-16 text-center">
        <h2 className="font-outfit text-4xl font-bold tracking-tight md:text-5xl">
          {c.homeTitle1}
          <span className="text-primary">{c.homeTitle2}</span>
        </h2>
        <p className="text-primary mt-4 text-sm font-semibold tracking-widest uppercase md:text-base">
          {c.homeAudience}
        </p>
        <p className="text-foreground/70 mx-auto mt-4 max-w-2xl text-lg">{c.homeSub}</p>
      </div>

      <h3 className="font-outfit text-foreground/80 mb-8 text-center text-xl font-semibold">
        {c.outcomesTitle}
      </h3>
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {c.outcomes
          .filter((o) => !o.homeHidden)
          .map((o) => (
            <li
              key={o.title}
              className="border-foreground/10 bg-anthracite/50 flex items-start gap-4 rounded-2xl border p-6"
            >
              <Check size={22} aria-hidden="true" className="text-primary mt-1 shrink-0" />
              <div>
                <p className="font-outfit text-lg font-semibold">{o.title}</p>
                <p className="text-foreground/70 mt-1 leading-relaxed">{o.text}</p>
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
}
