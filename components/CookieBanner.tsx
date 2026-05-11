"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const COOKIE_KEY = "1to1_cookie_consent";

export function CookieBanner() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="border-foreground/10 bg-background/95 fixed right-0 bottom-0 left-0 z-[90] border-t px-6 py-4 shadow-2xl backdrop-blur-md md:right-auto md:bottom-6 md:left-6 md:max-w-md md:rounded-2xl md:border"
    >
      <p className="text-foreground/80 mb-4 text-sm leading-relaxed">
        {t("cookieMessage")}{" "}
        <Link href="/cookie-policy" className="text-primary underline-offset-2 hover:underline">
          {t("cookiePolicy")}
        </Link>
        .
      </p>
      <div className="flex gap-3">
        <button
          onClick={handleAccept}
          className="bg-primary text-background hover:bg-primary/90 focus-visible:ring-primary flex-1 rounded-xl py-2 text-sm font-bold transition-colors focus-visible:ring-2 focus-visible:outline-none"
        >
          {t("cookieAccept")}
        </button>
        <button
          onClick={handleDecline}
          className="border-foreground/20 text-foreground/70 hover:bg-foreground/5 focus-visible:ring-primary flex-1 rounded-xl border py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none"
        >
          {t("cookieDecline")}
        </button>
      </div>
    </div>
  );
}
