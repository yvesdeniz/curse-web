/**
 * Fixed, decorative violet atmosphere behind the hero.
 * Purely visual — hidden from assistive tech.
 */
export function GlowBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] overflow-hidden"
    >
      <div className="glow absolute inset-0" />
      {/* faint dotted grid for texture */}
      <div
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(60% 60% at 50% 0%, #000 0%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(60% 60% at 50% 0%, #000 0%, transparent 75%)",
        }}
      />
    </div>
  );
}
