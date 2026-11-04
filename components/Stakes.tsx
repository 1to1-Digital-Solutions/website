import { Clock, KeyRound, ShieldAlert, TrendingDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { HOME } from "@/content/home";

const ICONS = [TrendingDown, Clock, ShieldAlert, KeyRound];

/** StoryBrand "stakes": what the client risks by not acting. Right after the hero. */
export function Stakes() {
  const { lang } = useLanguage();
  const c = HOME[lang];

  return (
    <section id="stakes" className="mx-auto w-full max-w-6xl px-6 py-24">
      <div className="mb-14 text-center">
        <p className="text-primary text-sm font-semibold tracking-widest uppercase">
          {c.stakesEyebrow}
        </p>
        <h2 className="font-outfit mt-3 text-4xl font-bold tracking-tight md:text-5xl">
          {c.stakesTitle1}
          <span className="text-primary">{c.stakesTitle2}</span>
        </h2>
      </div>

      <ul className="grid gap-6 md:grid-cols-2">
        {c.stakes.map((s, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <li
              key={s.title}
              className="border-foreground/10 bg-anthracite/50 flex items-start gap-4 rounded-2xl border p-6"
            >
              <span className="bg-foreground/5 text-foreground/70 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
                <Icon size={22} aria-hidden="true" />
              </span>
              <div>
                <p className="font-outfit text-lg font-semibold">{s.title}</p>
                <p className="text-foreground/70 mt-1 leading-relaxed">{s.text}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="font-outfit text-foreground/85 mx-auto mt-14 max-w-3xl text-center text-xl leading-relaxed md:text-2xl">
        {c.stakesWave}
      </p>
    </section>
  );
}
