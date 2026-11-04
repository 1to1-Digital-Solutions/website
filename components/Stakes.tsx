"use client";

import { useEffect, useRef, useState } from "react";
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

/**
 * Sparks: points that start where the hero's cloud was (above the list, to the right) and
 * fly along a curve to a point on a card's border. When they land, the borders light up.
 * Returns the id of the animation frame, so it can be cancelled.
 */
function flySparks(canvas: HTMLCanvasElement, list: HTMLElement, onLanded: () => void) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const W = canvas.clientWidth;
  const H = canvas.clientHeight;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    onLanded();
    return 0;
  }
  ctx.scale(dpr, dpr);
  const neon = getComputedStyle(document.documentElement).getPropertyValue("--neon").trim();
  const box = canvas.getBoundingClientRect();
  const cards = Array.from(list.querySelectorAll("li")).map((li) => {
    const r = li.getBoundingClientRect();
    return { x: r.left - box.left, y: r.top - box.top, w: r.width, h: r.height };
  });

  // A random point on the border of a card.
  const onBorder = (c: (typeof cards)[number]) => {
    const per = 2 * (c.w + c.h);
    let d = Math.random() * per;
    if (d < c.w) return { x: c.x + d, y: c.y };
    d -= c.w;
    if (d < c.h) return { x: c.x + c.w, y: c.y + d };
    d -= c.h;
    if (d < c.w) return { x: c.x + c.w - d, y: c.y + c.h };
    return { x: c.x, y: c.y + c.h - (d - c.w) };
  };

  const N = 220;
  // Where the cloud was: the top of the viewport, on the right on wide screens.
  const cloud = {
    x: W * (W > 1024 ? 0.72 : 0.5),
    y: Math.max(40, -box.top + window.innerHeight * 0.2),
  };
  const sparks = Array.from({ length: N }, (_, i) => {
    const a = Math.random() * Math.PI * 2;
    const rad = Math.random() * Math.min(W, H) * 0.18;
    const from = { x: cloud.x + Math.cos(a) * rad, y: cloud.y + Math.sin(a) * rad * 0.7 };
    const to = onBorder(cards[i % cards.length]);
    const ctrl = {
      x: (from.x + to.x) / 2 + (Math.random() - 0.5) * W * 0.4,
      y: from.y + (to.y - from.y) * 0.3,
    };
    return { from, to, ctrl, start: Math.random() * 450, dur: 900 + Math.random() * 600 };
  });
  const total = Math.max(...sparks.map((s) => s.start + s.dur)) + 350;
  const point = (s: (typeof sparks)[number], t: number) => {
    const u = 1 - t;
    return {
      x: u * u * s.from.x + 2 * u * t * s.ctrl.x + t * t * s.to.x,
      y: u * u * s.from.y + 2 * u * t * s.ctrl.y + t * t * s.to.y,
    };
  };
  const ease = (t: number) => 1 - Math.pow(1 - t, 3);

  let landed = false;
  let raf = 0;
  const t0 = performance.now();
  const frame = (now: number) => {
    const el = now - t0;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = neon;
    ctx.strokeStyle = neon;
    ctx.shadowColor = neon;
    ctx.shadowBlur = 8;
    for (const s of sparks) {
      const t = Math.min(Math.max((el - s.start) / s.dur, 0), 1);
      if (t <= 0) continue;
      const k = ease(t);
      const p = point(s, k);
      const q = point(s, Math.max(ease(Math.max(t - 0.08, 0)), 0));
      // Fade out once landed.
      const fade = t < 1 ? 1 : Math.max(0, 1 - (el - s.start - s.dur) / 300);
      if (fade <= 0) continue;
      ctx.globalAlpha = fade;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(q.x, q.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    if (!landed && el > total - 500) {
      landed = true;
      onLanded();
    }
    if (el < total) raf = requestAnimationFrame(frame);
    else ctx.clearRect(0, 0, W, H);
  };
  raf = requestAnimationFrame(frame);
  return raf;
}

/** StoryBrand "stakes": what the client risks by not acting. Right after the hero. */
export function Stakes() {
  const { lang } = useLanguage();
  const c = HOME[lang];
  const listRef = useRef<HTMLUListElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Random per visit, set once the sparks land (after mount, so server and client match).
  const [timings, setTimings] = useState<Timing[] | null>(null);
  const [lit, setLit] = useState(false);
  const count = c.stakes.length;

  useEffect(() => {
    const ignite = () => {
      setLit(true);
      setTimings(
        Array.from({ length: count }, () => ({
          delay: Math.random() * 2.5,
          dur: 4.5 + Math.random() * 3,
        }))
      );
    };
    const list = listRef.current;
    const canvas = canvasRef.current;
    if (!list || !canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ignite();
      return;
    }

    let raf = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();
        raf = flySparks(canvas, list, ignite);
      },
      { rootMargin: "0px 0px -25% 0px" }
    );
    observer.observe(list);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
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
        {/* The hero's point cloud, turned into sparks that fly down to the cards. */}
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
