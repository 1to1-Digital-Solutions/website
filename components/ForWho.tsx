"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { MENTORSHIP } from "@/content/services";
import { HOME } from "@/content/home";
import { ForWhoCloud } from "@/components/ForWhoCloud";
import { SectionHeading } from "@1to1/ui";

/** Time between one item and the next, in ms. */
const STEP = 380;

/** A check drawn with a stroke, so it can be "ticked" with an animation. */
function DrawnCheck() {
  return (
    <span className="for-who-box oto-check oto-check--off">
      <svg viewBox="0 0 24 24" aria-hidden="true">
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
      {/* The point cloud the bolt breaks into, behind the cards. */}
      <ForWhoCloud />
      {heading && (
        <div className="relative mb-14">
          <SectionHeading
            title={HOME[lang].forWhoTitle1}
            accent={HOME[lang].forWhoTitle2}
            lead={HOME[lang].forWhoSub}
          />
        </div>
      )}
      {/* The design system's checklists (oto-panel): the "for" card with the green border, the
          "not for" one neutral and without fill. */}
      <div ref={ref} data-shown={shown} className="for-who relative grid gap-6 md:grid-cols-2">
        <div data-cloud-solid className="for-who-yes oto-panel" style={delay(200 + count * STEP)}>
          <h3 className="oto-panel__title">{c.forWhoTitle}</h3>
          <ul className="oto-checklist">
            {c.forWhoList.map((item, i) => (
              <li key={item} className="for-who-item" style={delay(200 + i * STEP)}>
                <DrawnCheck />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div
          data-cloud-solid
          className="for-who-no oto-panel oto-panel--plain"
          style={delay(400 + count * STEP)}
        >
          <h3 className="oto-panel__title">{c.notForTitle}</h3>
          <ul className="oto-checklist">
            {c.notFor.map((item) => (
              <li key={item}>
                <span className="oto-check oto-check--no" aria-hidden="true">
                  <X />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
