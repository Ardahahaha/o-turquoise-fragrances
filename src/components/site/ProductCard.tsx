import { Link } from "@tanstack/react-router";
import { formatPrice, type Product } from "@/lib/cart";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/produit/$id"
      params={{ id: product.id }}
      className="group block"
    >
      <div className="overflow-hidden rounded-xl bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="aspect-square w-full object-contain p-6 sm:p-10"
        />
      </div>
      <div className="mt-3 px-0.5">
        <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{product.brand}</p>
        <h3 className="mt-1 text-sm font-medium text-foreground sm:text-base">{product.name}</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">{product.tagline} · {product.size}</p>
        <p className="mt-1.5 text-sm font-medium text-foreground sm:text-base">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
