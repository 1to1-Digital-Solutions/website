"use client";

import { Mail, Linkedin } from "lucide-react";
import { CtaCard } from "@/components/CtaCard";
import { useLanguage } from "@/context/LanguageContext";
import { trackEvent } from "@/components/GoogleAnalytics";

import { CONTACT_EMAIL, LINKEDIN_URL } from "@/content/contact";
import { HOME } from "@/content/home";

export { CONTACT_EMAIL, LINKEDIN_URL };

/**
 * Contact: no form. LinkedIn first, because that is where César closes the mentoring (the
 * site supports his LinkedIn); email stays as the second way.
 */
export function Contact() {
  const { t, lang } = useLanguage();
  const c = HOME[lang];
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(t("contactMailSubject") as string)}`;

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-28">
      <CtaCard>
        <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
          {c.ctaTitle1}
          <span className="text-primary">{c.ctaTitle2}</span>
        </h2>
        <p className="text-foreground/70 mx-auto mt-4 max-w-2xl text-lg">{c.ctaSub}</p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("contact_click", { channel: "linkedin" })}
            className="oto-btn oto-btn--primary"
          >
            <Linkedin size={18} aria-hidden="true" />
            {t("contactLinkedinBtn")}
            <span className="sr-only">{t("srOpensInNewTab")}</span>
          </a>
          <a
            href={mailto}
            onClick={() => trackEvent("contact_click", { channel: "email" })}
            className="oto-btn oto-btn--secondary"
          >
            <Mail size={18} aria-hidden="true" />
            {t("contactEmailBtn")}
          </a>
        </div>

        <p className="text-foreground/60 mt-6 text-sm">{c.ctaLinkedin}</p>
      </CtaCard>
    </section>
  );
}
