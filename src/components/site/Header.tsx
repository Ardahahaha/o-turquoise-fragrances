import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import logoAsset from "@/assets/eau-turquoise-logo.png.asset.json";
import { SpotlightNavbar } from "@/components/ui/spotlight-navbar";
import { CandyButton } from "@/components/ui/candy-button";

export function Header() {
  const { count } = useCart();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  const nav = [
    { to: "/", label: "Accueil" },
    { to: "/boutique", label: "Boutique" },
    { to: "/a-propos", label: "À propos" },
    { to: "/livraison", label: "Livraison" },
    { to: "/contact", label: "Contact" },
  ] as const;

  const activeIndex = pathname.startsWith("/produit")
    ? 1
    : Math.max(0, nav.findIndex((item) => item.to === pathname));

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex min-h-14 max-w-6xl flex-wrap items-center justify-between gap-y-2 px-4 py-2 sm:px-6 md:h-14 md:flex-nowrap md:py-0">
        <Link to="/" className="flex items-center" aria-label="Eau Turquoise — Accueil">
          <img src={logoAsset.url} alt="Eau Turquoise" className="h-8 w-auto sm:h-9" />
        </Link>

        <SpotlightNavbar
          className="order-3 flex w-full md:order-none md:w-auto"
          items={nav.map((item) => ({ label: item.label, href: item.to }))}
          defaultActiveIndex={activeIndex}
          onItemClick={(item) => navigate({ to: item.href })}
        />

        <div className="flex items-center gap-1">
          <CandyButton
            type="button"
            className="px-3 py-2 text-xs sm:px-4"
            onClick={() => navigate({ to: "/connexion" })}
          >
            Se connecter
          </CandyButton>
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
        </div>
      </div>
    </header>
  );
}
