import { Link } from "@tanstack/react-router";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  const nav = [
    { to: "/", label: "Accueil" },
    { to: "/boutique", label: "Boutique" },
    { to: "/a-propos", label: "À propos" },
    { to: "/livraison", label: "Livraison" },
    { to: "/contact", label: "Contact" },
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-4 sm:h-14 sm:px-6">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <svg viewBox="0 0 24 32" className="h-3.5 w-3.5 fill-turquoise drop-shadow-[0_1px_2px_rgba(45,200,200,0.45)]" aria-hidden>
            <path d="M12 0 C12 10 24 16 24 22 C24 28 19 32 12 32 C5 32 0 28 0 22 C0 16 12 10 12 0 Z" />
          </svg>
          <span className="text-[15px] font-semibold tracking-tight text-foreground sm:text-base">
            EAU TURQUOISE
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-xs font-normal text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Link
            to="/panier"
            className="relative inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-secondary"
            aria-label="Panier" data-no-shadow
          >
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-turquoise px-1 text-[9px] font-medium text-white">
                {count}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-secondary md:hidden"
            aria-label="Menu" data-no-shadow
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/70 bg-background md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
