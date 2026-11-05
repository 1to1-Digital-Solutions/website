"use client";

import { useEffect, useRef } from "react";
import {
  BOLT_EVENTS,
  boltState,
  center,
  easeInOut,
  radiusOf,
  rnd,
  shape,
  strokeBolt,
  type Pt,
} from "@/lib/bolt";

/**
 * The bolt that leads the visitor down the home page. After the stakes, every section that
 * comes into view receives it from the one above:
 *
 * - "Under your control": it enters the first card, runs around it and, as it passes the side
 *   next to another card, jumps to it; each card passes it on to its neighbours.
 * - Who I am: it runs around the photo.
 * - Projects: it enters the middle card and spreads to the sides.
 * - Testimonials: the same, from the first card.
 * - Is it for you?: it breaks into the point cloud in the background of the section.
 * - The plan: the cloud gathers into a bolt again, which goes through the 4 steps in order and
 *   ends on the "See the mentoring in detail" button.
 *
 * It plays once, on the way down. Scrolling back up only replays the stakes' points going back
 * to the hero, and reaching the hero again (or reloading) makes it ready for the next way down.
 * One canvas fixed over the page draws everything; nothing runs when there's nothing to draw.
 */

type StageId = "services" | "who" | "work" | "testimonials" | "forwho" | "process";
type Actor = { token: number; draw: (now: number) => boolean };
/** Where the bolt leaves from: an element's border, or a point inside it. */
type From = { el: Element; fx?: number; fy?: number };
type CardsTiming = { enter: number; lap: number; hop: number; chain?: boolean };

const SECTIONS: Record<StageId, string> = {
  services: "#services",
  who: "#who",
  work: "#work",
  testimonials: "#testimonials",
  forwho: "#for-who",
  process: "#process",
};

const TIMING: Record<"services" | "who" | "work" | "testimonials", CardsTiming> = {
  services: { enter: 700, lap: 1300, hop: 260 },
  who: { enter: 700, lap: 1700, hop: 0 },
  work: { enter: 700, lap: 1500, hop: 300 },
  testimonials: { enter: 700, lap: 1500, hop: 300 },
};

/** Cards side by side or one above the other, with only a gap between them. */
function adjacent(a: DOMRect, b: DOMRect) {
  const vOverlap = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
  const hOverlap = Math.min(a.right, b.right) - Math.max(a.left, b.left);
  const hGap = Math.max(b.left - a.right, a.left - b.right);
  const vGap = Math.max(b.top - a.bottom, a.top - b.bottom);
  return (
    (vOverlap > 0.5 * Math.min(a.height, b.height) && hGap > -2 && hGap < 90) ||
    (hOverlap > 0.5 * Math.min(a.width, b.width) && vGap > -2 && vGap < 90)
  );
}

