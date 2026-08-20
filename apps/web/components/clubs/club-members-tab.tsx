"use client";

import React from "react";
import Image from "next/image";
import { Users, Trophy, Medal, Flame, Shield, ArrowUpRight, Crown, Award } from "lucide-react";
import { ClubDetailData, ClubRankMember } from "@/lib/clubs-data";

export interface ClubMembersTabProps {
  club: ClubDetailData;
}

export function ClubMembersTab({ club }: ClubMembersTabProps) {
  const leaderboard = club.leaderboard || [];

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border/80 rounded-2xl p-4 sm:p-6 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500 shrink-0" />
              <span>Bảng Xếp Hạng Nội Bộ CLB</span>
            </h2>
            <p className="text-xs text-muted-foreground font-normal mt-0.5">
              Thành tích và điểm Elo được cập nhật sau mỗi buổi sinh hoạt và giải nội bộ.
            </p>
          </div>
        </div>

        {/* Top 3 Podium Cards */}
        {leaderboard.length >= 3 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {/* Top 2 Silver */}
            <div className="order-2 sm:order-1 p-4 rounded-2xl bg-gradient-to-b from-slate-200/30 to-card dark:from-slate-800/30 border border-slate-300 dark:border-slate-700/60 flex flex-col items-center text-center space-y-2 relative shadow-2xs">
              <div className="w-6 h-6 rounded-full bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center absolute top-3 left-3 shadow-xs">
                #2
              </div>
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-slate-300 shadow-xs">
                <Image
                  src={leaderboard[1]!.avatarUrl}
                  alt={leaderboard[1]!.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs sm:text-sm font-bold text-foreground">
                  {leaderboard[1]!.name}
                </h4>
                <p className="text-[11px] text-muted-foreground font-medium">
                  {leaderboard[1]!.level}
                </p>
              </div>
              <div className="text-sm font-bold text-primary pt-1">
                {leaderboard[1]!.eloPoints} Elo
              </div>
              <div className="text-[11px] text-muted-foreground">
                Thắng: <strong className="text-emerald-600 font-bold">{leaderboard[1]!.winRate}%</strong> ({leaderboard[1]!.matchesPlayed} trận)
              </div>
            </div>

            {/* Top 1 Gold Champion */}
            <div className="order-1 sm:order-2 p-5 rounded-2xl bg-gradient-to-b from-amber-200/30 via-amber-100/10 to-card dark:from-amber-950/30 dark:via-amber-900/10 border border-amber-400/80 dark:border-amber-500/60 flex flex-col items-center text-center space-y-2.5 relative shadow-xs scale-100 sm:scale-105 z-10">
              <div className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1 absolute -top-3 left-1/2 -translate-x-1/2 shadow-xs">
                <Crown className="w-3 h-3 fill-slate-950" />
                <span>#1</span>
              </div>
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-amber-400 shadow-xs mt-1">
                <Image
                  src={leaderboard[0]!.avatarUrl}
                  alt={leaderboard[0]!.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm sm:text-base font-bold text-foreground">
                  {leaderboard[0]!.name}
                </h4>
                <p className="text-xs text-amber-600 dark:text-amber-400 font-bold">
                  {leaderboard[0]!.level}
                </p>
              </div>
              <div className="text-base font-bold text-amber-600 dark:text-amber-400">
                {leaderboard[0]!.eloPoints} Elo
              </div>
              <div className="text-xs text-muted-foreground">
                Tỷ lệ thắng: <strong className="text-emerald-600 font-bold">{leaderboard[0]!.winRate}%</strong> ({leaderboard[0]!.matchesPlayed} trận)
              </div>
            </div>

            {/* Top 3 Bronze */}
            <div className="order-3 p-4 rounded-2xl bg-gradient-to-b from-orange-200/30 to-card dark:from-orange-950/20 border border-orange-300 dark:border-orange-800/60 flex flex-col items-center text-center space-y-2 relative">
              <div className="w-6 h-6 rounded-full bg-orange-300 dark:bg-orange-800 text-orange-900 dark:text-orange-200 font-bold text-xs flex items-center justify-center absolute top-3 left-3 shadow-xs">
                #3
              </div>
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-orange-300 shadow-md">
                <Image
                  src={leaderboard[2]!.avatarUrl}
                  alt={leaderboard[2]!.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs sm:text-sm font-bold text-foreground">
                  {leaderboard[2]!.name}
                </h4>
                <p className="text-[11px] text-muted-foreground font-medium">
                  {leaderboard[2]!.level}
                </p>
              </div>
              <div className="text-sm font-bold text-primary pt-1">
                {leaderboard[2]!.eloPoints} Elo
              </div>
              <div className="text-[11px] text-muted-foreground">
                Thắng: <strong className="text-emerald-600 font-bold">{leaderboard[2]!.winRate}%</strong> ({leaderboard[2]!.matchesPlayed} trận)
              </div>
            </div>
          </div>
        )}

        {/* Full Leaderboard Table */}
        <div className="pt-2">
          <div className="rounded-xl border border-border/80 overflow-hidden">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-muted/60 text-muted-foreground border-b border-border/70 font-semibold">
                <tr>
                  <th className="py-2.5 px-3 w-14 text-center">Hạng</th>
                  <th className="py-2.5 px-3">Vận Động Viên</th>
                  <th className="py-2.5 px-3 hidden sm:table-cell">Trình Độ</th>
                  <th className="py-2.5 px-3 text-right">Điểm Elo</th>
                  <th className="py-2.5 px-3 text-right hidden sm:table-cell">Tỷ Lệ Thắng</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {leaderboard.map((member) => (
                  <tr key={member.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-2.5 px-3 text-center font-bold">
                      {member.rankIndex === 1 ? (
                        <Trophy className="w-4 h-4 text-amber-500 mx-auto" />
                      ) : member.rankIndex === 2 ? (
                        <Award className="w-4 h-4 text-slate-400 mx-auto" />
                      ) : member.rankIndex === 3 ? (
                        <Medal className="w-4 h-4 text-amber-700 mx-auto" />
                      ) : (
                        <span className="text-xs text-muted-foreground">#{member.rankIndex}</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-border">
                          <Image
                            src={member.avatarUrl}
                            alt={member.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="font-bold text-foreground truncate">
                          {member.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-muted-foreground hidden sm:table-cell">
                      {member.level}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-primary">
                      {member.eloPoints}
                    </td>
                    <td className="py-2.5 px-3 text-right text-emerald-600 dark:text-emerald-400 font-semibold hidden sm:table-cell">
                      {member.winRate}% ({member.matchesPlayed} trận)
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
