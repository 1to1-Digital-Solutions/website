"use client";

import Script from "next/script";
import { useConsent } from "@/context/ConsentContext";

export function GoogleAnalytics() {
  const { consent } = useConsent();
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  // Hard gate: don't load gtag at all unless explicit consent and a measurement ID configured.
  if (consent !== "accepted" || !measurementId) return null;

  return (
    <>
      <Script
        id="ga-loader"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            anonymize_ip: true,
            allow_google_signals: false,
            allow_ad_personalization_signals: false
          });
        `}
      </Script>
    </>
  );
}

// Lightweight typed wrapper so other components can fire events without referencing gtag globally.
type GtagFn = (
  command: "event" | "config" | "set" | "consent",
  action: string,
  params?: Record<string, unknown>
) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
  }
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return; // GA not loaded (no consent or no id)
  window.gtag("event", name, params);
}
