"use client";

import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  MapPin,
  Users,
  Trophy,
  Zap,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export interface SportHeroProps {
  sportName?: string;
}

export function SportHero({ sportName = "Cầu Lông" }: SportHeroProps) {
  const stats = [
    {
      id: "courts",
      value: "48+",
      label: "Sân đang hoạt động",
      icon: MapPin,
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      id: "players",
      value: "2,400+",
      label: "Tay vợt active",
      icon: Users,
      color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    },
    {
      id: "matches",
      value: "15+",
      label: "Kèo ghép hôm nay",
      icon: Zap,
      color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    },
    {
      id: "tournaments",
      value: "3",
      label: "Giải đấu sắp tới",
      icon: Trophy,
      color: "text-purple-500 bg-purple-500/10 border-purple-500/20",
    },
  ];

  return (
    <div id="overview" className="relative w-full overflow-hidden bg-background py-8 sm:py-12 border-b border-border/40 scroll-mt-32">
      {/* Background Ambient Radial Lights */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-500/15 via-emerald-500/10 to-transparent blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-cyan-500/15 via-teal-500/10 to-transparent blur-[90px] pointer-events-none" />

      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          {/* Left: Headline & Actions */}
          <div className="space-y-5 lg:col-span-7">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>Chuyên mục thể thao 🏸 {sportName}</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
              Khám phá thế giới{" "}
              <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
                {sportName}
              </span>{" "}
              trên PlayGrid
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl font-medium">
              Đặt sân cầu lông tiêu chuẩn BWF, tham gia các kèo ghép giao lưu theo trình độ, gia nhập câu lạc bộ và thử sức tại các giải đấu phong trào hấp dẫn.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#courts"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#00E575] px-6 text-sm font-bold text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>Đặt sân gần bạn</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              <a
                href="#matches"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border/80 bg-card px-6 text-sm font-bold text-foreground hover:bg-accent transition-all cursor-pointer shadow-2xs"
              >
                <span>Tham gia kèo ghép</span>
              </a>
            </div>

            {/* Live Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-border/40">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.id}
                    className="flex items-center gap-3 p-2.5 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-xs shadow-2xs"
                  >
                    <div className={`p-2.5 rounded-xl border ${stat.color} shrink-0`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-base sm:text-lg font-extrabold text-foreground leading-none">
                        {stat.value}
                      </div>
                      <div className="text-[11px] text-muted-foreground font-medium pt-1">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Mascot Image Card */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[480px] aspect-[4/3] rounded-3xl overflow-hidden border border-border/60 shadow-xl group">
              <Image
                src="/images/explore_sports/gridy-badminton.avif"
                alt="PlayGrid Badminton Mascot"
                fill
                priority
                unoptimized
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-card/90 backdrop-blur-md border border-border/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-foreground">Bộ môn Cầu Lông</div>
                  <div className="text-[11px] text-muted-foreground">Thủ Đức • Quận 7 • Tân Bình</div>
                </div>
                <div className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                  Sôi nổi nhất
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
