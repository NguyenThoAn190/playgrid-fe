"use client";

import * as React from "react";
import Image from "next/image";

export interface HeroVisualGraphicProps {
  imageSrc?: string;
  altText?: string;
}

export function HeroVisualGraphic({
  imageSrc = "/images/herobanner/home-hero-banner.avif",
  altText = "PlayGrid Sports Mascot Banner",
}: HeroVisualGraphicProps) {
  return (
    <div className="relative hidden lg:flex justify-center lg:col-span-6 lg:justify-end">
      <div className="relative w-full max-w-[620px]">
        {/* Soft Ambient Radial Backdrop behind mascot */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/20 via-emerald-400/20 to-transparent rounded-full blur-3xl scale-95 pointer-events-none" />

        {/* Main Mascot Banner Image */}
        <div className="relative z-10 drop-shadow-xl hover:scale-[1.01] transition-transform duration-500">
          <Image
            src={imageSrc}
            alt={altText}
            width={620}
            height={620}
            priority
            unoptimized
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}

