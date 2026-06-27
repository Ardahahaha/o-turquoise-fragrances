import { createFileRoute, Link } from "@tanstack/react-router";
import { Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { PRODUCTS } from "@/lib/cart";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "O Turquoise — Parfums d'exception" },
      { name: "description", content: "Boutique indépendante de parfums de luxe. Baccarat Rouge 540, Bleu de Chanel, Grand Soir." },
    ],
  }),
  component: Home,
});

function Home() {
  const hero = PRODUCTS[0];

  return (
    <div>
      {/* HERO — Apple style: clean, centered, white */}
      <section className="border-b border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 pb-8 pt-10 text-center sm:px-6 sm:pb-14 sm:pt-20">
          <h1 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            La haute parfumerie.
            <br />
            <span className="text-muted-foreground">Choisie avec soin.</span>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground sm:mt-5 sm:max-w-lg sm:text-base">
            Une sélection rare de fragrances iconiques, livrées avec exigence.
          </p>
          <div className="mt-5 flex items-center justify-center gap-3 sm:mt-7">
            <Link
              to="/boutique"
              className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2 text-xs font-medium text-background transition-opacity hover:opacity-90 sm:px-6 sm:py-2.5 sm:text-sm"
            >
              Acheter
            </Link>
            <Link
              to="/produit/$id"
              params={{ id: hero.id }}
              className="inline-flex items-center justify-center text-xs font-medium text-foreground underline-offset-4 hover:underline sm:text-sm"
            >
              En savoir plus &rsaquo;
            </Link>
          </div>

          <div className="mx-auto mt-8 max-w-md sm:mt-12 sm:max-w-lg">
            <img
              src={hero.image}
              alt={hero.name}
              className="mx-auto w-full max-w-[280px] sm:max-w-[420px]"
            />
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
        <div className="mb-6 flex items-end justify-between sm:mb-10">
          <div>
            <h2 className="text-xl font-semibold tracking-tight sm:text-3xl">Nos parfums</h2>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">Trois signatures, trois univers.</p>
          </div>
          <Link to="/boutique" className="text-xs font-medium text-foreground underline-offset-4 hover:underline sm:text-sm">
            Tout voir &rsaquo;
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-6">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* TRUST */}
      <section className="border-t border-border/70 bg-secondary/40">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 py-8 sm:grid-cols-3 sm:gap-6 sm:px-6 sm:py-12">
          <Trust icon={<Truck className="h-4 w-4" />} title="Livraison soignée" text="Expédition sous 24 h." />
          <Trust icon={<ShieldCheck className="h-4 w-4" />} title="Authenticité garantie" text="Flacons originaux scellés." />
          <Trust icon={<RotateCcw className="h-4 w-4" />} title="Retours 14 jours" text="Simple, sans condition." />
        </div>
      </section>
    </div>
  );
}

function Trust({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-background text-foreground">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}
