/**
 * Délicat ornement ottoman : rosette géométrique 8 branches en turquoise,
 * très légère, pour servir d'accent décoratif discret.
 */
export function OttomanRosette({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Cercle central */}
      <circle cx="40" cy="40" r="6" />

      {/* 8 pétales courbes style ottoman */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const rInner = 10;
        const rOuter = 28;
        const rSide = 18;
        const x1 = 40 + rInner * cos;
        const y1 = 40 + rInner * sin;
        const x2 = 40 + rOuter * cos;
        const y2 = 40 + rOuter * sin;
        const xA = 40 + rSide * Math.cos(angle - 0.28);
        const yA = 40 + rSide * Math.sin(angle - 0.28);
        const xB = 40 + rSide * Math.cos(angle + 0.28);
        const yB = 40 + rSide * Math.sin(angle + 0.28);
        return (
          <path
            key={i}
            d={`M ${x1} ${y1} Q ${xA} ${yA} ${x2} ${y2} Q ${xB} ${yB} ${x1} ${y1}`}
          />
        );
      })}

      {/* Anneau externe pointillé */}
      <circle cx="40" cy="40" r="34" strokeDasharray="3 5" strokeWidth="0.9" />

      {/* Petits points aux pointes */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const x = 40 + 30 * Math.cos(angle);
        const y = 40 + 30 * Math.sin(angle);
        return <circle key={i} cx={x} cy={y} r="1.4" fill="currentColor" />;
      })}
    </svg>
  );
}
