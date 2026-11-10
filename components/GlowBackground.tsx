/**
 * Soft background of turquoise glows and a dot grid that echoes the hero's point cloud.
 * Fills its nearest positioned parent; decorative only.
 */
export function GlowBackground({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      <div className="bg-primary/25 absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full blur-3xl" />
      <div className="bg-neon/20 absolute -right-40 -bottom-40 h-[32rem] w-[32rem] rounded-full blur-3xl" />
      <div className="text-primary/45 absolute inset-0 bg-[radial-gradient(currentColor_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)] bg-[size:22px_22px]" />
    </div>
  );
}
