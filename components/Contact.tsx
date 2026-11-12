"use client";

import { Mail } from "lucide-react";
import { CtaCard, LinkedInIcon } from "@1to1/ui";
import { useLanguage } from "@/context/LanguageContext";
import { trackEvent } from "@/components/GoogleAnalytics";

import { CONTACT_EMAIL, LINKEDIN_URL } from "@/content/contact";
import { HOME } from "@/content/home";

export { CONTACT_EMAIL, LINKEDIN_URL };

/**
 * Contact: no form. LinkedIn first, because that is where César closes the mentoring (the
 * site supports his LinkedIn); email stays as the second way. The design system's CTA card.
 */
export function Contact() {
  const { t, lang } = useLanguage();
  const c = HOME[lang];
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(t("contactMailSubject") as string)}`;

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-28">
      <CtaCard
        title={c.ctaTitle1}
        accent={c.ctaTitle2}
        lead={c.ctaSub}
        actions={
          <>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("contact_click", { channel: "linkedin" })}
              className="oto-btn oto-btn--primary"
            >
              <LinkedInIcon />
              {t("contactLinkedinBtn")}
              <span className="sr-only">{t("srOpensInNewTab")}</span>
            </a>
            <a
              href={mailto}
              onClick={() => trackEvent("contact_click", { channel: "email" })}
              className="oto-btn oto-btn--secondary"
            >
              <Mail aria-hidden="true" />
              {t("contactEmailBtn")}
            </a>
          </>
        }
        note={c.ctaLinkedin}
      />
    </section>
  );
}
