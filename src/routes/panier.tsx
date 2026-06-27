import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag, Lock } from "lucide-react";
import { useCart, formatPrice } from "@/lib/cart";
import { BottlePlaceholder } from "@/components/site/BottlePlaceholder";

export const Route = createFileRoute("/panier")({
  head: () => ({ meta: [{ title: "Panier — O Turquoise" }] }),
  component: Panier,
});

function Panier() {
  const { items, setQty, remove, total, clear } = useCart();
  const shipping = total > 0 && total < 200 ? 9.9 : 0;
  const grand = total + shipping;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-border bg-gradient-soft shadow-soft">
          <ShoppingBag className="h-6 w-6 text-primary" />
        </div>
        <h1 className="mt-6 font-display text-4xl font-light">Votre panier est vide</h1>
        <p className="mt-3 text-sm text-muted-foreground">Découvrez notre sélection et laissez-vous séduire.</p>
        <Link
          to="/produit"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background shadow-elegant transition-all hover:bg-primary hover:shadow-glow"
        >
          Découvrir le parfum
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-16">
      <h1 className="font-display text-4xl font-light sm:text-5xl">Panier</h1>
      <p className="mt-2 text-sm text-muted-foreground">{items.length} article{items.length > 1 ? "s" : ""}</p>

      <div className="mt-10 grid gap-10 md:grid-cols-[1fr_360px] md:gap-12">
        {/* Items */}
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="grid grid-cols-[88px_minmax(0,1fr)] gap-4 rounded-2xl border border-border/60 bg-background p-4 shadow-card sm:grid-cols-[120px_minmax(0,1fr)_auto] sm:items-center sm:gap-6"
            >
              <BottlePlaceholder className="h-24 sm:h-32" label={item.name} />

              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.2em] text-primary">{item.brand}</p>
                <p className="mt-1 truncate font-display text-lg">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.size}</p>

                <div className="mt-3 flex items-center gap-3 sm:hidden">
                  <QtyControl
                    qty={item.quantity}
                    onMinus={() => setQty(item.id, item.size, item.quantity - 1)}
                    onPlus={() => setQty(item.id, item.size, item.quantity + 1)}
                  />
                  <span className="ml-auto font-display text-lg">{formatPrice(item.price * item.quantity)}</span>
                </div>
              </div>

              <div className="hidden flex-col items-end gap-3 sm:flex">
                <QtyControl
                  qty={item.quantity}
                  onMinus={() => setQty(item.id, item.size, item.quantity - 1)}
                  onPlus={() => setQty(item.id, item.size, item.quantity + 1)}
                />
                <span className="font-display text-xl">{formatPrice(item.price * item.quantity)}</span>
                <button
                  onClick={() => remove(item.id, item.size)}
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Retirer
                </button>
              </div>

              <button
                onClick={() => remove(item.id, item.size)}
                className="col-span-2 -mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-destructive sm:hidden"
              >
                <Trash2 className="h-3.5 w-3.5" /> Retirer
              </button>
            </div>
          ))}

          <button onClick={clear} className="text-xs text-muted-foreground underline-offset-4 hover:underline">
            Vider le panier
          </button>
        </div>

        {/* Summary */}
        <aside className="h-fit rounded-2xl border border-border/60 bg-gradient-soft p-6 shadow-elegant md:sticky md:top-24">
          <h2 className="font-display text-2xl">Résumé</h2>
          <dl className="mt-6 space-y-3 text-sm">
            <Row label="Sous-total" value={formatPrice(total)} />
            <Row label="Livraison" value={shipping === 0 ? "Offerte" : formatPrice(shipping)} />
            <div className="border-t border-border/60 pt-3">
              <Row label={<span className="font-display text-lg text-foreground">Total</span>} value={<span className="font-display text-2xl">{formatPrice(grand)}</span>} />
            </div>
          </dl>

          <button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-7 py-4 text-sm font-medium text-background shadow-elegant transition-all hover:bg-primary hover:shadow-glow">
            <Lock className="h-4 w-4" /> Valider ma commande
          </button>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Paiement sécurisé · Retours 14 jours
          </p>
        </aside>
      </div>
    </div>
  );
}

function QtyControl({ qty, onMinus, onPlus }: { qty: number; onMinus: () => void; onPlus: () => void }) {
  return (
    <div className="inline-flex items-center rounded-full border border-border bg-background">
      <button onClick={onMinus} className="grid h-9 w-9 place-items-center rounded-l-full transition-colors hover:bg-secondary" aria-label="Diminuer">
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="w-8 text-center text-sm">{qty}</span>
      <button onClick={onPlus} className="grid h-9 w-9 place-items-center rounded-r-full transition-colors hover:bg-secondary" aria-label="Augmenter">
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function Row({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-foreground">{value}</dd>
    </div>
  );
}
