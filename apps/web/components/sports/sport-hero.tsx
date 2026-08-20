"use client";

import React from "react";
import {
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { HeroVisualGraphic } from "@/components/home/hero/hero-visual-graphic";

export interface SportHeroProps {
  sportName?: string;
  heroImage?: string;
}

export function SportHero({ sportName = "Cầu Lông", heroImage }: SportHeroProps) {
  const getHeroImage = () => {
    if (heroImage) return heroImage;
    const lower = sportName.toLowerCase();
    if (lower.includes("pickleball")) {
      return "/images/pickleball/herobanner/grily-pickleball.avif";
    }
    return "/images/badminton/herobanner/gridy-badminton.avif";
  };

  const bannerImageSrc = getHeroImage();

  return (
    <section id="overview" className="relative w-full overflow-hidden bg-background pt-5 pb-6 sm:pb-8 lg:pt-14 lg:pb-10 text-foreground transition-colors duration-300 border-b border-border/40 scroll-mt-32">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-500/15 via-cyan-500/10 to-transparent blur-[120px] pointer-events-none dark:from-blue-600/20 dark:via-emerald-500/10" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-emerald-500/15 via-teal-500/10 to-transparent blur-[100px] pointer-events-none dark:from-emerald-600/20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-400/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid items-center gap-6 sm:gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Content */}
          <div className="flex flex-col items-start space-y-4 sm:space-y-6 lg:col-span-6 z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs sm:text-sm font-semibold text-primary shadow-2xs backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>Chuyên mục thể thao — {sportName}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.15] pb-1">
              Khám phá thế giới{" "}
              <span className="bg-gradient-to-r from-primary via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
                {sportName}
              </span>{" "}
              trên PlayGrid
            </h1>

            {/* Description */}
            <p className="max-w-[520px] text-sm sm:text-base md:text-lg font-normal leading-relaxed text-muted-foreground">
              Đặt sân cầu lông tiêu chuẩn BWF, tham gia các kèo ghép giao lưu theo trình độ, gia nhập câu lạc bộ và thử sức tại các giải đấu phong trào hấp dẫn.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-0.5 w-full sm:w-auto">
              <a
                href="#courts"
                className="inline-flex h-11 sm:h-12 items-center justify-center gap-2 rounded-xl bg-gradient-primary px-5 sm:px-6 text-sm sm:text-base font-bold text-white transition-all hover:shadow-md active:scale-[0.98] cursor-pointer shadow-2xs"
              >
                <span>Đặt sân gần bạn</span>
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </a>

              <a
                href="#matches"
                className="group inline-flex h-11 sm:h-12 items-center justify-center gap-2 rounded-xl border border-border/80 bg-background/90 backdrop-blur-xs px-5 sm:px-6 text-sm sm:text-base font-semibold text-foreground transition-all hover:bg-muted active:scale-[0.98] cursor-pointer shadow-2xs"
              >
                <span>Tham gia kèo ghép</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Graphic Image matching Home Hero */}
          <HeroVisualGraphic imageSrc={bannerImageSrc} altText={`PlayGrid ${sportName} Mascot Banner`} />
        </div>
      </div>
    </section>
  );
}
