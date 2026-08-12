"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, MapPin } from "lucide-react";
import { Card } from "@workspace/ui/components/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { getSportColor } from "@/lib/sports-colors";

export interface CourtData {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewsCount: number;
  distance: string;
  imageUrl: string;
  price: string;
  badge?: "Hot" | "Gần bạn" | string;
  sports?: string[]; // e.g. ["Cầu lông", "Pickleball"], ["Bóng đá", "Bóng rổ"]
}

export interface CourtCardProps {
  court: CourtData;
  className?: string;
}

const FALLBACK_COURT_IMAGE = "/images/activities/badminton-banner.png";

export function CourtCard({ court, className = "" }: CourtCardProps) {
  const t = useTranslations("court_card");
  const [imgSrc, setImgSrc] = useState(court.imageUrl);

  return (
    <Card className={`group relative overflow-hidden rounded-2xl bg-card text-card-foreground border border-border/50 py-0 gap-0 shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 ${className}`}>
      {/* Court Thumbnail Image - Strict 12/5 Aspect Ratio */}
      <div className="relative aspect-[12/5] w-full overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
        <Image
          src={imgSrc}
          alt={court.name}
          fill
          unoptimized
          onError={() => setImgSrc(FALLBACK_COURT_IMAGE)}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />

        {/* Top-left Badge (Hot / Gần bạn) */}
        {court.badge && (
          <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 z-10">
            <span
              className={`inline-flex items-center rounded-full px-2 py-0.5 sm:px-2.5 sm:py-0.5 text-[10px] sm:text-[11px] font-bold text-white shadow-md backdrop-blur-xs ${
                court.badge === "Hot"
                  ? "bg-red-500"
                  : "bg-emerald-600"
              }`}
            >
              {court.badge}
            </span>
          </div>
        )}
      </div>

      {/* Court Content Details */}
      <div className="p-2.5 sm:p-4 space-y-1.5 sm:space-y-2 flex flex-col justify-between flex-1">
        <div className="space-y-1.5 sm:space-y-2">
          {/* Row 1: Title & Top-right Distance */}
          <div className="flex items-start justify-between gap-1 sm:gap-2">
            <Link href={`/courts/${court.id}`} className="block flex-1 min-w-0">
              <h3 className="font-bold text-xs sm:text-base text-foreground line-clamp-1 group-hover:text-[#0052FF] dark:group-hover:text-blue-400 transition-colors">
                {court.name}
              </h3>
            </Link>
            <div className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-[11px] text-muted-foreground shrink-0 mt-0.5">
              <MapPin className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-muted-foreground/70" />
              <span>{court.distance}</span>
            </div>
          </div>

          {/* Sports Tag Badges */}
          {court.sports && court.sports.length > 0 && (
            <div className="flex flex-wrap items-center gap-1 pt-0.5">
              {court.sports.map((sport) => {
                const sportTheme = getSportColor(sport);
                return (
                  <span
                    key={sport}
                    className={`inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-semibold ${sportTheme.tagBg}`}
                  >
                    {sport}
                  </span>
                );
              })}
            </div>
          )}

          {/* Row 2: Rating & Distance */}
          <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs">
            <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
              <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-amber-500 dark:text-amber-400">{court.rating}</span>
              <span className="text-muted-foreground">({court.reviewsCount})</span>
            </div>
            <div className="flex items-center gap-0.5 sm:gap-1 text-muted-foreground text-[10px] sm:text-[11px] truncate">
              <MapPin className="h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0 text-muted-foreground/70" />
              <span className="truncate">{court.distance}</span>
            </div>
          </div>
        </div>

        {/* Row 3: Price (Left) & Booking Button (Right) */}
        <div className="flex items-center justify-between gap-1.5 sm:gap-2 pt-1.5 sm:pt-2 border-t border-border/40 mt-1">
          <div className="space-y-0.5 min-w-0 flex-1">
            {/* Price */}
            <div className="font-extrabold text-xs sm:text-base text-emerald-600 dark:text-emerald-400 leading-tight truncate">
              {court.price}
            </div>
            {/* Location Address */}
            <div className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-[11px] text-muted-foreground">
              <MapPin className="h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0 text-muted-foreground/70" />
              <span className="truncate">{court.location}</span>
            </div>
          </div>

          {/* Action Button: Đặt sân */}
          <Link href={`/courts/${court.id}`} className="shrink-0">
            <Button
              variant="outline"
              size="sm"
              className="h-7 sm:h-8 px-2 sm:px-3.5 rounded-lg sm:rounded-xl border-blue-500/40 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:border-blue-500 font-bold text-[10px] sm:text-xs transition-all cursor-pointer shadow-2xs whitespace-nowrap"
            >
              {t("book_btn")}
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}

