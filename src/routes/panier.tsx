import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag, Lock } from "lucide-react";
import { useCart, formatPrice } from "@/lib/cart";

export const Route = createFileRoute("/panier")({
  head: () => ({
    meta: [
      { title: "Votre panier — EAU TURQUOISE" },
      { name: "description", content: "Récapitulatif de votre commande de parfums chez EAU TURQUOISE. Paiement sécurisé et livraison offerte en France." },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "https://eauturquoise.lovable.app/panier" }],
  }),
  component: Panier,
});

function Panier() {
  const { items, setQty, remove, total, clear } = useCart();
  const shipping = 0;
  const grand = total + shipping;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center sm:py-24">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-secondary">
          <ShoppingBag className="h-5 w-5 text-foreground" />
        </div>
        <h1 className="mt-5 text-xl font-semibold tracking-tight sm:text-2xl">Votre panier est vide</h1>
        <p className="mt-2 text-xs text-muted-foreground sm:text-sm">Découvrez notre sélection de parfums.</p>
        <Link
          to="/boutique"
          className="mt-5 inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2.5 text-xs font-medium text-background transition-opacity hover:opacity-90 sm:text-sm"
        >
          Voir la boutique
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-14">
      <h1 className="text-2xl font-semibold tracking-tight sm:text-4xl">Panier</h1>
      <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
        {items.length} article{items.length > 1 ? "s" : ""}
      </p>

      <div className="mt-6 grid gap-8 md:grid-cols-[1fr_320px] md:gap-10">
        {/* Items */}
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="grid grid-cols-[64px_minmax(0,1fr)] gap-3 rounded-xl border border-border/70 bg-background p-3 sm:grid-cols-[88px_minmax(0,1fr)_auto] sm:items-center sm:gap-5 sm:p-4"
            >
              <div className="rounded-lg bg-secondary p-1.5 sm:p-2">
                <img src={item.image} alt={item.name} className="aspect-square w-full object-contain" />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{item.brand}</p>
                <p className="mt-0.5 truncate text-sm font-medium">{item.name}</p>
                <p className="text-[11px] text-muted-foreground">{item.size}</p>

                <div className="mt-2 flex items-center gap-2 sm:hidden">
                  <QtyControl
                    qty={item.quantity}
                    onMinus={() => setQty(item.id, item.size, item.quantity - 1)}
                    onPlus={() => setQty(item.id, item.size, item.quantity + 1)}
                  />
                  <span className="ml-auto text-sm font-medium">{formatPrice(item.price * item.quantity)}</span>
                </div>
              </div>

              <div className="hidden flex-col items-end gap-2 sm:flex">
                <QtyControl
                  qty={item.quantity}
                  onMinus={() => setQty(item.id, item.size, item.quantity - 1)}
                  onPlus={() => setQty(item.id, item.size, item.quantity + 1)}
                />
                <span className="text-base font-medium">{formatPrice(item.price * item.quantity)}</span>
                <button
                  onClick={() => remove(item.id, item.size)}
                  className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-3 w-3" /> Retirer
                </button>
              </div>

              <button
                onClick={() => remove(item.id, item.size)}
                className="col-span-2 inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-destructive sm:hidden"
              >
                <Trash2 className="h-3 w-3" /> Retirer
              </button>
            </div>
          ))}

          <button onClick={clear} className="text-[11px] text-muted-foreground underline-offset-4 hover:underline">
            Vider le panier
          </button>
        </div>

        {/* Summary */}
        <aside className="h-fit rounded-xl border border-border/70 bg-secondary/40 p-5 md:sticky md:top-20">
          <h2 className="text-base font-semibold sm:text-lg">Résumé</h2>
          <dl className="mt-4 space-y-2 text-xs sm:text-sm">
            <Row label="Sous-total" value={formatPrice(total)} />
            <Row label="Livraison" value={shipping === 0 ? "Offerte" : formatPrice(shipping)} />
            <div className="border-t border-border/70 pt-2">
              <Row
                label={<span className="text-sm font-medium text-foreground">Total</span>}
                value={<span className="text-base font-semibold">{formatPrice(grand)}</span>}
              />
            </div>
          </dl>

          <button className="mt-5 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-xs font-medium text-background transition-opacity hover:opacity-90 sm:text-sm">
            <Lock className="h-3.5 w-3.5" /> Valider ma commande
          </button>

          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            Paiement sécurisé
          </p>
        </aside>
      </div>
    </div>
  );
}

function QtyControl({ qty, onMinus, onPlus }: { qty: number; onMinus: () => void; onPlus: () => void }) {
  return (
    <div className="inline-flex items-center rounded-full border border-border bg-background">
      <button onClick={onMinus} className="grid h-7 w-7 place-items-center rounded-l-full hover:bg-secondary" aria-label="Diminuer" data-no-shadow>
        <Minus className="h-3 w-3" />
      </button>
      <span className="w-7 text-center text-xs">{qty}</span>
      <button onClick={onPlus} className="grid h-7 w-7 place-items-center rounded-r-full hover:bg-secondary" aria-label="Augmenter" data-no-shadow>
        <Plus className="h-3 w-3" />
      </button>
    </div>
  );
}

function Row({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-foreground">{value}</dd>
    </div>
  );
}
