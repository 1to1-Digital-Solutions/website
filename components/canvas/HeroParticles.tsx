"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Hero background: scattered points that come together into an ordered structure (the
 * client's own system), while a steady stream of loose points keeps flowing in and joining it.
 * The cursor scatters the points it touches and they fall back into place. The idea is
 * transformation and integration: from disorder to a system that holds.
 * Plain three.js (no React Three Fiber): one Points mesh, all motion computed in the shader.
 * Turquoise accents. Additive glow on dark, normal blending on light.
 */

type Props = { theme: "dark" | "light" };

// Turquoise, near neon on dark; deeper on light so it holds on a white background.
const PALETTE = {
  dark: { a: "#14c8d4", b: "#3ff8ec", hot: "#d2fffb" },
  light: { a: "#0a8a93", b: "#0fb5b8", hot: "#2ee6e0" },
};

// Simplex 3D noise (Ashima Arts / Stefan Gustavson, MIT).
const NOISE = /* glsl */ `
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod(i,289.0);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=1.0/7.0;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
vec3 noise3(vec3 p){
  return vec3(snoise(p),snoise(p+vec3(31.4,-17.2,5.9)),snoise(p+vec3(-9.1,23.7,41.3)));
}`;

const VERTEX = /* glsl */ `
uniform float uTime;
uniform float uAssemble;
uniform float uSize;
uniform float uPixelRatio;
uniform vec3 uOffset;
uniform float uScale;
uniform vec3 uMouse;
uniform float uMouseForce;
attribute vec3 aStart;
attribute float aRand;
attribute float aStream;
varying float vMix;
varying float vHeat;
varying float vAlpha;
varying float vOrder;
${NOISE}

vec3 rotY(vec3 p, float a){ float c=cos(a), s=sin(a); return vec3(c*p.x+s*p.z, p.y, -s*p.x+c*p.z); }
vec3 rotX(vec3 p, float a){ float c=cos(a), s=sin(a); return vec3(p.x, c*p.y-s*p.z, s*p.y+c*p.z); }

void main(){
  // position = the slot in the structure; aStart = where the point comes from (disorder).
  float t;
  float alpha = 1.0;
  if (aStream > 0.5) {
    // Loose points: they keep arriving, each on its own cycle, and fade as they join.
    float u = fract(uTime * 0.09 + aRand);
    t = smoothstep(0.0, 1.0, u);
    alpha = smoothstep(0.0, 0.15, u) * (1.0 - smoothstep(0.88, 1.0, u)) * 1.4;
  } else {
    // The structure: each point starts with its own delay, so it assembles gradually.
    float d = aRand * 0.55;
    t = smoothstep(d, d + 0.45, uAssemble);
  }

  // Disorder drifts and swirls; order holds still.
  vec3 start = aStart + noise3(aStart * 0.25 + vec3(uTime * 0.05)) * 0.6;
  vec3 p = mix(start, position, t);
  p = rotX(rotY(p, 0.6 + uTime * 0.05), -0.32);

  vec3 n = noise3(p * 0.6 + vec3(0.0, uTime * 0.12, aRand * 3.0));
  p += n * mix(0.18, 0.012, t);

  p = p * uScale + uOffset;

  // The cursor scatters what it touches; the structure pulls it back when it leaves.
  vec2 toM = p.xy - uMouse.xy;
  float dm = length(toM);
  float push = exp(-dm * dm * 1.6) * uMouseForce;
  p.xy += normalize(toM + 1e-5) * push * 0.55;
  p += noise3(p * 2.0 + uTime * 0.6) * push * 0.25;

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  float size = uSize * (0.55 + aRand * 0.8) * mix(0.8, 1.15, t);
  gl_PointSize = size * uPixelRatio * (10.0 / -mv.z);

  vMix = aRand;
  vHeat = push;
  vOrder = t;
  vAlpha = alpha;
}`;

