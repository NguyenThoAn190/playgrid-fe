"use client";

import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  Users,
  UserPlus,
  MapPin,
  Clock,
  UserCheck,
  Trophy,
  CheckCircle2,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
  Zap,
} from "lucide-react";
import { Card } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";

export interface MatchmakingItem {
  id: string;
  hostName: string;
  hostAvatar: string;
  hostLevel: string;
  courtName: string;
  time: string;
  date: string;
  format: string;
  currentPlayers: number;
  maxPlayers: number;
  pricePerPlayer: number;
  note: string;
  badge: string;
  isUrgent?: boolean;
}

const MOCK_MATCHES: MatchmakingItem[] = [
  {
    id: "match-1",
    hostName: "Trần Thu Hà",
    hostAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    hostLevel: "Khá (3.5)",
    courtName: "Sân 4 (Sân VIP)",
    time: "19:00 - 21:00",
    date: "2026-08-14",
    currentPlayers: 2,
    maxPlayers: 4,
    pricePerPlayer: 55000,
    format: "Đôi nam / Đôi nam nữ",
    note: "Sân thảm VIP thoáng mát, nhóm thân thiện bao cầu Thành Công và có nước uống đá chanh miễn phí.",
    badge: "Sân VIP ✨",
  },
  {
    id: "match-2",
    hostName: "Lê Quang Minh",
    hostAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    hostLevel: "Trung bình + (3.0)",
    courtName: "Sân 2",
    time: "18:00 - 20:00",
    date: "2026-08-14",
    currentPlayers: 3,
    maxPlayers: 4,
    pricePerPlayer: 50000,
    format: "Đôi nam",
    note: "Cần tìm 1 bạn trình độ trung bình khá trở lên để giao lưu cọ xát cuối tuần.",
    badge: "Sắp đủ người",
  },
  {
    id: "match-3",
    hostName: "Phan Hoàng Nam",
    hostAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    hostLevel: "Nâng cao (4.0+)",
    courtName: "Sân 1 (Trung tâm)",
    time: "20:00 - 22:00",
    date: "2026-08-14",
    currentPlayers: 1,
    maxPlayers: 4,
    pricePerPlayer: 60000,
    format: "Giao lưu tự do",
    note: "Kèo đánh nhiệt tình, cầu Victor Gold, người chơi có kinh nghiệm thi đấu phong trào.",
    badge: "Kèo chất lượng",
  },
  {
    id: "match-4",
    hostName: "Nguyễn Bảo Ngọc",
    hostAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    hostLevel: "Cơ bản - Vừa sức (2.0)",
    courtName: "Sân 3",
    time: "17:00 - 19:00",
    date: "2026-08-14",
    currentPlayers: 2,
    maxPlayers: 4,
    pricePerPlayer: 45000,
    format: "Đôi nữ / Nam nữ",
    note: "Nhóm giao lưu vui vẻ, rèn luyện sức khỏe, hỗ trợ sửa form đánh cho các bạn mới.",
    badge: "Thân thiện 🌿",
  },
  {
    id: "match-5",
    hostName: "Vũ Đình Khoa",
    hostAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    hostLevel: "Trung bình (2.5)",
    courtName: "Sân 5",
    time: "06:00 - 08:00",
    date: "2026-08-15",
    currentPlayers: 2,
    maxPlayers: 4,
    pricePerPlayer: 40000,
    format: "Đôi nam nữ",
    note: "Kèo đánh sáng sớm hít thở không khí trong lành, sau trận đi ăn sáng cà phê giao lưu.",
    badge: "Kèo sớm ☀️",
  },
];

interface VenueMatchmakingSectionProps {
  onOpenCreateMatch?: () => void;
}

