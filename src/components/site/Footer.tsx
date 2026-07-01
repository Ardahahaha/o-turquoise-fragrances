import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-20 border-t-2 border-t-turquoise/70 bg-card">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <p className="text-sm font-semibold tracking-tight text-foreground">EAU TURQUOISE</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Boutique indépendante de parfums d'exception.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-foreground">Boutique</h4>
            <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
              <li><Link to="/boutique" className="hover:text-foreground">Tous les parfums</Link></li>
              <li><Link to="/panier" className="hover:text-foreground">Panier</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-foreground">Maison</h4>
            <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
              <li><Link to="/a-propos" className="hover:text-foreground">À propos</Link></li>
              <li><Link to="/livraison" className="hover:text-foreground">Livraison</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-foreground">Contact</h4>
            <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
              <li><a href="mailto:contact@eauturquoise.com" className="hover:text-foreground">contact@eauturquoise.com</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border/70 pt-5">
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            EAU TURQUOISE est une boutique indépendante et n'est pas affiliée officiellement à Maison Francis Kurkdjian ni à Chanel. Toutes les marques citées appartiennent à leurs propriétaires respectifs.
          </p>
          <p className="mt-2 text-[11px] text-muted-foreground">
            © {new Date().getFullYear()} EAU TURQUOISE. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
