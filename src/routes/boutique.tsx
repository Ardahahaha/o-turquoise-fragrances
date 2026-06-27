import { createFileRoute } from "@tanstack/react-router";
import { PRODUCTS } from "@/lib/cart";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/boutique")({
  head: () => ({
    meta: [
      { title: "Boutique — O Turquoise" },
      { name: "description", content: "Découvrez notre sélection de parfums d'exception." },
    ],
  }),
  component: Boutique,
});

function Boutique() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-14">
      <header className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-4xl">Boutique</h1>
        <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
          Une sélection rigoureuse de parfums iconiques.
        </p>
      </header>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-6">
        {PRODUCTS.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
