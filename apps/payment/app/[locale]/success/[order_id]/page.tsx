"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  Download,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  Home,
  QrCode,
  FileText,
  Share2,
  Copy,
  Check,
  Smartphone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { LanguageSwitcher } from "@/components/navbar/language-switcher";

export default function PaymentSuccessPage() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const isEn = locale === "en";

  const rawOrderId = params?.order_id as string;
  const orderId = rawOrderId || "PG-CRT-89241";

  const [copied, setCopied] = useState(false);

  // Fireworks & Confetti Celebration Burst Effect
  const triggerFireworks = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    // 1. Initial big pop
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.55 },
      colors: ["#0363FE", "#18E26E", "#F59E0B", "#EC4899", "#8B5CF6"],
      zIndex: 9999,
    });

    // 2. Continuous fireworks cannons from bottom left & right
    const interval: NodeJS.Timeout = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 40 * (timeLeft / duration);

      // Left cannon
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#0363FE", "#18E26E", "#F59E0B", "#10B981"],
      });

      // Right cannon
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#0363FE", "#18E26E", "#EC4899", "#6366F1"],
      });
    }, 250);
  };

  useEffect(() => {
    triggerFireworks();
  }, []);

  // Derive order type based on prefix
  const isCourt = orderId.includes("CRT") || (!orderId.includes("EVT") && !orderId.includes("CON") && !orderId.includes("TRN") && !orderId.includes("WLK") && !orderId.includes("SYS"));
  const isEvent = orderId.includes("EVT");
  const isConcert = orderId.includes("CON");
  const isTournament = orderId.includes("TRN");
  const isWalkIn = orderId.includes("WLK");
  const isSystem = orderId.includes("SYS");

  const getOrderTitle = () => {
    if (isCourt) return isEn ? "PlayGrid Arena Badminton Court Reservation - Court 03" : "Đặt sân Cầu lông PlayGrid Arena - Sân 03";
    if (isEvent) return isEn ? "PlayGrid Marathon City Run 2026 Ticket" : "Vé Sự Kiện PlayGrid Marathon City Run 2026";
    if (isConcert) return isEn ? "PlayGrid Music & Champion Night Concert Ticket (Seats A3, A4)" : "Vé Concert PlayGrid Music & Champion Night (Ghế A3, A4)";
    if (isTournament) return isEn ? "Badminton & Pickleball Tournament Cup 2026 Entry Fee" : "Lệ phí Giải Đấu Cầu Lông & Pickleball Cup 2026";
    if (isWalkIn) return isEn ? "PlayGrid Arena Walk-in Play Pass (2 Slots)" : "Vé Chơi Vãng Lai PlayGrid Arena (2 Slots)";
    if (isSystem) return isEn ? "PlayGrid POS Pro Court Management License Subscription" : "Gói Thuê Bao Phần Mềm Quản Lý Sân POS Pro";
    return isEn ? "PlayGrid Service Order" : "Đơn Hàng Dịch Vụ PlayGrid";
  };

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-muted/20 py-6 sm:py-10 px-4 relative overflow-hidden">
      <div className="max-w-xl mx-auto relative z-10 space-y-3">
        {/* Top Floating Language Switcher */}
        <div className="flex justify-end">
          <LanguageSwitcher />
        </div>

        {/* Unified All-In-One Receipt & E-Ticket Card */}
        <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 text-center space-y-5 shadow-sm relative overflow-hidden">
          {/* Top gradient primary accent line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-primary" />

          {/* Top celebratory glow background */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 size-40 rounded-full bg-gradient-to-br from-emerald-500/20 via-brand-blue/15 to-transparent blur-2xl pointer-events-none" />

          {/* Success Icon */}
          <button
            type="button"
            onClick={triggerFireworks}
            title={isEn ? "Click for more fireworks!" : "Bấm để bắn thêm pháo hoa!"}
            className="size-16 sm:size-20 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto ring-8 ring-emerald-500/5 animate-in zoom-in-90 duration-300 hover:scale-110 active:scale-95 transition-all cursor-pointer group shadow-sm"
          >
            <CheckCircle2 className="size-10 sm:size-12 stroke-[2.5] group-hover:rotate-12 transition-transform" />
          </button>

          {/* Status Badge & Title */}
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              <span>● {isEn ? "Payment Successful" : "Thanh Toán Thành Công"}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground pt-1">
              {getOrderTitle()}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground font-normal">
              {isEn
                ? "Transaction automatically verified via VietQR Pro gateway"
                : "Giao dịch đã được hệ thống xác nhận tự động qua cổng VietQR Pro"}
            </p>
          </div>

          {/* Order Code Box */}
          <div className="p-3 rounded-2xl bg-muted/40 border border-border/60 flex items-center justify-between text-xs max-w-sm mx-auto">
            <span className="text-muted-foreground font-normal">{isEn ? "Order ID:" : "Mã đơn hàng:"}</span>
            <button
              type="button"
              onClick={handleCopyOrderId}
              className="inline-flex items-center gap-1.5 font-semibold text-foreground bg-card hover:bg-muted px-2.5 py-1 rounded-lg transition-colors border border-border cursor-pointer"
            >
              <span>{orderId}</span>
              {copied ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5 text-muted-foreground" />}
            </button>
          </div>

          {/* E-Ticket / QR Check-in Pass Box */}
          <div className="space-y-3 pt-2 border-t border-border/60">
            <div className="space-y-0.5 text-center">
              <h2 className="text-sm sm:text-base font-semibold text-foreground">
                {isSystem
                  ? isEn
                    ? "System License Key"
                    : "Mã Kích Hoạt Bản Quyền Hệ Thống"
                  : isEn
                  ? "Check-In QR Pass / E-Ticket"
                  : "Mã QR Check-In / Vé Điện Tử"}
              </h2>
              <p className="text-xs text-muted-foreground font-normal">
                {isSystem
                  ? isEn
                    ? "Software license has been activated for your account"
                    : "Bản quyền phần mềm đã được kích hoạt trên hệ thống tài khoản của bạn"
                  : isEn
                  ? "Please present this QR code at the reception desk or entrance gate"
                  : "Vui lòng xuất trình mã QR này tại quầy lễ tân hoặc cổng soát vé để vào sân"}
              </p>
            </div>

            {/* QR Code Container */}
            <div className="flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl bg-white text-slate-900 border border-slate-200 shadow-sm max-w-[240px] mx-auto">
              <div className="relative size-44 sm:size-48 bg-white flex items-center justify-center rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
                    `PLAYGRID_TICKET_${orderId}_VALID`
                  )}`}
                  alt={`QR Pass ${orderId}`}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Booking Meta Details Grid */}
          <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-muted/40 border border-border/60 text-xs text-left">
            <div>
              <span className="text-muted-foreground block text-[11px]">{isEn ? "Payment Time" : "Thời gian thanh toán"}</span>
              <span className="font-semibold text-foreground mt-0.5 block">{isEn ? "Today, 17/08/2026" : "Hôm nay, 17/08/2026"}</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-[11px]">{isEn ? "Payment Method" : "Phương thức"}</span>
              <span className="font-semibold text-foreground mt-0.5 block">VietQR Pro (24/7)</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-[11px]">{isEn ? "Order Status" : "Trạng thái đơn hàng"}</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5 block">
                {isEn ? "Paid 100%" : "Đã thanh toán 100%"}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground block text-[11px]">{isEn ? "VAT Invoice" : "Hóa đơn VAT"}</span>
              <span className="font-semibold text-brand-blue dark:text-brand-green mt-0.5 block">
                {isEn ? "Sent to email" : "Đã gửi email"}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <Button
              type="button"
              variant="outline"
              onClick={() => alert(isEn ? "E-Ticket saved to device successfully!" : "Đã lưu vé điện tử vào bộ nhớ máy thành công!")}
              className="h-11 rounded-xl text-xs font-semibold gap-2 cursor-pointer"
            >
              <Download className="size-4" />
              <span>{isEn ? "Download Ticket / QR" : "Tải vé / Lưu ảnh QR"}</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => alert(isEn ? "VAT e-invoice has been sent to your email." : "Hóa đơn điện tử VAT đã được tự động gửi về hòm thư của bạn.")}
              className="h-11 rounded-xl text-xs font-semibold gap-2 cursor-pointer"
            >
              <FileText className="size-4" />
              <span>{isEn ? "View VAT Invoice" : "Xem hóa đơn VAT"}</span>
            </Button>
          </div>

          {/* Return Home Button */}
          <div className="pt-1">
            <Button
              type="button"
              onClick={() => router.push(`/${locale}`)}
              className="w-full h-12 rounded-2xl font-semibold bg-gradient-primary text-white shadow-md cursor-pointer hover:opacity-95 text-xs sm:text-sm flex items-center justify-center gap-2"
            >
              <Home className="size-4" />
              <span>{isEn ? "Return to PlayGrid Homepage" : "Quay về trang chủ PlayGrid"}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
