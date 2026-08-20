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

export interface PickleballMatchItem extends ActivityData {
  district: string;
  timeOfDay: "morning" | "afternoon" | "evening";
  priceValue: number;
  format: "doubles_mixed" | "doubles_men" | "doubles_women" | "singles" | "drill";
}

const INITIAL_PICKLEBALL_MATCHES: PickleballMatchItem[] = [
  {
    id: "match-pb-1",
    title: "Tìm bạn đánh đôi Pickleball tối sân D7 (Trình 2.5 - 3.0)",
    sport: "Pickleball",
    statusBadge: "Sắp bắt đầu",
    statusType: "starting_soon",
    level: "Trình 2.5 - 3.0",
    price: "60.000đ",
    priceValue: 60000,
    date: "Hôm nay",
    time: "20:00 - 22:00",
    timeOfDay: "evening",
    district: "Quận 7",
    location: "Saigon Pickleball Arena, Quận 7",
    format: "doubles_mixed",
    imageUrl: "/images/activities/pickleball-banner.png",
    joinedCount: 3,
    maxCount: 4,
    participants: [
      { id: "u5", name: "Đạt", avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80" },
      { id: "u6", name: "Quang", avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80" },
      { id: "u7", name: "Dũng", avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80" },
    ],
  },
  {
    id: "match-pb-2",
    title: "Pickleball Nâng Cao Khang An cọ xát giải Vô Địch Mở Rộng",
    sport: "Pickleball",
    statusBadge: "Còn 1 slot",
    statusType: "available",
    level: "Trình 3.5+",
    price: "70.000đ",
    priceValue: 70000,
    date: "Hôm nay",
    time: "20:00 - 22:00",
    timeOfDay: "evening",
    district: "Thủ Đức",
    location: "Khang An Club, Thủ Đức",
    format: "doubles_men",
    imageUrl: "/images/explore_sports/gridy-pickleball.avif",
    joinedCount: 3,
    maxCount: 4,
    participants: [
      { id: "u4", name: "Trịnh Linh Giang", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" },
      { id: "u6", name: "Huỳnh Chí Khương", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" },
      { id: "u7", name: "Trần Thanh Trúc", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" },
    ],
  },
  {
    id: "match-pb-3",
    title: "Tập kỹ thuật Dink & Đánh đối kháng Pickleball Tân Bình",
    sport: "Pickleball",
    statusBadge: "Còn chỗ",
    statusType: "available",
    level: "Trình 2.0 - 3.0",
    price: "55.000đ",
    priceValue: 55000,
    date: "Ngày mai",
    time: "17:00 - 19:00",
    timeOfDay: "afternoon",
    district: "Tân Bình",
    location: "VNB Pickleball Center, Tân Bình",
    format: "drill",
    imageUrl: "/images/explore_sports/gridy-pickleball.avif",
    joinedCount: 2,
    maxCount: 4,
    participants: [
      { id: "u3", name: "Hùng", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" },
      { id: "u4", name: "Tuấn", avatarUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80" },
    ],
  },
];

const DISTRICT_LIST = ["Thủ Đức", "Tân Bình", "Quận 7", "Quận 2", "Quận 10", "Hà Nội"];

const LEVEL_LIST = [
  { id: "2.0", label: "USAPA 2.0 (Mới làm quen)" },
  { id: "2.5", label: "USAPA 2.5 (Biết luật & đánh đều)" },
  { id: "3.0", label: "USAPA 3.0 (Trung bình phong trào)" },
  { id: "3.5", label: "USAPA 3.5 (Kiểm soát Kitchen & Dink tốt)" },
  { id: "4.0+", label: "USAPA 4.0+ (Bán chuyên & Nâng cao)" },
];

export default function PickleballMatchesPage() {
  const locale = useLocale();
  const [matchesList, setMatchesList] = useState<PickleballMatchItem[]>(INITIAL_PICKLEBALL_MATCHES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedQuickDate, setSelectedQuickDate] = useState<string>("all");
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"latest" | "upcoming" | "price-asc" | "price-desc" | "slots-left">("latest");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

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

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedQuickDate("all");
    setSelectedDistricts([]);
    setSelectedLevels([]);
    setSortBy("latest");
  };

  const handleAddMatch = (newMatch: any) => {
    const formattedItem: PickleballMatchItem = {
      ...newMatch,
      sport: "Pickleball",
      district: "Quận 7",
      timeOfDay: "evening",
      priceValue: parseInt(newMatch.price.replace(/[^\d]/g, ""), 10) || 60000,
      format: "doubles_mixed",
      imageUrl: "/images/activities/pickleball-banner.png",
    };
    setMatchesList((prev) => [formattedItem, ...prev]);
  };

  const filteredMatches = useMemo(() => {
    return matchesList.filter((match) => {
      if (
        searchQuery &&
        !match.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !match.location.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      if (selectedDistricts.length > 0 && !selectedDistricts.includes(match.district)) {
        return false;
      }
      if (selectedLevels.length > 0) {
        const matchesLevel = selectedLevels.some((lvl) => match.level.includes(lvl));
        if (!matchesLevel) return false;
      }
      return true;
    });
  }, [matchesList, searchQuery, selectedDistricts, selectedLevels]);

  const breadcrumbSchema = getBreadcrumbJsonLd([
    { name: "Trang chủ", url: `/${locale}` },
    { name: "Pickleball", url: `/${locale}/pickleball` },
    { name: "Kèo ghép giao lưu", url: `/${locale}/pickleball/matches` },
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
                placeholder="Tìm kèo Pickleball theo địa điểm, trình độ USAPA..."
                className="w-full pl-10 pr-4 h-10 rounded-xl bg-background border border-border/70 text-foreground placeholder:text-muted-foreground text-xs sm:text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <Button
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
              className="h-10 px-4 rounded-xl bg-gradient-primary text-white font-bold text-xs sm:text-sm shadow-2xs hover:opacity-95 cursor-pointer shrink-0 whitespace-nowrap"
            >
              <Plus className="w-4 h-4 mr-1 stroke-[2.5]" />
              <span>Tạo Kèo Pickleball</span>
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <div>
                <h2 className="text-base sm:text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>Kèo Ghép Pickleball Sôi Động</span>
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5 font-normal">
                  Tìm thấy <span className="font-bold text-primary">{filteredMatches.length}</span> trận Pickleball đang mở đăng ký
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
              {filteredMatches.map((activity) => (
                <FindPlayerCard key={activity.id} activity={activity} className="h-full" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <CreateMatchModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleAddMatch}
        defaultSport="Pickleball"
      />
    </main>
  );
}
