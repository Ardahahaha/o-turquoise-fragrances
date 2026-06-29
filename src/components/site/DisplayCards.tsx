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
        "relative flex h-28 w-64 -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 bg-background/70 px-3 py-2.5 backdrop-blur-sm transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[18rem] after:bg-gradient-to-l after:from-background after:to-transparent after:content-[''] hover:border-foreground/20 hover:bg-background [&>*]:flex [&>*]:items-center [&>*]:gap-2",
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
      "[grid-area:stack] hover:-translate-y-8 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <ShieldCheck className="size-4" />,
    title: "Authenticité garantie",
    description: "Flacons originaux scellés.",
    date: "Sourcés en maison",
    iconClassName: "text-turquoise",
    titleClassName: "text-foreground",
    className:
      "[grid-area:stack] translate-x-12 translate-y-4 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Sparkles className="size-4" />,
    title: "Livraison offerte",
    description: "Sur toutes les commandes.",
    date: "France métropolitaine",
    iconClassName: "text-turquoise",
    titleClassName: "text-foreground",
    className: "[grid-area:stack] translate-x-24 translate-y-8 hover:translate-y-4",
  },
];

export function DisplayCards({ cards }: { cards?: DisplayCardProps[] }) {
  const list = cards ?? DEFAULT_CARDS;
  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
      {list.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}
