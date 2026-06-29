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
        "relative flex h-28 w-64 select-none flex-col justify-between rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15),0_2px_8px_-4px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all duration-700 hover:-translate-y-1 hover:border-white/90 hover:bg-white/95 hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.2),0_4px_12px_-4px_rgba(0,0,0,0.1)]",
        className,
      )}
    >
      <div className="flex items-center gap-2.5">
        <span className={cn("relative inline-flex rounded-full bg-turquoise/10 p-1.5", iconClassName)}>
          {icon}
        </span>
        <p className={cn("text-sm font-semibold leading-tight", titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-nowrap text-xs text-muted-foreground">{description}</p>
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

  const positions = [
    {
      // Front card — slightly tilted, fully visible
      zIndex: 30,
      transform: "translateY(0) translateX(0) rotate(-4deg)",
    },
    {
      // Middle card — higher and to the left, opposite rotation
      zIndex: 20,
      transform: "translateY(-42px) translateX(-26px) rotate(2deg)",
    },
    {
      // Back card — highest, furthest left, more visible
      zIndex: 10,
      transform: "translateY(-80px) translateX(-48px) rotate(7deg)",
    },
  ];

  return (
    <div className="relative mx-auto flex h-[260px] w-full max-w-md items-end justify-center sm:h-[300px]">
      {list.map((cardProps, index) => {
        const pos = positions[index] ?? positions[0];
        return (
          <div
            key={index}
            className="absolute bottom-0 transition-transform duration-700 ease-out"
            style={{
              zIndex: pos.zIndex,
              transform: pos.transform,
            }}
          >
            <DisplayCard {...cardProps} />
          </div>
        );
      })}
    </div>
  );
}
