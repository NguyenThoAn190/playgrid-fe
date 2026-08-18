"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TournamentData, TournamentScheduleItem } from "@/lib/tournaments-data";

interface TournamentOverviewProps {
  tournament: TournamentData;
}

function ScrollableScheduleTable({ schedule }: { schedule: TournamentScheduleItem[] }) {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Mouse drag state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  const checkScrollability = useCallback(() => {
    const el = tableContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
  }, []);

  useEffect(() => {
    checkScrollability();
    const el = tableContainerRef.current;
    if (!el) return;

    const handleResize = () => checkScrollability();
    window.addEventListener("resize", handleResize);
    el.addEventListener("scroll", checkScrollability);

    return () => {
      window.removeEventListener("resize", handleResize);
      el.removeEventListener("scroll", checkScrollability);
    };
  }, [checkScrollability]);

  const handleScroll = (direction: "left" | "right") => {
    const el = tableContainerRef.current;
    if (!el) return;
    const scrollAmount = direction === "left" ? -220 : 220;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = tableContainerRef.current;
    if (!el) return;
    isDragging.current = true;
    startX.current = e.pageX - el.offsetLeft;
    scrollLeftStart.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const el = tableContainerRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    el.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div className="relative rounded-2xl border border-border/70 shadow-2xs overflow-hidden group">
      {/* Left Scroll Button */}
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => handleScroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-xl bg-card/95 backdrop-blur-md border border-border/80 shadow-md flex items-center justify-center text-foreground hover:bg-muted hover:text-primary transition-all cursor-pointer"
          aria-label="Cuộn bảng sang trái"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}

      {/* Right Scroll Button */}
      {canScrollRight && (
        <button
          type="button"
          onClick={() => handleScroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-xl bg-card/95 backdrop-blur-md border border-border/80 shadow-md flex items-center justify-center text-foreground hover:bg-muted hover:text-primary transition-all cursor-pointer"
          aria-label="Cuộn bảng sang phải"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}

      {/* Left Gradient Fade Mask */}
      {canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none" />
      )}

      {/* Right Gradient Fade Mask */}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none" />
      )}

      <div
        ref={tableContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="overflow-x-auto select-none cursor-grab active:cursor-grabbing scroll-smooth"
      >
        <table className="w-full min-w-[640px] text-left text-xs border-collapse">
          <thead>
            <tr className="bg-muted/60 border-b border-border/60 text-muted-foreground font-semibold">
              <th className="py-2.5 px-4 whitespace-nowrap w-44">Thời gian</th>
              <th className="py-2.5 px-4 min-w-[240px]">Nội dung hoạt động</th>
              <th className="py-2.5 px-4 whitespace-nowrap w-48">Địa điểm / Sân</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {schedule.map((item, idx) => (
              <tr key={idx} className="hover:bg-muted/30 transition-colors">
                <td className="py-2.5 px-4 font-semibold text-primary whitespace-nowrap align-top">
                  {item.time}
                </td>
                <td className="py-2.5 px-4 align-top">
                  <div className="font-medium text-foreground text-xs sm:text-sm">
                    {item.activity}
                  </div>
                  {item.note && (
                    <p className="text-[11px] text-muted-foreground font-normal pt-0.5">
                      {item.note}
                    </p>
                  )}
                </td>
                <td className="py-2.5 px-4 text-muted-foreground font-normal align-top">
                  {item.location}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function TournamentOverview({ tournament }: TournamentOverviewProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-5">
      {/* 1. Expandable Tournament Description & Regulations Sections */}
      <div className="bg-card border border-border/80 rounded-2xl sm:rounded-3xl p-5 sm:p-6 space-y-4 shadow-2xs relative">
        {/* Content Container with Smooth Expansion and Gradient Fade */}
        <div className="relative">
          <div
            className={`space-y-5 transition-[max-height] duration-500 ease-in-out overflow-hidden ${
              isExpanded ? "max-h-[5000px]" : "max-h-[260px] sm:max-h-[300px]"
            }`}
          >
            {/* Section: Giới thiệu giải đấu */}
            <div className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
                Giới thiệu giải đấu
              </h2>
              <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-normal">
                {tournament.description}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-normal">
                Giải đấu được tổ chức nhằm xây dựng sân chơi thể thao lành mạnh, công bằng và nâng cao tinh thần rèn luyện thể chất trong cộng đồng người chơi {tournament.sportLabel}. Đây là cơ hội để các vận động viên giao lưu cọ xát, nâng cao trình độ kỹ thuật và tích lũy điểm thưởng hệ thống PlayGrid.
              </p>
            </div>

            {/* Section: Thể thức & Luật thi đấu */}
            <div className="space-y-2 pt-3 border-t border-border/50">
              <h3 className="text-sm sm:text-base font-semibold text-foreground">
                Thể thức & Luật thi đấu
              </h3>
              <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-normal">
                Áp dụng theo Luật Cầu Lông hiện hành của Liên Đoàn Cầu Lông Thế Giới (BWF) và Tổng cục Thể dục Thể thao Việt Nam. Vòng bảng đánh vòng tròn 1 lượt: 3 set 21 điểm (chạm 30 điểm cách biệt 2). Vòng loại trực tiếp từ Tứ kết: 3 set thắng 2 theo chuẩn BWF. Mỗi VĐV chỉ được đăng ký tối đa 2 nội dung thi đấu. Trọng tài quốc gia điều hành toàn bộ các trận đấu từ vòng Tứ kết.
              </p>
            </div>

            {/* Section: Quy định vợt, cầu & Trang phục */}
            <div className="space-y-2 pt-3 border-t border-border/50">
              <h3 className="text-sm sm:text-base font-semibold text-foreground">
                Quy định vợt, cầu & Trang phục
              </h3>
              <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-normal">
                Tất cả VĐV bắt buộc mặc áo thi đấu có tay, đi giày thể thao đế cao su không để lại vết đen (Non-marking). Quả cầu thi đấu chính thức: Victor Gold No.1 chuẩn BWF. Nghiêm cấm mang giày chạy bộ hoặc giày đế cứng lên mặt thảm BWF. Đồng đội đánh đôi bắt buộc mặc áo cùng màu khi thi đấu từ vòng Bán kết.
              </p>
            </div>

            {/* Section: Quy định giờ giấc & Điểm danh */}
            <div className="space-y-2 pt-3 border-t border-border/50">
              <h3 className="text-sm sm:text-base font-semibold text-foreground">
                Quy định giờ giấc & Điểm danh
              </h3>
              <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-normal">
                Vận động viên phải có mặt trước giờ thi đấu ít nhất 30 phút để làm thủ tục kiểm tra CCCD/VNeID và nhận diện. Quá giờ thi đấu 15 phút mà VĐV/Đội chưa có mặt tại sân sẽ bị xử thua 0-2 (Walkover). Mọi khiếu nại về nhân sự hoặc trình độ phải nộp trước khi trận đấu bắt đầu 15 phút kèm lệ phí khiếu nại theo điều lệ ban tổ chức.
              </p>
            </div>

            {/* Section: Lịch trình thi đấu chi tiết (Scrollable & Draggable Table) */}
            <div className="space-y-2.5 pt-3 border-t border-border/50">
              <h3 className="text-sm sm:text-base font-semibold text-foreground">
                Lịch trình thi đấu chi tiết
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-normal font-normal">
                Vận động viên vui lòng theo dõi thời gian và có mặt đúng giờ để tránh bị xử thua Walkover.
              </p>

              <ScrollableScheduleTable schedule={tournament.schedule} />
            </div>

            {/* Section: Quyền lợi vận động viên & Bộ Race Kit */}
            <div className="space-y-2 pt-3 border-t border-border/50">
              <h3 className="text-sm sm:text-base font-semibold text-foreground">
                Quyền lợi vận động viên & Bộ Race Kit
              </h3>
              <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-normal">
                Mỗi vận động viên đăng ký tham gia thành công sẽ nhận được 01 bộ Race Kit độc quyền từ Ban tổ chức gồm: Áo thi đấu chính thức in tên giải, Huy chương kim loại kỷ niệm dành cho VĐV hoàn thành giải (Finisher Medal), đồ uống bù khoáng và điện giải miễn phí tại cụm sân cùng gói bảo hiểm tai nạn thể thao trong suốt thời gian diễn ra giải đấu.
              </p>
            </div>
          </div>

          {/* Gradient Overlay when Collapsed */}
          {!isExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-card via-card/85 to-transparent pointer-events-none" />
          )}
        </div>

        {/* Expand / Collapse Button */}
        <div className="pt-2 flex justify-center border-t border-border/50">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="rounded-xl px-5 py-2 text-xs font-semibold gap-1.5 shadow-2xs hover:bg-muted transition-all cursor-pointer"
          >
            <span>{isExpanded ? "Thu gọn nội dung" : "Xem thêm thông tin giải đấu"}</span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-primary" />
            ) : (
              <ChevronDown className="w-4 h-4 text-primary" />
            )}
          </Button>
        </div>
      </div>

      {/* 2. Master Total Prize Showcase Banner & Podium Cards */}
      <div className="space-y-3.5">
        {/* Master Banner */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 p-5 sm:p-7 text-white shadow-2xs">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
          <div className="relative z-10 space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/25 backdrop-blur-md text-xs font-semibold text-amber-100">
              <span>Tổng giá trị giải thưởng</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {tournament.totalPrizePool}
            </h3>
            <p className="text-xs sm:text-sm text-amber-50 font-normal leading-relaxed">
              Bao gồm tiền mặt, cúp mạ vàng, huy chương kim loại đúc nổi 3D và hiện vật tài trợ chính hãng.
            </p>
          </div>
        </div>

        {/* 3 Podium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 items-stretch">
          {/* Hạng Nhất (#1) */}
          <div className="bg-card border-2 border-amber-400/90 dark:border-amber-500/80 rounded-2xl sm:rounded-3xl p-4 sm:p-5 space-y-3 shadow-2xs relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold text-xs">
              #1
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-sm sm:text-base text-foreground">
                Giải nhất (Vô địch)
              </h4>
              <p className="text-xs text-muted-foreground font-normal">
                Dành cho đội/cặp VĐV vô địch tại mỗi hạng mục thi đấu.
              </p>
            </div>

            <div className="pt-2.5 border-t border-border/50 space-y-1.5 text-xs font-normal">
              <div className="font-semibold text-amber-600 dark:text-amber-400">
                Cúp Vàng + Tiền mặt + Vợt / Giày cao cấp
              </div>
              <div className="text-muted-foreground">
                • Bảng vinh danh & Điểm thưởng hệ thống PlayGrid
              </div>
            </div>
          </div>

          {/* Hạng Nhì (#2) */}
          <div className="bg-card border border-border/80 rounded-2xl sm:rounded-3xl p-4 sm:p-5 space-y-3 shadow-2xs relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-bold text-xs">
              #2
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-sm sm:text-base text-foreground">
                Giải nhì (Á quân)
              </h4>
              <p className="text-xs text-muted-foreground font-normal">
                Dành cho đội/cặp VĐV đạt giải nhì tại mỗi hạng mục.
              </p>
            </div>

            <div className="pt-2.5 border-t border-border/50 space-y-1.5 text-xs font-normal">
              <div className="font-semibold text-foreground">
                Huy chương Bạc + Tiền mặt + Quà tài trợ
              </div>
              <div className="text-muted-foreground">
                • Điểm thưởng xếp hạng phong trào
              </div>
            </div>
          </div>

          {/* Đồng Hạng Ba (#3) */}
          <div className="bg-card border border-border/80 rounded-2xl sm:rounded-3xl p-4 sm:p-5 space-y-3 shadow-2xs relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-bold text-xs">
              #3
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-sm sm:text-base text-foreground">
                Đồng hạng ba
              </h4>
              <p className="text-xs text-muted-foreground font-normal">
                Dành cho 2 đội/cặp VĐV dừng bước tại vòng Bán kết.
              </p>
            </div>

            <div className="pt-2.5 border-t border-border/50 space-y-1.5 text-xs font-normal">
              <div className="font-semibold text-foreground">
                Huy chương Đồng + Tiền mặt + Bộ Race Kit
              </div>
              <div className="text-muted-foreground">
                • Giấy chứng nhận giải thưởng chính thức
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
