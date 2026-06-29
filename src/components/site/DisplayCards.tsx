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
        "relative flex h-28 w-64 -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 bg-background px-3 py-2.5 shadow-sm transition-all duration-700 hover:border-foreground/20 hover:bg-background/90 hover:shadow-md [&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className,
      )}
    >
      <div>
        <span className={cn("relative inline-block rounded-full bg-turquoise/10 p-1", iconClassName)}>
          {icon}
        </span>
        <p className={cn("text-sm font-semibold", titleClassName)}>{title}</p>
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
    className:
      "[grid-area:stack] -translate-x-16 translate-y-10 hover:-translate-y-2",
  },
  {
    icon: <ShieldCheck className="size-4" />,
    title: "Authenticité garantie",
    description: "Flacons originaux scellés.",
    date: "Sourcés en maison",
    iconClassName: "text-turquoise",
    titleClassName: "text-foreground",
    className:
      "[grid-area:stack] -translate-x-8 translate-y-5 hover:-translate-y-2",
  },
  {
    icon: <Sparkles className="size-4" />,
    title: "Livraison offerte",
    description: "Sur toutes les commandes.",
    date: "France métropolitaine",
    iconClassName: "text-turquoise",
    titleClassName: "text-foreground",
    className: "[grid-area:stack] hover:-translate-y-2",
  },
];

export function DisplayCards({ cards }: { cards?: DisplayCardProps[] }) {
  const list = cards ?? DEFAULT_CARDS;
  return (
    <div className="grid [grid-template-areas:'stack'] justify-items-end items-center opacity-100 animate-in fade-in-0 duration-700">
      {list.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}
