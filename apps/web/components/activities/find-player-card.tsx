"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart, Calendar, MapPin, UserPlus } from "lucide-react";
import { Card } from "@workspace/ui/components/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { getSportColor } from "@/lib/sports-colors";

export interface ParticipantAvatar {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface ActivityData {
  id: string;
  title: string;
  sport?: string; // e.g. "Cầu lông", "Pickleball", "Bóng đá", "Tennis"
  date?: string;
  time: string;
  location: string;
  level: string;
  price?: string;
  joinedCount: number;
  maxCount: number;
  slotsRemaining?: number;
  participants: ParticipantAvatar[];
  statusBadge?: string;
  statusType?: "available" | "starting_soon" | string;
  imageUrl?: string;
  isFavorite?: boolean;
}

export interface FindPlayerCardProps {
  activity: ActivityData;
  className?: string;
}

export function FindPlayerCard({ activity, className = "" }: FindPlayerCardProps) {
  const t = useTranslations("find_player_card");
  const [isFavorite, setIsFavorite] = useState(activity.isFavorite || false);
  const sportTheme = getSportColor(activity.sport || "Cầu lông");

  const getDateDisplay = () => {
    if (activity.date === "Hôm nay") return t("date_today");
    if (activity.date === "Ngày mai") return t("date_tomorrow");
    return activity.date;
  };

  // Visible avatars and extra count calculation
  const visibleParticipants = activity.participants.slice(0, 3);
  const extraParticipantsCount = Math.max(0, activity.joinedCount - visibleParticipants.length);

  return (
    <Card className={`group relative overflow-hidden rounded-2xl bg-card text-card-foreground border border-border/60 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between p-0 ${className}`}>
      <div>
        {/* Top Header Cover Image - Aspect Ratio 12/5 */}
        <div
          className="relative w-full aspect-[12/5] overflow-hidden bg-gradient-to-br from-orange-900 via-slate-800 to-slate-900"
          style={{ aspectRatio: "12 / 5" }}
        >
          <Image
            src={
              activity.imageUrl ||
              "/images/activities/badminton-banner.png"
            }
            alt={activity.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

          {/* Top Row Badges: Sport Tag (Left) & Favorite Heart (Right) */}
          <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-10">
            <span
              className={`inline-flex items-center rounded-lg px-2.5 py-0.5 text-[11px] font-extrabold shadow-xs ${sportTheme.solidBg}`}
            >
              {activity.sport || "Cầu lông"}
            </span>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsFavorite((prev) => !prev);
              }}
              aria-label={isFavorite ? "Bỏ lưu" : "Lưu trận"}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-xs text-white transition-all active:scale-90 cursor-pointer"
            >
              <Heart
                className={`h-4 w-4 transition-colors ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-white"
                }`}
              />
            </button>
          </div>

          {/* Bottom Left Image Overlay Tag: Level */}
          <div className="absolute bottom-1.5 left-2 z-10">
            <span className="inline-flex items-center rounded-md bg-black/50 backdrop-blur-md px-2 py-0.5 text-[10px] font-semibold text-white/90 border border-white/10">
              {activity.level}
            </span>
          </div>

          {/* Bottom Right Image Overlay Tag: Price */}
          {activity.price && (
            <div className="absolute bottom-1.5 right-2 z-10">
              <span className="inline-flex items-center rounded-md bg-orange-700 backdrop-blur-md px-2 py-0.5 text-[10px] font-extrabold text-white shadow-xs">
                {activity.price}
              </span>
            </div>
          )}
        </div>

        {/* Card Content Body - Tight Spacing */}
        <div className="p-3 space-y-1.5">
          {/* Title */}
          <Link href={`/activities/${activity.id}`} className="block">
            <h3 className="font-bold text-xs sm:text-sm md:text-base text-foreground line-clamp-1 group-hover:text-primary transition-colors">
              {activity.title}
            </h3>
          </Link>

          {/* Date & Time */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <Calendar className="h-3.5 w-3.5 shrink-0 text-muted-foreground/80" />
            <span>
              {activity.date ? `${getDateDisplay()} • ` : ""}
              {activity.time}
            </span>
          </div>

          {/* Location Info */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-muted-foreground/80" />
            <span className="truncate">{activity.location}</span>
          </div>

          {/* Participants Row & Capacity */}
          <div className="flex items-center justify-between pt-0.5">
            {/* Overlapping Avatars + Extra Count Badge */}
            <div className="flex items-center -space-x-2 overflow-hidden">
              {visibleParticipants.map((user) => (
                <div
                  key={user.id}
                  className="relative inline-block h-6 w-6 sm:h-6.5 sm:w-6.5 rounded-full border-2 border-background overflow-hidden bg-muted shadow-2xs shrink-0"
                >
                  <Image
                    src={user.avatarUrl}
                    alt={user.name}
                    fill
                    sizes="26px"
                    className="object-cover"
                  />
                </div>
              ))}
              {extraParticipantsCount > 0 && (
                <div className="relative inline-flex h-6 w-6 sm:h-6.5 sm:w-6.5 items-center justify-center rounded-full border-2 border-background bg-slate-200 dark:bg-slate-700 text-[10px] sm:text-[11px] font-bold text-slate-700 dark:text-slate-200 shadow-2xs shrink-0">
                  +{extraParticipantsCount}
                </div>
              )}
            </div>

            {/* Capacity Orange Text (High-contrast WCAG AA) */}
            <span className="text-xs sm:text-sm font-bold text-orange-700 dark:text-orange-400">
              {t("players_count", { joined: activity.joinedCount, max: activity.maxCount })}
            </span>
          </div>
        </div>
      </div>

      {/* Card Action Buttons: 2 Buttons (Xem chi tiết & Tham gia) */}
      <div className="p-2.5 pt-0 grid grid-cols-2 gap-1.5">
        <Link href={`/activities/${activity.id}`} className="block w-full">
          <Button
            variant="outline"
            size="card"
            className="w-full px-2 font-semibold"
          >
            {t("view_details")}
          </Button>
        </Link>

        <Link href={`/activities/${activity.id}`} className="block w-full">
          <Button
            variant="solid"
            size="card"
            className="w-full flex items-center justify-center gap-1.5 px-2"
          >
            <UserPlus className="h-3.5 w-3.5 stroke-[2.5] shrink-0" />
            <span>{t("join_btn")}</span>
          </Button>
        </Link>
      </div>
    </Card>
  );
}


