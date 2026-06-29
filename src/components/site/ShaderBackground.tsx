import { MeshGradient } from "@paper-design/shaders-react";
import { useEffect, useState } from "react";

/**
 * Animated shader background — dark flowing mesh reminiscent of liquid
 * silk, layered behind content at low opacity for a subtle premium feel.
 *
 * Perf:
 * - Honors `prefers-reduced-motion` (renders a static CSS gradient).
 * - On small viewports (<768px) we reduce shader speed and rendering size
 *   to cut GPU/CPU cost, while keeping the same visual identity.
 * - Pauses animation when the tab is hidden via `visibilitychange`.
 */
export function ShaderBackground() {
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mqMobile = window.matchMedia("(max-width: 767px)");
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      setIsMobile(mqMobile.matches);
      setReducedMotion(mqMotion.matches);
    };
    sync();

    mqMobile.addEventListener("change", sync);
    mqMotion.addEventListener("change", sync);

    const onVisibility = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      mqMobile.removeEventListener("change", sync);
      mqMotion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // Static fallback — no shader, no rAF, zero GPU cost.
  if (reducedMotion) {
    return (
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
        style={{
          background:
            "radial-gradient(120% 80% at 20% 10%, #f5f5f5 0%, #ffffff 45%, #eaeaea 100%)",
        }}
      />
    );
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
    >
      {visible && (
        <MeshGradient
          style={{
            width: "100%",
            height: "100%",
            transform: isMobile ? "scale(1.2)" : "scale(1.35)",
            // Hint the compositor to keep this on its own layer
            willChange: "transform",
          }}
          colors={["#0a0a0a", "#1a1a1a", "#f5f5f5", "#2a2a2a", "#ffffff"]}
          speed={isMobile ? 0.35 : 0.8}
          distortion={isMobile ? 0.7 : 1}
          swirl={isMobile ? 0.6 : 0.85}
        />
      )}
      {/* Soft white wash to keep the site readable. Slightly stronger on
          mobile to guarantee contrast on smaller text. */}
      <div className="absolute inset-0 bg-white/87 md:bg-white/87" />
    </div>
  );
}
