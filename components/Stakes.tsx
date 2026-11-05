"use client";

import { useEffect, useRef, useState } from "react";
import { Clock, KeyRound, ShieldAlert, TrendingDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { HOME } from "@/content/home";

const ICONS = [TrendingDown, Clock, ShieldAlert, KeyRound];

type Timing = { delay: number; dur: number };

/**
 * The spark that runs once around a card's border, starting at a random moment. Two strokes
 * (neon glow and a white core) with a
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
          strokeOpacity={0.75}
          strokeWidth={1.8}
        />
        <rect
          width="100%"
          height="100%"
          rx="16"
          pathLength={100}
          stroke="white"
          strokeOpacity={0.5}
          strokeWidth={0.7}
        />
      </g>
    </svg>
  );
}

/**
 * Points of the hero's cloud travelling to the cards ("down") or back to the cloud ("up").
 * Each point follows a gentle curve between the cloud (the top of the viewport, on the right
 * on wide screens) and a point on a card's border. Calls `onDone` near the end, and returns a
 * function that stops the animation.
 */
function flyDots(
  canvas: HTMLCanvasElement,
  list: HTMLElement,
  dir: "down" | "up",
  onDone: () => void
) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const W = canvas.clientWidth;
  const H = canvas.clientHeight;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    onDone();
    return () => {};
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const neon = getComputedStyle(document.documentElement).getPropertyValue("--neon").trim();
  const box = canvas.getBoundingClientRect();
  const cards = Array.from(list.querySelectorAll("li")).map((li) => {
    const r = li.getBoundingClientRect();
    return { x: r.left - box.left, y: r.top - box.top, w: r.width, h: r.height };
  });

  // A random point on the border of a card.
  const onBorder = (c: (typeof cards)[number]) => {
    let d = Math.random() * 2 * (c.w + c.h);
    if (d < c.w) return { x: c.x + d, y: c.y };
    d -= c.w;
    if (d < c.h) return { x: c.x + c.w, y: c.y + d };
    d -= c.h;
    if (d < c.w) return { x: c.x + c.w - d, y: c.y + c.h };
    return { x: c.x, y: c.y + c.h - (d - c.w) };
  };

  const cloud = {
    x: W * (W > 1024 ? 0.72 : 0.5),
    y: Math.max(40, -box.top + window.innerHeight * 0.2),
  };
  const dots = Array.from({ length: 260 }, (_, i) => {
    const a = Math.random() * Math.PI * 2;
    const rad = Math.sqrt(Math.random()) * Math.min(W, H) * 0.2;
    const inCloud = { x: cloud.x + Math.cos(a) * rad, y: cloud.y + Math.sin(a) * rad * 0.7 };
    const onCard = onBorder(cards[i % cards.length]);
    const [from, to] = dir === "down" ? [inCloud, onCard] : [onCard, inCloud];
    const ctrl = {
      x: (from.x + to.x) / 2 + (Math.random() - 0.5) * W * 0.25,
      y: (from.y + to.y) / 2,
    };
    return {
      from,
      to,
      ctrl,
      r: 0.8 + Math.random() * 1.1,
      start: Math.random() * 500,
      dur: 1100 + Math.random() * 700,
    };
  });
  const total = Math.max(...dots.map((d) => d.start + d.dur)) + 400;
  const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  let done = false;
  let raf = 0;
  const t0 = performance.now();
  const frame = (now: number) => {
    const el = now - t0;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = neon;
    for (const d of dots) {
      const t = Math.min(Math.max((el - d.start) / d.dur, 0), 1);
      const k = ease(t);
      const u = 1 - k;
      const x = u * u * d.from.x + 2 * u * k * d.ctrl.x + k * k * d.to.x;
      const y = u * u * d.from.y + 2 * u * k * d.ctrl.y + k * k * d.to.y;
      // Soft: fade in as they leave, fade out as they arrive (into the border or the cloud).
      const after = Math.max(0, el - d.start - d.dur);
      const alpha =
        dir === "down"
          ? Math.min(1, t * 5) * (t < 1 ? 1 : Math.max(0, 1 - after / 350))
          : Math.min(1, t * 5) * (1 - Math.pow(t, 3));
      if (alpha <= 0) continue;
      ctx.globalAlpha = alpha * 0.55;
      ctx.beginPath();
      ctx.arc(x, y, d.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    if (!done && el > total - 550) {
      done = true;
      onDone();
    }
    if (el < total) raf = requestAnimationFrame(frame);
    else ctx.clearRect(0, 0, W, H);
  };
  raf = requestAnimationFrame(frame);
  return () => {
    cancelAnimationFrame(raf);
    ctx.clearRect(0, 0, W, H);
  };
}

/** StoryBrand "stakes": what the client risks by not acting. Right after the hero. */
export function Stakes() {
  const { lang } = useLanguage();
  const c = HOME[lang];
  const listRef = useRef<HTMLUListElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Random per visit, set once the points land (after mount, so server and client match).
  const [timings, setTimings] = useState<Timing[] | null>(null);
  const [lit, setLit] = useState(false);
  const count = c.stakes.length;

  useEffect(() => {
    const ignite = () => {
      setLit(true);
      setTimings(
        Array.from({ length: count }, () => ({
          delay: Math.random(),
          dur: 2.2 + Math.random() * 0.8,
        }))
      );
    };
    const douse = () => {
      setLit(false);
      setTimings(null);
    };
    const list = listRef.current;
    const canvas = canvasRef.current;
    if (!list || !canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ignite();
      return;
    }

    // Scrolling down to the cards: the points fly to them and light them up. Scrolling back
    // up past them: the current goes off and the points return to the cloud.
    let at: "cloud" | "cards" = "cloud";
    let stop = () => {};
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && at === "cloud") {
          at = "cards";
          stop();
          stop = flyDots(canvas, list, "down", ignite);
        } else if (!entry.isIntersecting && entry.boundingClientRect.top > 0 && at === "cards") {
          at = "cloud";
          stop();
          douse();
          stop = flyDots(canvas, list, "up", () => {});
        }
      },
      { rootMargin: "0px 0px -25% 0px" }
    );
    observer.observe(list);
    return () => {
      observer.disconnect();
      stop();
    };
  }, [count]);

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

      <ul ref={listRef} className="relative grid gap-6 md:grid-cols-2">
        {c.stakes.map((s, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <li
              key={s.title}
              className={`${lit ? "electric-flash" : ""} border-foreground/10 bg-anthracite/50 relative flex items-center gap-4 rounded-2xl border p-6`}
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
        {/* Where the points of the hero's cloud travel to the cards and back. */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-[80vh] z-10 h-[calc(100%+80vh)] w-full"
        />
      </ul>

      <p className="font-outfit text-foreground/85 mx-auto mt-14 max-w-3xl text-center text-xl leading-relaxed md:text-2xl">
        {c.stakesWave}
      </p>
    </section>
  );
}
