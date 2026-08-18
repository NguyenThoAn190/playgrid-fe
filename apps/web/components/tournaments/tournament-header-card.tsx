"use client";

import React from "react";
import { useLocale } from "next-intl";
import {
  Calendar,
  MapPin,
  Trophy,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { TournamentData } from "@/lib/tournaments-data";

interface TournamentHeaderCardProps {
  tournament: TournamentData;
}

export function TournamentHeaderCard({ tournament }: TournamentHeaderCardProps) {
  const locale = useLocale();
  const isEn = locale === "en";

  return (
    <div className="bg-card border border-border/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 space-y-3.5 shadow-2xs">
      {/* Category & Status Badges */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-semibold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
          <Trophy className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>Giải thưởng: {tournament.totalPrizePool}</span>
        </span>

        <span className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-medium bg-primary/10 text-primary border border-primary/20">
          <span>🏸</span>
          <span>{tournament.sportLabel}</span>
        </span>

        {tournament.badge && (
          <span className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-medium bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30">
            <span>🔥</span>
            <span>{tournament.badge.text}</span>
          </span>
        )}

        <span className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-normal bg-muted text-muted-foreground border border-border/60">
          <Clock className="w-3.5 h-3.5 text-muted-foreground" />
          <span>Hạn đăng ký: {tournament.regDeadline}</span>
        </span>
      </div>

      {/* Main Tournament Title (H1 Scale Standard) */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground leading-tight">
        {tournament.title}
      </h1>

      {/* Date & Location & Organizer Info Bar */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-muted-foreground pt-3 border-t border-border/50 font-normal">
        <span className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4 text-primary shrink-0" />
          <span>{tournament.date}</span>
        </span>

        <span className="flex items-center gap-1.5">
          <MapPin className="h-4 w-4 text-primary shrink-0" />
          <span>{tournament.location}</span>
        </span>

        <span className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>BTC: <strong className="text-foreground font-medium">{tournament.organizer.name}</strong></span>
        </span>
      </div>
    </div>
  );
}
