import { cn } from "@/lib/utils";
import { Truck, ShieldCheck, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

interface DisplayCardProps {
  className?: string;
  icon?: ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
}

function DisplayCard({
  className,
  icon,
  title,
  description,
  date,
  iconClassName = "text-turquoise",
  titleClassName = "text-foreground",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-[120px] w-[280px] select-none flex-col justify-between rounded-[22px] border border-white/70 bg-white px-4 py-3.5 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.12),0_4px_12px_-4px_rgba(0,0,0,0.06)] backdrop-blur-md transition-transform duration-500 ease-out hover:-translate-y-0.5",
        className,
      )}
    >
      <div className="flex items-center gap-2.5">
        <span className={cn("relative inline-flex rounded-full bg-turquoise/10 p-1.5", iconClassName)}>
          {icon}
        </span>
        <p className={cn("text-sm font-semibold leading-tight", titleClassName)}>{title}</p>
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">{description}</p>
      <p className="text-[10px] text-muted-foreground/70">{date}</p>
    </div>
  );
}

const DEFAULT_CARDS: DisplayCardProps[] = [
  {
    icon: <Truck className="size-4" />,
    title: "Livraison soignée",
    description: "Expédition rapide et suivie.",
    date: "Sous 48h",
    iconClassName: "text-turquoise",
    titleClassName: "text-foreground",
  },
  {
    icon: <ShieldCheck className="size-4" />,
    title: "Authenticité garantie",
    description: "Flacons originaux scellés.",
    date: "Sourcés en maison",
    iconClassName: "text-turquoise",
    titleClassName: "text-foreground",
  },
  {
    icon: <Sparkles className="size-4" />,
    title: "Livraison offerte",
    description: "Sur toutes les commandes.",
    date: "France métropolitaine",
    iconClassName: "text-turquoise",
    titleClassName: "text-foreground",
  },
];

export function DisplayCards({ cards }: { cards?: DisplayCardProps[] }) {
  const list = cards ?? DEFAULT_CARDS;

  // Render reverse so the first item in the array ends up visually on top.
  const ordered = [...list].reverse();

  const positions = [
    {
      // Back card — highest, fanned right
      z: "z-10",
      transform: "translate(40px, -60px) rotate(5deg)",
      shadow: "shadow-[0_6px_24px_-10px_rgba(0,0,0,0.18)]",
    },
    {
      // Middle card — higher, fanned right
      z: "z-20",
      transform: "translate(20px, -30px) rotate(2deg)",
      shadow: "shadow-[0_10px_34px_-12px_rgba(0,0,0,0.2)]",
    },
    {
      // Front card — centered, full readability
      z: "z-30",
      transform: "translate(0, 0) rotate(-4deg)",
      shadow: "shadow-[0_16px_48px_-12px_rgba(0,0,0,0.25)]",
    },
  ];

  return (
    <div className="relative mx-auto h-[220px] w-[320px] sm:h-[240px] sm:w-[360px]">
      <div className="absolute inset-0 flex items-end justify-center">
        {ordered.map((cardProps, index) => {
          const pos = positions[index] ?? positions[0];
          return (
            <div
              key={index}
              className={cn(
                "absolute bottom-0 transition-all duration-700 ease-out",
                pos.z,
              )}
              style={{ transform: pos.transform }}
            >
              <DisplayCard {...cardProps} className={pos.shadow} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
