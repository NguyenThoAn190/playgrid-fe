"use client";

import React from "react";
import {
  Trophy,
  Flame,
  Award,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Info,
  TrendingUp,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export interface LeaderboardSidebarProps {
  sportSlug?: string;
  sportName?: string;
}

export function LeaderboardSidebar({
  sportSlug = "badminton",
  sportName = "Cầu Lông",
}: LeaderboardSidebarProps) {
  return (
    <div className="space-y-4">
      {/* 1. User Ranking Status Box */}
      <div className="bg-card border border-primary/20 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-primary text-white flex items-center justify-center shadow-xs">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-foreground">Hồ Sơ Của Bạn</h3>
              <p className="text-[11px] text-muted-foreground font-normal">PlayGrid Elo Tracker</p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
            Đang hoạt động
          </span>
        </div>

        <div className="p-3 rounded-xl bg-muted/40 border border-border/60 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-muted-foreground font-medium">Hạng Hiện Tại</div>
            <div className="text-base font-bold text-foreground">#142 Toàn Quốc</div>
          </div>
          <div className="text-right">
            <div className="text-[11px] text-muted-foreground font-medium">Điểm Elo</div>
            <div className="text-base font-bold text-primary">1.850 Elo</div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground font-normal leading-relaxed">
          Cần thêm <strong className="text-foreground">50 điểm Elo</strong> để thăng lên hạng Top 100.
        </p>

        <Link
          href={`/${sportSlug}/tournaments`}
          className="w-full h-9 rounded-xl bg-gradient-primary text-white font-bold text-xs shadow-2xs flex items-center justify-center gap-1.5 hover:opacity-95 transition-all"
        >
          <Flame className="w-3.5 h-3.5 text-orange-200" />
          <span>Đăng ký giải đấu để leo Rank</span>
        </Link>
      </div>

      {/* 2. Elo Rating Rules Card */}
      <div className="bg-card border border-border/80 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3">
        <h3 className="font-bold text-xs sm:text-sm text-foreground flex items-center gap-1.5">
          <Info className="w-4 h-4 text-primary shrink-0" />
          <span>Quy Chuẩn Tính Điểm Elo</span>
        </h3>

        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="p-2.5 rounded-xl bg-muted/30 border border-border/50 space-y-1">
            <div className="font-semibold text-foreground flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Giải Đấu Major & Open</span>
            </div>
            <p className="font-normal text-muted-foreground">
              Vô địch: +300 đến +500 Elo. Vào vòng trong: +100 đến +200 Elo.
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-muted/30 border border-border/50 space-y-1">
            <div className="font-semibold text-foreground flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span>Trận Giao Lưu & Kèo CLB</span>
            </div>
            <p className="font-normal text-muted-foreground">
              Thắng đối thủ ngang trình: +20 đến +35 Elo. Thắng đối thủ out trình: +50 Elo.
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-muted/30 border border-border/50 space-y-1">
            <div className="font-semibold text-foreground flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-orange-500 shrink-0" />
              <span>Thưởng Chuỗi Thắng (Streak)</span>
            </div>
            <p className="font-normal text-muted-foreground">
              Chuỗi 5 trận thắng liên tiếp: Thưởng nóng +50 điểm Elo.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Double Points Tournaments Spotlight */}
      <div className="bg-card border border-border/80 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-xs sm:text-sm text-foreground flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Giải Đấu Điểm Nhân Đôi</span>
          </h3>
          <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[11px] font-semibold">
            x2 Elo
          </span>
        </div>

        <div className="p-3 rounded-xl bg-muted/30 border border-border/60 space-y-2">
          <div className="font-bold text-xs sm:text-sm text-foreground line-clamp-1">
            Hà Nội Open 2026 - Mở Rộng Toàn Quốc
          </div>
          <div className="text-xs text-muted-foreground">
            Giải thưởng: <strong className="text-primary font-bold">120.000.000đ</strong>
          </div>
          <Link
            href="/tournaments/hanoi-badminton-open-2026"
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1 pt-1"
          >
            <span>Đăng ký tham gia ngay</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
