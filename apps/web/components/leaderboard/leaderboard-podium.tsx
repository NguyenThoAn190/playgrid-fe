"use client";

import React from "react";
import Image from "next/image";
import { Trophy, Crown, Medal, Flame, Star, MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import { LeaderboardPlayer } from "@/lib/leaderboard-data";
import { Link } from "@/i18n/navigation";

export interface LeaderboardPodiumProps {
  topPlayers: LeaderboardPlayer[];
  categoryTitle?: string;
}

export function LeaderboardPodium({
  topPlayers,
  categoryTitle = "Toàn Quốc",
}: LeaderboardPodiumProps) {
  if (!topPlayers || topPlayers.length < 3) return null;

  const first = topPlayers[0]!;
  const second = topPlayers[1]!;
  const third = topPlayers[2]!;

  return (
    <div className="bg-card border border-border/80 rounded-2xl p-4 sm:p-6 shadow-2xs space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500 shrink-0" />
          <span>Bục Vinh Danh Top 3 Cao Thủ ({categoryTitle})</span>
        </h2>
        <span className="text-xs text-muted-foreground font-semibold">
          Cập nhật hôm nay
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 items-end pt-3">
        {/* RANK #2: SILVER */}
        <div className="order-2 sm:order-1 p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-slate-200/40 via-slate-100/20 to-card dark:from-slate-800/40 dark:via-slate-800/20 border border-slate-300 dark:border-slate-700/80 flex flex-col items-center text-center space-y-2.5 relative shadow-xs">
          <div className="w-7 h-7 rounded-full bg-slate-300 dark:bg-slate-700 text-slate-900 dark:text-slate-100 font-bold text-xs flex items-center justify-center absolute top-3 left-3 shadow-xs">
            #2
          </div>

          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 border-slate-300 dark:border-slate-600 shadow-md">
            <Image
              src={second.avatarUrl}
              alt={second.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-0.5 min-w-0 w-full">
            <div className="flex items-center justify-center gap-1">
              <h3 className="text-xs sm:text-sm font-bold text-foreground truncate">
                {second.name}
              </h3>
              {second.isVerified && (
                <CheckCircle2 className="w-3.5 h-3.5 fill-emerald-500 text-white shrink-0" />
              )}
            </div>
            <p className="text-[11px] text-muted-foreground truncate font-medium">
              {second.clubName}
            </p>
          </div>

          <div className="w-full pt-1.5 border-t border-border/50 space-y-1">
            <div className="text-base sm:text-lg font-bold text-primary" suppressHydrationWarning>
              {second.eloPoints.toLocaleString("vi-VN")} Elo
            </div>
            <div className="text-xs text-muted-foreground flex items-center justify-center gap-2">
              <span>Thắng: <strong className="text-emerald-600 dark:text-emerald-400">{second.winRate}%</strong></span>
              <span>•</span>
              <span>{second.matchesPlayed} trận</span>
            </div>
          </div>
        </div>

        {/* RANK #1: GOLD CHAMPION */}
        <div className="order-1 sm:order-2 p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-amber-300/30 via-amber-100/15 to-card dark:from-amber-950/40 dark:via-amber-900/10 border border-amber-400/80 dark:border-amber-500/60 flex flex-col items-center text-center space-y-3 relative shadow-xs scale-100 sm:scale-105 z-10">
          <div className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1 absolute -top-3.5 left-1/2 -translate-x-1/2 shadow-xs">
            <Crown className="w-3.5 h-3.5 fill-slate-950" />
            <span>Quán Quân #1</span>
          </div>

          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-amber-400 shadow-sm mt-1">
            <Image
              src={first.avatarUrl}
              alt={first.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="space-y-0.5 min-w-0 w-full">
            <div className="flex items-center justify-center gap-1.5">
              <h3 className="text-sm sm:text-base font-bold text-foreground truncate">
                {first.name}
              </h3>
              {first.isVerified && (
                <CheckCircle2 className="w-4 h-4 fill-emerald-500 text-white shrink-0" />
              )}
            </div>
            <p className="text-xs text-amber-600 dark:text-amber-400 font-bold truncate">
              {first.clubName}
            </p>
            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground font-medium pt-0.5">
              <MapPin className="w-3 h-3 text-muted-foreground" />
              <span>{first.city}</span>
            </div>
          </div>

          <div className="w-full pt-2 border-t border-amber-300/60 dark:border-amber-800/60 space-y-1.5">
            <div className="text-lg sm:text-2xl font-bold text-amber-600 dark:text-amber-400" suppressHydrationWarning>
              {first.eloPoints.toLocaleString("vi-VN")} Elo
            </div>
            <div className="text-xs text-muted-foreground flex items-center justify-center gap-2">
              <span>Tỷ lệ thắng: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{first.winRate}%</strong></span>
              <span>•</span>
              <span>Chuỗi <strong className="text-orange-500">{first.currentStreak}</strong></span>
            </div>
          </div>
        </div>

        {/* RANK #3: BRONZE */}
        <div className="order-3 p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-orange-200/40 via-orange-100/20 to-card dark:from-orange-950/40 dark:via-orange-900/20 border border-orange-300 dark:border-orange-800/80 flex flex-col items-center text-center space-y-2.5 relative shadow-xs">
          <div className="w-7 h-7 rounded-full bg-orange-300 dark:bg-orange-800 text-orange-950 dark:text-orange-100 font-bold text-xs flex items-center justify-center absolute top-3 left-3 shadow-xs">
            #3
          </div>

          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 border-orange-300 dark:border-orange-700 shadow-md">
            <Image
              src={third.avatarUrl}
              alt={third.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-0.5 min-w-0 w-full">
            <div className="flex items-center justify-center gap-1">
              <h3 className="text-xs sm:text-sm font-bold text-foreground truncate">
                {third.name}
              </h3>
              {third.isVerified && (
                <CheckCircle2 className="w-3.5 h-3.5 fill-emerald-500 text-white shrink-0" />
              )}
            </div>
            <p className="text-[11px] text-muted-foreground truncate font-medium">
              {third.clubName}
            </p>
          </div>

          <div className="w-full pt-1.5 border-t border-border/50 space-y-1">
            <div className="text-base sm:text-lg font-bold text-primary" suppressHydrationWarning>
              {third.eloPoints.toLocaleString("vi-VN")} Elo
            </div>
            <div className="text-xs text-muted-foreground flex items-center justify-center gap-2">
              <span>Thắng: <strong className="text-emerald-600 dark:text-emerald-400">{third.winRate}%</strong></span>
              <span>•</span>
              <span>{third.matchesPlayed} trận</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
