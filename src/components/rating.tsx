import { Star } from "lucide-react";
import { formatRating } from "@/lib/format";
import { cn } from "@/lib/utils";

type RatingProps = {
  rating: number;
  reviews?: number;
  size?: "sm" | "md";
  className?: string;
};

export function Rating({ rating, reviews, size = "sm", className }: RatingProps) {
  const filled = Math.round(rating);
  const starSize = size === "sm" ? "size-3" : "size-4";

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 text-muted-foreground",
        size === "sm" ? "text-xs" : "text-sm",
        className,
      )}
      aria-label={`Rated ${formatRating(rating)} out of 5`}
    >
      <span aria-hidden className="flex items-center gap-0.5">
        {[0, 1, 2, 3, 4].map((index) => (
          <Star
            key={index}
            className={cn(
              starSize,
              index < filled
                ? "fill-foreground text-foreground"
                : "text-foreground/20",
            )}
          />
        ))}
      </span>
      <span className="font-medium text-foreground">{formatRating(rating)}</span>
      {typeof reviews === "number" && <span aria-hidden>({reviews})</span>}
    </div>
  );
}
