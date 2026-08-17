"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart, Calendar, MapPin, Flame, ThumbsUp } from "lucide-react";
import { Card } from "@workspace/ui/components/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { getSportColor } from "@/lib/sports-colors";
import { getPaymentUrl } from "@workspace/shared/utils/sso";

export interface EventData {
  id: string;
  title: string;
  category?: string; // e.g. "Marathon", "Trail Running", "Concert", "Giải cầu lông"
  distanceText?: string; // e.g. "5km - 42km", "15km - 75km", "Cụm Bơi 3km"
  distances?: string[]; // e.g. ["5km", "10km", "21km", "42km", "70km"]
  date: string; // e.g. "12 - 13 Tháng 9, 2026"
  location: string; // e.g. "Bãi biển Vân Đồn"
  price: string; // e.g. "479.000đ"
  priceSubtext?: string; // e.g. "Chỉ từ"
  imageUrl: string;
  badge?: {
    type: "hot" | "recommended" | "custom";
    text: string;
  };
  buttonText?: string; // e.g. "Đăng ký", "Mua vé"
  isFavorite?: boolean;
}

export interface EventCardProps {
  event: EventData;
  className?: string;
}

export function formatDistanceDisplay(distanceText?: string, distances?: string[]): string | undefined {
  if (distanceText) return distanceText;
  if (!distances || distances.length === 0) return undefined;
  if (distances.length <= 3) return distances.join(" • ");
  return `${distances[0]} - ${distances[distances.length - 1]} (${distances.length} cự ly)`;
}

export function EventCard({ event, className = "" }: EventCardProps) {
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const [isFavorite, setIsFavorite] = useState(event.isFavorite || false);
  const sportTheme = getSportColor(event.category);
  const formattedDistance = formatDistanceDisplay(event.distanceText, event.distances);

  const getEventTargetUrl = () => {
    const cat = event.category?.toLowerCase() || "";
    const id = event.id.toLowerCase();
    if (id.startsWith("tourney-") || cat.includes("giải") || cat.includes("tournament")) {
      return getPaymentUrl({
        type: "tournament",
        orderId: `PG-TRN-${id.replace(/\D/g, "") || "55812"}`,
        locale,
      });
    }
    if (cat.includes("concert") || cat.includes("âm nhạc") || id.startsWith("concert-")) {
      return getPaymentUrl({
        type: "concert",
        orderId: `PG-CON-${id.replace(/\D/g, "") || "33910"}`,
        locale,
      });
    }
    return `/events/${event.id}`;
  };

  const targetUrl = getEventTargetUrl();
  const isDirectCheckout = targetUrl.startsWith("http://") || targetUrl.startsWith("https://") || targetUrl.includes("/payment");

  return (
    <Card className={`group relative overflow-hidden rounded-2xl bg-card text-card-foreground border border-border/60 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between p-0 ${className}`}>
      <div>
        {/* Banner Cover Image (12:5 ratio) */}
        <div
          className="relative w-full aspect-[12/5] overflow-hidden bg-muted"
          style={{ aspectRatio: "12 / 5" }}
        >
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            suppressHydrationWarning
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />

          {/* Top Row Badges & Heart Overlay */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
            <div>
              {event.badge && (
                <span
                  className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-extrabold shadow-xs ${
                    event.badge.type === "hot"
                      ? "bg-red-500 text-white"
                      : "bg-amber-500 text-slate-950"
                  }`}
                >
                  {event.badge.type === "hot" ? (
                    <Flame className="h-3.5 w-3.5 fill-white text-white" />
                  ) : (
                    <ThumbsUp className="h-3.5 w-3.5 fill-slate-950 text-slate-950" />
                  )}
                  <span>{event.badge.text}</span>
                </span>
              )}
            </div>

            {/* Favorite Heart Button floating top-right on image */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsFavorite((prev) => !prev);
              }}
              aria-label={isFavorite ? "Bỏ lưu" : "Lưu sự kiện"}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-xs text-white transition-all active:scale-90 cursor-pointer ml-auto"
            >
              <Heart
                className={`h-4.5 w-4.5 transition-colors ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-white"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Card Body Details */}
        <div className="p-3 sm:p-3.5 space-y-1.5 sm:space-y-2">
          {/* Distance Text / Tag Badge */}
          {formattedDistance ? (
            <div>
              <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold ${sportTheme.tagBg}`}>
                {formattedDistance}
              </span>
            </div>
          ) : event.category && (
            <div>
              <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold ${sportTheme.tagBg}`}>
                {event.category}
              </span>
            </div>
          )}

          {/* Title Row */}
          {isDirectCheckout ? (
            <a href={targetUrl} className="block min-h-[2.25rem] sm:min-h-[2.75rem]">
              <h3 className="font-bold text-xs sm:text-base text-foreground line-clamp-2 group-hover:text-[#002BCC] dark:group-hover:text-blue-400 transition-colors leading-snug">
                {event.title}
              </h3>
            </a>
          ) : (
            <Link href={targetUrl} className="block min-h-[2.25rem] sm:min-h-[2.75rem]">
              <h3 className="font-bold text-xs sm:text-base text-foreground line-clamp-2 group-hover:text-[#002BCC] dark:group-hover:text-blue-400 transition-colors leading-snug">
                {event.title}
              </h3>
            </Link>
          )}

          {/* Date Row */}
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-muted-foreground font-medium">
            <Calendar className="h-3.5 w-3.5 shrink-0 text-muted-foreground/80" />
            <span className="truncate">{event.date}</span>
          </div>

          {/* Location Row */}
          <div className="flex items-start gap-1.5 text-[11px] sm:text-xs text-muted-foreground font-medium">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-muted-foreground/80 mt-0.5" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>
      </div>

      {/* Card Footer: Price & Action Button */}
      <div className="p-3 sm:p-3.5 pt-1 sm:pt-1 flex items-end justify-between gap-2">
        {/* Left Side: Price */}
        <div className="min-w-0">
          <span className="text-[10px] sm:text-[11px] text-muted-foreground font-medium block leading-none mb-0.5">
            {event.priceSubtext || "Chỉ từ"}
          </span>
          <span className="font-extrabold text-sm sm:text-lg text-foreground tracking-tight truncate block">
            {event.price}
          </span>
        </div>

        {/* Right Side: Blue Action Button */}
        {isDirectCheckout ? (
          <a href={targetUrl} className="shrink-0">
            <Button
              className="h-8 sm:h-9 rounded-xl bg-[#002BCC] hover:bg-[#0022a3] active:bg-[#001a80] text-white font-bold text-[11px] sm:text-xs px-3 sm:px-5 transition-all cursor-pointer shadow-xs border-none"
            >
              {event.buttonText || (targetUrl.includes("tournament") ? "Đăng ký" : "Mua vé")}
            </Button>
          </a>
        ) : (
          <Link href={targetUrl} className="shrink-0">
            <Button
              className="h-8 sm:h-9 rounded-xl bg-[#002BCC] hover:bg-[#0022a3] active:bg-[#001a80] text-white font-bold text-[11px] sm:text-xs px-3 sm:px-5 transition-all cursor-pointer shadow-xs border-none"
            >
              {event.buttonText || "Đăng ký"}
            </Button>
          </Link>
        )}
      </div>
    </Card>
  );
}
