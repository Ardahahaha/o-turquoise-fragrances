/**
 * Decorative animated background: abstract 3D-feel blurred orbs +
 * slow drifting particles. Pure CSS, no canvas / no WebGL.
 * White-dominant, with very discreet turquoise highlights.
 */
export function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Soft base wash */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_-10%,rgba(255,255,255,0.9),transparent_60%)]" />

      {/* Abstract 3D-feel orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="orb orb-4" />

      {/* Fine grain / particles */}
      <div className="particles">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} style={{ ['--i' as string]: i }} />
        ))}
      </div>
    </div>
  );
}
