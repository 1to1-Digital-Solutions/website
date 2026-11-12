"use client";

import { Accordion, SectionHeading } from "@1to1/ui";
import { useLanguage } from "@/context/LanguageContext";
import { FAQ as FAQ_COPY } from "@/content/faq";

/** The design system's accordion: native <details>, one open at a time, the first one open. */
export function FAQ() {
  const { lang } = useLanguage();
  const c = FAQ_COPY[lang];

  return (
    <section id="faq" className="mx-auto w-full max-w-3xl px-6 py-24">
      <div className="mb-12">
        <SectionHeading title={c.title1} accent={c.title2} lead={c.sub} />
      </div>

      {/* Keyed by language so the open item resets when the copy changes. */}
      <Accordion key={lang} items={c.items.map((item) => ({ question: item.q, answer: item.a }))} />
    </section>
  );
}
