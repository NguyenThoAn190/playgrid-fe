"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import {
  Zap,
  MapPin,
  Clock,
  ShieldCheck,
  Plus,
  Minus,
  Check,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  User,
  Phone,
  Mail,
  QrCode,
} from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { CheckoutHeader } from "./checkout-header";
import { CheckoutStepper } from "./checkout-stepper";
import { PaymentMethodSelector, PaymentMethod } from "./payment-method-selector";
import { VietQRModal } from "./vietqr-modal";
import { LanguageSwitcher } from "@/components/navbar/language-switcher";

interface WalkInCheckoutProps {
  orderId?: string;
}

export function WalkInCheckout({ orderId = "PG-WLK-99014" }: WalkInCheckoutProps) {
  const router = useRouter();
  const locale = useLocale();
  const isEn = locale === "en";

  // Multi-step State (1: Số slot & Thông tin -> 2: Thanh toán siêu tốc)
  const [currentStep, setCurrentStep] = useState<number>(1);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("vietqr");
  const [showVietQR, setShowVietQR] = useState(false);

  // Registrant Info
  const [fullName, setFullName] = useState("Hoàng Văn Đức");
  const [phone, setPhone] = useState("0977889900");
  const [email, setEmail] = useState("vanduc.play@gmail.com");

  // Slot Configuration (No add-ons as requested)
  const slotUnitPrice = 50000; // 50.000đ / slot
  const [slotCount, setSlotCount] = useState(2);

  const grandTotal = slotCount * slotUnitPrice;

  const updateSlot = (delta: number) => {
    setSlotCount((prev) => Math.max(1, prev + delta));
  };

  const handleProceedPayment = () => {
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
    { step: 1, label: isEn ? "Configure Slots" : "Chọn slot" },
    { step: 2, label: isEn ? "Payment" : "Thanh toán" },
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
            <span>{isEn ? "Back to Homepage" : "Quay lại trang chủ"}</span>
          </button>

          <div className="flex items-center gap-3">
            {/* 1-Line Clean Countdown text */}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="size-3.5 text-brand-blue dark:text-brand-green" />
              <span>{isEn ? "Slot reservation hold time:" : "Thời gian giữ slot:"}</span>
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
          {/* LEFT: Steps */}
          <div className="lg:col-span-8 space-y-3">
            {/* STEP 1: CẤU HÌNH SLOT & THÔNG TIN */}
            {currentStep === 1 && (
              <div className="space-y-3 animate-in fade-in duration-200">
                {/* Venue Banner */}
                <div className="rounded-3xl border border-border/80 bg-card p-5 space-y-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-medium uppercase tracking-wider text-brand-green bg-brand-green/10 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Zap className="size-3" /> {isEn ? "1-Tap Instant Walk-in Payment" : "Thanh Toán Nhanh 1-Chạm Tại Sân"}
                    </span>
                  </div>
                  <h2 className="text-base sm:text-lg font-semibold text-foreground">
                    {isEn ? "Walk-In Play / Open Session Pass" : "Vé Chơi Vãng Lai / Giao Lưu Tại Sân"}
                  </h2>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5 font-normal">
                    <MapPin className="size-3.5 text-brand-blue shrink-0" />
                    <span>{isEn ? "PlayGrid Arena - Court 04 (268 Dien Bien Phu, Binh Thanh Dist.)" : "PlayGrid Arena - Sân 04 (268 Điện Biên Phủ, Q. Bình Thạnh)"}</span>
                  </p>
                </div>

                {/* Slot Selector Card */}
                <div className="rounded-3xl border border-border/80 bg-card p-5 sm:p-6 space-y-4 shadow-sm">
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-foreground">
                      {isEn ? "Number of Player Slots" : "Số lượng Slot người chơi tham gia"}
                    </h3>
                    <p className="text-xs text-muted-foreground font-normal">
                      {isEn ? "Fixed rate: " : "Đơn giá cố định: "}<span className="font-semibold text-brand-blue dark:text-brand-green">50.000 {isEn ? "VND" : "đ"}</span> / {isEn ? "player slot" : "slot người chơi"}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-muted/40 border border-border/70 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-semibold text-foreground block">{isEn ? "Select number of slots" : "Chọn số người / slot"}</span>
                      <span className="text-xs text-muted-foreground font-normal">{isEn ? "Automatically calculates total payment" : "Tự động tính tổng tiền tương ứng"}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => updateSlot(-1)}
                        disabled={slotCount <= 1}
                        className="size-9 rounded-xl border border-border bg-card flex items-center justify-center text-foreground hover:bg-muted disabled:opacity-30 cursor-pointer shadow-xs"
                      >
                        <Minus className="size-4" />
                      </button>
                      <span className="w-8 text-center font-bold text-lg text-foreground">
                        {slotCount}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateSlot(1)}
                        className="size-9 rounded-xl border border-border bg-card flex items-center justify-center text-foreground hover:bg-muted cursor-pointer shadow-xs"
                      >
                        <Plus className="size-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-brand-blue/5 dark:bg-brand-green/10 border border-brand-blue/20 dark:border-brand-green/20 text-xs">
                    <span className="text-muted-foreground font-normal">{isEn ? "Calculation:" : "Công thức tính:"}</span>
                    <span className="font-medium text-foreground">
                      {slotCount} slot × 50.000 {isEn ? "VND" : "đ"} = <span className="text-brand-blue dark:text-brand-green font-bold text-sm">{grandTotal.toLocaleString(isEn ? "en-US" : "vi-VN")} {isEn ? "VND" : "đ"}</span>
                    </span>
                  </div>
                </div>

                {/* Registrant Info Card */}
                <div className="rounded-3xl border border-border/80 bg-card p-5 sm:p-6 space-y-4 shadow-sm">
                  <h3 className="text-sm sm:text-base font-semibold text-foreground">
                    {isEn ? "Registrant Information" : "Thông tin người đăng ký"}
                  </h3>

                  <div className="space-y-4 text-xs">
                    <div className="space-y-2">
                      <label className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center">
                        <span>{isEn ? "Full Name" : "Họ và tên"}</span>
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
                        <span>{isEn ? "Phone Number" : "Số điện thoại"}</span>
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
                        <span>{isEn ? "Receipt Delivery Email (Optional)" : "Email nhận biên lai điện tử"}</span>
                      </label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-11 text-xs sm:text-sm rounded-xl px-3.5 bg-background shadow-2xs focus-visible:ring-1"
                      />
                    </div>
                  </div>

                  {/* Step 1 Action */}
                  <div className="pt-3 border-t border-border/60 flex justify-end">
                    <Button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="h-11 px-6 rounded-2xl font-semibold bg-gradient-primary text-white shadow-md hover:opacity-95 cursor-pointer text-xs sm:text-sm flex items-center gap-2"
                    >
                      <span>{isEn ? "Continue: QR Scan & Pay" : "Tiếp tục: Quét mã thanh toán"}</span>
                      <ArrowRight className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: THANH TOÁN SIÊU TỐC */}
            {currentStep === 2 && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <div className="rounded-3xl border border-border/80 bg-card p-5 sm:p-6 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between border-b border-border/60 pb-3">
                    <h3 className="text-sm sm:text-base font-semibold text-foreground">
                      {isEn ? "Review Walk-In Play Pass" : "Xác nhận thông tin vé vãng lai"}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-xs text-brand-blue dark:text-brand-green font-semibold hover:underline cursor-pointer"
                    >
                      {isEn ? "Edit slots" : "Sửa số slot"}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-3 rounded-2xl bg-muted/40 border border-border/60 text-xs">
                    <div>
                      <span className="text-muted-foreground block text-[10px]">{isEn ? "Player" : "Người chơi"}</span>
                      <span className="font-semibold text-foreground mt-0.5 block">{fullName}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[10px]">{isEn ? "Phone" : "SĐT"}</span>
                      <span className="font-semibold text-foreground mt-0.5 block">{phone}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[10px]">{isEn ? "Slots" : "Số slot"}</span>
                      <span className="font-semibold text-brand-blue dark:text-brand-green mt-0.5 block">
                        {slotCount} {isEn ? "Players" : "Người chơi"}
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

                {/* Step 2 Actions */}
                <div className="pt-2 flex items-center justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                    className="h-11 px-5 rounded-2xl text-xs font-semibold gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="size-4" />
                    <span>{isEn ? "Edit Info" : "Sửa thông tin"}</span>
                  </Button>
                  <Button
                    type="button"
                    onClick={handleProceedPayment}
                    className="h-12 px-8 rounded-2xl font-semibold bg-gradient-primary text-white shadow-md hover:opacity-95 cursor-pointer text-sm sm:text-base flex items-center gap-2"
                  >
                    <span>{isEn ? "Scan VietQR & Pay Now" : "Quét VietQR Thanh toán ngay"}</span>
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Payment & Action */}
          <div className="lg:col-span-4 space-y-3 lg:sticky lg:top-6">
            <div className="rounded-3xl border border-border/80 bg-card p-5 sm:p-6 space-y-4 shadow-sm">
              <h3 className="text-sm sm:text-base font-semibold text-foreground border-b border-border/60 pb-3">
                {isEn ? "Walk-In Payment Summary" : "Thanh toán vãng lai"}
              </h3>

              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="flex items-center justify-between text-muted-foreground font-normal">
                  <span>{isEn ? "Player Slots" : "Số slot giao lưu"}</span>
                  <span className="font-medium text-foreground">{slotCount} {isEn ? "Slots" : "Slot"}</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground font-normal">
                  <span>{isEn ? "Unit Price / Slot" : "Đơn giá / Slot"}</span>
                  <span className="font-medium text-foreground">50.000 {isEn ? "VND" : "đ"}</span>
                </div>

                <div className="pt-3 border-t border-border/60 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground font-normal block">{isEn ? "Total Amount" : "Tổng thanh toán"}</span>
                    <span className="text-[11px] text-brand-green font-medium">
                      {isEn ? "Instant QR Pass generation" : "Nhận mã QR lập tức"}
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
                  <span className="font-semibold text-foreground">{isEn ? `Step ${currentStep}/2` : `Bước ${currentStep}/2`}</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="size-3.5 shrink-0" />
                  <span>{isEn ? "Automatic verification in 2 seconds" : "Xác nhận tự động trong 2 giây"}</span>
                </div>
              </div>
            </div>

            {/* Clean 1-Line Countdown Text outside the card */}
            <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground pt-0.5">
              <Clock className="size-3.5 text-brand-blue dark:text-brand-green shrink-0" />
              <span>{isEn ? "Slot reservation hold time:" : "Thời gian giữ slot:"}</span>
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
        orderTitle={isEn ? "PlayGrid Arena Walk-in Play Pass" : "Vé Vãng Lai PlayGrid Arena"}
      />
    </div>
  );
}
