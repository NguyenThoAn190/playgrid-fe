"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { BarChart3, MapPin, ArrowRight } from "lucide-react";

export interface SportLeaderboardProps {
  sportName?: string;
}

interface PlayerRank {
  rank: number;
  name: string;
  location: string;
  points: number;
  winRate: string;
  tournamentsJoined: number;
  avatarUrl: string;
  heroImageUrl?: string;
}

const CATEGORIES = [
  { key: "all", label: "Tất cả" },
  { key: "singles", label: "Đơn" },
  { key: "doubles", label: "Đôi" },
  { key: "teams", label: "Đội / CLB" },
];

const LEADERBOARD_BY_CATEGORY: Record<string, PlayerRank[]> = {
  all: [
    {
      rank: 1,
      name: "Nguyễn Tiến Minh",
      location: "Hà Nội",
      points: 2860,
      winRate: "87%",
      tournamentsJoined: 24,
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      heroImageUrl: "/images/rankings/tien-minh.png",
    },
    {
      rank: 2,
      name: "Nguyễn Thùy Linh",
      location: "Phú Thọ",
      points: 2750,
      winRate: "84%",
      tournamentsJoined: 21,
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    },
    {
      rank: 3,
      name: "Lê Đức Phát",
      location: "Hà Nội",
      points: 2680,
      winRate: "83%",
      tournamentsJoined: 19,
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
    {
      rank: 4,
      name: "Phạm Cao Cường",
      location: "TP. Hồ Chí Minh",
      points: 2580,
      winRate: "79%",
      tournamentsJoined: 16,
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    },
    {
      rank: 5,
      name: "Vũ Thị Trang",
      location: "Bắc Giang",
      points: 2450,
      winRate: "77%",
      tournamentsJoined: 15,
      avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    },
  ],
  singles: [
    {
      rank: 1,
      name: "Nguyễn Tiến Minh",
      location: "Hà Nội",
      points: 2860,
      winRate: "87%",
      tournamentsJoined: 24,
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      heroImageUrl: "/images/rankings/tien-minh.png",
    },
    {
      rank: 2,
      name: "Lê Đức Phát",
      location: "Hà Nội",
      points: 2680,
      winRate: "83%",
      tournamentsJoined: 19,
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
    {
      rank: 3,
      name: "Nguyễn Thùy Linh",
      location: "Phú Thọ",
      points: 2650,
      winRate: "82%",
      tournamentsJoined: 20,
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    },
    {
      rank: 4,
      name: "Phạm Cao Cường",
      location: "TP. Hồ Chí Minh",
      points: 2580,
      winRate: "79%",
      tournamentsJoined: 16,
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    },
    {
      rank: 5,
      name: "Nguyễn Hải Đăng",
      location: "TP. Hồ Chí Minh",
      points: 2490,
      winRate: "78%",
      tournamentsJoined: 14,
      avatarUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
    },
  ],
  doubles: [
    {
      rank: 1,
      name: "Bảo & Khoa (Đôi Nam)",
      location: "TP. Hồ Chí Minh",
      points: 2920,
      winRate: "89%",
      tournamentsJoined: 28,
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      heroImageUrl: "/images/activities/badminton-hero.png",
    },
    {
      rank: 2,
      name: "Nam & Trang (Đôi Nam Nữ)",
      location: "Hà Nội",
      points: 2810,
      winRate: "85%",
      tournamentsJoined: 22,
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
    {
      rank: 3,
      name: "Hùng & Tuấn (Đôi Nam)",
      location: "Thủ Đức",
      points: 2710,
      winRate: "81%",
      tournamentsJoined: 18,
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    },
    {
      rank: 4,
      name: "Minh & Linh (Đôi Nam Nữ)",
      location: "Hà Nội",
      points: 2620,
      winRate: "80%",
      tournamentsJoined: 15,
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    },
    {
      rank: 5,
      name: "Phát & Cường (Đôi Nam)",
      location: "TP. Hồ Chí Minh",
      points: 2540,
      winRate: "76%",
      tournamentsJoined: 14,
      avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    },
  ],
  teams: [
    {
      rank: 1,
      name: "CLB Thủ Đức Thumpers",
      location: "Thủ Đức, TP. HCM",
      points: 3450,
      winRate: "92%",
      tournamentsJoined: 34,
      avatarUrl: "/images/explore_sports/gridy-badminton.avif",
      heroImageUrl: "/images/activities/badminton-banner.png",
    },
    {
      rank: 2,
      name: "CLB VNB Smashers",
      location: "Tân Bình, TP. HCM",
      points: 3210,
      winRate: "88%",
      tournamentsJoined: 29,
      avatarUrl: "/images/explore_sports/gridy-badminton.avif",
    },
    {
      rank: 3,
      name: "CLB Phú Thọ Star",
      location: "Quận 11, TP. HCM",
      points: 3080,
      winRate: "86%",
      tournamentsJoined: 26,
      avatarUrl: "/images/activities/badminton-hero.png",
    },
    {
      rank: 4,
      name: "CLB Cầu Lông Hà Nội",
      location: "Hà Nội",
      points: 2950,
      winRate: "83%",
      tournamentsJoined: 23,
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
    {
      rank: 5,
      name: "CLB Cầu Lông Quận 7",
      location: "Quận 7, TP. HCM",
      points: 2820,
      winRate: "80%",
      tournamentsJoined: 20,
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
  ],
};

const PICKLEBALL_LEADERBOARD_BY_CATEGORY: Record<string, PlayerRank[]> = {
  all: [
    {
      rank: 1,
      name: "Trịnh Linh Giang",
      location: "TP. Hồ Chí Minh",
      points: 2940,
      winRate: "91%",
      tournamentsJoined: 31,
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      heroImageUrl: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&auto=format&fit=crop&q=80",
    },
    {
      rank: 2,
      name: "Sophia Huỳnh",
      location: "TP. Hồ Chí Minh",
      points: 2880,
      winRate: "88%",
      tournamentsJoined: 27,
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    },
    {
      rank: 3,
      name: "Huỳnh Chí Khương",
      location: "Đà Nẵng",
      points: 2820,
      winRate: "86%",
      tournamentsJoined: 25,
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    },
    {
      rank: 4,
      name: "Trần Thụy Thanh Trúc",
      location: "Hà Nội",
      points: 2750,
      winRate: "83%",
      tournamentsJoined: 22,
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
    {
      rank: 5,
      name: "Phạm Minh Đạt",
      location: "Bình Dương",
      points: 2680,
      winRate: "80%",
      tournamentsJoined: 19,
      avatarUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
    },
  ],
  singles: [
    {
      rank: 1,
      name: "Trịnh Linh Giang",
      location: "TP. Hồ Chí Minh",
      points: 2940,
      winRate: "91%",
      tournamentsJoined: 31,
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      heroImageUrl: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&auto=format&fit=crop&q=80",
    },
    {
      rank: 2,
      name: "Huỳnh Chí Khương",
      location: "Đà Nẵng",
      points: 2820,
      winRate: "86%",
      tournamentsJoined: 25,
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    },
    {
      rank: 3,
      name: "Sophia Huỳnh",
      location: "TP. Hồ Chí Minh",
      points: 2800,
      winRate: "85%",
      tournamentsJoined: 24,
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    },
    {
      rank: 4,
      name: "Phạm Minh Đạt",
      location: "Bình Dương",
      points: 2680,
      winRate: "80%",
      tournamentsJoined: 19,
      avatarUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
    },
    {
      rank: 5,
      name: "Lê Hoàng Quân",
      location: "Vũng Tàu",
      points: 2590,
      winRate: "78%",
      tournamentsJoined: 16,
      avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    },
  ],
  doubles: [
    {
      rank: 1,
      name: "Giang & Sophia (Đôi Nam Nữ)",
      location: "TP. Hồ Chí Minh",
      points: 3010,
      winRate: "93%",
      tournamentsJoined: 32,
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      heroImageUrl: "/images/activities/pickleball-banner.png",
    },
    {
      rank: 2,
      name: "Khương & Trúc (Đôi Nam Nữ)",
      location: "Đà Nẵng",
      points: 2890,
      winRate: "88%",
      tournamentsJoined: 26,
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    },
    {
      rank: 3,
      name: "Đạt & Quân (Đôi Nam)",
      location: "Bình Dương",
      points: 2780,
      winRate: "83%",
      tournamentsJoined: 21,
      avatarUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
    },
    {
      rank: 4,
      name: "Minh & Tuấn (Đôi Nam)",
      location: "Thủ Đức",
      points: 2690,
      winRate: "81%",
      tournamentsJoined: 18,
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
    {
      rank: 5,
      name: "Trang & Linh (Đôi Nữ)",
      location: "Hà Nội",
      points: 2610,
      winRate: "79%",
      tournamentsJoined: 15,
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    },
  ],
  teams: [
    {
      rank: 1,
      name: "CLB Pickleball Quận 2 Stars",
      location: "Quận 2, TP. HCM",
      points: 3580,
      winRate: "94%",
      tournamentsJoined: 36,
      avatarUrl: "/images/explore_sports/gridy-pickleball.avif",
      heroImageUrl: "/images/activities/pickleball-banner.png",
    },
    {
      rank: 2,
      name: "CLB Pickleball Sài Gòn Elite",
      location: "Quận 7, TP. HCM",
      points: 3340,
      winRate: "90%",
      tournamentsJoined: 31,
      avatarUrl: "/images/explore_sports/gridy-pickleball.avif",
    },
    {
      rank: 3,
      name: "CLB Pickleball Thủ Đức Master",
      location: "Thủ Đức, TP. HCM",
      points: 3150,
      winRate: "87%",
      tournamentsJoined: 27,
      avatarUrl: "/images/activities/pickleball-banner.png",
    },
    {
      rank: 4,
      name: "CLB Pickleball Hà Nội Pro",
      location: "Hà Nội",
      points: 2990,
      winRate: "84%",
      tournamentsJoined: 24,
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
    {
      rank: 5,
      name: "CLB Pickleball Đà Nẵng",
      location: "Đà Nẵng",
      points: 2860,
      winRate: "81%",
      tournamentsJoined: 21,
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
  ],
};

const formatPoints = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export function SportLeaderboard({ sportName = "Cầu Lông" }: SportLeaderboardProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const isPickleball = sportName.toLowerCase().includes("pickleball");
  const dataset = isPickleball ? PICKLEBALL_LEADERBOARD_BY_CATEGORY : LEADERBOARD_BY_CATEGORY;

  const players = dataset[activeCategory] || dataset.all!;
  const topPlayer = players[0]!;

  return (
    <section id="leaderboard" className="w-full py-5 sm:py-7 bg-background text-foreground transition-colors scroll-mt-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-0.5 min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2 truncate">
              <BarChart3 className="w-5 h-5 text-amber-500 shrink-0" />
              <span>Bảng Xếp Hạng {sportName}</span>
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-normal line-clamp-1">
              Top các tay vợt phong trào có điểm số cao nhất trên hệ thống.
            </p>
          </div>

          <Link
            href="/leaderboard"
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:underline transition-colors shrink-0"
          >
            <span>Xem BXH đầy đủ</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Main 3-Column Grid Layout matching Home Leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
          {/* COLUMN 1: Top Ranking List & Category Tabs (Left) */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-between rounded-2xl bg-card border border-border/80 p-4 sm:p-5 shadow-2xs">
            {/* Category Filter Tabs (Tất cả, Đơn, Đôi, Đội / CLB) */}
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-3 scrollbar-none border-b border-border/50">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setActiveCategory(cat.key)}
                    className={`relative px-3.5 py-1.5 text-xs sm:text-sm font-medium whitespace-nowrap rounded-xl transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "text-primary bg-primary/10 border border-primary/20 font-semibold shadow-2xs"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-3 space-y-1 sm:space-y-1.5">
              {players.map((player) => (
                <div
                  key={`${activeCategory}-${player.rank}`}
                  className="group flex items-center justify-between p-2.5 sm:p-3 rounded-xl hover:bg-muted/60 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Rank Badge */}
                    <div className="flex items-center justify-center shrink-0 w-7 h-7">
                      {player.rank === 1 ? (
                        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-950 font-extrabold text-xs flex items-center justify-center shadow-xs">
                          1
                        </div>
                      ) : player.rank === 2 ? (
                        <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center">
                          2
                        </div>
                      ) : player.rank === 3 ? (
                        <div className="w-7 h-7 rounded-full bg-amber-600/20 text-amber-700 dark:text-amber-400 font-bold text-xs flex items-center justify-center">
                          3
                        </div>
                      ) : (
                        <span className="text-xs font-semibold text-muted-foreground">
                          {player.rank}
                        </span>
                      )}
                    </div>

                    {/* Avatar */}
                    <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden shrink-0 border border-border/80">
                      <Image
                        src={player.avatarUrl}
                        alt={player.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>

                    {/* Info */}
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                        {player.name}
                      </h4>
                      <p className="text-xs text-muted-foreground truncate font-normal">
                        {player.location}
                      </p>
                    </div>
                  </div>

                  {/* Points */}
                  <div className="text-right shrink-0 font-bold text-xs sm:text-sm text-primary pl-2" suppressHydrationWarning>
                    {formatPoints(player.points)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* COLUMN 2: #1 Highlight Player Card (Middle) */}
          <div className="lg:col-span-3 xl:col-span-4 relative rounded-2xl overflow-hidden bg-slate-900 text-white flex flex-col justify-between shadow-md border border-slate-800 min-h-[360px] lg:min-h-[400px]">
            {/* Top Image Background & Gradient Overlay */}
            <div className="absolute inset-0 z-0">
              <Image
                src={topPlayer.heroImageUrl || topPlayer.avatarUrl}
                alt={topPlayer.name}
                fill
                sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 33vw, 400px"
                className="object-cover object-top opacity-70"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/40" />
            </div>

            {/* Upper Content Overlay */}
            <div className="relative z-10 p-5 sm:p-6 flex flex-col justify-between flex-1">
              {/* Rank Tag Header */}
              <div className="flex justify-end">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-amber-400/90 text-amber-950 font-extrabold text-xs shadow-xs">
                  #1
                </span>
              </div>

              {/* Player Main Info */}
              <div className="mt-auto space-y-1 pt-12">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-xs">
                  {topPlayer.name}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-slate-300 font-normal">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{topPlayer.location}</span>
                </div>

                <div className="pt-2 flex items-baseline gap-1.5" suppressHydrationWarning>
                  <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {formatPoints(topPlayer.points)}
                  </span>
                  <span className="text-xs sm:text-sm font-normal text-slate-300">
                    điểm
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Achievements Box */}
            <div className="relative z-10 bg-slate-950/90 backdrop-blur-xs p-4 sm:p-5 border-t border-slate-800/80 space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Thành tích nổi bật
                </p>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <span className="text-xs text-slate-400 block font-normal">
                      Giải đấu tham gia
                    </span>
                    <span className="text-lg sm:text-xl font-bold text-white">
                      {topPlayer.tournamentsJoined || 24}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-normal">
                      Tỷ lệ thắng
                    </span>
                    <span className="text-lg sm:text-xl font-bold text-emerald-400">
                      {topPlayer.winRate || "87%"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Link
                href="/leaderboard"
                className="w-full h-9 sm:h-10 px-4 rounded-xl bg-gradient-primary hover:opacity-95 text-white font-bold text-xs sm:text-sm shadow-2xs transition-all text-center flex items-center justify-center active:scale-[0.98] cursor-pointer"
              >
                Xem chi tiết
              </Link>
            </div>
          </div>

          {/* COLUMN 3: CTA Card "Cải thiện thứ hạng" (Right) */}
          <div className="lg:col-span-3 xl:col-span-3 relative rounded-2xl bg-card border border-border/80 p-5 sm:p-6 flex flex-col justify-between overflow-hidden shadow-2xs min-h-[320px] lg:min-h-[400px]">
            {/* Top Text Content */}
            <div className="relative z-10 space-y-2.5">
              <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
                Cải thiện thứ hạng
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-relaxed">
                Tham gia các giải đấu {sportName} để tích điểm và nâng cao thứ hạng của bạn.
              </p>

              <div className="pt-1">
                <Link
                  href="/tournaments"
                  className="inline-flex items-center justify-center h-9 sm:h-10 px-4 rounded-xl bg-gradient-primary text-white font-bold text-xs sm:text-sm shadow-2xs transition-all w-full text-center active:scale-[0.98] cursor-pointer"
                >
                  Tham gia ngay
                </Link>
              </div>
            </div>

            {/* Bottom 3D Podium Artwork Illustration */}
            <div className="relative z-0 mt-6 w-full h-44 sm:h-48 rounded-xl overflow-hidden flex items-end justify-center">
              <Image
                src="/images/rankings/podium-cta.png"
                alt="Podium Illustration"
                fill
                className="object-contain object-bottom scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


