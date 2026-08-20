"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { Link } from "@/i18n/navigation";
import { Trophy, UserCheck, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { EventCard, EventData } from "@/components/events/event-card";
import { ClubCard, ClubData } from "@/components/clubs/club-card";

export interface SportTournamentsClubsProps {
  sportName?: string;
}

const BADMINTON_TOURNAMENTS: EventData[] = [
  {
    id: "hanoi-badminton-open-2026",
    title: "Giải Cầu Lông Hà Nội Open 2026 - Mở Rộng",
    category: "Cầu lông",
    distanceText: "Tổng giải: 120.000.000đ",
    badge: {
      type: "hot",
      text: "Đang Mở Đơn",
    },
    date: "20 - 22 Tháng 10, 2026",
    location: "Nhà Thi Đấu Trịnh Hoài Đức, Hà Nội",
    price: "250.000đ",
    priceSubtext: "Lệ phí từ",
    imageUrl: "/images/activities/badminton-banner.png",
    buttonText: "Đăng ký",
  },
  {
    id: "tourney-2",
    title: "Cúp Doanh Nghiệp Trẻ 2026",
    category: "Cầu lông",
    distanceText: "Tổng giải: 20.000.000đ",
    badge: {
      type: "recommended",
      text: "Đề xuất",
    },
    date: "12/09/2026",
    location: "VNB Sports Center, Tân Bình",
    price: "300.000đ",
    priceSubtext: "Lệ phí từ",
    imageUrl: "/images/activities/badminton-banner.png",
    buttonText: "Đăng ký",
  },
  {
    id: "tourney-3",
    title: "Cúp Cầu Lông Khang An Open",
    category: "Cầu lông",
    distanceText: "Tổng giải: 35.000.000đ",
    badge: {
      type: "hot",
      text: "Nổi bật",
    },
    date: "05/10 - 08/10/2026",
    location: "Khang An Club, Thủ Đức",
    price: "280.000đ",
    priceSubtext: "Lệ phí từ",
    imageUrl: "/images/explore_sports/gridy-badminton.avif",
    buttonText: "Đăng ký",
  },
];

const BADMINTON_CLUBS: ClubData[] = [
  {
    id: "club-thumpers",
    name: "CLB Cầu Lông Thủ Đức",
    coverUrl: "/images/activities/badminton-hero.png",
    logoUrl: "/images/explore_sports/gridy-badminton.avif",
    logoText: "TDTH",
    isVerified: true,
    isVip: true,
    rating: 4.9,
    reviewCount: 86,
    memberCount: 142,
    location: "Thủ Đức, TP. HCM",
    sport: "Cầu lông",
  },
  {
    id: "club-vnb-smashers",
    name: "CLB Cầu Lông VNB",
    coverUrl: "/images/activities/badminton-banner.png",
    logoUrl: "/images/explore_sports/gridy-badminton.avif",
    logoText: "VNBS",
    isVerified: true,
    isVip: true,
    rating: 4.8,
    reviewCount: 64,
    memberCount: 98,
    location: "Tân Bình, TP. HCM",
    sport: "Cầu lông",
  },
  {
    id: "club-phu-tho-star",
    name: "CLB Cầu Lông Phú Thọ",
    coverUrl: "/images/explore_sports/gridy-badminton.avif",
    logoUrl: "/images/activities/badminton-hero.png",
    logoText: "PTST",
    isVerified: true,
    isVip: true,
    rating: 4.7,
    reviewCount: 112,
    memberCount: 185,
    location: "Quận 11, TP. HCM",
    sport: "Cầu lông",
  },
  {
    id: "club-tada-badminton",
    name: "CLB Cầu Lông Tada Q.7",
    coverUrl: "/images/clubs/tada-club.png",
    logoUrl: "/images/explore_sports/gridy-badminton.avif",
    logoText: "TADA",
    isVerified: true,
    isVip: true,
    rating: 4.9,
    reviewCount: 130,
    memberCount: 220,
    location: "Quận 7, TP. HCM",
    sport: "Cầu lông",
  },
];

const PICKLEBALL_TOURNAMENTS: EventData[] = [
  {
    id: "tourney-pb-1",
    title: "Giải Pickleball TP.HCM Mở Rộng",
    category: "Pickleball",
    distanceText: "64 Cặp Đôi",
    badge: {
      type: "hot",
      text: "Nổi bật",
    },
    date: "18/09 - 20/09/2026",
    location: "Pickleball Club Q.2, TP. HCM",
    price: "60.000.000đ",
    priceSubtext: "Tổng giải thưởng",
    imageUrl: "/images/explore_sports/gridy-pickleball.avif",
    buttonText: "Xem chi tiết",
  },
  {
    id: "tourney-pb-2",
    title: "Cúp Doanh Nhân Trẻ Pickleball",
    category: "Pickleball",
    distanceText: "32 Cặp Đôi",
    badge: {
      type: "recommended",
      text: "Đề xuất",
    },
    date: "10/10/2026",
    location: "Saigon Arena, Q.7",
    price: "30.000.000đ",
    priceSubtext: "Tổng giải thưởng",
    imageUrl: "/images/activities/pickleball-banner.png",
    buttonText: "Xem chi tiết",
  },
  {
    id: "tourney-pb-3",
    title: "Cúp Pickleball Khang An Open",
    category: "Pickleball",
    distanceText: "48 Cặp Đôi",
    badge: {
      type: "hot",
      text: "Nổi bật",
    },
    date: "15/11 - 18/11/2026",
    location: "Khang An Club, Thủ Đức",
    price: "40.000.000đ",
    priceSubtext: "Tổng giải thưởng",
    imageUrl: "/images/explore_sports/gridy-pickleball.avif",
    buttonText: "Xem chi tiết",
  },
];

const PICKLEBALL_CLUBS: ClubData[] = [
  {
    id: "club-pb-q2",
    name: "CLB Pickleball Quận 2",
    coverUrl: "/images/activities/pickleball-banner.png",
    logoUrl: "/images/explore_sports/gridy-pickleball.avif",
    logoText: "PBQ2",
    isVerified: true,
    isVip: true,
    rating: 4.9,
    reviewCount: 94,
    memberCount: 168,
    location: "Quận 2, TP. HCM",
    sport: "Pickleball",
  },
  {
    id: "club-pb-saigon",
    name: "CLB Pickleball Sài Gòn",
    coverUrl: "/images/explore_sports/gridy-pickleball.avif",
    logoUrl: "/images/activities/pickleball-banner.png",
    logoText: "PBSE",
    isVerified: true,
    isVip: true,
    rating: 4.8,
    reviewCount: 78,
    memberCount: 125,
    location: "Quận 7, TP. HCM",
    sport: "Pickleball",
  },
  {
    id: "club-pb-thuduc",
    name: "CLB Pickleball Thủ Đức",
    coverUrl: "/images/activities/pickleball-banner.png",
    logoUrl: "/images/explore_sports/gridy-pickleball.avif",
    logoText: "PBTD",
    isVerified: true,
    isVip: true,
    rating: 4.8,
    reviewCount: 65,
    memberCount: 110,
    location: "Thủ Đức, TP. HCM",
    sport: "Pickleball",
  },
  {
    id: "club-pb-tanbinh",
    name: "CLB Pickleball Tân Bình",
    coverUrl: "/images/clubs/saigon-smash.png",
    logoUrl: "/images/explore_sports/gridy-pickleball.avif",
    logoText: "PBTB",
    isVerified: true,
    isVip: true,
    rating: 4.9,
    reviewCount: 88,
    memberCount: 145,
    location: "Tân Bình, TP. HCM",
    sport: "Pickleball",
  },
];

export function SportTournamentsClubs({ sportName = "Cầu Lông" }: SportTournamentsClubsProps) {
  const isPickleball = sportName.toLowerCase().includes("pickleball");
  const rawTourneys = isPickleball ? PICKLEBALL_TOURNAMENTS : BADMINTON_TOURNAMENTS;
  const rawClubs = isPickleball ? PICKLEBALL_CLUBS : BADMINTON_CLUBS;

  const tournaments: EventData[] = rawTourneys.map((t) => ({
    ...t,
    category: sportName,
  }));

  const clubs: ClubData[] = rawClubs.map((c) => ({
    ...c,
    sport: sportName,
  }));

  const infiniteTournaments = [...tournaments, ...tournaments, ...tournaments];
  const infiniteClubs = [...clubs, ...clubs, ...clubs];

  // Tournament Carousel Refs & Handlers
  const tourneyContainerRef = useRef<HTMLDivElement>(null);
  const [isTourneyHovered, setIsTourneyHovered] = useState(false);
  const isTourneyResettingRef = useRef(false);

  useEffect(() => {
    if (tourneyContainerRef.current) {
      const container = tourneyContainerRef.current;
      container.scrollLeft = container.scrollWidth / 3;
    }
  }, []);

  const handleTourneyScroll = useCallback(() => {
    if (isTourneyResettingRef.current || !tourneyContainerRef.current) return;
    const container = tourneyContainerRef.current;
    const singleSetWidth = container.scrollWidth / 3;

    if (container.scrollLeft >= singleSetWidth * 2) {
      isTourneyResettingRef.current = true;
      container.scrollLeft -= singleSetWidth;
      setTimeout(() => {
        isTourneyResettingRef.current = false;
      }, 50);
    } else if (container.scrollLeft <= 20) {
      isTourneyResettingRef.current = true;
      container.scrollLeft += singleSetWidth;
      setTimeout(() => {
        isTourneyResettingRef.current = false;
      }, 50);
    }
  }, []);

  const scrollTourney = useCallback((direction: "left" | "right") => {
    if (tourneyContainerRef.current) {
      const container = tourneyContainerRef.current;
      const cardWidth = container.firstElementChild?.clientWidth || 340;
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
    if (isTourneyHovered) return;
    const interval = setInterval(() => {
      scrollTourney("right");
    }, 3500);
    return () => clearInterval(interval);
  }, [isTourneyHovered, scrollTourney]);

  // Club Carousel Refs & Handlers
  const clubContainerRef = useRef<HTMLDivElement>(null);
  const [isClubHovered, setIsClubHovered] = useState(false);
  const isClubResettingRef = useRef(false);

  useEffect(() => {
    if (clubContainerRef.current) {
      const container = clubContainerRef.current;
      container.scrollLeft = container.scrollWidth / 3;
    }
  }, []);

  const handleClubScroll = useCallback(() => {
    if (isClubResettingRef.current || !clubContainerRef.current) return;
    const container = clubContainerRef.current;
    const singleSetWidth = container.scrollWidth / 3;

    if (container.scrollLeft >= singleSetWidth * 2) {
      isClubResettingRef.current = true;
      container.scrollLeft -= singleSetWidth;
      setTimeout(() => {
        isClubResettingRef.current = false;
      }, 50);
    } else if (container.scrollLeft <= 20) {
      isClubResettingRef.current = true;
      container.scrollLeft += singleSetWidth;
      setTimeout(() => {
        isClubResettingRef.current = false;
      }, 50);
    }
  }, []);

  const scrollClub = useCallback((direction: "left" | "right") => {
    if (clubContainerRef.current) {
      const container = clubContainerRef.current;
      const cardWidth = container.firstElementChild?.clientWidth || 340;
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
    if (isClubHovered) return;
    const interval = setInterval(() => {
      scrollClub("right");
    }, 4000);
    return () => clearInterval(interval);
  }, [isClubHovered, scrollClub]);

  return (
    <div className="w-full py-5 sm:py-6 bg-background text-foreground transition-colors border-b border-border/40 space-y-8 sm:space-y-10 overflow-hidden">
      {/* TOURNAMENTS SECTION: 3-Card Standard */}
      <section id="tournaments" className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 space-y-4 scroll-mt-24">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-0.5 min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2 truncate">
              <Trophy className="w-5 h-5 text-amber-500 shrink-0" />
              <span>Giải Đấu & Sự Kiện</span>
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-normal line-clamp-1">
              Tranh tài và tích lũy điểm xếp hạng tại các giải đấu {sportName}.
            </p>
          </div>

          <Link
            href="/tournaments"
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:underline transition-colors shrink-0"
          >
            <span>Xem tất cả</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Tournaments Slider: 3-Card Standard */}
        <div
          className="relative group/carousel"
          onMouseEnter={() => setIsTourneyHovered(true)}
          onMouseLeave={() => setIsTourneyHovered(false)}
          onTouchStart={() => setIsTourneyHovered(true)}
          onTouchEnd={() => setIsTourneyHovered(false)}
        >
          {/* Left Navigation Arrow */}
          <button
            type="button"
            onClick={() => scrollTourney("left")}
            aria-label="Scroll left"
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 border border-border/80 shadow-2xs text-foreground transition-all hover:bg-muted active:scale-95 cursor-pointer backdrop-blur-xs opacity-0 group-hover/carousel:opacity-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Continuous Infinite Horizontal Scroll List */}
          <div
            ref={tourneyContainerRef}
            onScroll={handleTourneyScroll}
            className="flex items-stretch overflow-x-auto scrollbar-none snap-x snap-mandatory gap-3 pt-1 pb-1 px-1"
          >
            {infiniteTournaments.map((event, index) => (
              <div
                key={`${event.id}-infinite-${index}`}
                className="w-[80vw] sm:w-[calc((100%-12px)/2)] lg:w-[calc((100%-24px)/3)] shrink-0 snap-start"
              >
                <EventCard
                  event={event}
                  href={`/tournaments/${event.id}`}
                  className="h-full"
                />
              </div>
            ))}
          </div>

          {/* Right Navigation Arrow */}
          <button
            type="button"
            onClick={() => scrollTourney("right")}
            aria-label="Scroll right"
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 border border-border/80 shadow-2xs text-foreground transition-all hover:bg-muted active:scale-95 cursor-pointer backdrop-blur-xs opacity-0 group-hover/carousel:opacity-100 sm:opacity-100"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* CLUBS SECTION: 4-Card Standard */}
      <section id="clubs" className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 space-y-4 scroll-mt-24">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-0.5 min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2 truncate">
              <UserCheck className="w-5 h-5 text-indigo-500 shrink-0" />
              <span>Câu Lạc Bộ Hoạt Động</span>
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-normal line-clamp-1">
              Gia nhập câu lạc bộ sinh hoạt định kỳ để nâng cao trình độ.
            </p>
          </div>

          <Link
            href="/clubs"
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:underline transition-colors shrink-0"
          >
            <span>Xem tất cả</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Clubs Slider: 4-Card Standard */}
        <div
          className="relative group/carousel"
          onMouseEnter={() => setIsClubHovered(true)}
          onMouseLeave={() => setIsClubHovered(false)}
          onTouchStart={() => setIsClubHovered(true)}
          onTouchEnd={() => setIsClubHovered(false)}
        >
          {/* Left Navigation Arrow */}
          <button
            type="button"
            onClick={() => scrollClub("left")}
            aria-label="Scroll left"
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 border border-border/80 shadow-2xs text-foreground transition-all hover:bg-muted active:scale-95 cursor-pointer backdrop-blur-xs opacity-0 group-hover/carousel:opacity-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Continuous Infinite Horizontal Scroll List */}
          <div
            ref={clubContainerRef}
            onScroll={handleClubScroll}
            className="flex items-stretch overflow-x-auto scrollbar-none snap-x snap-mandatory gap-3 pt-1 pb-1 px-1"
          >
            {infiniteClubs.map((club, index) => (
              <div
                key={`${club.id}-infinite-${index}`}
                className="w-[80vw] sm:w-[calc((100%-12px)/2)] lg:w-[calc((100%-36px)/4)] shrink-0 snap-start"
              >
                <ClubCard club={club} className="h-full" />
              </div>
            ))}
          </div>

          {/* Right Navigation Arrow */}
          <button
            type="button"
            onClick={() => scrollClub("right")}
            aria-label="Scroll right"
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 border border-border/80 shadow-2xs text-foreground transition-all hover:bg-muted active:scale-95 cursor-pointer backdrop-blur-xs opacity-0 group-hover/carousel:opacity-100 sm:opacity-100"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
