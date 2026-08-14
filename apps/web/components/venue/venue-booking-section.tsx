"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  Check,
  X,
  Zap,
  Users,
  Repeat,
  ChevronLeft,
  ChevronRight,
  MoveHorizontal,
  Clock,
  Flame,
} from "lucide-react";
import {
  VenueDetailData,
  DEFAULT_TIME_SLOTS,
} from "@/lib/venue-data";

export interface SelectedBookingSlot {
  slotId: string;
  courtId: string;
  courtName: string;
  time: string;
  price: number;
  date: string;
  isPeak: boolean;
}

interface VenueBookingSectionProps {
  venue: VenueDetailData;
  selectedSlots: SelectedBookingSlot[];
  onToggleSlot: (slot: SelectedBookingSlot) => void;
  selectedDate: string;
  onSelectDate: (date: string) => void;
  bookingType: "single" | "recurring" | "matchmaking";
  onSelectBookingType: (type: "single" | "recurring" | "matchmaking") => void;
}

export function VenueBookingSection({
  venue,
  selectedSlots,
  onToggleSlot,
  selectedDate,
  onSelectDate,
  bookingType,
  onSelectBookingType,
}: VenueBookingSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  // Generate 14 days starting from today (2026-08-14)
  const next14Days = useMemo(() => {
    const dates = [];
    const baseDate = new Date("2026-08-14T00:00:00");
    const weekdays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

    for (let i = 0; i < 14; i++) {
      const d = new Date(baseDate);
      d.setDate(baseDate.getDate() + i);

      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const dateString = `${year}-${month}-${day}`;
      const weekdayStr = weekdays[d.getDay()] || "";
      const label = `${d.getDate()}/${d.getMonth() + 1}`;

      dates.push({
        dateString,
        weekday: weekdayStr,
        label,
        sublabel: i === 0 ? "Hôm nay" : i === 1 ? "Ngày mai" : "",
        isWeekend: d.getDay() === 0 || d.getDay() === 6,
      });
    }

    return dates;
  }, []);

  // Check if a time slot has passed for current selected date
  const isSlotPast = (slot: typeof DEFAULT_TIME_SLOTS[0], dateStr: string) => {
    if (dateStr !== "2026-08-14") return false;
    const nowHour = 16;
    const slotStartHour = parseInt(slot.startTime.split(":")[0] || "0", 10);
    return slotStartHour < nowHour;
  };

  // Mock booked slots lookup
  const isSlotBooked = (slotId: string, courtId: string, dateStr: string) => {
    if (dateStr !== "2026-08-14") return false;
    if (courtId === "court-1" && (slotId === "slot-05" || slotId === "slot-06" || slotId === "slot-17" || slotId === "slot-18")) {
      return true;
    }
    if (courtId === "court-2" && (slotId === "slot-18" || slotId === "slot-19")) {
      return true;
    }
    if (courtId === "court-3" && (slotId === "slot-06" || slotId === "slot-07")) {
      return true;
    }
    return false;
  };

  // Scroll matrix table left or right
  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 240;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Auto-scroll to current hour slot on page load
  useEffect(() => {
    if (!scrollContainerRef.current) return;
    const currentHourIndex = DEFAULT_TIME_SLOTS.findIndex(
      (slot) => parseInt(slot.startTime.split(":")[0] || "0", 10) === 16
    );
    if (currentHourIndex !== -1) {
      const scrollPosition = currentHourIndex * 52;
      scrollContainerRef.current.scrollTo({
        left: Math.max(0, scrollPosition - 80),
        behavior: "smooth",
      });
    }
  }, []);

  // Mouse Drag-to-Scroll Listeners
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    setIsMouseDown(true);
    startXRef.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseLeaveOrUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleSelectMatchmaking = () => {
    onSelectBookingType("matchmaking");
    const elem = document.getElementById("matchmaking-section");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="rounded-3xl border border-border/80 bg-card p-3 sm:p-4 space-y-3 shadow-xs">
      {/* 1. Header & Booking Modes */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 border-b border-border/60 pb-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Zap className="size-5 text-brand-blue dark:text-brand-green" />
            Chọn sân & giờ chơi
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Bảng ma trận giờ chẵn — chọn khung giờ và đặt sân nhanh chóng
          </p>
        </div>

        {/* Booking Modes Selector */}
        <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-xl border border-border/60 shrink-0 self-start md:self-auto">
          <button
            type="button"
            onClick={() => onSelectBookingType("single")}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              bookingType === "single"
                ? "bg-background text-foreground shadow-2xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Đặt lẻ theo giờ
          </button>
          <button
            type="button"
            onClick={() => onSelectBookingType("recurring")}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
              bookingType === "recurring"
                ? "bg-background text-brand-blue dark:text-brand-green shadow-2xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Repeat className="size-3" />
            Cố định (-10%)
          </button>
          <button
            type="button"
            onClick={handleSelectMatchmaking}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
              bookingType === "matchmaking"
                ? "bg-background text-amber-500 shadow-2xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Users className="size-3 text-amber-500" />
            Ghép kèo
          </button>
        </div>
      </div>

      {/* 2. 14-Days Interactive Date Carousel */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-xs text-foreground flex items-center gap-1.5">
            <CalendarIcon className="size-3.5 text-brand-blue dark:text-brand-green" />
            1. Chọn ngày
          </span>
          <span className="text-[11px] font-medium text-muted-foreground">
            Đang chọn:{" "}
            <strong className="text-foreground">
              {next14Days.find((d) => d.dateString === selectedDate)?.sublabel || ""}{" "}
              {selectedDate}
            </strong>
          </span>
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1 pt-0.5 no-scrollbar scroll-smooth">
          {next14Days.map((item) => {
            const isSelected = selectedDate === item.dateString;
            return (
              <button
                type="button"
                key={item.dateString}
                onClick={() => onSelectDate(item.dateString)}
                className={`flex flex-col items-center justify-center min-w-[62px] sm:min-w-[70px] py-1.5 px-1 rounded-xl transition-all cursor-pointer shrink-0 outline-none focus:outline-none focus-visible:outline-none ${
                  isSelected
                    ? "bg-gradient-primary text-white border-0 shadow-md scale-[1.02]"
                    : "bg-background hover:bg-muted border border-border/80 text-foreground"
                }`}
              >
                <span
                  className={`text-[10px] font-semibold ${
                    isSelected ? "text-white/90" : item.isWeekend ? "text-rose-500 font-bold" : "text-muted-foreground"
                  }`}
                >
                  {item.weekday}
                </span>
                <span className="text-xs sm:text-sm font-bold tracking-tight">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. COMPACT & SLEEK MATRIX GRID TABLE CONTAINER WITH DRAG-TO-SCROLL */}
      <div className="relative border border-border/70 rounded-2xl bg-card overflow-hidden shadow-2xs">
        {/* Navigation Header */}
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-border/60 bg-muted/30">
          <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
            <MoveHorizontal className="size-3.5 text-brand-blue dark:text-brand-green" />
            Bảng ma trận đặt sân (Khung giờ chẵn)
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => handleScroll("left")}
              aria-label="Cuộn sang trái"
              className="p-1 rounded-md bg-background hover:bg-muted border border-border text-foreground transition-colors cursor-pointer"
            >
              <ChevronLeft className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll("right")}
              aria-label="Cuộn sang phải"
              className="p-1 rounded-md bg-background hover:bg-muted border border-border text-foreground transition-colors cursor-pointer"
            >
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        </div>

        {/* Scrollable Matrix Table Area */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseLeaveOrUp}
          onMouseLeave={handleMouseLeaveOrUp}
          onMouseMove={handleMouseMove}
          className={`overflow-x-auto overflow-y-auto max-h-[360px] no-scrollbar scroll-smooth relative select-none ${
            isMouseDown ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          <table className="w-full border-collapse text-left min-w-[620px]">
            {/* Header Row */}
            <thead className="sticky top-0 z-30 bg-muted/95 backdrop-blur-md">
              <tr className="border-b border-border/70 text-[11px] font-bold text-muted-foreground">
                <th className="py-2 px-3.5 w-24 sm:w-28 sticky left-0 z-40 bg-muted/95 backdrop-blur-md border-r border-border/60 shadow-xs tracking-wider text-foreground font-bold">
                  Sân
                </th>

                {DEFAULT_TIME_SLOTS.map((slot) => {
                  const past = isSlotPast(slot, selectedDate);
                  return (
                    <th
                      key={slot.id}
                      className={`py-2 px-1 text-center min-w-[50px] font-semibold transition-colors ${
                        slot.isPeak ? "bg-amber-500/10 dark:bg-amber-500/15" : ""
                      } ${past ? "text-muted-foreground/40" : "text-foreground/80"}`}
                    >
                      <div className="text-[11px] font-bold flex items-center justify-center gap-0.5">
                        <span>{slot.startTime}</span>
                        {slot.isPeak && (
                          <Flame className="size-3 text-amber-500 fill-amber-500 shrink-0" />
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            {/* Matrix Body */}
            <tbody className="divide-y divide-border/50">
              {venue.subCourts.map((court) => {
                const isVip = court.type === "vip";
                const cleanName = court.name.split("(")[0]?.trim() || court.name;

                return (
                  <tr key={court.id} className="hover:bg-muted/20 transition-colors">
                    <td className="py-2 px-3.5 sticky left-0 z-20 bg-card border-r border-border/60 shadow-2xs">
                      <div className="flex items-center gap-1.5 whitespace-nowrap">
                        <span className="font-extrabold text-xs text-foreground tracking-tight">
                          {cleanName}
                        </span>
                        {isVip && (
                          <span className="bg-amber-400 text-slate-950 font-black text-[8px] px-1 py-0.2 rounded-sm tracking-wider">
                            VIP
                          </span>
                        )}
                      </div>
                    </td>

                    {DEFAULT_TIME_SLOTS.map((slot) => {
                      const past = isSlotPast(slot, selectedDate);
                      const booked = isSlotBooked(slot.id, court.id, selectedDate);
                      const isSelected = selectedSlots.some(
                        (s) =>
                          s.slotId === slot.id &&
                          s.courtId === court.id &&
                          s.date === selectedDate
                      );
                      const slotPrice = Math.round(slot.price * court.priceMultiplier);

                      return (
                        <td
                          key={court.id + slot.id}
                          className={`py-1.5 px-0.5 text-center transition-colors ${
                            slot.isPeak ? "bg-amber-500/5 dark:bg-amber-500/10" : ""
                          }`}
                        >
                          <button
                            type="button"
                            disabled={past || booked}
                            onClick={() =>
                              onToggleSlot({
                                slotId: slot.id,
                                courtId: court.id,
                                courtName: court.name,
                                time: slot.time,
                                price: slotPrice,
                                date: selectedDate,
                                isPeak: slot.isPeak,
                              })
                            }
                            title={`${court.name} (${slot.time}): ${
                              past ? "Đã qua" : booked ? "Đã được đặt" : slotPrice.toLocaleString("vi-VN") + "đ"
                            }`}
                            className={`w-full h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center mx-auto border-0 outline-none focus:outline-none focus-visible:outline-none ${
                              past
                                ? "bg-slate-100 dark:bg-slate-900/50 text-slate-400/50 cursor-not-allowed border-0"
                                : booked
                                ? "bg-rose-500/10 text-rose-500 dark:text-rose-400 cursor-not-allowed border-0"
                                : isSelected
                                ? "bg-gradient-primary text-white shadow-xs scale-95 border-0"
                                : "bg-blue-500/10 dark:bg-brand-green/15 text-brand-blue dark:text-brand-green hover:bg-gradient-primary hover:text-white hover:shadow-xs cursor-pointer border-0"
                            }`}
                          >
                            {past ? (
                              <Clock className="size-3 text-slate-300 dark:text-slate-700" />
                            ) : booked ? (
                              <X className="size-3 stroke-[3]" />
                            ) : isSelected ? (
                              <Check className="size-3.5 stroke-[3]" />
                            ) : (
                              <Check className="size-3 opacity-60" />
                            )}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Bar: Legend */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-1">
        <div className="flex flex-wrap items-center gap-2.5 text-[11px] font-semibold text-foreground/80 bg-muted/40 px-3 py-1.5 rounded-xl border border-border/50">
          <div className="flex items-center gap-1.5">
            <span className="size-5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-brand-green flex items-center justify-center">
              <Check className="size-3 stroke-[3]" />
            </span>
            <span>Còn trống</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="size-5 rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Flame className="size-3 fill-amber-500 text-amber-500" />
            </span>
            <span className="text-amber-600 dark:text-amber-400 font-bold">Giờ vàng 🔥</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="size-5 rounded-lg bg-rose-500/10 text-rose-500 dark:text-rose-400 flex items-center justify-center">
              <X className="size-3 stroke-[3]" />
            </span>
            <span>Đã đặt</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="size-5 rounded-lg bg-gradient-primary text-white flex items-center justify-center shadow-2xs">
              <Check className="size-3 stroke-[3]" />
            </span>
            <span>Đang chọn</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="size-5 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-400 flex items-center justify-center opacity-60">
              <Clock className="size-3 stroke-[2]" />
            </span>
            <span className="text-muted-foreground/70">Đã qua</span>
          </div>
        </div>
      </div>
    </div>
  );
}
