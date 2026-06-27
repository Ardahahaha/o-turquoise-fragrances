import { Link } from "@tanstack/react-router";
import { Instagram, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-gradient-soft">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-gradient-primary shadow-glow" />
              <span className="font-display text-2xl">O <span className="text-primary">Turquoise</span></span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Boutique indépendante de parfums d'exception. Sélection rigoureuse, service attentif.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wide text-foreground">Boutique</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/produit" className="hover:text-foreground">Le Parfum</Link></li>
              <li><Link to="/panier" className="hover:text-foreground">Panier</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wide text-foreground">Maison</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/a-propos" className="hover:text-foreground">À propos</Link></li>
              <li><Link to="/livraison" className="hover:text-foreground">Livraison & retours</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wide text-foreground">Suivez-nous</h4>
            <div className="mt-4 flex gap-3">
              <a href="#" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background transition-all hover:border-primary hover:text-primary hover:shadow-soft">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="mailto:contact@oturquoise.com" aria-label="Email" className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background transition-all hover:border-primary hover:text-primary hover:shadow-soft">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border/60 pt-6">
          <p className="text-xs leading-relaxed text-muted-foreground">
            O Turquoise est une boutique indépendante et n'est pas affiliée officiellement à Maison Francis Kurkdjian.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            © {new Date().getFullYear()} O Turquoise. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
