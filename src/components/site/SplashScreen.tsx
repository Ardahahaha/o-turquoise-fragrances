import { useEffect, useState } from "react";

export function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem("oturquoise-splash-seen");
    if (seen) return;

    setVisible(true);
    const exitTimer = setTimeout(() => setExiting(true), 1800);
    const hideTimer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("oturquoise-splash-seen", "1");
    }, 2500);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        exiting ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center">
        <div className="relative mb-6">
          <div
            className="animate-splash-drop h-10 w-7 bg-turquoise shadow-[0_0_40px_-4px_rgba(0,191,166,0.45)]"
            style={{ borderRadius: "50% 50% 50% 50% / 65% 65% 35% 35%" }}
          />
        </div>
        <h1 className="animate-splash-text text-[1.75rem] font-light tracking-[-0.04em] text-foreground">
          O Turquoise
        </h1>
        <div className="animate-splash-line mt-5 h-px w-20 bg-gradient-to-r from-transparent via-turquoise to-transparent" />
      </div>
    </div>
  );
}
