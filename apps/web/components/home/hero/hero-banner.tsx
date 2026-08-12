"use client";

import * as React from "react";
import { HeroGreetingBadge } from "./hero-greeting-badge";
import { HeroHeadline } from "./hero-headline";
import { HeroActionButtons } from "./hero-action-buttons";
import { HeroVisualGraphic } from "./hero-visual-graphic";
import type { SearchFilters } from "./hero-search-bar";

interface HeroBannerProps {
  tenant?: string;
  onExploreClick?: () => void;
  onFindPlayersClick?: () => void;
  onSearchSubmit?: (filters: SearchFilters) => void;
}

export function HeroBanner({
  onExploreClick,
  onFindPlayersClick,
}: HeroBannerProps) {
  return (
    <section className="relative w-full overflow-hidden bg-background pt-5 pb-6 sm:pb-8 lg:pt-14 lg:pb-10 text-foreground transition-colors duration-300">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-500/15 via-cyan-500/10 to-transparent blur-[120px] pointer-events-none dark:from-blue-600/20 dark:via-emerald-500/10" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-emerald-500/15 via-teal-500/10 to-transparent blur-[100px] pointer-events-none dark:from-emerald-600/20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-400/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid items-center gap-6 sm:gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Content */}
          <div className="flex flex-col items-start space-y-4 sm:space-y-6 lg:col-span-6 z-10">
            {/* Dynamic Greeting Badge */}
            <HeroGreetingBadge />

            {/* Main Headline & Description */}
            <HeroHeadline />

            {/* Call to Action Buttons */}
            <HeroActionButtons
              onExploreClick={onExploreClick}
              onFindPlayersClick={onFindPlayersClick}
            />
          </div>

          {/* Right Column: Visual Graphic Image */}
          <HeroVisualGraphic />
        </div>
      </div>
    </section>
  );
}

export const HomeHero = HeroBanner;
export default HeroBanner;
