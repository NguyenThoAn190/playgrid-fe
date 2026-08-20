"use client";

import React from "react";
import Image from "next/image";
import {
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Minus,
  MapPin,
  Trophy,
  Award,
  ChevronRight,
  Flame,
} from "lucide-react";
import { LeaderboardPlayer } from "@/lib/leaderboard-data";
import { Link } from "@/i18n/navigation";

export interface LeaderboardTableProps {
  players: LeaderboardPlayer[];
}

export function LeaderboardTable({ players }: LeaderboardTableProps) {
  if (!players || players.length === 0) {
    return (
      <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-border/80 bg-card/60 space-y-3">
        <Trophy className="w-10 h-10 text-muted-foreground mx-auto" />
        <h3 className="text-base sm:text-lg font-bold text-foreground">
          Không tìm thấy vận động viên nào
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground font-normal max-w-md mx-auto">
          Thử điều chỉnh lại bộ lọc hạng mục, trình độ hoặc tỉnh thành để xem thêm các tay vợt khác.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border/80 rounded-2xl shadow-2xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-muted/50 text-muted-foreground border-b border-border/60 font-semibold text-xs">
            <tr>
              <th className="py-3 px-3.5 w-16 text-center">Hạng</th>
              <th className="py-3 px-3.5">Vận Động Viên / Đội</th>
              <th className="py-3 px-3.5 hidden md:table-cell">Khu Vực</th>
              <th className="py-3 px-3.5 hidden lg:table-cell">Trình Độ</th>
              <th className="py-3 px-3.5 text-right">Điểm Elo</th>
              <th className="py-3 px-3.5 text-right hidden sm:table-cell">Tỷ Lệ Thắng</th>
              <th className="py-3 px-3.5 text-center hidden xl:table-cell">Phong Độ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {players.map((player) => (
              <tr
                key={player.id}
                className="hover:bg-muted/30 transition-colors group cursor-pointer"
              >
                {/* 1. Rank + Trend */}
                <td className="py-3 px-3.5 text-center font-bold whitespace-nowrap">
                  <div className="flex items-center justify-center gap-1.5">
                    {player.rank === 1 ? (
                      <span className="w-7 h-7 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-xs">
                        1
                      </span>
                    ) : player.rank === 2 ? (
                      <span className="w-7 h-7 rounded-full bg-slate-300 dark:bg-slate-700 text-slate-900 dark:text-slate-100 flex items-center justify-center font-bold">
                        2
                      </span>
                    ) : player.rank === 3 ? (
                      <span className="w-7 h-7 rounded-full bg-orange-400/30 text-orange-700 dark:text-orange-300 flex items-center justify-center font-bold">
                        3
                      </span>
                    ) : (
                      <span className="text-muted-foreground w-7 text-center">
                        #{player.rank}
                      </span>
                    )}

                    {/* Trend Icon */}
                    {player.trend === "up" ? (
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center">
                        <TrendingUp className="w-3 h-3 mr-0.5" />
                        {player.rankChange || 1}
                      </span>
                    ) : player.trend === "down" ? (
                      <span className="text-[10px] text-red-500 font-bold flex items-center">
                        <TrendingDown className="w-3 h-3 mr-0.5" />
                        {player.rankChange || 1}
                      </span>
                    ) : (
                      <span className="text-muted-foreground/50">
                        <Minus className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>
                </td>

                {/* 2. Avatar & Name & Club */}
                <td className="py-3 px-3.5">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden shrink-0 border border-border bg-muted shadow-xs">
                      <Image
                        src={player.avatarUrl}
                        alt={player.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 space-y-0.5">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="font-bold text-foreground truncate group-hover:text-primary transition-colors text-xs sm:text-sm">
                          {player.name}
                        </span>
                        {player.isVerified && (
                          <CheckCircle2 className="w-3.5 h-3.5 fill-emerald-500 text-white shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate font-medium">
                        {player.clubName}
                      </p>
                    </div>
                  </div>
                </td>

                {/* 3. Location */}
                <td className="py-3 px-3.5 text-muted-foreground hidden md:table-cell whitespace-nowrap">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-muted-foreground/80 shrink-0" />
                    <span>{player.city}</span>
                  </span>
                </td>

                {/* 4. Level Tier Badge */}
                <td className="py-3 px-3.5 hidden lg:table-cell whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-muted text-foreground border border-border/60">
                    {player.level}
                  </span>
                </td>

                {/* 5. Elo Points */}
                <td className="py-3 px-3.5 text-right font-bold text-xs sm:text-base text-primary whitespace-nowrap" suppressHydrationWarning>
                  {player.eloPoints.toLocaleString("vi-VN")}
                </td>

                {/* 6. Win Rate & Matches */}
                <td className="py-3 px-3.5 text-right hidden sm:table-cell whitespace-nowrap">
                  <div className="space-y-0.5">
                    <div className="font-bold text-emerald-600 dark:text-emerald-400">
                      {player.winRate}%
                    </div>
                    <div className="text-[11px] text-muted-foreground font-normal">
                      {player.matchesWon}/{player.matchesPlayed} trận
                    </div>
                  </div>
                </td>

                {/* 7. Recent Form (W/L) */}
                <td className="py-3 px-3.5 text-center hidden xl:table-cell whitespace-nowrap">
                  <div className="flex items-center justify-center gap-1">
                    {player.recentForm.map((res, i) => (
                      <span
                        key={i}
                        className={`w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center ${
                          res === "W"
                            ? "bg-emerald-500 text-white"
                            : "bg-rose-500 text-white"
                        }`}
                      >
                        {res}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
