"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { cn } from "@/lib/utils";

export interface NavItem {
  label: string;
  href: string;
}

export interface SpotlightNavbarProps {
  items?: NavItem[];
  className?: string;
  onItemClick?: (item: NavItem, index: number) => void;
  defaultActiveIndex?: number;
}

export function SpotlightNavbar({
  items = [],
  className,
  onItemClick,
  defaultActiveIndex = 0,
}: SpotlightNavbarProps) {
  const navRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [hoverX, setHoverX] = useState<number | null>(null);
  const spotlightX = useRef(0);
  const ambienceX = useRef(0);

  useEffect(() => setActiveIndex(defaultActiveIndex), [defaultActiveIndex]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const handleMouseMove = (event: MouseEvent) => {
      const x = event.clientX - nav.getBoundingClientRect().left;
      setHoverX(x);
      spotlightX.current = x;
      nav.style.setProperty("--spotlight-x", `${x}px`);
    };

    const handleMouseLeave = () => {
      setHoverX(null);
      const activeItem = nav.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`);
      if (!activeItem) return;
      const navRect = nav.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      const targetX = itemRect.left - navRect.left + itemRect.width / 2;
      animate(spotlightX.current, targetX, {
        type: "spring",
        stiffness: 200,
        damping: 20,
        onUpdate: (value) => {
          spotlightX.current = value;
          nav.style.setProperty("--spotlight-x", `${value}px`);
        },
      });
    };

    nav.addEventListener("mousemove", handleMouseMove);
    nav.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      nav.removeEventListener("mousemove", handleMouseMove);
      nav.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [activeIndex]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const activeItem = nav.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`);
    if (!activeItem) return;
    const navRect = nav.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();
    const targetX = itemRect.left - navRect.left + itemRect.width / 2;
    animate(ambienceX.current, targetX, {
      type: "spring",
      stiffness: 200,
      damping: 20,
      onUpdate: (value) => {
        ambienceX.current = value;
        nav.style.setProperty("--ambience-x", `${value}px`);
      },
    });
  }, [activeIndex]);

  return (
    <div className={cn("relative flex justify-center", className)}>
      <nav
        ref={navRef}
        aria-label="Navigation principale"
        className="spotlight-nav relative h-11 overflow-hidden rounded-full"
      >
        <ul className="relative z-10 flex h-full items-center px-2">
          {items.map((item, index) => (
            <li key={item.href} className="flex h-full items-center justify-center">
              <a
                href={item.href}
                data-index={index}
                onClick={(event) => {
                  event.preventDefault();
                  setActiveIndex(index);
                  onItemClick?.(item, index);
                }}
                className={cn(
                  "rounded-full px-3 py-2 text-xs font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise/50 lg:px-4",
                  activeIndex === index
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div
          className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-300"
          style={{
            opacity: hoverX !== null ? 1 : 0,
            background:
              "radial-gradient(120px circle at var(--spotlight-x) 100%, rgba(0,191,166,0.16) 0%, transparent 50%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[2px]"
          style={{
            background:
              "radial-gradient(60px circle at var(--ambience-x) 0%, rgba(0,191,166,1) 0%, transparent 100%)",
          }}
        />
      </nav>
    </div>
  );
}
