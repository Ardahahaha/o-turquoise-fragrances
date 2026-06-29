import { MeshGradient } from "@paper-design/shaders-react";

/**
 * Subtle animated shader background, layered very lightly behind content.
 */
export function ShaderBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden opacity-20"
    >
      <MeshGradient
        style={{ width: "100%", height: "100%" }}
        colors={["#ffffff", "#eafcf8", "#cfeeea", "#ffffff"]}
        speed={0.25}
      />
    </div>
  );
}
