"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  Sparkles,
  CheckCircle2,
  Trophy,
  X,
} from "lucide-react";

export interface CreateMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (newMatch: any) => void;
  defaultSport?: string;
}

const VENUE_OPTIONS = [
  "CLB Cầu Lông Khang An - Thủ Đức",
  "Sân Cầu Lông VNB Sports Center - Tân Bình",
  "Sân Thể Thao Phú Thọ - Quận 11",
  "Sân Cầu Lông Viettel Hùng Vương - Quận 10",
  "Tada Badminton Center - Quận 7",
  "Sân Cầu Lông Thủ Đức Smash - Thủ Đức",
  "Sân Cầu Lông Hà Nội Arena - Cầu Giấy, Hà Nội",
];

const SKILL_LEVELS = [
  { id: "2.0-2.5", label: "Trình 2.0 - 2.5 (Mới chơi / Căn bản)" },
  { id: "3.0-3.5", label: "Trình 3.0 - 3.5 (Trung bình / Phong trào)" },
  { id: "3.5-4.0", label: "Trình 3.5 - 4.0 (Khá / Cọ xát)" },
  { id: "4.0+", label: "Trình 4.0+ (Nâng cao / Bán chuyên)" },
];

const FORMAT_OPTIONS = [
  "Đôi nam nữ (Mixed Doubles)",
  "Đôi nam (Men's Doubles)",
  "Đôi nữ (Women's Doubles)",
  "Đơn nam / Đơn nữ",
  "Giao lưu tự do",
];