export function VenueMatchmakingSection({
  onOpenCreateMatch,
}: VenueMatchmakingSectionProps) {
  const INITIAL_VISIBLE_COUNT = 3;
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_VISIBLE_COUNT);
  const [joinedIds, setJoinedIds] = useState<string[]>([]);

  const tMatch = useTranslations("venue.matchmaking");
  const locale = useLocale();
  const isEn = locale === "en";

  const handleToggleJoin = (matchId: string) => {
    setJoinedIds((prev) =>
      prev.includes(matchId) ? prev.filter((id) => id !== matchId) : [...prev, matchId]
    );
  };

  const hasMore = visibleCount < MOCK_MATCHES.length;

  const handleToggleExpand = () => {
    if (hasMore) {
      setVisibleCount(MOCK_MATCHES.length);
    } else {
      setVisibleCount(INITIAL_VISIBLE_COUNT);
    }
  };

  return (
    <Card className="rounded-2xl border border-border/80 bg-card p-4 sm:p-5 space-y-4 shadow-2xs" id="matchmaking-section">
      {/* 1. Section Header & CTA Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-3.5">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Users className="size-5 text-orange-600 dark:text-orange-400 shrink-0" />
              <span>{tMatch("title")}</span>
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-semibold border border-amber-500/20 shrink-0 shadow-2xs">
              {tMatch("matches_count", { count: MOCK_MATCHES.length })}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 font-normal">
            {tMatch("subtitle")}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
          <Button
            type="button"
            onClick={onOpenCreateMatch}
            className="h-9 px-3.5 sm:px-4 rounded-xl bg-gradient-primary text-white font-bold text-xs shadow-2xs hover:opacity-95 active:scale-95 transition-all cursor-pointer shrink-0 flex items-center gap-1.5 border-0"
          >
            <UserPlus className="size-4 shrink-0" />
            <span>{tMatch("create_btn")}</span>
          </Button>
        </div>
      </div>

      {/* 2. Responsive Matches Grid (3 Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
        {MOCK_MATCHES.slice(0, visibleCount).map((match) => {
          const isJoined = joinedIds.includes(match.id);
          const progressPercent = Math.round((match.currentPlayers / match.maxPlayers) * 100);

          return (
            <div
              key={match.id}
              className="p-3.5 rounded-xl bg-card border border-border/80 hover:border-primary/50 transition-all space-y-2.5 shadow-2xs relative overflow-hidden flex flex-col justify-between w-full"
            >
              <div className="space-y-2.5">
                {/* Host Info & Badge */}
                <div className="flex items-center justify-between gap-1.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      src={match.hostAvatar}
                      alt={match.hostName}
                      className="size-8.5 rounded-full object-cover border border-border/80 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-semibold text-xs text-foreground truncate flex items-center gap-1">
                        <span className="truncate">{match.hostName}</span>
                      </h4>
                      <span className="text-[10.5px] font-medium text-amber-600 dark:text-amber-400 flex items-center gap-0.5 truncate">
                        <Trophy className="size-3 shrink-0" />
                        <span className="truncate">{match.hostLevel}</span>
                      </span>
                    </div>
                  </div>

                  {match.badge && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 text-[10px] font-semibold border border-amber-500/20 shrink-0">
                      <Zap className="w-2.5 h-2.5" />
                      {match.badge}
                    </span>
                  )}
                </div>

                {/* Slot Details Box */}
                <div className="p-2 rounded-xl bg-muted/30 border border-border/60 space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1 text-foreground/90 min-w-0">
                      <MapPin className="size-3 text-primary shrink-0" />
                      <span className="truncate font-semibold">{match.courtName}</span>
                    </div>
                    <div className="flex items-center gap-1 text-foreground/90 shrink-0 font-medium">
                      <Clock className="size-3 text-muted-foreground shrink-0" />
                      <span>{match.time}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-1 pt-1 border-t border-border/40">
                    <div className="flex items-center gap-1 text-foreground/90 shrink-0">
                      <UserCheck className="size-3 text-primary shrink-0" />
                      <span className="font-semibold">{match.currentPlayers}/{match.maxPlayers} {isEn ? "pls" : "người"}</span>
                    </div>
                    <div className="font-bold text-primary shrink-0 text-right">
                      <span>{match.pricePerPlayer.toLocaleString(isEn ? "en-US" : "vi-VN")}đ/{isEn ? "p" : "người"}</span>
                    </div>
                  </div>
                </div>

                {/* Player Progress Bar */}
                <div className="space-y-0.5">
                  <div className="flex justify-between text-[10.5px] text-muted-foreground font-medium">
                    <span>{tMatch("progress_label")}</span>
                    <span className="font-semibold text-foreground">
                      {match.currentPlayers === match.maxPlayers
                        ? tMatch("full_status")
                        : tMatch("missing_players", { count: match.maxPlayers - match.currentPlayers })}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-primary rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Host Note */}
                <p className="text-[11px] text-muted-foreground bg-muted/20 p-2 rounded-xl border border-border/50 italic leading-snug line-clamp-2">
                  "{match.note}"
                </p>
              </div>

              {/* Action CTA */}
              <div className="pt-2 flex items-center justify-between gap-1.5 border-t border-border/40">
                <span className="text-[10.5px] text-muted-foreground font-medium truncate">
                  {tMatch("format_label")}: <strong className="text-foreground">{match.format}</strong>
                </span>

                <button
                  type="button"
                  onClick={() => handleToggleJoin(match.id)}
                  className={`h-7.5 px-3 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                    isJoined
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-semibold"
                      : "bg-gradient-primary text-white shadow-2xs hover:opacity-95 active:scale-95"
                  }`}
                >
                  {isJoined ? (
                    <>
                      <CheckCircle2 className="size-3.5 text-emerald-500" />
                      <span>{tMatch("joined_btn")}</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="size-3.5" />
                      <span>{tMatch("join_btn")}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. View All / Collapse Button */}
      {MOCK_MATCHES.length > INITIAL_VISIBLE_COUNT && (
        <div className="flex items-center justify-center pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleToggleExpand}
            className="w-full sm:w-auto h-9 px-6 text-xs font-semibold rounded-xl border-border/80 hover:bg-muted cursor-pointer transition-all shadow-2xs flex items-center justify-center gap-1.5"
          >
            {hasMore ? (
              <>
                <span>{tMatch("view_all", { count: MOCK_MATCHES.length })}</span>
                <ChevronRight className="size-3.5 transition-transform" />
              </>
            ) : (
              <>
                <span>{tMatch("collapse")}</span>
                <ChevronDown className="size-3.5 rotate-180 transition-transform" />
              </>
            )}
          </Button>
        </div>
      )}

      {/* 4. Trust & Policy Hint */}
      <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-300">
        <ShieldCheck className="size-4 text-emerald-500 shrink-0" />
        <span>
          {tMatch("trust_hint")}
        </span>
      </div>
    </Card>
  );
}