export function BoltChoreography() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    const stakes = document.querySelector("#stakes ul");
    const cloudBox = document.querySelector("[data-bolt-cloud]");
    const forWho = document.querySelector(SECTIONS.forwho);
    // The cloud waits for the bolt only if the visitor is above it and will scroll down to it.
    boltState.cloudPending =
      !!forWho && forWho.getBoundingClientRect().top > window.innerHeight * 0.5;
    if (
      !canvas ||
      !ctx ||
      !stakes ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      boltState.cloudPending = false;
      return;
    }

    let W = 0;
    let H = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    let neon = "#40e0d0";
    const readNeon = () => {
      neon = getComputedStyle(document.documentElement).getPropertyValue("--neon").trim() || neon;
    };

    // ---- The drawing loop: a list of actors, each drawing itself until it's done. ----
    let actors: Actor[] = [];
    let waiting: { token: number; done: () => void }[] = [];
    let raf = 0;
    const loop = (now: number) => {
      ctx.clearRect(0, 0, W, H);
      for (const a of [...actors]) if (!a.draw(now)) actors = actors.filter((b) => b !== a);
      for (const w of [...waiting]) {
        if (!actors.some((a) => a.token === w.token)) {
          waiting = waiting.filter((x) => x !== w);
          w.done();
        }
      }
      raf = actors.length ? requestAnimationFrame(loop) : 0;
      if (!raf) ctx.clearRect(0, 0, W, H);
    };
    const add = (a: Actor) => {
      actors.push(a);
      if (!raf) raf = requestAnimationFrame(loop);
    };
    /** Resolves when everything a stage started has finished. */
    const settled = (token: number) =>
      new Promise<void>((done) => {
        if (!actors.some((a) => a.token === token)) done();
        else waiting.push({ token, done });
      });
    const wait = (token: number, ms: number): Actor => {
      const t0 = performance.now();
      return { token, draw: (now) => now - t0 < ms };
    };

    const flash = (el: Element) => {
      el.classList.remove("bolt-flash");
      void (el as HTMLElement).offsetWidth;
      el.classList.add("bolt-flash");
      window.setTimeout(() => el.classList.remove("bolt-flash"), 1000);
    };

    const onBorder = (el: Element, s: number) => {
      const r = radiusOf(el);
      return () => shape(el.getBoundingClientRect(), r).at(s);
    };
    const inside = (el: Element, fx: number, fy: number) => () => {
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width * fx, y: r.top + r.height * fy };
    };
    const sourceOf = (from: From, toward: Pt) => {
      if (from.fx !== undefined) return inside(from.el, from.fx, from.fy ?? 0.5);
      const sh = shape(from.el.getBoundingClientRect(), radiusOf(from.el));
      return onBorder(from.el, sh.nearest(toward));
    };

    /** A spark running once around an element's border, from `s0`. */
    const lap = (
      token: number,
      el: Element,
      s0: number,
      dur: number,
      passes: { d: number; fn: () => void; done?: boolean }[] = [],
      onEnd?: () => void
    ): Actor => {
      const radius = radiusOf(el);
      const seg = 0.16;
      const t0 = performance.now();
      let ended = false;
      flash(el);
      return {
        token,
        draw(now) {
          const p = (now - t0) / dur;
          for (const ps of passes) {
            if (!ps.done && p >= ps.d) {
              ps.done = true;
              ps.fn();
            }
          }
          if (p >= 1 && !ended) {
            ended = true;
            onEnd?.();
          }
          if (p >= 1 + seg) return false;
          const head = Math.min(p, 1);
          const tail = Math.max(0, p - seg);
          if (head <= tail) return true;
          const sh = shape(el.getBoundingClientRect(), radius);
          const n = Math.max(2, Math.ceil(((head - tail) * sh.len) / 4));
          const tick = Math.floor(now / 45);
          const pts: Pt[] = [];
          for (let i = 0; i <= n; i++) {
            const s = s0 + tail + ((head - tail) * i) / n;
            const q = sh.at(s);
            const k = Math.round(((((s % 1) + 1) % 1) * sh.len) / 4);
            const j = (rnd(k * 1.7 + tick * 7.3) - 0.5) * 4;
            pts.push({ x: q.x + q.nx * j, y: q.y + q.ny * j });
          }
          strokeBolt(ctx, pts, neon, Math.min(1, p * 8));
          return true;
        },
      };
    };

    /** A jagged bolt from one point to another: the head runs ahead and the tail follows. */
    const travel = (
      token: number,
      from: () => Pt,
      to: () => Pt,
      dur: number,
      onArrive: () => void,
      /** How far it zigzags: wide between sections, tight for the short jumps between cards. */
      wild = 0.09
    ): Actor => {
      const t0 = performance.now();
      const seed = Math.random() * 1000;
      const K = 26;
      let arrived = false;
      return {
        token,
        draw(now) {
          const p = (now - t0) / dur;
          if (p >= 1 && !arrived) {
            arrived = true;
            onArrive();
          }
          if (p >= 1.4) return false;
          const A = from();
          const a = { x: A.x, y: Math.max(A.y, -60) };
          const b = to();
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const L = Math.hypot(dx, dy) || 1;
          const nx = -dy / L;
          const ny = dx / L;
          const amp = Math.min(wild > 0.06 ? 26 : 8, L * wild);
          const tick = Math.floor(now / 50);
          const off = (k: number) =>
            (rnd(seed + k * 3.1 + tick * 17.7) - 0.5) * 2 * amp * Math.sin((Math.PI * k) / K);
          const pos = (f: number): Pt => {
            const k = Math.min(K - 1, Math.floor(f * K));
            const u = f * K - k;
            const o = off(k) * (1 - u) + off(k + 1) * u;
            return { x: a.x + dx * f + nx * o, y: a.y + dy * f + ny * o };
          };
          const head = easeInOut(Math.min(p, 1));
          const tail = Math.min(1, Math.max(0, p - 0.4));
          if (head <= tail) return true;
          const pts = [pos(tail)];
          for (let k = 1; k < K; k++) if (k / K > tail && k / K < head) pts.push(pos(k / K));
          pts.push(pos(head));
          strokeBolt(ctx, pts, neon);
          return true;
        },
      };
    };

    /**
     * The bolt enters `cards[entry]` and runs around it; as it passes the side closest to a
     * neighbour (or to the next card, in a chain) it jumps across and that card does the same.
     * Returns the cards in the order they were reached.
     */
    const spread = (token: number, from: From, cards: Element[], entry: number, t: CardsTiming) => {
      const reached: number[] = [];
      const taken = new Set<number>([entry]);
      const shapeOf = (i: number) => shape(cards[i].getBoundingClientRect(), radiusOf(cards[i]));
      const next = (i: number) => {
        if (t.chain) return i + 1 < cards.length ? [i + 1] : [];
        const a = cards[i].getBoundingClientRect();
        return cards
          .map((_, j) => j)
          .filter((j) => j !== i && adjacent(a, cards[j].getBoundingClientRect()));
      };
      const lapCard = (i: number, s0: number): Actor => {
        reached.push(i);
        const sh = shapeOf(i);
        const passes = next(i)
          .filter((j) => !taken.has(j))
          .map((j) => {
            const sOut = sh.nearest(center(cards[j].getBoundingClientRect()));
            return {
              d: (((sOut - s0) % 1) + 1) % 1,
              fn: () => {
                if (taken.has(j)) return;
                taken.add(j);
                const out = onBorder(cards[i], sOut);
                const sIn = shapeOf(j).nearest(out());
                add(
                  travel(
                    token,
                    out,
                    onBorder(cards[j], sIn),
                    t.hop,
                    () => add(lapCard(j, sIn)),
                    0.04
                  )
                );
              },
            };
          });
        return lap(token, cards[i], s0, t.lap, passes);
      };
      const src = sourceOf(from, center(cards[entry].getBoundingClientRect()));
      const sIn = shapeOf(entry).nearest(src());
      add(travel(token, src, onBorder(cards[entry], sIn), t.enter, () => add(lapCard(entry, sIn))));
      return reached;
    };

    /** The lowest card reached (the last one, on a tie): where the next bolt leaves from. */
    const lowest = (cards: Element[], reached: number[]) => {
      let best = reached[reached.length - 1] ?? 0;
      for (const i of reached) {
        if (
          cards[i].getBoundingClientRect().bottom >=
          cards[best].getBoundingClientRect().bottom - 2
        ) {
          best = i;
        }
      }
      return cards[best];
    };

    // ---- The stages, in order, each starting where the previous one ended. ----
    let last: From = { el: stakes };
    let current = 0;
    const alive = (token: number) => token === current;

    const play = async (id: StageId, token: number) => {
      const section = document.querySelector(SECTIONS[id]);
      if (!section) return;
      readNeon();

      if (id === "forwho") {
        const box = cloudBox ?? section;
        const target = inside(box, 0.5, 0.1);
        add(
          travel(token, sourceOf(last, target()), target, 750, () => {
            boltState.cloudPending = false;
            window.dispatchEvent(
              new CustomEvent<Pt>(BOLT_EVENTS.cloudArrive, { detail: target() })
            );
          })
        );
        await settled(token);
        if (alive(token)) last = { el: box, fx: 0.5, fy: 0.96 };
        return;
      }

      if (id === "process") {
        if (last.fx !== undefined) {
          // Coming from the cloud: part of it gathers into a point and becomes the bolt.
          window.dispatchEvent(
            new CustomEvent<Pt>(BOLT_EVENTS.cloudGather, {
              detail: inside(last.el, last.fx, last.fy ?? 0.5)(),
            })
          );
          add(wait(token, 700));
          await settled(token);
          if (!alive(token)) return;
        }
        const steps = Array.from(section.querySelectorAll("[data-bolt-card]"));
        if (steps.length) {
          spread(token, last, steps, 0, { enter: 700, lap: 650, hop: 380, chain: true });
          await settled(token);
          if (!alive(token)) return;
          last = { el: steps[steps.length - 1] };
        }
        const end = section.querySelector("[data-bolt-end]");
        if (end) {
          spread(token, last, [end], 0, { enter: 500, lap: 1000, hop: 0 });
          await settled(token);
          if (alive(token)) last = { el: end };
        }
        return;
      }

      const cards = Array.from(section.querySelectorAll("[data-bolt-card]"));
      if (!cards.length) return;
      const entry = Math.max(
        0,
        cards.findIndex((c) => c.hasAttribute("data-bolt-entry"))
      );
      const reached = spread(token, last, cards, entry, TIMING[id]);
      await settled(token);
      if (alive(token)) last = { el: lowest(cards, reached) };
    };

    const near = (el: Element | null) => {
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return r.bottom > -100 && r.top < window.innerHeight + 100;
    };
    let queue: StageId[] = [];
    let running: StageId | null = null;
    const stop = () => {
      current++;
      actors = [];
      for (const w of waiting) w.done();
      waiting = [];
    };
    const pump = async () => {
      if (running) return;
      while (queue.length) {
        const id = queue.shift() as StageId;
        // Scrolled past it while another stage was playing: skip it.
        if (!near(document.querySelector(SECTIONS[id]))) {
          if (id === "forwho") boltState.cloudPending = false;
          continue;
        }
        running = id;
        await play(id, ++current);
        running = null;
      }
    };

    // ---- When to play: a section coming into view on the way down, once per way down. ----
    const played = new Set<StageId>();
    let lastY = window.scrollY;
    let down = false;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) > 2) {
        down = y > lastY;
        lastY = y;
      }
    };
    const idOf = new Map<Element, StageId>();
    (Object.keys(SECTIONS) as StageId[]).forEach((id) => {
      // It starts when the cards (not the section title) are well into view.
      const section = document.querySelector(SECTIONS[id]);
      const el = section?.querySelector("[data-bolt-trigger]") ?? section;
      if (el) idOf.set(el, id);
    });
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = idOf.get(e.target);
          if (!id || !e.isIntersecting || !down || played.has(id)) continue;
          played.add(id);
          queue.push(id);
          // The stage on screen has been left behind: don't keep the new one waiting.
          if (running && !near(document.querySelector(SECTIONS[running]))) stop();
          void pump();
        }
      },
      { rootMargin: "0px 0px -45% 0px" }
    );
    idOf.forEach((_, el) => observer.observe(el));

    const onReset = () => {
      stop();
      queue = [];
      played.clear();
      last = { el: stakes };
      boltState.cloudPending = true;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener(BOLT_EVENTS.reset, onReset);
    return () => {
      observer.disconnect();
      stop();
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener(BOLT_EVENTS.reset, onReset);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[150] h-full w-full"
    />
  );
}
