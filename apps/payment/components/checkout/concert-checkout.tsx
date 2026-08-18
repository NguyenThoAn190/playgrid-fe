"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ShieldCheck,
  Music,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  User,
  Info,
  Check,
  X,
  Flame,
} from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { CheckoutHeader } from "./checkout-header";
import { CheckoutStepper } from "./checkout-stepper";
import { PaymentMethodSelector, PaymentMethod } from "./payment-method-selector";
import { VietQRModal } from "./vietqr-modal";
import { LanguageSwitcher } from "@/components/navbar/language-switcher";

interface ConcertCheckoutProps {
  orderId?: string;
}

interface Seat {
  id: string;
  row: string;
  num: number;
  zone: "VIP" | "A" | "B";
  price: number;
  isOccupied?: boolean;
}

export function ConcertCheckout({ orderId = "PG-CON-33910" }: ConcertCheckoutProps) {
  const router = useRouter();
  const locale = useLocale();
  const isEn = locale === "en";

  // Multi-Step State (1: Chọn Zone & Ghế -> 2: Thông tin người nhận vé -> 3: Thanh toán)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Selected Zone Filter
  const [activeZone, setActiveZone] = useState<"VIP" | "A" | "B">("VIP");

  // Customer info
  const [fullName, setFullName] = useState("Lê Hoàng Nam");
  const [phone, setPhone] = useState("0903987654");
  const [email, setEmail] = useState("hoangnam.music@gmail.com");
  const [idNumber, setIdNumber] = useState("079195009876");
  const [note, setNote] = useState("");

  // Generated Seat Map Grid for demo
  const allSeats: Seat[] = [
    // VIP Zone (Row A, B)
    { id: "VIP-A1", row: "A", num: 1, zone: "VIP", price: 1800000, isOccupied: true },
    { id: "VIP-A2", row: "A", num: 2, zone: "VIP", price: 1800000, isOccupied: true },
    { id: "VIP-A3", row: "A", num: 3, zone: "VIP", price: 1800000 },
    { id: "VIP-A4", row: "A", num: 4, zone: "VIP", price: 1800000 },
    { id: "VIP-A5", row: "A", num: 5, zone: "VIP", price: 1800000 },
    { id: "VIP-A6", row: "A", num: 6, zone: "VIP", price: 1800000 },
    { id: "VIP-A7", row: "A", num: 7, zone: "VIP", price: 1800000, isOccupied: true },
    { id: "VIP-A8", row: "A", num: 8, zone: "VIP", price: 1800000, isOccupied: true },

    { id: "VIP-B1", row: "B", num: 1, zone: "VIP", price: 1800000 },
    { id: "VIP-B2", row: "B", num: 2, zone: "VIP", price: 1800000 },
    { id: "VIP-B3", row: "B", num: 3, zone: "VIP", price: 1800000 },
    { id: "VIP-B4", row: "B", num: 4, zone: "VIP", price: 1800000 },
    { id: "VIP-B5", row: "B", num: 5, zone: "VIP", price: 1800000, isOccupied: true },
    { id: "VIP-B6", row: "B", num: 6, zone: "VIP", price: 1800000, isOccupied: true },
    { id: "VIP-B7", row: "B", num: 7, zone: "VIP", price: 1800000 },
    { id: "VIP-B8", row: "B", num: 8, zone: "VIP", price: 1800000 },

    // Zone A (Row C, D)
    { id: "A-C1", row: "C", num: 1, zone: "A", price: 1200000 },
    { id: "A-C2", row: "C", num: 2, zone: "A", price: 1200000 },
    { id: "A-C3", row: "C", num: 3, zone: "A", price: 1200000, isOccupied: true },
    { id: "A-C4", row: "C", num: 4, zone: "A", price: 1200000 },
    { id: "A-C5", row: "C", num: 5, zone: "A", price: 1200000 },
    { id: "A-C6", row: "C", num: 6, zone: "A", price: 1200000 },
    { id: "A-C7", row: "C", num: 7, zone: "A", price: 1200000 },
    { id: "A-C8", row: "C", num: 8, zone: "A", price: 1200000 },

    { id: "A-D1", row: "D", num: 1, zone: "A", price: 1200000 },
    { id: "A-D2", row: "D", num: 2, zone: "A", price: 1200000 },
    { id: "A-D3", row: "D", num: 3, zone: "A", price: 1200000 },
    { id: "A-D4", row: "D", num: 4, zone: "A", price: 1200000, isOccupied: true },
    { id: "A-D5", row: "D", num: 5, zone: "A", price: 1200000 },
    { id: "A-D6", row: "D", num: 6, zone: "A", price: 1200000 },
    { id: "A-D7", row: "D", num: 7, zone: "A", price: 1200000 },
    { id: "A-D8", row: "D", num: 8, zone: "A", price: 1200000 },

    // Zone B (Row E, F)
    { id: "B-E1", row: "E", num: 1, zone: "B", price: 750000 },
    { id: "B-E2", row: "E", num: 2, zone: "B", price: 750000 },
    { id: "B-E3", row: "E", num: 3, zone: "B", price: 750000 },
    { id: "B-E4", row: "E", num: 4, zone: "B", price: 750000 },
    { id: "B-E5", row: "E", num: 5, zone: "B", price: 750000 },
    { id: "B-E6", row: "E", num: 6, zone: "B", price: 750000 },
    { id: "B-E7", row: "E", num: 7, zone: "B", price: 750000 },
    { id: "B-E8", row: "E", num: 8, zone: "B", price: 750000 },
  ];

  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>(["VIP-A3", "VIP-A4"]);

  const toggleSeat = (seat: Seat) => {
    if (seat.isOccupied) return;
    setSelectedSeatIds((prev) =>
      prev.includes(seat.id) ? prev.filter((id) => id !== seat.id) : [...prev, seat.id]
    );
  };

  const selectedSeats = allSeats.filter((s) => selectedSeatIds.includes(s.id));
  const subTotal = selectedSeats.reduce((sum, s) => sum + s.price, 0);
  const serviceFee = selectedSeats.length > 0 ? 30000 : 0;
  const grandTotal = subTotal + serviceFee;

  const currentZoneSeats = allSeats.filter((s) => s.zone === activeZone);
  const rows = Array.from(new Set(currentZoneSeats.map((s) => s.row)));

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("vietqr");
  const [showVietQR, setShowVietQR] = useState(false);

  const handleProceedPayment = () => {
    if (selectedSeats.length === 0) return;
    if (paymentMethod === "vietqr") {
      setShowVietQR(true);
    } else {
      router.push(`/${locale}/payment/success/${orderId}`);
    }
  };

  // Live 10-min countdown timer
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isUrgent = timeLeft < 180;

  const stepsList = [
    { step: 1, label: isEn ? "Select Seats" : "Chọn ghế" },
    { step: 2, label: isEn ? "Attendee Info" : "Thông tin" },
    { step: 3, label: isEn ? "Payment" : "Thanh toán" },
  ];

  return (
    <div className="min-h-screen bg-muted/20 pb-36 lg:pb-16 pt-3 sm:pt-6">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-y-3 sm:space-y-4">
        {/* Top Header: Back Button & 1-Line Clean Countdown with LanguageSwitcher */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer group"
          >
            <div className="size-7 rounded-xl border border-border/80 bg-card flex items-center justify-center group-hover:bg-muted transition-colors shadow-2xs">
              <ArrowLeft className="size-3.5" />
            </div>
            <span>{isEn ? "Back to Event" : "Quay lại sự kiện"}</span>
          </button>

          <div className="flex items-center gap-3">
            {/* 1-Line Clean Countdown text */}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="size-3.5 text-brand-blue" />
              <span>{isEn ? "Ticket hold time:" : "Thời gian giữ vé:"}</span>
              <span className={`font-semibold ${isUrgent ? "text-red-500 font-bold" : "text-foreground"}`}>
                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
              </span>
            </div>

            {/* Language Switcher */}
            <div className="border-l border-border/60 pl-2">
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        {/* Process Stepper */}
        <CheckoutStepper
          steps={stepsList}
          currentStep={currentStep}
          onStepClick={(step) => setCurrentStep(step)}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-start">
          {/* LEFT COLUMN: Steps */}
          <div className="lg:col-span-8 space-y-3">
            {/* STEP 1: CHỌN ZONE & GHẾ NGỒI */}
            {currentStep === 1 && (
              <div className="space-y-3 animate-in fade-in duration-200">
                {/* 1.1 Concert Hero Banner */}
                <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-sm">
                  <div className="h-36 sm:h-44 bg-gradient-to-r from-purple-900 via-pink-800 to-rose-700 p-6 flex flex-col justify-end text-white relative">
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white border border-white/30">
                      {isEn ? "Seated Show" : "Vé Có Chọn Ghế (Seated Show)"}
                    </div>
                    <span className="text-xs font-medium uppercase tracking-wider text-pink-300 flex items-center gap-1">
                      <Music className="size-3.5" /> {isEn ? "Live Music & Sports Mega Show" : "Đại Nhạc Hội & Thể Thao Đỉnh Cao"}
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold tracking-tight">
                      PlayGrid Live Music & Champion Night 2026
                    </h2>
                  </div>

                  <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-card">
                    <div>
                      <span className="text-muted-foreground block text-[11px]">{isEn ? "Show Time" : "Thời gian diễn ra"}</span>
                      <span className="font-semibold text-foreground flex items-center gap-1 mt-0.5">
                        <Calendar className="size-3.5 text-brand-blue" />
                        20:00 - 15/11/2026
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[11px]">{isEn ? "Venue" : "Địa điểm biểu diễn"}</span>
                      <span className="font-semibold text-foreground flex items-center gap-1 mt-0.5">
                        <MapPin className="size-3.5 text-brand-blue" />
                        {isEn ? "Phu Tho Stadium, Dist. 11" : "Nhà Thi Đấu Phú Thọ, Q.11"}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[11px]">{isEn ? "Selected Seats" : "Số ghế đã chọn"}</span>
                      <span className="font-semibold text-brand-blue dark:text-brand-green mt-0.5 block">
                        {selectedSeats.length} {isEn ? "Seats" : "Ghế ngồi"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 1.2 Interactive Seat Map Card */}
                <div className="rounded-3xl border border-border/80 bg-card p-5 sm:p-6 space-y-5 shadow-sm">
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-foreground">
                      {isEn ? "Seating Map & Interactive Seat Selection" : "Sơ đồ chỗ ngồi & Chọn ghế trực tiếp"}
                    </h3>
                    <p className="text-xs text-muted-foreground font-normal">
                      {isEn
                        ? "Click on any seat on the map to select or deselect your position"
                        : "Bấm vào từng ghế trên sơ đồ để chọn hoặc bỏ chọn vị trí ngồi mong muốn"}
                    </p>
                  </div>

                  {/* Zone Filter Tabs */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveZone("VIP")}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-colors cursor-pointer border ${
                        activeZone === "VIP"
                          ? "border-amber-500 bg-amber-500 text-white shadow-xs"
                          : "border-border/80 bg-card hover:bg-muted text-muted-foreground"
                      }`}
                    >
                      Zone VIP (1.800.000{isEn ? " VND" : "đ"})
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveZone("A")}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-colors cursor-pointer border ${
                        activeZone === "A"
                          ? "border-brand-blue bg-brand-blue text-white shadow-xs"
                          : "border-border/80 bg-card hover:bg-muted text-muted-foreground"
                      }`}
                    >
                      Zone A (1.200.000{isEn ? " VND" : "đ"})
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveZone("B")}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-colors cursor-pointer border ${
                        activeZone === "B"
                          ? "border-indigo-600 bg-indigo-600 text-white shadow-xs"
                          : "border-border/80 bg-card hover:bg-muted text-muted-foreground"
                      }`}
                    >
                      Zone B (750.000{isEn ? " VND" : "đ"})
                    </button>
                  </div>

                  {/* Stage Visual */}
                  <div className="space-y-4 pt-2">
                    <div className="w-full py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center text-xs font-bold tracking-widest shadow-md uppercase">
                      {isEn ? "MAIN STAGE" : "SÂN KHẤU TRUNG TÂM (MAIN STAGE)"}
                    </div>

                    {/* Seat Matrix Grid */}
                    <div className="p-4 rounded-2xl bg-muted/30 border border-border/70 space-y-3">
                      {rows.map((r) => {
                        const rowSeats = currentZoneSeats.filter((s) => s.row === r);
                        return (
                          <div key={r} className="flex items-center justify-center gap-2 sm:gap-3">
                            <span className="w-5 text-xs font-medium text-muted-foreground text-center">
                              {r}
                            </span>
                            <div className="flex items-center gap-1.5 sm:gap-2">
                              {rowSeats.map((seat) => {
                                const isSelected = selectedSeatIds.includes(seat.id);
                                return (
                                  <button
                                    key={seat.id}
                                    type="button"
                                    disabled={seat.isOccupied}
                                    onClick={() => toggleSeat(seat)}
                                    title={`${isEn ? "Seat" : "Ghế"} ${seat.id} - ${seat.price.toLocaleString(isEn ? "en-US" : "vi-VN")}${isEn ? " VND" : "đ"}`}
                                    className={`size-7 sm:size-8 rounded-lg text-[10px] sm:text-xs font-medium transition-colors flex items-center justify-center cursor-pointer ${
                                      seat.isOccupied
                                        ? "bg-muted-foreground/20 text-muted-foreground/40 cursor-not-allowed border border-transparent"
                                        : isSelected
                                        ? "bg-emerald-500 text-white shadow-sm ring-2 ring-emerald-400 font-semibold"
                                        : "bg-card border border-border hover:border-brand-blue hover:text-brand-blue text-foreground"
                                    }`}
                                  >
                                    {seat.num}
                                  </button>
                                );
                              })}
                            </div>
                            <span className="w-5 text-xs font-medium text-muted-foreground text-center">
                              {r}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Seat Legend */}
                    <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-1 flex-wrap font-normal">
                      <div className="flex items-center gap-1.5">
                        <div className="size-3.5 rounded bg-card border border-border" />
                        <span>{isEn ? "Available" : "Ghế trống"}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="size-3.5 rounded bg-emerald-500" />
                        <span className="font-semibold text-foreground">{isEn ? "Selected" : "Đang chọn"}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="size-3.5 rounded bg-muted-foreground/20" />
                        <span>{isEn ? "Sold" : "Đã bán"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Selected Seats Tag List */}
                  {selectedSeats.length > 0 && (
                    <div className="space-y-2 pt-3 border-t border-border/60">
                      <span className="text-xs font-semibold text-foreground">
                        {isEn ? `Selected seats (${selectedSeats.length}):` : `Danh sách ghế bạn đang chọn (${selectedSeats.length}):`}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {selectedSeats.map((s) => (
                          <div
                            key={s.id}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-brand-blue/10 dark:bg-brand-green/10 border border-brand-blue/20 dark:border-brand-green/20 text-xs font-medium text-foreground"
                          >
                            <span>
                              {s.zone} - {isEn ? "Row" : "Hàng"} {s.row} - {isEn ? "Seat" : "Ghế"} {s.num}
                            </span>
                            <span className="font-semibold text-brand-blue dark:text-brand-green">
                              {s.price.toLocaleString(isEn ? "en-US" : "vi-VN")} {isEn ? "VND" : "đ"}
                            </span>
                            <button
                              type="button"
                              onClick={() => toggleSeat(s)}
                              className="hover:text-red-500 cursor-pointer"
                            >
                              <X className="size-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 1 Action */}
                  <div className="pt-3 border-t border-border/60 flex justify-end">
                    <Button
                      type="button"
                      disabled={selectedSeats.length === 0}
                      onClick={() => setCurrentStep(2)}
                      className="h-11 px-6 rounded-2xl font-semibold bg-gradient-primary text-white shadow-md hover:opacity-95 cursor-pointer text-xs sm:text-sm flex items-center gap-2 disabled:opacity-40"
                    >
                      <span>{isEn ? `Continue: Attendee Info (${selectedSeats.length} seats)` : `Tiếp tục: Thông tin nhận vé (${selectedSeats.length} ghế)`}</span>
                      <ArrowRight className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: THÔNG TIN NGƯỜI NHẬN VÉ */}
            {currentStep === 2 && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <div className="rounded-3xl border border-border/80 bg-card p-5 sm:p-6 space-y-4 shadow-sm">
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-foreground">
                      {isEn ? "Attendee Information & Barcode E-Ticket Delivery" : "Thông tin người nhận vé điện tử & Mã Barcode Check-In"}
                    </h3>
                    <p className="text-xs text-muted-foreground font-normal">
                      {isEn
                        ? "Personalized QR Pass with seat details will be delivered directly to your email"
                        : "Mã vé QR Pass định danh kèm vị trí ghế cụ thể sẽ được gửi về email của bạn"}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4.5 gap-x-4 text-xs">
                    <div className="space-y-2">
                      <label className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center">
                        <span>{isEn ? "Attendee Full Name" : "Họ và tên người nhận"}</span>
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <Input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="h-11 text-xs sm:text-sm rounded-xl px-3.5 bg-background shadow-2xs focus-visible:ring-1"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center">
                        <span>{isEn ? "National ID / Passport Number" : "Số CCCD / CMND"}</span>
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <Input
                        type="text"
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
                        className="h-11 text-xs sm:text-sm rounded-xl px-3.5 bg-background shadow-2xs focus-visible:ring-1"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center">
                        <span>{isEn ? "Phone Number for SMS" : "Số điện thoại nhận SMS"}</span>
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <Input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="h-11 text-xs sm:text-sm rounded-xl px-3.5 bg-background shadow-2xs focus-visible:ring-1"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center">
                        <span>{isEn ? "Email for Barcode Ticket" : "Email nhận vé Barcode"}</span>
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-11 text-xs sm:text-sm rounded-xl px-3.5 bg-background shadow-2xs focus-visible:ring-1"
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <label className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center">
                        <span>{isEn ? "Notes / Special Assistance (Wheelchair, aisle access...)" : "Ghi chú / Yêu cầu hỗ trợ đặc biệt (Xe lăn, vị trí lối đi...)"}</span>
                      </label>
                      <Input
                        type="text"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder={isEn ? "Optional..." : "Không bắt buộc..."}
                        className="h-11 text-xs sm:text-sm rounded-xl px-3.5 bg-background shadow-2xs focus-visible:ring-1"
                      />
                    </div>
                  </div>

                  {/* Step 2 Actions */}
                  <div className="pt-3 border-t border-border/60 flex items-center justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(1)}
                      className="h-11 px-5 rounded-2xl text-xs font-semibold gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="size-4" />
                      <span>{isEn ? "Back to seat selection" : "Quay lại chọn ghế"}</span>
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="h-11 px-6 rounded-2xl font-semibold bg-gradient-primary text-white shadow-md hover:opacity-95 cursor-pointer text-xs sm:text-sm flex items-center gap-2"
                    >
                      <span>{isEn ? "Continue: Ticket Payment" : "Tiếp tục: Thanh toán vé"}</span>
                      <ArrowRight className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: THANH TOÁN & XÁC NHẬN */}
            {currentStep === 3 && (
              <div className="space-y-3 animate-in fade-in duration-200">
                {/* Review Card */}
                <div className="rounded-3xl border border-border/80 bg-card p-5 sm:p-6 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between border-b border-border/60 pb-3">
                    <h3 className="text-sm sm:text-base font-semibold text-foreground">
                      {isEn ? "Review Ticket & Selected Seats" : "Xem lại vé & Ghế ngồi đã chọn"}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-xs text-brand-blue dark:text-brand-green font-semibold hover:underline cursor-pointer"
                    >
                      {isEn ? "Reselect seats" : "Chọn lại ghế"}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-2xl bg-muted/40 border border-border/60 text-xs">
                    <div>
                      <span className="text-muted-foreground block text-[10px]">{isEn ? "Attendee" : "Người nhận"}</span>
                      <span className="font-semibold text-foreground mt-0.5 block">{fullName}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[10px]">{isEn ? "Phone" : "SĐT"}</span>
                      <span className="font-semibold text-foreground mt-0.5 block">{phone}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[10px]">{isEn ? "Total Seats" : "Số lượng ghế"}</span>
                      <span className="font-semibold text-foreground mt-0.5 block">{selectedSeats.length} {isEn ? "Seats" : "Ghế"}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[10px]">{isEn ? "Seats" : "Vị trí ghế"}</span>
                      <span className="font-semibold text-brand-blue dark:text-brand-green mt-0.5 block truncate">
                        {selectedSeats.map((s) => s.id).join(", ")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Selector */}
                <div className="rounded-3xl border border-border/80 bg-card p-5 sm:p-6 space-y-4 shadow-sm">
                  <PaymentMethodSelector
                    selectedMethod={paymentMethod}
                    onSelect={setPaymentMethod}
                    totalAmount={grandTotal}
                  />
                </div>

                {/* Step 3 Actions */}
                <div className="pt-2 flex items-center justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(2)}
                    className="h-11 px-5 rounded-2xl text-xs font-semibold gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="size-4" />
                    <span>{isEn ? "Edit Attendee Info" : "Sửa thông tin nhận vé"}</span>
                  </Button>
                  <Button
                    type="button"
                    onClick={handleProceedPayment}
                    className="h-12 px-8 rounded-2xl font-semibold bg-gradient-primary text-white shadow-md hover:opacity-95 cursor-pointer text-sm sm:text-base flex items-center gap-2"
                  >
                    <span>{isEn ? "Confirm & Get QR Pass" : "Xác nhận & Nhận QR Pass"}</span>
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Summary */}
          <div className="lg:col-span-4 space-y-3 lg:sticky lg:top-6">
            <div className="rounded-3xl border border-border/80 bg-card p-5 sm:p-6 space-y-4 shadow-sm">
              <h3 className="text-sm sm:text-base font-semibold text-foreground border-b border-border/60 pb-3">
                {isEn ? "Ticket Summary" : "Chi tiết tiền vé"}
              </h3>

              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="flex items-center justify-between text-muted-foreground font-normal">
                  <span>{isEn ? "Total Seats" : "Số lượng ghế"}</span>
                  <span className="font-medium text-foreground">{selectedSeats.length} {isEn ? "Seats" : "Ghế"}</span>
                </div>

                <div className="flex items-center justify-between text-muted-foreground font-normal">
                  <span>{isEn ? "Seats Subtotal" : "Tiền vé ghế ngồi"}</span>
                  <span className="font-medium text-foreground">
                    {subTotal.toLocaleString(isEn ? "en-US" : "vi-VN")} {isEn ? "VND" : "đ"}
                  </span>
                </div>

                <div className="flex items-center justify-between text-muted-foreground font-normal">
                  <span>{isEn ? "Issuance Service Fee" : "Phí dịch vụ phát hành vé"}</span>
                  <span className="font-medium text-foreground">
                    {serviceFee.toLocaleString(isEn ? "en-US" : "vi-VN")} {isEn ? "VND" : "đ"}
                  </span>
                </div>

                <div className="pt-3 border-t border-border/60 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground font-normal block">{isEn ? "Total Amount" : "Tổng tiền thanh toán"}</span>
                    <span className="text-[11px] text-brand-green font-medium">
                      {isEn ? "Reserved seating included" : "Đã bao gồm vị trí ghế cố định"}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg sm:text-xl font-bold text-brand-blue dark:text-brand-green">
                      {grandTotal.toLocaleString(isEn ? "en-US" : "vi-VN")} {isEn ? "VND" : "đ"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Step Context */}
              <div className="pt-2 border-t border-border/60 text-[11px] text-muted-foreground space-y-1 font-normal">
                <div className="flex items-center justify-between">
                  <span>{isEn ? "Current Progress:" : "Tiến trình hiện tại:"}</span>
                  <span className="font-semibold text-foreground">{isEn ? `Step ${currentStep}/3` : `Bước ${currentStep}/3`}</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="size-3.5 shrink-0" />
                  <span>{isEn ? "Personalized Barcode entrance e-pass" : "Vé điện tử Barcode định danh cổng vào"}</span>
                </div>
              </div>
            </div>

            {/* Clean 1-Line Countdown Text outside the card */}
            <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground pt-0.5">
              <Clock className="size-3.5 text-brand-blue shrink-0" />
              <span>{isEn ? "Ticket hold time:" : "Thời gian giữ vé:"}</span>
              <span className={`font-semibold ${isUrgent ? "text-red-500 font-bold" : "text-foreground"}`}>
                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>

      <VietQRModal
        isOpen={showVietQR}
        onClose={() => setShowVietQR(false)}
        orderId={orderId}
        amount={grandTotal}
        orderTitle={isEn ? "PlayGrid Live Music & Champion Night 2026 Ticket" : "Vé Concert PlayGrid Live 2026"}
      />
    </div>
  );
}
