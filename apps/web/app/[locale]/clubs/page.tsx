"use client";

import React, { useState } from "react";
import { ClubCard } from "@/components/clubs/club-card";
import { Search, Shield, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CLUBS_DATA } from "@/lib/clubs-data";
import { useLocale } from "next-intl";
import { JsonLdScript, getBreadcrumbJsonLd } from "@/lib/seo/json-ld";

const SPORTS = ["Tất cả", "Cầu lông", "Pickleball", "Tennis", "Bóng đá"];

export default function ClubsPage() {
  const locale = useLocale();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSport, setSelectedSport] = useState("Tất cả");

  const breadcrumbSchema = getBreadcrumbJsonLd([
    { name: "Trang chủ", url: `/${locale}` },
    { name: "Câu lạc bộ thể thao", url: `/${locale}/clubs` },
  ]);

  const filteredClubs = CLUBS_DATA.filter((club) => {
    const matchesSearch =
      club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport =
      selectedSport === "Tất cả" || club.sport?.includes(selectedSport);
    return matchesSearch && matchesSport;
  });

  return (
    <div className="w-full bg-background min-h-screen pb-16">
      <JsonLdScript data={[breadcrumbSchema]} />
      {/* Page Header */}
      <div className="bg-muted/30 border-b border-border/40 py-8 sm:py-12">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/40 px-3.5 py-1 text-xs font-bold text-indigo-700 dark:text-indigo-400">
            <Shield className="h-3.5 w-3.5" />
            <span>Hệ Thống CLB Thể Thao PlayGrid</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Câu Lạc Bộ Thể Thao Uy Tín
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
            Gia nhập các câu lạc bộ Cầu lông, Pickleball, Tennis và Bóng đá uy tín với lịch sinh hoạt cố định và môi trường văn minh.
          </p>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm tên CLB, khu vực..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 rounded-xl bg-background border-border/80 text-sm"
              />
            </div>

            {/* Sport Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full scrollbar-none py-1">
              {SPORTS.map((sport) => (
                <button
                  key={sport}
                  type="button"
                  onClick={() => setSelectedSport(sport)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                    selectedSport === sport
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "bg-background border border-border/80 text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {sport}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid: 4-Card Master Grid Layout */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center justify-between pb-4">
          <h2 className="text-lg sm:text-xl font-bold">
            {selectedSport === "Tất cả" ? "Tất cả câu lạc bộ" : `Bộ môn: ${selectedSport}`}
          </h2>
          <span className="text-xs text-muted-foreground font-medium">
            {filteredClubs.length} câu lạc bộ
          </span>
        </div>

        {filteredClubs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredClubs.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 space-y-3 bg-card rounded-2xl border border-border/60 p-6">
            <Shield className="h-10 w-10 text-muted-foreground mx-auto" />
            <p className="text-base text-muted-foreground font-medium">
              Không tìm thấy câu lạc bộ nào phù hợp.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedSport("Tất cả");
              }}
              className="rounded-xl"
            >
              Đặt lại bộ lọc
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
