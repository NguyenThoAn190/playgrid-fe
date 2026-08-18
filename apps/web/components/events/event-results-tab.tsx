"use client";

import React, { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import {
  Timer,
  Search,
  SlidersHorizontal,
  RotateCcw,
  CheckCircle2,
  Clock,
  Download,
  ChevronDown,
  X,
  User,
  Medal,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AthleteResult {
  rank: number;
  bib: string;
  name: string;
  gender: "male" | "female";
  category: string;
  club: string;
  gunTime: string;
  chipTime: string;
  swimSplit?: string;
  runSplit?: string;
  pace: string;
  status: "finished" | "dnf" | "dq";
}

const MOCK_RESULTS: AthleteResult[] = [
  {
    rank: 1,
    bib: "20188",
    name: "Nguyễn Văn Đạt",
    gender: "male",
    category: "Triathlon Olympic (51.5km)",
    club: "PlayGrid Warriors Club",
    gunTime: "02:15:32",
    chipTime: "02:15:28",
    swimSplit: "00:22:15",
    runSplit: "00:38:40",
    pace: "3:52/km",
    status: "finished",
  },
  {
    rank: 2,
    bib: "20102",
    name: "Trần Minh Quân",
    gender: "male",
    category: "Triathlon Olympic (51.5km)",
    club: "Hanoi Triathlon Team",
    gunTime: "02:18:45",
    chipTime: "02:18:39",
    swimSplit: "00:23:05",
    runSplit: "00:39:15",
    pace: "3:55/km",
    status: "finished",
  },
  {
    rank: 3,
    bib: "20245",
    name: "Lê Hoàng Phúc",
    gender: "male",
    category: "Triathlon Olympic (51.5km)",
    club: "Saigon Tri Club",
    gunTime: "02:21:10",
    chipTime: "02:21:02",
    swimSplit: "00:23:45",
    runSplit: "00:40:10",
    pace: "4:01/km",
    status: "finished",
  },
  {
    rank: 4,
    bib: "20054",
    name: "Phạm Hải Đăng",
    gender: "male",
    category: "Triathlon Olympic (51.5km)",
    club: "Quang Ninh Runners",
    gunTime: "02:24:18",
    chipTime: "02:24:10",
    swimSplit: "00:24:10",
    runSplit: "00:41:20",
    pace: "4:08/km",
    status: "finished",
  },
  {
    rank: 1,
    bib: "20311",
    name: "Vũ Thị Hoàng Oanh",
    gender: "female",
    category: "Triathlon Olympic (51.5km)",
    club: "Vietnam Tri Champions",
    gunTime: "02:32:15",
    chipTime: "02:32:08",
    swimSplit: "00:25:30",
    runSplit: "00:43:10",
    pace: "4:19/km",
    status: "finished",
  },
  {
    rank: 2,
    bib: "20389",
    name: "Hoàng Mai Chi",
    gender: "female",
    category: "Triathlon Olympic (51.5km)",
    club: "Danang Swimming Hub",
    gunTime: "02:35:40",
    chipTime: "02:35:30",
    swimSplit: "00:26:10",
    runSplit: "00:44:20",
    pace: "4:26/km",
    status: "finished",
  },
  {
    rank: 1,
    bib: "10045",
    name: "Đặng Tiến Dũng",
    gender: "male",
    category: "Aquathlon Standard",
    club: "Ha Long Open Water",
    gunTime: "01:05:22",
    chipTime: "01:05:18",
    swimSplit: "00:15:10",
    runSplit: "00:19:40",
    pace: "3:56/km",
    status: "finished",
  },
  {
    rank: 1,
    bib: "30012",
    name: "Bùi Trọng Nghĩa",
    gender: "male",
    category: "Bơi biển 3km",
    club: "Ocean Masters Vietnam",
    gunTime: "00:42:15",
    chipTime: "00:42:10",
    swimSplit: "00:42:10",
    pace: "1:24/100m",
    status: "finished",
  },
];

export function EventResultsTab() {
  const locale = useLocale();
  const isEn = locale === "en";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedGender, setSelectedGender] = useState("all");
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const categories = [
    { id: "all", label: isEn ? "All Distances" : "Tất cả cự ly" },
    { id: "Triathlon Olympic (51.5km)", label: "Triathlon Olympic (51.5km)" },
    { id: "Aquathlon Standard", label: "Aquathlon Standard" },
    { id: "Bơi biển 3km", label: "Bơi biển 3km" },
  ];

  const activeFilterCount =
    (selectedCategory !== "all" ? 1 : 0) + (selectedGender !== "all" ? 1 : 0);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedGender("all");
    setSearchQuery("");
  };

  const filteredResults = useMemo(() => {
    return MOCK_RESULTS.filter((item) => {
      const matchSearch =
        searchQuery.trim() === "" ||
        item.bib.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        item.club.toLowerCase().includes(searchQuery.toLowerCase().trim());

      const matchCategory =
        selectedCategory === "all" || item.category === selectedCategory;

      const matchGender =
        selectedGender === "all" || item.gender === selectedGender;

      return matchSearch && matchCategory && matchGender;
    });
  }, [searchQuery, selectedCategory, selectedGender]);

  const topPodium = useMemo(() => {
    return filteredResults.filter((r) => r.rank <= 3).slice(0, 3);
  }, [filteredResults]);

  return (
    <div className="space-y-4">
      {/* 1. Header Search & Filter Card */}
      <section className="bg-card border border-border/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 space-y-4 shadow-2xs">
        <header className="flex items-center justify-between border-b border-border/50 pb-3 gap-3">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Timer className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-foreground">
                {isEn ? "Live Results & Timing Leaderboard" : "Tra cứu kết quả & bảng xếp hạng"}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-normal">
                {isEn
                  ? "Official electronic chip timing system (Gun Time & Chip Time)"
                  : "Hệ thống tính giờ điện tử chính thức từ Chip Timing Ban Tổ Chức"}
              </p>
            </div>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-500/15 px-2.5 py-0.5 rounded-lg border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isEn ? "Official Verified" : "Đã xác thực"}</span>
          </span>
        </header>

        {/* Search Bar + Compact Filter Controls */}
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
          {/* Main Full-Width Search Input */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              placeholder={isEn ? "Search by BIB or Athlete name..." : "Nhập số BIB hoặc Tên vận động viên..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 pl-10 pr-8 rounded-xl text-xs sm:text-sm bg-background border-border/80 font-normal focus-visible:ring-2 focus-visible:ring-primary/30"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-3 text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Dropdown Selector */}
          <div className="hidden sm:block">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-10 px-3 rounded-xl border border-border/80 bg-background text-xs sm:text-sm text-foreground font-normal cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Gender Dropdown Selector */}
          <div className="hidden md:block">
            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="h-10 px-3 rounded-xl border border-border/80 bg-background text-xs sm:text-sm text-foreground font-normal cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="all">{isEn ? "All Genders" : "Tất cả giới tính"}</option>
              <option value="male">{isEn ? "Men" : "Nam"}</option>
              <option value="female">{isEn ? "Women" : "Nữ"}</option>
            </select>
          </div>

          {/* Filter Toggle Button with Icon & Active Badge */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowFilterPanel(!showFilterPanel)}
            className={`h-10 px-3.5 rounded-xl border-border/80 gap-1.5 text-xs font-semibold cursor-pointer transition-all ${
              showFilterPanel || activeFilterCount > 0
                ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
                : "bg-background hover:bg-muted text-foreground"
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isEn ? "Filter" : "Bộ lọc"}</span>
            {activeFilterCount > 0 && (
              <span className="size-4.5 rounded-full bg-white text-primary text-[10px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </Button>
        </div>

        {/* Expandable Filter Panel (Mobile / Advanced) */}
        {showFilterPanel && (
          <div className="p-4 rounded-xl sm:rounded-2xl bg-muted/30 border border-border/70 space-y-3 transition-all animate-in fade-in-50 duration-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-primary" />
                <span>{isEn ? "Filter Options" : "Tiêu chí lọc kết quả"}</span>
              </span>

              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 cursor-pointer font-medium"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{isEn ? "Reset" : "Đặt lại"}</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              {/* Category Filter Pills */}
              <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground font-medium">
                  {isEn ? "Distance / Category" : "Cự ly thi đấu"}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer ${
                        selectedCategory === cat.id
                          ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                          : "bg-background border border-border/70 text-muted-foreground hover:text-foreground font-medium"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gender Filter Pills */}
              <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground font-medium">
                  {isEn ? "Gender" : "Giới tính"}
                </label>
                <div className="flex items-center gap-1.5">
                  {[
                    { id: "all", label: isEn ? "All" : "Tất cả" },
                    { id: "male", label: isEn ? "Men" : "Nam" },
                    { id: "female", label: isEn ? "Women" : "Nữ" },
                  ].map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setSelectedGender(g.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer ${
                        selectedGender === g.id
                          ? "bg-foreground text-background font-semibold"
                          : "bg-background border border-border/70 text-muted-foreground hover:text-foreground font-medium"
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 2. Top Podium Highlights */}
      {topPodium.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {topPodium.map((podium) => {
            const isFirst = podium.rank === 1;
            const isSecond = podium.rank === 2;

            return (
              <div
                key={podium.bib}
                className={`bg-card border rounded-xl sm:rounded-2xl p-4 shadow-2xs flex items-center gap-3 relative transition-all ${
                  isFirst
                    ? "border-amber-400/60 dark:border-amber-500/60 bg-amber-500/5"
                    : isSecond
                    ? "border-slate-400/50 bg-slate-400/5"
                    : "border-amber-700/40 bg-amber-700/5"
                }`}
              >
                <div
                  className={`size-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                    isFirst
                      ? "bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30"
                      : isSecond
                      ? "bg-slate-400/20 text-slate-700 dark:text-slate-200 border border-slate-400/30"
                      : "bg-amber-700/20 text-amber-800 dark:text-amber-300 border border-amber-700/30"
                  }`}
                >
                  #{podium.rank}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-mono text-muted-foreground font-medium">
                      BIB #{podium.bib}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-muted text-muted-foreground font-semibold">
                      {podium.gender === "male" ? "Nam" : "Nữ"}
                    </span>
                  </div>
                  <div className="font-semibold text-xs sm:text-sm text-foreground truncate mt-0.5">
                    {podium.name}
                  </div>
                  <div className="text-xs font-normal text-muted-foreground flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-3 h-3 text-primary shrink-0" />
                    <span className="text-primary font-semibold">Chip: {podium.chipTime}</span>
                    <span>({podium.pace})</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 3. Detailed Results Table Card */}
      <section className="bg-card border border-border/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xs space-y-4">
        <div className="overflow-x-auto rounded-xl border border-border/60 bg-card">
          <table className="w-full text-left text-xs border-collapse min-w-[640px]">
            <thead className="bg-muted/50 text-muted-foreground font-semibold border-b border-border/60">
              <tr>
                <th className="py-3 px-3.5 whitespace-nowrap">{isEn ? "Rank" : "Hạng"}</th>
                <th className="py-3 px-3.5 whitespace-nowrap">BIB</th>
                <th className="py-3 px-3.5">{isEn ? "Athlete & Club" : "Vận động viên & CLB"}</th>
                <th className="py-3 px-3.5 hidden md:table-cell">{isEn ? "Category" : "Cự ly"}</th>
                <th className="py-3 px-3.5 whitespace-nowrap">{isEn ? "Chip Time" : "Chip Time"}</th>
                <th className="py-3 px-3.5 whitespace-nowrap hidden sm:table-cell">{isEn ? "Gun Time" : "Gun Time"}</th>
                <th className="py-3 px-3.5 whitespace-nowrap text-right">{isEn ? "E-Cert" : "Chứng nhận"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 text-foreground">
              {filteredResults.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-xs sm:text-sm text-muted-foreground font-normal">
                    {isEn ? "No athlete result found matching your search." : "Không tìm thấy kết quả phù hợp với từ khóa tìm kiếm."}
                  </td>
                </tr>
              ) : (
                filteredResults.map((row) => (
                  <tr key={row.bib} className="hover:bg-muted/20 transition-colors">
                    <td className="py-2.5 px-3.5 font-bold text-xs text-muted-foreground whitespace-nowrap">
                      #{row.rank}
                    </td>
                    <td className="py-2.5 px-3.5 font-mono text-xs font-semibold text-primary whitespace-nowrap">
                      {row.bib}
                    </td>
                    <td className="py-2.5 px-3.5">
                      <div className="font-semibold text-xs sm:text-sm text-foreground">{row.name}</div>
                      <div className="text-xs text-muted-foreground font-normal">{row.club}</div>
                    </td>
                    <td className="py-2.5 px-3.5 text-muted-foreground font-normal text-xs hidden md:table-cell">
                      {row.category}
                    </td>
                    <td className="py-2.5 px-3.5 whitespace-nowrap font-mono">
                      <div className="font-semibold text-xs sm:text-sm text-foreground">{row.chipTime}</div>
                      <div className="text-xs text-muted-foreground font-normal">{row.pace}</div>
                    </td>
                    <td className="py-2.5 px-3.5 font-mono text-muted-foreground font-normal text-xs whitespace-nowrap hidden sm:table-cell">
                      {row.gunTime}
                    </td>
                    <td className="py-2.5 px-3.5 text-right whitespace-nowrap">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-7.5 px-3 text-xs font-semibold text-primary hover:bg-primary/10 rounded-xl cursor-pointer transition-all"
                        onClick={() => alert(`Tải E-Certificate cho VĐV ${row.name} (BIB: ${row.bib})`)}
                      >
                        <Download className="w-3.5 h-3.5 mr-1" />
                        <span>E-Cert</span>
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
