"use client";

import { useEffect, useRef } from "react";
import { BOLT_EVENTS, boltState, type Pt } from "@/lib/bolt";

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
  /** In the cloud (landed), and since when, for the fade in. */
  vis: boolean;
  born: number;
};

/**
 * A cloud with no shape: a few soft clusters and loose points spread over the box, leaving out
 * the cards (they're opaque, a point behind them would never be seen).
 */
function scatter(W: number, H: number, solid: DOMRect[]): Dot[] {
  const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
  const blobs = Array.from({ length: 6 }, () => ({
    x: W * (0.08 + Math.random() * 0.84),
    y: H * (0.12 + Math.random() * 0.76),
  }));
  const free = (x: number, y: number) =>
    !solid.some((r) => x > r.left - 6 && x < r.right + 6 && y > r.top - 6 && y < r.bottom + 6);
  const want = Math.round(Math.min(1500, Math.max(400, (W * H) / 900)));
  const dots: Dot[] = [];
  for (let tries = 0; dots.length < want && tries < want * 6; tries++) {
    let x: number;
    let y: number;
    if (Math.random() < 0.35) {
      x = Math.random() * W;
      y = Math.random() * H;
    } else {
      const b = blobs[Math.floor(Math.random() * blobs.length)];
      x = b.x + gauss() * W * 0.22;
      y = b.y + gauss() * H * 0.25;
    }
    // Inside the box, below its rounded top corners, and not behind a card.
    if (x < 4 || x > W - 4 || y < 40 || y > H - 4 || !free(x, y)) continue;
    dots.push({
      hx: x,
      hy: y,
      x,
      y,
      vx: 0,
      vy: 0,
      r: 0.6 + Math.random() * 1.1,
      a: 0.2 + Math.random() * 0.45,
      ph: Math.random() * Math.PI * 2,
      vis: false,
      born: 0,
    });
  }
  return dots;
}

/**
 * Background of "Is it for you?". Empty until the points flow in from the testimonials (see
 * BoltChoreography); then a cloud that drifts and moves out of the way of the cursor. When the
 * plan comes into view, the whole cloud flows down to the first step and the section stays
 * empty until the next way down.
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
    let visible = false;
    // Handed over to the plan: it stays empty until the visitor is back at the hero.
    let emptied = false;
    let raf = 0;
    let mouse: Pt | null = null;
    let fallback = 0;
    let neon = "#40e0d0";

    /** Where the cards are, inside the box. */
    const solid = () => {
      const b = box.getBoundingClientRect();
      return Array.from(box.parentElement?.querySelectorAll("[data-cloud-solid]") ?? []).map(
        (el) => {
          const r = el.getBoundingClientRect();
          return new DOMRect(r.left - b.left, r.top - b.top, r.width, r.height);
        }
      );
    };
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = box.clientWidth;
      H = box.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const was = dots.some((d) => d.vis);
      dots = scatter(W, H, solid());
      if (was) for (const d of dots) d.vis = true;
    };

    const anyVisible = () => dots.some((d) => d.vis);
    const frame = (now: number) => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = neon;
      for (const d of dots) {
        if (!d.vis) continue;
        if (!still) {
          // A slow drift around home, a spring back to it and a push away from the cursor.
          const tx = d.hx + Math.sin(now / 1700 + d.ph) * 6;
          const ty = d.hy + Math.cos(now / 2100 + d.ph) * 5;
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
        ctx.globalAlpha = d.a * Math.min(1, Math.max(0, (now - d.born) / 400));
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = visible && !still && anyVisible() ? requestAnimationFrame(frame) : 0;
    };
    const start = () => {
      neon = getComputedStyle(document.documentElement).getPropertyValue("--neon").trim() || neon;
      if (still) frame(performance.now());
      else if (!raf && visible && anyVisible()) raf = requestAnimationFrame(frame);
    };
    /** No points are coming (reloaded further down, scrolled past): just show the cloud. */
    const showAll = () => {
      if (anyVisible() || emptied) return;
      const now = performance.now();
      for (const d of dots) {
        d.vis = true;
        d.born = now + Math.random() * 600;
      }
      start();
    };

    boltState.cloud = {
      count: () => {
        // Placed now, with the cards where they really are (they slide in on scroll).
        if (!dots.some((d) => d.vis)) dots = scatter(W, H, solid());
        return dots.length;
      },
      homes: () => {
        const b = box.getBoundingClientRect();
        return (i) => {
          const d = dots[i];
          return d ? { x: b.left + d.hx, y: b.top + d.hy } : { x: b.left, y: b.top };
        };
      },
      reveal: (i) => {
        window.clearTimeout(fallback);
        const d = dots[i];
        if (!d || d.vis) return;
        d.vis = true;
        d.born = performance.now() - 300;
        d.x = d.hx;
        d.y = d.hy;
        d.vx = d.vy = 0;
        start();
      },
      release: () => {
        window.clearTimeout(fallback);
        emptied = true;
        const b = box.getBoundingClientRect();
        const out: Pt[] = [];
        for (const d of dots) {
          if (!d.vis) continue;
          out.push({ x: b.left + d.x, y: b.top + d.y });
          d.vis = false;
        }
        ctx.clearRect(0, 0, W, H);
        return out;
      },
    };

    const onReset = () => {
      emptied = false;
      for (const d of dots) d.vis = false;
      ctx.clearRect(0, 0, W, H);
    };
    const onMove = (e: PointerEvent) => {
      if (!visible) return;
      const r = box.getBoundingClientRect();
      const p = { x: e.clientX - r.left, y: e.clientY - r.top };
      mouse = p.x >= 0 && p.y >= 0 && p.x <= W && p.y <= H ? p : null;
    };

    resize();
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      window.clearTimeout(fallback);
      if (!visible) {
        mouse = null;
        return;
      }
      // The points are on their way: wait for them, but don't leave it empty if they never come.
      if (!anyVisible() && !emptied) {
        fallback = window.setTimeout(showAll, boltState.cloudPending ? 4000 : 800);
      }
      start();
    });
    observer.observe(box);
    const ro = new ResizeObserver(() => {
      resize();
      start();
    });
    ro.observe(box);

    window.addEventListener(BOLT_EVENTS.reset, onReset);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      boltState.cloud = null;
      observer.disconnect();
      ro.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(fallback);
      window.removeEventListener(BOLT_EVENTS.reset, onReset);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      ref={boxRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-t-[3rem]"
    >
      <canvas ref={ref} className="h-full w-full" />
    </div>
  );
}
