"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Shield,
  Users,
  MapPin,
  Sparkles,
  Filter,
  RotateCcw,
  ArrowUpDown,
  Star,
  Crown,
  CheckCircle2,
  Plus,
} from "lucide-react";
import { useLocale } from "next-intl";
import { SportSubNav } from "@/components/sports/sport-sub-nav";
import { ClubCard, ClubData } from "@/components/clubs/club-card";
import { CLUBS_DATA } from "@/lib/clubs-data";
import { JsonLdScript, getBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { Button } from "@/components/ui/button";

export default function PickleballClubsPage() {
  const locale = useLocale();
  const [searchQuery, setSearchQuery] = useState("");

  const pickleballClubs = useMemo(() => {
    return CLUBS_DATA.filter((club) => club.sport === "Pickleball");
  }, []);

  const filteredClubs = useMemo(() => {
    return pickleballClubs.filter((club) => {
      if (
        searchQuery &&
        !club.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !club.location.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [pickleballClubs, searchQuery]);

  const breadcrumbSchema = getBreadcrumbJsonLd([
    { name: "Trang chủ", url: `/${locale}` },
    { name: "Pickleball", url: `/${locale}/pickleball` },
    { name: "Câu lạc bộ Pickleball", url: `/${locale}/pickleball/clubs` },
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
                placeholder="Tìm câu lạc bộ Pickleball theo tên, khu vực..."
                className="w-full pl-10 pr-4 h-10 rounded-xl bg-background border border-border/70 text-foreground placeholder:text-muted-foreground text-xs sm:text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <div>
                <h2 className="text-base sm:text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
                  <Shield className="w-5 h-5 text-indigo-500 shrink-0" />
                  <span>Câu Lạc Bộ Pickleball Sôi Động</span>
                </h2>
                <p className="text-xs text-muted-foreground font-normal mt-0.5">
                  Tìm thấy <span className="font-bold text-primary">{filteredClubs.length}</span> câu lạc bộ sinh hoạt
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
              {filteredClubs.map((club) => (
                <ClubCard key={club.id} club={club} className="h-full" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
