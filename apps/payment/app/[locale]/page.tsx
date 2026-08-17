"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  Compass,
  Trophy,
  Music,
  Zap,
  Cpu,
  Ticket,
  ChevronRight,
  ShieldCheck,
  CreditCard,
  QrCode,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { CourtCheckout } from "@/components/checkout/court-checkout";
import { EventCheckout } from "@/components/checkout/event-checkout";
import { ConcertCheckout } from "@/components/checkout/concert-checkout";
import { TournamentCheckout } from "@/components/checkout/tournament-checkout";
import { WalkInCheckout } from "@/components/checkout/walk-in-checkout";
import { SystemPlanCheckout } from "@/components/checkout/system-plan-checkout";

function PaymentContent() {
  const searchParams = useSearchParams();
  const locale = useLocale();
  const isEn = locale === "en";

  const type = searchParams.get("type") || searchParams.get("catalog");
  const orderId = searchParams.get("order_id") || searchParams.get("code");

  // If query params are provided, dispatch to specific checkout view
  if (type === "court" || type === "court_booking") {
    return <CourtCheckout orderId={orderId || "PG-CRT-89241"} />;
  }
  if (type === "event" || type === "event_ticket") {
    return <EventCheckout orderId={orderId || "PG-EVT-77210"} />;
  }
  if (type === "concert" || type === "concert_ticket") {
    return <ConcertCheckout orderId={orderId || "PG-CON-33910"} />;
  }
  if (type === "tournament" || type === "tournament_fee") {
    return <TournamentCheckout orderId={orderId || "PG-TRN-55812"} />;
  }
  if (type === "walk_in" || type === "walk-in" || type === "pos") {
    return <WalkInCheckout orderId={orderId || "PG-WLK-99014"} />;
  }
  if (type === "system" || type === "subscription" || type === "saas") {
    return <SystemPlanCheckout orderId={orderId || "PG-SYS-10293"} />;
  }

  // Otherwise, render the Master Payment Gateway Hub
  const services = [
    {
      id: "court",
      href: "/court/PG-CRT-89241",
      title: isEn ? "1. Sports Court Booking" : "1. Đặt Sân Thể Thao",
      tag: isEn ? "Badminton, Pickleball, Tennis" : "Cầu lông, Pickleball, Tennis",
      badge: isEn ? "Most Popular" : "Phổ biến nhất",
      badgeColor: "bg-brand-blue/10 text-brand-blue dark:bg-brand-green/10 dark:text-brand-green border-brand-blue/20",
      description: isEn
        ? "Pay for hourly court slots, monthly fixed slots, racket rentals, shuttlecock purchases, and VAT invoices."
        : "Thanh toán lịch đặt sân theo giờ, đặt cố định theo tháng, dịch vụ thuê vợt, mua cầu và xuất hóa đơn VAT.",
      icon: Compass,
      gradient: "from-blue-600 to-cyan-500",
      demoOrder: "PG-CRT-89241",
    },
    {
      id: "event",
      href: "/event/PG-EVT-77210",
      title: isEn ? "2. Sports Events & Races" : "2. Vé Sự Kiện Thể Thao (Không Ghế)",
      tag: isEn ? "Marathon, Swimming, Triathlon" : "Marathon, Bơi lội, Ngày hội thể thao",
      badge: isEn ? "Free Seating" : "Free Seating",
      badgeColor: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
      description: isEn
        ? "Register for marathons & triathlons, claim race BIBs, timing chips, relay team legs, and finisher shirts."
        : "Mua vé tham dự giải marathon, nhận BIB thi đấu, chip timing điện tử và áo finisher theo size.",
      icon: Ticket,
      gradient: "from-indigo-600 to-purple-600",
      demoOrder: "PG-EVT-77210",
    },
    {
      id: "concert",
      href: "/concert/PG-CON-33910",
      title: isEn ? "3. Concert & Music Festival Tickets" : "3. Vé Concert & Đại Nhạc Hội",
      tag: isEn ? "Live Concerts, Music Festivals" : "Đêm nhạc, Lễ hội âm nhạc",
      badge: isEn ? "Interactive Seat Map" : "Sơ Đồ Ghế (Seat Map)",
      badgeColor: "bg-pink-500/10 text-pink-600 border-pink-500/20",
      description: isEn
        ? "Directly select VIP/A/B zones, row and seat numbers on the live interactive stadium seat map."
        : "Chọn trực tiếp Zone VIP/Zone A/B, hàng ghế và số ghế cụ thể trên sơ đồ khán đài tương tác.",
      icon: Music,
      gradient: "from-pink-600 to-rose-600",
      demoOrder: "PG-CON-33910",
    },
    {
      id: "tournament",
      href: "/tournament/PG-TRN-55812",
      title: isEn ? "4. Tournament Entry Fees" : "4. Lệ Phí Giải Đấu Thể Thao",
      tag: isEn ? "Badminton, Pickleball, Football" : "Cầu lông, Pickleball, Bóng đá",
      badge: isEn ? "ELO & DUPR Rating" : "Đua Rank ELO & DUPR",
      badgeColor: "bg-amber-500/10 text-amber-600 border-amber-500/20",
      description: isEn
        ? "Register Singles/Doubles/Team divisions, choose 3.0/4.0/Open skill ratings, jerseys, and sports insurance."
        : "Đăng ký nội dung Đơn/Đôi/Đồng Đội, chọn hạng trình độ 3.0/4.0/Open, mua áo đấu và bảo hiểm thi đấu.",
      icon: Trophy,
      gradient: "from-amber-500 to-orange-600",
      demoOrder: "PG-TRN-55812",
    },
    {
      id: "walk_in",
      href: "/walk-in/PG-WLK-99014",
      title: isEn ? "5. Walk-in / Open Session Checkout" : "5. Thanh Toán Vãng Lai Tại Sân",
      tag: isEn ? "Open sessions, per-slot check-in" : "Chơi giao lưu, Đăng ký theo Slot",
      badge: isEn ? "1-Tap Express" : "Siêu Tốc 1-Chạm",
      badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
      description: isEn
        ? "Streamlined no-addon checkout: simply pick your slot count and scan VietQR Pro to check in instantly."
        : "Tinh gọn không add-on, chỉ chọn số lượng slot và quét mã VietQR Pro thanh toán tức thì trong 2 giây.",
      icon: Zap,
      gradient: "from-emerald-500 to-teal-600",
      demoOrder: "PG-WLK-99014",
    },
    {
      id: "system",
      href: "/system/PG-SYS-10293",
      title: isEn ? "6. B2B Enterprise & SaaS Services" : "6. Gói Dịch Vụ Hệ Thống B2B SaaS",
      tag: isEn ? "Venue owners, Organizers, Partners" : "Chủ sân, Ban tổ chức, Đối tác",
      badge: isEn ? "Enterprise / POS / AI" : "Doanh Nghiệp / POS / AI",
      description: isEn
        ? "Ticketing quotas, AI Photo Face/BIB recognition, Media photo sales, and Venue POS/IoT software (8% VAT)."
        : "Bán vé cổng, gói xử lý ảnh AI Face/BIB, gói bán ảnh media và phần mềm quản lý sân POS/IoT (VAT 8%).",
      icon: Cpu,
      gradient: "from-purple-600 to-slate-800",
      demoOrder: "PG-SYS-10293",
    },
  ];

  return (
    <div className="min-h-screen bg-background py-10 sm:py-16">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Title */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider text-brand-blue bg-brand-blue/10 dark:text-brand-green dark:bg-brand-green/10 border border-brand-blue/20 dark:border-brand-green/20 shadow-2xs">
            <CreditCard className="size-3.5" />
            <span>{isEn ? "PlayGrid Pay Multi-Channel Payment Gateway" : "Cổng Thanh Toán & Dịch Vụ Đa Kênh PlayGrid Pay"}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            {isEn ? "PlayGrid Unified Payment Hub" : "Trung Tâm Điều Phối Thanh Toán PlayGrid"}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-relaxed max-w-2xl mx-auto">
            {isEn
              ? "Automated payment system supporting 6 specialized product categories with 24/7 VietQR Pro instant transfer, e-wallets (MoMo, ZaloPay), international cards, and verified VAT e-invoices."
              : "Hệ thống thanh toán tự động hỗ trợ 6 danh mục sản phẩm chuyên biệt với cổng chuyển khoản VietQR Pro 24/7, ví điện tử MoMo, ZaloPay, thẻ quốc tế và hóa đơn đỏ VAT."}
          </p>
        </div>

        {/* 6 Catalog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {services.map((srv) => {
            const Icon = srv.icon;
            return (
              <Link
                key={srv.id}
                href={srv.href}
                className="group rounded-3xl border border-border/80 bg-card p-6 flex flex-col justify-between hover:border-brand-blue dark:hover:border-brand-green transition-all duration-200 hover:shadow-lg relative overflow-hidden cursor-pointer"
              >
                <div className="space-y-4">
                  {/* Top Icon & Badge */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`size-12 rounded-2xl bg-gradient-to-br ${srv.gradient} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="size-6" />
                    </div>
                    <span
                      className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${srv.badgeColor}`}
                    >
                      {srv.badge}
                    </span>
                  </div>

                  {/* Title & Tag */}
                  <div>
                    <h2 className="text-base font-semibold text-foreground group-hover:text-brand-blue dark:group-hover:text-brand-green transition-colors">
                      {srv.title}
                    </h2>
                    <span className="text-[11px] font-normal text-muted-foreground block mt-0.5">
                      {srv.tag}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground font-normal leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                {/* Bottom Order Code & Action */}
                <div className="pt-5 mt-5 border-t border-border/60 flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] text-muted-foreground font-medium">
                    {isEn ? "Demo:" : "Đơn mẫu:"} {srv.demoOrder}
                  </span>
                  <div className="flex items-center gap-1 font-semibold text-brand-blue dark:text-brand-green group-hover:translate-x-1 transition-transform">
                    <span>{isEn ? "Open Page" : "Mở trang"}</span>
                    <ArrowRight className="size-3.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Security & Partner Trust Strip */}
        <div className="rounded-3xl border border-border/80 bg-muted/30 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
              <ShieldCheck className="size-6" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-foreground">
                {isEn ? "Banking Grade PCI DSS Level 1 Security" : "An Toàn & Bảo Mật Tiêu Chuẩn Ngân Hàng PCI DSS Level 1"}
              </h4>
              <p className="text-[11px] text-muted-foreground font-normal">
                {isEn
                  ? "All transactions are 256-bit SSL end-to-end encrypted and automatically reconciled within 2 seconds."
                  : "Toàn bộ giao dịch đều được mã hóa đầu cuối 256-bit SSL và tự động đối soát trong vòng 2 giây."}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <span>VietQR Pro</span> • <span>MoMo</span> • <span>ZaloPay</span> • <span>Napas</span> • <span>Visa/Mastercard</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentHubPage() {
  const locale = useLocale();
  const isEn = locale === "en";

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-xs text-muted-foreground">
          {isEn ? "Loading PlayGrid payment gateway..." : "Đang tải cổng thanh toán PlayGrid..."}
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}
