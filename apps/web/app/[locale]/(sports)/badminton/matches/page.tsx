"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  MapPin,
  Calendar,
  Clock,
  Users,
  Plus,
  RotateCcw,
  Filter,
  ArrowUpDown,
  Sparkles,
  LayoutGrid,
  List as ListIcon,
  Flame,
  CheckCircle2,
  Trophy,
} from "lucide-react";
import { useLocale } from "next-intl";
import { SportSubNav } from "@/components/sports/sport-sub-nav";
import { FindPlayerCard, ActivityData } from "@/components/activities/find-player-card";
import { CreateMatchModal } from "@/components/matches/create-match-modal";
import { JsonLdScript, getBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@workspace/ui/components/select";
import { Button } from "@/components/ui/button";

export interface BadmintonMatchItem extends ActivityData {
  district: string;
  timeOfDay: "morning" | "afternoon" | "evening";
  priceValue: number;
  format: "doubles_mixed" | "doubles_men" | "doubles_women" | "singles" | "casual";
}

const INITIAL_BADMINTON_MATCHES: BadmintonMatchItem[] = [
  {
    id: "match-bm-1",
    title: "Đánh đôi giao lưu trình 3.0 - 3.5 sân Khang An tối nay",
    sport: "Cầu lông",
    statusBadge: "Cần 2 người",
    statusType: "available",
    level: "Trình 3.0 - 3.5",
    price: "50.000đ",
    priceValue: 50000,
    date: "Hôm nay",
    time: "19:00 - 21:00",
    timeOfDay: "evening",
    district: "Thủ Đức",
    location: "Khang An Badminton Club, Thủ Đức",
    format: "doubles_mixed",
    imageUrl: "/images/explore_sports/gridy-badminton.avif",
    joinedCount: 4,
    maxCount: 6,
    participants: [
      { id: "u1", name: "Nguyễn Văn Hùng", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" },
      { id: "u2", name: "Trần Anh Tuấn", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" },
      { id: "u3", name: "Lê Minh Khoa", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" },
      { id: "u4", name: "Phạm Quốc Bảo", avatarUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80" },
    ],
  },
  {
    id: "match-bm-2",
    title: "Kèo đôi nam nâng cao cọ xát kinh nghiệm sân VNB",
    sport: "Cầu lông",
    statusBadge: "Còn 1 slot",
    statusType: "available",
    level: "Trình 3.5 - 4.0",
    price: "60.000đ",
    priceValue: 60000,
    date: "Hôm nay",
    time: "20:00 - 22:00",
    timeOfDay: "evening",
    district: "Tân Bình",
    location: "VNB Sports Center, Tân Bình",
    format: "doubles_men",
    imageUrl: "/images/activities/badminton-banner.png",
    joinedCount: 3,
    maxCount: 4,
    participants: [
      { id: "u5", name: "Đặng Hoàng Nam", avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80" },
      { id: "u6", name: "Lý Gia Bảo", avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80" },
      { id: "u7", name: "Vũ Quang Dũng", avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80" },
    ],
  },
  {
    id: "match-bm-3",
    title: "Giao lưu vui vẻ phong trào sân Phú Thọ chiều mai",
    sport: "Cầu lông",
    statusBadge: "Cần 3 người",
    statusType: "available",
    level: "Trình 2.0 - 2.5",
    price: "40.000đ",
    priceValue: 40000,
    date: "Ngày mai",
    time: "17:30 - 19:30",
    timeOfDay: "afternoon",
    district: "Quận 11",
    location: "Sân Thể Thao Phú Thọ, Quận 11",
    format: "casual",
    imageUrl: "/images/activities/badminton-banner.png",
    joinedCount: 1,
    maxCount: 4,
    participants: [
      { id: "u8", name: "Hoàng Minh Trí", avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80" },
    ],
  },
  {
    id: "match-bm-4",
    title: "Đơn nam cọ xát thể lực & chiến thuật sân Tada",
    sport: "Cầu lông",
    statusBadge: "Còn chỗ",
    statusType: "available",
    level: "Trình 3.5+",
    price: "70.000đ",
    priceValue: 70000,
    date: "Ngày mai",
    time: "19:00 - 21:00",
    timeOfDay: "evening",
    district: "Quận 7",
    location: "Tada Badminton Center, Quận 7",
    format: "singles",
    imageUrl: "/images/explore_sports/gridy-badminton.avif",
    joinedCount: 1,
    maxCount: 2,
    participants: [
      { id: "u9", name: "Phạm Hải Đăng", avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" },
    ],
  },
  {
    id: "match-bm-5",
    title: "Giao lưu sáng sớm Viettel Hùng Vương rèn luyện sức khoẻ",
    sport: "Cầu lông",
    statusBadge: "Cần 2 người",
    statusType: "available",
    level: "Trình 2.5 - 3.0",
    price: "45.000đ",
    priceValue: 45000,
    date: "Ngày mai",
    time: "06:30 - 08:30",
    timeOfDay: "morning",
    district: "Quận 10",
    location: "Sân Cầu Lông Viettel Hùng Vương, Quận 10",
    format: "doubles_mixed",
    imageUrl: "/images/activities/badminton-banner.png",
    joinedCount: 2,
    maxCount: 4,
    participants: [
      { id: "u10", name: "Ngô Quốc Khánh", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" },
      { id: "u11", name: "Bùi Thị Mai", avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80" },
    ],
  },
  {
    id: "match-bm-6",
    title: "Kèo đôi nam nữ & giao lưu cuối tuần Thủ Đức Smash",
    sport: "Cầu lông",
    statusBadge: "Còn 2 slot",
    statusType: "available",
    level: "Trình 3.0 - 3.5",
    price: "50.000đ",
    priceValue: 50000,
    date: "Thứ Bảy này",
    time: "18:00 - 20:30",
    timeOfDay: "evening",
    district: "Thủ Đức",
    location: "Sân Cầu Lông Thủ Đức Smash, Thủ Đức",
    format: "doubles_mixed",
    imageUrl: "/images/explore_sports/gridy-badminton.avif",
    joinedCount: 4,
    maxCount: 6,
    participants: [
      { id: "u12", name: "Đỗ Anh Dũng", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" },
      { id: "u13", name: "Phạm Thu Trang", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" },
      { id: "u14", name: "Lê Văn Hùng", avatarUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80" },
      { id: "u15", name: "Nguyễn Hải Yến", avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80" },
    ],
  },
  {
    id: "match-bm-7",
    title: "Kèo đôi nâng cao chuẩn bị thi đấu giải Hà Nội Arena",
    sport: "Cầu lông",
    statusBadge: "Còn 1 slot",
    statusType: "available",
    level: "Trình 4.0+",
    price: "80.000đ",
    priceValue: 80000,
    date: "Chủ Nhật này",
    time: "19:00 - 21:30",
    timeOfDay: "evening",
    district: "Hà Nội",
    location: "Sân Cầu Lông Hà Nội Arena, Cầu Giấy, Hà Nội",
    format: "doubles_men",
    imageUrl: "/images/activities/badminton-banner.png",
    joinedCount: 3,
    maxCount: 4,
    participants: [
      { id: "u16", name: "Trịnh Đình Trọng", avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80" },
      { id: "u17", name: "Vũ Tiến Thành", avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80" },
      { id: "u18", name: "Nguyễn Tuấn Linh", avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80" },
    ],
  },
  {
    id: "match-bm-8",
    title: "Kèo nữ giao lưu & tập luyện thể lực sân Tân Bình Star",
    sport: "Cầu lông",
    statusBadge: "Cần 2 người",
    statusType: "available",
    level: "Trình 2.0 - 3.0",
    price: "45.000đ",
    priceValue: 45000,
    date: "Chủ Nhật này",
    time: "15:00 - 17:00",
    timeOfDay: "afternoon",
    district: "Tân Bình",
    location: "Sân Cầu Lông Tân Bình Star, Tân Bình",
    format: "doubles_women",
    imageUrl: "/images/explore_sports/gridy-badminton.avif",
    joinedCount: 2,
    maxCount: 4,
    participants: [
      { id: "u19", name: "Trần Bảo Ngọc", avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80" },
      { id: "u20", name: "Nguyễn Thuý An", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" },
    ],
  },
];

const DISTRICT_LIST = ["Thủ Đức", "Tân Bình", "Quận 11", "Quận 10", "Quận 7", "Hà Nội"];

const LEVEL_LIST = [
  { id: "2.0-2.5", label: "Trình 2.0 - 2.5 (Mới chơi)" },
  { id: "2.5-3.0", label: "Trình 2.5 - 3.0 (Cơ bản)" },
  { id: "3.0-3.5", label: "Trình 3.0 - 3.5 (Trung bình)" },
  { id: "3.5-4.0", label: "Trình 3.5 - 4.0 (Khá / Cọ xát)" },
  { id: "4.0+", label: "Trình 4.0+ (Nâng cao)" },
];

const TIME_OF_DAY_LIST = [
  { id: "morning", label: "Sáng (06:00 - 12:00)" },
  { id: "afternoon", label: "Chiều (12:00 - 18:00)" },
  { id: "evening", label: "Tối (18:00 - 23:00)" },
];

const FORMAT_LIST = [
  { id: "doubles_mixed", label: "Đôi nam nữ" },
  { id: "doubles_men", label: "Đôi nam" },
  { id: "doubles_women", label: "Đôi nữ" },
  { id: "singles", label: "Đơn nam / nữ" },
  { id: "casual", label: "Giao lưu tự do" },
];

const PRICE_TIERS = [
  { id: "under-50", label: "Dưới 50.000đ", min: 0, max: 50000 },
  { id: "50-70", label: "50.000đ - 70.000đ", min: 50000, max: 70000 },
  { id: "over-70", label: "Trên 70.000đ", min: 70000, max: 9999999 },
];

export default function BadmintonMatchesPage() {
  const locale = useLocale();
  const [matchesList, setMatchesList] = useState<BadmintonMatchItem[]>(INITIAL_BADMINTON_MATCHES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedQuickDate, setSelectedQuickDate] = useState<string>("all");
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedTimesOfDay, setSelectedTimesOfDay] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [selectedPriceTiers, setSelectedPriceTiers] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"latest" | "upcoming" | "price-asc" | "price-desc" | "slots-left">("latest");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Toggle helpers
  const toggleDistrict = (district: string) => {
    setSelectedDistricts((prev) =>
      prev.includes(district) ? prev.filter((d) => d !== district) : [...prev, district]
    );
  };

  const toggleLevel = (levelId: string) => {
    setSelectedLevels((prev) =>
      prev.includes(levelId) ? prev.filter((l) => l !== levelId) : [...prev, levelId]
    );
  };

  const toggleTimeOfDay = (timeId: string) => {
    setSelectedTimesOfDay((prev) =>
      prev.includes(timeId) ? prev.filter((t) => t !== timeId) : [...prev, timeId]
    );
  };

  const toggleFormat = (formatId: string) => {
    setSelectedFormats((prev) =>
      prev.includes(formatId) ? prev.filter((f) => f !== formatId) : [...prev, formatId]
    );
  };

  const togglePriceTier = (tierId: string) => {
    setSelectedPriceTiers((prev) =>
      prev.includes(tierId) ? prev.filter((p) => p !== tierId) : [...prev, tierId]
    );
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedQuickDate("all");
    setSelectedDistricts([]);
    setSelectedLevels([]);
    setSelectedTimesOfDay([]);
    setSelectedFormats([]);
    setSelectedPriceTiers([]);
    setSortBy("latest");
  };

  const handleAddMatch = (newMatch: any) => {
    const formattedItem: BadmintonMatchItem = {
      ...newMatch,
      district: newMatch.location.includes("Thủ Đức")
        ? "Thủ Đức"
        : newMatch.location.includes("Tân Bình")
        ? "Tân Bình"
        : newMatch.location.includes("Quận 11")
        ? "Quận 11"
        : newMatch.location.includes("Quận 10")
        ? "Quận 10"
        : newMatch.location.includes("Quận 7")
        ? "Quận 7"
        : "Thủ Đức",
      timeOfDay: "evening",
      priceValue: parseInt(newMatch.price.replace(/[^\d]/g, ""), 10) || 50000,
      format: "doubles_mixed",
    };
    setMatchesList((prev) => [formattedItem, ...prev]);
  };

  // Filter calculation
  const filteredMatches = useMemo(() => {
    return matchesList
      .filter((match) => {
        // 1. Search Query
        if (
          searchQuery &&
          !match.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !match.location.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }

        // 2. Quick Date
        if (selectedQuickDate !== "all") {
          if (selectedQuickDate === "today" && match.date !== "Hôm nay") return false;
          if (selectedQuickDate === "tomorrow" && match.date !== "Ngày mai") return false;
          if (
            selectedQuickDate === "weekend" &&
            match.date !== "Thứ Bảy này" &&
            match.date !== "Chủ Nhật này"
          ) {
            return false;
          }
        }

        // 3. Districts
        if (selectedDistricts.length > 0 && !selectedDistricts.includes(match.district)) {
          return false;
        }

        // 4. Levels
        if (selectedLevels.length > 0) {
          const matchesLevel = selectedLevels.some((lvl) => match.level.includes(lvl));
          if (!matchesLevel) return false;
        }

        // 5. Time of day
        if (selectedTimesOfDay.length > 0 && !selectedTimesOfDay.includes(match.timeOfDay)) {
          return false;
        }

        // 6. Format
        if (selectedFormats.length > 0 && !selectedFormats.includes(match.format)) {
          return false;
        }

        // 7. Price Tiers
        if (selectedPriceTiers.length > 0) {
          const matchesAnyTier = selectedPriceTiers.some((tierId) => {
            const tier = PRICE_TIERS.find((t) => t.id === tierId);
            if (!tier) return false;
            return match.priceValue >= tier.min && match.priceValue <= tier.max;
          });
          if (!matchesAnyTier) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.priceValue - b.priceValue;
        if (sortBy === "price-desc") return b.priceValue - a.priceValue;
        if (sortBy === "slots-left") return a.maxCount - a.joinedCount - (b.maxCount - b.joinedCount);
        return 0;
      });
  }, [
    matchesList,
    searchQuery,
    selectedQuickDate,
    selectedDistricts,
    selectedLevels,
    selectedTimesOfDay,
    selectedFormats,
    selectedPriceTiers,
    sortBy,
  ]);

  const activeFilterCount =
    (selectedQuickDate !== "all" ? 1 : 0) +
    selectedDistricts.length +
    selectedLevels.length +
    selectedTimesOfDay.length +
    selectedFormats.length +
    selectedPriceTiers.length;

  const countForDistrict = (district: string) =>
    matchesList.filter((m) => m.district === district).length;

  const countForLevel = (levelId: string) =>
    matchesList.filter((m) => m.level.includes(levelId)).length;

  const countForTime = (timeId: string) =>
    matchesList.filter((m) => m.timeOfDay === timeId).length;

  const countForFormat = (formatId: string) =>
    matchesList.filter((m) => m.format === formatId).length;

  const countForPrice = (tier: (typeof PRICE_TIERS)[number]) =>
    matchesList.filter((m) => m.priceValue >= tier.min && m.priceValue <= tier.max).length;

  // Sidebar Filter UI component
  const FilterSidebarContent = () => (
    <div className="space-y-4">
      {/* 1. Host Match Promo Box */}
      <div className="relative rounded-2xl overflow-hidden bg-card border border-primary/20 p-4 sm:p-5 shadow-2xs space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-primary text-white flex items-center justify-center shadow-2xs">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-foreground">Bạn đang thiếu người?</h3>
            <p className="text-[11px] text-muted-foreground font-normal">Đăng kèo tìm bạn chơi ngay</p>
          </div>
        </div>
        <Button
          type="button"
          onClick={() => {
            setIsCreateModalOpen(true);
            setIsMobileFilterOpen(false);
          }}
          className="w-full h-9 rounded-xl bg-gradient-primary text-white font-bold text-xs shadow-2xs cursor-pointer active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4 mr-1 stroke-[2.5]" />
          <span>Tạo kèo giao lưu mới</span>
        </Button>
      </div>

      {/* 2. Filter Form Container */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="rounded-2xl border border-border/80 bg-card p-4 sm:p-5 space-y-4 shadow-2xs divide-y divide-border/50"
      >
        <div className="flex items-center justify-between pb-1">
          <h3 className="font-bold text-sm sm:text-base text-foreground tracking-tight">
            Bộ lọc kèo đấu
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

        {/* SECTION 1: Khu vực / Quận */}
        <div className="pt-3.5 space-y-2">
          <h4 className="text-xs font-bold text-foreground tracking-wider">Khu vực / Quận</h4>
          <div className="space-y-1.5">
            {DISTRICT_LIST.map((district) => {
              const isChecked = selectedDistricts.includes(district);
              const count = countForDistrict(district);
              return (
                <label
                  key={district}
                  className="flex items-center justify-between text-xs sm:text-sm text-foreground hover:text-primary cursor-pointer py-0.5 select-none"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleDistrict(district)}
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
                    />
                    <span className={`truncate ${isChecked ? "font-bold text-primary" : "font-medium"}`}>
                      {district}
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

        {/* SECTION 2: Trình độ kỹ năng */}
        <div className="pt-3.5 space-y-2">
          <h4 className="text-xs font-bold text-foreground tracking-wider">Trình độ kỹ năng</h4>
          <div className="space-y-1.5">
            {LEVEL_LIST.map((lvl) => {
              const isChecked = selectedLevels.includes(lvl.id);
              const count = countForLevel(lvl.id);
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
                  <span className="text-[11px] text-muted-foreground font-semibold shrink-0 pl-1">
                    {count}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* SECTION 3: Khung giờ chơi */}
        <div className="pt-3.5 space-y-2">
          <h4 className="text-xs font-bold text-foreground tracking-wider">Khung giờ trong ngày</h4>
          <div className="space-y-1.5">
            {TIME_OF_DAY_LIST.map((timeItem) => {
              const isChecked = selectedTimesOfDay.includes(timeItem.id);
              const count = countForTime(timeItem.id);
              return (
                <label
                  key={timeItem.id}
                  className="flex items-center justify-between text-xs sm:text-sm text-foreground hover:text-primary cursor-pointer py-0.5 select-none"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleTimeOfDay(timeItem.id)}
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
                    />
                    <span className={`truncate ${isChecked ? "font-bold text-primary" : "font-medium"}`}>
                      {timeItem.label}
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

        {/* SECTION 4: Thể loại trận */}
        <div className="pt-3.5 space-y-2">
          <h4 className="text-xs font-bold text-foreground tracking-wider">Thể loại giao lưu</h4>
          <div className="space-y-1.5">
            {FORMAT_LIST.map((fmt) => {
              const isChecked = selectedFormats.includes(fmt.id);
              const count = countForFormat(fmt.id);
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
                  <span className="text-[11px] text-muted-foreground font-semibold shrink-0 pl-1">
                    {count}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* SECTION 5: Chi phí tham gia */}
        <div className="pt-3.5 space-y-2">
          <h4 className="text-xs font-bold text-foreground tracking-wider">Chi phí tham gia / người</h4>
          <div className="space-y-1.5">
            {PRICE_TIERS.map((tier) => {
              const isChecked = selectedPriceTiers.includes(tier.id);
              const count = countForPrice(tier);
              return (
                <label
                  key={tier.id}
                  className="flex items-center justify-between text-xs sm:text-sm text-foreground hover:text-primary cursor-pointer py-0.5 select-none"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => togglePriceTier(tier.id)}
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
                    />
                    <span className={`truncate ${isChecked ? "font-bold text-primary" : "font-medium"}`}>
                      {tier.label}
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
    { name: "Kèo ghép giao lưu", url: `/${locale}/badminton/matches` },
  ]);

  const matchesItemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Kèo Cầu Lông Giao Lưu TP. HCM & Hà Nội",
    "description": "Tìm bạn đánh đôi, đánh đơn và ghép kèo cầu lông theo trình độ tại PlayGrid.",
    "itemListElement": matchesList.slice(0, 10).map((m, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "SocialEvent",
        "name": m.title,
        "location": m.location,
        "offers": {
          "@type": "Offer",
          "price": m.price,
          "priceCurrency": "VND",
        },
      },
    })),
  };

  return (
    <main className="w-full flex flex-col min-h-screen bg-background text-foreground">
      <JsonLdScript data={[breadcrumbSchema, matchesItemListSchema]} />

      {/* 2-Tier Sub Navigation Bar */}
      <SportSubNav currentSport="badminton" />

      {/* Main Container Section */}
      <section className="w-full pt-5 sm:pt-7 pb-16 bg-background flex-1">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 space-y-4">
          {/* Top Search, Quick Filters & Create CTA Bar */}
          <div className="bg-card border border-border/80 rounded-2xl p-3 sm:p-4 shadow-2xs space-y-3">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 sm:gap-3">
              {/* Search Bar Input */}
              <div className="relative flex-1 min-w-0 w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm theo tên kèo, sân cầu lông, khu vực..."
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
                <div className="flex-1 lg:flex-initial lg:w-[175px] min-w-0">
                  <Select value={sortBy} onValueChange={(val) => setSortBy(val as any)}>
                    <SelectTrigger className="w-full h-10 text-xs sm:text-sm">
                      <div className="flex items-center gap-1.5 truncate">
                        <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                        <span className="truncate">
                          {sortBy === "latest"
                            ? "Mới nhất"
                            : sortBy === "upcoming"
                            ? "Sắp bắt đầu"
                            : sortBy === "price-asc"
                            ? "Giá: Thấp -> Cao"
                            : sortBy === "price-desc"
                            ? "Giá: Cao -> Thấp"
                            : "Còn ít slot"}
                        </span>
                      </div>
                    </SelectTrigger>
                    <SelectContent align="end" className="w-[180px]">
                      <SelectItem value="latest">Mới nhất</SelectItem>
                      <SelectItem value="upcoming">Sắp bắt đầu</SelectItem>
                      <SelectItem value="price-asc">Giá: Thấp đến Cao</SelectItem>
                      <SelectItem value="price-desc">Giá: Cao đến Thấp</SelectItem>
                      <SelectItem value="slots-left">Còn ít slot nhất</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* View Toggle: Grid vs List (Desktop / Tablet) */}
                <div className="hidden sm:flex items-center rounded-xl border border-border/80 bg-muted/40 p-0.5 h-10 shrink-0">
                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg text-xs transition-colors cursor-pointer ${
                      viewMode === "grid"
                        ? "bg-card text-foreground shadow-2xs font-bold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    aria-label="Grid View"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg text-xs transition-colors cursor-pointer ${
                      viewMode === "list"
                        ? "bg-card text-foreground shadow-2xs font-bold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    aria-label="List View"
                  >
                    <ListIcon className="w-4 h-4" />
                  </button>
                </div>

                {/* Create Match CTA Primary Button */}
                <Button
                  type="button"
                  onClick={() => setIsCreateModalOpen(true)}
                  className="h-10 px-3 sm:px-4 rounded-xl bg-gradient-primary text-white font-bold text-xs sm:text-sm shadow-2xs hover:opacity-95 active:scale-95 transition-all cursor-pointer shrink-0 whitespace-nowrap"
                >
                  <Plus className="w-4 h-4 mr-0.5 sm:mr-1 stroke-[2.5]" />
                  <span>Tạo Kèo Mới</span>
                </Button>
              </div>
            </div>

            {/* Quick Date & Skill Level Pills Row */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none pt-1 pb-0.5">
              <span className="text-xs font-semibold text-muted-foreground shrink-0 mr-0.5">
                Lọc nhanh:
              </span>
              {[
                { id: "all", label: "Tất cả ngày" },
                { id: "today", label: "Hôm nay" },
                { id: "tomorrow", label: "Ngày mai" },
                { id: "weekend", label: "Cuối tuần" },
              ].map((pill) => (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => setSelectedQuickDate(pill.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold shrink-0 whitespace-nowrap transition-all cursor-pointer ${
                    selectedQuickDate === pill.id
                      ? "bg-primary text-primary-foreground shadow-2xs"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/60"
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2-Column Main Layout (Sidebar Left + Matches Grid Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            {/* COLUMN 1: Sidebar Filter (Desktop) */}
            <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-[110px]">
              <FilterSidebarContent />
            </aside>

            {/* COLUMN 2: Matches Grid & List View (Right) */}
            <div className="lg:col-span-8 xl:col-span-9 space-y-4">
              {/* Results Counter Header */}
              <div className="flex items-center justify-between px-1">
                <div>
                  <h2 className="text-base sm:text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
                    <Users className="w-5 h-5 text-orange-600 dark:text-orange-400 shrink-0" />
                    <span>Kèo Ghép Cầu Lông Sôi Nổi</span>
                  </h2>
                  <p className="text-xs text-muted-foreground font-normal mt-0.5">
                    Tìm thấy <span className="font-bold text-primary">{filteredMatches.length}</span> trận giao lưu đang mở đăng ký
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

              {/* Matches Cards Container */}
              {filteredMatches.length > 0 ? (
                viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5">
                    {filteredMatches.map((activity) => (
                      <FindPlayerCard key={activity.id} activity={activity} className="h-full" />
                    ))}
                  </div>
                ) : (
                  /* Compact List View */
                  <div className="space-y-3">
                    {filteredMatches.map((match) => (
                      <div
                        key={match.id}
                        className="group rounded-2xl bg-card border border-border/80 p-4 shadow-2xs hover:border-primary/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="inline-flex items-center rounded-lg bg-orange-700 text-white font-bold px-2 py-0.5 text-[10px]">
                              {match.level}
                            </span>
                            <span className="text-xs text-muted-foreground font-medium">
                              {match.date} • {match.time}
                            </span>
                            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                              {match.price}
                            </span>
                          </div>
                          <h3 className="text-sm sm:text-base font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                            {match.title}
                          </h3>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="w-3.5 h-3.5 text-muted-foreground/80 shrink-0" />
                            <span className="truncate">{match.location}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                          <div className="text-right">
                            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 block">
                              {match.joinedCount}/{match.maxCount} người
                            </span>
                            <span className="text-[10px] text-muted-foreground font-normal block">
                              Còn {match.maxCount - match.joinedCount} chỗ
                            </span>
                          </div>
                          <Button
                            variant="default"
                            size="card"
                            className="bg-gradient-primary text-white font-bold rounded-xl shadow-2xs"
                            onClick={() => {
                              window.location.href = `/${locale}/activities/${match.id}`;
                            }}
                          >
                            Tham gia
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                /* Empty Filter State */
                <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-border/80 bg-card/60 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-muted/80 text-muted-foreground flex items-center justify-center mx-auto">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-foreground">
                    Không tìm thấy kèo cầu lông phù hợp
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground font-normal max-w-md mx-auto">
                    Thử điều chỉnh lại bộ lọc, chọn khu vực khác hoặc tự tạo một kèo giao lưu mới để các tay vợt khác tham gia!
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleResetFilters}
                      className="rounded-xl font-semibold text-xs h-9 px-4"
                    >
                      Đặt lại bộ lọc
                    </Button>
                    <Button
                      type="button"
                      variant="default"
                      onClick={() => setIsCreateModalOpen(true)}
                      className="rounded-xl font-bold text-xs h-9 px-4 bg-gradient-primary text-white shadow-2xs"
                    >
                      + Tạo kèo giao lưu mới
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
              <h3 className="font-bold text-base text-foreground">Bộ lọc kèo cầu lông</h3>
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
                Xem {filteredMatches.length} kết quả
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Create Match Dialog Modal */}
      <CreateMatchModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleAddMatch}
        defaultSport="Cầu lông"
      />
    </main>
  );
}
