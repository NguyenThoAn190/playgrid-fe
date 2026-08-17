"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import {
  Trophy,
  Calendar,
  MapPin,
  Clock,
  ShieldCheck,
  Users,
  User,
  Plus,
  Minus,
  Check,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Shirt,
  HeartHandshake,
} from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { CheckoutHeader } from "./checkout-header";
import { CheckoutStepper } from "./checkout-stepper";
import { PaymentMethodSelector, PaymentMethod } from "./payment-method-selector";
import { VietQRModal } from "./vietqr-modal";
import { VatInvoiceForm, VatInvoiceData } from "./vat-invoice-form";
import { LanguageSwitcher } from "@/components/navbar/language-switcher";

interface TournamentCheckoutProps {
  orderId?: string;
}

type CompCategory = "single_men" | "double_men" | "mixed_double" | "team_corp";
type SkillTier = "tier_30" | "tier_40" | "tier_open";

export function TournamentCheckout({ orderId = "PG-TRN-55812" }: TournamentCheckoutProps) {
  const router = useRouter();
  const locale = useLocale();
  const isEn = locale === "en";

  // Multi-Step State (1: Nội dung & Hạng đấu -> 2: Đội hình VĐV & Dịch vụ -> 3: Nộp phí & Thanh toán)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Category & Tier
  const [category, setCategory] = useState<CompCategory>("double_men");
  const [skillTier, setSkillTier] = useState<SkillTier>("tier_30");

  // Athlete 1 (Captain)
  const [captainName, setCaptainName] = useState("Võ Quốc Bảo");
  const [captainPhone, setCaptainPhone] = useState("0908765432");
  const [captainEmail, setCaptainEmail] = useState("quocbao.badminton@gmail.com");
  const [captainIdCard, setCaptainIdCard] = useState("079095001234");
  const [clubName, setClubName] = useState("CLB Cầu Lông PlayGrid Sài Gòn");

  // Athlete 2 (Partner)
  const [partnerName, setPartnerName] = useState("Đặng Tuấn Kiệt");
  const [partnerPhone, setPartnerPhone] = useState("0909112233");
  const [partnerIdCard, setPartnerIdCard] = useState("079096005678");

  // Tournament Add-ons
  const [orderJersey, setOrderJersey] = useState(true);
  const [jerseyCount, setJerseyCount] = useState(2);
  const [includeInsurance, setIncludeInsurance] = useState(true);

  // VAT Invoice
  const [vatData, setVatData] = useState<VatInvoiceData>({
    required: false,
    invoiceType: "company",
    companyName: "",
    taxCode: "",
    companyAddress: "",
    companyEmail: "",
    personalName: "",
    personalEmail: "",
    personalAddress: "",
    nationality: "VN",
    idNumber: "",
    address: "",
    invoiceEmail: "",
  });

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("vietqr");
  const [showVietQR, setShowVietQR] = useState(false);

  const categories: { id: CompCategory; label: string; labelEn: string; fee: number; isDoubles: boolean }[] = [
    { id: "single_men", label: "Đơn Nam", labelEn: "Men's Singles", fee: 350000, isDoubles: false },
    { id: "double_men", label: "Đôi Nam", labelEn: "Men's Doubles", fee: 600000, isDoubles: true },
    { id: "mixed_double", label: "Đôi Nam Nữ", labelEn: "Mixed Doubles", fee: 600000, isDoubles: true },
    { id: "team_corp", label: "Đồng Đội Doanh Nghiệp", labelEn: "Corporate Team", fee: 2500000, isDoubles: true },
  ];

  const currentCat = categories.find((c) => c.id === category) ?? categories[1]!;
  const registrationFee = currentCat.fee;
  const jerseyFee = orderJersey ? jerseyCount * 180000 : 0;
  const insuranceFee = includeInsurance ? (currentCat.isDoubles ? 80000 : 40000) : 0;

  const subTotal = registrationFee + jerseyFee + insuranceFee;
  const grandTotal = vatData.required ? subTotal + Math.round(subTotal * 0.08) : subTotal;

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
    { step: 1, label: isEn ? "Category" : "Hạng đấu" },
    { step: 2, label: isEn ? "Roster" : "Đội hình" },
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
            <span>{isEn ? "Back to Tournament" : "Quay lại giải đấu"}</span>
          </button>

          <div className="flex items-center gap-3">
            {/* 1-Line Clean Countdown text */}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="size-3.5 text-amber-600 dark:text-amber-400" />
              <span>{isEn ? "Spot reservation hold time:" : "Thời gian giữ suất thi đấu:"}</span>
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
            {/* STEP 1: CHỌN NỘI DUNG & HẠNG ĐẤU */}
            {currentStep === 1 && (
              <div className="space-y-3 animate-in fade-in duration-200">
                {/* 1.1 Tournament Info Banner */}
                <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-sm">
                  <div className="h-36 sm:h-44 bg-gradient-to-r from-amber-600 via-orange-600 to-red-700 p-6 flex flex-col justify-end text-white relative">
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white border border-white/30 flex items-center gap-1">
                      <Trophy className="size-3.5 text-amber-300" /> {isEn ? "Official Tournament" : "Giải Đấu Chính Thức"}
                    </div>
                    <span className="text-xs font-medium uppercase tracking-wider text-amber-200">
                      {isEn ? "PlayGrid ELO & DUPR Official Rating System" : "Hệ Thống Xếp Hạng ELO PlayGrid & DUPR"}
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold tracking-tight">
                      {isEn ? "PlayGrid Badminton & Pickleball Cup 2026 Championship" : "Giải Vô Địch Cầu Lông & Pickleball PlayGrid Cup 2026"}
                    </h2>
                  </div>

                  <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-card">
                    <div>
                      <span className="text-muted-foreground block text-[11px]">{isEn ? "Schedule" : "Thời gian thi đấu"}</span>
                      <span className="font-semibold text-foreground flex items-center gap-1 mt-0.5">
                        <Calendar className="size-3.5 text-amber-600" />
                        12 - 14/12/2026
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[11px]">{isEn ? "Venue" : "Địa điểm thi đấu"}</span>
                      <span className="font-semibold text-foreground flex items-center gap-1 mt-0.5">
                        <MapPin className="size-3.5 text-amber-600" />
                        {isEn ? "Quan Ngua Sports Complex" : "Cung Thể Thao Quần Ngựa"}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[11px]">{isEn ? "Total Prize Pool" : "Tổng giá trị giải thưởng"}</span>
                      <span className="font-semibold text-amber-600 dark:text-amber-400 mt-0.5 block">
                        150.000.000 {isEn ? "VND" : "VNĐ"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 1.2 Select Category & Rating Card */}
                <div className="rounded-3xl border border-border/80 bg-card p-5 sm:p-6 space-y-4 shadow-sm">
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-foreground">
                      {isEn ? "Competition Event & Division" : "Nội dung & Hạng mục thi đấu"}
                    </h3>
                    <p className="text-xs text-muted-foreground font-normal">
                      {isEn
                        ? "Select competition format and skill tier matching your ELO / DUPR rating"
                        : "Chọn nội dung đăng ký và trình độ thi đấu tương ứng với điểm ELO / DUPR của bạn"}
                    </p>
                  </div>

                  {/* Category Grid */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {categories.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setCategory(c.id)}
                        className={`p-3 rounded-2xl border text-left transition-colors cursor-pointer ${
                          category === c.id
                            ? "border-amber-500 bg-amber-500/10 text-amber-800 dark:text-amber-300 font-semibold ring-1 ring-amber-500/30"
                            : "border-border/80 bg-card hover:bg-muted text-muted-foreground"
                        }`}
                      >
                        <div className="text-xs font-semibold text-foreground">{isEn ? c.labelEn : c.label}</div>
                        <div className="text-xs text-amber-600 dark:text-amber-400 font-semibold mt-1">
                          {c.fee.toLocaleString(isEn ? "en-US" : "vi-VN")} {isEn ? "VND" : "đ"}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Skill Tier Select */}
                  <div className="space-y-1.5 pt-2">
                    <label className="text-xs font-medium text-muted-foreground">
                      {isEn ? "Athlete Skill Rating Tier" : "Hạng mục trình độ VĐV"}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "tier_30", label: isEn ? "3.0 Tier (Amateur)" : "Trình 3.0 (Phong trào)" },
                        { id: "tier_40", label: isEn ? "4.0 Tier (Intermediate)" : "Trình 4.0 (Trung cấp)" },
                        { id: "tier_open", label: isEn ? "Open Tier (Semi-pro)" : "Open (Bán chuyên)" },
                      ].map((tier) => (
                        <button
                          key={tier.id}
                          type="button"
                          onClick={() => setSkillTier(tier.id as SkillTier)}
                          className={`py-2.5 px-2.5 rounded-xl border text-xs font-medium text-center transition-colors cursor-pointer ${
                            skillTier === tier.id
                              ? "border-amber-500 bg-amber-500 text-white dark:bg-amber-500 dark:text-slate-900 font-semibold shadow-xs"
                              : "border-border/80 bg-card hover:bg-muted text-muted-foreground"
                          }`}
                        >
                          {tier.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 1 Action */}
                  <div className="pt-3 border-t border-border/60 flex justify-end">
                    <Button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="h-11 px-6 rounded-2xl font-semibold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white shadow-md hover:opacity-95 cursor-pointer text-xs sm:text-sm flex items-center gap-2"
                    >
                      <span>{isEn ? "Continue: Enter Athlete Roster" : "Tiếp tục: Điền danh sách VĐV"}</span>
                      <ArrowRight className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: DANH SÁCH VĐV & GÓI BỔ SUNG */}
            {currentStep === 2 && (
              <div className="space-y-3 animate-in fade-in duration-200">
                {/* Athlete Roster Card */}
                <div className="rounded-3xl border border-border/80 bg-card p-5 sm:p-6 space-y-4 shadow-sm">
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-foreground">
                      {isEn ? `Registered Athlete Information (${isEn ? currentCat.labelEn : currentCat.label})` : `Thông tin vận động viên đăng ký (${currentCat.label})`}
                    </h3>
                    <p className="text-xs text-muted-foreground font-normal">
                      {isEn
                        ? "Accurate identification is required for athlete credentials and tournament draw"
                        : "Thông tin định danh chính xác để làm thẻ VĐV và bốc thăm thi đấu"}
                    </p>
                  </div>

                  {/* VĐV 1 / Captain */}
                  <div className="space-y-3 p-3.5 rounded-2xl bg-muted/30 border border-border/60">
                    <div className="flex items-center gap-2 text-xs font-semibold text-brand-blue dark:text-brand-green">
                      <User className="size-4" />
                      <span>{isEn ? "Athlete 1 / Team Captain" : "VĐV 1 / Đội trưởng"}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4.5 gap-x-4 text-xs">
                      <div className="space-y-2">
                        <label className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center">
                          <span>{isEn ? "Full Name" : "Họ và tên"}</span>
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        <Input
                          value={captainName}
                          onChange={(e) => setCaptainName(e.target.value)}
                          className="h-11 text-xs sm:text-sm rounded-xl px-3.5 bg-background shadow-2xs focus-visible:ring-1"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center">
                          <span>{isEn ? "National ID / Passport" : "Số CCCD / Định danh"}</span>
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        <Input
                          value={captainIdCard}
                          onChange={(e) => setCaptainIdCard(e.target.value)}
                          className="h-11 text-xs sm:text-sm rounded-xl px-3.5 bg-background shadow-2xs focus-visible:ring-1"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center">
                          <span>{isEn ? "Phone Number" : "Số điện thoại"}</span>
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        <Input
                          value={captainPhone}
                          onChange={(e) => setCaptainPhone(e.target.value)}
                          className="h-11 text-xs sm:text-sm rounded-xl px-3.5 bg-background shadow-2xs focus-visible:ring-1"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center">
                          <span>{isEn ? "Club / Organization" : "CLB / Đơn vị đại diện"}</span>
                        </label>
                        <Input
                          value={clubName}
                          onChange={(e) => setClubName(e.target.value)}
                          className="h-11 text-xs sm:text-sm rounded-xl px-3.5 bg-background shadow-2xs focus-visible:ring-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* VĐV 2 (If Doubles) */}
                  {currentCat.isDoubles && (
                    <div className="space-y-3 p-3.5 rounded-2xl bg-muted/30 border border-border/60">
                      <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400">
                        <Users className="size-4" />
                        <span>{isEn ? "Athlete 2 / Partner" : "VĐV 2 / Đồng đội"}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4.5 gap-x-4 text-xs">
                        <div className="space-y-2">
                          <label className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center">
                            <span>{isEn ? "Partner Full Name" : "Họ và tên đồng đội"}</span>
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <Input
                            value={partnerName}
                            onChange={(e) => setPartnerName(e.target.value)}
                            className="h-11 text-xs sm:text-sm rounded-xl px-3.5 bg-background shadow-2xs focus-visible:ring-1"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center">
                            <span>{isEn ? "Partner National ID" : "Số CCCD / Định danh"}</span>
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <Input
                            value={partnerIdCard}
                            onChange={(e) => setPartnerIdCard(e.target.value)}
                            className="h-11 text-xs sm:text-sm rounded-xl px-3.5 bg-background shadow-2xs focus-visible:ring-1"
                          />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <label className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center">
                            <span>{isEn ? "Partner Phone Number" : "Số điện thoại"}</span>
                          </label>
                          <Input
                            value={partnerPhone}
                            onChange={(e) => setPartnerPhone(e.target.value)}
                            className="h-11 text-xs sm:text-sm rounded-xl px-3.5 bg-background shadow-2xs focus-visible:ring-1"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Tournament Add-ons Card */}
                <div className="rounded-3xl border border-border/80 bg-card p-5 sm:p-6 space-y-3 shadow-sm">
                  <h3 className="text-sm sm:text-base font-semibold text-foreground">
                    {isEn ? "Athlete Add-on Packages" : "Gói bổ sung cho VĐV"}
                  </h3>

                  <div className="space-y-2.5 text-xs">
                    {/* Official Jersey */}
                    <div className="p-3 rounded-2xl border border-border/70 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={orderJersey}
                          onChange={(e) => setOrderJersey(e.target.checked)}
                          className="size-4 rounded accent-brand-blue"
                        />
                        <div>
                          <span className="font-semibold text-foreground block">
                            {isEn ? "Official Tournament Jersey (180,000 VND/shirt)" : "Áo thi đấu chính thức BTC (180.000đ/áo)"}
                          </span>
                          <span className="text-muted-foreground font-normal">
                            {isEn ? "Breathable diamond-mesh performance fabric with athlete name print" : "Vải thể thao mè kim cương thoáng khí, in tên VĐV"}
                          </span>
                        </div>
                      </div>
                      {orderJersey && (
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => setJerseyCount((p) => Math.max(1, p - 1))}
                            className="size-6 rounded border flex items-center justify-center hover:bg-muted"
                          >
                            -
                          </button>
                          <span className="w-5 text-center font-semibold">{jerseyCount}</span>
                          <button
                            type="button"
                            onClick={() => setJerseyCount((p) => p + 1)}
                            className="size-6 rounded border flex items-center justify-center hover:bg-muted"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Insurance */}
                    <div className="p-3 rounded-2xl border border-border/70 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={includeInsurance}
                          onChange={(e) => setIncludeInsurance(e.target.checked)}
                          className="size-4 rounded accent-brand-blue"
                        />
                        <div>
                          <span className="font-semibold text-foreground block">
                            {isEn ? "Tournament Sports Accident Insurance (+40,000 VND/Athlete)" : "Bảo hiểm tai nạn thể thao trong giải (+40.000đ/VĐV)"}
                          </span>
                          <span className="text-muted-foreground font-normal">
                            {isEn ? "Medical coverage up to 50,000,000 VND" : "Bảo hiểm chi trả y tế viện phí lên đến 50.000.000đ"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Corporate VAT Form */}
                <VatInvoiceForm data={vatData} onChange={setVatData} />

                {/* Step 2 Actions */}
                <div className="pt-2 flex items-center justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                    className="h-11 px-5 rounded-2xl text-xs font-semibold gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="size-4" />
                    <span>{isEn ? "Back to category selection" : "Quay lại chọn hạng đấu"}</span>
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="h-11 px-6 rounded-2xl font-semibold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white shadow-md hover:opacity-95 cursor-pointer text-xs sm:text-sm flex items-center gap-2"
                  >
                    <span>{isEn ? "Continue: Pay Entry Fee" : "Tiếp tục: Nộp lệ phí"}</span>
                    <ArrowRight className="size-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 3: NỘP LỆ PHÍ & XÁC NHẬN */}
            {currentStep === 3 && (
              <div className="space-y-3 animate-in fade-in duration-200">
                {/* Summary Review Card */}
                <div className="rounded-3xl border border-border/80 bg-card p-5 sm:p-6 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between border-b border-border/60 pb-3">
                    <h3 className="text-sm sm:text-base font-semibold text-foreground">
                      {isEn ? "Review Tournament Registration" : "Xem lại hồ sơ đăng ký giải"}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-xs text-amber-600 dark:text-amber-400 font-semibold hover:underline cursor-pointer"
                    >
                      {isEn ? "Change category" : "Đổi hạng đấu"}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-2xl bg-muted/40 border border-border/60 text-xs">
                    <div>
                      <span className="text-muted-foreground block text-[10px]">{isEn ? "Event" : "Nội dung"}</span>
                      <span className="font-semibold text-foreground mt-0.5 block">{isEn ? currentCat.labelEn : currentCat.label}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[10px]">{isEn ? "Captain" : "Đội trưởng"}</span>
                      <span className="font-semibold text-foreground mt-0.5 block">{captainName}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[10px]">{isEn ? "Club / Org" : "CLB Đại diện"}</span>
                      <span className="font-semibold text-foreground mt-0.5 block truncate">{clubName}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[10px]">{isEn ? "Partner" : "Đồng đội"}</span>
                      <span className="font-semibold text-foreground mt-0.5 block">
                        {currentCat.isDoubles ? partnerName : (isEn ? "Singles" : "Đơn Nam")}
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
                    <span>{isEn ? "Edit Athlete Roster" : "Sửa danh sách VĐV"}</span>
                  </Button>
                  <Button
                    type="button"
                    onClick={handleProceedPayment}
                    className="h-12 px-8 rounded-2xl font-semibold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white shadow-md hover:opacity-95 cursor-pointer text-sm sm:text-base flex items-center gap-2"
                  >
                    <span>{isEn ? "Confirm & Pay Entry Fee" : "Xác nhận & Nộp lệ phí ngay"}</span>
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Payment & Summary */}
          <div className="lg:col-span-4 space-y-3 lg:sticky lg:top-6">
            <div className="rounded-3xl border border-border/80 bg-card p-5 sm:p-6 space-y-4 shadow-sm">
              <h3 className="text-sm sm:text-base font-semibold text-foreground border-b border-border/60 pb-3">
                {isEn ? "Tournament Cost Summary" : "Tổng chi phí giải đấu"}
              </h3>

              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="flex items-center justify-between text-muted-foreground font-normal">
                  <span>{isEn ? `Entry Fee (${currentCat.labelEn})` : `Lệ phí thi đấu (${currentCat.label})`}</span>
                  <span className="font-medium text-foreground">
                    {registrationFee.toLocaleString(isEn ? "en-US" : "vi-VN")} {isEn ? "VND" : "đ"}
                  </span>
                </div>

                {jerseyFee > 0 && (
                  <div className="flex items-center justify-between text-muted-foreground font-normal">
                    <span>{isEn ? `Official Jerseys (${jerseyCount} shirts)` : `Áo đấu chính thức (${jerseyCount} áo)`}</span>
                    <span className="font-medium text-foreground">
                      +{jerseyFee.toLocaleString(isEn ? "en-US" : "vi-VN")} {isEn ? "VND" : "đ"}
                    </span>
                  </div>
                )}

                {insuranceFee > 0 && (
                  <div className="flex items-center justify-between text-muted-foreground font-normal">
                    <span>{isEn ? "Tournament Insurance" : "Bảo hiểm thi đấu"}</span>
                    <span className="font-medium text-foreground">
                      +{insuranceFee.toLocaleString(isEn ? "en-US" : "vi-VN")} {isEn ? "VND" : "đ"}
                    </span>
                  </div>
                )}

                {vatData.required && (
                  <div className="flex items-center justify-between text-muted-foreground pt-1 border-t border-border/40 font-normal">
                    <span>{isEn ? "VAT Tax (8%)" : "Thuế GTGT (VAT 8%)"}</span>
                    <span className="font-medium text-foreground">
                      {Math.round(subTotal * 0.08).toLocaleString(isEn ? "en-US" : "vi-VN")} {isEn ? "VND" : "đ"}
                    </span>
                  </div>
                )}

                <div className="pt-3 border-t border-border/60 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground font-normal block">{isEn ? "Total Payment" : "Tổng thanh toán"}</span>
                    <span className="text-[11px] text-amber-600 font-medium">
                      {isEn ? "Spot & draw confirmed" : "Đã xác nhận suất bốc thăm"}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg sm:text-xl font-bold text-amber-600 dark:text-amber-400">
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
                  <span>{isEn ? "Sync ELO rating & issue digital athlete pass" : "Đồng bộ điểm ELO & cấp thẻ VĐV điện tử"}</span>
                </div>
              </div>
            </div>

            {/* Clean 1-Line Countdown Text outside the card */}
            <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground pt-0.5">
              <Clock className="size-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>{isEn ? "Spot reservation hold time:" : "Thời gian giữ suất thi đấu:"}</span>
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
        orderTitle={isEn ? "PlayGrid Badminton & Pickleball Cup Entry Fee" : "Lệ phí Giải Cầu lông & Pickleball PlayGrid Cup"}
      />
    </div>
  );
}
