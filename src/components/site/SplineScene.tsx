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
    <div
      ref={ref}
      className={className}
      style={{ background: "transparent", position: "relative", overflow: "hidden" }}
    >
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
      {/* Bande de fondu en bas — masque le badge "Built with Spline" et se confond avec la page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28"
        style={{
          background:
            "linear-gradient(to top, var(--background) 0%, var(--background) 55%, color-mix(in oklab, var(--background) 80%, transparent) 75%, color-mix(in oklab, var(--background) 40%, transparent) 90%, transparent 100%)",
        }}
      />
      {/* Petit cache opaque centré sur le badge pour neutraliser tout liseré résiduel */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-12 w-44"
        style={{ background: "var(--background)" }}
      />

    </div>
  );
}



