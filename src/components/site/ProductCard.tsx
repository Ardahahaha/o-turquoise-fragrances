import { Link } from "@tanstack/react-router";
import { formatPrice, type Product } from "@/lib/cart";
import { TiltCard } from "@/components/site/TiltCard";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/produit/$id"
      params={{ id: product.id }}
      className="group block"
      data-no-shadow
    >
      <TiltCard className="rounded-2xl">
        <div className="glass-soft relative overflow-hidden rounded-2xl ring-1 ring-black/5 transition-shadow duration-500 ease-out group-hover:shadow-[0_30px_60px_-30px_rgba(15,23,42,0.35)] group-hover:ring-turquoise/40">
          {/* turquoise glow underlay revealed on hover */}
          <div className="pointer-events-none absolute -inset-8 -z-10 bg-[radial-gradient(circle_at_50%_60%,rgba(0,191,166,0.18),transparent_60%)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            width={600}
            height={600}
            className="aspect-square w-full object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-[1.04] sm:p-10"
            style={{ transform: "translateZ(40px)" }}
          />
        </div>
      </TiltCard>
      <div className="mt-3 px-0.5">
        <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{product.brand}</p>
        <h3 className="mt-1 text-sm font-medium text-foreground sm:text-base">{product.name}</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">{product.tagline} · {product.size}</p>
        <p className="mt-1.5 text-sm font-medium text-foreground sm:text-base">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
