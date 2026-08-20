"use client";

import React, { useState } from "react";
import { FindPlayerCard } from "@/components/activities/find-player-card";
import { Search, Users, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ACTIVITIES_DATA } from "@/lib/activities-data";
import { useLocale } from "next-intl";
import { JsonLdScript, getBreadcrumbJsonLd } from "@/lib/seo/json-ld";

const SPORTS = ["Tất cả", "Cầu lông", "Pickleball", "Tennis", "Bóng đá"];

export default function ActivitiesPage() {
  const locale = useLocale();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSport, setSelectedSport] = useState("Tất cả");

  const breadcrumbSchema = getBreadcrumbJsonLd([
    { name: "Trang chủ", url: `/${locale}` },
    { name: "Ghép kèo & Hoạt động", url: `/${locale}/activities` },
  ]);

  const filteredActivities = ACTIVITIES_DATA.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport =
      selectedSport === "Tất cả" || item.sport?.includes(selectedSport);
    return matchesSearch && matchesSport;
  });

  return (
    <div className="w-full bg-background min-h-screen pb-16">
      <JsonLdScript data={[breadcrumbSchema]} />
      {/* Page Header */}
      <div className="bg-muted/30 border-b border-border/40 py-8 sm:py-12">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/40 px-3.5 py-1 text-xs font-bold text-orange-700 dark:text-orange-400">
            <Users className="h-3.5 w-3.5" />
            <span>Ghép Kèo & Tìm Bạn Chơi Cùng</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
            Hoạt Động Thể Thao & Giao Lưu
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
            Tham gia các trận cầu, trận bóng và buổi giao lưu thể thao sôi nổi mỗi ngày cùng cộng đồng PlayGrid.
          </p>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kèo đấu, câu lạc bộ, địa điểm..."
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
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center justify-between pb-4">
          <h2 className="text-lg sm:text-xl font-bold">
            {selectedSport === "Tất cả" ? "Tất cả trận đấu giao lưu" : `Môn: ${selectedSport}`}
          </h2>
          <span className="text-xs text-muted-foreground font-medium">
            {filteredActivities.length} hoạt động
          </span>
        </div>

        {filteredActivities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredActivities.map((activity) => (
              <FindPlayerCard key={activity.id} activity={activity} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 space-y-3 bg-card rounded-2xl border border-border/60 p-6">
            <Users className="h-10 w-10 text-muted-foreground mx-auto" />
            <p className="text-base text-muted-foreground font-medium">
              Không tìm thấy hoạt động giao lưu nào phù hợp.
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
