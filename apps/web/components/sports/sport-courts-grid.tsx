"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Star, MapPin, ArrowRight, ShieldCheck, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface SportCourtsGridProps {
  sportName?: string;
}

const BADMINTON_COURTS = [
  {
    id: "khang-an-badminton",
    name: "Clb Cầu Lông Khang An",
    location: "Thủ Đức, TP. HCM",
    distance: "1.2 km",
    rating: 4.9,
    reviewsCount: 184,
    price: "180.000đ/giờ",
    courtType: "Thảm PVC BWF Standard",
    availableSlots: "Còn 3 sân trống (18:00 - 21:00)",
    imageUrl: "/images/explore_sports/gridy-badminton.avif",
    badge: "Phổ biến nhất",
  },
  {
    id: "vnb-sports-center",
    name: "Sân Cầu Lông VNB Sports",
    location: "Tân Bình, TP. HCM",
    distance: "3.5 km",
    rating: 4.8,
    reviewsCount: 142,
    price: "160.000đ/giờ",
    courtType: "Thảm Hải Yến Tiêu chuẩn",
    availableSlots: "Còn 2 sân trống (19:00 - 22:00)",
    imageUrl: "/images/activities/badminton-banner.png",
    badge: "Đánh giá tốt",
  },
  {
    id: "phu-tho-badminton",
    name: "Sân Cầu Lông Phú Thọ",
    location: "Quận 11, TP. HCM",
    distance: "5.1 km",
    rating: 4.7,
    reviewsCount: 215,
    price: "150.000đ/giờ",
    courtType: "Thảm PVC Chống trượt",
    availableSlots: "Còn 5 sân trống (17:00 - 20:00)",
    imageUrl: "/images/activities/badminton-hero.png",
    badge: "Sân rộng",
  },
  {
    id: "viettel-badminton",
    name: "Sân Cầu Lông Viettel Hùng Vương",
    location: "Quận 10, TP. HCM",
    distance: "4.8 km",
    rating: 4.9,
    reviewsCount: 96,
    price: "200.000đ/giờ",
    courtType: "Thảm Thể Thao Cao Cấp",
    availableSlots: "Còn 1 sân trống (20:00 - 22:00)",
    imageUrl: "/images/explore_sports/gridy-badminton.avif",
    badge: "VIP sân đẹp",
  },
];

const DISTRICTS = ["Tất cả Quận", "Thủ Đức", "Tân Bình", "Quận 10", "Quận 11"];

export function SportCourtsGrid({ sportName = "Cầu Lông" }: SportCourtsGridProps) {
  const [selectedDistrict, setSelectedDistrict] = useState("Tất cả Quận");

  const filteredCourts =
    selectedDistrict === "Tất cả Quận"
      ? BADMINTON_COURTS
      : BADMINTON_COURTS.filter((c) => c.location.includes(selectedDistrict));

  return (
    <section id="courts" className="w-full py-8 sm:py-12 bg-background text-foreground transition-colors border-b border-border/40 scroll-mt-24">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Section Header & Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Sân {sportName} Nổi Bật Gần Bạn</span>
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground pt-1">
              Đặt lịch sân tiêu chuẩn, thảm êm, đầy đủ hệ thống đèn chiếu sáng & máy lạnh.
            </p>
          </div>

          {/* District Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
            <Filter className="w-4 h-4 text-muted-foreground mr-1 shrink-0 hidden sm:block" />
            {DISTRICTS.map((dist) => (
              <button
                key={dist}
                type="button"
                onClick={() => setSelectedDistrict(dist)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedDistrict === dist
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {dist}
              </button>
            ))}
          </div>
        </div>

        {/* Courts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredCourts.map((court) => (
            <div
              key={court.id}
              className="group relative rounded-2xl bg-card border border-border/70 overflow-hidden shadow-xs hover:shadow-md hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Banner */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-900">
                  <Image
                    src={court.imageUrl}
                    alt={court.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-[11px] font-bold text-emerald-400 border border-emerald-500/30">
                    {court.badge}
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-lg bg-slate-950/80 backdrop-blur-md text-[11px] font-bold text-amber-400 flex items-center gap-1 border border-amber-500/30">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{court.rating}</span>
                  </div>
                </div>

                {/* Content Info */}
                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-base text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                    {court.name}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span className="truncate">{court.location}</span>
                    <span className="shrink-0 font-semibold text-foreground">• {court.distance}</span>
                  </div>

                  <div className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg">
                    {court.availableSlots}
                  </div>
                </div>
              </div>

              {/* Card Footer: Pricing & Action */}
              <div className="p-4 pt-0 flex items-center justify-between border-t border-border/40 mt-3 pt-3">
                <div>
                  <span className="text-xs text-muted-foreground block">Giá từ</span>
                  <span className="text-sm font-extrabold text-blue-600 dark:text-blue-400">
                    {court.price}
                  </span>
                </div>

                <Link href={`/courts/${court.id}`}>
                  <Button className="rounded-xl font-bold text-xs px-3.5 py-1.5 h-8 bg-gradient-primary text-white hover:opacity-95 cursor-pointer">
                    Đặt sân
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
