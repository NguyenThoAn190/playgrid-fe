"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Star, ThumbsUp, MessageSquare, ShieldCheck } from "lucide-react";
import { Card } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { Badge } from "@workspace/ui/components/badge";
import { VenueDetailData } from "@/lib/venue-data";

interface VenueReviewsProps {
  venue: VenueDetailData;
}

export function VenueReviews({ venue }: VenueReviewsProps) {
  const [likesState, setLikesState] = useState<Record<string, number>>({});
  const [filterRating, setFilterRating] = useState<number | "all">("all");

  const tRev = useTranslations("venue.reviews");

  const handleLike = (reviewId: string, initialLikes: number) => {
    setLikesState((prev) => ({
      ...prev,
      [reviewId]: (prev[reviewId] ?? initialLikes) + 1,
    }));
  };

  const filteredReviews = venue.reviews.filter((rev) => {
    if (filterRating === "all") return true;
    return rev.rating === filterRating;
  });

  return (
    <Card className="rounded-2xl border border-border/80 bg-card p-4 sm:p-5 space-y-3 shadow-2xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Star className="size-5 fill-amber-400 text-amber-400" />
            {tRev("title", { count: venue.reviewsCount })}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-normal mt-0.5">
            {tRev("subtitle")}
          </p>
        </div>

        <Button
          size="sm"
          variant="outline"
          className="h-8 px-3 rounded-xl border-border/80 text-xs font-semibold self-start sm:self-auto hover:bg-muted"
        >
          <MessageSquare className="size-3.5 mr-1.5" />
          {tRev("write_review")}
        </Button>
      </div>

      {/* Ratings Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-xl bg-muted/20 border border-border/60">
        {/* Left: Big Score */}
        <div className="flex flex-col items-center justify-center p-3 text-center border-b md:border-b-0 md:border-r border-border/60">
          <span className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
            {venue.rating}
          </span>
          <div className="flex items-center gap-1 my-1.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="size-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <p className="text-xs font-semibold text-muted-foreground">
            {tRev("based_on_reviews", { count: venue.reviewsCount })}
          </p>
        </div>

        {/* Right: Detailed Metric Bars */}
        <div className="md:col-span-2 space-y-2.5 justify-center flex flex-col">
          {[
            { label: tRev("categories.surfaceQuality"), score: venue.ratingBreakdown.surfaceQuality },
            { label: tRev("categories.lighting"), score: venue.ratingBreakdown.lighting },
            { label: tRev("categories.cleanliness"), score: venue.ratingBreakdown.cleanliness },
            { label: tRev("categories.service"), score: venue.ratingBreakdown.service },
          ].map((metric) => (
            <div key={metric.label} className="space-y-1 text-xs">
              <div className="flex justify-between font-semibold">
                <span className="text-foreground/90">{metric.label}</span>
                <span className="font-bold text-foreground">{metric.score} / 5.0</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-primary transition-all duration-500"
                  style={{ width: `${(metric.score / 5) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Filter Tags */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        <span className="text-xs font-semibold text-muted-foreground mr-1">{tRev("filter_label")}</span>
        <button
          type="button"
          onClick={() => setFilterRating("all")}
          className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            filterRating === "all"
              ? "bg-primary text-primary-foreground shadow-2xs"
              : "bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          {tRev("filter_all")} ({venue.reviews.length})
        </button>
        {[5, 4, 3].map((star) => (
          <button
            type="button"
            key={star}
            onClick={() => setFilterRating(star)}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
              filterRating === star
                ? "bg-primary text-primary-foreground shadow-2xs"
                : "bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <span>{star}</span>
            <Star className="size-3 fill-amber-400 text-amber-400" />
          </button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="space-y-4 pt-2">
        {filteredReviews.map((rev) => {
          const currentLikes = likesState[rev.id] ?? rev.likes;

          return (
            <div
              key={rev.id}
              className="p-4 rounded-xl bg-muted/20 border border-border/60 space-y-3 hover:border-border transition-colors"
            >
              {/* Review Header: User avatar, rating, date */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="size-10 border border-border">
                    <AvatarImage src={rev.userAvatar} alt={rev.userName} />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                      {rev.userName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-semibold text-xs sm:text-sm text-foreground">
                        {rev.userName}
                      </h3>
                      <Badge className="bg-primary/10 text-primary border border-primary/20 text-[10px] font-semibold px-1.5 py-0 rounded-md">
                        <ShieldCheck className="size-3 mr-0.5" /> {tRev("verified_booking")}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-normal">
                      <span>{rev.date}</span>
                      {rev.courtUsed && <span>• {tRev("played_at", { court: rev.courtUsed })}</span>}
                    </div>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex items-center gap-0.5">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              {/* Review Comment Content */}
              <p className="text-xs sm:text-sm text-foreground/90 font-normal leading-relaxed">
                {rev.comment}
              </p>

              {/* Review Tags & Likes */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex flex-wrap gap-1.5">
                  {rev.tags?.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md bg-muted text-muted-foreground text-[10px] font-semibold"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => handleLike(rev.id, rev.likes)}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors cursor-pointer shrink-0 whitespace-nowrap ml-auto"
                >
                  <ThumbsUp className="size-3.5" />
                  <span>{tRev("helpful")} ({currentLikes})</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
