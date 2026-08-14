"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import { Card } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { VenueDetailData } from "@/lib/venue-data";

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
    hostName: "Hoàng Nam",
    hostAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    hostLevel: "Trung bình (3.0)",
    courtName: "Sân 2 (Thảm Yonex)",
    time: "18:00 - 20:00",
    date: "2026-08-14",
    format: "Đôi nam / Đôi nam nữ",
    currentPlayers: 3,
    maxPlayers: 4,
    pricePerPlayer: 45000,
    note: "Cần tìm 1 bạn trình trung bình - khá vào đánh giao lưu vui vẻ, tính tiền chia đều cuối buổi.",
    badge: "Gấp - Cần 1 người 🔥",
    isUrgent: true,
  },
  {
    id: "match-2",
    hostName: "Trần Thu Hà",
    hostAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
    hostLevel: "Khá (3.5)",
    courtName: "Sân 4 (Sân VIP)",
    time: "19:00 - 21:00",
    date: "2026-08-14",
    format: "Đôi nam nữ",
    currentPlayers: 2,
    maxPlayers: 4,
    pricePerPlayer: 55000,
    note: "Sân thảm VIP thoáng mát, nhóm thân thiện bao cầu Thành Công và có nước uống đá chanh miễn phí.",
    badge: "Sân VIP ✨",
    isUrgent: false,
  },
  {
    id: "match-3",
    hostName: "Lê Quốc Bảo",
    hostAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    hostLevel: "Mới chơi - Trung bình",
    courtName: "Sân 1 (Thảm Enlio)",
    time: "17:00 - 19:00",
    date: "2026-08-14",
    format: "Đánh đôi tự do",
    currentPlayers: 1,
    maxPlayers: 4,
    pricePerPlayer: 40000,
    note: "Nhóm mới tập chơi được 3 tháng, tìm thêm các bạn vui vẻ giao lưu học hỏi kinh nghiệm.",
    badge: "Mới mở kèo",
    isUrgent: false,
  },
  {
    id: "match-4",
    hostName: "Đặng Tiến Dũng",
    hostAvatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=120&q=80",
    hostLevel: "Khá - Giỏi (4.0)",
    courtName: "Sân 3 (Thảm Yonex)",
    time: "20:00 - 22:00",
    date: "2026-08-14",
    format: "Đôi nam căng thẳng",
    currentPlayers: 3,
    maxPlayers: 4,
    pricePerPlayer: 50000,
    note: "Kèo đánh giao lưu có độ va chạm cao, tìm 1 bạn nam tay cứng đánh cầu đập uy lực.",
    badge: "Kèo Căng 🔥",
    isUrgent: true,
  },
  {
    id: "match-5",
    hostName: "Nguyễn Minh Trí",
    hostAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
    hostLevel: "Trung bình - Khá",
    courtName: "Sân 5 (Sân Trung Tâm)",
    time: "17:30 - 19:30",
    date: "2026-08-14",
    format: "Đôi nam nữ / Đôi nam",
    currentPlayers: 2,
    maxPlayers: 4,
    pricePerPlayer: 45000,
    note: "Sân mới lót thảm cực bám chân, đèn sáng tiêu chuẩn. Nhóm đánh vui vẻ, không toxic.",
    badge: "Đang mở kèo ✨",
    isUrgent: false,
  },
  {
    id: "match-6",
    hostName: "Vũ Thùy Linh",
    hostAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    hostLevel: "Khá (3.0 - 3.5)",
    courtName: "Sân 6 (Sân VIP)",
    time: "20:00 - 22:00",
    date: "2026-08-14",
    format: "Đôi nữ / Giao lưu",
    currentPlayers: 3,
    maxPlayers: 4,
    pricePerPlayer: 50000,
    note: "Tuyển thêm 1 bạn nữ hoặc nam đánh nắn nót vào giao lưu cùng nhóm.",
    badge: "Gấp - Cần 1 người 🔥",
    isUrgent: true,
  },
];

interface VenueMatchmakingSectionProps {
  venue: VenueDetailData;
  onOpenCreateMatch?: () => void;
}

const INITIAL_VISIBLE_COUNT = 2;

