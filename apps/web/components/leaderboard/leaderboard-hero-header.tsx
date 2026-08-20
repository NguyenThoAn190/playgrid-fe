"use client";

import React from "react";
import { BarChart3, Trophy, Flame, Shield, Users, Sparkles } from "lucide-react";

export interface LeaderboardHeroHeaderProps {
  sportName?: string;
  totalPlayers?: number;
  totalMatches?: number;
  currentSeason?: string;
}

export function LeaderboardHeroHeader({
  sportName = "Cầu Lông",
  totalPlayers = 12450,
  totalMatches = 38900,
  currentSeason = "Mùa Giải Mùa Thu 2026",
}: LeaderboardHeroHeaderProps) {
  return (
    <div className="bg-card border border-border/80 rounded-2xl p-4 sm:p-6 shadow-2xs space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Title and Intro */}
        <div className="space-y-1.5 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold shadow-xs">
              <Trophy className="w-3.5 h-3.5" />
              <span>Hệ Thống Xếp Hạng PlayGrid Elo</span>
            </div>
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
              <Flame className="w-3 h-3 text-orange-500" />
              <span>{currentSeason}</span>
            </div>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Bảng Xếp Hạng {sportName} Việt Nam
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-normal max-w-3xl">
            Theo dõi thứ hạng, điểm Elo và phong độ thi đấu của các tay vợt phong trào, bán chuyên và các câu lạc bộ trên toàn quốc.
          </p>
        </div>

        {/* Highlight Stats Badges */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="p-3 rounded-xl bg-muted/40 border border-border/60 text-left">
            <div className="text-xs text-muted-foreground font-medium">Tổng VĐV Xếp Hạng</div>
            <div className="text-base sm:text-lg font-bold text-primary" suppressHydrationWarning>
              {totalPlayers.toLocaleString("vi-VN")}+
            </div>
          </div>
          <div className="p-3 rounded-xl bg-muted/40 border border-border/60 text-left">
            <div className="text-xs text-muted-foreground font-medium">Trận Đấu Đã Tính Elo</div>
            <div className="text-base sm:text-lg font-bold text-emerald-600 dark:text-emerald-400" suppressHydrationWarning>
              {totalMatches.toLocaleString("vi-VN")}+
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
