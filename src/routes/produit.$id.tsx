import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, Check, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { getProduct, formatPrice, useCart } from "@/lib/cart";

export const Route = createFileRoute("/produit/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — O Turquoise` },
          { name: "description", content: loaderData.product.description },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <h1 className="text-2xl font-semibold">Parfum introuvable</h1>
      <Link to="/boutique" className="mt-4 inline-block text-sm underline">Retour à la boutique</Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const gallery = product.images && product.images.length > 0 ? product.images : [product.image];
  const [activeImg, setActiveImg] = useState(0);

  const onAdd = () => {
    add(
      { id: product.id, name: product.name, brand: product.brand, price: product.price, size: product.size, image: product.image },
      qty,
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-12">
      <nav className="mb-4 text-[11px] text-muted-foreground sm:text-xs">
        <Link to="/" className="hover:text-foreground">Accueil</Link>
        <span className="mx-1.5">/</span>
        <Link to="/boutique" className="hover:text-foreground">Boutique</Link>
        <span className="mx-1.5">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-6 md:grid-cols-2 md:gap-12">
        {/* Gallery */}
        <div>
          <div className="rounded-2xl bg-card ring-1 ring-border">
            <img
              key={gallery[activeImg]}
              src={gallery[activeImg]}
              alt={product.name}
              className="mx-auto w-full max-w-md p-6 sm:p-12 animate-in fade-in duration-300"
            />
          </div>
          {gallery.length > 1 && (
            <div className="mt-3 flex gap-2 sm:mt-4 sm:gap-3">
              {gallery.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setActiveImg(i)}
                  data-no-shadow
                  aria-label={`Voir l'image ${i + 1}`}
                  className={`relative aspect-square w-16 overflow-hidden rounded-lg bg-card ring-1 transition-all sm:w-20 ${
                    activeImg === i
                      ? "ring-2 ring-turquoise"
                      : "ring-border hover:ring-foreground/30"
                  }`}
                >
                  <img src={src} alt="" className="h-full w-full object-contain p-1.5" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{product.brand}</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-4xl">{product.name}</h1>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{product.tagline} · {product.size}</p>

          <p className="mt-3 text-lg font-semibold sm:text-xl">{formatPrice(product.price)}</p>

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

          {/* Notes */}
          <div className="mt-6 rounded-xl border border-border/70 bg-secondary/40 p-4">
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Notes olfactives</p>
            <div className="mt-3 space-y-2">
              <NoteRow label="Tête" items={product.notes.tete} />
              <NoteRow label="Cœur" items={product.notes.coeur} />
              <NoteRow label="Fond" items={product.notes.fond} />
            </div>
          </div>

          {/* Quantity + CTA */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground sm:text-sm">Quantité</span>
              <div className="inline-flex items-center rounded-full border border-border bg-background">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid h-8 w-8 place-items-center rounded-l-full hover:bg-secondary" data-no-shadow
                  aria-label="Diminuer"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="w-8 text-center text-xs font-medium">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="grid h-8 w-8 place-items-center rounded-r-full hover:bg-secondary" data-no-shadow
                  aria-label="Augmenter"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>

            <button
              onClick={onAdd}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-xs font-medium text-background transition-opacity hover:opacity-90 sm:py-3 sm:text-sm"
            >
              {added ? (
                <><Check className="h-3.5 w-3.5" /> Ajouté au panier</>
              ) : (
                <>Ajouter au panier — {formatPrice(product.price * qty)}</>
              )}
            </button>

            <Link
              to="/panier"
              className="block w-full rounded-full border border-border bg-background px-5 py-2.5 text-center text-xs font-medium transition-colors hover:bg-secondary sm:py-3 sm:text-sm"
            >
              Voir le panier
            </Link>
          </div>

          {/* Shipping mini */}
          <div className="mt-6 grid gap-2 border-t border-border/70 pt-5 text-xs sm:text-sm">
            <Mini icon={<Truck className="h-3.5 w-3.5" />} text="Livraison offerte dès 200 €" />
            <Mini icon={<RotateCcw className="h-3.5 w-3.5" />} text="Retours sous 14 jours" />
            <Mini icon={<ShieldCheck className="h-3.5 w-3.5" />} text="Authenticité garantie" />
          </div>
        </div>
      </div>
    </div>
  );
}

function NoteRow({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="grid grid-cols-[60px_1fr] items-baseline gap-3 text-xs sm:text-sm">
      <span className="font-medium text-foreground">{label}</span>
      <span className="text-muted-foreground">{items.join(" · ")}</span>
    </div>
  );
}

function Mini({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2.5 text-muted-foreground">
      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-secondary text-foreground">{icon}</span>
      <span>{text}</span>
    </div>
  );
}
