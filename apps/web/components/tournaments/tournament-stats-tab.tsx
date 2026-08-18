"use client";

import React, { useState, useMemo } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  Building2,
  Calendar,
  Flame,
  CheckCircle2,
  PieChart,
  Activity,
  Award,
  Zap,
  ArrowUpRight,
  Globe,
  MapPin,
  RefreshCw,
  Clock,
  Sparkles,
  ChevronDown,
  User,
  ShieldCheck,
  Percent,
  Layers,
} from "lucide-react";
import {
  TournamentData,
  TournamentDivision,
} from "@/lib/tournaments-data";
import { Button } from "@/components/ui/button";

interface TournamentStatsTabProps {
  tournament: TournamentData;
}

export function TournamentStatsTab({ tournament }: TournamentStatsTabProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("all");
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<string>("all");
  const [selectedSlotFilter, setSelectedSlotFilter] = useState<string>("all");

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  // Aggregate stats
  const totalRegistered = useMemo(() => {
    return tournament.divisions.reduce((sum, d) => sum + d.registeredTeams, 0);
  }, [tournament.divisions]);

  const totalCapacity = useMemo(() => {
    return tournament.divisions.reduce((sum, d) => sum + d.maxTeams, 0);
  }, [tournament.divisions]);

  const fillRate = useMemo(() => {
    return totalCapacity > 0
      ? Math.round((totalRegistered / totalCapacity) * 100)
      : 0;
  }, [totalRegistered, totalCapacity]);

  // Content breakdown items
  const divisionBreakdown = [
    { name: "Đôi Nam Nâng Cao", count: 32, unit: "cặp", percentage: 20, color: "#0ea5e9" },
    { name: "Đôi Nam Phong Trào", count: 48, unit: "cặp", percentage: 31, color: "#3b82f6" },
    { name: "Đôi Nữ Phong Trào", count: 36, unit: "cặp", percentage: 23, color: "#8b5cf6" },
    { name: "Đơn Nam Phong Trào", count: 20, unit: "VĐV", percentage: 13, color: "#ec4899" },
    { name: "Đôi Nữ Nâng Cao", count: 12, unit: "cặp", percentage: 8, color: "#f97316" },
    { name: "Đôi Nam Nữ Open", count: 8, unit: "cặp", percentage: 5, color: "#10b981" },
  ];

  // Daily registrations timeline data
  const timelinePoints = [
    { date: "05/06", count: 8 },
    { date: "08/06", count: 22 },
    { date: "11/06", count: 30 },
    { date: "14/06", count: 48, peak: true },
    { date: "17/06", count: 34 },
    { date: "20/06", count: 40 },
  ];

  // Demographics Data
  const nationalities = [
    { country: "Việt Nam", flag: "🇻🇳", count: 165, percentage: 88 },
    { country: "Hàn Quốc", flag: "🇰🇷", count: 10, percentage: 5 },
    { country: "Nhật Bản", flag: "🇯🇵", count: 6, percentage: 3 },
    { country: "Trung Quốc / Đài Loan", flag: "🇹🇼", count: 4, percentage: 2 },
    { country: "Khác (Mỹ, Pháp, Malaysia)", flag: "🌐", count: 3, percentage: 2 },
  ];

  const locations = [
    { region: "Hà Nội", count: 128, percentage: 68, sub: "Cầu Giấy 38%, Ba Đình 24%, Đống Đa 18%, Tây Hồ 12%, Khác 8%" },
    { region: "Bắc Ninh & Hưng Yên", count: 26, percentage: 14, sub: "Các CLB Smash Kinh Bắc & Ecopark" },
    { region: "Hải Phòng & Quảng Ninh", count: 19, percentage: 10, sub: "Đoàn VĐV Đất Cảng & Cẩm Phả" },
    { region: "TP. Hồ Chí Minh & Tỉnh khác", count: 15, percentage: 8, sub: "VĐV phong trào tự do giao lưu" },
  ];

  const genderStats = [
    { label: "Nam", count: 120, percentage: 64, color: "bg-blue-500" },
    { label: "Nữ", count: 68, percentage: 36, color: "bg-pink-500" },
  ];

  const ageGroups = [
    { group: "< 18 tuổi", label: "Học sinh / Năng khiếu", count: 15, percentage: 8 },
    { group: "18 - 25 tuổi", label: "Sinh viên & VĐV trẻ", count: 60, percentage: 32 },
    { group: "26 - 35 tuổi", label: "Văn phòng / Phong trào chính", count: 83, percentage: 44 },
    { group: "36 - 45 tuổi", label: "Trung niên phong trào", count: 22, percentage: 12 },
    { group: "> 45 tuổi", label: "Lão tướng & Bán chuyên", count: 8, percentage: 4 },
  ];

  // Filtered Divisions Table
  const filteredDivisions = useMemo(() => {
    return tournament.divisions.filter((div) => {
      // Category filter
      let matchCat = true;
      if (selectedCategoryFilter === "don-nam") matchCat = div.formatType === "singles" && div.name.toLowerCase().includes("nam");
      else if (selectedCategoryFilter === "don-nu") matchCat = div.formatType === "singles" && div.name.toLowerCase().includes("nữ");
      else if (selectedCategoryFilter === "doi-nam") matchCat = div.formatType === "doubles" && div.name.toLowerCase().includes("nam") && !div.name.toLowerCase().includes("nữ");
      else if (selectedCategoryFilter === "doi-nu") matchCat = div.formatType === "doubles" && div.name.toLowerCase().includes("đôi nữ");
      else if (selectedCategoryFilter === "doi-nam-nu") matchCat = div.name.toLowerCase().includes("nam nữ");

      // Level filter
      let matchLevel = true;
      if (selectedLevelFilter !== "all") {
        if (selectedLevelFilter === "nang-cao") matchLevel = div.levelRating.toLowerCase().includes("nâng cao") || div.levelRating.includes("4.");
        else if (selectedLevelFilter === "phong-trao") matchLevel = div.levelRating.toLowerCase().includes("phong trào") || div.levelRating.includes("3.");
      }

      // Slot filter
      let matchSlot = true;
      const remaining = div.maxTeams - div.registeredTeams;
      if (selectedSlotFilter === "con-slot") matchSlot = remaining > 0;
      else if (selectedSlotFilter === "sap-het") matchSlot = remaining > 0 && remaining <= 8;

      return matchCat && matchLevel && matchSlot;
    });
  }, [tournament.divisions, selectedCategoryFilter, selectedLevelFilter, selectedSlotFilter]);

  return (
    <div className="space-y-5">
      {/* 1. Header with Title & Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-card border border-border/80 rounded-2xl p-4 sm:p-5 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-foreground">
              Thống kê đăng ký giải đấu
            </h2>
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-normal">
              <span>Cập nhật lần cuối: 12/06/2026 14:30</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">Real-time sync</span>
            </div>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          className="rounded-xl text-xs font-semibold gap-1.5 shrink-0 self-start sm:self-auto cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-primary" : ""}`} />
          <span>{isRefreshing ? "Đang cập nhật..." : "Làm mới"}</span>
        </Button>
      </div>

      {/* 2. Top 3 Master KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {/* Card 1: Tổng số đăng ký */}
        <div className="bg-card border border-border/80 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Tổng số đăng ký</span>
            <div className="size-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="text-2xl sm:text-3xl font-bold text-foreground">
              {totalRegistered} <span className="text-base text-muted-foreground font-normal">/ {totalCapacity}</span>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-normal">Tiến độ lấp đầy</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">{fillRate}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${fillRate}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Tổng số cặp / VĐV */}
        <div className="bg-card border border-border/80 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Tổng số cặp / VĐV</span>
            <div className="size-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="text-2xl sm:text-3xl font-bold text-foreground">
              124 <span className="text-sm font-semibold text-muted-foreground">cặp</span> / 32 <span className="text-sm font-semibold text-muted-foreground">VĐV</span>
            </div>
            <p className="text-xs text-muted-foreground font-normal">
              Tổng cộng <strong className="text-foreground font-medium">280 Vận động viên</strong> đã sẵn sàng tranh tài
            </p>
          </div>
        </div>

        {/* Card 3: CLB & Đoàn tham gia */}
        <div className="bg-card border border-border/80 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">CLB & Đoàn tham dự</span>
            <div className="size-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="text-2xl sm:text-3xl font-bold text-foreground">
              14 <span className="text-sm font-semibold text-muted-foreground">CLB / Đoàn</span>
            </div>
            <p className="text-xs text-muted-foreground font-normal">
              Quy tụ vận động viên đến từ <strong className="text-foreground font-medium">8 tỉnh thành</strong>
            </p>
          </div>
        </div>
      </div>

      {/* 3. 2-Column: Tỷ Lệ Theo Nội Dung & Biểu Đồ Đăng Ký Theo Ngày */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        {/* Donut Breakdown: Tỷ lệ đăng ký theo nội dung (Span 6) */}
        <div className="lg:col-span-6 bg-card border border-border/80 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-border/50 pb-3">
            <h3 className="font-bold text-sm sm:text-base text-foreground">
              Tỷ lệ đăng ký theo nội dung
            </h3>
            <span className="text-xs text-muted-foreground font-normal">
              {totalRegistered} lượt đăng ký
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-5 pt-1">
            {/* Visual SVG Donut Circle */}
            <div className="relative size-36 shrink-0 flex items-center justify-center">
              <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                {/* Background Ring */}
                <path
                  className="text-muted/40 stroke-current"
                  strokeWidth="3.8"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* Segments */}
                <path
                  className="stroke-sky-500"
                  strokeDasharray="20, 100"
                  strokeWidth="4"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="stroke-blue-500"
                  strokeDasharray="31, 100"
                  strokeDashoffset="-20"
                  strokeWidth="4"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="stroke-purple-500"
                  strokeDasharray="23, 100"
                  strokeDashoffset="-51"
                  strokeWidth="4"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="stroke-pink-500"
                  strokeDasharray="13, 100"
                  strokeDashoffset="-74"
                  strokeWidth="4"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="stroke-orange-500"
                  strokeDasharray="8, 100"
                  strokeDashoffset="-87"
                  strokeWidth="4"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="stroke-emerald-500"
                  strokeDasharray="5, 100"
                  strokeDashoffset="-95"
                  strokeWidth="4"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>

              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-xl font-bold text-foreground">{totalRegistered}</span>
                <span className="text-xs text-muted-foreground font-normal">đăng ký</span>
              </div>
            </div>

            {/* List breakdown */}
            <div className="flex-1 space-y-2 w-full">
              {divisionBreakdown.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground truncate font-normal">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-semibold text-foreground">{item.count} {item.unit}</span>
                    <span className="font-medium text-muted-foreground w-8 text-right">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Line Chart: Đăng ký theo ngày (Span 6) */}
        <div className="lg:col-span-6 bg-card border border-border/80 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-border/50 pb-3">
            <h3 className="font-bold text-sm sm:text-base text-foreground">
              Tốc độ đăng ký theo ngày
            </h3>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Đỉnh điểm: 48 vé/ngày</span>
            </span>
          </div>

          {/* SVG Line & Area Sparkline Chart */}
          <div className="relative pt-2 pb-1">
            <div className="relative h-44 w-full">
              {/* Horizontal Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
                <div className="border-b border-dashed border-border/60 text-xs text-muted-foreground pb-0.5">60</div>
                <div className="border-b border-dashed border-border/60 text-xs text-muted-foreground pb-0.5">40</div>
                <div className="border-b border-dashed border-border/60 text-xs text-muted-foreground pb-0.5">20</div>
                <div className="border-b border-border/80 text-xs text-muted-foreground pb-0.5">0</div>
              </div>

              {/* Area & Line SVG */}
              <svg className="w-full h-36 mt-4 overflow-visible" viewBox="0 0 500 120" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="velocityGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Area under curve */}
                <path
                  d="M 0,105 Q 100,75 200,60 T 300,20 T 400,50 T 500,38 L 500,120 L 0,120 Z"
                  fill="url(#velocityGradient)"
                />

                {/* Curve Line */}
                <path
                  d="M 0,105 Q 100,75 200,60 T 300,20 T 400,50 T 500,38"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Peak Point Pin */}
                <circle cx="300" cy="20" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2.5" />
              </svg>

              {/* Peak Floating Tooltip Badge */}
              <div className="absolute top-1 left-[56%] -translate-x-1/2 bg-emerald-600 text-white font-bold text-xs px-2.5 py-0.5 rounded-lg shadow-md flex items-center gap-1 pointer-events-none">
                <Flame className="w-3 h-3 fill-white" />
                <span>48 đăng ký (14/06)</span>
              </div>
            </div>

            {/* X-axis Timeline labels */}
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 font-normal">
              {timelinePoints.map((pt, idx) => (
                <span key={idx} className={pt.peak ? "font-bold text-foreground" : ""}>
                  {pt.date}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. PHÂN TÍCH NHÂN KHẨU HỌC & ĐỊA LÝ: 4 BIỂU ĐỒ TÁCH BIỆT (2x2 GRID) */}
      <div className="space-y-4">
        <div>
          <h2 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary" />
            <span>Phân tích nhân khẩu học & địa lý vận động viên</span>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-normal">
            Báo cáo trực quan 4 biểu đồ chuyên sâu về cơ cấu vận động viên tham gia giải đấu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {/* Biểu Đồ 1: Quốc Tịch VĐV (Donut Chart) */}
          <div className="bg-card border border-border/80 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-border/50 pb-3">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" />
                <h3 className="font-bold text-sm sm:text-base text-foreground">Cơ cấu quốc tịch VĐV</h3>
              </div>
              <span className="text-xs font-semibold text-primary">5 Quốc gia</span>
            </div>

            <div className="flex items-center gap-6 pt-1">
              {/* SVG Donut Chart (Compact 100px) */}
              <div className="relative w-[100px] h-[100px] shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-muted/30 stroke-current"
                    strokeWidth="3.6"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* VN 88% */}
                  <path
                    className="stroke-red-500"
                    strokeDasharray="88, 100"
                    strokeWidth="3.8"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* KR 5% */}
                  <path
                    className="stroke-blue-500"
                    strokeDasharray="5, 100"
                    strokeDashoffset="-88"
                    strokeWidth="3.8"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* JP 3% */}
                  <path
                    className="stroke-amber-500"
                    strokeDasharray="3, 100"
                    strokeDashoffset="-93"
                    strokeWidth="3.8"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* TW/CN 2% */}
                  <path
                    className="stroke-purple-500"
                    strokeDasharray="2, 100"
                    strokeDashoffset="-96"
                    strokeWidth="3.8"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Other 2% */}
                  <path
                    className="stroke-emerald-500"
                    strokeDasharray="2, 100"
                    strokeDashoffset="-98"
                    strokeWidth="3.8"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-xs font-bold text-foreground">88%</span>
                  <span className="text-[10px] text-muted-foreground font-normal">Việt Nam</span>
                </div>
              </div>

              {/* List Legend */}
              <div className="flex-1 space-y-1.5 min-w-0">
                {nationalities.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs gap-2">
                    <div className="flex items-center gap-1.5 min-w-0 truncate">
                      <span className="text-sm shrink-0">{item.flag}</span>
                      <span className="text-foreground/90 truncate font-medium">{item.country}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 whitespace-nowrap">
                      <span className="font-semibold text-foreground">{item.percentage}%</span>
                      <span className="text-xs text-muted-foreground">({item.count})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Biểu Đồ 2: Địa Điểm & Tỉnh Thành (Geographic Spread) */}
          <div className="bg-card border border-border/80 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-border/50 pb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <h3 className="font-bold text-sm sm:text-base text-foreground">Địa điểm / Tỉnh thành</h3>
              </div>
              <span className="text-xs font-semibold text-primary">8 Tỉnh thành</span>
            </div>

            <div className="space-y-3 pt-1">
              {locations.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-foreground">{item.region}</span>
                    <span className="font-bold text-foreground">{item.percentage}% ({item.count} VĐV)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Biểu Đồ 3: Cơ Cấu Giới Tính (Gender Distribution) */}
          <div className="bg-card border border-border/80 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-border/50 pb-3">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  <h3 className="font-bold text-sm sm:text-base text-foreground">Cơ cấu giới tính</h3>
                </div>
                <span className="text-xs font-semibold text-primary">Tổng 188 VĐV</span>
              </div>

              {/* Gender Dual Bar Ratio */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-blue-600 dark:text-blue-400">Nam: 64% (120 VĐV)</span>
                  <span className="text-pink-600 dark:text-pink-400">Nữ: 36% (68 VĐV)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-muted overflow-hidden flex">
                  <div className="h-full bg-blue-500" style={{ width: "64%" }} />
                  <div className="h-full bg-pink-500" style={{ width: "36%" }} />
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-muted/40 text-xs text-muted-foreground flex items-center justify-between">
              <span className="font-medium text-foreground">Nội dung Đôi Nam Nữ:</span>
              <strong className="text-primary font-bold">Chiếm 35% tổng số đăng ký</strong>
            </div>
          </div>

          {/* Biểu Đồ 4: Phân Bố Độ Tuổi (Age Distribution) */}
          <div className="bg-card border border-border/80 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-border/50 pb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" />
                <h3 className="font-bold text-sm sm:text-base text-foreground">Phân bố độ tuổi</h3>
              </div>
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">16 - 55 tuổi</span>
            </div>

            <div className="space-y-2.5 pt-1">
              {ageGroups.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-foreground">{item.group} ({item.label})</span>
                    <span className="font-bold text-foreground">{item.percentage}% ({item.count} VĐV)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all duration-300"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. DANH SÁCH & TIẾN ĐỘ HẠNG MỤC THI ĐẤU (BẢNG CHI TIẾT KÈM BỘ LỌC) */}
      <div className="bg-card border border-border/80 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="space-y-1">
          <h2 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-foreground">
            Danh sách nội dung thi đấu & tiến độ chỗ
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-normal">
            Bảng thống kê chi tiết từng hạng mục, độ tuổi, trình độ và số suất thi đấu còn lại.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1 pb-2 border-b border-border/50">
          {/* Left Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
            {[
              { id: "all", label: "Tất cả" },
              { id: "don-nam", label: "Đơn nam" },
              { id: "don-nu", label: "Đơn nữ" },
              { id: "doi-nam", label: "Đôi nam" },
              { id: "doi-nu", label: "Đôi nữ" },
              { id: "doi-nam-nu", label: "Đôi nam nữ" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategoryFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategoryFilter === tab.id
                    ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                    : "bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted/70"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Right Dropdown Filters */}
          <div className="flex items-center gap-2">
            <select
              value={selectedLevelFilter}
              onChange={(e) => setSelectedLevelFilter(e.target.value)}
              className="rounded-xl border border-border/70 px-2.5 py-1.5 bg-muted/20 text-foreground text-xs font-medium focus:outline-none"
            >
              <option value="all">Tất cả trình độ</option>
              <option value="nang-cao">Nâng cao (4.0+)</option>
              <option value="phong-trao">Phong trào (3.0 - 3.5)</option>
            </select>

            <select
              value={selectedSlotFilter}
              onChange={(e) => setSelectedSlotFilter(e.target.value)}
              className="rounded-xl border border-border/70 px-2.5 py-1.5 bg-muted/20 text-foreground text-xs font-medium focus:outline-none"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="con-slot">Còn chỗ</option>
              <option value="sap-het">Sắp hết vé</option>
            </select>
          </div>
        </div>

        {/* Divisions Table */}
        <div className="overflow-x-auto rounded-xl border border-border/60">
          <table className="w-full text-left text-xs border-collapse min-w-[680px]">
            <thead>
              <tr className="bg-muted/50 text-muted-foreground border-b border-border/60 font-semibold">
                <th className="py-3 px-4">Nội dung</th>
                <th className="py-3 px-3 text-center whitespace-nowrap w-16">Độ tuổi</th>
                <th className="py-3 px-3 whitespace-nowrap">Trình độ</th>
                <th className="py-3 px-3 whitespace-nowrap">Tiến độ đăng ký</th>
                <th className="py-3 px-3 text-right whitespace-nowrap">Phí tham dự</th>
                <th className="py-3 px-4 text-right whitespace-nowrap">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 text-foreground">
              {filteredDivisions.map((div) => {
                const remaining = div.maxTeams - div.registeredTeams;
                const divFill = div.maxTeams > 0 ? Math.round((div.registeredTeams / div.maxTeams) * 100) : 0;
                const isDoubles = div.formatType === "doubles";
                const isUrgent = remaining <= 8 && remaining > 0;
                const isFull = remaining <= 0;
                const shortTitle = (div.name.split("(")[0] ?? div.name).trim();
                const shortLevel = div.levelRating.toLowerCase().includes("nâng cao")
                  ? "Nâng cao"
                  : div.levelRating.toLowerCase().includes("phong trào")
                  ? "Phong trào"
                  : div.levelRating.toLowerCase().includes("trung bình")
                  ? "Trung bình"
                  : (div.levelRating.split("/")[0] ?? div.levelRating).trim();

                return (
                  <tr key={div.id} className="hover:bg-muted/20 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-foreground text-xs sm:text-sm">
                        {shortTitle}
                      </div>
                      <div className="text-xs text-muted-foreground font-normal pt-0.5">
                        {div.levelRating}
                      </div>
                    </td>

                    <td className="py-3 px-3 text-center font-medium text-muted-foreground whitespace-nowrap">
                      16+
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="px-2.5 py-0.5 rounded-lg bg-muted/60 text-foreground font-medium text-[11px] inline-block">
                        {shortLevel}
                      </span>
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="space-y-1 min-w-[130px] max-w-[170px]">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-foreground">
                            {div.registeredTeams}/{div.maxTeams} {isDoubles ? "cặp" : "VĐV"}
                          </span>
                          <span className="text-xs text-muted-foreground font-normal">
                            Còn <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{remaining > 0 ? remaining : 0}</strong>
                          </span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              divFill >= 85
                                ? "bg-amber-500"
                                : divFill >= 60
                                ? "bg-primary"
                                : "bg-emerald-500"
                            }`}
                            style={{ width: `${divFill}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <div className="font-semibold text-foreground">
                        {div.price.toLocaleString("vi-VN")} ₫
                      </div>
                      <span className="text-xs text-muted-foreground font-normal block">
                        / {isDoubles ? "cặp" : "VĐV"}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      {isFull ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground font-medium text-[11px] inline-block">
                          Đã đủ
                        </span>
                      ) : isUrgent ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 font-semibold text-[11px] inline-flex items-center gap-1 border border-amber-500/20">
                          <Flame className="w-3 h-3 fill-amber-500 text-amber-500" />
                          <span>Sắp hết</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-semibold text-[11px] inline-block border border-emerald-500/20">
                          Còn chỗ
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
