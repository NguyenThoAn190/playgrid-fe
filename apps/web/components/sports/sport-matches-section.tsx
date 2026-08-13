"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { Link } from "@/i18n/navigation";
import { Users, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { FindPlayerCard, ActivityData } from "@/components/activities/find-player-card";

export interface SportMatchesSectionProps {
  sportName?: string;
}

const BADMINTON_MATCHES: ActivityData[] = [
  {
    id: "match-1",
    title: "Giao lưu Cầu lông Đôi Nam Nữ - Sân Khang An",
    sport: "Cầu lông",
    statusBadge: "Cần 2 người",
    statusType: "available",
    level: "Trung bình (Intermediate)",
    price: "45.000đ",
    date: "Hôm nay",
    time: "19:00 - 21:00",
    location: "Sân Cầu Lông Khang An, Thủ Đức",
    imageUrl: "/images/activities/badminton-banner.png",
    joinedCount: 2,
    maxCount: 4,
    participants: [
      { id: "u1", name: "Nguyễn Văn Hùng", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" },
      { id: "u2", name: "Trần Anh Tuấn", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" },
    ],
  },
  {
    id: "match-2",
    title: "Kèo Cầu lông Đôi Nam - Cọ xát nâng cao tay nghề",
    sport: "Cầu lông",
    statusBadge: "Còn 1 slot",
    statusType: "available",
    level: "Khá - Giỏi (Advanced)",
    price: "50.000đ",
    date: "Hôm nay",
    time: "20:00 - 22:00",
    location: "Sân VNB Sports Center, Tân Bình",
    imageUrl: "/images/activities/badminton-banner.png",
    joinedCount: 3,
    maxCount: 4,
    participants: [
      { id: "u2", name: "Trần Anh Tuấn", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" },
      { id: "u3", name: "Lê Minh Khoa", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" },
      { id: "u4", name: "Phạm Quốc Bảo", avatarUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80" },
    ],
  },
  {
    id: "match-3",
    title: "Giao lưu Vui Vẻ - Nhận người mới tập chơi",
    sport: "Cầu lông",
    statusBadge: "Cần 3 người",
    statusType: "available",
    level: "Mới chơi (Beginner)",
    price: "40.000đ",
    date: "Ngày mai",
    time: "18:00 - 20:00",
    location: "Sân Cầu Lông Phú Thọ, Q.11",
    imageUrl: "/images/explore_sports/gridy-badminton.avif",
    joinedCount: 1,
    maxCount: 4,
    participants: [
      { id: "u3", name: "Lê Minh Khoa", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" },
    ],
  },
];

const PICKLEBALL_MATCHES: ActivityData[] = [
  {
    id: "match-pb-1",
    title: "Giao lưu Pickleball Đôi Nam Nữ - Sân Quận 2",
    sport: "Pickleball",
    statusBadge: "Cần 2 người",
    statusType: "available",
    level: "Trình 3.0 - 3.5",
    price: "60.000đ",
    date: "Hôm nay",
    time: "19:00 - 21:00",
    location: "Pickleball Club Quận 2",
    imageUrl: "/images/activities/pickleball-banner.png",
    joinedCount: 2,
    maxCount: 4,
    participants: [
      { id: "u4", name: "Trịnh Linh Giang", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" },
      { id: "u5", name: "Sophia Huỳnh", avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80" },
    ],
  },
  {
    id: "match-pb-2",
    title: "Kèo Pickleball Cọ Xát Nâng Cao - Sân Khang An",
    sport: "Pickleball",
    statusBadge: "Còn 1 slot",
    statusType: "available",
    level: "Trình 3.5+",
    price: "70.000đ",
    date: "Hôm nay",
    time: "20:00 - 22:00",
    location: "Sân Pickleball Khang An, Thủ Đức",
    imageUrl: "/images/explore_sports/gridy-pickleball.avif",
    joinedCount: 3,
    maxCount: 4,
    participants: [
      { id: "u6", name: "Huỳnh Chí Khương", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" },
      { id: "u7", name: "Trần Thanh Trúc", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" },
      { id: "u8", name: "Phạm Minh Đạt", avatarUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80" },
    ],
  },
  {
    id: "match-pb-3",
    title: "Giao lưu Vui Vẻ - Hướng dẫn newbie mới tập chơi",
    sport: "Pickleball",
    statusBadge: "Cần 3 người",
    statusType: "available",
    level: "Mới chơi (2.0 - 2.5)",
    price: "50.000đ",
    date: "Ngày mai",
    time: "18:00 - 20:00",
    location: "Sài Gòn Pickleball Arena, Q.7",
    imageUrl: "/images/activities/pickleball-banner.png",
    joinedCount: 1,
    maxCount: 4,
    participants: [
      { id: "u6", name: "Huỳnh Chí Khương", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" },
    ],
  },
];

export function SportMatchesSection({ sportName = "Cầu Lông" }: SportMatchesSectionProps) {
  const isPickleball = sportName.toLowerCase().includes("pickleball");
  const rawMatches = isPickleball ? PICKLEBALL_MATCHES : BADMINTON_MATCHES;

  const matches = rawMatches.map((m) => ({
    ...m,
    sport: sportName,
  }));

  const infiniteMatches = [...matches, ...matches, ...matches];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isResettingRef = useRef(false);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const singleSetWidth = container.scrollWidth / 3;
      container.scrollLeft = singleSetWidth;
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (isResettingRef.current || !scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const singleSetWidth = container.scrollWidth / 3;

    if (container.scrollLeft >= singleSetWidth * 2) {
      isResettingRef.current = true;
      container.scrollLeft -= singleSetWidth;
      setTimeout(() => {
        isResettingRef.current = false;
      }, 50);
    } else if (container.scrollLeft <= 20) {
      isResettingRef.current = true;
      container.scrollLeft += singleSetWidth;
      setTimeout(() => {
        isResettingRef.current = false;
      }, 50);
    }
  }, []);

  const scroll = useCallback((direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.firstElementChild?.clientWidth || 300;
      const gap = 12;
      const scrollAmount = cardWidth + gap;

      if (direction === "right") {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    }
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      scroll("right");
    }, 3500);
    return () => clearInterval(interval);
  }, [isHovered, scroll]);

  return (
    <section id="matches" className="w-full py-5 sm:py-7 bg-background text-foreground transition-colors overflow-hidden border-b border-border/40 scroll-mt-24">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 space-y-5 sm:space-y-6">
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

        {/* Matchmaking Cards Slider */}
        <div
          className="relative group/carousel"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          {/* Left Navigation Arrow */}
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 border border-border shadow-lg text-foreground transition-all hover:bg-muted active:scale-95 cursor-pointer backdrop-blur-xs opacity-0 group-hover/carousel:opacity-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Continuous Infinite Horizontal Scroll List */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex items-stretch overflow-x-auto scrollbar-none snap-x snap-mandatory gap-3 pt-3 pb-3 px-1"
          >
            {infiniteMatches.map((activity, index) => (
              <div
                key={`${activity.id}-infinite-${index}`}
                className="w-[80vw] sm:w-[calc((100%-12px)/2)] lg:w-[calc((100%-24px)/3)] shrink-0 snap-start"
              >
                <FindPlayerCard activity={activity} className="h-full" />
              </div>
            ))}
          </div>

          {/* Right Navigation Arrow */}
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 border border-border shadow-lg text-foreground transition-all hover:bg-muted active:scale-95 cursor-pointer backdrop-blur-xs opacity-0 group-hover/carousel:opacity-100 sm:opacity-100"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}


