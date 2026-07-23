import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface CandyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function CandyButton({ className, children = "Candy Button", ...props }: CandyButtonProps) {
  return (
    <button
      className={cn(
        "relative cursor-pointer rounded-xl border border-[#54A1FD] bg-[radial-gradient(95%_60%_at_50%_75%,#005FD6_0%,#209BFF_100%)] px-9 py-3 text-base font-semibold leading-[22px] tracking-[0.02em] text-white shadow-[0px_4px_48px_-12px_#1187FF,inset_0px_1px_8px_-4px_#FFFFFF] transition-all duration-200 ease-out after:absolute after:right-[10%] after:top-[1px] after:h-[1px] after:w-[60%] after:bg-gradient-to-r after:from-transparent after:via-white/50 after:to-transparent hover:brightness-110 active:rotate-1 active:scale-95",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default CandyButton;
