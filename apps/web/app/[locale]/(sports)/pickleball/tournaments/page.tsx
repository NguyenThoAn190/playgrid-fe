"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Trophy,
  Calendar,
  MapPin,
  Sparkles,
  Filter,
  RotateCcw,
  ArrowUpDown,
} from "lucide-react";
import { useLocale } from "next-intl";
import { SportSubNav } from "@/components/sports/sport-sub-nav";
import { EventCard, EventData } from "@/components/events/event-card";
import { TOURNAMENTS_DATA } from "@/lib/tournaments-data";
import { JsonLdScript, getBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@workspace/ui/components/select";
import { Button } from "@/components/ui/button";

export default function PickleballTournamentsPage() {
  const locale = useLocale();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedQuickStatus, setSelectedQuickStatus] = useState<string>("all");

  const pickleballTournaments = useMemo(() => {
    return TOURNAMENTS_DATA.filter(
      (t) => t.sport === "pickleball" || t.sportLabel?.toLowerCase().includes("pickleball")
    );
  }, []);

  const filteredTournaments = useMemo(() => {
    return pickleballTournaments.filter((tournament) => {
      if (
        searchQuery &&
        !tournament.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !tournament.location.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [pickleballTournaments, searchQuery]);

  const eventCardsData: EventData[] = filteredTournaments.map((t) => ({
    id: t.id,
    title: t.title,
    category: t.sportLabel,
    distanceText: `Giải thưởng: ${t.totalPrizePool}`,
    badge: t.badge
      ? {
          type: t.badge.type === "closing_soon" ? "hot" : t.badge.type,
          text: t.badge.text,
        }
      : undefined,
    date: t.date,
    location: t.location,
    price: t.priceFrom,
    priceSubtext: "Lệ phí từ",
    imageUrl: t.bannerImage,
    buttonText: "Đăng ký",
  }));

  const breadcrumbSchema = getBreadcrumbJsonLd([
    { name: "Trang chủ", url: `/${locale}` },
    { name: "Pickleball", url: `/${locale}/pickleball` },
    { name: "Giải đấu Pickleball", url: `/${locale}/pickleball/tournaments` },
  ]);

  return (
    <main className="w-full flex flex-col min-h-screen bg-background text-foreground">
      <JsonLdScript data={[breadcrumbSchema]} />
      <SportSubNav currentSport="pickleball" />

      <section className="w-full pt-5 sm:pt-7 pb-16 bg-background flex-1">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="bg-card border border-border/80 rounded-2xl p-3 sm:p-4 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
            <div className="relative flex-1 min-w-0 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm giải đấu Pickleball, cụm sân, thành phố..."
                className="w-full pl-10 pr-4 h-10 rounded-xl bg-background border border-border/70 text-foreground placeholder:text-muted-foreground text-xs sm:text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <div>
                <h2 className="text-base sm:text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-500 shrink-0" />
                  <span>Giải Đấu Pickleball Đang Mở Đơn</span>
                </h2>
                <p className="text-xs text-muted-foreground font-normal mt-0.5">
                  Tìm thấy <span className="font-bold text-primary">{filteredTournaments.length}</span> giải đấu tranh cúp
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {eventCardsData.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  href={`/tournaments/${event.id}`}
                  className="h-full"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