export function VenueMatchmakingSection({ venue, onOpenCreateMatch }: VenueMatchmakingSectionProps) {
  const [joinedIds, setJoinedIds] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  const handleToggleJoin = (id: string) => {
    setJoinedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const hasMore = visibleCount < MOCK_MATCHES.length;
  const isExpanded = visibleCount > INITIAL_VISIBLE_COUNT;

  const handleToggleExpand = () => {
    if (hasMore) {
      setVisibleCount(MOCK_MATCHES.length);
    } else {
      setVisibleCount(INITIAL_VISIBLE_COUNT);
    }
  };

  return (
    <Card className="rounded-3xl border border-border/80 bg-card p-4 sm:p-5 space-y-4 shadow-sm">
      {/* 1. Section Header & CTA Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-3.5">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
              <Users className="size-5 text-amber-500 shrink-0" />
              <span>Sàn Kèo Ghép Vãng Lai</span>
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-bold border border-amber-500/20 shrink-0">
              {MOCK_MATCHES.length} kèo
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Tham gia ngay các trận đấu thiếu người hôm nay hoặc tự đăng kèo mới để mời đối thủ cùng chơi
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
          <Button
            type="button"
            onClick={onOpenCreateMatch}
            className="h-9 px-3.5 sm:px-4 rounded-xl bg-gradient-primary text-white font-bold text-xs shadow-xs hover:opacity-95 active:scale-95 transition-all cursor-pointer shrink-0 flex items-center gap-1.5 border-0"
          >
            <UserPlus className="size-4 shrink-0" />
            <span>+ Đăng kèo ghép mới</span>
          </Button>
        </div>
      </div>

      {/* 2. Responsive Matches Grid (2 Columns on Desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
        {MOCK_MATCHES.slice(0, visibleCount).map((match) => {
          const isJoined = joinedIds.includes(match.id);
          const progressPercent = Math.round((match.currentPlayers / match.maxPlayers) * 100);

          return (
            <div
              key={match.id}
              className="p-4 rounded-2xl bg-card border border-border/80 hover:border-brand-blue/50 transition-all space-y-3 shadow-2xs relative overflow-hidden flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Host Info & Badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={match.hostAvatar}
                      alt={match.hostName}
                      className="size-9.5 rounded-full object-cover border border-border shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs sm:text-sm text-foreground truncate flex items-center gap-1.5">
                        {match.hostName}
                        <span className="text-[10px] font-semibold text-muted-foreground">
                          (Chủ kèo)
                        </span>
                      </h4>
                      <span className="text-[11px] font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1 truncate">
                        <Trophy className="size-3 shrink-0" />
                        {match.hostLevel}
                      </span>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 text-[10px] sm:text-[11px] font-bold border border-amber-500/20 shrink-0">
                    {match.badge}
                  </span>
                </div>

                {/* Slot Details Grid */}
                <div className="p-2.5 rounded-xl bg-muted/30 border border-border/60 grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-foreground/90 min-w-0">
                    <MapPin className="size-3.5 text-brand-blue shrink-0" />
                    <span className="truncate font-semibold">{match.courtName}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-foreground/90 min-w-0">
                    <Clock className="size-3.5 text-brand-green shrink-0" />
                    <span className="truncate font-semibold">{match.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-foreground/90 min-w-0">
                    <UserCheck className="size-3.5 text-blue-500 shrink-0" />
                    <span className="font-semibold">{match.currentPlayers}/{match.maxPlayers} người</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold text-brand-blue dark:text-brand-green truncate">
                    <span>{match.pricePerPlayer.toLocaleString("vi-VN")}đ / người</span>
                  </div>
                </div>

                {/* Player Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-muted-foreground font-medium">
                    <span>Tiến độ ghép nhóm</span>
                    <span className="font-semibold text-foreground">
                      {match.currentPlayers === match.maxPlayers
                        ? "Đã đủ người"
                        : `Còn thiếu ${match.maxPlayers - match.currentPlayers} người`}
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
                <p className="text-xs text-muted-foreground bg-muted/20 p-2.5 rounded-xl border border-border/50 italic leading-relaxed">
                  "{match.note}"
                </p>
              </div>

              {/* Action CTA */}
              <div className="pt-2 flex items-center justify-between gap-2 border-t border-border/40">
                <span className="text-[11px] text-muted-foreground font-medium">
                  Hình thức: <strong className="text-foreground">{match.format}</strong>
                </span>

                <button
                  type="button"
                  onClick={() => handleToggleJoin(match.id)}
                  className={`h-8.5 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    isJoined
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                      : "bg-gradient-primary text-white shadow-xs hover:opacity-95 active:scale-95"
                  }`}
                >
                  {isJoined ? (
                    <>
                      <CheckCircle2 className="size-4 text-emerald-500" />
                      <span>Đã xin vào kèo</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="size-4" />
                      <span>Xin vào kèo</span>
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
            className="w-full sm:w-auto h-9 px-6 text-xs font-bold rounded-xl border-border/80 hover:bg-muted/70 cursor-pointer transition-all shadow-2xs hover:border-brand-blue/40 flex items-center justify-center gap-1.5"
          >
            {hasMore ? (
              <>
                <span>Xem tất cả ({MOCK_MATCHES.length} kèo ghép)</span>
                <ChevronRight className="size-3.5 transition-transform" />
              </>
            ) : (
              <>
                <span>Thu gọn danh sách</span>
                <ChevronDown className="size-3.5 rotate-180 transition-transform" />
              </>
            )}
          </Button>
        </div>
      )}

      {/* 4. Trust & Policy Hint */}
      <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-300">
        <ShieldCheck className="size-4 text-emerald-500 shrink-0" />
        <span>
          <strong>Cam kết giữ chỗ:</strong> 100% kèo đấu ghép vãng lai được hỗ trợ khớp lịch và xác nhận giữ chỗ từ chủ sân.
        </span>
      </div>
    </Card>
  );
}
