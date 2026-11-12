import Link from "next/link";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { Eyebrow } from "@1to1/ui";
import { useLanguage } from "@/context/LanguageContext";
import { MENTORSHIP } from "@/content/services";

/**
 * The single public price, right after what the client takes away (the design system's
 * oto-price). On desktop the amount and the CTA on the left, the details on the right.
 */
export function PriceCard({
  className = "mt-6",
  compact = false,
}: {
  className?: string;
  /** Home page: short "includes" line and the link to the full detail on /services. */
  compact?: boolean;
}) {
  const { lang } = useLanguage();
  const c = MENTORSHIP[lang];

  return (
    <div id="price" className={`${className} scroll-mt-32`}>
      <div className="oto-price lg:text-left">
        <div>
          <Eyebrow>{c.price.title}</Eyebrow>
          <p className="oto-price__amount">
            {c.price.amount} <span className="oto-price__tax">{c.price.tax}</span>
          </p>
          <Link
            href={compact ? "/services" : "/#contact"}
            data-bolt-end={compact ? "" : undefined}
            className="oto-btn oto-btn--primary mt-6"
          >
            {compact ? c.homeLink : c.ctaButton}
            <span className="oto-btn__arrow" aria-hidden="true">
              <ChevronRight />
            </span>
          </Link>
        </div>

        <div className="oto-price__detail">
          <p className="oto-price__payment">{c.price.payment}</p>
          <p className="oto-price__includes">{compact ? c.price.homeIncludes : c.price.includes}</p>
          <p className="oto-callout text-left">
            <ShieldCheck aria-hidden="true" />
            <span>
              <strong>{c.price.guaranteeTitle}.</strong> {c.price.guarantee}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
