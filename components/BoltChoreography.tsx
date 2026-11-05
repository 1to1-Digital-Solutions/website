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
 * The light that leads the visitor down the home page. After the stakes, every section that
 * comes into view receives it from the one above:
 *
 * - "Under your control": a dimmer bolt comes down to the middle card, runs around it and,
 *   as it passes the side next to another card, a mini bolt jumps to it; each card passes it on.
 * - Who I am: a bolt comes down from the section above and runs around the photo.
 * - Projects: it comes down to the middle card and spreads to the sides.
 * - Testimonials: it comes down and forks, into both cards at once.
 * - Is it for you?: the points flow from the testimonials into a cloud behind the section.
 * - The plan: the cloud flows down onto the first step and becomes the bolt again, which goes
 *   through the 4 steps in order, runs around the "See the mentoring in detail" button and goes
 *   out with a spark and a wisp of smoke.
 *
 * It plays once, on the way down. Scrolling back up only replays the stakes' points going back
 * to the hero, and reaching the hero again (or reloading) makes it ready for the next way down.
 * One canvas fixed over the page draws everything; nothing runs when there's nothing to draw.
 */

type StageId = "services" | "who" | "work" | "testimonials" | "forwho" | "process";
type Actor = { token: number; draw: (now: number) => boolean };
type Timing = {
  lap: number;
  hop: number;
  /** A dimmer tone, so it doesn't weigh on a section full of cards. */
  dim?: boolean;
  chain?: boolean;
  onLapEnd?: (i: number) => void;
};

/** How bright the dimmer bolt is, against the full one. */
const DIM = 0.5;

const ORDER: StageId[] = ["services", "who", "work", "testimonials", "forwho", "process"];

