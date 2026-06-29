type Props = {
  items: string[];
  speed?: number; // seconds per loop
};

export function Marquee({ items, speed = 40 }: Props) {
  const row = [...items, ...items, ...items];
  return (
    <div
      className="relative overflow-hidden border-y border-border/60 bg-white/40 backdrop-blur-md"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className="flex w-max gap-10 py-3 will-change-transform motion-reduce:animate-none"
        style={{ animation: `marquee ${speed}s linear infinite` }}
      >
        {row.map((item, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-muted-foreground"
          >
            <span className="inline-block h-1 w-1 rounded-full bg-turquoise/70" />
            {item}
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-33.3333%); } }`}</style>
    </div>
  );
}
