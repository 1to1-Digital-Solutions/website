import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { MENTORSHIP } from "@/content/services";

/** The single public price, shown right after what the client takes away. */
export function PriceCard() {
  const { lang } = useLanguage();
  const c = MENTORSHIP[lang];

  return (
    <div
      id="price"
      className="border-primary/30 bg-anthracite/60 mx-auto mt-12 max-w-3xl scroll-mt-32 rounded-3xl border p-8 text-center md:p-10"
    >
      <p className="text-primary text-sm font-semibold tracking-widest uppercase">
        {c.price.title}
      </p>
      <p className="font-outfit mt-3 text-5xl font-black tracking-tight md:text-6xl">
        {c.price.amount}{" "}
        <span className="text-foreground/60 text-2xl font-semibold md:text-3xl">{c.price.tax}</span>
      </p>
      <p className="text-foreground/80 mx-auto mt-5 max-w-xl leading-relaxed">{c.price.payment}</p>
      <p className="text-foreground/60 mx-auto mt-3 max-w-xl text-sm leading-relaxed">
        {c.price.includes}
      </p>
      <Link
        href="/#contact"
        className="group bg-primary focus-visible:ring-primary focus-visible:ring-offset-background mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3 font-semibold text-[var(--on-primary)] transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        {c.ctaButton}
        <ArrowRight
          size={18}
          aria-hidden="true"
          className="transition-transform group-hover:translate-x-1"
        />
      </Link>
    </div>
  );
}
