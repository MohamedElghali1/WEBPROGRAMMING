import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/products";
import { StarRating } from "./StarRating";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/products/$id"
      params={{ id: product.id }}
      className="group block"
    >
      <div className="aspect-square overflow-hidden rounded-xl bg-[var(--color-surface)]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <h3 className="mt-3 font-bold text-base tracking-tight line-clamp-1">{product.name}</h3>
      <div className="mt-1">
        <StarRating rating={product.rating} />
      </div>
      <div className="mt-2 flex items-center gap-2">
        <span className="text-lg font-bold">${product.price}</span>
        {product.originalPrice && (
          <>
            <span className="text-lg font-bold text-muted-foreground line-through">
              ${product.originalPrice}
            </span>
            <span className="rounded-full bg-[oklch(0.66_0.22_24_/_0.1)] px-2 py-0.5 text-xs font-medium text-[var(--color-sale)]">
              -{product.discountPercent}%
            </span>
          </>
        )}
      </div>
    </Link>
  );
}
