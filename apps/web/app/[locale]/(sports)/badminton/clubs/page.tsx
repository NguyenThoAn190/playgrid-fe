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
  X,
} from "lucide-react";
import { useLocale } from "next-intl";
import { SportSubNav } from "@/components/sports/sport-sub-nav";
import { ClubCard, ClubData } from "@/components/clubs/club-card";
import { CLUBS_DATA } from "@/lib/clubs-data";
import { JsonLdScript, getBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@workspace/ui/components/select";
import { Button } from "@/components/ui/button";

const DISTRICT_LIST = [
  "Thủ Đức",
  "Tân Bình",
  "Quận 7",
  "Quận 11",
  "Quận 10",
  "Đống Đa",
  "Cầu Giấy",
];

const STATUS_FILTERS = [
  { id: "recruiting", label: "Đang tuyển thành viên" },
  { id: "today", label: "Hoạt động hôm nay" },
  { id: "weekend", label: "Sinh hoạt cuối tuần" },
];

const MEMBER_SCALES = [
  { id: "over-1000", label: "Trên 1.000 thành viên", min: 1000, max: 999999 },
  { id: "500-1000", label: "500 - 1.000 thành viên", min: 500, max: 1000 },
  { id: "under-500", label: "Dưới 500 thành viên", min: 0, max: 500 },
];

const CLUB_PERKS = [
  "Có HLV hướng dẫn",
  "Sân thảm BWF máy lạnh",
  "Giao lưu cọ xát giải đấu",
  "Cầu thi đấu miễn phí",
  "Ưu đãi đặt sân PlayGrid",
];

export default function BadmintonClubsPage() {
  const locale = useLocale();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedQuickFilter, setSelectedQuickFilter] = useState<string>("all");
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedMemberScales, setSelectedMemberScales] = useState<string[]>([]);
  const [onlyVip, setOnlyVip] = useState(false);
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<"rating" | "members" | "reviews">("rating");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isCreateClubModalOpen, setIsCreateClubModalOpen] = useState(false);

  // Form states for creating a new club
  const [newClubName, setNewClubName] = useState("");
  const [newClubDistrict, setNewClubDistrict] = useState(DISTRICT_LIST[0]);
  const [newClubDescription, setNewClubDescription] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Filter only badminton clubs
  const badmintonClubs = useMemo(() => {
    return CLUBS_DATA.filter((club) => club.sport === "Cầu lông");
  }, []);

  const toggleDistrict = (district: string) => {
    setSelectedDistricts((prev) =>
      prev.includes(district) ? prev.filter((d) => d !== district) : [...prev, district]
    );
  };

  const toggleStatus = (statusId: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(statusId) ? prev.filter((s) => s !== statusId) : [...prev, statusId]
    );
  };

  const toggleMemberScale = (scaleId: string) => {
    setSelectedMemberScales((prev) =>
      prev.includes(scaleId) ? prev.filter((m) => m !== scaleId) : [...prev, scaleId]
    );
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedQuickFilter("all");
    setSelectedDistricts([]);
    setSelectedStatuses([]);
    setSelectedMemberScales([]);
    setOnlyVip(false);
    setOnlyVerified(false);
    setMinRating(null);
    setSortBy("rating");
  };

  const filteredClubs = useMemo(() => {
    return badmintonClubs.filter((club) => {
      // 1. Search Query
      if (
        searchQuery &&
        !club.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !club.location.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // 2. Quick Filter
      if (selectedQuickFilter === "recruiting" && !club.statusText?.includes("tuyển")) return false;
      if (selectedQuickFilter === "vip" && !club.isVip) return false;

      // 3. District
      if (selectedDistricts.length > 0) {
        const matchesDistrict = selectedDistricts.some((d) => club.location.includes(d));
        if (!matchesDistrict) return false;
      }

      // 4. Status Checkbox
      if (selectedStatuses.length > 0) {
        const matchesStatus = selectedStatuses.some((s) => {
          if (s === "recruiting") return club.statusText?.includes("tuyển");
          if (s === "today") return club.statusText?.includes("hôm nay") || club.statusText?.includes("hàng ngày");
          if (s === "weekend") return club.statusText?.includes("cuối tuần");
          return true;
        });
        if (!matchesStatus) return false;
      }

      // 5. Member Scale
      if (selectedMemberScales.length > 0) {
        const matchesScale = selectedMemberScales.some((scaleId) => {
          const scale = MEMBER_SCALES.find((s) => s.id === scaleId);
          if (!scale) return false;
          return club.memberCount >= scale.min && club.memberCount <= scale.max;
        });
        if (!matchesScale) return false;
      }

      // 6. VIP & Verified
      if (onlyVip && !club.isVip) return false;
      if (onlyVerified && !club.isVerified) return false;

      // 7. Rating
      if (minRating !== null && club.rating < minRating) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "members") return b.memberCount - a.memberCount;
      if (sortBy === "reviews") return b.reviewCount - a.reviewCount;
      return 0;
    });
  }, [
    badmintonClubs,
    searchQuery,
    selectedQuickFilter,
    selectedDistricts,
    selectedStatuses,
    selectedMemberScales,
    onlyVip,
    onlyVerified,
    minRating,
    sortBy,
  ]);

  const activeFilterCount =
    (selectedQuickFilter !== "all" ? 1 : 0) +
    selectedDistricts.length +
    selectedStatuses.length +
    selectedMemberScales.length +
    (onlyVip ? 1 : 0) +
    (onlyVerified ? 1 : 0) +
    (minRating ? 1 : 0);

  const countForDistrict = (district: string) =>
    badmintonClubs.filter((c) => c.location.includes(district)).length;

  const countForMemberScale = (scale: (typeof MEMBER_SCALES)[number]) =>
    badmintonClubs.filter((c) => c.memberCount >= scale.min && c.memberCount <= scale.max).length;

  const handleCreateClubSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsCreateClubModalOpen(false);
      setNewClubName("");
      setNewClubDescription("");
    }, 1500);
  };

  // Sidebar Filter Component
  const FilterSidebarContent = () => (
    <div className="space-y-4">
      {/* 1. Host Club Banner Card */}
      <div className="relative rounded-2xl overflow-hidden bg-card border border-primary/20 p-4 sm:p-5 shadow-2xs space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-primary text-white flex items-center justify-center shadow-2xs">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-foreground">Bạn quản lý một CLB?</h3>
            <p className="text-[11px] text-muted-foreground font-normal">Đăng ký để tuyển thành viên và mở kèo</p>
          </div>
        </div>
        <Button
          type="button"
          onClick={() => {
            setIsCreateClubModalOpen(true);
            setIsMobileFilterOpen(false);
          }}
          className="w-full h-9 rounded-xl bg-gradient-primary text-white font-bold text-xs shadow-2xs cursor-pointer active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4 mr-1 stroke-[2.5]" />
          <span>Tạo hồ sơ CLB mới</span>
        </Button>
      </div>

      {/* 2. Filter Form Container */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="rounded-2xl border border-border/80 bg-card p-4 sm:p-5 space-y-4 shadow-2xs divide-y divide-border/50"
      >
        <div className="flex items-center justify-between pb-1">
          <h3 className="font-bold text-sm sm:text-base text-foreground tracking-tight">
            Bộ lọc câu lạc bộ
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

        {/* SECTION 1: Trạng thái tuyển thành viên */}
        <div className="pt-3.5 space-y-2">
          <h4 className="text-xs font-bold text-foreground tracking-wider">Trạng thái hoạt động</h4>
          <div className="space-y-1.5">
            {STATUS_FILTERS.map((st) => {
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

        {/* SECTION 2: Khu vực / Quận */}
        <div className="pt-3.5 space-y-2">
          <h4 className="text-xs font-bold text-foreground tracking-wider">Khu vực sinh hoạt</h4>
          <div className="space-y-1.5">
            {DISTRICT_LIST.map((dist) => {
              const isChecked = selectedDistricts.includes(dist);
              const count = countForDistrict(dist);
              return (
                <label
                  key={dist}
                  className="flex items-center justify-between text-xs sm:text-sm text-foreground hover:text-primary cursor-pointer py-0.5 select-none"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleDistrict(dist)}
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
                    />
                    <span className={`truncate ${isChecked ? "font-bold text-primary" : "font-medium"}`}>
                      {dist}
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

        {/* SECTION 3: Quy mô thành viên */}
        <div className="pt-3.5 space-y-2">
          <h4 className="text-xs font-bold text-foreground tracking-wider">Quy mô thành viên</h4>
          <div className="space-y-1.5">
            {MEMBER_SCALES.map((scale) => {
              const isChecked = selectedMemberScales.includes(scale.id);
              const count = countForMemberScale(scale);
              return (
                <label
                  key={scale.id}
                  className="flex items-center justify-between text-xs sm:text-sm text-foreground hover:text-primary cursor-pointer py-0.5 select-none"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleMemberScale(scale.id)}
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
                    />
                    <span className={`truncate ${isChecked ? "font-bold text-primary" : "font-medium"}`}>
                      {scale.label}
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

        {/* SECTION 4: Huy hiệu & Uy tín */}
        <div className="pt-3.5 space-y-2">
          <h4 className="text-xs font-bold text-foreground tracking-wider">Chứng nhận & Uy tín</h4>
          <div className="space-y-1.5">
            <label className="flex items-center justify-between text-xs sm:text-sm text-foreground hover:text-primary cursor-pointer py-0.5 select-none">
              <div className="flex items-center gap-2 min-w-0">
                <input
                  type="checkbox"
                  checked={onlyVip}
                  onChange={() => setOnlyVip(!onlyVip)}
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
                />
                <div className="flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
                  <span className={onlyVip ? "font-bold text-primary" : "font-medium"}>
                    Câu lạc bộ VIP Crown
                  </span>
                </div>
              </div>
            </label>

            <label className="flex items-center justify-between text-xs sm:text-sm text-foreground hover:text-primary cursor-pointer py-0.5 select-none">
              <div className="flex items-center gap-2 min-w-0">
                <input
                  type="checkbox"
                  checked={onlyVerified}
                  onChange={() => setOnlyVerified(!onlyVerified)}
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
                />
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500 shrink-0" />
                  <span className={onlyVerified ? "font-bold text-primary" : "font-medium"}>
                    Đã xác minh uy tín
                  </span>
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* SECTION 5: Đánh giá sao */}
        <div className="pt-3.5 space-y-2">
          <h4 className="text-xs font-bold text-foreground tracking-wider">Đánh giá người chơi</h4>
          <div className="flex items-center gap-1.5">
            {[4.9, 4.8, 4.7].map((rate) => (
              <button
                key={rate}
                type="button"
                onClick={() => setMinRating(minRating === rate ? null : rate)}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                  minRating === rate
                    ? "bg-primary text-primary-foreground shadow-2xs"
                    : "bg-background border border-border/80 text-muted-foreground hover:bg-muted"
                }`}
              >
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{rate}★+</span>
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );

  const breadcrumbSchema = getBreadcrumbJsonLd([
    { name: "Trang chủ", url: `/${locale}` },
    { name: "Cầu lông", url: `/${locale}/badminton` },
    { name: "Câu lạc bộ Cầu Lông", url: `/${locale}/badminton/clubs` },
  ]);

  return (
    <main className="w-full flex flex-col min-h-screen bg-background text-foreground">
      <JsonLdScript data={[breadcrumbSchema]} />

      {/* 2-Tier Sub Navigation Bar */}
      <SportSubNav currentSport="badminton" />

      {/* Main Container Section */}
      <section className="w-full pt-5 sm:pt-7 pb-16 bg-background flex-1">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 space-y-4">
          {/* Top Search, Quick Filter & Sort Bar */}
          <div className="bg-card border border-border/80 rounded-2xl p-3 sm:p-4 shadow-2xs space-y-3">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 sm:gap-3">
              {/* Search Bar Input */}
              <div className="relative flex-1 min-w-0 w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm theo tên câu lạc bộ, khu vực..."
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
                          {sortBy === "rating"
                            ? "Đánh giá cao nhất"
                            : sortBy === "members"
                            ? "Đông thành viên nhất"
                            : "Nhiều đánh giá nhất"}
                        </span>
                      </div>
                    </SelectTrigger>
                    <SelectContent align="end" className="w-[190px]">
                      <SelectItem value="rating">Đánh giá cao nhất</SelectItem>
                      <SelectItem value="members">Đông thành viên nhất</SelectItem>
                      <SelectItem value="reviews">Nhiều đánh giá nhất</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Create Club CTA Primary Button */}
                <Button
                  type="button"
                  onClick={() => setIsCreateClubModalOpen(true)}
                  className="h-10 px-3 sm:px-4 rounded-xl bg-gradient-primary text-white font-bold text-xs sm:text-sm shadow-2xs hover:opacity-95 active:scale-95 transition-all cursor-pointer shrink-0 whitespace-nowrap"
                >
                  <Plus className="w-4 h-4 mr-0.5 sm:mr-1 stroke-[2.5]" />
                  <span>Tạo Hồ Sơ CLB</span>
                </Button>
              </div>
            </div>

            {/* Quick Status Filter Pills Row */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none pt-1 pb-0.5">
              <span className="text-xs font-semibold text-muted-foreground shrink-0 mr-0.5">
                Lọc nhanh:
              </span>
              {[
                { id: "all", label: "Tất cả CLB" },
                { id: "recruiting", label: "Đang tuyển hội viên" },
                { id: "vip", label: "CLB VIP Crown" },
              ].map((pill) => (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => setSelectedQuickFilter(pill.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold shrink-0 whitespace-nowrap transition-all cursor-pointer ${
                    selectedQuickFilter === pill.id
                      ? "bg-primary text-primary-foreground shadow-2xs"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/60"
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2-Column Main Layout (Sidebar Left + Clubs Grid Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            {/* COLUMN 1: Sidebar Filter (Desktop) */}
            <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-[110px]">
              <FilterSidebarContent />
            </aside>

            {/* COLUMN 2: Clubs Grid (Right) */}
            <div className="lg:col-span-8 xl:col-span-9 space-y-4">
              {/* Results Counter Header */}
              <div className="flex items-center justify-between px-1">
                <div>
                  <h2 className="text-base sm:text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
                    <Shield className="w-5 h-5 text-indigo-500 shrink-0" />
                    <span>Câu Lạc Bộ Cầu Lông Uy Tín</span>
                  </h2>
                  <p className="text-xs text-muted-foreground font-normal mt-0.5">
                    Tìm thấy <span className="font-bold text-primary">{filteredClubs.length}</span> câu lạc bộ đang sinh hoạt
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

              {/* Clubs Grid: Responsive 3/4-Card Master Layout */}
              {filteredClubs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5">
                  {filteredClubs.map((club) => (
                    <ClubCard key={club.id} club={club} className="h-full" />
                  ))}
                </div>
              ) : (
                /* Empty Filter State */
                <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-border/80 bg-card/60 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-muted/80 text-muted-foreground flex items-center justify-center mx-auto">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-foreground">
                    Không tìm thấy câu lạc bộ phù hợp
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground font-normal max-w-md mx-auto">
                    Thử điều chỉnh bộ lọc khu vực hoặc xoá bớt tiêu chí để khám phá thêm nhiều câu lạc bộ phong trào sôi nổi.
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
              <h3 className="font-bold text-base text-foreground">Bộ lọc câu lạc bộ</h3>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="text-xs font-bold text-primary p-1 cursor-pointer"
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
                Xem {filteredClubs.length} kết quả
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Create Club Modal */}
      {isCreateClubModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="fixed inset-0" onClick={() => setIsCreateClubModalOpen(false)} />
          <div className="relative z-10 w-full max-w-lg rounded-2xl bg-card border border-border shadow-sm overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 pb-3 border-b border-border/60 bg-muted/20 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-foreground">
                    Đăng Ký Hồ Sơ CLB Mới
                  </h2>
                  <p className="text-xs text-muted-foreground font-normal">
                    Xây dựng và phát triển cộng đồng thể thao của bạn trên PlayGrid.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateClubModalOpen(false)}
                className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {isSubmitted ? (
              <div className="p-8 text-center space-y-3 my-auto">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-500/20 animate-in zoom-in-50">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Đã Gửi Hồ Sơ CLB!</h3>
                <p className="text-xs sm:text-sm text-muted-foreground font-normal max-w-sm mx-auto">
                  Ban quản trị PlayGrid sẽ liên hệ xác minh và hỗ trợ kích hoạt huy hiệu CLB chính thức cho bạn trong 24 giờ.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCreateClubSubmit} className="p-5 space-y-4 overflow-y-auto flex-1">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <span>Tên câu lạc bộ</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newClubName}
                    onChange={(e) => setNewClubName(e.target.value)}
                    placeholder="Ví dụ: CLB Cầu Lông Thủ Đức Smashers..."
                    className="w-full px-3.5 py-2 rounded-xl bg-background border border-border/80 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>Khu vực sinh hoạt chính</span>
                  </label>
                  <select
                    value={newClubDistrict}
                    onChange={(e) => setNewClubDistrict(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-background border border-border/80 text-xs sm:text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                  >
                    {DISTRICT_LIST.map((dist) => (
                      <option key={dist} value={dist}>
                        {dist}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground">
                    Giới thiệu về CLB & Lịch sinh hoạt
                  </label>
                  <textarea
                    rows={3}
                    value={newClubDescription}
                    onChange={(e) => setNewClubDescription(e.target.value)}
                    placeholder="Ví dụ: CLB sinh hoạt vào các tối Thứ 3 - 5 - 7 từ 19:00 tại sân Khang An. Tuyển thành viên mọi trình độ..."
                    className="w-full px-3.5 py-2 rounded-xl bg-background border border-border/80 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>

                <div className="pt-3 border-t border-border/60 flex items-center justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsCreateClubModalOpen(false)}
                    className="rounded-xl font-semibold text-xs sm:text-sm h-9 sm:h-10 px-4 cursor-pointer"
                  >
                    Huỷ bỏ
                  </Button>
                  <Button
                    type="submit"
                    variant="default"
                    className="rounded-xl font-bold text-xs sm:text-sm h-9 sm:h-10 px-5 bg-gradient-primary text-white shadow-2xs cursor-pointer"
                  >
                    Gửi Đăng Ký
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
