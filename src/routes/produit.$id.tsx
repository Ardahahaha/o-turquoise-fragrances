import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, Check, Truck, ShieldCheck } from "lucide-react";
import { getProduct, formatPrice, useCart } from "@/lib/cart";

export const Route = createFileRoute("/produit/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) return { meta: [] };
    const { product } = loaderData;
    const url = `https://eauturquoise.lovable.app/produit/${params.id}`;
    const title = `${product.name} — ${product.brand} | EAU TURQUOISE`;
    const description = `${product.name} (${product.size}) par ${product.brand}. ${product.description}`.slice(0, 160);
    const images = product.images && product.images.length > 0 ? product.images : [product.image];
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: `${product.name} — ${product.brand}` },
        { property: "og:description", content: product.tagline + " · " + product.size },
        { property: "og:type", content: "product" },
        { property: "og:url", content: url },
        { property: "og:image", content: product.image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${product.name} — ${product.brand}` },
        { name: "twitter:description", content: product.tagline + " · " + product.size },
        { name: "twitter:image", content: product.image },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            brand: { "@type": "Brand", name: product.brand },
            description: product.description,
            image: images,
            sku: product.id,
            mpn: product.id,
            category: "Parfum",
            offers: {
              "@type": "Offer",
              price: product.price,
              priceCurrency: "EUR",
              priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
              availability: "https://schema.org/InStock",
              itemCondition: "https://schema.org/NewCondition",
              url,
              shippingDetails: {
                "@type": "OfferShippingDetails",
                shippingRate: { "@type": "MonetaryAmount", value: 0, currency: "EUR" },
                shippingDestination: { "@type": "Country", name: "France" },
                deliveryTime: {
                  "@type": "ShippingDeliveryTime",
                  handlingTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 2, unitCode: "DAY" },
                  transitTime: { "@type": "QuantitativeValue", minValue: 3, maxValue: 5, unitCode: "DAY" },
                },
              },
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Accueil", item: "https://eauturquoise.lovable.app/" },
              { "@type": "ListItem", position: 2, name: "Boutique", item: "https://eauturquoise.lovable.app/boutique" },
              { "@type": "ListItem", position: 3, name: product.name, item: url },
            ],
          }),
        },
      ],
    };
  },
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
              alt={`Flacon ${product.name} ${product.tagline} ${product.size} — ${product.brand}, parfum authentique disponible chez EAU TURQUOISE`}
              width={760}
              height={760}
              fetchPriority="high"
              decoding="async"
              className="mx-auto w-full max-w-md p-6 sm:p-12 animate-in fade-in duration-300"
            />
          </div>
          {gallery.length > 1 && (
            <div className="mt-3 flex gap-2 sm:mt-4 sm:gap-3">
              {gallery.map((src: string, i: number) => (
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
                  <img src={src} alt="" loading="lazy" decoding="async" width={120} height={120} className="h-full w-full object-contain p-1.5" />
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
            <h2 className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-normal">Notes olfactives</h2>
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
              className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-b from-[#F6E8C8] to-[#E3C68C] px-5 py-3 text-xs font-semibold text-[#2A2118] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8),0_12px_28px_-8px_rgba(180,140,70,0.55),0_24px_48px_-16px_rgba(180,140,70,0.35)] transition-all duration-500 hover:-translate-y-0.5 hover:from-[#FAEDCF] hover:to-[#E8CC91] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),0_16px_36px_-10px_rgba(180,140,70,0.65),0_32px_60px_-20px_rgba(180,140,70,0.45)] active:translate-y-0 sm:py-3.5 sm:text-sm"
            >
              {/* Specular highlight */}
              <span className="pointer-events-none absolute inset-x-4 top-0 h-1/2 rounded-full bg-gradient-to-b from-white/80 to-transparent opacity-90" />
              {/* Liquid shimmer sweep */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/55 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />
              {/* Warm gold glow underlay */}
              <span className="pointer-events-none absolute -inset-1 -z-10 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(220,180,110,0.85),transparent_70%)] opacity-60 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
              <span className="relative">
                {added ? (
                  <><Check className="relative h-3.5 w-3.5" /> Ajouté au panier</>
                ) : (
                  <>Ajouter au panier — {formatPrice(product.price * qty)}</>
                )}
              </span>
            </button>

            <Link
              to="/panier"
              className="block w-full rounded-full border border-border bg-background px-5 py-2.5 text-center text-xs font-medium transition-colors hover:bg-secondary sm:py-3 sm:text-sm"
            >
              Voir le panier
            </Link>
          </div>

          {/* Shipping mini */}
          <div className="mt-6 border-t border-border/70 pt-5">
            <h2 className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-normal">Livraison & garanties</h2>
            <div className="mt-3 grid gap-2 text-xs sm:text-sm">
              <Mini icon={<Truck className="h-3.5 w-3.5" />} text="Livraison offerte" />
              <Mini icon={<ShieldCheck className="h-3.5 w-3.5" />} text="Parfum authentique officiel, neuf et scellé" />
            </div>
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
