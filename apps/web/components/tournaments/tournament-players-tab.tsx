"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Users,
  CheckCircle2,
  Building2,
  Star,
  LayoutGrid,
  List,
} from "lucide-react";
import { TournamentAthlete, TournamentDivision } from "@/lib/tournaments-data";
import { Input } from "@/components/ui/input";

interface TournamentPlayersTabProps {
  athletes: TournamentAthlete[];
  divisions: TournamentDivision[];
}

export function TournamentPlayersTab({
  athletes,
  divisions,
}: TournamentPlayersTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDivision, setSelectedDivision] = useState<string>("all");
  const [seedOnly, setSeedOnly] = useState(false);
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

  // Filter athletes
  const filteredAthletes = useMemo(() => {
    return athletes.filter((ath) => {
      const matchSearch =
        ath.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ath.club.toLowerCase().includes(searchQuery.toLowerCase());

      const matchDivision =
        selectedDivision === "all" || ath.divisionId === selectedDivision;

      const matchSeed = !seedOnly || typeof ath.seed === "number";

      return matchSearch && matchDivision && matchSeed;
    });
  }, [athletes, searchQuery, selectedDivision, seedOnly]);

  // Unique Clubs count
  const uniqueClubsCount = useMemo(() => {
    const clubs = new Set(athletes.map((a) => a.club));
    return clubs.size;
  }, [athletes]);

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="pb-1">
        <h2 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-foreground">
          Danh sách vận động viên tham gia
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-normal">
          Tra cứu danh sách vận động viên, câu lạc bộ đại diện và bảng điểm xếp hạng phong trào.
        </p>
      </div>

      {/* 1. Header KPI Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-card border border-border/80 rounded-2xl p-3.5 sm:p-4 space-y-1.5 shadow-2xs">
          <div className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
            <Users className="w-4 h-4 text-primary" />
            <span>Tổng VĐV</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-foreground">
            {athletes.length} <span className="text-xs font-normal text-muted-foreground">VĐV</span>
          </div>
        </div>

        <div className="bg-card border border-border/80 rounded-2xl p-3.5 sm:p-4 space-y-1.5 shadow-2xs">
          <div className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-primary" />
            <span>Câu lạc bộ</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-foreground">
            {uniqueClubsCount} <span className="text-xs font-normal text-muted-foreground">CLB tham dự</span>
          </div>
        </div>

        <div className="bg-card border border-border/80 rounded-2xl p-3.5 sm:p-4 space-y-1.5 shadow-2xs">
          <div className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-500" />
            <span>Hạt giống</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-foreground">
            {athletes.filter((a) => typeof a.seed === "number").length}{" "}
            <span className="text-xs font-normal text-muted-foreground">Hạt giống</span>
          </div>
        </div>

        <div className="bg-card border border-border/80 rounded-2xl p-3.5 sm:p-4 space-y-1.5 shadow-2xs">
          <div className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Xác thực danh tính</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            100% <span className="text-xs font-normal text-muted-foreground">Đã xác minh</span>
          </div>
        </div>
      </div>

      {/* 2. Controls Toolbar: Search, Filters & View Toggle */}
      <div className="bg-card border border-border/80 rounded-2xl p-3.5 sm:p-4 space-y-3 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            <Input
              type="text"
              placeholder="Tìm kiếm tên VĐV, câu lạc bộ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl border-border/70 text-xs sm:text-sm bg-muted/20 focus-visible:ring-primary"
            />
          </div>

          {/* Right Controls: Seed Filter + View Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setSeedOnly(!seedOnly)}
              className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors border cursor-pointer ${
                seedOnly
                  ? "bg-primary text-primary-foreground border-primary font-semibold shadow-2xs"
                  : "bg-muted/30 border-border/70 text-muted-foreground hover:text-foreground hover:bg-muted/60"
              }`}
            >
              <Star className="w-3.5 h-3.5" />
              <span>Chỉ hạt giống</span>
            </button>

            {/* View Mode Toggle */}
            <div className="inline-flex rounded-xl border border-border/70 p-0.5 bg-muted/20">
              <button
                type="button"
                onClick={() => setViewMode("cards")}
                title="Dạng thẻ ngang"
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === "cards"
                    ? "bg-primary text-primary-foreground shadow-2xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("table")}
                title="Dạng bảng danh sách"
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === "table"
                    ? "bg-primary text-primary-foreground shadow-2xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Division Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pt-1">
          <button
            type="button"
            onClick={() => setSelectedDivision("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              selectedDivision === "all"
                ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                : "bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted/80"
            }`}
          >
            Tất cả ({athletes.length})
          </button>
          {divisions.map((div) => {
            const count = athletes.filter((a) => a.divisionId === div.id).length;
            const isSelected = selectedDivision === div.id;
            return (
              <button
                key={div.id}
                type="button"
                onClick={() => setSelectedDivision(div.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                    : "bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted/80"
                }`}
              >
                {div.formatLabel} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Athletes Display (Full-width Horizontal Cards or Table View) */}
      {filteredAthletes.length === 0 ? (
        <div className="bg-card border border-border/80 rounded-2xl p-8 text-center space-y-1.5 shadow-2xs">
          <p className="text-sm font-semibold text-foreground">
            Không tìm thấy vận động viên nào
          </p>
          <p className="text-xs text-muted-foreground font-normal">
            Vui lòng thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc.
          </p>
        </div>
      ) : viewMode === "cards" ? (
        /* FULL-WIDTH HORIZONTAL STRIP CARDS */
        <div className="space-y-2.5">
          {filteredAthletes.map((ath) => {
            const initials = ath.name
              .split(" ")
              .map((w) => w[0])
              .slice(-2)
              .join("");

            return (
              <div
                key={ath.id}
                className="bg-card border border-border/80 hover:border-primary/50 rounded-xl sm:rounded-2xl p-3 sm:p-3.5 transition-all hover:shadow-2xs grid grid-cols-1 md:grid-cols-12 items-center gap-3"
              >
                {/* Column 1: Avatar + Name (Span 4) */}
                <div className="md:col-span-4 flex items-center gap-3 min-w-0">
                  <div className="size-9 rounded-xl bg-muted/80 text-foreground font-bold text-xs flex items-center justify-center shrink-0 border border-border/40">
                    {initials}
                  </div>
                  <div className="min-w-0 flex-1 flex items-center gap-1.5">
                    <h3 className="font-semibold text-sm sm:text-base text-foreground truncate">
                      {ath.name}
                    </h3>
                    {ath.verified && (
                      <span title="Đã xác thực CCCD">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 inline" />
                      </span>
                    )}
                  </div>
                </div>

                {/* Column 2: Club (Span 3) */}
                <div className="hidden md:block md:col-span-3 text-xs text-muted-foreground truncate font-normal">
                  {ath.club}
                </div>

                {/* Column 3: Division (Span 2) */}
                <div className="hidden md:block md:col-span-2 text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-muted/60 text-foreground font-medium truncate inline-block max-w-full">
                    {ath.divisionName}
                  </span>
                </div>

                {/* Column 4: Seed (Span 1) */}
                <div className="hidden md:flex md:col-span-1 items-center justify-center">
                  {typeof ath.seed === "number" ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-300 font-semibold text-xs shrink-0">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span>#{ath.seed}</span>
                    </span>
                  ) : (
                    <span className="w-10" />
                  )}
                </div>

                {/* Column 5: Points & Mobile Subline (Span 2) */}
                <div className="flex items-center justify-between md:justify-end md:col-span-2 text-xs sm:text-sm font-semibold text-foreground text-right">
                  {/* Mobile only subline */}
                  <span className="text-xs text-muted-foreground md:hidden truncate font-normal">
                    {ath.club} • {ath.divisionName}
                  </span>

                  <div className="flex items-center gap-2">
                    {/* Mobile only seed badge */}
                    {typeof ath.seed === "number" && (
                      <span className="inline-flex md:hidden items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-300 font-semibold text-xs">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <span>#{ath.seed}</span>
                      </span>
                    )}
                    <span>{ath.rankingPoints ? `${ath.rankingPoints.toLocaleString("vi-VN")} pts` : "-"}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* CLEAN TABLE / LIST VIEW */
        <div className="bg-card border border-border/80 rounded-2xl overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-muted/50 text-muted-foreground border-b border-border/60 font-semibold">
                  <th className="py-3 px-4 w-12 text-center">STT</th>
                  <th className="py-3 px-4">Vận động viên</th>
                  <th className="py-3 px-4">Hạng mục</th>
                  <th className="py-3 px-4">Câu lạc bộ</th>
                  <th className="py-3 px-4 text-center">Hạt giống</th>
                  <th className="py-3 px-4 text-right">Điểm xếp hạng</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 text-foreground">
                {filteredAthletes.map((ath, idx) => (
                  <tr
                    key={ath.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-muted-foreground text-center">
                      {idx + 1}
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-semibold text-foreground flex items-center gap-1.5">
                        <span>{ath.name}</span>
                        {ath.verified && (
                          <span title="Đã xác thực CCCD">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 inline shrink-0" />
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-4 text-muted-foreground font-medium">
                      {ath.divisionName}
                    </td>

                    <td className="py-3 px-4 text-muted-foreground font-normal">
                      {ath.club}
                    </td>

                    <td className="py-3 px-4 text-center">
                      {typeof ath.seed === "number" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-300 font-semibold text-[11px]">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          <span>#{ath.seed}</span>
                        </span>
                      ) : (
                        <span className="text-muted-foreground/50">-</span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-right font-semibold text-foreground">
                      {ath.rankingPoints?.toLocaleString("vi-VN") || 0} pts
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
