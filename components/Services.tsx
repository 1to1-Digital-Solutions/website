import { Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { MENTORSHIP } from "@/content/services";
import { SectionHeading } from "@1to1/ui";

/** StoryBrand value proposition: what the client takes away. The price lives in the plan. */
export function Services() {
  const { lang } = useLanguage();
  const c = MENTORSHIP[lang];

  return (
    <section
      id="services"
      className="relative mx-auto w-full max-w-7xl overflow-visible px-6 py-24"
    >
      <div className="mb-14">
        <SectionHeading
          eyebrow={c.homeAudience}
          title={c.homeTitle1}
          accent={c.homeTitle2}
          lead={c.homeSub}
        />
      </div>

      <h3 className="font-display text-foreground/85 mb-10 text-center text-xl font-semibold">
        {c.outcomesTitle}
      </h3>
      {/* Boxless cards, as in the design system. The bolt goes from icon chip to icon chip,
          like a circuit, instead of around boxes that aren't there. */}
      <ul data-bolt-trigger className="grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {c.outcomes
          .filter((o) => !o.homeHidden)
          .map((o, i) => (
            <li key={o.title} className="oto-card">
              <span
                data-bolt-card
                data-bolt-entry={i === 1 ? "" : undefined}
                className="oto-icon-chip"
                aria-hidden="true"
              >
                <Check />
              </span>
              <div>
                <p className="oto-card__title">{o.title}</p>
                <p className="oto-card__text">{o.text}</p>
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
}
