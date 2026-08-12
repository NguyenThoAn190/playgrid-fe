"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2, Star, Crown } from "lucide-react";
import { Card } from "@workspace/ui/components/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getSportColor } from "@/lib/sports-colors";

export interface ClubData {
  id: string;
  name: string;
  logoUrl?: string;
  logoText?: string;
  coverUrl: string;
  isVerified?: boolean;
  isVip?: boolean;
  rating: number;
  reviewCount: number;
  memberCount: number;
  location: string;
  sport: string; // e.g. "Cầu lông", "Pickleball", "Bóng đá"
  statusText?: string;
}

export interface ClubCardProps {
  club: ClubData;
  className?: string;
}

export function ClubCard({ club, className = "" }: ClubCardProps) {
  const sportTheme = getSportColor(club.sport);

  return (
    <Card className={`group relative overflow-hidden rounded-2xl bg-card text-card-foreground border border-border/60 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between p-0 ${className}`}>
      <div>
        {/* Top Cover Banner Image (12:5 ratio) */}
        <div
          className="relative w-full aspect-[12/5] overflow-hidden bg-slate-800 shrink-0"
          style={{ aspectRatio: "12 / 5" }}
        >
          <Image
            src={club.coverUrl}
            alt={club.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />

          {/* Top Right Crown Badge */}
          {club.isVip !== false && (
            <div className="absolute top-2.5 right-2.5 z-10 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#FFB800] text-slate-950 shadow-md">
              <Crown className="h-4 w-4 fill-slate-950 text-slate-950" />
            </div>
          )}
        </div>

        {/* Circular Logo Avatar Overlapping Banner */}
        <div className="-mt-7 sm:-mt-8 ml-3.5 sm:ml-4 relative z-10 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full border-4 border-card bg-slate-950 overflow-hidden shadow-md shrink-0">
          {club.logoUrl ? (
            <Image
              src={club.logoUrl}
              alt={club.name}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-slate-950 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center text-center p-1 leading-tight">
              {club.logoText || club.name.slice(0, 4)}
            </div>
          )}
        </div>

        {/* Club Content Body */}
        <div className="p-3 sm:p-3.5 pt-1.5 space-y-1.5 flex flex-col justify-between flex-1">
          <div className="space-y-1">
            {/* Title & Verified Checkmark */}
            <Link href={`/clubs/${club.id}`} className="block">
              <div className="flex items-center gap-1.5 min-w-0">
                <h3 className="font-bold text-sm sm:text-base text-foreground line-clamp-1 group-hover:text-[#00A859] dark:group-hover:text-emerald-400 transition-colors">
                  {club.name}
                </h3>
                {club.isVerified !== false && (
                  <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 fill-[#00A859] text-card" />
                )}
              </div>
            </Link>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
              <Star className="h-3.5 w-3.5 fill-[#FFB800] text-[#FFB800]" />
              <span className="font-bold text-foreground">{club.rating.toFixed(1)}</span>
              <span>({club.reviewCount} đánh giá)</span>
            </div>

            {/* Member Count & Location */}
            <div className="text-xs sm:text-sm text-muted-foreground font-medium truncate" suppressHydrationWarning>
              <span>{club.memberCount.toLocaleString("vi-VN")} thành viên</span>
              <span className="mx-1.5">•</span>
              <span>{club.location}</span>
            </div>
          </div>

          {/* Action Row: Sport Tag & View Button */}
          <div className="flex items-center justify-between gap-2 pt-2">
            {/* Sport Tag */}
            <div className={`inline-flex items-center rounded-lg border px-2.5 py-0.5 text-xs font-semibold truncate ${sportTheme.tagBg}`}>
              <span className="truncate">{club.sport}</span>
            </div>

            {/* Action Button */}
            <Link href={`/clubs/${club.id}`} className="shrink-0">
              <Button
                variant="outline"
                className="h-7.5 sm:h-8 rounded-xl border-emerald-600/30 dark:border-emerald-500/30 text-[#00A859] hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-[#008f4c] font-bold text-xs px-3 sm:px-3.5 cursor-pointer transition-all shadow-2xs"
              >
                Xem CLB
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}
