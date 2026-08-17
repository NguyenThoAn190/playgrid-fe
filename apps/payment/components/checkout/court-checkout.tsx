"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import {
  Clock,
  MapPin,
  Tag,
  Plus,
  Minus,
  Check,
  Copy,
  ChevronRight,
  ChevronUp,
  ArrowLeft,
  ArrowRight,
  X,
} from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { CheckoutStepper } from "./checkout-stepper";
import { PaymentMethodSelector, PaymentMethod } from "./payment-method-selector";
import { VietQRModal } from "./vietqr-modal";
import { VatInvoiceForm, VatInvoiceData } from "./vat-invoice-form";
import { LanguageSwitcher } from "@/components/navbar/language-switcher";

interface CourtCheckoutProps {
  orderId?: string;
}

interface AddOnItem {
  id: string;
  name: string;
  nameEn: string;
  category: "racket" | "shuttle" | "drink" | "facility";
  price: number;
  quantity: number;
  unit: string;
  unitEn: string;
  badge?: string;
  badgeEn?: string;
}

export function CourtCheckout({ orderId = "PG-CRT-89241" }: CourtCheckoutProps) {
  const router = useRouter();
  const locale = useLocale();
  const isEn = locale === "en";

  // Multi-Step State: 3 bước (1: Thông tin -> 2: Dịch vụ -> 3: Thanh toán)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Mobile Bottom Sheet state for item breakdown
  const [showMobileSummary, setShowMobileSummary] = useState(false);

  // Copy Order ID state
  const [copied, setCopied] = useState(false);
  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Live 10-min countdown timer
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isUrgent = timeLeft < 180;

  // Pre-selected Court Booking Data (Đã chọn sẵn từ Website)
  const bookingInfo = {
    sport: "Cầu lông & Pickleball",
    courtName: "Sân Số 03 (VIP Taraflex)",
    venueName: "Cụm Sân PlayGrid Arena Bình Thạnh",
    address: "268 Điện Biên Phủ, P.25, Q. Bình Thạnh, TP.HCM",
    date: "Hôm nay, 17/08/2026",
    timeSlot: "18:00 - 20:00 (2 giờ)",
    courtType: "Thảm BWF Taraflex",
    hours: 2,
    ratePerHour: 160000,
    slotTag: "Giờ Vàng (Peak)",
  };

  // Customer Contact Info
  const [fullName, setFullName] = useState("Nguyễn Thọ An");
  const [phone, setPhone] = useState("0908123456");
  const [email, setEmail] = useState("nguyenthoan.dev@gmail.com");

  // Add-ons list
  const [addOns, setAddOns] = useState<AddOnItem[]>([
    { id: "racket", name: "Thuê vợt Yonex Astrox cao cấp", nameEn: "Yonex Astrox Premium Racket Rental", category: "racket", price: 50000, quantity: 1, unit: "cây", unitEn: "racket", badge: "Cao cấp", badgeEn: "Premium" },
    { id: "shuttle", name: "Ống cầu lông Hải Yến thi đấu (12 quả)", nameEn: "Hai Yen Tournament Shuttlecocks (12 pcs)", category: "shuttle", price: 85000, quantity: 1, unit: "ống", unitEn: "tube", badge: "Bán chạy", badgeEn: "Best Seller" },
    { id: "drink", name: "Nước khoáng / Điện giải Pocari Sweat", nameEn: "Pocari Sweat Electrolyte Drink", category: "drink", price: 15000, quantity: 2, unit: "chai", unitEn: "bottle" },
    { id: "locker", name: "Tủ khóa Locker bảo mật Smart Lock", nameEn: "Smart Lock Secure Locker", category: "facility", price: 10000, quantity: 0, unit: "tủ", unitEn: "locker" },
  ]);

  const updateAddOn = (id: string, delta: number) => {
    setAddOns((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  // VAT Invoice state
  const [vatData, setVatData] = useState<VatInvoiceData>({
    required: false,
    invoiceType: "company",
    companyName: "",
    taxCode: "",
    companyAddress: "",
    companyEmail: "",
    personalName: "Nguyễn Thọ An",
    personalEmail: "nguyenthoan.dev@gmail.com",
    personalAddress: "268 Điện Biên Phủ, P.25, Q. Bình Thạnh, TP.HCM",
    nationality: "VN",
    idNumber: "",
    address: "",
    invoiceEmail: "",
  });

  // Promo Engine
  const [voucherCode, setVoucherCode] = useState("");
  const [appliedVoucherCode, setAppliedVoucherCode] = useState<string>("WELCOMEPG");
  const [appliedDiscount, setAppliedDiscount] = useState(30000);
  const [voucherApplied, setVoucherApplied] = useState(true);

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    const upper = voucherCode.trim().toUpperCase();
    if (upper === "PLAYGRID50") {
      setAppliedVoucherCode("PLAYGRID50");
      setAppliedDiscount(50000);
      setVoucherApplied(true);
    } else if (upper === "SPORTSVIP") {
      setAppliedVoucherCode("SPORTSVIP");
      setAppliedDiscount(20000);
      setVoucherApplied(true);
    } else if (upper === "WELCOMEPG") {
      setAppliedVoucherCode("WELCOMEPG");
      setAppliedDiscount(30000);
      setVoucherApplied(true);
    } else if (upper.length > 0) {
      setAppliedVoucherCode(upper);
      setAppliedDiscount(30000);
      setVoucherApplied(true);
    }
  };

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("vietqr");
  const [showVietQR, setShowVietQR] = useState(false);

  // Calculations
  const courtRentalPrice = bookingInfo.hours * bookingInfo.ratePerHour;
  const addOnsTotal = addOns.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const subTotal = courtRentalPrice + addOnsTotal;
  const grandTotal = Math.max(0, subTotal - (voucherApplied ? appliedDiscount : 0));
  const finalTotalWithVat = vatData.required ? grandTotal + Math.round(grandTotal * 0.08) : grandTotal;

  const handleProceedPayment = () => {
    if (paymentMethod === "vietqr") {
      setShowVietQR(true);
    } else {
      router.push(`/${locale}/payment/success/${orderId}`);
    }
  };

  // 3-Step Process Stepper
  const stepsList = [
    { step: 1, label: isEn ? "Booking Info" : "Thông tin" },
    { step: 2, label: isEn ? "Add-on Services" : "Dịch vụ" },
    { step: 3, label: isEn ? "Payment" : "Thanh toán" },
  ];

  return (
    <div className="min-h-screen bg-muted/20 pb-36 lg:pb-16 pt-3 sm:pt-6">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 space-y-3 sm:space-y-4">
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
            <span>{isEn ? "Back to Previous" : "Quay lại trang trước"}</span>
          </button>

          <div className="flex items-center gap-3">
            {/* 1-Line Clean Countdown text */}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="size-3.5 text-brand-blue" />
              <span>{isEn ? "Reservation hold time:" : "Thời gian giữ chỗ:"}</span>
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

        {/* 3-Step Process Stepper */}
        <CheckoutStepper
          steps={stepsList}
          currentStep={currentStep}
          onStepClick={(step) => setCurrentStep(step)}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-start">
          {/* LEFT COLUMN (2/3): Step Form Content */}
          <div className="lg:col-span-8 space-y-3">
            {/* STEP 1: THÔNG TIN NGƯỜI ĐẶT SÂN & HÓA ĐƠN GTGT (VAT) */}
            {currentStep === 1 && (
              <div className="space-y-3 animate-in fade-in duration-200">
                {/* 1.1 Contact Info Form Card */}
                <div className="rounded-3xl border border-border/80 bg-card p-5 sm:p-6 space-y-4 shadow-sm">
                  <h3 className="text-sm sm:text-base font-semibold text-foreground">
                    {isEn ? "Court Booker Information" : "Thông tin người đặt sân"}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4.5 gap-x-4 text-xs">
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
                    <div className="space-y-2 sm:col-span-2">
                      <label className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center">
                        <span>{isEn ? "E-Ticket & QR Code Delivery Email" : "Email nhận vé điện tử & mã QR"}</span>
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-11 text-xs sm:text-sm rounded-xl px-3.5 bg-background shadow-2xs focus-visible:ring-1"
                      />
                    </div>
                  </div>
                </div>

                {/* 1.2 Corporate & Personal VAT Invoice Form */}
                <VatInvoiceForm data={vatData} onChange={setVatData} />
              </div>
            )}

            {/* STEP 2: DỊCH VỤ CỘNG THÊM TẠI SÂN */}
            {currentStep === 2 && (
              <div className="space-y-3 animate-in fade-in duration-200">
                {/* 2.1 Dịch Vụ Thuê Dụng Cụ & Nước Uống */}
                <div className="rounded-3xl border border-border/80 bg-card p-5 sm:p-6 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-foreground">
                        {isEn ? "On-site Add-on Services (Optional)" : "Dịch vụ cộng thêm tại sân (Tùy chọn)"}
                      </h3>
                      <p className="text-xs text-muted-foreground font-normal">
                        {isEn
                          ? "Rackets and beverages will be pre-arranged by staff before your court time"
                          : "Dụng cụ và nước uống sẽ được nhân viên chuẩn bị sẵn trước khi bạn nhận sân"}
                      </p>
                    </div>
                  </div>

                  <div className="divide-y divide-border/60">
                    {addOns.map((item) => (
                      <div key={item.id} className="py-3 flex items-center justify-between gap-3 text-xs sm:text-sm">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground">{isEn ? item.nameEn : item.name}</span>
                            {(item.badge || item.badgeEn) && (
                              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-brand-blue/10 text-brand-blue dark:bg-brand-green/15 dark:text-brand-green">
                                {isEn ? item.badgeEn : item.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-xs font-semibold text-brand-blue dark:text-brand-green block">
                            {item.price.toLocaleString(isEn ? "en-US" : "vi-VN")} {isEn ? "VND" : "đ"} / {isEn ? item.unitEn : item.unit}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => updateAddOn(item.id, -1)}
                            disabled={item.quantity === 0}
                            className="size-7 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 cursor-pointer"
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="w-6 text-center font-semibold text-foreground">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateAddOn(item.id, 1)}
                            className="size-7 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer"
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: PHƯƠNG THỨC THANH TOÁN */}
            {currentStep === 3 && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <div className="rounded-3xl border border-border/80 bg-card p-5 sm:p-6 space-y-4 shadow-sm">
                  <PaymentMethodSelector
                    selectedMethod={paymentMethod}
                    onSelect={setPaymentMethod}
                    totalAmount={finalTotalWithVat}
                  />
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN (1/3): Itemized Product Items & Payment Summary (Desktop Sticky Sidebar) */}
          <div className="hidden lg:block lg:col-span-4 space-y-3 lg:sticky lg:top-6">
            <div className="rounded-3xl border border-border/80 bg-card p-5 sm:p-6 space-y-4 shadow-sm">
              {/* Venue Header & Order ID */}
              <div className="border-b border-border/60 pb-3 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="text-muted-foreground">{isEn ? "Order ID:" : "Mã đơn:"}</span>
                    <button
                      type="button"
                      onClick={handleCopyOrderId}
                      className="inline-flex items-center gap-1 font-semibold text-foreground bg-muted/60 hover:bg-muted px-2 py-0.5 rounded-md transition-colors cursor-pointer border border-border/60"
                      title={isEn ? "Copy Order ID" : "Sao chép mã đơn"}
                    >
                      <span>{orderId}</span>
                      {copied ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3 text-muted-foreground" />}
                    </button>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    {isEn ? "Pending Payment" : "Chờ thanh toán"}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-foreground">
                    {bookingInfo.venueName}
                  </h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 font-normal mt-0.5">
                    <MapPin className="size-3 text-brand-blue shrink-0" />
                    <span className="truncate">{bookingInfo.address}</span>
                  </p>
                </div>
              </div>

              {/* Itemized Product Items List */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  <span>{isEn ? "Payment Items" : "Mục thanh toán"}</span>
                  <span>{1 + addOns.filter((a) => a.quantity > 0).length} {isEn ? "items" : "dịch vụ"}</span>
                </div>

                {/* 1. Primary Court Booking Item */}
                <div className="p-3.5 rounded-2xl bg-muted/40 border border-border/80 space-y-2 text-xs">
                  {/* Top row: Court Name + Total Price */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-foreground text-xs sm:text-sm truncate">
                      {bookingInfo.courtName}
                    </span>
                    <span className="font-bold text-sm text-brand-blue dark:text-brand-green shrink-0">
                      {courtRentalPrice.toLocaleString(isEn ? "en-US" : "vi-VN")} {isEn ? "VND" : "đ"}
                    </span>
                  </div>

                  {/* Bottom row: Time Slot + Unit Rate breakdown */}
                  <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-border/50 text-muted-foreground">
                    <div className="flex items-center gap-1 text-foreground font-medium">
                      <Clock className="size-3 text-brand-blue shrink-0" />
                      <span>{bookingInfo.timeSlot}</span>
                      <span className="text-muted-foreground font-normal">({bookingInfo.date})</span>
                    </div>
                    <span className="text-muted-foreground">
                      {bookingInfo.hours}h × {bookingInfo.ratePerHour.toLocaleString(isEn ? "en-US" : "vi-VN")}{isEn ? " VND/h" : "đ"}
                    </span>
                  </div>
                </div>

                {/* 2. Selected Add-ons Items */}
                {addOns
                  .filter((item) => item.quantity > 0)
                  .map((item) => (
                    <div key={item.id} className="p-3 rounded-2xl bg-card border border-border/70 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium text-foreground truncate">{isEn ? item.nameEn : item.name}</span>
                        <span className="font-semibold text-foreground shrink-0">
                          {(item.price * item.quantity).toLocaleString(isEn ? "en-US" : "vi-VN")} {isEn ? "VND" : "đ"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-muted-foreground text-[11px] pt-1 border-t border-border/40">
                        <span>{isEn ? "Quantity: " : "Số lượng: "}<strong className="text-foreground font-medium">{item.quantity} {isEn ? item.unitEn : item.unit}</strong></span>
                        <span>{item.price.toLocaleString(isEn ? "en-US" : "vi-VN")}{isEn ? ` VND/${item.unitEn}` : `đ/${item.unit}`}</span>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Discounts & VAT */}
              <div className="space-y-2 pt-2 border-t border-border/60 text-xs sm:text-sm">
                {voucherApplied && (
                  <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
                    <span className="flex items-center gap-1 font-medium text-xs">
                      <Tag className="size-3.5" />
                      {isEn ? `Voucher Discount (${appliedVoucherCode})` : `Mã giảm giá (${appliedVoucherCode})`}
                    </span>
                    <span className="font-semibold text-xs">
                      -{appliedDiscount.toLocaleString(isEn ? "en-US" : "vi-VN")} {isEn ? "VND" : "đ"}
                    </span>
                  </div>
                )}

                {vatData.required && (
                  <div className="flex items-center justify-between text-muted-foreground text-xs font-normal">
                    <span>{isEn ? "VAT Tax (8%)" : "Thuế GTGT (VAT 8%)"}</span>
                    <span className="font-medium text-foreground">
                      {Math.round(grandTotal * 0.08).toLocaleString(isEn ? "en-US" : "vi-VN")} {isEn ? "VND" : "đ"}
                    </span>
                  </div>
                )}

                {/* Grand Total */}
                <div className="pt-2.5 border-t border-border/60 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground font-normal block">{isEn ? "Total Amount" : "Tổng tiền thanh toán"}</span>
                    <span className="text-[10px] text-brand-green font-medium">{isEn ? "Service fee included" : "Đã bao gồm phí dịch vụ"}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg sm:text-xl font-bold text-brand-blue dark:text-brand-green">
                      {finalTotalWithVat.toLocaleString(isEn ? "en-US" : "vi-VN")} {isEn ? "VND" : "đ"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Promo code input in sidebar */}
              <form
                onSubmit={handleApplyVoucher}
                toolname="apply_court_checkout_voucher"
                tooldescription="Apply promotional voucher discount code on court checkout summary."
                className="flex gap-2 pt-1"
              >
                <Input
                  id="court-checkout-voucher-code"
                  name="voucherCode"
                  type="text"
                  placeholder={isEn ? "Enter promo code..." : "Nhập mã giảm giá..."}
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                  toolparamdescription="Promotional discount voucher code"
                  className="h-9 text-xs rounded-xl uppercase"
                />
                <Button type="submit" variant="outline" className="h-9 text-xs font-semibold rounded-xl shrink-0 cursor-pointer">
                  {isEn ? "Apply" : "Áp dụng"}
                </Button>
              </form>

              {/* Primary Action CTA in Desktop Sidebar */}
              <div className="pt-2 border-t border-border/60">
                {currentStep === 1 && (
                  <Button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="w-full h-12 rounded-2xl font-semibold bg-gradient-primary text-white shadow-md hover:opacity-95 cursor-pointer text-sm sm:text-base flex items-center justify-center gap-2"
                  >
                    <span>{isEn ? "Continue: Select Services" : "Tiếp tục: Chọn dịch vụ"}</span>
                    <ArrowRight className="size-4" />
                  </Button>
                )}

                {currentStep === 2 && (
                  <div className="space-y-2">
                    <Button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="w-full h-12 rounded-2xl font-semibold bg-gradient-primary text-white shadow-md hover:opacity-95 cursor-pointer text-sm sm:text-base flex items-center justify-center gap-2"
                    >
                      <span>{isEn ? "Continue: Payment" : "Tiếp tục: Thanh toán"}</span>
                      <ArrowRight className="size-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setCurrentStep(1)}
                      className="w-full h-9 text-xs text-muted-foreground hover:text-foreground font-medium flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="size-3.5" />
                      <span>{isEn ? "Back to info" : "Quay lại thông tin"}</span>
                    </Button>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-2">
                    <Button
                      type="button"
                      onClick={handleProceedPayment}
                      className="w-full h-12 rounded-2xl font-semibold bg-gradient-primary text-white shadow-md hover:opacity-95 cursor-pointer text-sm sm:text-base flex items-center justify-center gap-2"
                    >
                      <span>{isEn ? "Confirm & Pay Now" : "Xác nhận & Thanh toán ngay"}</span>
                      <ChevronRight className="size-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setCurrentStep(2)}
                      className="w-full h-9 text-xs text-muted-foreground hover:text-foreground font-medium flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="size-3.5" />
                      <span>{isEn ? "Back to select services" : "Quay lại chọn dịch vụ"}</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Clean 1-Line Countdown Text outside the card */}
            <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground pt-0.5">
              <Clock className="size-3.5 text-brand-blue shrink-0" />
              <span>{isEn ? "Reservation hold time:" : "Thời gian giữ chỗ:"}</span>
              <span className={`font-semibold ${isUrgent ? "text-red-500 font-bold" : "text-foreground"}`}>
                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE FIXED BOTTOM DOCK (Cố định dưới cằm điện thoại - Tích hợp ô nhập mã giảm giá ngay phía trên menu) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-border/80 shadow-2xl safe-area-bottom">
        {/* Strip 1: Ô Nhập Mã Giảm Giá Trực Tiếp Nằm Trên Menu */}
        <div className="border-b border-border/60 bg-muted/30 px-3.5 py-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground font-medium shrink-0">
            <Tag className="size-3.5 text-brand-blue dark:text-brand-green" />
            <span>{isEn ? "Promo:" : "Mã giảm:"}</span>
          </div>

          <form onSubmit={handleApplyVoucher} className="flex items-center gap-1.5 flex-1 justify-end max-w-[250px]">
            <Input
              type="text"
              placeholder={isEn ? "Enter code (WELCOMEPG)..." : "Nhập mã (WELCOMEPG)..."}
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
              className="h-7 text-[11px] rounded-lg uppercase bg-background px-2 py-0"
            />
            <Button
              type="submit"
              size="sm"
              variant="outline"
              className="h-7 text-[10px] px-2.5 rounded-lg shrink-0 font-semibold cursor-pointer hover:bg-muted"
            >
              {isEn ? "Apply" : "Áp dụng"}
            </Button>
          </form>
        </div>

        {/* Thông báo mã đã áp dụng thành công (nếu có) */}
        {voucherApplied && appliedDiscount > 0 && (
          <div className="border-b border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 flex items-center justify-between text-[11px] text-emerald-600 dark:text-emerald-400">
            <span className="flex items-center gap-1 font-medium">
              <Check className="size-3" />
              {isEn ? "Discounted: " : "Đã giảm: "}<strong className="font-bold">-{appliedDiscount.toLocaleString(isEn ? "en-US" : "vi-VN")} {isEn ? "VND" : "đ"}</strong> ({appliedVoucherCode})
            </span>
            <button
              type="button"
              onClick={() => {
                setVoucherApplied(false);
                setAppliedVoucherCode("");
                setAppliedDiscount(0);
                setVoucherCode("");
              }}
              className="underline text-[10px] hover:text-red-500 cursor-pointer"
            >
              {isEn ? "Remove" : "Bỏ mã"}
            </button>
          </div>
        )}

        {/* Strip 2: Menu Thanh Toán & Nút Chuyển Bước */}
        <div className="px-4 py-2.5">
          <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
            {/* Left: Total & Breakdown Drawer trigger */}
            <button
              type="button"
              onClick={() => setShowMobileSummary(!showMobileSummary)}
              className="text-left cursor-pointer group shrink-0 min-w-0"
            >
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-normal">
                <span>{isEn ? "Total" : "Tổng cộng"}</span>
                <ChevronUp
                  className={`size-3 text-muted-foreground transition-transform duration-200 ${
                    showMobileSummary ? "rotate-180" : ""
                  }`}
                />
              </div>
              <div className="text-sm sm:text-base font-bold text-brand-blue dark:text-brand-green leading-tight truncate">
                {finalTotalWithVat.toLocaleString(isEn ? "en-US" : "vi-VN")} {isEn ? "VND" : "đ"}
              </div>
            </button>

            {/* Right: Sleek Step Action Buttons */}
            <div className="flex items-center gap-1.5 shrink-0">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                  className="size-9 rounded-xl shrink-0 p-0 flex items-center justify-center border-border cursor-pointer hover:bg-muted"
                  title={isEn ? "Back to previous step" : "Quay lại bước trước"}
                >
                  <ArrowLeft className="size-3.5" />
                </Button>
              )}

              {currentStep === 1 && (
                <Button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="h-9 px-4 rounded-xl font-semibold bg-gradient-primary text-white shadow-sm cursor-pointer hover:opacity-95 text-xs flex items-center gap-1.5"
                >
                  <span>{isEn ? "Select Services" : "Dịch vụ"}</span>
                  <ArrowRight className="size-3.5" />
                </Button>
              )}

              {currentStep === 2 && (
                <Button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="h-9 px-4 rounded-xl font-semibold bg-gradient-primary text-white shadow-sm cursor-pointer hover:opacity-95 text-xs flex items-center gap-1.5"
                >
                  <span>{isEn ? "Payment" : "Thanh toán"}</span>
                  <ArrowRight className="size-3.5" />
                </Button>
              )}

              {currentStep === 3 && (
                <Button
                  type="button"
                  onClick={handleProceedPayment}
                  className="h-9 px-4 rounded-xl font-semibold bg-gradient-primary text-white shadow-sm cursor-pointer hover:opacity-95 text-xs flex items-center gap-1.5"
                >
                  <span>{isEn ? "Pay Now" : "Thanh toán ngay"}</span>
                  <ChevronRight className="size-3.5" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE EXPANDABLE SUMMARY DRAWER / BOTTOM SHEET */}
      {showMobileSummary && (
        <div
          onClick={() => setShowMobileSummary(false)}
          className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-card rounded-t-3xl border-t border-border p-5 max-h-[80vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-250"
          >
            {/* Fixed Drawer Header */}
            <div className="flex items-center justify-between pb-3 border-b border-border/60 shrink-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground text-sm">{isEn ? "Payment Breakdown" : "Chi tiết thanh toán"}</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-brand-blue/10 text-brand-blue dark:bg-brand-green/15 dark:text-brand-green">
                  {isEn ? "ID:" : "Mã:"} {orderId}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowMobileSummary(false)}
                className="size-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto overscroll-contain py-3 pr-1 space-y-3 touch-pan-y">
              {/* Itemized list */}
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-2xl bg-muted/40 border border-border/70 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">{bookingInfo.courtName}</span>
                    <span className="font-bold text-brand-blue dark:text-brand-green">
                      {courtRentalPrice.toLocaleString(isEn ? "en-US" : "vi-VN")} {isEn ? "VND" : "đ"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1 border-t border-border/40">
                    <span>{bookingInfo.timeSlot}</span>
                    <span>{bookingInfo.hours}h × {bookingInfo.ratePerHour.toLocaleString(isEn ? "en-US" : "vi-VN")}{isEn ? " VND/h" : "đ"}</span>
                  </div>
                </div>

                {addOns
                  .filter((i) => i.quantity > 0)
                  .map((item) => (
                    <div key={item.id} className="p-2.5 rounded-xl bg-card border border-border/70 flex items-center justify-between">
                      <div>
                        <span className="font-medium text-foreground block">{isEn ? item.nameEn : item.name}</span>
                        <span className="text-[11px] text-muted-foreground">{isEn ? "Qty: " : "SL: "}{item.quantity} {isEn ? item.unitEn : item.unit}</span>
                      </div>
                      <span className="font-semibold text-foreground">
                        {(item.price * item.quantity).toLocaleString(isEn ? "en-US" : "vi-VN")} {isEn ? "VND" : "đ"}
                      </span>
                    </div>
                  ))}
              </div>

              {voucherApplied && (
                <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 text-xs px-1">
                  <span className="flex items-center gap-1 font-medium">
                    <Tag className="size-3.5" />
                    {isEn ? `Voucher Discount (${appliedVoucherCode})` : `Mã giảm giá (${appliedVoucherCode})`}
                  </span>
                  <span className="font-semibold">
                    -{appliedDiscount.toLocaleString(isEn ? "en-US" : "vi-VN")} {isEn ? "VND" : "đ"}
                  </span>
                </div>
              )}

              {vatData.required && (
                <div className="flex items-center justify-between text-muted-foreground text-xs px-1">
                  <span>{isEn ? "VAT Tax (8%)" : "Thuế GTGT (VAT 8%)"}</span>
                  <span className="font-medium text-foreground">
                    {Math.round(grandTotal * 0.08).toLocaleString(isEn ? "en-US" : "vi-VN")} {isEn ? "VND" : "đ"}
                  </span>
                </div>
              )}
            </div>

            {/* Fixed Drawer Footer */}
            <div className="pt-3 border-t border-border/60 shrink-0 space-y-2.5 bg-card">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-muted-foreground">{isEn ? "Total Amount" : "Tổng tiền thanh toán"}</span>
                <span className="text-base sm:text-lg font-bold text-brand-blue dark:text-brand-green">
                  {finalTotalWithVat.toLocaleString(isEn ? "en-US" : "vi-VN")} {isEn ? "VND" : "đ"}
                </span>
              </div>

              <Button
                type="button"
                onClick={() => setShowMobileSummary(false)}
                className="w-full h-10 rounded-xl font-semibold bg-gradient-primary text-white text-xs cursor-pointer"
              >
                {isEn ? "Close Breakdown" : "Đóng chi tiết"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* VietQR Modal */}
      <VietQRModal
        isOpen={showVietQR}
        onClose={() => setShowVietQR(false)}
        orderId={orderId}
        amount={finalTotalWithVat}
        orderTitle={isEn ? `Reservation for ${bookingInfo.courtName} - ${bookingInfo.timeSlot}` : `Đặt ${bookingInfo.courtName} - ${bookingInfo.timeSlot}`}
      />
    </div>
  );
}
