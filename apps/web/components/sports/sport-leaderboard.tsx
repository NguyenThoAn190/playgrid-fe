"use client";

import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { BarChart3, Trophy, ArrowRight } from "lucide-react";

export interface SportLeaderboardProps {
  sportName?: string;
}

const BADMINTON_TOP_PLAYERS = [
  {
    rank: 1,
    name: "Nguyễn Tiến Minh",
    location: "Hà Nội",
    points: 2860,
    winRate: "87%",
    tournamentsJoined: 24,
    avatarUrl: "/images/rankings/tien-minh.png",
  },
  {
    rank: 2,
    name: "Lê Đức Phát",
    location: "TP. Hồ Chí Minh",
    points: 2640,
    winRate: "83%",
    tournamentsJoined: 19,
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  {
    rank: 3,
    name: "Nguyen Thuy Linh",
    location: "Đồng Nai",
    points: 2510,
    winRate: "81%",
    tournamentsJoined: 18,
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  {
    rank: 4,
    name: "Phạm Hồng Nam",
    location: "Hà Nội",
    points: 2380,
    winRate: "79%",
    tournamentsJoined: 16,
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  },
  {
    rank: 5,
    name: "Vũ Thị Trang",
    location: "Bắc Giang",
    points: 2290,
    winRate: "77%",
    tournamentsJoined: 15,
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
  },
];

const formatPoints = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export function SportLeaderboard({ sportName = "Cầu Lông" }: SportLeaderboardProps) {
  return (
    <section id="leaderboard" className="w-full py-8 sm:py-12 bg-background text-foreground transition-colors scroll-mt-24">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Bảng Xếp Hạng Tay Vợt {sportName}</span>
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground pt-1">
              Top các vận động viên và tay vợt phong trào có điểm số cao nhất trên PlayGrid.
            </p>
          </div>

          <Link
            href="/leaderboard"
            className="group flex items-center gap-1 text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline transition-colors shrink-0"
          >
            <span>Xem BXH đầy đủ</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Players Leaderboard Table */}
        <div className="rounded-2xl border border-border/80 bg-card overflow-hidden shadow-xs divide-y divide-border/50">
          {BADMINTON_TOP_PLAYERS.map((player) => (
            <div
              key={player.rank}
              className="flex items-center justify-between p-3.5 sm:p-4 hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                {/* Rank Badge */}
                <div className="w-8 h-8 shrink-0 flex items-center justify-center font-bold text-sm">
                  {player.rank === 1 ? (
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                      🥇
                    </div>
                  ) : player.rank === 2 ? (
                    <div className="w-8 h-8 rounded-full bg-slate-400/20 text-slate-600 dark:text-slate-300 flex items-center justify-center">
                      🥈
                    </div>
                  ) : player.rank === 3 ? (
                    <div className="w-8 h-8 rounded-full bg-amber-700/20 text-amber-700 dark:text-amber-400 flex items-center justify-center">
                      🥉
                    </div>
                  ) : (
                    <span className="text-muted-foreground font-semibold">#{player.rank}</span>
                  )}
                </div>

                {/* Avatar */}
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-border">
                  <Image src={player.avatarUrl} alt={player.name} fill className="object-cover" sizes="40px" />
                </div>

                {/* Info */}
                <div className="min-w-0">
                  <h4 className="font-bold text-sm sm:text-base text-foreground truncate">{player.name}</h4>
                  <p className="text-xs text-muted-foreground truncate">{player.location} • Thắng {player.winRate}</p>
                </div>
              </div>

              {/* Points */}
              <div className="text-right shrink-0 pl-2" suppressHydrationWarning>
                <div className="font-extrabold text-sm sm:text-base text-blue-600 dark:text-blue-400">
                  {formatPoints(player.points)} pts
                </div>
                <div className="text-[11px] text-muted-foreground">{player.tournamentsJoined} giải đấu</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
