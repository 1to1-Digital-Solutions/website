"use client";

import { Mail, Linkedin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { trackEvent } from "@/components/GoogleAnalytics";

import { CONTACT_EMAIL, LINKEDIN_URL } from "@/content/contact";

export { CONTACT_EMAIL, LINKEDIN_URL };

/**
 * Contact: no form. LinkedIn first, because that is where César closes the mentoring (the
 * site supports his LinkedIn); email stays as the second way.
 */
export function Contact() {
  const { t } = useLanguage();
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(t("contactMailSubject") as string)}`;

  return (
    <section className="bg-anthracite/30 w-full py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-outfit text-4xl font-bold tracking-tight md:text-5xl">
          {t("contactTitle1")}
          <span className="text-primary">{t("contactTitle2")}</span>
        </h2>
        <p className="text-foreground/75 mx-auto mt-4 max-w-2xl text-lg leading-relaxed">
          {t("contactSub")}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("contact_click", { channel: "linkedin" })}
            className="bg-primary focus-visible:ring-primary focus-visible:ring-offset-background inline-flex items-center gap-3 rounded-full px-8 py-4 text-lg font-bold text-[var(--on-primary)] transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <Linkedin size={20} aria-hidden="true" />
            {t("contactLinkedinBtn")}
            <span className="sr-only">{t("srOpensInNewTab")}</span>
          </a>
          <a
            href={mailto}
            onClick={() => trackEvent("contact_click", { channel: "email" })}
            className="border-foreground/20 hover:border-primary/60 hover:text-primary focus-visible:ring-primary inline-flex items-center gap-3 rounded-full border px-8 py-4 text-lg font-bold transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            <Mail size={20} aria-hidden="true" />
            {t("contactEmailBtn")}
          </a>
        </div>

        <p className="text-foreground/60 mt-8 text-sm">
          {t("contactEmailNote")}{" "}
          <a
            href={mailto}
            className="text-foreground/85 hover:text-primary font-medium underline underline-offset-4"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </section>
  );
}
