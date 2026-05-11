"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type ConsentState = "unset" | "accepted" | "declined";

const STORAGE_KEY = "1to1_cookie_consent";

interface ConsentContextValue {
  consent: ConsentState;
  accept: () => void;
  decline: () => void;
  reset: () => void;
}

const ConsentContext = createContext<ConsentContextValue | undefined>(undefined);

function readStoredConsent(): ConsentState {
  if (typeof window === "undefined") return "unset";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "accepted") return "accepted";
    if (stored === "declined") return "declined";
  } catch {
    /* localStorage unavailable (private mode, etc.) — fall back to unset */
  }
  return "unset";
}

function writeStoredConsent(value: ConsentState) {
  try {
    if (value === "unset") window.localStorage.removeItem(STORAGE_KEY);
    else window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* localStorage unavailable — ignore */
  }
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  // Start as "unset" on every SSR render so the server output matches the first client render;
  // we read the real value from localStorage in an effect to avoid hydration mismatch.
  const [consent, setConsent] = useState<ConsentState>("unset");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setConsent(readStoredConsent());
    setHydrated(true);
  }, []);

  const update = (value: ConsentState) => {
    writeStoredConsent(value);
    setConsent(value);
  };

  return (
    <ConsentContext.Provider
      value={{
        consent: hydrated ? consent : "unset",
        accept: () => update("accepted"),
        decline: () => update("declined"),
        reset: () => update("unset"),
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within ConsentProvider");
  return ctx;
}
