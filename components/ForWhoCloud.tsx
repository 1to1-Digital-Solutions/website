"use client";

import { useEffect, useRef } from "react";
import { BOLT_EVENTS, boltState, easeIn, type Pt } from "@/lib/bolt";

type Dot = {
  hx: number;
  hy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
  ph: number;
  /** When it left to gather into the bolt, or 0. */
  gone: number;
  gx: number;
  gy: number;
  /** When it (re)appeared, for the fade in. */
  born: number;
};

const GATHER = 650;
const BACK = 1500;

/** A cloud with no shape: a few soft clusters and some loose points, spread over the box. */
function scatter(W: number, H: number, now: number): Dot[] {
  const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
  const blobs = Array.from({ length: 5 }, () => ({
    x: W * (0.1 + Math.random() * 0.8),
    y: H * (0.15 + Math.random() * 0.7),
  }));
  const n = Math.round(Math.min(650, Math.max(160, (W * H) / 1900)));
  return Array.from({ length: n }, () => {
    let x: number;
    let y: number;
    if (Math.random() < 0.3) {
      x = Math.random() * W;
      y = Math.random() * H;
    } else {
      const b = blobs[Math.floor(Math.random() * blobs.length)];
      x = b.x + gauss() * W * 0.22;
      y = b.y + gauss() * H * 0.25;
    }
    x = Math.min(W - 4, Math.max(4, x));
    y = Math.min(H - 4, Math.max(4, y));
    return {
      hx: x,
      hy: y,
      x,
      y,
      vx: 0,
      vy: 0,
      r: 0.7 + Math.random() * 1,
      a: 0.18 + Math.random() * 0.4,
      ph: Math.random() * Math.PI * 2,
      gone: 0,
      gx: 0,
      gy: 0,
      born: now,
    };
  });
}

/**
 * Background of "Is it for you?": the bolt from the testimonials breaks into a cloud of points
 * that drift and move out of the way of the cursor. When the plan comes into view, part of the
 * cloud gathers into a point and becomes the bolt again (see BoltChoreography).
 */
export function ForWhoCloud() {
  const boxRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!box || !canvas || !ctx) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0;
    let H = 0;
    let dots: Dot[] = [];
    // Hidden until the bolt arrives (or there's no bolt coming).
    let shown = false;
    let visible = false;
    let raf = 0;
    let mouse: Pt | null = null;
    let fallback = 0;
    let neon = "#40e0d0";

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = box.clientWidth;
      H = box.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = scatter(W, H, performance.now());
    };

    const frame = (now: number) => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = neon;
      for (const d of dots) {
        let alpha = d.a * Math.min(1, (now - d.born) / 900);
        if (d.gone) {
          const k = Math.max(0, (now - d.gone) / GATHER);
          if (k < 1) {
            const e = easeIn(k);
            d.x += (d.gx - d.x) * e;
            d.y += (d.gy - d.y) * e;
            alpha *= 1 - k * 0.6;
          } else if (now - d.gone < GATHER + BACK) {
            continue;
          } else {
            // Back home, fading in where it used to be.
            d.gone = 0;
            d.x = d.hx;
            d.y = d.hy;
            d.vx = d.vy = 0;
            d.born = now;
            continue;
          }
        } else if (!still) {
          // A slow drift around home, a spring back to it and a push away from the cursor.
          const tx = d.hx + Math.sin(now / 1700 + d.ph) * 7;
          const ty = d.hy + Math.cos(now / 2100 + d.ph) * 6;
          d.vx += (tx - d.x) * 0.012;
          d.vy += (ty - d.y) * 0.012;
          if (mouse) {
            const dx = d.x - mouse.x;
            const dy = d.y - mouse.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 120 && dist > 0.1) {
              const f = (1 - dist / 120) * 1.4;
              d.vx += (dx / dist) * f;
              d.vy += (dy / dist) * f;
            }
          }
          d.vx *= 0.9;
          d.vy *= 0.9;
          d.x += d.vx;
          d.y += d.vy;
        }
        if (alpha <= 0.01) continue;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = visible && shown && !still ? requestAnimationFrame(frame) : 0;
    };
    const start = () => {
      neon = getComputedStyle(document.documentElement).getPropertyValue("--neon").trim() || neon;
      if (!raf && visible && shown) raf = requestAnimationFrame(frame);
    };
    const show = () => {
      if (shown) return;
      shown = true;
      const now = performance.now();
      for (const d of dots) d.born = now;
      start();
    };

    const toLocal = (p: Pt) => {
      const r = box.getBoundingClientRect();
      return { x: p.x - r.left, y: p.y - r.top };
    };
    const onArrive = (e: Event) => {
      window.clearTimeout(fallback);
      const p = toLocal((e as CustomEvent<Pt>).detail);
      const now = performance.now();
      // The bolt breaks into points that fly out to their place in the cloud.
      for (const d of dots) {
        const a = Math.random() * Math.PI * 2;
        const v = 2 + Math.random() * 9;
        d.x = p.x;
        d.y = p.y;
        d.vx = Math.cos(a) * v;
        d.vy = Math.sin(a) * v * 0.6;
        d.gone = 0;
        d.born = now - 500;
      }
      shown = false;
      show();
    };
    const onGather = (e: Event) => {
      const p = toLocal((e as CustomEvent<Pt>).detail);
      const now = performance.now();
      for (const d of dots) {
        if (Math.random() < 0.4) {
          d.gone = now + Math.random() * 120;
          d.gx = p.x;
          d.gy = p.y;
        }
      }
      start();
    };
    const onReset = () => {
      shown = false;
      ctx.clearRect(0, 0, W, H);
    };
    const onMove = (e: PointerEvent) => {
      if (!visible) return;
      const p = toLocal({ x: e.clientX, y: e.clientY });
      mouse = p.x >= 0 && p.y >= 0 && p.x <= W && p.y <= H ? p : null;
    };

    resize();
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) {
        mouse = null;
        return;
      }
      if (!shown) {
        // The bolt is on its way: wait for it, but don't leave the section empty if it never comes.
        window.clearTimeout(fallback);
        if (boltState.cloudPending) fallback = window.setTimeout(show, 3500);
        else show();
      }
      if (still && shown) frame(performance.now());
      start();
    });
    observer.observe(box);
    const ro = new ResizeObserver(() => {
      resize();
      if (still && shown) frame(performance.now());
    });
    ro.observe(box);

    window.addEventListener(BOLT_EVENTS.cloudArrive, onArrive);
    window.addEventListener(BOLT_EVENTS.cloudGather, onGather);
    window.addEventListener(BOLT_EVENTS.reset, onReset);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      observer.disconnect();
      ro.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(fallback);
      window.removeEventListener(BOLT_EVENTS.cloudArrive, onArrive);
      window.removeEventListener(BOLT_EVENTS.cloudGather, onGather);
      window.removeEventListener(BOLT_EVENTS.reset, onReset);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      ref={boxRef}
      data-bolt-cloud
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-t-[3rem]"
    >
      <canvas ref={ref} className="h-full w-full" />
    </div>
  );
}
