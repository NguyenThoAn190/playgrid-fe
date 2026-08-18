"use client";

import React from "react";
import { Scale, CheckCircle2, Download } from "lucide-react";
import { TournamentRuleItem } from "@/lib/tournaments-data";
import { Button } from "@/components/ui/button";

interface TournamentRulesSectionProps {
  rules: TournamentRuleItem[];
  sportLabel?: string;
}

export function TournamentRulesSection({
  rules,
  sportLabel = "Cầu Lông",
}: TournamentRulesSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
        <div>
          <h2 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Scale className="w-5 h-5 text-primary" />
            <span>Điều lệ giải đấu & quy định chuyên môn</span>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-normal">
            Các quy định bắt buộc đối với tất cả VĐV, Trưởng đoàn và Huấn luyện viên tham dự.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="rounded-xl text-xs font-semibold gap-1.5 self-start sm:self-auto shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Tải Điều Lệ Bản Đầy Đủ (PDF)</span>
        </Button>
      </div>

      <div className="space-y-3.5">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="bg-card border border-border/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-3 shadow-2xs"
          >
            <h3 className="font-semibold text-sm sm:text-base text-foreground flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span>{rule.title}</span>
            </h3>

            <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-normal">
              {rule.content}
            </p>

            {rule.bulletPoints && rule.bulletPoints.length > 0 && (
              <ul className="space-y-1.5 pt-1">
                {rule.bulletPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-foreground/90 font-normal">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
