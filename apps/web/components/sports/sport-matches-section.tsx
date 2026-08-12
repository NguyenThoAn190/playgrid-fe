"use client";

import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Users, Clock, MapPin, Zap, ArrowRight, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface SportMatchesSectionProps {
  sportName?: string;
}

const BADMINTON_MATCHES = [
  {
    id: "match-1",
    title: "Giao lưu Cầu lông Đôi Nam Nữ - Sân Khang An",
    hostName: "Nguyễn Văn Hùng",
    hostAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    skillLevel: "Trung bình (Intermediate)",
    location: "Sân Cầu Lông Khang An, Thủ Đức",
    time: "19:00 - 21:00 • Tối nay",
    neededSlots: 2,
    costPerPerson: "45.000đ/người",
    statusBadge: "Cần 2 người",
    sport: "Cầu lông",
  },
  {
    id: "match-2",
    title: "Kèo Cầu lông Đôi Nam - Cọ xát nâng cao tay nghề",
    hostName: "Trần Anh Tuấn",
    hostAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    skillLevel: "Khá - Giỏi (Advanced)",
    location: "Sân VNB Sports Center, Tân Bình",
    time: "20:00 - 22:00 • Tối nay",
    neededSlots: 1,
    costPerPerson: "50.000đ/người",
    statusBadge: "Còn 1 slot",
    sport: "Cầu lông",
  },
  {
    id: "match-3",
    title: "Giao lưu Vui Vẻ - Nhận người mới tập chơi",
    hostName: "Lê Minh Khoa",
    hostAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    skillLevel: "Mới chơi (Beginner)",
    location: "Sân Cầu Lông Phú Thọ, Q.11",
    time: "18:00 - 20:00 • Tối mai",
    neededSlots: 3,
    costPerPerson: "40.000đ/người",
    statusBadge: "Cần 3 người",
    sport: "Cầu lông",
  },
];

export function SportMatchesSection({ sportName = "Cầu Lông" }: SportMatchesSectionProps) {
  return (
    <section id="matches" className="w-full py-8 sm:py-12 bg-background text-foreground transition-colors border-b border-border/40 scroll-mt-24">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-500" />
              <span>Kèo Ghép Giao Lưu {sportName} Đang Mở</span>
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground pt-1">
              Tham gia ghép đội chơi giao lưu, tìm đối thủ cùng trình độ xung quanh bạn.
            </p>
          </div>

          <Link
            href="/activities"
            className="group flex items-center gap-1 text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline transition-colors shrink-0"
          >
            <span>Tất cả kèo ghép</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Matchmaking Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {BADMINTON_MATCHES.map((match) => (
            <div
              key={match.id}
              className="group relative rounded-2xl bg-card border border-border/70 p-5 shadow-xs hover:shadow-md hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Top Badge & Host info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src={match.hostAvatar}
                      alt={match.hostName}
                      width={32}
                      height={32}
                      className="rounded-full object-cover border border-border shrink-0"
                    />
                    <span className="text-xs font-semibold text-foreground truncate">{match.hostName}</span>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    {match.statusBadge}
                  </span>
                </div>

                {/* Match Title */}
                <h3 className="font-bold text-sm sm:text-base text-foreground group-hover:text-amber-500 transition-colors line-clamp-2">
                  {match.title}
                </h3>

                {/* Details */}
                <div className="space-y-1.5 text-xs text-muted-foreground pt-1">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{match.time}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span className="truncate">{match.location}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Trình độ: <strong className="text-foreground">{match.skillLevel}</strong></span>
                  </div>
                </div>
              </div>

              {/* Cost & Join Action */}
              <div className="pt-4 mt-4 border-t border-border/40 flex items-center justify-between">
                <div>
                  <span className="text-xs text-muted-foreground block">Chi phí chia sòng</span>
                  <span className="text-sm font-extrabold text-amber-600 dark:text-amber-400">
                    {match.costPerPerson}
                  </span>
                </div>

                <Link href={`/activities/${match.id}`}>
                  <Button className="rounded-xl font-bold text-xs px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xs hover:opacity-95 cursor-pointer">
                    <UserPlus className="w-3.5 h-3.5 mr-1" />
                    Tham gia
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
