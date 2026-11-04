"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { MENTORSHIP } from "@/content/services";
import { HOME } from "@/content/home";

/** Time between one item and the next, in ms. */
const STEP = 380;

/** A check drawn with a stroke, so it can be "ticked" with an animation. */
function DrawnCheck() {
  return (
    <span className="for-who-box border-primary/40 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border">
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" className="text-primary">
        <path
          d="M20 6 9 17l-5-5"
          pathLength={1}
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/**
 * Home block: who the mentoring is for and who it is not for. Detail on /services.
 * When it comes into view, the profile is ticked off item by item, like a checklist the
 * visitor fills in, and the card lights up once every item is ticked. Then the "not for"
 * side appears. It happens once per visit.
 */
export function ForWho({
  className = "py-24",
  heading = true,
}: {
  className?: string;
  heading?: boolean;
}) {
  const { lang } = useLanguage();
  const c = MENTORSHIP[lang];
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const count = c.forWhoList.length;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setShown(true);
      },
      { rootMargin: "0px 0px -30% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const delay = (ms: number) => ({ "--for-who-delay": `${ms}ms` }) as React.CSSProperties;

  return (
    <section id="for-who" className={`mx-auto w-full max-w-6xl px-6 ${className}`}>
      {heading && (
        <div className="mb-14 text-center">
          <h2 className="font-outfit text-4xl font-bold tracking-tight md:text-5xl">
            {HOME[lang].forWhoTitle1}
            <span className="text-primary">{HOME[lang].forWhoTitle2}</span>
          </h2>
          <p className="text-foreground/70 mx-auto mt-4 max-w-2xl text-lg">
            {HOME[lang].forWhoSub}
          </p>
        </div>
      )}
      <div ref={ref} data-shown={shown} className="for-who grid gap-6 md:grid-cols-2">
        <div
          className="for-who-yes border-primary/30 bg-anthracite/50 rounded-3xl border p-8"
          style={delay(200 + count * STEP)}
        >
          <h3 className="font-outfit text-2xl font-bold tracking-tight">{c.forWhoTitle}</h3>
          <ul className="mt-6 flex flex-col gap-4">
            {c.forWhoList.map((item, i) => (
              <li
                key={item}
                className="for-who-item text-foreground/80 flex items-start gap-3 leading-relaxed"
                style={delay(200 + i * STEP)}
              >
                <DrawnCheck />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div
          className="for-who-no border-foreground/10 bg-anthracite/50 rounded-3xl border p-8"
          style={delay(400 + count * STEP)}
        >
          <h3 className="font-outfit text-2xl font-bold tracking-tight">{c.notForTitle}</h3>
          <ul className="mt-6 flex flex-col gap-4">
            {c.notFor.map((item) => (
              <li key={item} className="text-foreground/80 flex items-start gap-3 leading-relaxed">
                <X size={20} aria-hidden="true" className="text-foreground/50 mt-1 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
