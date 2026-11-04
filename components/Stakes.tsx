"use client";

import { useEffect, useState } from "react";
import { Clock, KeyRound, ShieldAlert, TrendingDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { HOME } from "@/content/home";

const ICONS = [TrendingDown, Clock, ShieldAlert, KeyRound];

type Timing = { delay: number; dur: number };

/**
 * The spark that runs along a card's border. Two strokes (neon glow and a white core) with a
 * displacement filter that makes the line jagged and flicker, like current on a fence.
 */
function ElectricBorder({ timing }: { timing: Timing }) {
  const style = {
    "--electric-delay": `${timing.delay}s`,
    "--electric-dur": `${timing.dur}s`,
  } as React.CSSProperties;

  return (
    <svg
      aria-hidden="true"
      className="electric-border pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      style={style}
    >
      <g filter="url(#electric-jitter)">
        <rect
          width="100%"
          height="100%"
          rx="16"
          pathLength={100}
          stroke="var(--neon)"
          strokeWidth={2.5}
        />
        <rect
          width="100%"
          height="100%"
          rx="16"
          pathLength={100}
          stroke="white"
          strokeWidth={0.9}
        />
      </g>
    </svg>
  );
}

/** StoryBrand "stakes": what the client risks by not acting. Right after the hero. */
export function Stakes() {
  const { lang } = useLanguage();
  const c = HOME[lang];
  // Random per visit, set after mount so server and client render the same markup.
  const [timings, setTimings] = useState<Timing[] | null>(null);
  useEffect(() => {
    setTimings(c.stakes.map(() => ({ delay: Math.random() * 4, dur: 4.5 + Math.random() * 3 })));
  }, [c.stakes]);

  return (
    <section id="stakes" className="mx-auto w-full max-w-6xl px-6 py-24">
      {/* Shared filter: turbulence displaces the stroke and its frequency flickers. */}
      <svg aria-hidden="true" className="absolute h-0 w-0">
        <filter id="electric-jitter" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="turbulence" baseFrequency="0.09" numOctaves={2} seed={3}>
            <animate
              attributeName="baseFrequency"
              values="0.07;0.12;0.08;0.1"
              dur="0.4s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale={5} />
        </filter>
      </svg>

      <div className="mb-14 text-center">
        <p className="text-primary text-sm font-semibold tracking-widest uppercase">
          {c.stakesEyebrow}
        </p>
        <h2 className="font-outfit mt-3 text-4xl font-bold tracking-tight md:text-5xl">
          {c.stakesTitle1}
          <span className="text-primary">{c.stakesTitle2}</span>
        </h2>
      </div>

      <ul className="grid gap-6 md:grid-cols-2">
        {c.stakes.map((s, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <li
              key={s.title}
              className="border-foreground/10 bg-anthracite/50 relative flex items-center gap-4 rounded-2xl border p-6"
            >
              {timings && <ElectricBorder timing={timings[i]} />}
              <span className="bg-foreground/5 text-neon flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
                <Icon size={22} aria-hidden="true" />
              </span>
              <div>
                <p className="font-outfit text-lg font-semibold">{s.title}</p>
                <p className="text-foreground/70 mt-1 leading-relaxed">{s.text}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="font-outfit text-foreground/85 mx-auto mt-14 max-w-3xl text-center text-xl leading-relaxed md:text-2xl">
        {c.stakesWave}
      </p>
    </section>
  );
}
