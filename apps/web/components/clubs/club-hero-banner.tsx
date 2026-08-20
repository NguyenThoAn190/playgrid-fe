"use client";

import React from "react";
import Image from "next/image";
import { ChevronLeft, Share2, Heart, Shield, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ClubDetailData } from "@/lib/clubs-data";
import { useLocale } from "next-intl";

export interface ClubHeroBannerProps {
  club: ClubDetailData;
}

export function ClubHeroBanner({ club }: ClubHeroBannerProps) {
  const locale = useLocale();

  return (
    <div className="relative w-full h-[220px] sm:h-[280px] md:h-[340px] bg-slate-950 overflow-hidden">
      {/* Background Cover Image with subtle zoom on hover */}
      <Image
        src={club.coverUrl || "/images/clubs/tada-club.png"}
        alt={club.name}
        fill
        priority
        className="object-cover opacity-60 filter blur-[0.5px] scale-105"
      />

      {/* Modern Gradient Overlays for high-contrast readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-slate-950/60" />

      {/* Top Action Bar (Back button, Breadcrumbs, Share & Favorite) */}
      <div className="relative z-20 mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 flex items-center justify-between">
        {/* Back Link */}
        <Link
          href={`/${club.sport === "Cầu lông" ? "badminton" : "pickleball"}/clubs`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-white text-xs font-semibold hover:bg-black/60 transition-colors shadow-xs"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Danh sách CLB</span>
        </Link>

        {/* Right Actions: Sport Pill & Social */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-xs font-bold shadow-xs">
            <Shield className="w-3.5 h-3.5" />
            <span>{club.sport} Club</span>
          </div>
          <button
            type="button"
            aria-label="Chia sẻ"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-black/60 transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            aria-label="Lưu yêu thích"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:text-red-400 hover:bg-black/60 transition-colors cursor-pointer"
          >
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
