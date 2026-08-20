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
  Flame,
  CheckCircle2,
  Medal,
  DollarSign,
  ShieldCheck,
} from "lucide-react";
import { useLocale } from "next-intl";
import { SportSubNav } from "@/components/sports/sport-sub-nav";
import { EventCard, EventData } from "@/components/events/event-card";
import { TOURNAMENTS_DATA, TournamentData } from "@/lib/tournaments-data";
import { JsonLdScript, getBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@workspace/ui/components/select";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

const CITIES_DISTRICTS = [
  "Hà Nội",
  "Thủ Đức",
  "Tân Bình",
  "Quận 11",
  "Quận 7",
];

const STATUS_OPTIONS = [
  { id: "open", label: "Đang mở đơn đăng ký" },
  { id: "upcoming", label: "Sắp khởi tranh" },
  { id: "live", label: "Đang thi đấu" },
];

const PRIZE_POOLS = [
  { id: "over-100", label: "Trên 100.000.000đ", min: 100000000, max: 999999999 },
  { id: "50-100", label: "50.000.000đ - 100.000.000đ", min: 50000000, max: 100000000 },
  { id: "under-50", label: "Dưới 50.000.000đ", min: 0, max: 50000000 },
];

const FORMAT_OPTIONS = [
  { id: "doi-nam", label: "Đôi Nam" },
  { id: "doi-nam-nu", label: "Đôi Nam Nữ" },
  { id: "doi-nu", label: "Đôi Nữ" },
  { id: "don-nam", label: "Đơn Nam" },
];

const SKILL_LEVELS = [
  { id: "phong-trao", label: "Phong trào (Trình 2.5 - 3.5)" },
  { id: "nang-cao", label: "Nâng cao / Bán chuyên (3.5 - 4.5+)" },
  { id: "open", label: "Open tự do toàn quốc" },
];

const AMENITY_BENEFITS = [
  "Thảm BWF tiêu chuẩn",
  "Áo thi đấu chính thức",
  "Máy lạnh",
  "Bảo hiểm VĐV",
  "Khán đài",
  "Bãi xe ô tô",
];

export default function BadmintonTournamentsPage() {
  const locale = useLocale();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedQuickStatus, setSelectedQuickStatus] = useState<string>("all");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedPrizePools, setSelectedPrizePools] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"latest" | "prize-desc" | "deadline" | "price-asc">("latest");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter only badminton tournaments
  const badmintonTournaments = useMemo(() => {
    return TOURNAMENTS_DATA.filter(
      (t) => t.sport === "badminton" || t.sportLabel?.toLowerCase().includes("cầu lông")
    );
  }, []);

  const toggleLocation = (loc: string) => {
    setSelectedLocations((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
    );
  };

  const toggleStatus = (statusId: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(statusId) ? prev.filter((s) => s !== statusId) : [...prev, statusId]
    );
  };

  const togglePrizePool = (poolId: string) => {
    setSelectedPrizePools((prev) =>
      prev.includes(poolId) ? prev.filter((p) => p !== poolId) : [...prev, poolId]
    );
  };

  const toggleFormat = (formatId: string) => {
    setSelectedFormats((prev) =>
      prev.includes(formatId) ? prev.filter((f) => f !== formatId) : [...prev, formatId]
    );
  };

  const toggleLevel = (levelId: string) => {
    setSelectedLevels((prev) =>
      prev.includes(levelId) ? prev.filter((l) => l !== levelId) : [...prev, levelId]
    );
  };

  const toggleBenefit = (benefit: string) => {
    setSelectedBenefits((prev) =>
      prev.includes(benefit) ? prev.filter((b) => b !== benefit) : [...prev, benefit]
    );
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedQuickStatus("all");
    setSelectedLocations([]);
    setSelectedStatuses([]);
    setSelectedPrizePools([]);
    setSelectedFormats([]);
    setSelectedLevels([]);
    setSelectedBenefits([]);
    setSortBy("latest");
  };

  // Filter calculation
  const filteredTournaments = useMemo(() => {
    return badmintonTournaments.filter((tournament) => {
      // 1. Search Query
      if (
        searchQuery &&
        !tournament.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !tournament.location.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !tournament.venueDetails?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // 2. Quick Status
      if (selectedQuickStatus !== "all") {
        if (selectedQuickStatus === "open" && !tournament.badge?.text.includes("Mở Đơn")) return false;
        if (selectedQuickStatus === "upcoming" && !tournament.badge?.text.includes("Sắp")) return false;
      }

      // 3. Location / District
      if (selectedLocations.length > 0) {
        const matchesLoc = selectedLocations.some(
          (loc) =>
            tournament.location.includes(loc) ||
            tournament.venueDetails?.district?.includes(loc) ||
            tournament.venueDetails?.city?.includes(loc)
        );
        if (!matchesLoc) return false;
      }

      // 4. Status Checkbox
      if (selectedStatuses.length > 0) {
        const isOpen = tournament.badge?.text.includes("Mở Đơn");
        const isUpcoming = tournament.badge?.text.includes("Sắp");
        const matchesAnyStatus = selectedStatuses.some((st) => {
          if (st === "open") return isOpen;
          if (st === "upcoming") return isUpcoming;
          return true;
        });
        if (!matchesAnyStatus) return false;
      }

      // 5. Prize Pool
      if (selectedPrizePools.length > 0) {
        const prizeNumeric = parseInt(tournament.totalPrizePool.replace(/[^\d]/g, ""), 10) || 0;
        const matchesAnyPool = selectedPrizePools.some((poolId) => {
          const pool = PRIZE_POOLS.find((p) => p.id === poolId);
          if (!pool) return false;
          return prizeNumeric >= pool.min && prizeNumeric <= pool.max;
        });
        if (!matchesAnyPool) return false;
      }

      // 6. Benefits / Amenities
      if (selectedBenefits.length > 0) {
        const venueAmenities = tournament.venueDetails?.amenities || [];
        const matchesAllBenefits = selectedBenefits.every((b) =>
          venueAmenities.some((a) => a.toLowerCase().includes(b.toLowerCase()))
        );
        if (!matchesAllBenefits) return false;
      }

      return true;
    }).sort((a, b) => {
      const prizeA = parseInt(a.totalPrizePool.replace(/[^\d]/g, ""), 10) || 0;
      const prizeB = parseInt(b.totalPrizePool.replace(/[^\d]/g, ""), 10) || 0;
      if (sortBy === "prize-desc") return prizeB - prizeA;

      const priceA = parseInt(a.priceFrom.replace(/[^\d]/g, ""), 10) || 0;
      const priceB = parseInt(b.priceFrom.replace(/[^\d]/g, ""), 10) || 0;
      if (sortBy === "price-asc") return priceA - priceB;

      return 0;
    });
  }, [
    badmintonTournaments,
    searchQuery,
    selectedQuickStatus,
    selectedLocations,
    selectedStatuses,
    selectedPrizePools,
    selectedBenefits,
    sortBy,
  ]);

  const activeFilterCount =
    (selectedQuickStatus !== "all" ? 1 : 0) +
    selectedLocations.length +
    selectedStatuses.length +
    selectedPrizePools.length +
    selectedFormats.length +
    selectedLevels.length +
    selectedBenefits.length;

  const countForLocation = (loc: string) =>
    badmintonTournaments.filter(
      (t) =>
        t.location.includes(loc) ||
        t.venueDetails?.district?.includes(loc) ||
        t.venueDetails?.city?.includes(loc)
    ).length;

  const countForPrizePool = (pool: (typeof PRIZE_POOLS)[number]) =>
    badmintonTournaments.filter((t) => {
      const prizeNumeric = parseInt(t.totalPrizePool.replace(/[^\d]/g, ""), 10) || 0;
      return prizeNumeric >= pool.min && prizeNumeric <= pool.max;
    }).length;

  const countForBenefit = (benefit: string) =>
    badmintonTournaments.filter((t) =>
      (t.venueDetails?.amenities || []).some((a) =>
        a.toLowerCase().includes(benefit.toLowerCase())
      )
    ).length;

  // Transform to EventData format for EventCard
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

  // Sidebar Filter UI component
  const FilterSidebarContent = () => (
    <div className="space-y-4">
      {/* 1. Host Tournament Banner Card */}
      <div className="relative rounded-2xl overflow-hidden bg-card border border-primary/20 p-4 sm:p-5 shadow-2xs space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-primary text-white flex items-center justify-center shadow-2xs">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-foreground">Bạn là Ban Tổ Chức?</h3>
            <p className="text-[11px] text-muted-foreground font-normal">Tạo và quản lý giải đấu trên PlayGrid</p>
          </div>
        </div>
        <Link
          href="/contact"
          className="w-full h-9 rounded-xl bg-gradient-primary text-white font-bold text-xs shadow-2xs flex items-center justify-center hover:opacity-95 transition-all"
        >
          <span>Đăng ký tổ chức giải đấu</span>
        </Link>
      </div>

      {/* 2. Filter Form Container */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="rounded-2xl border border-border/80 bg-card p-4 sm:p-5 space-y-4 shadow-2xs divide-y divide-border/50"
      >
        <div className="flex items-center justify-between pb-1">
          <h3 className="font-bold text-sm sm:text-base text-foreground tracking-tight">
            Bộ lọc giải đấu
          </h3>
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Đặt lại</span>
            </button>
          )}
        </div>

        {/* SECTION 1: Trạng thái giải đấu */}
        <div className="pt-3.5 space-y-2">
          <h4 className="text-xs font-bold text-foreground tracking-wider">Trạng thái đăng ký</h4>
          <div className="space-y-1.5">
            {STATUS_OPTIONS.map((st) => {
              const isChecked = selectedStatuses.includes(st.id);
              return (
                <label
                  key={st.id}
                  className="flex items-center justify-between text-xs sm:text-sm text-foreground hover:text-primary cursor-pointer py-0.5 select-none"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleStatus(st.id)}
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
                    />
                    <span className={`truncate ${isChecked ? "font-bold text-primary" : "font-medium"}`}>
                      {st.label}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: Khu vực / Thành phố */}
        <div className="pt-3.5 space-y-2">
          <h4 className="text-xs font-bold text-foreground tracking-wider">Địa điểm thi đấu</h4>
          <div className="space-y-1.5">
            {CITIES_DISTRICTS.map((loc) => {
              const isChecked = selectedLocations.includes(loc);
              const count = countForLocation(loc);
              return (
                <label
                  key={loc}
                  className="flex items-center justify-between text-xs sm:text-sm text-foreground hover:text-primary cursor-pointer py-0.5 select-none"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleLocation(loc)}
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
                    />
                    <span className={`truncate ${isChecked ? "font-bold text-primary" : "font-medium"}`}>
                      {loc}
                    </span>
                  </div>
                  <span className="text-[11px] text-muted-foreground font-semibold shrink-0 pl-1">
                    {count}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* SECTION 3: Quy mô giải thưởng */}
        <div className="pt-3.5 space-y-2">
          <h4 className="text-xs font-bold text-foreground tracking-wider">Tổng giải thưởng</h4>
          <div className="space-y-1.5">
            {PRIZE_POOLS.map((pool) => {
              const isChecked = selectedPrizePools.includes(pool.id);
              const count = countForPrizePool(pool);
              return (
                <label
                  key={pool.id}
                  className="flex items-center justify-between text-xs sm:text-sm text-foreground hover:text-primary cursor-pointer py-0.5 select-none"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => togglePrizePool(pool.id)}
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
                    />
                    <span className={`truncate ${isChecked ? "font-bold text-primary" : "font-medium"}`}>
                      {pool.label}
                    </span>
                  </div>
                  <span className="text-[11px] text-muted-foreground font-semibold shrink-0 pl-1">
                    {count}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* SECTION 4: Hạng mục thi đấu */}
        <div className="pt-3.5 space-y-2">
          <h4 className="text-xs font-bold text-foreground tracking-wider">Hạng mục thi đấu</h4>
          <div className="space-y-1.5">
            {FORMAT_OPTIONS.map((fmt) => {
              const isChecked = selectedFormats.includes(fmt.id);
              return (
                <label
                  key={fmt.id}
                  className="flex items-center justify-between text-xs sm:text-sm text-foreground hover:text-primary cursor-pointer py-0.5 select-none"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleFormat(fmt.id)}
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
                    />
                    <span className={`truncate ${isChecked ? "font-bold text-primary" : "font-medium"}`}>
                      {fmt.label}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* SECTION 5: Trình độ tham gia */}
        <div className="pt-3.5 space-y-2">
          <h4 className="text-xs font-bold text-foreground tracking-wider">Trình độ tham gia</h4>
          <div className="space-y-1.5">
            {SKILL_LEVELS.map((lvl) => {
              const isChecked = selectedLevels.includes(lvl.id);
              return (
                <label
                  key={lvl.id}
                  className="flex items-center justify-between text-xs sm:text-sm text-foreground hover:text-primary cursor-pointer py-0.5 select-none"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleLevel(lvl.id)}
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
                    />
                    <span className={`truncate ${isChecked ? "font-bold text-primary" : "font-medium"}`}>
                      {lvl.label}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* SECTION 6: Quyền lợi & Tiện ích */}
        <div className="pt-3.5 space-y-2">
          <h4 className="text-xs font-bold text-foreground tracking-wider">Tiện ích & Quyền lợi</h4>
          <div className="space-y-1.5">
            {AMENITY_BENEFITS.map((benefit) => {
              const isChecked = selectedBenefits.includes(benefit);
              const count = countForBenefit(benefit);
              return (
                <label
                  key={benefit}
                  className="flex items-center justify-between text-xs sm:text-sm text-foreground hover:text-primary cursor-pointer py-0.5 select-none"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleBenefit(benefit)}
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
                    />
                    <span className={`truncate ${isChecked ? "font-bold text-primary" : "font-medium"}`}>
                      {benefit}
                    </span>
                  </div>
                  <span className="text-[11px] text-muted-foreground font-semibold shrink-0 pl-1">
                    {count}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      </form>
    </div>
  );

  const breadcrumbSchema = getBreadcrumbJsonLd([
    { name: "Trang chủ", url: `/${locale}` },
    { name: "Cầu lông", url: `/${locale}/badminton` },
    { name: "Giải đấu Cầu Lông", url: `/${locale}/badminton/tournaments` },
  ]);

  const tournamentItemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Giải Đấu Cầu Lông Toàn Quốc - PlayGrid",
    "description": "Danh sách các giải đấu cầu lông phong trào, bán chuyên và mở rộng đang mở đăng ký vé thi đấu.",
    "itemListElement": badmintonTournaments.map((t, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "SportsEvent",
        "name": t.title,
        "startDate": t.startDate,
        "endDate": t.endDate,
        "location": {
          "@type": "Place",
          "name": t.venueDetails?.name || t.location,
          "address": t.location,
        },
        "offers": {
          "@type": "Offer",
          "price": t.priceFrom,
          "priceCurrency": "VND",
        },
      },
    })),
  };

  return (
    <main className="w-full flex flex-col min-h-screen bg-background text-foreground">
      <JsonLdScript data={[breadcrumbSchema, tournamentItemListSchema]} />

      {/* 2-Tier Sub Navigation Bar */}
      <SportSubNav currentSport="badminton" />

      {/* Main Container Section */}
      <section className="w-full pt-5 sm:pt-7 pb-16 bg-background flex-1">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 space-y-4">
          {/* Top Search, Quick Status Filter & Sort Bar */}
          <div className="bg-card border border-border/80 rounded-2xl p-3 sm:p-4 shadow-2xs space-y-3">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 sm:gap-3">
              {/* Search Bar Input */}
              <div className="relative flex-1 min-w-0 w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm theo tên giải đấu, nhà thi đấu, thành phố..."
                  className="w-full pl-10 pr-4 h-10 rounded-xl bg-background border border-border/70 text-foreground placeholder:text-muted-foreground text-xs sm:text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Action Controls Row */}
              <div className="flex items-center gap-2 w-full lg:w-auto">
                {/* Mobile Filter Trigger Button */}
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center justify-center gap-1.5 h-10 px-3 rounded-xl text-xs font-semibold bg-primary/10 border border-primary/20 text-primary hover:bg-primary/15 transition-colors cursor-pointer shrink-0 whitespace-nowrap"
                >
                  <Filter className="w-4 h-4 shrink-0" />
                  <span className="whitespace-nowrap">Bộ lọc</span>
                  {activeFilterCount > 0 && (
                    <span className="w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shrink-0">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                {/* Shadcn UI Sorting Dropdown */}
                <div className="flex-1 lg:flex-initial lg:w-[185px] min-w-0">
                  <Select value={sortBy} onValueChange={(val) => setSortBy(val as any)}>
                    <SelectTrigger className="w-full h-10 text-xs sm:text-sm">
                      <div className="flex items-center gap-1.5 truncate">
                        <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                        <span className="truncate">
                          {sortBy === "latest"
                            ? "Mới nhất"
                            : sortBy === "prize-desc"
                            ? "Giải thưởng cao nhất"
                            : sortBy === "price-asc"
                            ? "Lệ phí: Thấp -> Cao"
                            : "Hạn đăng ký gần nhất"}
                        </span>
                      </div>
                    </SelectTrigger>
                    <SelectContent align="end" className="w-[195px]">
                      <SelectItem value="latest">Mới nhất</SelectItem>
                      <SelectItem value="prize-desc">Giải thưởng cao nhất</SelectItem>
                      <SelectItem value="price-asc">Lệ phí: Thấp đến Cao</SelectItem>
                      <SelectItem value="deadline">Hạn đăng ký gần nhất</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Quick Status Filter Pills Row */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none pt-1 pb-0.5">
              <span className="text-xs font-semibold text-muted-foreground shrink-0 mr-0.5">
                Trạng thái:
              </span>
              {[
                { id: "all", label: "Tất cả giải đấu" },
                { id: "open", label: "Đang mở đơn" },
                { id: "upcoming", label: "Sắp diễn ra" },
              ].map((pill) => (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => setSelectedQuickStatus(pill.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold shrink-0 whitespace-nowrap transition-all cursor-pointer ${
                    selectedQuickStatus === pill.id
                      ? "bg-primary text-primary-foreground shadow-2xs"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/60"
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2-Column Main Layout (Sidebar Filter Left + Tournaments Grid Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            {/* COLUMN 1: Sidebar Filter (Desktop) */}
            <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-[110px]">
              <FilterSidebarContent />
            </aside>

            {/* COLUMN 2: Tournaments Grid (Right) */}
            <div className="lg:col-span-8 xl:col-span-9 space-y-4">
              {/* Results Counter Header */}
              <div className="flex items-center justify-between px-1">
                <div>
                  <h2 className="text-base sm:text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-500 shrink-0" />
                    <span>Giải Đấu Cầu Lông Đang Mở Đăng Ký</span>
                  </h2>
                  <p className="text-xs text-muted-foreground font-normal mt-0.5">
                    Tìm thấy <span className="font-bold text-primary">{filteredTournaments.length}</span> giải đấu tranh cúp trên hệ thống
                  </p>
                </div>

                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-xs font-semibold text-primary hover:underline cursor-pointer"
                  >
                    Xoá bộ lọc ({activeFilterCount})
                  </button>
                )}
              </div>

              {/* Tournaments Grid: 3-Card Master Layout */}
              {eventCardsData.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5">
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
                /* Empty Filter State */
                <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-border/80 bg-card/60 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-muted/80 text-muted-foreground flex items-center justify-center mx-auto">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-foreground">
                    Không tìm thấy giải đấu phù hợp
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground font-normal max-w-md mx-auto">
                    Thử điều chỉnh lại bộ lọc, mở rộng khu vực hoặc chọn tất cả trạng thái giải đấu để xem thêm nhiều giải đấu hấp dẫn khác.
                  </p>
                  <div className="pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleResetFilters}
                      className="rounded-xl font-semibold text-xs h-9 px-4"
                    >
                      Đặt lại bộ lọc
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filter Bottom Sheet / Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div
            className="fixed inset-0"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative z-10 w-full max-h-[85vh] overflow-y-auto bg-card rounded-t-3xl border-t border-border p-5 space-y-4 shadow-sm animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between pb-2 border-b border-border/60">
              <h3 className="font-bold text-base text-foreground">Bộ lọc giải đấu</h3>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="text-xs font-bold text-primary p-1"
              >
                Đóng
              </button>
            </div>
            <FilterSidebarContent />
            <div className="pt-2">
              <Button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full h-11 rounded-xl bg-gradient-primary text-white font-bold text-sm shadow-2xs"
              >
                Xem {filteredTournaments.length} kết quả
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
