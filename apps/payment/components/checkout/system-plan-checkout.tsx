"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import {
  Building2,
  Ticket,
  Sparkles,
  Camera,
  Image as ImageIcon,
  Cpu,
  Check,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Percent,
  Calendar,
  Layers,
  Clock,
} from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { CheckoutHeader } from "./checkout-header";
import { CheckoutStepper } from "./checkout-stepper";
import { PaymentMethodSelector, PaymentMethod } from "./payment-method-selector";
import { VietQRModal } from "./vietqr-modal";
import { VatInvoiceForm, VatInvoiceData } from "./vat-invoice-form";
import { LanguageSwitcher } from "@/components/navbar/language-switcher";

interface SystemPlanCheckoutProps {
  orderId?: string;
}

type ServiceCategory = "ticketing" | "ai_photo" | "photo_sales" | "venue_pos";

interface PlanOption {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  description: string;
  descriptionEn: string;
  features: string[];
  featuresEn: string[];
  badge?: string;
  badgeEn?: string;
}

export function SystemPlanCheckout({ orderId = "PG-SYS-10293" }: SystemPlanCheckoutProps) {
  const router = useRouter();
  const locale = useLocale();
  const isEn = locale === "en";

  // Multi-Step State (1: Phân hệ & Gói cước -> 2: Khai báo VAT Doanh Nghiệp -> 3: Thanh toán & Kích hoạt)
  const [currentStep, setCurrentStep] = useState<number>(1);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("vietqr");
  const [showVietQR, setShowVietQR] = useState(false);

  // Active Category Tab
  const [activeCat, setActiveCat] = useState<ServiceCategory>("venue_pos");

  // Selected Plan IDs per category
  const [selectedPlanId, setSelectedPlanId] = useState<string>("pos_pro");

  // Billing Cycle for SaaS (Monthly vs Yearly)
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");

  // Corporate VAT Data (Mandatory for B2B)
  const [vatData, setVatData] = useState<VatInvoiceData>({
    required: true,
    invoiceType: "company",
    companyName: "Công ty TNHH Đầu Tư Thể Thao PlayGrid",
    taxCode: "0317894562",
    companyAddress: "Tầng 8, Tòa nhà Landmark 81, 720A Điện Biên Phủ, P.22, Q. Bình Thạnh, TP.HCM",
    companyEmail: "ketoan@playgrid.vn",
    personalName: "",
    personalEmail: "",
    personalAddress: "",
    nationality: "VN",
    idNumber: "",
    address: "Tầng 8, Tòa nhà Landmark 81, 720A Điện Biên Phủ, P.22, Q. Bình Thạnh, TP.HCM",
    invoiceEmail: "ketoan@playgrid.vn",
  });

  // 1. Phí bán vé trên cổng
  const ticketingPlans: PlanOption[] = [
    {
      id: "ticket_500",
      name: "Gói Quota 500 Vé",
      nameEn: "500 Tickets Quota Package",
      price: 1500000,
      description: "Phù hợp cho các giải đấu thể thao phong trào nhỏ",
      descriptionEn: "Ideal for local and amateur sports tournaments",
      features: ["Hạn mức phát hành 500 vé điện tử", "Tự động thu tiền qua VietQR Pro", "Check-in QR bằng app điện thoại"],
      featuresEn: ["500 E-Tickets issuance quota", "Automated collection via VietQR Pro", "Mobile app QR check-in"],
    },
    {
      id: "ticket_2000",
      name: "Gói Quota 2.000 Vé",
      nameEn: "2,000 Tickets Quota Package",
      price: 4500000,
      badge: "Phổ biến nhất",
      badgeEn: "Most Popular",
      description: "Dành cho giải marathon, concert và giải đấu quy mô vừa",
      descriptionEn: "Designed for marathons, concerts and mid-size tournaments",
      features: ["Hạn mức 2.000 vé", "Sơ đồ chọn ghế tương tác (Seat Map)", "Xuất vé PDF & Apple Wallet", "Báo cáo doanh thu real-time"],
      featuresEn: ["2,000 Tickets quota", "Interactive Seat Map", "PDF & Apple Wallet export", "Real-time revenue reports"],
    },
    {
      id: "ticket_5000",
      name: "Gói Quota 5.000+ Vé",
      nameEn: "5,000+ Tickets Quota Package",
      price: 9000000,
      badge: "Enterprise",
      badgeEn: "Enterprise",
      description: "Giải đấu toàn quốc & đại nhạc hội lớn",
      descriptionEn: "National championships & mega music festivals",
      features: ["Hạn mức 5.000 vé", "Dedicated Account Manager", "Tích hợp cổng kiểm soát Turnstile", "Tùy biến cổng bán vé theo tên miền riêng"],
      featuresEn: ["5,000+ Tickets quota", "Dedicated Account Manager", "Turnstile gate hardware integration", "Custom branded domain gateway"],
    },
  ];

  // 2. Phí xử lý ảnh AI nhận diện Face & BIB
  const aiPhotoPlans: PlanOption[] = [
    {
      id: "ai_5k",
      name: "Gói 5.000 Ảnh AI",
      nameEn: "5,000 AI Photos Package",
      price: 500000,
      description: "100đ / ảnh - Phù hợp giải giao lưu dưới 300 VĐV",
      descriptionEn: "100 VND / photo - Suitable for < 300 athletes",
      features: ["AI nhận diện số BIB chính xác 99.8%", "AI nhận diện khuôn mặt người tham dự", "Tự động gắn tag album trong 5 phút"],
      featuresEn: ["99.8% accurate AI BIB recognition", "AI Face Recognition search", "Auto-tagging in 5 minutes"],
    },
    {
      id: "ai_20k",
      name: "Gói 20.000 Ảnh AI",
      nameEn: "20,000 AI Photos Package",
      price: 1600000,
      badge: "Tiết kiệm 20%",
      badgeEn: "Save 20%",
      description: "80đ / ảnh - Dành cho giải chạy bộ & giải đấu lớn",
      descriptionEn: "80 VND / photo - For major running races & tourneys",
      features: ["Xử lý 20.000 ảnh độ phân giải cao", "Cổng tìm ảnh theo khuôn mặt (Selfie Search)", "Đóng dấu bản quyền Watermark tự động"],
      featuresEn: ["20,000 high-res photo processing", "Selfie search portal", "Automated digital watermarking"],
    },
    {
      id: "ai_50k",
      name: "Gói 50.000 Ảnh AI",
      nameEn: "50,000 AI Photos Package",
      price: 3000000,
      badge: "Tiết kiệm 40%",
      badgeEn: "Save 40%",
      description: "60đ / ảnh - Không giới hạn số lượng nhiếp ảnh gia",
      descriptionEn: "60 VND / photo - Unlimited photographers",
      features: ["Xử lý 50.000 ảnh siêu tốc CDN", "API xuất dữ liệu hình ảnh theo từng VĐV", "Lưu trữ đám mây tốc độ cao 12 tháng"],
      featuresEn: ["50,000 CDN high-speed photos", "Athlete photo export API", "12-month cloud storage"],
    },
  ];

  // 3. Phí bán & phân phối ảnh Media
  const photoSalesPlans: PlanOption[] = [
    {
      id: "media_pass",
      name: "Gói Unlimited Download Pass",
      nameEn: "Unlimited Download Pass",
      price: 2000000,
      badge: "Trọn gói cho BTC",
      badgeEn: "All-Inclusive for Host",
      description: "Ban tổ chức trả trọn gói để toàn bộ VĐV tải ảnh gốc miễn phí",
      descriptionEn: "Organizer covers all costs for athletes to download original photos free",
      features: ["Tải ảnh gốc 4K không giới hạn", "Băng thông CDN tốc độ cao", "Tăng 300% tương tác truyền thông cho giải đấu"],
      featuresEn: ["Unlimited 4K photo downloads", "High-speed global CDN", "300% media engagement boost"],
    },
    {
      id: "media_revenue",
      name: "Gói Kích Hoạt Cổng Bán Ảnh",
      nameEn: "Photo Sales Gateway Activation",
      price: 500000,
      description: "Cho phép thợ ảnh / BTC bán lẻ từng bức ảnh cho người tham dự",
      descriptionEn: "Enable photographers to sell individual photos directly",
      features: ["Tích hợp cổng thanh toán VietQR mua ảnh", "Chia sẻ doanh thu 85% cho Thợ ảnh / BTC", "Tự động xóa Watermark sau khi khách trả tiền"],
      featuresEn: ["Integrated VietQR photo checkout", "85% revenue share to Photographer/Host", "Instant watermark removal upon payment"],
    },
  ];

  // 4. Gói phần mềm quản lý sân POS & IoT
  const venuePosPlans: PlanOption[] = [
    {
      id: "pos_starter",
      name: "Gói Starter (1-3 Sân)",
      nameEn: "Starter Plan (1-3 Courts)",
      price: billingCycle === "yearly" ? 290000 * 10 : 290000,
      description: "Dành cho cụm sân thể thao quy mô nhỏ",
      descriptionEn: "For small boutique sports venues",
      features: ["Quản lý lịch đặt sân real-time", "In hóa đơn & Báo cáo doanh thu ngày", "Nhận khách đặt online từ PlayGrid"],
      featuresEn: ["Real-time court scheduler", "Receipt printing & daily reports", "Receive online booking from PlayGrid"],
    },
    {
      id: "pos_pro",
      name: "Gói Pro (4-10 Sân)",
      nameEn: "Pro Plan (4-10 Courts)",
      price: billingCycle === "yearly" ? 690000 * 10 : 690000,
      badge: "Khuyên dùng",
      badgeEn: "Recommended",
      description: "Đầy đủ tính năng tự động hóa và kết nối IoT",
      descriptionEn: "Full automation and IoT court light control",
      features: ["Bao gồm tất cả tính năng Starter", "Tự động bật/tắt đèn sân qua IoT", "Gửi tin Zalo ZNS nhắc lịch cho khách", "Phân quyền quản lý & thu ngân"],
      featuresEn: ["All Starter features", "Automated IoT court lighting", "SMS/Zalo automated reminders", "Manager & Cashier role access control"],
    },
    {
      id: "pos_enterprise",
      name: "Gói Enterprise Chuỗi Sân",
      nameEn: "Enterprise Multi-Venue Chain",
      price: billingCycle === "yearly" ? 1490000 * 10 : 1490000,
      badge: "Chuỗi đa cơ sở",
      badgeEn: "Multi-Location Chain",
      description: "Dành cho chủ đầu tư sở hữu nhiều cụm sân",
      descriptionEn: "For owners running multi-branch sports facilities",
      features: ["Quản lý không giới hạn số lượng sân & chi nhánh", "Báo cáo tài chính so sánh đa cơ sở", "Kết nối cổng xoay Tripod mở bằng QR", "Hỗ trợ kỹ thuật 24/7 chuyên biệt"],
      featuresEn: ["Unlimited courts & branch locations", "Multi-venue financial comparison", "Tripod turnstile QR integration", "Dedicated 24/7 priority support"],
    },
  ];

  const getCurrentPlans = () => {
    switch (activeCat) {
      case "ticketing":
        return ticketingPlans;
      case "ai_photo":
        return aiPhotoPlans;
      case "photo_sales":
        return photoSalesPlans;
      case "venue_pos":
      default:
        return venuePosPlans;
    }
  };

  const currentPlans = getCurrentPlans();
  const selectedPlan = currentPlans.find((p) => p.id === selectedPlanId) || currentPlans[0];

  const subTotal = selectedPlan ? selectedPlan.price : 0;
  const vatAmount = Math.round(subTotal * 0.08); // 8% VAT
  const grandTotal = subTotal + vatAmount;

  const handleProceedPayment = () => {
    if (paymentMethod === "vietqr") {
      setShowVietQR(true);
    } else {
      router.push(`/${locale}/payment/success/${orderId}`);
    }
  };

  // Live 15-min countdown timer for B2B plan lock
  const [timeLeft, setTimeLeft] = useState(15 * 60);
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
    { step: 1, label: isEn ? "Plan Selection" : "Gói cước" },
    { step: 2, label: isEn ? "Corporate VAT" : "Thông tin VAT" },
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
            <span>{isEn ? "Back to Pricing" : "Quay lại bảng giá"}</span>
          </button>

          <div className="flex items-center gap-3">
            {/* 1-Line Clean Countdown text */}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="size-3.5 text-brand-blue dark:text-brand-green" />
              <span>{isEn ? "Quote reservation hold time:" : "Thời gian giữ báo giá ưu đãi:"}</span>
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
            {/* STEP 1: CHỌN PHÂN HỆ & GÓI CƯỚC */}
            {currentStep === 1 && (
              <div className="space-y-3 animate-in fade-in duration-200">
                {/* Main Unified Solution & Plan Selector Card */}
                <div className="rounded-3xl border border-border/80 bg-card p-5 sm:p-6 space-y-5 shadow-sm">
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold text-foreground">
                      {isEn ? "Select Enterprise & B2B SaaS Solution Plan" : "Chọn gói giải pháp Doanh Nghiệp & B2B SaaS"}
                    </h2>
                    <p className="text-xs text-muted-foreground font-normal mt-0.5">
                      {isEn
                        ? "Choose the module and scale suitable for your sports venue operations"
                        : "Lựa chọn phân hệ giải pháp và quy mô triển khai phù hợp cho cơ sở thể thao của bạn"}
                    </p>
                  </div>

                  {/* Segmented Category Tabs */}
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1.5 rounded-2xl bg-muted/50 border border-border/60">
                      {[
                        { id: "venue_pos", label: isEn ? "POS & IoT Software" : "Phần Mềm POS & IoT", icon: Cpu },
                        { id: "ticketing", label: isEn ? "Ticketing Gateway" : "Phí Bán Vé Cổng", icon: Ticket },
                        { id: "ai_photo", label: isEn ? "AI Photo (BIB/Face)" : "Xử Lý Ảnh AI (BIB)", icon: Sparkles },
                        { id: "photo_sales", label: isEn ? "Media Photo Sales" : "Bán Ảnh Media", icon: Camera },
                      ].map((cat) => {
                        const Icon = cat.icon;
                        const isSelected = activeCat === cat.id;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => {
                              setActiveCat(cat.id as ServiceCategory);
                              if (cat.id === "venue_pos") setSelectedPlanId("pos_pro");
                              if (cat.id === "ticketing") setSelectedPlanId("ticket_2000");
                              if (cat.id === "ai_photo") setSelectedPlanId("ai_20k");
                              if (cat.id === "photo_sales") setSelectedPlanId("media_pass");
                            }}
                            className={`flex items-center justify-center p-2.5 rounded-xl text-center transition-colors cursor-pointer gap-2 ${
                              isSelected
                                ? "bg-card border border-border/80 text-brand-blue dark:text-brand-green font-semibold shadow-xs"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/60 font-medium"
                            }`}
                          >
                            <Icon className="size-4 shrink-0" />
                            <span className="text-xs leading-tight">{cat.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Billing Toggle for SaaS */}
                    {activeCat === "venue_pos" && (
                      <div className="pt-1 flex items-center justify-center gap-3">
                        <span className={`text-xs ${billingCycle === "monthly" ? "text-foreground font-semibold" : "text-muted-foreground font-normal"}`}>
                          {isEn ? "Monthly Billing" : "Thanh toán hàng tháng"}
                        </span>
                        <button
                          type="button"
                          onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
                          className="relative w-11 h-6 rounded-full bg-muted border border-border p-0.5 transition-colors cursor-pointer"
                        >
                          <div
                            className={`size-5 rounded-full bg-gradient-primary transition-transform ${
                              billingCycle === "yearly" ? "translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </button>
                        <span className={`text-xs flex items-center gap-1.5 ${billingCycle === "yearly" ? "text-brand-blue dark:text-brand-green font-semibold" : "text-muted-foreground font-normal"}`}>
                          {isEn ? "Yearly Billing" : "Thanh toán theo năm"}
                          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 border border-emerald-500/30">
                            {isEn ? "Save 20% (2 Months Free)" : "Tiết kiệm 20% (Tặng 2 tháng)"}
                          </span>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Plans List Grid */}
                  <div className="space-y-3 pt-1">
                    {currentPlans.map((plan) => {
                      const isSelected = selectedPlanId === plan.id;
                      return (
                        <div
                          key={plan.id}
                          onClick={() => setSelectedPlanId(plan.id)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                            isSelected
                              ? "border-brand-blue dark:border-brand-green bg-brand-blue/5 dark:bg-brand-green/10 shadow-xs ring-1 ring-brand-blue/20 dark:ring-brand-green/20"
                              : "border-border/80 bg-card hover:border-border"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-xs sm:text-sm text-foreground">
                                  {isEn ? plan.nameEn : plan.name}
                                </span>
                                {(plan.badge || plan.badgeEn) && (
                                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-brand-green/15 text-brand-green border border-brand-green/30">
                                    {isEn ? plan.badgeEn : plan.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground font-normal">{isEn ? plan.descriptionEn : plan.description}</p>
                            </div>

                            <div className="text-right shrink-0">
                              <div className="text-sm sm:text-base font-bold text-brand-blue dark:text-brand-green">
                                {plan.price.toLocaleString(isEn ? "en-US" : "vi-VN")} {isEn ? "VND" : "đ"}
                              </div>
                              {activeCat === "venue_pos" && (
                                <span className="text-[10px] text-muted-foreground font-normal">
                                  {billingCycle === "yearly" ? (isEn ? "/ year (12 mos)" : "/ năm (12 tháng)") : (isEn ? "/ month" : "/ tháng")}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Feature Bullets */}
                          <div className="mt-3 pt-3 border-t border-border/60 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                            {(isEn ? plan.featuresEn : plan.features).map((feat, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground font-normal">
                                <Check className="size-3.5 text-brand-green shrink-0 stroke-[2.5]" />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Step 1 Action */}
                  <div className="pt-3 border-t border-border/60 flex justify-end">
                    <Button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="h-11 px-6 rounded-2xl font-semibold bg-gradient-primary text-white shadow-md hover:opacity-95 cursor-pointer text-xs sm:text-sm flex items-center gap-2"
                    >
                      <span>{isEn ? "Continue: Corporate VAT Declaration" : "Tiếp tục: Khai báo VAT Doanh Nghiệp"}</span>
                      <ArrowRight className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: KHAI BÁO THÔNG TIN DOANH NGHIỆP VAT */}
            {currentStep === 2 && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <div className="rounded-3xl border border-border/80 bg-card p-5 sm:p-6 space-y-4 shadow-sm">
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-foreground">
                      {isEn ? "Corporate Legal Entity Details & VAT E-Invoice (8%)" : "Thông tin Pháp Lý Doanh Nghiệp & Xuất Hóa Đơn Đỏ (VAT 8%)"}
                    </h3>
                    <p className="text-xs text-muted-foreground font-normal">
                      {isEn
                        ? "Tax-compliant e-invoice will be certified and sent directly to accounting email"
                        : "Hóa đơn điện tử hợp lệ sẽ được cơ quan thuế cấp mã và gửi trực tiếp qua email kế toán"}
                    </p>
                  </div>

                  {/* Mandatory B2B VAT Invoice Form */}
                  <VatInvoiceForm data={vatData} onChange={setVatData} requiredAlways={true} />

                  {/* Step 2 Actions */}
                  <div className="pt-3 border-t border-border/60 flex items-center justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(1)}
                      className="h-11 px-5 rounded-2xl text-xs font-semibold gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="size-4" />
                      <span>{isEn ? "Back to plan selection" : "Quay lại chọn gói"}</span>
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="h-11 px-6 rounded-2xl font-semibold bg-gradient-primary text-white shadow-md hover:opacity-95 cursor-pointer text-xs sm:text-sm flex items-center gap-2"
                    >
                      <span>{isEn ? "Continue: Activation Payment" : "Tiếp tục: Thanh toán kích hoạt"}</span>
                      <ArrowRight className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: THANH TOÁN & KÍCH HOẠT */}
            {currentStep === 3 && (
              <div className="space-y-3 animate-in fade-in duration-200">
                {/* Summary Card */}
                <div className="rounded-3xl border border-border/80 bg-card p-5 sm:p-6 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between border-b border-border/60 pb-3">
                    <h3 className="text-sm sm:text-base font-semibold text-foreground">
                      {isEn ? "Review Software Plan & Corporate Information" : "Xác nhận thông tin gói phần mềm & Doanh nghiệp"}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-xs text-brand-blue dark:text-brand-green font-semibold hover:underline cursor-pointer"
                    >
                      {isEn ? "Change plan" : "Đổi gói cước"}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-3 rounded-2xl bg-muted/40 border border-border/60 text-xs">
                    <div>
                      <span className="text-muted-foreground block text-[10px]">{isEn ? "Selected Plan" : "Gói cước"}</span>
                      <span className="font-semibold text-foreground mt-0.5 block">{isEn ? selectedPlan?.nameEn : selectedPlan?.name}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[10px]">{isEn ? "Enterprise" : "Doanh nghiệp"}</span>
                      <span className="font-semibold text-foreground mt-0.5 block truncate">{vatData.companyName}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[10px]">{isEn ? "Tax Code" : "Mã số thuế"}</span>
                      <span className="font-semibold text-brand-blue dark:text-brand-green mt-0.5 block">
                        {vatData.taxCode}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Method Selector */}
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
                    <span>{isEn ? "Edit Corporate VAT" : "Sửa thông tin VAT"}</span>
                  </Button>
                  <Button
                    type="button"
                    onClick={handleProceedPayment}
                    className="h-12 px-8 rounded-2xl font-semibold bg-gradient-primary text-white shadow-md hover:opacity-95 cursor-pointer text-sm sm:text-base flex items-center gap-2"
                  >
                    <span>{isEn ? "Pay & Activate Software License" : "Thanh toán & Kích hoạt bản quyền"}</span>
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Payment & Total */}
          <div className="lg:col-span-4 space-y-3 lg:sticky lg:top-6">
            <div className="rounded-3xl border border-border/80 bg-card p-5 sm:p-6 space-y-4 shadow-sm">
              <h3 className="text-sm sm:text-base font-semibold text-foreground border-b border-border/60 pb-3">
                {isEn ? "B2B Payment Summary" : "Tổng chi phí thanh toán B2B"}
              </h3>

              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="flex items-center justify-between text-muted-foreground font-normal">
                  <span>{isEn ? "Selected Solution" : "Gói dịch vụ đã chọn"}</span>
                  <span className="font-semibold text-foreground">{isEn ? selectedPlan?.nameEn : selectedPlan?.name}</span>
                </div>

                <div className="flex items-center justify-between text-muted-foreground font-normal">
                  <span>{isEn ? "Subtotal (excl. VAT)" : "Tiền gói trước thuế"}</span>
                  <span className="font-medium text-foreground">
                    {subTotal.toLocaleString(isEn ? "en-US" : "vi-VN")} {isEn ? "VND" : "đ"}
                  </span>
                </div>

                <div className="flex items-center justify-between text-muted-foreground font-normal">
                  <span>{isEn ? "VAT Tax (8% mandatory)" : "Thuế GTGT (VAT 8% bắt buộc)"}</span>
                  <span className="font-medium text-foreground">
                    {vatAmount.toLocaleString(isEn ? "en-US" : "vi-VN")} {isEn ? "VND" : "đ"}
                  </span>
                </div>

                <div className="pt-3 border-t border-border/60 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground font-normal block">{isEn ? "Total Amount" : "Tổng tiền thanh toán"}</span>
                    <span className="text-[11px] text-brand-green font-medium">
                      {isEn ? "VAT included & Instant activation" : "Đã gồm VAT & Kích hoạt tức thì"}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg sm:text-xl font-mono font-bold text-brand-blue dark:text-brand-green">
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
                  <span>{isEn ? "VAT E-invoice sent via email within 24h" : "Hóa đơn điện tử VAT gửi email trong 24h"}</span>
                </div>
              </div>
            </div>

            {/* Clean 1-Line Countdown Text outside the card */}
            <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground pt-0.5">
              <Clock className="size-3.5 text-brand-blue dark:text-brand-green shrink-0" />
              <span>{isEn ? "Quote reservation hold time:" : "Thời gian giữ báo giá ưu đãi:"}</span>
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
        orderTitle={isEn ? "PlayGrid B2B Software Subscription" : "Thuê Bao Phần Mềm PlayGrid B2B"}
      />
    </div>
  );
}
