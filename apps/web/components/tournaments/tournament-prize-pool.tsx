"use client";

import React from "react";
import { Trophy, Award, Medal } from "lucide-react";
import { TournamentData } from "@/lib/tournaments-data";

interface TournamentPrizePoolProps {
  tournament: TournamentData;
}

export function TournamentPrizePool({ tournament }: TournamentPrizePoolProps) {
  return (
    <div className="space-y-4">
      {/* 1. Master Total Prize Showcase Banner */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 p-5 sm:p-7 text-white shadow-md">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
        <div className="relative z-10 space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/20 backdrop-blur-md text-xs font-semibold text-amber-100">
            <Trophy className="w-3.5 h-3.5" />
            <span>Tổng giá trị giải thưởng</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {tournament.totalPrizePool}
          </h2>
          <p className="text-xs sm:text-sm text-amber-50 font-normal leading-relaxed">
            Bao gồm tiền mặt, cúp mạ vàng, huy chương kim loại đúc nổi 3D và hiện vật tài trợ chính hãng.
          </p>
        </div>
      </div>

      {/* 2. Podium Visual Trophy Cards (Top 1, 2, 3) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 items-stretch">
        {/* Hạng Nhất (Cúp Vàng) */}
        <div className="bg-card border-2 border-amber-400 dark:border-amber-500/80 rounded-xl sm:rounded-2xl p-4 sm:p-5 space-y-3 shadow-2xs relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-500 font-bold text-xs">
            #1
          </div>
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-2xs">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base sm:text-lg text-foreground">
              Giải nhất (Vô địch)
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground font-normal">
              Dành cho đội/cặp VĐV vô địch tại mỗi hạng mục thi đấu.
            </p>
          </div>

          <div className="pt-2 border-t border-border/50 space-y-1.5 text-xs font-normal">
            <div className="font-semibold text-amber-600 dark:text-amber-400">
              Cúp Vàng + Tiền mặt + Vợt / Giày cao cấp
            </div>
            <div className="text-muted-foreground">
              • Bảng vinh danh & Điểm thưởng hệ thống PlayGrid
            </div>
          </div>
        </div>

        {/* Hạng Nhì (Huy Chương Bạc) */}
        <div className="bg-card border border-border/80 rounded-xl sm:rounded-2xl p-4 sm:p-5 space-y-3 shadow-2xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center shadow-2xs">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base sm:text-lg text-foreground">
              Giải nhì (Á quân)
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground font-normal">
              Dành cho đội/cặp VĐV đạt giải nhì tại mỗi hạng mục.
            </p>
          </div>

          <div className="pt-2 border-t border-border/50 space-y-1.5 text-xs font-normal">
            <div className="font-medium text-foreground">
              Huy chương Bạc + Tiền mặt + Quà tài trợ
            </div>
            <div className="text-muted-foreground">
              • Điểm thưởng xếp hạng phong trào
            </div>
          </div>
        </div>

        {/* Đồng Hạng Ba (Huy Chương Đồng) */}
        <div className="bg-card border border-border/80 rounded-xl sm:rounded-2xl p-4 sm:p-5 space-y-3 shadow-2xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-amber-900/10 dark:bg-amber-900/30 text-amber-700 dark:text-amber-500 flex items-center justify-center shadow-2xs">
              <Medal className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base sm:text-lg text-foreground">
              Đồng hạng ba
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground font-normal">
              Dành cho 2 đội/cặp VĐV dừng bước tại vòng Bán kết.
            </p>
          </div>

          <div className="pt-2 border-t border-border/50 space-y-1.5 text-xs font-normal">
            <div className="font-medium text-foreground">
              Huy chương Đồng + Tiền mặt + Bộ Race Kit
            </div>
            <div className="text-muted-foreground">
              • Giấy chứng nhận giải thưởng chính thức
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
