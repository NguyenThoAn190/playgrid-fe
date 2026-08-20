"use client";

import React from "react";
import { Trophy, Medal, Award, Calendar, Sparkles } from "lucide-react";
import { ClubDetailData, ClubAchievement } from "@/lib/clubs-data";

export interface ClubAchievementsTabProps {
  club: ClubDetailData;
}

export function ClubAchievementsTab({ club }: ClubAchievementsTabProps) {
  const achievements = club.achievements || [];

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border/80 rounded-2xl p-4 sm:p-6 shadow-2xs space-y-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500 shrink-0" />
            <span>Phòng Truyền Thống & Thành Tích Thi Đấu</span>
          </h2>
          <p className="text-xs text-muted-foreground font-normal mt-0.5">
            Các danh hiệu vô địch, huy chương và giải thưởng tiêu biểu mà tập thể và hội viên CLB đã đạt được.
          </p>
        </div>

        {achievements.length > 0 ? (
          <div className="space-y-3 pt-1">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className="p-4 sm:p-5 rounded-2xl bg-muted/30 border border-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-amber-500/40 transition-all"
              >
                <div className="flex items-start sm:items-center gap-3.5">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${
                      ach.rank === "gold"
                        ? "bg-amber-500/10 text-amber-500 border border-amber-500/30"
                        : ach.rank === "silver"
                        ? "bg-slate-500/10 text-slate-400 border border-slate-500/30"
                        : "bg-orange-500/10 text-orange-500 border border-orange-500/30"
                    }`}
                  >
                    <Trophy className="w-6 h-6" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                          ach.rank === "gold"
                            ? "bg-amber-400 text-slate-950"
                            : ach.rank === "silver"
                            ? "bg-slate-300 text-slate-900"
                            : "bg-orange-400 text-slate-950"
                        }`}
                      >
                        {ach.rankLabel}
                      </span>
                      <span className="text-xs text-muted-foreground font-semibold flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Năm {ach.year}</span>
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-foreground">
                      {ach.title}
                    </h3>
                    <p className="text-xs text-primary font-medium">
                      {ach.tournamentName}
                    </p>
                    <p className="text-xs text-muted-foreground font-normal">
                      {ach.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground text-sm">
            Thông tin thành tích đang được cập nhật.
          </div>
        )}
      </div>
    </div>
  );
}
