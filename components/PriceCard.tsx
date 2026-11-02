import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { MENTORSHIP } from "@/content/services";

/**
 * The single public price, right after what the client takes away. As wide as the cards above
 * it: on desktop the amount and the CTA on the left, the details on the right.
 */
export function PriceCard({ className = "mt-6" }: { className?: string }) {
  const { lang } = useLanguage();
  const c = MENTORSHIP[lang];

  return (
    <div
      id="price"
      className={`border-primary/30 bg-anthracite/60 ${className} grid w-full scroll-mt-32 gap-8 rounded-3xl border p-8 text-center md:p-10 lg:grid-cols-3 lg:items-center lg:gap-12 lg:text-left`}
    >
      <div className="flex flex-col items-center lg:items-start">
        <p className="text-primary text-sm font-semibold tracking-widest uppercase">
          {c.price.title}
        </p>
        <p className="font-outfit mt-3 text-5xl font-black tracking-tight md:text-6xl">
          {c.price.amount}{" "}
          <span className="text-foreground/60 text-2xl font-semibold md:text-3xl">
            {c.price.tax}
          </span>
        </p>
        <Link
          href="/#contact"
          className="group bg-primary focus-visible:ring-primary focus-visible:ring-offset-background mt-6 inline-flex items-center gap-2 rounded-full px-7 py-3 font-semibold text-[var(--on-primary)] transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {c.ctaButton}
          <ArrowRight
            size={18}
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>

      <div className="flex flex-col gap-4 lg:col-span-2">
        <p className="text-foreground/85 text-lg leading-relaxed">{c.price.payment}</p>
        <p className="text-foreground/60 leading-relaxed">{c.price.includes}</p>
        <p className="border-primary/20 bg-primary/5 text-foreground/85 flex items-start gap-3 rounded-2xl border p-4 text-left text-sm leading-relaxed">
          <ShieldCheck size={20} aria-hidden="true" className="text-primary mt-0.5 shrink-0" />
          <span>
            <strong className="text-foreground font-semibold">{c.price.guaranteeTitle}.</strong>{" "}
            {c.price.guarantee}
          </span>
        </p>
      </div>
    </div>
  );
}
