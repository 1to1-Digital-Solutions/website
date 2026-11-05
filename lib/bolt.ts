/**
 * Geometry and drawing for the bolt that runs down the home page (see BoltChoreography).
 * Everything works in viewport coordinates, read from the elements on every frame, so the
 * bolt follows its cards while the page scrolls.
 */

export type Pt = { x: number; y: number };
type Edge = Pt & { nx: number; ny: number };

/** Shared between the choreography and the "Is it for you?" cloud. */
export const boltState = {
  /** The bolt is expected to land in the cloud: it waits for it instead of appearing alone. */
  cloudPending: true,
};

export const BOLT_EVENTS = {
  /** Back at the hero: the bolt can run again on the next way down. */
  reset: "bolt:reset",
  /** The bolt lands in the cloud. detail: viewport point. */
  cloudArrive: "bolt:cloud-arrive",
  /** Part of the cloud gathers into a point to become the bolt again. detail: viewport point. */
  cloudGather: "bolt:cloud-gather",
} as const;

/** Deterministic noise in [0, 1). */
export const rnd = (n: number) => {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

export const radiusOf = (el: Element) => parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;

/**
 * The border of a rounded rectangle as a closed path. `s` runs from 0 to 1 clockwise, starting
 * at the top-left end of the top edge. Each point carries the outward normal.
 */
export function shape(r: DOMRect, radius: number) {
  const R = Math.max(0, Math.min(radius, r.width / 2, r.height / 2));
  const w = r.width - 2 * R;
  const h = r.height - 2 * R;
  const arc = (Math.PI * R) / 2;
  const len = Math.max(1, 2 * w + 2 * h + 4 * arc);
  const corner = (cx: number, cy: number, a: number): Edge => ({
    x: cx + R * Math.cos(a),
    y: cy + R * Math.sin(a),
    nx: Math.cos(a),
    ny: Math.sin(a),
  });

  const at = (s: number): Edge => {
    let d = (((s % 1) + 1) % 1) * len;
    if (d < w) return { x: r.left + R + d, y: r.top, nx: 0, ny: -1 };
    d -= w;
    if (d < arc) return corner(r.right - R, r.top + R, -Math.PI / 2 + d / R);
    d -= arc;
    if (d < h) return { x: r.right, y: r.top + R + d, nx: 1, ny: 0 };
    d -= h;
    if (d < arc) return corner(r.right - R, r.bottom - R, d / R);
    d -= arc;
    if (d < w) return { x: r.right - R - d, y: r.bottom, nx: 0, ny: 1 };
    d -= w;
    if (d < arc) return corner(r.left + R, r.bottom - R, Math.PI / 2 + d / R);
    d -= arc;
    if (d < h) return { x: r.left, y: r.bottom - R - d, nx: -1, ny: 0 };
    d -= h;
    return R > 0
      ? corner(r.left + R, r.top + R, Math.PI + d / R)
      : { x: r.left, y: r.top, nx: -1, ny: -1 };
  };

  /** The `s` of the border point closest to `p`. */
  const nearest = (p: Pt) => {
    let best = 0;
    let bestD = Infinity;
    for (let i = 0; i < 240; i++) {
      const q = at(i / 240);
      const d = (q.x - p.x) ** 2 + (q.y - p.y) ** 2;
      if (d < bestD) {
        bestD = d;
        best = i / 240;
      }
    }
    return best;
  };

  return { len, at, nearest };
}

export const center = (r: DOMRect): Pt => ({ x: r.left + r.width / 2, y: r.top + r.height / 2 });

/** Neon halo plus a thin white core, the same look as the stakes cards' border. */
export function strokeBolt(ctx: CanvasRenderingContext2D, pts: Pt[], neon: string, alpha = 1) {
  if (pts.length < 2) return;
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.globalAlpha = 0.8 * alpha;
  ctx.shadowColor = neon;
  ctx.shadowBlur = 9;
  ctx.strokeStyle = neon;
  ctx.lineWidth = 1.9;
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.globalAlpha = 0.6 * alpha;
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 0.8;
  ctx.stroke();
  ctx.globalAlpha = 1;
}

export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
export const easeIn = (t: number) => t * t * t;
