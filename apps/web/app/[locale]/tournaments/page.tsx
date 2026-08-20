"use client";

import React, { useState } from "react";
import { Link } from "@/i18n/navigation";
import { Search, Trophy, Calendar, MapPin, Sparkles, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TOURNAMENTS_DATA } from "@/lib/tournaments-data";
import { EventCard, EventData } from "@/components/events/event-card";
import { useLocale } from "next-intl";
import { JsonLdScript, getBreadcrumbJsonLd } from "@/lib/seo/json-ld";

const SPORTS = ["Tất cả", "Cầu Lông", "Pickleball", "Tennis", "Bóng đá"];
const STATUSES = ["Tất cả", "Đang mở đơn", "Sắp diễn ra"];

export default function TournamentsPage() {
  const locale = useLocale();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSport, setSelectedSport] = useState("Tất cả");
  const [selectedStatus, setSelectedStatus] = useState("Tất cả");

  const breadcrumbSchema = getBreadcrumbJsonLd([
    { name: "Trang chủ", url: `/${locale}` },
    { name: "Giải đấu thể thao", url: `/${locale}/tournaments` },
  ]);

  const filteredTournaments = TOURNAMENTS_DATA.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport =
      selectedSport === "Tất cả" ||
      item.sportLabel.toLowerCase() === selectedSport.toLowerCase();
    const matchesStatus =
      selectedStatus === "Tất cả" ||
      (selectedStatus === "Đang mở đơn" && item.badge?.text.includes("Mở Đơn")) ||
      (selectedStatus === "Sắp diễn ra" && item.badge?.text.includes("Sắp"));

    return matchesSearch && matchesSport && matchesStatus;
  });

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

  return (
    <div className="w-full bg-background min-h-screen pb-16">
      <JsonLdScript data={[breadcrumbSchema]} />

      {/* Page Header */}
      <div className="bg-muted/30 border-b border-border/40 py-8 sm:py-12">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 px-3.5 py-1 text-xs font-semibold text-amber-700 dark:text-amber-400 shadow-2xs">
            <Trophy className="h-3.5 w-3.5" />
            <span>Hệ Thống Giải Đấu Thể Thao PlayGrid</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Giải Đấu & Sự Kiện Thể Thao
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl font-normal">
            Đăng ký tham gia tranh tài tại các giải đấu Cầu Lông, Pickleball, Tennis phong trào và bán chuyên hàng đầu cả nước.
          </p>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm tên giải đấu, địa điểm, thành phố..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 rounded-xl bg-background border-border/80 text-sm font-normal"
              />
            </div>

            {/* Sport Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full scrollbar-none py-1">
              {SPORTS.map((sport) => (
                <button
                  key={sport}
                  type="button"
                  onClick={() => setSelectedSport(sport)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                    selectedSport === sport
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "bg-background border border-border/80 text-muted-foreground hover:bg-muted hover:text-foreground font-medium"
                  }`}
                >
                  {sport}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid: Master 3-Card Grid */}
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center justify-between pb-4">
          <h2 className="text-base sm:text-lg font-bold text-foreground">
            {selectedSport === "Tất cả" ? "Tất cả giải đấu đang mở" : `Bộ môn: ${selectedSport}`}
          </h2>
          <span className="text-xs text-muted-foreground font-normal">
            {filteredTournaments.length} giải đấu
          </span>
        </div>

        {eventCardsData.length > 0 ? (
          <div className="grid grid-cols-1 min-[500px]:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {eventCardsData.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                href={`/tournaments/${event.id}`}
                className="h-full"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 space-y-3 bg-card rounded-3xl border border-border/60 p-6">
            <Trophy className="h-10 w-10 text-muted-foreground mx-auto" />
            <p className="text-base text-muted-foreground font-medium">
              Không tìm thấy giải đấu nào phù hợp với bộ lọc.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedSport("Tất cả");
                setSelectedStatus("Tất cả");
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
