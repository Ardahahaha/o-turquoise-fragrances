import { useEffect, useState } from "react";

export function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem("oturquoise-splash-seen");
    if (seen) return;

    setVisible(true);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const next = prev + Math.random() * 18 + 4;
        return next > 100 ? 100 : next;
      });
    }, 160);

    const exitTimer = setTimeout(() => setExiting(true), 2600);
    const hideTimer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("oturquoise-splash-seen", "1");
    }, 3400);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        exiting ? "pointer-events-none opacity-0 scale-[1.02]" : "opacity-100 scale-100"
      }`}
    >
      <div className="flex flex-col items-center">
        <div className="relative mb-7">
          <div
            className="animate-splash-drop h-11 w-8 bg-turquoise shadow-[0_0_40px_-4px_rgba(0,191,166,0.40)]"
            style={{ borderRadius: "50% 50% 50% 50% / 65% 65% 35% 35%" }}
          />
        </div>

        <h1 className="animate-splash-text text-[1.85rem] font-light tracking-[-0.05em] text-foreground">
          O Turquoise
        </h1>

        <p className="animate-splash-text mt-1.5 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
          Parfums d'exception
        </p>

        <div className="animate-splash-line mt-8 h-[2px] w-36 overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full bg-turquoise transition-[width] duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="animate-splash-text mt-3 text-[0.65rem] font-medium tabular-nums tracking-wide text-muted-foreground">
          {progress.toFixed(0)}%
        </span>
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[520px] w-[520px] rounded-full bg-turquoise/5 blur-[120px]" />
      </div>
    </div>
  );
}
