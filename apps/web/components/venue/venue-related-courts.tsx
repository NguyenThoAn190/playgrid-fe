"use client";

import React from "react";
import { Link } from "@/i18n/navigation";
import { ChevronRight, Compass } from "lucide-react";
import { CourtCard, CourtData } from "@/components/courts/court-card";

const NEARBY_COURTS: CourtData[] = [
  {
    id: "viettel-badminton",
    name: "Sân Cầu Lông Viettel Hùng Vương",
    location: "Quận 10, TP. HCM",
    distance: "1.8 km từ Phú Thọ",
    rating: 4.9,
    reviewsCount: 96,
    price: "150.000đ/giờ",
    badge: "Hot",
    sports: ["Cầu lông"],
    imageUrl: "/images/explore_sports/gridy-badminton.avif",
  },
  {
    id: "khang-an-sports",
    name: "Cụm Sân Thể Thao Khang An",
    location: "Gò Vấp, TP. HCM",
    distance: "4.5 km",
    rating: 4.8,
    reviewsCount: 142,
    price: "160.000đ/giờ",
    badge: "Gần bạn",
    sports: ["Cầu lông", "Pickleball"],
    imageUrl: "/images/activities/badminton-banner.png",
  },
  {
    id: "pickleball-club-q2",
    name: "CLB Pickleball Thảo Điền Quận 2",
    location: "Quận 2, TP. HCM",
    distance: "6.2 km",
    rating: 4.9,
    reviewsCount: 156,
    price: "220.000đ/giờ",
    badge: "Hot",
    sports: ["Pickleball"],
    imageUrl: "/images/explore_sports/gridy-pickleball.avif",
  },
];

export function VenueRelatedCourts() {
  return (
    <div className="space-y-3 pt-2">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Compass className="size-5 text-brand-blue" />
            Sân thể thao nổi bật lân cận
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Khám phá thêm các cụm sân chất lượng cao khác
          </p>
        </div>

        <Link
          href="/badminton/venue"
          className="flex items-center gap-1 text-xs font-bold text-brand-blue dark:text-brand-green hover:underline"
        >
          <span>Xem tất cả</span>
          <ChevronRight className="size-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {NEARBY_COURTS.map((court) => (
          <CourtCard key={court.id} court={court} />
        ))}
      </div>
    </div>
  );
}
