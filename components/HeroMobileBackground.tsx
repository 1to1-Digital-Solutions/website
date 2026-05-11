// Pure CSS animated background for mobile hero — no Three.js, no touch conflicts.
export function HeroMobileBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Dot-grid pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle, #1f957a 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Large teal glow blobs */}
      <div className="bg-primary/15 absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full blur-[120px]" />
      <div className="bg-primary/10 absolute -right-24 bottom-0 h-[320px] w-[320px] rounded-full blur-[100px]" />

      {/* ── Floating shapes ─────────────────────────────────── */}

      {/* Cube / square */}
      <div
        className="border-primary/30 absolute top-[12%] left-[8%] h-12 w-12 rounded-sm border"
        style={{ animation: "float-a 7s ease-in-out infinite" }}
      />
      {/* Rotated square (diamond) */}
      <div
        className="border-primary/25 absolute top-[18%] right-[10%] h-10 w-10 rotate-45 border"
        style={{ animation: "float-b 9s ease-in-out infinite", animationDelay: "1.2s" }}
      />

      {/* Ring / Torus */}
      <div
        className="border-primary/30 absolute top-[40%] left-[5%] h-16 w-16 rounded-full border-2"
        style={{ animation: "float-c 11s ease-in-out infinite", animationDelay: "0.5s" }}
      />
      {/* Small ring */}
      <div
        className="border-primary/20 absolute right-[8%] bottom-[28%] h-10 w-10 rounded-full border-2"
        style={{ animation: "float-a 8s ease-in-out infinite", animationDelay: "2s" }}
      />

      {/* Sphere (filled circle) */}
      <div
        className="bg-primary/15 absolute top-[28%] right-[18%] h-8 w-8 rounded-full"
        style={{ animation: "drift 14s ease-in-out infinite", animationDelay: "0.8s" }}
      />
      {/* Larger sphere outline */}
      <div
        className="border-primary/20 absolute bottom-[35%] left-[15%] h-14 w-14 rounded-full border"
        style={{ animation: "float-b 10s ease-in-out infinite", animationDelay: "3s" }}
      />

      {/* Triangle (clip-path) */}
      <div
        className="bg-primary/20 absolute top-[55%] right-[5%] h-10 w-10"
        style={{
          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          animation: "float-c 12s ease-in-out infinite",
          animationDelay: "1.8s",
        }}
      />

      {/* Hexagon */}
      <div
        className="bg-primary/15 absolute bottom-[15%] left-[8%] h-12 w-12"
        style={{
          clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
          animation: "drift 16s ease-in-out infinite",
          animationDelay: "0.3s",
        }}
      />

      {/* Thin long rectangle (cylinder side-view) */}
      <div
        className="border-primary/20 absolute top-[65%] left-[25%] h-2 w-14 rounded-full border"
        style={{ animation: "float-a 9s ease-in-out infinite", animationDelay: "4s" }}
      />

      {/* Corner accent lines */}
      <div className="border-primary/10 absolute top-6 left-6 h-12 w-12 border-t-2 border-l-2" />
      <div className="border-primary/10 absolute right-6 bottom-6 h-12 w-12 border-r-2 border-b-2" />
    </div>
  );
}
