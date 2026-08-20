"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { Link } from "@/i18n/navigation";
import { MapPin, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { CourtCard, CourtData } from "@/components/courts/court-card";

export interface SportCourtsGridProps {
  sportName?: string;
}

const BADMINTON_COURTS: CourtData[] = [
  {
    id: "khang-an-badminton",
    name: "CLB Cầu Lông Khang An",
    location: "Thủ Đức, TP. HCM",
    distance: "1.2 km",
    rating: 4.9,
    reviewsCount: 184,
    price: "180.000đ/giờ",
    badge: "Hot",
    sports: ["Cầu lông"],
    imageUrl: "/images/explore_sports/gridy-badminton.avif",
  },
  {
    id: "vnb-sports-center",
    name: "Sân Cầu Lông VNB Sports",
    location: "Tân Bình, TP. HCM",
    distance: "3.5 km",
    rating: 4.8,
    reviewsCount: 142,
    price: "160.000đ/giờ",
    badge: "Hot",
    sports: ["Cầu lông"],
    imageUrl: "/images/activities/badminton-banner.png",
  },
  {
    id: "phu-tho-badminton",
    name: "Sân Cầu Lông Phú Thọ",
    location: "Quận 11, TP. HCM",
    distance: "5.1 km",
    rating: 4.7,
    reviewsCount: 215,
    price: "150.000đ/giờ",
    badge: "Hot",
    sports: ["Cầu lông"],
    imageUrl: "/images/activities/badminton-banner.png",
  },
  {
    id: "viettel-badminton",
    name: "Sân Cầu Lông Viettel",
    location: "Quận 10, TP. HCM",
    distance: "4.8 km",
    rating: 4.9,
    reviewsCount: 96,
    price: "200.000đ/giờ",
    badge: "Hot",
    sports: ["Cầu lông"],
    imageUrl: "/images/explore_sports/gridy-badminton.avif",
  },
];

const PICKLEBALL_COURTS: CourtData[] = [
  {
    id: "pickleball-club-q2",
    name: "CLB Pickleball Quận 2",
    location: "Quận 2, TP. HCM",
    distance: "1.5 km",
    rating: 4.9,
    reviewsCount: 156,
    price: "200.000đ/giờ",
    badge: "Hot",
    sports: ["Pickleball"],
    imageUrl: "/images/activities/pickleball-banner.png",
  },
  {
    id: "khang-an-pickleball",
    name: "Sân Pickleball Khang An",
    location: "Thủ Đức, TP. HCM",
    distance: "2.8 km",
    rating: 4.8,
    reviewsCount: 128,
    price: "180.000đ/giờ",
    badge: "Hot",
    sports: ["Pickleball"],
    imageUrl: "/images/explore_sports/gridy-pickleball.avif",
  },
  {
    id: "vnb-pickleball-center",
    name: "VNB Pickleball Center",
    location: "Tân Bình, TP. HCM",
    distance: "3.2 km",
    rating: 4.8,
    reviewsCount: 94,
    price: "190.000đ/giờ",
    badge: "Hot",
    sports: ["Pickleball"],
    imageUrl: "/images/activities/pickleball-banner.png",
  },
  {
    id: "saigon-pickleball-arena",
    name: "Sài Gòn Pickleball Arena",
    location: "Quận 7, TP. HCM",
    distance: "4.5 km",
    rating: 4.9,
    reviewsCount: 210,
    price: "220.000đ/giờ",
    badge: "Hot",
    sports: ["Pickleball"],
    imageUrl: "/images/explore_sports/gridy-pickleball.avif",
  },
];

export function SportCourtsGrid({ sportName = "Cầu Lông" }: SportCourtsGridProps) {
  const isPickleball = sportName.toLowerCase().includes("pickleball");
  const rawCourts = isPickleball ? PICKLEBALL_COURTS : BADMINTON_COURTS;
  const infiniteCourts = [...rawCourts, ...rawCourts, ...rawCourts];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isResettingRef = useRef(false);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const singleSetWidth = container.scrollWidth / 3;
      container.scrollLeft = singleSetWidth;
    }
  }, [sportName]);

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
    <section id="courts" className="w-full py-5 sm:py-6 bg-background text-foreground transition-colors overflow-hidden border-b border-border/40 scroll-mt-24">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Section Header */}
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-0.5 min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2 truncate">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <span>Sân {sportName} Gần Bạn</span>
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-normal line-clamp-1">
              Sân thảm tiêu chuẩn, đầy đủ hệ thống đèn chiếu sáng & tiện ích.
            </p>
          </div>

          <Link
            href={sportName.toLowerCase().includes("pickleball") ? "/pickleball/venue" : "/badminton/venue"}
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:underline transition-colors shrink-0"
          >
            <span>Xem tất cả</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Horizontal Infinite Slider Container */}
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
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 border border-border/80 shadow-2xs text-foreground transition-all hover:bg-muted active:scale-95 cursor-pointer backdrop-blur-xs opacity-0 group-hover/carousel:opacity-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Continuous Infinite Horizontal Scroll List */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex items-stretch overflow-x-auto scrollbar-none snap-x snap-mandatory gap-3 pt-1 pb-1 px-1"
          >
            {infiniteCourts.map((court, index) => (
              <div
                key={`${court.id}-infinite-${index}`}
                className="w-[80vw] sm:w-[calc((100%-12px)/2)] lg:w-[calc((100%-36px)/4)] shrink-0 snap-start"
              >
                <CourtCard court={court} className="h-full" />
              </div>
            ))}
          </div>

          {/* Right Navigation Arrow */}
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 border border-border/80 shadow-2xs text-foreground transition-all hover:bg-muted active:scale-95 cursor-pointer backdrop-blur-xs opacity-0 group-hover/carousel:opacity-100 sm:opacity-100"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
