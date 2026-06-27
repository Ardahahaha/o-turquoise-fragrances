type Props = {
  className?: string;
  label?: string;
};

/**
 * Elegant placeholder where the real product photo will be dropped in later.
 * No invented bottle imagery — pure design surface with soft turquoise glow.
 */
export function BottlePlaceholder({ className = "", label = "Votre image produit" }: Props) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-soft shadow-card ${className}`}
      aria-label={label}
    >
      {/* subtle radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-radial opacity-70" />
      {/* sheen */}
      <div className="pointer-events-none absolute -left-1/3 top-0 h-full w-2/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      <div className="relative flex h-full min-h-[360px] flex-col items-center justify-center px-6 py-10 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-full border border-primary/20 bg-background/70 shadow-soft backdrop-blur-sm">
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-primary" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 2h6v3h-6z" />
            <path d="M8 5h8l1 4a5 5 0 0 1-1 6v6a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-6a5 5 0 0 1-1-6z" />
          </svg>
        </div>
        <p className="mt-4 font-display text-lg text-foreground/80">{label}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">Emplacement réservé</p>
      </div>
    </div>
  );
}
