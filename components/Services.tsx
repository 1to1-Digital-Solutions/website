import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { MENTORSHIP } from "@/content/services";

/** Home page summary of the mentoring: what you take away, with a link to /services. */
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
        <p className="text-foreground/70 mx-auto mt-4 max-w-2xl text-lg">{c.homeSub}</p>
      </div>

      <h3 className="font-outfit text-foreground/80 mb-8 text-center text-xl font-semibold">
        {c.outcomesTitle}
      </h3>
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {c.outcomes.map((o) => (
          <li
            key={o.title}
            className="border-foreground/10 bg-anthracite/50 hover:border-primary/40 flex items-start gap-4 rounded-2xl border p-6 transition-colors"
          >
            <Check size={22} aria-hidden="true" className="text-primary mt-1 shrink-0" />
            <div>
              <p className="font-outfit text-lg font-semibold">{o.title}</p>
              <p className="text-foreground/70 mt-1 leading-relaxed">{o.text}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-12 text-center">
        <Link
          href="/services"
          className="border-foreground/20 hover:border-primary/60 hover:text-primary focus-visible:ring-primary inline-flex items-center gap-2 rounded-full border px-6 py-3 font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none"
        >
          {c.homeLink}
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