const SECTIONS: Record<StageId, string> = {
  services: "#services",
  who: "#who",
  work: "#work",
  testimonials: "#testimonials",
  forwho: "#for-who",
  process: "#process",
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

const shapeOf = (el: Element) => shape(el.getBoundingClientRect(), radiusOf(el));
/** The middle of an element's top edge, where a bolt from above comes in. */
const topMid = (el: Element) => {
  const r = el.getBoundingClientRect();
  return shapeOf(el).nearest({ x: r.left + r.width / 2, y: r.top });
};
const randomOnBorder = (el: Element): Pt => shapeOf(el).at(Math.random());
/**
 * The next section slides over this one as the page scrolls: when it covers the point, the
 * light around this element must not be drawn on top of it.
 */
const covered = (el: Element, p: Pt) => {
  if (p.x < 0 || p.y < 0 || p.x >= window.innerWidth || p.y >= window.innerHeight) return false;
  const hit = document.elementFromPoint(p.x, p.y)?.closest(".card-section");
  return !!hit && hit !== el.closest(".card-section");
};

export function BoltChoreography() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    const stakes = document.querySelector("#stakes ul");
    const forWho = document.querySelector(SECTIONS.forwho);
    // The cloud waits for the points only if the visitor is above it and will scroll down to it.
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
    /**
     * A point straight above `target`, at the seam with the section above: bolts come down
     * from one section into the next.
     */
    const above = (target: () => Pt, section: Element) => {
      const dx = (Math.random() - 0.5) * 50;
      const seam = section.closest(".card-section") ?? section;
      return () => {
        const t = target();
        const top = seam.getBoundingClientRect().top;
        return { x: t.x + dx, y: Math.max(-60, Math.min(top - 40, t.y - 260)) };
      };
    };

    /**
     * A bolt running once around an element's border, from `s0`. `fade` makes it flicker out
     * at the end, like it's going off.
     */
    const lap = (
      token: number,
      el: Element,
      s0: number,
      dur: number,
      o: {
        dim?: boolean;
        fade?: boolean;
        passes?: { d: number; fn: () => void; done?: boolean }[];
        onEnd?: () => void;
      } = {}
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
          for (const ps of o.passes ?? []) {
            if (!ps.done && p >= ps.d) {
              ps.done = true;
              ps.fn();
            }
          }
          if (p >= 1 && !ended) {
            ended = true;
            o.onEnd?.();
          }
          if (p >= 1 + seg) return false;
          const head = Math.min(p, 1);
          const tail = Math.max(0, p - seg);
          if (head <= tail) return true;
          const sh = shape(el.getBoundingClientRect(), radius);
          if (covered(el, sh.at(s0 + head))) return true;
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
          let alpha = Math.min(1, p * 8) * (o.dim ? DIM : 1);
          // Going off: it flickers and dims over the last stretch.
          if (o.fade && p > 0.65) {
            alpha *= (0.3 + 0.7 * rnd(tick * 3.7)) * Math.max(0.2, 1 - (p - 0.65) * 1.6);
          }
          strokeBolt(ctx, pts, neon, alpha);
          return true;
        },
      };
    };

    /** A bolt from one point to another: the head runs ahead and the tail follows. */
    const travel = (
      token: number,
      from: () => Pt,
      to: () => Pt,
      dur: number,
      onArrive: () => void,
      /** How far it zigzags: wide between sections, tight for the mini bolts between cards. */
      wild = 0.09,
      dim = false
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
          strokeBolt(ctx, pts, neon, dim ? DIM : 1);
          return true;
        },
      };
    };

    /**
     * Points flying along gentle curves from `starts` to their targets (read every frame, so
     * they follow the page). `onLand(i)` as each one arrives, `onDone` when they all have.
     */
    const flight = (
      token: number,
      starts: Pt[],
      targets: () => (i: number) => Pt,
      o: {
        dur: [number, number];
        stagger: number;
        alpha: number;
        onLand?: (i: number) => void;
        onDone?: () => void;
      }
    ): Actor => {
      const t0 = performance.now();
      const dots = starts.map((s) => ({
        s,
        start: Math.random() * o.stagger,
        dur: o.dur[0] + Math.random() * (o.dur[1] - o.dur[0]),
        bend: (Math.random() - 0.5) * 0.5,
        r: 0.8 + Math.random() * 1.1,
        landed: false,
      }));
      let left = dots.length;
      if (!left) o.onDone?.();
      return {
        token,
        draw(now) {
          const el = now - t0;
          const target = targets();
          ctx.fillStyle = neon;
          dots.forEach((d, i) => {
            if (d.landed) return;
            const t = Math.min(1, Math.max(0, (el - d.start) / d.dur));
            if (t <= 0) return;
            if (t >= 1) {
              d.landed = true;
              left--;
              o.onLand?.(i);
              if (!left) o.onDone?.();
              return;
            }
            const e = target(i);
            const k = easeInOut(t);
            const u = 1 - k;
            const dx = e.x - d.s.x;
            const dy = e.y - d.s.y;
            const cx = (d.s.x + e.x) / 2 - dy * d.bend;
            const cy = (d.s.y + e.y) / 2 + dx * d.bend;
            const x = u * u * d.s.x + 2 * u * k * cx + k * k * e.x;
            const y = u * u * d.s.y + 2 * u * k * cy + k * k * e.y;
            ctx.globalAlpha = o.alpha * Math.min(1, t * 5);
            ctx.beginPath();
            ctx.arc(x, y, d.r, 0, Math.PI * 2);
            ctx.fill();
          });
          ctx.globalAlpha = 1;
          return left > 0;
        },
      };
    };

    /** The end: a spark flying out from a point of the border and a wisp of smoke rising. */
    const burnOut = (token: number, target: Element, s: number): Actor => {
      const t0 = performance.now();
      const at = onBorder(target, s);
      const sparks = Array.from({ length: 26 }, () => {
        const a = Math.random() * Math.PI * 2;
        const v = 60 + Math.random() * 160;
        return { vx: Math.cos(a) * v, vy: Math.sin(a) * v - 40, life: 350 + Math.random() * 400 };
      });
      const puffs = Array.from({ length: 7 }, (_, i) => ({
        dx: (Math.random() - 0.5) * 14,
        delay: i * 90,
        rise: 22 + Math.random() * 22,
        drift: (Math.random() - 0.5) * 18,
        life: 1400 + Math.random() * 700,
      }));
      return {
        token,
        draw(now) {
          const el = now - t0;
          const p = at();
          let going = el < 2200;
          if (covered(target, p)) return going;
          // Smoke first, so the sparks sit on top.
          for (const f of puffs) {
            const k = (el - f.delay) / f.life;
            if (k < 1) going = true;
            if (k < 0 || k >= 1) continue;
            const x = p.x + f.dx + f.drift * k;
            const y = p.y - f.rise * Math.sqrt(k) - 4;
            const r = 4 + 20 * k;
            const g = ctx.createRadialGradient(x, y, 0, x, y, r);
            const a = 0.22 * (1 - k) * Math.min(1, k * 6);
            g.addColorStop(0, `rgba(190,200,200,${a})`);
            g.addColorStop(1, "rgba(190,200,200,0)");
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.lineCap = "round";
          ctx.lineWidth = 1.2;
          for (const sp of sparks) {
            const k = el / sp.life;
            if (k >= 1) continue;
            going = true;
            const t = el / 1000;
            const x = p.x + sp.vx * t;
            const y = p.y + sp.vy * t + 220 * t * t;
            ctx.globalAlpha = 1 - k;
            ctx.strokeStyle = k < 0.3 ? "#ffffff" : neon;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x - sp.vx * 0.018, y - (sp.vy + 440 * t) * 0.018);
            ctx.stroke();
          }
          ctx.globalAlpha = 1;
          return going;
        },
      };
    };

    /**
     * The light running around a card and, as it passes the side closest to a neighbour (or to
     * the next card, in a chain), jumping across so that card does the same.
     */
    const spreader = (token: number, cards: Element[], t: Timing) => {
      const taken = new Set<number>();
      const next = (i: number) => {
        if (t.chain) return i + 1 < cards.length ? [i + 1] : [];
        const a = cards[i].getBoundingClientRect();
        return cards
          .map((_, j) => j)
          .filter((j) => j !== i && adjacent(a, cards[j].getBoundingClientRect()));
      };
      const lapCard = (i: number, s0: number): Actor => {
        taken.add(i);
        const sh = shapeOf(cards[i]);
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
                const sIn = shapeOf(cards[j]).nearest(out());
                add(
                  travel(
                    token,
                    out,
                    onBorder(cards[j], sIn),
                    t.hop,
                    () => add(lapCard(j, sIn)),
                    0.04,
                    t.dim
                  )
                );
              },
            };
          });
        return lap(token, cards[i], s0, t.lap, {
          dim: t.dim,
          passes,
          onEnd: () => t.onLapEnd?.(i),
        });
      };
      return lapCard;
    };

    /** A bolt from the section above into the top of `cards[i]`, which then spreads. */
    const comeDown = (token: number, section: Element, cards: Element[], i: number, t: Timing) => {
      const lapCard = spreader(token, cards, t);
      const s = topMid(cards[i]);
      const to = onBorder(cards[i], s);
      add(travel(token, above(to, section), to, 750, () => add(lapCard(i, s)), 0.09, t.dim));
    };

    // ---- The stages, in order. ----
    let current = 0;
    const alive = (token: number) => token === current;
    const cardsIn = (section: Element) => Array.from(section.querySelectorAll("[data-bolt-card]"));
    const entryOf = (cards: Element[]) =>
      Math.max(
        0,
        cards.findIndex((c) => c.hasAttribute("data-bolt-entry"))
      );
    /** Random points on the borders of `from`, as starting points for a flight. */
    const startsOn = (from: Element[], n: number) =>
      Array.from({ length: n }, (_, i) => {
        const p = randomOnBorder(from[i % from.length]);
        return { x: p.x, y: Math.max(-40, p.y) };
      });

    const play = async (id: StageId, token: number) => {
      const section = document.querySelector(SECTIONS[id]);
      if (!section) return;
      readNeon();
      const cards = cardsIn(section);

      if (id === "services" && cards.length) {
        comeDown(token, section, cards, entryOf(cards), { lap: 1400, hop: 300, dim: true });
      } else if ((id === "who" || id === "work") && cards.length) {
        comeDown(token, section, cards, entryOf(cards), {
          lap: id === "who" ? 1700 : 1500,
          hop: 300,
        });
      } else if (id === "testimonials" && cards.length) {
        const tops = cards.map((c) => c.getBoundingClientRect().top);
        if (cards.length > 1 && tops.every((t) => Math.abs(t - tops[0]) < 4)) {
          // Side by side: the bolt comes down and forks, into every card at once.
          const lapCard = spreader(token, cards, { lap: 1500, hop: 300 });
          const fork = () => {
            const rs = cards.map((c) => c.getBoundingClientRect());
            const x = rs.reduce((sum, r) => sum + r.left + r.width / 2, 0) / rs.length;
            return { x, y: rs[0].top - 70 };
          };
          add(
            travel(token, above(fork, section), fork, 650, () => {
              cards.forEach((c, i) => {
                const s = topMid(c);
                add(travel(token, fork, onBorder(c, s), 420, () => add(lapCard(i, s)), 0.06));
              });
            })
          );
        } else {
          comeDown(token, section, cards, 0, { lap: 1500, hop: 300 });
        }
      } else if (id === "forwho") {
        // The points flow from the testimonials into the cloud behind this section.
        const cloud = boltState.cloud;
        const from = cardsIn(document.querySelector(SECTIONS.testimonials) ?? section);
        if (cloud && from.length) {
          boltState.cloudPending = false;
          add(
            flight(token, startsOn(from, cloud.count()), () => cloud.homes(), {
              dur: [1000, 1800],
              stagger: 700,
              alpha: 0.55,
              onLand: (i) => cloud.reveal(i),
            })
          );
        }
      } else if (id === "process" && cards.length) {
        const end = section.querySelector("[data-bolt-end]");
        // After the 4th step, to the button: one lap, and it goes out.
        const toEnd = () => {
          if (!end || !alive(token)) return;
          const last = cards[cards.length - 1];
          const out = onBorder(last, shapeOf(last).nearest(center(end.getBoundingClientRect())));
          const s = shapeOf(end).nearest(out());
          add(
            travel(token, out, onBorder(end, s), 500, () =>
              add(
                lap(token, end, s, 1300, {
                  fade: true,
                  onEnd: () => add(burnOut(token, end, s)),
                })
              )
            )
          );
        };
        const lapCard = spreader(token, cards, {
          lap: 650,
          hop: 380,
          chain: true,
          onLapEnd: (i) => i === cards.length - 1 && toEnd(),
        });
        const first = cards[0];
        const s = topMid(first);
        const released = boltState.cloud?.release() ?? [];
        if (released.length) {
          // The cloud flows down onto the first step and becomes the bolt.
          const marks = released.map(() => Math.random());
          let landed = 0;
          let lit = false;
          add(
            flight(
              token,
              released,
              () => {
                const sh = shapeOf(first);
                return (i) => sh.at(marks[i]);
              },
              {
                dur: [900, 1500],
                stagger: 400,
                alpha: 0.6,
                onLand: () => {
                  landed++;
                  if (!lit && landed > released.length * 0.8) {
                    lit = true;
                    add(lapCard(0, s));
                  }
                },
              }
            )
          );
        } else {
          const to = onBorder(first, s);
          add(travel(token, above(to, section), to, 750, () => add(lapCard(0, s))));
        }
      }
      await settled(token);
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
          // Moving on cuts what's playing: the sections left behind count as seen, and only
          // this one plays.
          const upTo = ORDER.slice(0, ORDER.indexOf(id) + 1);
          for (const x of upTo) played.add(x);
          if (id !== "forwho" && upTo.includes("forwho")) boltState.cloudPending = false;
          stop();
          queue = [id];
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
