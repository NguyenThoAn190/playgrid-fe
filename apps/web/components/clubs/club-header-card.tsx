"use client";

import React from "react";
import Image from "next/image";
import {
  CheckCircle2,
  Crown,
  Star,
  Users,
  MapPin,
  Calendar,
  Trophy,
  Activity,
  MessageCircle,
  UserPlus,
  Share2,
} from "lucide-react";
import { ClubDetailData } from "@/lib/clubs-data";
import { Button } from "@/components/ui/button";

export interface ClubHeaderCardProps {
  club: ClubDetailData;
  onOpenJoinModal: () => void;
}

export function ClubHeaderCard({ club, onOpenJoinModal }: ClubHeaderCardProps) {
  return (
    <div className="bg-card border border-border/80 rounded-2xl p-4 sm:p-6 shadow-2xs space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Avatar & Club Profile Info */}
        <div className="flex items-start sm:items-center gap-3.5 sm:gap-5 min-w-0">
          {/* Circular Club Logo Avatar */}
          <div className="relative shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-primary/20 bg-muted overflow-hidden flex items-center justify-center shadow-md">
              {club.logoUrl ? (
                <Image
                  src={club.logoUrl}
                  alt={club.name}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-xs sm:text-sm font-bold text-foreground text-center p-1">
                  {club.logoText || club.name.slice(0, 4)}
                </span>
              )}
            </div>

            {/* VIP Crown Badge Overlap */}
            {club.isVip && (
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-md">
                <Crown className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
              </div>
            )}
          </div>

          {/* Club Titles & Meta */}
          <div className="space-y-1.5 min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-foreground line-clamp-1">
                {club.name}
              </h1>
              {club.isVerified && (
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold">
                  <CheckCircle2 className="w-3 h-3 fill-emerald-500 text-white" />
                  <span>Xác thực</span>
                </div>
              )}
              {club.isVip && (
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[11px] font-bold">
                  <Crown className="w-3 h-3 text-amber-500" />
                  <span>VIP Club</span>
                </div>
              )}
            </div>

            {club.slogan && (
              <p className="text-xs sm:text-sm text-muted-foreground font-normal line-clamp-1">
                {club.slogan}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-muted-foreground font-medium">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>{club.location}</span>
              </span>
              {club.foundedYear && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  <span>Thành lập {club.foundedYear}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Join CTA & Contact Buttons */}
        <div className="flex items-center gap-2.5 shrink-0 self-stretch sm:self-auto justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              if (club.leadership?.zaloGroup) {
                window.open(club.leadership.zaloGroup, "_blank");
              }
            }}
            className="rounded-xl font-semibold text-xs sm:text-sm h-10 px-3.5 sm:px-4 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 mr-1.5 text-primary" />
            <span>Nhắn tin Zalo</span>
          </Button>

          <Button
            type="button"
            onClick={onOpenJoinModal}
            className="rounded-xl font-bold text-xs sm:text-sm h-10 px-4 sm:px-5 bg-gradient-primary text-white shadow-2xs hover:opacity-95 active:scale-95 transition-all cursor-pointer"
          >
            <UserPlus className="w-4 h-4 mr-1.5 stroke-[2.5]" />
            <span>Gia Nhập CLB</span>
          </Button>
        </div>
      </div>

      {/* Bottom Key Stats Bar (4 Metric Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-border/60">
        <div className="p-2.5 sm:p-3 rounded-xl bg-muted/40 border border-border/50 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
            <Star className="w-4 h-4 fill-amber-500" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-foreground">
              {club.rating.toFixed(1)} / 5.0
            </div>
            <div className="text-[11px] text-muted-foreground font-normal">
              {club.reviewCount} đánh giá
            </div>
          </div>
        </div>

        <div className="p-2.5 sm:p-3 rounded-xl bg-muted/40 border border-border/50 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-foreground" suppressHydrationWarning>
              {club.memberCount.toLocaleString("vi-VN")}
            </div>
            <div className="text-[11px] text-muted-foreground font-normal">
              Hội viên tham gia
            </div>
          </div>
        </div>

        <div className="p-2.5 sm:p-3 rounded-xl bg-muted/40 border border-border/50 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-foreground">
              450+ trận
            </div>
            <div className="text-[11px] text-muted-foreground font-normal">
              Kèo đấu đã mở
            </div>
          </div>
        </div>

        <div className="p-2.5 sm:p-3 rounded-xl bg-muted/40 border border-border/50 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-foreground">
              {club.achievements?.length || 3} danh hiệu
            </div>
            <div className="text-[11px] text-muted-foreground font-normal">
              Cúp vô địch giải
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
