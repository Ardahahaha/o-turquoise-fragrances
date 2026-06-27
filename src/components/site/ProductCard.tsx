import { Link } from "@tanstack/react-router";
import { formatPrice, type Product } from "@/lib/cart";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/produit/$id"
      params={{ id: product.id }}
      className="group block"
    >
      <div className="glass-soft overflow-hidden rounded-2xl transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_30px_60px_-30px_rgba(15,23,42,0.25)] group-hover:ring-1 group-hover:ring-turquoise/40">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="aspect-square w-full object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-[1.03] sm:p-10"
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