export function CreateMatchModal({
  isOpen,
  onClose,
  onSuccess,
  defaultSport = "Cầu lông",
}: CreateMatchModalProps) {
  const [title, setTitle] = useState("");
  const [venue, setVenue] = useState(VENUE_OPTIONS[0]);
  const [customVenue, setCustomVenue] = useState("");
  const [isCustomVenue, setIsCustomVenue] = useState(false);
  const [date, setDate] = useState("Hôm nay");
  const [startTime, setStartTime] = useState("19:00");
  const [endTime, setEndTime] = useState("21:00");
  const [skillLevel, setSkillLevel] = useState(SKILL_LEVELS[1]?.id || "3.0-3.5");
  const [format, setFormat] = useState(FORMAT_OPTIONS[0]);
  const [slotsNeeded, setSlotsNeeded] = useState(2);
  const [pricePerPerson, setPricePerPerson] = useState("50.000đ");
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalVenue = isCustomVenue ? customVenue : venue;

    const newMatch = {
      id: `match-user-${Date.now()}`,
      title: title || `Giao lưu ${defaultSport} sân ${finalVenue?.split(" - ")[0] || finalVenue}`,
      sport: defaultSport,
      location: finalVenue,
      date,
      time: `${startTime} - ${endTime}`,
      level: SKILL_LEVELS.find((l) => l.id === skillLevel)?.label.split(" (")[0] || "Trình 3.0 - 3.5",
      price: pricePerPerson,
      joinedCount: 1,
      maxCount: 1 + slotsNeeded,
      statusBadge: `Cần ${slotsNeeded} người`,
      statusType: "available",
      imageUrl: "/images/activities/badminton-banner.png",
      participants: [
        {
          id: "current-user",
          name: "Bạn (Host)",
          avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        },
      ],
      notes,
    };

    setIsSubmitted(true);
    setTimeout(() => {
      if (onSuccess) onSuccess(newMatch);
      setIsSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-card border border-border shadow-sm overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 pb-3 border-b border-border/60 bg-muted/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-foreground">
                Tạo Kèo Giao Lưu {defaultSport}
              </h2>
              <p className="text-xs text-muted-foreground font-normal">
                Đăng kèo để tìm đồng đội và đối thủ giao lưu nhanh chóng trên PlayGrid.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
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
            <h3 className="text-lg font-bold text-foreground">Đăng Kèo Thành Công!</h3>
            <p className="text-xs sm:text-sm text-muted-foreground font-normal max-w-sm mx-auto">
              Kèo đấu của bạn đã được hiển thị trên hệ thống. Các người chơi phù hợp sẽ nhận được thông báo để tham gia!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto scrollbar-none flex-1">
            {/* 1. Tiêu đề kèo */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <span>Tiêu đề bài đăng kèo</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ví dụ: Đánh đôi giao lưu vui vẻ, máy lạnh thoáng mát tối nay..."
                className="w-full px-3.5 py-2 rounded-xl bg-background border border-border/80 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* 2. Địa điểm sân bãi */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>Địa điểm sân bãi</span>
              </label>
              {!isCustomVenue ? (
                <div className="space-y-2">
                  <select
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-background border border-border/80 text-xs sm:text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                  >
                    {VENUE_OPTIONS.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => setIsCustomVenue(true)}
                    className="text-[11px] text-primary hover:underline font-semibold cursor-pointer"
                  >
                    + Nhập địa chỉ hoặc tên sân khác
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <input
                    type="text"
                    required
                    value={customVenue}
                    onChange={(e) => setCustomVenue(e.target.value)}
                    placeholder="Nhập tên sân và quận/huyện..."
                    className="w-full px-3.5 py-2 rounded-xl bg-background border border-border/80 text-xs sm:text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setIsCustomVenue(false)}
                    className="text-[11px] text-primary hover:underline font-semibold cursor-pointer"
                  >
                    ← Chọn từ danh sách sân có sẵn
                  </button>
                </div>
              )}
            </div>

            {/* 3. Ngày & Giờ thi đấu */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>Ngày chơi</span>
                </label>
                <select
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-background border border-border/80 text-xs sm:text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="Hôm nay">Hôm nay</option>
                  <option value="Ngày mai">Ngày mai</option>
                  <option value="Thứ Bảy này">Thứ Bảy này</option>
                  <option value="Chủ Nhật này">Chủ Nhật này</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>Khung giờ</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                  <span className="text-muted-foreground text-xs font-medium">-</span>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* 4. Trình độ & Thể thức */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Trình độ yêu cầu</span>
                </label>
                <select
                  value={skillLevel}
                  onChange={(e) => setSkillLevel(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-background border border-border/80 text-xs sm:text-sm text-foreground focus:outline-none focus:border-primary"
                >
                  {SKILL_LEVELS.map((lvl) => (
                    <option key={lvl.id} value={lvl.id}>
                      {lvl.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>Thể loại giao lưu</span>
                </label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-background border border-border/80 text-xs sm:text-sm text-foreground focus:outline-none focus:border-primary"
                >
                  {FORMAT_OPTIONS.map((fmt) => (
                    <option key={fmt} value={fmt}>
                      {fmt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 5. Số slot cần tuyển & Chi phí */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">
                  Cần tuyển thêm
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 6].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setSlotsNeeded(num)}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        slotsNeeded === num
                          ? "bg-primary text-primary-foreground shadow-2xs"
                          : "bg-background border border-border/80 text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Chi phí / người</span>
                </label>
                <select
                  value={pricePerPerson}
                  onChange={(e) => setPricePerPerson(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-background border border-border/80 text-xs sm:text-sm text-foreground focus:outline-none focus:border-primary"
                >
                  <option value="Miễn phí">Miễn phí (Giao lưu)</option>
                  <option value="40.000đ">40.000đ / người</option>
                  <option value="50.000đ">50.000đ / người</option>
                  <option value="60.000đ">60.000đ / người</option>
                  <option value="70.000đ">70.000đ / người</option>
                  <option value="80.000đ">80.000đ / người</option>
                  <option value="Chia đều tiền sân">Chia đều tiền sân</option>
                </select>
              </div>
            </div>

            {/* 6. Ghi chú thêm */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">
                Ghi chú thêm (Tuỳ chọn)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ví dụ: Có sẵn cầu thi đấu Victor Champion, nước uống tự túc, vui lòng đến đúng giờ..."
                className="w-full px-3.5 py-2 rounded-xl bg-background border border-border/80 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>

            {/* Footer buttons */}
            <div className="pt-3 border-t border-border/60 flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="rounded-xl font-semibold text-xs sm:text-sm h-9 sm:h-10 px-4 cursor-pointer"
              >
                Huỷ bỏ
              </Button>
              <Button
                type="submit"
                variant="default"
                className="rounded-xl font-bold text-xs sm:text-sm h-9 sm:h-10 px-5 bg-gradient-primary text-white shadow-2xs cursor-pointer"
              >
                Đăng Kèo Ngay
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