const FRAGMENT = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorHot;
uniform float uAlpha;
varying float vMix;
varying float vHeat;
varying float vAlpha;
varying float vOrder;
void main(){
  vec2 c = gl_PointCoord - 0.5;
  float r = length(c);
  if (r > 0.5) discard;
  float core = smoothstep(0.5, 0.0, r);
  core *= core;
  // Loose points are dimmer and deeper; once in place they light up.
  vec3 col = mix(uColorA, uColorB, smoothstep(0.3, 1.0, vOrder) * (0.6 + vMix * 0.4));
  col = mix(col, uColorHot, clamp(vHeat * 0.9, 0.0, 0.85));
  float a = core * uAlpha * vAlpha * mix(0.7, 1.0, vOrder);
  gl_FragColor = vec4(col, a);
}`;

// Deterministic PRNG so the cloud looks the same on every visit.
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * The structure is a cube drawn with lines of points: its 12 edges and a grid on every face,
 * so it reads as something built. Every point also gets a start position scattered around it.
 */
function buildSystem(structureCount: number, streamCount: number) {
  const rand = mulberry32(1337);
  const gauss = () =>
    Math.sqrt(-2 * Math.log(Math.max(rand(), 1e-9))) * Math.cos(2 * Math.PI * rand());
  const count = structureCount + streamCount;
  const positions = new Float32Array(count * 3);
  const starts = new Float32Array(count * 3);
  const randoms = new Float32Array(count);
  const stream = new Float32Array(count);
  const H = 1.3; // half side
  const LINES = 5; // grid lines per face and direction (edges included)

  const pointOnCube = (): [number, number, number] => {
    const along = (rand() * 2 - 1) * H;
    if (rand() < 0.3) {
      // An edge: two coordinates pinned to ±H.
      const axis = Math.floor(rand() * 3);
      const a = rand() < 0.5 ? -H : H;
      const b = rand() < 0.5 ? -H : H;
      return axis === 0 ? [along, a, b] : axis === 1 ? [a, along, b] : [a, b, along];
    }
    // A grid line on a face: one coordinate on the face, one on a grid step, one free.
    const face = Math.floor(rand() * 3);
    const side = rand() < 0.5 ? -H : H;
    const step = -H + (Math.floor(rand() * LINES) / (LINES - 1)) * 2 * H;
    const p: [number, number, number] = [0, 0, 0];
    const [u, v] =
      rand() < 0.5 ? [(face + 1) % 3, (face + 2) % 3] : [(face + 2) % 3, (face + 1) % 3];
    p[face] = side;
    p[u] = step;
    p[v] = along;
    return p;
  };

  const scatter = (i: number) => {
    // An uneven cloud around the cube, leaning away from the text: the disorder it comes from.
    const r = 2.4 + Math.abs(gauss()) * 1.5;
    const th = rand() * Math.PI * 2;
    const ph = Math.acos(rand() * 2 - 1);
    starts.set(
      [
        Math.sin(ph) * Math.cos(th) * r * 1.2 + 0.6,
        Math.sin(ph) * Math.sin(th) * r * 0.8,
        Math.cos(ph) * r,
      ],
      i * 3
    );
  };

  for (let i = 0; i < count; i++) {
    const [x, y, z] = pointOnCube();
    positions.set([x + gauss() * 0.008, y + gauss() * 0.008, z + gauss() * 0.008], i * 3);
    scatter(i);
    randoms[i] = rand();
    stream[i] = i >= structureCount ? 1 : 0;
  }
  return { positions, starts, randoms, stream };
}

// Frame-rate independent easing towards a target.
const damp = (from: number, to: number, lambda: number, dt: number) =>
  from + (to - from) * (1 - Math.exp(-lambda * dt));

export function HeroParticles({ theme }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const themeRef = useRef(theme);
  const applyThemeRef = useRef<(t: "dark" | "light") => void>(() => {});

  useEffect(() => {
    themeRef.current = theme;
    applyThemeRef.current(theme);
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return; // No WebGL: the hero keeps its CSS glow and the text.
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 10);

    const { positions, starts, randoms, stream } = small
      ? buildSystem(5000, 1500)
      : buildSystem(11000, 3000);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aStart", new THREE.BufferAttribute(starts, 3));
    geometry.setAttribute("aRand", new THREE.BufferAttribute(randoms, 1));
    geometry.setAttribute("aStream", new THREE.BufferAttribute(stream, 1));

    const uniforms = {
      uTime: { value: 0 },
      uAssemble: { value: reducedMotion ? 1 : 0 },
      uSize: { value: small ? 3.4 : 2.8 },
      uPixelRatio: { value: dpr },
      uOffset: { value: new THREE.Vector3() },
      uScale: { value: 1 },
      uMouse: { value: new THREE.Vector3(99, 99, 0) },
      uMouseForce: { value: 0 },
      uColorA: { value: new THREE.Color() },
      uColorB: { value: new THREE.Color() },
      uColorHot: { value: new THREE.Color() },
      uAlpha: { value: 0 },
    };
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      transparent: true,
      depthWrite: false,
      depthTest: false,
    });
    const points = new THREE.Points(geometry, material);
    points.frustumCulled = false;
    scene.add(points);

    let targetAlpha = 1;
    const applyTheme = (t: "dark" | "light") => {
      const pal = PALETTE[t];
      uniforms.uColorA.value.set(pal.a);
      uniforms.uColorB.value.set(pal.b);
      uniforms.uColorHot.value.set(pal.hot);
      material.blending = t === "dark" ? THREE.AdditiveBlending : THREE.NormalBlending;
      material.needsUpdate = true;
      if (reducedMotion) renderer.render(scene, camera);
    };
    applyThemeRef.current = applyTheme;
    applyTheme(themeRef.current);

    // Layout: next to the text on wide screens, behind it (and fainter) on narrow ones.
    const layout = { x: 0, y: 0, scale: 1, alpha: 1 };
    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.position.z = camera.aspect < 0.8 ? 13.5 : 10;
      camera.updateProjectionMatrix();
      const halfW =
        Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z * camera.aspect;
      const wide = w >= 1024;
      layout.x = wide ? halfW * 0.5 : 0;
      layout.y = wide ? 0 : 0.6;
      layout.scale = wide ? 0.95 : 1.0;
      layout.alpha = wide ? 1 : 0.75;
      targetAlpha = layout.alpha;
      uniforms.uOffset.value.set(layout.x, layout.y, 0);
      uniforms.uScale.value = layout.scale;
      if (reducedMotion) {
        uniforms.uAlpha.value = targetAlpha;
        renderer.render(scene, camera);
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Pointer, normalised to the canvas. Listened on window so the canvas never blocks clicks or scroll.
    const pointer = new THREE.Vector2(0, 0);
    const pointerTarget = new THREE.Vector2(0, 0);
    let mouseForceTarget = 0;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      if (e.clientY < r.top || e.clientY > r.bottom) {
        mouseForceTarget = 0;
        return;
      }
      pointerTarget.set(
        ((e.clientX - r.left) / r.width) * 2 - 1,
        -((e.clientY - r.top) / r.height) * 2 + 1
      );
      mouseForceTarget = 1;
    };
    const onLeave = () => (mouseForceTarget = 0);
    if (!reducedMotion) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
    }

    const clock = new THREE.Clock();
    const ray = new THREE.Vector3();
    let raf = 0;
    let visible = true;

    const frame = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      uniforms.uTime.value += dt;
      // From disorder to the structure over the first few seconds.
      uniforms.uAssemble.value = Math.min(1, uniforms.uAssemble.value + dt / 4);
      uniforms.uAlpha.value = damp(uniforms.uAlpha.value, targetAlpha, 2.5, dt);
      uniforms.uMouseForce.value = damp(uniforms.uMouseForce.value, mouseForceTarget, 3, dt);

      // Slight camera parallax following the pointer.
      pointer.x = damp(pointer.x, pointerTarget.x, 4, dt);
      pointer.y = damp(pointer.y, pointerTarget.y, 4, dt);
      camera.position.x = pointer.x * 0.45;
      camera.position.y = pointer.y * 0.3;
      camera.lookAt(0, 0, 0);

      // Pointer onto the z = 0 plane, where the cloud lives.
      ray
        .set(pointerTarget.x, pointerTarget.y, 0.5)
        .unproject(camera)
        .sub(camera.position)
        .normalize();
      const dist = -camera.position.z / ray.z;
      uniforms.uMouse.value.copy(camera.position).addScaledVector(ray, dist);

      renderer.render(scene, camera);
      raf = visible && !document.hidden ? requestAnimationFrame(frame) : 0;
    };

    const start = () => {
      if (raf || reducedMotion) return;
      clock.getDelta();
      raf = requestAnimationFrame(frame);
    };

    // Reduced motion: resize() already drew one still frame (no breathing, rotation or cursor).
    start();

    // Pause when the hero is off screen or the tab is hidden.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    io.observe(canvas);
    const onVisibility = () => !document.hidden && visible && start();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />;
}
