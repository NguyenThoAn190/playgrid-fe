"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { ArrowLeft, Share2, Heart, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TournamentData } from "@/lib/tournaments-data";

interface TournamentHeroBannerProps {
  tournament: TournamentData;
}

export function TournamentHeroBanner({ tournament }: TournamentHeroBannerProps) {
  const locale = useLocale();
  const isEn = locale === "en";
  const [isCopied, setIsCopied] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const handleShare = async () => {
    if (typeof window !== "undefined") {
      const url = window.location.href;
      if (navigator.share) {
        try {
          await navigator.share({
            title: tournament.title,
            text: `Đăng ký tham gia ${tournament.title} trên PlayGrid!`,
            url,
          });
          return;
        } catch {
          // fallback to clipboard
        }
      }
      navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="relative w-full aspect-[16/7] sm:aspect-[16/6] md:aspect-[16/5] max-h-[440px] overflow-hidden bg-slate-950">
      <Image
        src={tournament.bannerImage}
        alt={tournament.title}
        fill
        className="object-cover"
        priority
        unoptimized
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/60" />

      {/* Floating Top Actions Bar Aligned with Navbar Container (max-w-[1440px]) */}
      <div className="absolute top-4 sm:top-6 left-0 right-0 z-10">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/tournaments">
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl bg-background/90 backdrop-blur-md border-border/80 text-foreground font-medium gap-1.5 shadow-sm hover:bg-background cursor-pointer text-xs"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{isEn ? "Back to Tournaments" : "Danh sách giải đấu"}</span>
            </Button>
          </Link>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleShare}
              className="size-8 sm:size-8.5 rounded-xl bg-background/90 backdrop-blur-md border-border/80 hover:bg-background text-foreground shadow-sm cursor-pointer relative"
              title={isEn ? "Share" : "Chia sẻ"}
            >
              {isCopied ? (
                <Check className="h-3.5 w-3.5 text-emerald-500" />
              ) : (
                <Share2 className="h-3.5 w-3.5 text-foreground" />
              )}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsFavorited(!isFavorited)}
              className="size-8 sm:size-8.5 rounded-xl bg-background/90 backdrop-blur-md border-border/80 hover:bg-background text-foreground shadow-sm cursor-pointer"
              title={isEn ? "Save" : "Yêu thích"}
            >
              <Heart
                className={`h-3.5 w-3.5 transition-colors ${
                  isFavorited
                    ? "text-rose-500 fill-rose-500"
                    : "text-rose-500 fill-rose-500/20"
                }`}
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
