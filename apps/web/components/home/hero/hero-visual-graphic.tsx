"use client";

import * as React from "react";
import Image from "next/image";
import { MapPin, Star } from "lucide-react";

export function HeroVisualGraphic() {
  return (
    <div className="relative hidden lg:flex justify-center lg:col-span-6 lg:justify-end">
      <div className="relative w-full max-w-[620px]">
        {/* Soft Ambient Radial Backdrop behind mascot */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/20 via-emerald-400/20 to-transparent rounded-full blur-3xl scale-95 pointer-events-none" />

        {/* Main Mascot Banner Image */}
        <div className="relative z-10 drop-shadow-xl hover:scale-[1.01] transition-transform duration-500">
          <Image
            src="/images/herobanner/home-hero-banner.avif"
            alt="PlayGrid Sports Mascot Banner"
            width={620}
            height={620}
            priority
            unoptimized
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Floating Badge 1: Booking Court Info */}
        <div className="absolute top-6 -left-2 sm:left-4 z-20 flex items-center gap-2.5 rounded-2xl border border-border bg-card/95 backdrop-blur-md p-3 shadow-lg hover:scale-105 transition-transform text-card-foreground">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-white font-bold text-xs shadow-xs">
            <MapPin className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-foreground">Kèo đang mở</span>
            </div>
            <p className="text-[11px] text-muted-foreground font-medium">Tham gia giao lưu ngay</p>
          </div>
        </div>

        {/* Floating Badge 2: Tournament Rating */}
        <div className="absolute bottom-8 -right-2 sm:right-4 z-20 flex items-center gap-3 rounded-2xl border border-border bg-card/95 backdrop-blur-md p-3.5 shadow-lg hover:scale-105 transition-transform text-card-foreground">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500">
            <Star className="h-5 w-5 fill-amber-500" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <strong className="text-sm font-extrabold text-foreground">4.9 / 5.0</strong>
              <span className="text-[11px] text-amber-500 font-bold">★★★★★</span>
            </div>
            <span className="text-xs text-muted-foreground font-medium">Đánh giá từ cộng đồng</span>
          </div>
        </div>
      </div>
    </div>
  );
}
