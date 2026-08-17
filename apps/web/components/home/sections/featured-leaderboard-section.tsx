"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight, MapPin, Crown } from "lucide-react";
import { useTranslations } from "next-intl";

type SportKey = "badminton" | "pickleball";

interface PlayerRank {
  rank: number;
  name: string;
  location: string;
  points: number;
  avatarUrl: string;
  tournamentsJoined?: number;
  winRate?: string;
  heroImageUrl?: string;
}

const SPORTS: { key: SportKey; labelKey: string; defaultLabel: string }[] = [
  { key: "badminton", labelKey: "badminton", defaultLabel: "Cầu lông" },
  { key: "pickleball", labelKey: "pickleball", defaultLabel: "Pickleball" },
];

const LEADERBOARD_DATA: Record<SportKey, PlayerRank[]> = {
  badminton: [
    {
      rank: 1,
      name: "Nguyễn Tiến Minh",
      location: "Hà Nội",
      points: 2860,
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      tournamentsJoined: 24,
      winRate: "87%",
      heroImageUrl: "/images/rankings/tien-minh.png",
    },
    {
      rank: 2,
      name: "Nguyễn Thùy Linh",
      location: "Phú Thọ",
      points: 2750,
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    },
    {
      rank: 3,
      name: "Lê Đức Phát",
      location: "Hà Nội",
      points: 2680,
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
    {
      rank: 4,
      name: "Phạm Cao Cường",
      location: "TP. Hồ Chí Minh",
      points: 2580,
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    },
    {
      rank: 5,
      name: "Vũ Thị Trang",
      location: "Hà Nội",
      points: 2450,
      avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    },
  ],
  pickleball: [
    {
      rank: 1,
      name: "Trịnh Linh Giang",
      location: "TP. Hồ Chí Minh",
      points: 2940,
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      tournamentsJoined: 31,
      winRate: "91%",
      heroImageUrl: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&auto=format&fit=crop&q=80",
    },
    {
      rank: 2,
      name: "Sophia Huỳnh",
      location: "TP. Hồ Chí Minh",
      points: 2880,
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    },
    {
      rank: 3,
      name: "Huỳnh Chí Khương",
      location: "Đà Nẵng",
      points: 2820,
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    },
    {
      rank: 4,
      name: "Trần Thụy Thanh Trúc",
      location: "Hà Nội",
      points: 2750,
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
    {
      rank: 5,
      name: "Đặng Kim Ngân",
      location: "Hà Nội",
      points: 2690,
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    },
  ],
};

const formatPoints = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export function FeaturedLeaderboardSection() {
  const [activeSport, setActiveSport] = useState<SportKey>("badminton");

  const tLeaderboard = useTranslations("home.leaderboard");

  const getT = (key: string, fallback: string): string => {
    try {
      const res = tLeaderboard(key);
      if (!res || res.includes("home.leaderboard") || res === key) {
        return fallback;
      }
      return res;
    } catch {
      return fallback;
    }
  };

  const currentList = LEADERBOARD_DATA[activeSport] || LEADERBOARD_DATA.badminton;
  const topPlayer = currentList[0] || {
    rank: 1,
    name: "Nguyễn Tiến Minh",
    location: "Hà Nội",
    points: 2860,
    tournamentsJoined: 24,
    winRate: "87%",
    heroImageUrl: "/images/rankings/tien-minh.png",
  };

  return (
    <section id="leaderboard" className="w-full py-6 sm:py-8 bg-background text-foreground transition-colors border-t border-border/40 overflow-hidden scroll-mt-20">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 space-y-5 sm:space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Crown className="w-5 h-5 text-amber-500 shrink-0" />
            <span>{getT("title", "Bảng xếp hạng")}</span>
          </h2>

          <Link
            href="/leaderboard"
            className="group flex items-center gap-1 text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline transition-colors"
          >
            <span>{getT("view_full", "Xem bảng xếp hạng đầy đủ")}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Main 3-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">

          {/* COLUMN 1: Top Ranking List & Sports Tabs (Left) */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-between rounded-2xl bg-card border border-border/80 p-4 sm:p-5 shadow-sm">
            {/* Sports Tabs */}
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-3 scrollbar-none border-b border-border/50">
              {SPORTS.map((sport) => {
                const isActive = activeSport === sport.key;
                return (
                  <button
                    key={sport.key}
                    onClick={() => setActiveSport(sport.key)}
                    className={`relative px-3.5 py-1.5 text-xs sm:text-sm font-medium whitespace-nowrap rounded-lg transition-all duration-200 ${isActive
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                      }`}
                  >
                    {getT(`sports.${sport.labelKey}`, sport.defaultLabel)}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Ranking List Items */}
            <div className="mt-3 space-y-1 sm:space-y-2">
              {currentList.map((player) => (
                <div
                  key={`${activeSport}-${player.rank}`}
                  className="group flex items-center justify-between p-2.5 sm:p-3 rounded-xl hover:bg-accent/40 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Rank Badge */}
                    <div className="flex items-center justify-center shrink-0 w-7 h-7">
                      {player.rank === 1 ? (
                        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-950 font-extrabold text-xs flex items-center justify-center shadow-sm">
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
                        <span className="text-sm font-semibold text-muted-foreground">
                          {player.rank}
                        </span>
                      )}
                    </div>

                    {/* Avatar */}
                    <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden shrink-0 border border-border">
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
                      <p className="text-sm font-semibold text-foreground truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {player.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {player.location}
                      </p>
                    </div>
                  </div>

                  {/* Points */}
                  <div className="text-right shrink-0 font-bold text-sm sm:text-base text-blue-600 dark:text-blue-400 pl-2" suppressHydrationWarning>
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
                src={topPlayer.heroImageUrl || "/images/rankings/tien-minh.png"}
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
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-amber-400/90 text-amber-950 font-extrabold text-sm shadow">
                  #1
                </span>
              </div>

              {/* Player Main Info */}
              <div className="mt-auto space-y-1 pt-12">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-sm">
                  {topPlayer.name}
                </h3>

                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{topPlayer.location}</span>
                </div>

                <div className="pt-2 flex items-baseline gap-1.5" suppressHydrationWarning>
                  <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {formatPoints(topPlayer.points)}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-slate-300">
                    {getT("highlight.pts", "điểm")}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Achievements Box */}
            <div className="relative z-10 bg-slate-950/90 backdrop-blur-sm p-4 sm:p-5 border-t border-slate-800/80 space-y-4">
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                  {getT("highlight.achievements", "Thành tích")}
                </p>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <span className="text-xs text-slate-400 block">
                      {getT("highlight.tournaments_joined", "Giải đấu đã tham gia")}
                    </span>
                    <span className="text-lg sm:text-xl font-bold text-white">
                      {topPlayer.tournamentsJoined || 24}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">
                      {getT("highlight.win_rate", "Tỷ lệ thắng")}
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
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#00E575] hover:opacity-95 text-white font-semibold text-xs sm:text-sm shadow-md transition-all text-center block"
              >
                {getT("highlight.view_details", "Xem chi tiết")}
              </Link>
            </div>
          </div>

          {/* COLUMN 3: CTA Card "Cải thiện thứ hạng" (Right) */}
          <div className="lg:col-span-3 xl:col-span-3 relative rounded-2xl bg-gradient-to-b from-blue-50/90 via-blue-50/50 to-blue-100/80 dark:from-slate-800/90 dark:via-slate-800/60 dark:to-slate-900/90 border border-blue-100 dark:border-slate-700/60 p-5 sm:p-6 flex flex-col justify-between overflow-hidden shadow-sm min-h-[320px] lg:min-h-[400px]">
            {/* Top Text Content */}
            <div className="relative z-10 space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                {getT("cta.title", "Cải thiện thứ hạng")}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {getT("cta.subtitle", "Tham gia giải đấu để tích điểm và nâng cao thứ hạng của bạn.")}
              </p>

              <div className="pt-1">
                <Link
                  href="/tournaments"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-md transition-colors w-full text-center"
                >
                  {getT("cta.join_now", "Tham gia ngay")}
                </Link>
              </div>
            </div>

            {/* Bottom 3D Podium Artwork Illustration */}
            <div className="relative z-0 mt-6 w-full h-44 sm:h-48 rounded-xl overflow-hidden flex items-end justify-center">
              <Image
                src="/images/rankings/podium-cta.png"
                alt="Podium Illustration"
                fill
                loading="lazy"
                className="object-contain object-bottom scale-105"
                sizes="(max-width: 768px) 300px, 300px"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
