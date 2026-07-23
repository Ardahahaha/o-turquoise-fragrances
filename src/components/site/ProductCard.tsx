import { Link } from "@tanstack/react-router";
import { formatPrice, type Product } from "@/lib/cart";
import { TiltCard } from "@/components/site/TiltCard";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/produit/$id"
      params={{ id: product.id }}
      className="product-card group p-3 sm:p-5"
      data-no-shadow
    >
      <TiltCard className="rounded-[30px]">
        <div className="relative aspect-square overflow-hidden rounded-[24px]">
          {/* turquoise glow underlay revealed on hover */}
          <div className="pointer-events-none absolute -inset-8 -z-10 bg-[radial-gradient(circle_at_50%_60%,rgba(0,191,166,0.18),transparent_60%)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

          <img
            src={product.image}
            alt={`Flacon de parfum ${product.name} — ${product.brand}, disponible sur EAU TURQUOISE`}
            loading="lazy"
            decoding="async"
            sizes="(max-width: 640px) 46vw, 320px"
            width={600}
            height={600}
            className={`aspect-square w-full rounded-[20px] object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04] ${
              product.id === "hacivat" ? "p-10 sm:p-16" :
              product.id === "vert-malachite" || product.id === "bleu-turquoise" ? "p-12 sm:p-20" :
              "p-6 sm:p-10"
            }`}
            style={{ transform: "translateZ(40px)" }}
          />
        </div>
      </TiltCard>
      <div className="mt-3 flex flex-1 flex-col px-1 pb-1">
        <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{product.brand}</p>
        <h3 className="mt-1 text-sm font-medium text-foreground sm:text-base">{product.name}</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">{product.tagline} · {product.size}</p>
        <p className="mt-auto pt-2 text-sm font-medium text-foreground sm:text-base">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
