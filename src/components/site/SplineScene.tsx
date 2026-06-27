import { lazy, Suspense, useEffect, useRef, useState } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

type Props = {
  scene: string;
  className?: string;
  zoom?: number;
};

/**
 * Lazy-mounts a Spline scene only when it scrolls into view (IntersectionObserver),
 * after the browser is idle. Reduces initial JS, improves LCP / Lighthouse.
 * Renders nothing visible on error so no dark square shows.
 */
export function SplineScene({ scene, className, zoom = 0.6 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;

    let observer: IntersectionObserver | null = null;
    const trigger = () => {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setShouldLoad(true);
              observer?.disconnect();
              break;
            }
          }
        },
        { rootMargin: "200px" }
      );
      observer.observe(el);
    };

    const idle =
      (window as unknown as { requestIdleCallback?: (cb: () => void) => number })
        .requestIdleCallback;
    const id = idle ? idle(trigger) : window.setTimeout(trigger, 600);

    return () => {
      observer?.disconnect();
      if (idle) {
        (window as unknown as { cancelIdleCallback?: (h: number) => void })
          .cancelIdleCallback?.(id as number);
      } else {
        clearTimeout(id as number);
      }
    };
  }, []);

  return (
    <div ref={ref} className={className} style={{ background: "transparent", position: "relative" }}>
      {shouldLoad && !failed && (
        <Suspense fallback={null}>
          <Spline
            scene={scene}
            style={{ width: "100%", height: "100%", background: "transparent" }}
            onError={() => setFailed(true)}
            onLoad={(app: unknown) => {
              try {
                const a = app as { setZoom?: (z: number) => void };
                a.setZoom?.(zoom);
              } catch {
                /* noop */
              }
            }}
          />
        </Suspense>
      )}
      {/* Masque le watermark "Built with Spline" en bas à droite */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: 160,
          height: 44,
          background: "var(--background, #fff)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
