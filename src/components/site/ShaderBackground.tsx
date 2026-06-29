import { MeshGradient } from "@paper-design/shaders-react";

/**
 * Animated shader background — dark flowing mesh reminiscent of liquid
 * silk, layered behind content at low opacity for a subtle premium feel.
 */
export function ShaderBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
    >
      <MeshGradient
        style={{ width: "100%", height: "100%" }}
        colors={["#0a0a0a", "#1a1a1a", "#f5f5f5", "#2a2a2a", "#ffffff"]}
        speed={0.8}
        distortion={1}
        swirl={0.85}
      />
      {/* Soft white wash to keep the site readable */}
      <div className="absolute inset-0 bg-white/80" />

    </div>
  );
}
