"use client";

import { useState } from "react";
import { Star, ChevronDown, BadgeCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import type { Review } from "@/lib/data/midwives";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i <= rating
              ? "fill-amber-400 text-amber-400"
              : "fill-muted text-muted"
          )}
        />
      ))}
    </div>
  );
}

export default function ProfileReviews({
  reviews,
  averageRating,
  totalReviews,
}: {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}) {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? reviews : reviews.slice(0, 3);

  // Calculate breakdown
  const breakdown = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((r) => r.rating === stars).length;
    return { stars, count, pct: reviews.length > 0 ? (count / reviews.length) * 100 : 0 };
  });

  return (
    <section>
      <div className="rounded-[18px] border border-border/60 bg-card p-5 lg:p-6">
        {/* Summary */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-10">
          {/* Big rating */}
          <div className="flex flex-col items-center">
            <span className="text-[48px] font-bold leading-none tracking-[-2px] text-foreground">
              {averageRating}
            </span>
            <StarRating rating={Math.round(averageRating)} />
            <span className="mt-1 text-[13px] font-medium text-muted-foreground">
              {totalReviews} opinii
            </span>
          </div>

          {/* Breakdown bars */}
          <div className="flex-1 space-y-2">
            {breakdown.map(({ stars, count, pct }) => (
              <div key={stars} className="flex items-center gap-3">
                <span className="w-6 text-right text-[13px] font-medium text-muted-foreground">
                  {stars}
                </span>
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-amber-400 transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-6 text-[13px] font-medium text-muted-foreground">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-5 h-px bg-border/50" />

        {/* Reviews list */}
        <div className="space-y-4">
          <AnimatePresence initial={false}>
            {displayed.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="rounded-[14px] bg-muted/40 p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-semibold tracking-[-0.3px] text-foreground">
                      {review.author}
                    </span>
                    {review.verified && (
                      <span className="inline-flex items-center gap-1 text-[12px] font-medium text-emerald-600">
                        <BadgeCheck className="h-3.5 w-3.5" />
                        Zweryfikowana
                      </span>
                    )}
                  </div>
                  <span className="text-[12px] font-medium text-muted-foreground">
                    {new Date(review.date).toLocaleDateString("pl-PL", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="mt-1.5">
                  <StarRating rating={review.rating} />
                </div>
                <p className="mt-2 text-[14px] leading-relaxed text-foreground/80">
                  {review.text}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {reviews.length > 3 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-4 flex items-center gap-1.5 text-[14px] font-semibold text-primary transition-colors hover:text-primary/80"
          >
            {showAll ? "Zwiń opinie" : `Pokaż wszystkie (${reviews.length})`}
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                showAll && "rotate-180"
              )}
            />
          </button>
        )}
      </div>
    </section>
  );
}
