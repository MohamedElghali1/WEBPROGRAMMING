import { Star } from "lucide-react";

export function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  return (
    <div className="inline-flex items-center gap-1">
      <div className="inline-flex">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < full || (i === full && hasHalf);
          return (
            <Star
              key={i}
              size={size}
              className={filled ? "fill-yellow-400 stroke-yellow-400" : "stroke-muted-foreground/40 fill-transparent"}
            />
          );
        })}
      </div>
      <span className="text-xs text-muted-foreground">
        {rating.toFixed(1)}<span className="opacity-60">/5</span>
      </span>
    </div>
  );
}
