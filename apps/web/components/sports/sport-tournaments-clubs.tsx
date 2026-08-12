"use client";

import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Trophy, UserCheck, Calendar, Award, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface SportTournamentsClubsProps {
  sportName?: string;
}

const BADMINTON_TOURNAMENTS = [
  {
    id: "tourney-1",
    name: "Giải Cầu Lông Phong Trào TP.HCM Mở Rộng 2026",
    dates: "25/08 - 28/08/2026",
    location: "Nhà Thi Đấu Phú Thọ, Q.11",
    prizePool: "50.000.000đ",
    statusBadge: "Đang mở đăng ký",
    participants: "64 Cặp Vận Động Viên",
    imageUrl: "/images/activities/badminton-hero.png",
  },
  {
    id: "tourney-2",
    name: "Giải Cầu Lông Đôi Nam Nữ Doanh Nghiệp Trẻ",
    dates: "12/09/2026",
    location: "Sân VNB Sports Center, Tân Bình",
    prizePool: "20.000.000đ",
    statusBadge: "Còn 8 slot",
    participants: "32 Cặp Đôi",
    imageUrl: "/images/activities/badminton-banner.png",
  },
];

const BADMINTON_CLUBS = [
  {
    id: "club-thumpers",
    name: "CLB Cầu Lông Thủ Đức Thumpers",
    schedule: "Sinh hoạt: T2 - T4 - T6 (18:00 - 21:00)",
    location: "Sân Khang An, Thủ Đức",
    members: 142,
    rating: 4.9,
    imageUrl: "/images/explore_sports/gridy-badminton.avif",
  },
  {
    id: "club-vnb-smashers",
    name: "CLB Cầu Lông VNB Smashers",
    schedule: "Sinh hoạt: T3 - T5 - T7 (19:00 - 22:00)",
    location: "Sân VNB Sports, Tân Bình",
    members: 98,
    rating: 4.8,
    imageUrl: "/images/activities/badminton-banner.png",
  },
];

export function SportTournamentsClubs({ sportName = "Cầu Lông" }: SportTournamentsClubsProps) {
  return (
    <div className="w-full py-8 sm:py-12 bg-background text-foreground transition-colors border-b border-border/40 space-y-12">
      {/* TOURNAMENTS SECTION */}
      <section id="tournaments" className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 space-y-6 scroll-mt-24">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Trophy className="w-5 h-5 text-purple-500" />
              <span>Giải Đấu {sportName} Sắp Diễn Ra</span>
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground pt-1">
              Đăng ký tham gia tranh tài tại các giải đấu cầu lông phong trào lớn nhất.
            </p>
          </div>

          <Link
            href="/events"
            className="group flex items-center gap-1 text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline transition-colors shrink-0"
          >
            <span>Tất cả giải đấu</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BADMINTON_TOURNAMENTS.map((tourney) => (
            <div
              key={tourney.id}
              className="group relative rounded-2xl bg-card border border-border/70 overflow-hidden shadow-xs hover:shadow-md hover:border-purple-500/50 transition-all duration-300 flex flex-col sm:flex-row"
            >
              <div className="relative w-full sm:w-48 aspect-[16/10] sm:aspect-auto overflow-hidden bg-slate-900 shrink-0">
                <Image
                  src={tourney.imageUrl}
                  alt={tourney.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="200px"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-purple-600 text-white font-bold text-[10px]">
                  {tourney.statusBadge}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-bold text-base text-foreground group-hover:text-purple-500 transition-colors line-clamp-1">
                    {tourney.name}
                  </h3>

                  <div className="space-y-1 text-xs text-muted-foreground pt-1.5">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                      <span>{tourney.dates}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>Giải thưởng: <strong className="text-foreground">{tourney.prizePool}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-border/40 pt-2">
                  <span className="text-xs text-muted-foreground font-medium">{tourney.participants}</span>
                  <Link href={`/events/${tourney.id}`}>
                    <Button className="rounded-xl font-bold text-xs px-3.5 py-1.5 h-8 bg-purple-600 hover:bg-purple-700 text-white cursor-pointer">
                      Xem chi tiết
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CLUBS SECTION */}
      <section id="clubs" className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 space-y-6 scroll-mt-24">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-emerald-500" />
              <span>Câu Lạc Bộ {sportName} Nổi Bật</span>
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground pt-1">
              Gia nhập câu lạc bộ sinh hoạt thường xuyên để rèn luyện kỹ năng mỗi tuần.
            </p>
          </div>

          <Link
            href="/clubs"
            className="group flex items-center gap-1 text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline transition-colors shrink-0"
          >
            <span>Tất cả CLB</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BADMINTON_CLUBS.map((club) => (
            <div
              key={club.id}
              className="group relative rounded-2xl bg-card border border-border/70 p-4 shadow-xs hover:shadow-md hover:border-emerald-500/50 transition-all duration-300 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden shrink-0 border border-border">
                  <Image src={club.imageUrl} alt={club.name} fill className="object-cover" sizes="60px" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-sm sm:text-base text-foreground group-hover:text-emerald-500 transition-colors truncate">
                    {club.name}
                  </h3>
                  <p className="text-xs text-muted-foreground truncate pt-0.5">{club.schedule}</p>
                  <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 pt-1">
                    {club.members} thành viên • ★ {club.rating}
                  </div>
                </div>
              </div>

              <Link href={`/clubs/${club.id}`} className="shrink-0">
                <Button variant="outline" className="rounded-xl font-bold text-xs px-3.5 py-1.5 h-8 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 cursor-pointer">
                  Xin gia nhập
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
