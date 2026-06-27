import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, ShoppingBag, Check, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { BottlePlaceholder } from "@/components/site/BottlePlaceholder";
import { PRODUCT, formatPrice, useCart } from "@/lib/cart";

export const Route = createFileRoute("/produit")({
  head: () => ({
    meta: [
      { title: `${PRODUCT.name} — O Turquoise` },
      { name: "description", content: `${PRODUCT.name} de ${PRODUCT.brand}, disponible chez O Turquoise.` },
    ],
  }),
  component: Product,
});

function Product() {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [size] = useState(PRODUCT.sizes[0]);
  const [added, setAdded] = useState(false);

  const onAdd = () => {
    add({ id: PRODUCT.id, name: PRODUCT.name, brand: PRODUCT.brand, price: PRODUCT.price, size }, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-16">
      <nav className="mb-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Accueil</Link> <span className="mx-2">/</span>
        <span className="text-foreground">Le Parfum</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2 md:gap-14">
        {/* Gallery */}
        <div className="space-y-4">
          <BottlePlaceholder className="h-[420px] sm:h-[560px]" label={PRODUCT.name} />
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <BottlePlaceholder key={i} className="h-24 sm:h-28" label={`Vue ${i}`} />
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-primary">{PRODUCT.brand}</p>
          <h1 className="mt-3 font-display text-4xl font-light sm:text-5xl">{PRODUCT.name}</h1>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-display text-3xl">{formatPrice(PRODUCT.price)}</span>
            <span className="text-sm text-muted-foreground">— {size}</span>
          </div>

          <p className="mt-6 text-base leading-relaxed text-muted-foreground">{PRODUCT.long}</p>

          {/* Notes */}
          <div className="mt-8 rounded-2xl border border-border/60 bg-gradient-soft p-6 shadow-card">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Notes olfactives</p>
            <div className="mt-4 space-y-4">
              <NoteRow label="Tête" items={PRODUCT.notes.tete} />
              <NoteRow label="Cœur" items={PRODUCT.notes.coeur} />
              <NoteRow label="Fond" items={PRODUCT.notes.fond} />
            </div>
          </div>

          {/* Quantity + CTA */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Quantité</span>
              <div className="inline-flex items-center rounded-full border border-border bg-background shadow-soft">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid h-11 w-11 place-items-center rounded-l-full transition-colors hover:bg-secondary"
                  aria-label="Diminuer"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center text-sm font-medium">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="grid h-11 w-11 place-items-center rounded-r-full transition-colors hover:bg-secondary"
                  aria-label="Augmenter"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <button
              onClick={onAdd}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-8 py-4 text-sm font-medium text-background shadow-elegant transition-all hover:bg-primary hover:shadow-glow"
            >
              {added ? (<><Check className="h-4 w-4" /> Ajouté au panier</>) : (<><ShoppingBag className="h-4 w-4" /> Ajouter au panier — {formatPrice(PRODUCT.price * qty)}</>)}
            </button>

            <Link
              to="/panier"
              className="block w-full rounded-full border border-border bg-background px-8 py-4 text-center text-sm font-medium transition-all hover:border-primary hover:text-primary"
            >
              Voir le panier
            </Link>
          </div>

          {/* Shipping mini */}
          <div className="mt-8 grid gap-3 border-t border-border/60 pt-6 text-sm">
            <Mini icon={<Truck className="h-4 w-4" />} text="Livraison offerte dès 200 €" />
            <Mini icon={<RotateCcw className="h-4 w-4" />} text="Retours sous 14 jours" />
            <Mini icon={<ShieldCheck className="h-4 w-4" />} text="Authenticité garantie" />
          </div>
        </div>
      </div>

      {/* Reviews placeholder */}
      <section className="mt-20">
        <h2 className="font-display text-3xl font-light sm:text-4xl">Avis clients</h2>
        <p className="mt-2 text-sm text-muted-foreground">Les avis seront affichés ici prochainement.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl border border-dashed border-border bg-gradient-soft p-6 text-center text-sm text-muted-foreground shadow-card">
              <p className="font-display text-lg text-foreground/70">Avis à venir</p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em]">Emplacement réservé</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function NoteRow({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="grid grid-cols-[80px_1fr] items-baseline gap-3">
      <span className="font-display text-base text-primary">{label}</span>
      <span className="text-sm text-muted-foreground">{items.join(" · ")}</span>
    </div>
  );
}

function Mini({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 text-muted-foreground">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-secondary text-primary">{icon}</span>
      <span>{text}</span>
    </div>
  );
}
