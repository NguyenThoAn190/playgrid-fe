"use client";

import React, { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import {
  Star,
  MapPin,
  Clock,
  Share2,
  Heart,
  ShieldCheck,
  ChevronRight,
  Flame,
  Check,
  Navigation,
} from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { VenueDetailData } from "@/lib/venue-data";

interface VenueHeaderProps {
  venue: VenueDetailData;
}

export function VenueHeader({ venue }: VenueHeaderProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  const tHeader = useTranslations("venue.header");
  const tNav = useTranslations("navbar");

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-3">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground overflow-x-auto whitespace-nowrap py-1 no-scrollbar">
        <Link href="/" className="hover:text-primary transition-colors shrink-0">
          {tNav("home")}
        </Link>
        <ChevronRight className="size-3.5 shrink-0 text-muted-foreground/60" />
        <Link href="/badminton/venue" className="hover:text-primary transition-colors shrink-0">
          {venue.sport}
        </Link>
        <ChevronRight className="size-3.5 shrink-0 text-muted-foreground/60" />
        <span className="text-foreground font-semibold shrink-0">
          {venue.shortName}
        </span>
      </nav>

      {/* Main Header Container */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
        {/* Left Column: Title, Badges & Quick Info */}
        <div className="space-y-2.5 max-w-3xl">
          {/* Badges Row */}
          <div className="flex flex-wrap items-center gap-2">
            {venue.verified && (
              <Badge className="bg-primary/10 text-primary border border-primary/20 flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full shadow-2xs">
                <ShieldCheck className="size-3.5 text-primary" />
                {tHeader("verified_partner")}
              </Badge>
            )}
            {venue.hot && (
              <Badge className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full shadow-2xs">
                <Flame className="size-3.5 fill-rose-500 text-rose-500" />
                {tHeader("top_booked")}
              </Badge>
            )}
          </div>

          {/* Venue Name */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight leading-tight">
            {venue.name}
          </h1>

          {/* Quick Metrics: Rating, Reviews, Address, Hours */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2.5 text-xs sm:text-sm text-muted-foreground pt-1">
            {/* Rating */}
            <div className="inline-flex items-center gap-1.5 bg-amber-500/10 dark:bg-amber-500/20 px-2.5 py-1 rounded-xl border border-amber-500/20 self-start shrink-0">
              <Star className="size-4 fill-amber-400 text-amber-400" />
              <span className="font-bold text-amber-600 dark:text-amber-400">{venue.rating}</span>
              <span className="text-muted-foreground font-normal">
                ({venue.reviewsCount} {tHeader("reviews")})
              </span>
            </div>

            {/* Address */}
            <div className="flex items-start gap-1.5 text-foreground/90 font-normal">
              <MapPin className="size-4 text-primary shrink-0 mt-0.5" />
              <span className="leading-snug">{venue.address}</span>
            </div>

            {/* Hours */}
            <div className="flex items-center gap-1.5 text-muted-foreground shrink-0 font-normal">
              <Clock className="size-4 text-muted-foreground/80 shrink-0" />
              <span>{venue.openHours}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Quick Actions */}
        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 pt-1 md:pt-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsLiked(!isLiked)}
            className={`flex-1 sm:flex-initial h-9 px-3 rounded-xl border-border/80 transition-all cursor-pointer shadow-2xs ${
              isLiked
                ? "bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-600 dark:text-rose-400 font-semibold"
                : "hover:bg-muted text-muted-foreground hover:text-foreground font-semibold"
            }`}
            aria-label={tHeader("favorite")}
          >
            <Heart className={`size-4 mr-1.5 ${isLiked ? "fill-rose-500 text-rose-500" : ""}`} />
            <span className="text-xs font-semibold">{isLiked ? tHeader("favorited") : tHeader("favorite")}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="flex-1 sm:flex-initial h-9 px-3 rounded-xl border-border/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-all cursor-pointer font-semibold shadow-2xs"
            aria-label={tHeader("share")}
          >
            {copied ? (
              <>
                <Check className="size-4 mr-1.5 text-emerald-500" />
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  {tHeader("share_toast")}
                </span>
              </>
            ) : (
              <>
                <Share2 className="size-4 mr-1.5" />
                <span className="text-xs font-semibold">{tHeader("share")}</span>
              </>
            )}
          </Button>

          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(venue.name + " " + venue.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial"
          >
            <Button
              size="sm"
              className="w-full h-9 px-3.5 rounded-xl bg-gradient-primary text-white font-bold text-xs shadow-2xs hover:shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <Navigation className="size-4 mr-1.5" />
              <span>{tHeader("directions")}</span>
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
