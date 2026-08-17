"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import {
  Calendar,
  Clock,
  MapPin,
  Tag,
  Check,
  Copy,
  ChevronRight,
  ChevronUp,
  ArrowLeft,
  ArrowRight,
  User,
  Shirt,
  X,
  ShieldCheck,
  UserCheck,
  ChevronDown,
  Sparkles,
  BookmarkPlus,
  Bookmark,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { CheckoutStepper } from "./checkout-stepper";
import { PaymentMethodSelector, PaymentMethod } from "./payment-method-selector";
import { VietQRModal } from "./vietqr-modal";
import { VatInvoiceForm, VatInvoiceData } from "./vat-invoice-form";
import { LanguageSwitcher } from "@/components/navbar/language-switcher";

interface SavedProfile {
  id: string;
  name: string;
  relationship: string;
  fullName: string;
  citizenId: string;
  phone: string;
  email: string;
  bibName: string;
  emergencyPhone: string;
  runningClub: string;
  shirtSize: string;
}

const SAVED_PROFILES: SavedProfile[] = [
  {
    id: "prof_me",
    name: "Trần Minh Quân (Chính chủ)",
    relationship: "Tài khoản của tôi",
    fullName: "Trần Minh Quân",
    citizenId: "079198001234",
    phone: "0912345678",
    email: "minhquan.runner@gmail.com",
    bibName: "QUAN TRAN",
    emergencyPhone: "0987654321",
    runningClub: "PlayGrid Runners Club",
    shirtSize: "L",
  },
  {
    id: "prof_friend_1",
    name: "Nguyễn Văn An",
    relationship: "Đồng đội CLB (Bơi)",
    fullName: "Nguyễn Văn An",
    citizenId: "079195001234",
    phone: "0908123456",
    email: "an.nguyen@example.com",
    bibName: "AN NGUYEN",
    emergencyPhone: "0909887766",
    runningClub: "Sài Gòn Triathlon Club",
    shirtSize: "M",
  },
  {
    id: "prof_friend_2",
    name: "Lê Hoàng Nam",
    relationship: "Bạn bè (Đạp xe)",
    fullName: "Lê Hoàng Nam",
    citizenId: "079196003456",
    phone: "0903987654",
    email: "hoangnam.tri@gmail.com",
    bibName: "NAM LE",
    emergencyPhone: "0918273645",
    runningClub: "Ironman Vietnam Warriors",
    shirtSize: "XL",
  },
  {
    id: "prof_friend_3",
    name: "Đặng Tuấn Kiệt",
    relationship: "Đồng đội Relay (Chạy)",
    fullName: "Đặng Tuấn Kiệt",
    citizenId: "079096005678",
    phone: "0909112233",
    email: "tuankiet.tri@gmail.com",
    bibName: "KIET DANG",
    emergencyPhone: "0903112233",
    runningClub: "Tri-Factor Sài Gòn",
    shirtSize: "M",
  },
];

interface EventCheckoutProps {
  orderId?: string;
}

interface SelectedTicket {
  id: string;
  tierId: string;
  distance: string;
  name: string;
  price: number;
  badge?: string;
  quantity: number;
  isRelay?: boolean;
}

interface ParticipantInfo {
  id: string;
  ticketId: string;
  tierName: string;
  distance: string;
  fullName: string;
  citizenId: string;
  phone: string;
  email: string;
  bibName: string;
  gender: "male" | "female";
  birthDate: string;
  shirtSize: string;
  emergencyPhone: string;
  runningClub: string;
}

interface RelayLegMember {
  leg: "swim" | "bike" | "run";
  legLabel: string;
  legDistance: string;
  fullName: string;
  citizenId: string;
  phone: string;
  email: string;
  emergencyPhone: string;
  shirtSize: string;
  specialField: string;
  isDualRole?: boolean;
}

interface RelayTeamInfo {
  id: string;
  ticketId: string;
  distance: string;
  tierName: string;
  teamName: string;
  clubOrCompany: string;
  emergencyPhoneCommon: string;
  legs: {
    swim: RelayLegMember;
    bike: RelayLegMember;
    run: RelayLegMember;
  };
}

export function EventCheckout({ orderId = "PG-EVT-77210" }: EventCheckoutProps) {
  const router = useRouter();
  const locale = useLocale();
  const isEn = locale === "en";

  // Multi-Step State: 3 Bước (1: Thông tin -> 2: Vận động viên -> 3: Thanh toán)
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
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isUrgent = timeLeft < 180;

  // Pre-selected Event Booking Data (Đã chọn sẵn từ Website sự kiện)
  const eventInfo = {
    eventName: "PlayGrid Vietnam Marathon & Sports Fest 2026",
    location: "KĐT Sala, TP. Thủ Đức, TP.HCM",
    date: "25/10/2026 (Chủ Nhật)",
    startTime: "04:30 Sáng",
    category: "Giải Marathon Quốc Tế Thường Niên",
  };

  // Pre-selected Tickets from Website (Bao gồm Vé Cá Nhân 10KM và Vé Tiếp Sức Relay Triathlon)
  const selectedTickets: SelectedTicket[] = [
    {
      id: "ticket_1",
      tierId: "10km",
      distance: "10 KM",
      name: "Cự Ly 10KM - Thử Thách Tốc Độ (Speed Run)",
      price: 550000,
      badge: "Cá nhân",
      quantity: 1,
      isRelay: false,
    },
    {
      id: "ticket_relay",
      tierId: "relay_triathlon",
      distance: "RELAY 113KM",
      name: "Triathlon Relay - Ba Môn Phối Hợp Đồng Đội (Bơi 1.9km • Đạp 90km • Chạy 21.1km)",
      price: 2400000,
      badge: "Đội 3 VĐV",
      quantity: 1,
      isRelay: true,
    },
  ];

  // Step 1: Customer Contact Info (Người mua vé)
  const [buyerName, setBuyerName] = useState("Trần Minh Quân");
  const [buyerPhone, setBuyerPhone] = useState("0912345678");
  const [buyerEmail, setBuyerEmail] = useState("minhquan.runner@gmail.com");

  // Step 1: VAT Invoice Data
  const [vatData, setVatData] = useState<VatInvoiceData>({
    required: false,
    invoiceType: "company",
    companyName: "",
    taxCode: "",
    companyAddress: "",
    companyEmail: "",
    personalName: "Trần Minh Quân",
    personalEmail: "minhquan.runner@gmail.com",
    personalAddress: "128 Mai Chí Thọ, P. An Phú, TP. Thủ Đức, TP.HCM",
    nationality: "VN",
    idNumber: "",
    address: "",
    invoiceEmail: "",
  });

  // Step 2: Individual Participants list
  const [participants, setParticipants] = useState<ParticipantInfo[]>([
    {
      id: "p_1",
      ticketId: "ticket_1",
      tierName: "Cự Ly 10KM - Thử Thách Tốc Độ (Speed Run)",
      distance: "10 KM",
      fullName: "Trần Minh Quân",
      citizenId: "079198001234",
      phone: "0912345678",
      email: "minhquan.runner@gmail.com",
      bibName: "QUAN TRAN",
      gender: "male",
      birthDate: "1995-08-15",
      shirtSize: "L",
      emergencyPhone: "0987654321",
      runningClub: "PlayGrid Runners Club",
    },
  ]);

  // Step 2: Relay Teams list (Triathlon Swim - Bike - Run)
  const [relayTeams, setRelayTeams] = useState<RelayTeamInfo[]>([
    {
      id: "relay_1",
      ticketId: "ticket_relay",
      distance: "RELAY 113KM",
      tierName: "Triathlon Relay - Ba Môn Phối Hợp Đồng Đội",
      teamName: "PlayGrid Warriors Team",
      clubOrCompany: "CLB Ba Môn Phối Hợp Sài Gòn",
      emergencyPhoneCommon: "0908123456",
      legs: {
        swim: {
          leg: "swim",
          legLabel: "Bơi Biển (Swim)",
          legDistance: "1.9 KM",
          fullName: "Nguyễn Văn An",
          citizenId: "079195001234",
          phone: "0908123456",
          email: "an.nguyen@example.com",
          emergencyPhone: "0909887766",
          shirtSize: "M",
          specialField: "42 phút (Pace 2:12/100m)",
        },
        bike: {
          leg: "bike",
          legLabel: "Đạp Xe (Bike)",
          legDistance: "90 KM",
          fullName: "Lê Hoàng Nam",
          citizenId: "079196003456",
          phone: "0903987654",
          email: "hoangnam.tri@gmail.com",
          emergencyPhone: "0918273645",
          shirtSize: "XL",
          specialField: "Xe TT Tri-Bike (Aero)",
          isDualRole: false,
        },
        run: {
          leg: "run",
          legLabel: "Chạy Bộ (Run)",
          legDistance: "21.1 KM",
          fullName: "Đặng Tuấn Kiệt",
          citizenId: "079096005678",
          phone: "0909112233",
          email: "tuankiet.tri@gmail.com",
          emergencyPhone: "0903112233",
          shirtSize: "M",
          specialField: "WARRIORS RUNNER",
          isDualRole: false,
        },
      },
    },
  ]);

  // Saved Profile Dynamic List & State
  const [savedProfilesList, setSavedProfilesList] = useState<SavedProfile[]>(SAVED_PROFILES);
  const [savedStatus, setSavedStatus] = useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Relay Active Leg Tab ("all" | "swim" | "bike" | "run")
  const [relayActiveLegTab, setRelayActiveLegTab] = useState<Record<string, "all" | "swim" | "bike" | "run">>({
    relay_1: "all",
  });

  // Saved Profile Picker State (Dropdown)
  const [activeProfilePickerId, setActiveProfilePickerId] = useState<string | null>(null);

  const handleApplySavedProfile = (participantId: string, profile: SavedProfile) => {
    setParticipants((prev) =>
      prev.map((p) =>
        p.id === participantId
          ? {
              ...p,
              fullName: profile.fullName,
              citizenId: profile.citizenId,
              phone: profile.phone,
              email: profile.email,
              bibName: profile.bibName,
              emergencyPhone: profile.emergencyPhone,
              runningClub: profile.runningClub,
              shirtSize: profile.shirtSize,
            }
          : p
      )
    );
    setActiveProfilePickerId(null);
  };

  const handleApplyBuyerProfile = (profile: SavedProfile) => {
    setBuyerName(profile.fullName);
    setBuyerPhone(profile.phone);
    setBuyerEmail(profile.email);
    setActiveProfilePickerId(null);
  };

  const updateRelayTeam = (
    teamId: string,
    field: "teamName" | "clubOrCompany" | "emergencyPhoneCommon",
    value: string
  ) => {
    setRelayTeams((prev) =>
      prev.map((team) => (team.id === teamId ? { ...team, [field]: value } : team))
    );
  };

  const updateRelayLeg = (
    teamId: string,
    leg: "swim" | "bike" | "run",
    field: keyof RelayLegMember,
    value: any
  ) => {
    setRelayTeams((prev) =>
      prev.map((team) => {
        if (team.id !== teamId) return team;
        return {
          ...team,
          legs: {
            ...team.legs,
            [leg]: {
              ...team.legs[leg],
              [field]: value,
            },
          },
        };
      })
    );
  };

  const handleSyncEmergencyPhoneToTeam = (teamId: string, phone: string) => {
    if (!phone.trim()) return;
    setRelayTeams((prev) =>
      prev.map((team) => {
        if (team.id !== teamId) return team;
        return {
          ...team,
          emergencyPhoneCommon: phone,
          legs: {
            swim: { ...team.legs.swim, emergencyPhone: phone },
            bike: { ...team.legs.bike, emergencyPhone: phone },
            run: { ...team.legs.run, emergencyPhone: phone },
          },
        };
      })
    );
    setToastMessage("Đã đồng bộ SĐT khẩn cấp cho cả 3 VĐV trong đội tiếp sức!");
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleCopyLegFromPrevious = (
    teamId: string,
    targetLeg: "bike" | "run",
    sourceLeg: "swim" | "bike"
  ) => {
    const team = relayTeams.find((t) => t.id === teamId);
    if (!team) return;
    const source = team.legs[sourceLeg];
    updateRelayLeg(teamId, targetLeg, "fullName", source.fullName);
    updateRelayLeg(teamId, targetLeg, "citizenId", source.citizenId);
    updateRelayLeg(teamId, targetLeg, "phone", source.phone);
    updateRelayLeg(teamId, targetLeg, "email", source.email);
    updateRelayLeg(teamId, targetLeg, "shirtSize", source.shirtSize);
    updateRelayLeg(teamId, targetLeg, "emergencyPhone", source.emergencyPhone);
    updateRelayLeg(teamId, targetLeg, "isDualRole", true);
    setToastMessage(
      `Đã gán VĐV "${source.fullName}" kiêm luôn ${
        targetLeg === "bike" ? "chặng Đạp xe" : "chặng Chạy bộ"
      }!`
    );
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleApplySavedProfileToRelayLeg = (
    teamId: string,
    leg: "swim" | "bike" | "run",
    profile: SavedProfile
  ) => {
    updateRelayLeg(teamId, leg, "fullName", profile.fullName);
    updateRelayLeg(teamId, leg, "citizenId", profile.citizenId);
    updateRelayLeg(teamId, leg, "phone", profile.phone);
    updateRelayLeg(teamId, leg, "email", profile.email);
    updateRelayLeg(teamId, leg, "shirtSize", profile.shirtSize);
    updateRelayLeg(teamId, leg, "emergencyPhone", profile.emergencyPhone);
    setActiveProfilePickerId(null);
  };

  const handleCopyBuyerToRelaySwim = (teamId: string) => {
    updateRelayLeg(teamId, "swim", "fullName", buyerName);
    updateRelayLeg(teamId, "swim", "phone", buyerPhone);
    updateRelayLeg(teamId, "swim", "email", buyerEmail);
    setToastMessage(`Đã sao chép người mua "${buyerName}" vào Chặng Bơi (Leg 1)!`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleSaveParticipantProfile = (participant: ParticipantInfo) => {
    if (!participant.fullName.trim()) return;

    const newProfile: SavedProfile = {
      id: `prof_${Date.now()}`,
      name: `${participant.fullName} (${participant.runningClub || "Vận động viên"})`,
      relationship: "Hồ sơ đã lưu",
      fullName: participant.fullName,
      citizenId: participant.citizenId,
      phone: participant.phone,
      email: participant.email,
      bibName: participant.bibName || participant.fullName.toUpperCase(),
      emergencyPhone: participant.emergencyPhone,
      runningClub: participant.runningClub,
      shirtSize: participant.shirtSize,
    };

    setSavedProfilesList((prev) => {
      const existingIdx = prev.findIndex(
        (p) =>
          (p.citizenId && p.citizenId === participant.citizenId) ||
          (p.fullName.toLowerCase() === participant.fullName.toLowerCase() && p.phone === participant.phone)
      );
      if (existingIdx >= 0) {
        const copy = [...prev];
        const existing = copy[existingIdx];
        if (existing) {
          copy[existingIdx] = { ...existing, ...newProfile, id: existing.id };
          return copy;
        }
      }
      return [newProfile, ...prev];
    });

    setSavedStatus((prev) => ({ ...prev, [participant.id]: true }));
    setToastMessage(`Đã lưu thông tin "${participant.fullName}" vào hồ sơ PlayGrid!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleSaveBuyerProfile = () => {
    if (!buyerName.trim()) return;

    const newProfile: SavedProfile = {
      id: `prof_buyer_${Date.now()}`,
      name: `${buyerName} (Người mua)`,
      relationship: "Tài khoản của tôi",
      fullName: buyerName,
      citizenId: "",
      phone: buyerPhone,
      email: buyerEmail,
      bibName: buyerName.toUpperCase(),
      emergencyPhone: "",
      runningClub: "",
      shirtSize: "L",
    };

    setSavedProfilesList((prev) => {
      const existingIdx = prev.findIndex(
        (p) => p.fullName.toLowerCase() === buyerName.toLowerCase() && p.phone === buyerPhone
      );
      if (existingIdx >= 0) {
        const copy = [...prev];
        const existing = copy[existingIdx];
        if (existing) {
          copy[existingIdx] = { ...existing, ...newProfile, id: existing.id };
          return copy;
        }
      }
      return [newProfile, ...prev];
    });

    setSavedStatus((prev) => ({ ...prev, buyer: true }));
    setToastMessage(`Đã lưu thông tin "${buyerName}" vào hồ sơ cá nhân!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const updateParticipant = (id: string, field: keyof ParticipantInfo, value: string) => {
    setParticipants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const handleCopyBuyerToFirst = () => {
    const first = participants[0];
    if (first) {
      updateParticipant(first.id, "fullName", buyerName);
      updateParticipant(first.id, "phone", buyerPhone);
      updateParticipant(first.id, "email", buyerEmail);
      updateParticipant(first.id, "bibName", buyerName.toUpperCase());
    }
  };

  // Vouchers & Discount
  const [voucherCode, setVoucherCode] = useState("");
  const [appliedVoucherCode, setAppliedVoucherCode] = useState<string>("WELCOMEPG");
  const [appliedDiscount, setAppliedDiscount] = useState(30000);
  const [voucherApplied, setVoucherApplied] = useState(true);

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    const upper = voucherCode.trim().toUpperCase();
    if (upper === "RUNNER50") {
      setAppliedVoucherCode("RUNNER50");
      setAppliedDiscount(50000);
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

  // Step 3: Payment Method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("vietqr");
  const [showVietQR, setShowVietQR] = useState(false);

  // Calculations
  const totalTickets = selectedTickets.reduce((sum, t) => sum + t.quantity, 0);
  const subTotal = selectedTickets.reduce((sum, t) => sum + t.price * t.quantity, 0);
  const platformFee = 15000;
  const netTotal = subTotal + platformFee;
  const grandTotal = Math.max(0, netTotal - (voucherApplied ? appliedDiscount : 0));
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
    { step: 1, label: isEn ? "Purchaser Info" : "Thông tin" },
    { step: 2, label: isEn ? "Athletes Info" : "Vận động viên" },
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
            <span>{isEn ? "Back to Event" : "Quay lại sự kiện"}</span>
          </button>

          <div className="flex items-center gap-3">
            {/* 1-Line Clean Countdown text */}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="size-3.5 text-brand-blue" />
              <span>{isEn ? "Ticket reservation time:" : "Thời gian giữ vé:"}</span>
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

        {/* Floating Toast Notification when Profile is Saved */}
        {toastMessage && (
          <div className="fixed bottom-24 right-4 sm:bottom-auto sm:top-6 sm:right-6 z-60 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900/95 dark:bg-card border border-emerald-500/40 text-white shadow-2xl text-xs sm:text-sm font-medium backdrop-blur-md">
              <CheckCircle2 className="size-4.5 text-emerald-400 shrink-0" />
              <span>{toastMessage}</span>
            </div>
          </div>
        )}

        {/* 3-Step Process Stepper */}
        <CheckoutStepper
          steps={stepsList}
          currentStep={currentStep}
          onStepClick={(step) => setCurrentStep(step)}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-start">
          {/* LEFT COLUMN (2/3): Step Form Content */}
          <div className="lg:col-span-8 space-y-3">
            {/* STEP 1: THÔNG TIN NGƯỜI ĐẶT VÉ & HÓA ĐƠN GTGT (VAT) */}
            {currentStep === 1 && (
              <div className="space-y-3 animate-in fade-in duration-200">
                {/* 1.1 Contact Info Form Card */}
                <div className="rounded-3xl border border-border/80 bg-card p-5 sm:p-6 space-y-4 shadow-sm relative">
                  <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-3 flex-wrap sm:flex-nowrap">
                    <h3 className="text-sm sm:text-base font-semibold text-foreground truncate">
                      {isEn ? "Ticket Purchaser Information" : "Thông tin người đặt vé"}
                    </h3>

                    {/* Quick Profile Fill Dropdown for Buyer */}
                    <div className="relative shrink-0">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveProfilePickerId(
                            activeProfilePickerId === "buyer" ? null : "buyer"
                          )
                        }
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-brand-blue/30 dark:border-brand-green/30 bg-brand-blue/5 dark:bg-brand-green/10 text-brand-blue dark:text-brand-green hover:bg-brand-blue/10 text-xs font-medium transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
                      >
                        <UserCheck className="size-3.5 shrink-0" />
                        <span>{isEn ? "Select saved profile" : "Chọn hồ sơ đã lưu"}</span>
                        <ChevronDown className="size-3 text-muted-foreground shrink-0" />
                      </button>

                      {/* Dropdown Menu */}
                      {activeProfilePickerId === "buyer" && (
                        <>
                          <div
                            className="fixed inset-0 z-20"
                            onClick={() => setActiveProfilePickerId(null)}
                          />
                          <div className="absolute right-0 top-full mt-1.5 z-30 w-72 rounded-2xl border border-border/80 bg-card p-2 shadow-xl animate-in fade-in zoom-in-95 duration-150">
                            <div className="px-2.5 py-1.5 text-[11px] font-semibold text-muted-foreground flex items-center justify-between border-b border-border/60">
                              <span>{isEn ? "Select Purchaser Profile" : "Chọn hồ sơ người đặt vé"}</span>
                              <span className="text-[10px] text-brand-blue dark:text-brand-green font-mono">PlayGrid ID</span>
                            </div>
                            <div className="py-1 space-y-1 max-h-56 overflow-y-auto">
                              {savedProfilesList.map((prof) => (
                                <button
                                  key={prof.id}
                                  type="button"
                                  onClick={() => handleApplyBuyerProfile(prof)}
                                  className="w-full p-2 rounded-xl text-left hover:bg-muted/70 transition-colors flex items-start gap-2.5 cursor-pointer group"
                                >
                                  <div className="size-7 rounded-lg bg-brand-blue/10 dark:bg-brand-green/15 text-brand-blue dark:text-brand-green flex items-center justify-center shrink-0 font-bold text-xs">
                                    {prof.fullName.charAt(0)}
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs font-semibold text-foreground group-hover:text-brand-blue dark:group-hover:text-brand-green truncate">
                                        {prof.fullName}
                                      </span>
                                    </div>
                                    <p className="text-[11px] text-muted-foreground truncate">
                                      {prof.relationship} • {prof.phone}
                                    </p>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4.5 gap-x-4 text-xs">
                    <div className="space-y-2">
                      <label className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center">
                        <span>{isEn ? "Purchaser Full Name" : "Họ và tên người mua"}</span>
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <Input
                        type="text"
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
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
                        value={buyerPhone}
                        onChange={(e) => setBuyerPhone(e.target.value)}
                        className="h-11 text-xs sm:text-sm rounded-xl px-3.5 bg-background shadow-2xs focus-visible:ring-1"
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <label className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center">
                        <span>{isEn ? "E-Ticket & BIB Delivery Email" : "Email nhận vé điện tử & Mã BIB"}</span>
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <Input
                        type="email"
                        value={buyerEmail}
                        onChange={(e) => setBuyerEmail(e.target.value)}
                        className="h-11 text-xs sm:text-sm rounded-xl px-3.5 bg-background shadow-2xs focus-visible:ring-1"
                      />
                    </div>
                  </div>

                  {/* Footer Actions for Buyer: Save to Profile */}
                  <div className="pt-3 border-t border-border/60 flex items-center justify-between flex-wrap gap-2 text-xs">
                    <label className="flex items-center gap-2 text-muted-foreground hover:text-foreground cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={savedStatus["buyer"] || false}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleSaveBuyerProfile();
                          } else {
                            setSavedStatus((prev) => ({ ...prev, buyer: false }));
                          }
                        }}
                        className="size-4 rounded-md border-border/80 text-brand-blue dark:text-brand-green focus:ring-brand-blue/20 cursor-pointer accent-brand-blue"
                      />
                      <span>{isEn ? "Save purchaser information to PlayGrid profile list" : "Lưu thông tin người mua vào hồ sơ cá nhân PlayGrid"}</span>
                    </label>

                    <button
                      type="button"
                      onClick={handleSaveBuyerProfile}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer shadow-2xs ${
                        savedStatus["buyer"]
                          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "border-border/80 bg-background hover:bg-muted/70 text-foreground"
                      }`}
                    >
                      {savedStatus["buyer"] ? (
                        <>
                          <CheckCircle2 className="size-3.5 text-emerald-500" />
                          <span>{isEn ? "Profile Saved" : "Đã lưu hồ sơ"}</span>
                        </>
                      ) : (
                        <>
                          <BookmarkPlus className="size-3.5 text-brand-blue dark:text-brand-green" />
                          <span>{isEn ? "Save Profile" : "Lưu hồ sơ này"}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* 1.2 Corporate & Personal VAT Invoice Form */}
                <VatInvoiceForm data={vatData} onChange={setVatData} />
              </div>
            )}

            {/* STEP 2: THÔNG TIN VẬN ĐỘNG VIÊN / NGƯỜI THAM GIA TỪNG CONTEST */}
            {currentStep === 2 && (
              <div className="space-y-3 animate-in fade-in duration-200">
                {/* 2.1 Participant Forms Header */}
                <div className="flex items-center justify-between px-1">
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-foreground">
                      {isEn
                        ? `Participant Information (${participants.length} athletes)`
                        : `Thông tin Vận động viên tham dự (${participants.length} người)`}
                    </h3>
                    <p className="text-xs text-muted-foreground font-normal">
                      {isEn
                        ? "Fill in accurate details to print BIB number and prepare finisher shirt"
                        : "Điền thông tin chính xác để in mã BIB thi đấu và chuẩn bị áo Finisher theo size"}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCopyBuyerToFirst}
                    className="h-8 text-[11px] rounded-xl font-medium cursor-pointer shrink-0"
                  >
                    {isEn ? "Copy from Purchaser" : "Sao chép người mua"}
                  </Button>
                </div>

                {/* 2.3 Individual Participant Card per Ticket */}
                {participants.map((p, idx) => (
                  <div
                    key={p.id}
                    className="rounded-3xl border border-border/80 bg-card p-5 sm:p-6 space-y-4 shadow-sm relative"
                  >
                    <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-3 flex-wrap sm:flex-nowrap">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="size-6 rounded-full bg-brand-blue text-white dark:bg-brand-green dark:text-slate-950 flex items-center justify-center text-xs font-bold shrink-0">
                          {idx + 1}
                        </span>
                        <span className="font-semibold text-xs sm:text-sm text-foreground truncate">
                          {participants.length > 1
                            ? isEn
                              ? `Participant ${idx + 1}`
                              : `Vận động viên ${idx + 1}`
                            : isEn
                            ? "Participant"
                            : "Vận động viên"}
                        </span>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-brand-blue/10 text-brand-blue dark:bg-brand-green/15 dark:text-brand-green whitespace-nowrap shrink-0">
                          {p.distance}
                        </span>
                      </div>

                      {/* Dropdown Điền Nhanh Từ Hồ Sơ Có Sẵn */}
                      <div className="relative shrink-0">
                        <button
                          type="button"
                          onClick={() =>
                            setActiveProfilePickerId(
                              activeProfilePickerId === p.id ? null : p.id
                            )
                          }
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-brand-blue/30 dark:border-brand-green/30 bg-brand-blue/5 dark:bg-brand-green/10 text-brand-blue dark:text-brand-green hover:bg-brand-blue/10 text-xs font-medium transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
                        >
                          <UserCheck className="size-3.5 shrink-0" />
                          <span>{isEn ? "Autofill profile" : "Điền nhanh hồ sơ"}</span>
                          <ChevronDown className="size-3 text-muted-foreground shrink-0" />
                        </button>

                        {/* Dropdown Menu */}
                        {activeProfilePickerId === p.id && (
                          <>
                            <div
                              className="fixed inset-0 z-20"
                              onClick={() => setActiveProfilePickerId(null)}
                            />
                            <div className="absolute right-0 top-full mt-1.5 z-30 w-72 rounded-2xl border border-border/80 bg-card p-2 shadow-xl animate-in fade-in zoom-in-95 duration-150">
                              <div className="px-2.5 py-1.5 text-[11px] font-semibold text-muted-foreground flex items-center justify-between border-b border-border/60">
                                <span>{isEn ? "Select Athlete Profile" : "Chọn hồ sơ VĐV"}</span>
                                <span className="text-[10px] text-brand-blue dark:text-brand-green font-mono">PlayGrid ID</span>
                              </div>
                              <div className="py-1 space-y-1 max-h-56 overflow-y-auto">
                                {savedProfilesList.map((prof) => (
                                  <button
                                    key={prof.id}
                                    type="button"
                                    onClick={() => handleApplySavedProfile(p.id, prof)}
                                    className="w-full p-2 rounded-xl text-left hover:bg-muted/70 transition-colors flex items-start gap-2.5 cursor-pointer group"
                                  >
                                    <div className="size-7 rounded-lg bg-brand-blue/10 dark:bg-brand-green/15 text-brand-blue dark:text-brand-green flex items-center justify-center shrink-0 font-bold text-xs">
                                      {prof.fullName.charAt(0)}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <div className="flex items-center justify-between">
                                        <span className="text-xs font-semibold text-foreground group-hover:text-brand-blue dark:group-hover:text-brand-green truncate">
                                          {prof.fullName}
                                        </span>
                                        <span className="text-[10px] text-muted-foreground shrink-0 font-mono">
                                          Size {prof.shirtSize}
                                        </span>
                                      </div>
                                      <p className="text-[11px] text-muted-foreground truncate">
                                        {prof.relationship} • {prof.phone}
                                      </p>
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4.5 gap-x-4 text-xs">
                      <div className="space-y-2">
                        <label className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center">
                          <span>{isEn ? "Athlete Full Name" : "Họ và tên VĐV"}</span>
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        <Input
                          type="text"
                          placeholder={isEn ? "John Doe" : "Nguyễn Văn A"}
                          value={p.fullName}
                          onChange={(e) => updateParticipant(p.id, "fullName", e.target.value)}
                          className="h-11 text-xs sm:text-sm rounded-xl px-3.5 bg-background shadow-2xs focus-visible:ring-1"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center">
                          <span>{isEn ? "National ID / Passport No." : "Số CCCD / Hộ chiếu (In BIB)"}</span>
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        <Input
                          type="text"
                          placeholder="079198001234"
                          value={p.citizenId}
                          onChange={(e) => updateParticipant(p.id, "citizenId", e.target.value)}
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
                          placeholder="0908123456"
                          value={p.phone}
                          onChange={(e) => updateParticipant(p.id, "phone", e.target.value)}
                          className="h-11 text-xs sm:text-sm rounded-xl px-3.5 bg-background shadow-2xs focus-visible:ring-1"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center">
                          <span>{isEn ? "Notification Email" : "Email nhận thông báo giải"}</span>
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        <Input
                          type="email"
                          placeholder="athlete@example.com"
                          value={p.email}
                          onChange={(e) => updateParticipant(p.id, "email", e.target.value)}
                          className="h-11 text-xs sm:text-sm rounded-xl px-3.5 bg-background shadow-2xs focus-visible:ring-1"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center">
                          <span>{isEn ? "Name printed on BIB" : "Tên in trên số đeo BIB"}</span>
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        <Input
                          type="text"
                          placeholder="VD: AN NGUYEN"
                          value={p.bibName}
                          onChange={(e) => updateParticipant(p.id, "bibName", e.target.value.toUpperCase())}
                          className="h-11 text-xs sm:text-sm rounded-xl px-3.5 bg-background shadow-2xs focus-visible:ring-1"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center">
                          <span>{isEn ? "Emergency Contact Phone" : "SĐT người thân khẩn cấp"}</span>
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        <Input
                          type="tel"
                          placeholder="0987654321"
                          value={p.emergencyPhone}
                          onChange={(e) => updateParticipant(p.id, "emergencyPhone", e.target.value)}
                          className="h-11 text-xs sm:text-sm rounded-xl px-3.5 bg-background shadow-2xs focus-visible:ring-1"
                        />
                      </div>

                      <div className="space-y-2 sm:col-span-2">
                        <label className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center">
                          <span>{isEn ? "Running Club / Organization" : "Câu lạc bộ chạy (CLB)"}</span>
                        </label>
                        <Input
                          type="text"
                          placeholder="PlayGrid Runners Club"
                          value={p.runningClub}
                          onChange={(e) => updateParticipant(p.id, "runningClub", e.target.value)}
                          className="h-11 text-xs sm:text-sm rounded-xl px-3.5 bg-background shadow-2xs focus-visible:ring-1"
                        />
                      </div>

                      {/* Shirt Size Selector */}
                      <div className="space-y-2 sm:col-span-2 pt-1">
                        <div className="flex items-center justify-between">
                          <label className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center gap-1.5">
                            <span>{isEn ? "Finisher T-Shirt Size" : "Size áo thi đấu Finisher"}</span>
                            <span className="text-muted-foreground text-xs font-normal">
                              ({isEn ? `Selected: Size ${p.shirtSize}` : `Đã chọn: Size ${p.shirtSize}`})
                            </span>
                          </label>
                          <button
                            type="button"
                            className="text-brand-blue dark:text-brand-green hover:underline font-normal text-xs cursor-pointer"
                          >
                            {isEn ? "International Size Chart" : "Bảng size chuẩn quốc tế"}
                          </button>
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                          {["S", "M", "L", "XL", "XXL"].map((sz) => (
                            <button
                              key={sz}
                              type="button"
                              onClick={() => updateParticipant(p.id, "shirtSize", sz)}
                              className={`w-9 sm:w-10 h-8 rounded-lg border text-xs font-semibold transition-all cursor-pointer shadow-2xs flex items-center justify-center ${
                                p.shirtSize === sz
                                  ? "border-brand-blue bg-brand-blue text-white dark:border-brand-green dark:bg-brand-green dark:text-slate-900 shadow-xs font-bold"
                                  : "border-border/80 bg-background hover:bg-muted text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              {sz}
                            </button>
                          ))}
                        </div>
                        {/* Footer Actions for Participant Card: Save to Profile */}
                        <div className="pt-3 border-t border-border/60 sm:col-span-2 flex items-center justify-between flex-wrap gap-2 text-xs">
                          <label className="flex items-center gap-2 text-muted-foreground hover:text-foreground cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={savedStatus[p.id] || false}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  handleSaveParticipantProfile(p);
                                } else {
                                  setSavedStatus((prev) => ({ ...prev, [p.id]: false }));
                                }
                              }}
                              className="size-4 rounded-md border-border/80 text-brand-blue dark:text-brand-green focus:ring-brand-blue/20 cursor-pointer accent-brand-blue"
                            />
                            <span>{isEn ? "Automatically save this participant to profile list" : "Tự động lưu VĐV này vào danh sách hồ sơ"}</span>
                          </label>

                          <button
                            type="button"
                            onClick={() => handleSaveParticipantProfile(p)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer shadow-2xs ${
                              savedStatus[p.id]
                                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                : "border-border/80 bg-background hover:bg-muted/70 text-foreground"
                            }`}
                          >
                            {savedStatus[p.id] ? (
                              <>
                                <CheckCircle2 className="size-3.5 text-emerald-500" />
                                <span>{isEn ? "Profile Saved" : "Đã lưu hồ sơ"}</span>
                              </>
                            ) : (
                              <>
                                <BookmarkPlus className="size-3.5 text-brand-blue dark:text-brand-green" />
                                <span>{isEn ? "Save Profile" : "Lưu hồ sơ VĐV"}</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* 2.4 Relay Team Cards per Relay Ticket (Clean Form Standard) */}
                {relayTeams.map((team, tIdx) => {
                  const activeTab = relayActiveLegTab[team.id] || "all";
                  return (
                    <div
                      key={team.id}
                      className="rounded-3xl border border-border/80 bg-card p-5 sm:p-6 space-y-5 shadow-sm relative"
                    >
                      {/* Card Header: Exact same style as individual participant */}
                      <div className="flex items-center justify-between border-b border-border/60 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="size-6 rounded-full bg-brand-blue text-white flex items-center justify-center text-xs font-bold">
                            {participants.length + tIdx + 1}
                          </span>
                          <span className="font-semibold text-xs sm:text-sm text-foreground">
                            {relayTeams.length > 1
                              ? isEn
                                ? `Relay Team ${tIdx + 1}`
                                : `Đội tiếp sức ${tIdx + 1}`
                              : isEn
                              ? "Relay Team"
                              : "Đội tiếp sức"}
                          </span>
                          <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-brand-blue/10 text-brand-blue dark:bg-brand-green/15 dark:text-brand-green">
                            {team.distance}
                          </span>
                        </div>
                      </div>

                      {/* Team General Info */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4.5 gap-x-4 text-xs">
                        <div className="space-y-2">
                          <label className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center">
                            <span>{isEn ? "Team Name" : "Tên đội thi đấu"}</span>
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <Input
                            type="text"
                            placeholder={isEn ? "e.g. PlayGrid Warriors Team" : "VD: PlayGrid Warriors Team"}
                            value={team.teamName}
                            onChange={(e) => updateRelayTeam(team.id, "teamName", e.target.value)}
                            className="h-11 text-xs sm:text-sm rounded-xl px-3.5 bg-background shadow-2xs focus-visible:ring-1"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center">
                            <span>{isEn ? "Club / Organization" : "Câu lạc bộ / Doanh nghiệp"}</span>
                          </label>
                          <Input
                            type="text"
                            placeholder={isEn ? "Saigon Triathlon Club" : "CLB Ba Môn Phối Hợp Sài Gòn"}
                            value={team.clubOrCompany}
                            onChange={(e) => updateRelayTeam(team.id, "clubOrCompany", e.target.value)}
                            className="h-11 text-xs sm:text-sm rounded-xl px-3.5 bg-background shadow-2xs focus-visible:ring-1"
                          />
                        </div>
                      </div>

                      {/* Segmented Tab Switcher (Chuyển chế độ xem theo từng chặng hoặc xem tất cả) */}
                      <div className="pt-1">
                        <div className="flex items-center gap-1.5 p-1 bg-muted/60 rounded-2xl border border-border/60 overflow-x-auto text-xs">
                          <button
                            type="button"
                            onClick={() => setRelayActiveLegTab((prev) => ({ ...prev, [team.id]: "all" }))}
                            className={`flex-1 min-w-[120px] py-2 px-3 rounded-xl font-medium transition-all cursor-pointer text-center ${
                              activeTab === "all"
                                ? "bg-background text-foreground shadow-2xs font-semibold"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {isEn ? "View all 3 legs" : "Xem tất cả 3 chặng"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setRelayActiveLegTab((prev) => ({ ...prev, [team.id]: "swim" }))}
                            className={`flex-1 min-w-[120px] py-2 px-3 rounded-xl font-medium transition-all cursor-pointer text-center ${
                              activeTab === "swim"
                                ? "bg-background text-foreground shadow-2xs font-semibold"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {isEn ? "1. Swim (1.9 KM)" : "1. Bơi (1.9 KM)"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setRelayActiveLegTab((prev) => ({ ...prev, [team.id]: "bike" }))}
                            className={`flex-1 min-w-[120px] py-2 px-3 rounded-xl font-medium transition-all cursor-pointer text-center ${
                              activeTab === "bike"
                                ? "bg-background text-foreground shadow-2xs font-semibold"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {isEn ? "2. Bike (90 KM)" : "2. Đạp xe (90 KM)"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setRelayActiveLegTab((prev) => ({ ...prev, [team.id]: "run" }))}
                            className={`flex-1 min-w-[120px] py-2 px-3 rounded-xl font-medium transition-all cursor-pointer text-center ${
                              activeTab === "run"
                                ? "bg-background text-foreground shadow-2xs font-semibold"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {isEn ? "3. Run (21.1 KM)" : "3. Chạy bộ (21.1 KM)"}
                          </button>
                        </div>
                      </div>

                      {/* 3 DISTINCT FRAMED SUB-CARDS */}
                      <div className="space-y-4 pt-1">
                        {/* 1. SWIM LEG SUB-CARD */}
                        {(activeTab === "all" || activeTab === "swim") && (
                          <div className="rounded-2xl border border-border/80 bg-muted/40 p-4 sm:p-5 space-y-4 shadow-2xs animate-in fade-in duration-150">
                            <div className="flex items-center justify-between gap-2 pb-3 border-b border-border/60 flex-wrap sm:flex-nowrap">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="size-6 rounded-full bg-brand-blue text-white dark:bg-brand-green dark:text-slate-950 flex items-center justify-center text-xs font-bold shrink-0">
                                  1
                                </span>
                                <span className="font-semibold text-xs sm:text-sm text-foreground truncate">
                                  {isEn ? "Ocean Swim Leg" : "Chặng Bơi biển"}
                                </span>
                                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-brand-blue/10 text-brand-blue dark:bg-brand-green/15 dark:text-brand-green whitespace-nowrap shrink-0">
                                  1.9 KM
                                </span>
                              </div>

                              {/* Dropdown Điền nhanh hồ sơ cho Chặng Bơi */}
                              <div className="relative shrink-0">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setActiveProfilePickerId(
                                      activeProfilePickerId === `${team.id}_swim` ? null : `${team.id}_swim`
                                    )
                                  }
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-brand-blue/30 dark:border-brand-green/30 bg-brand-blue/5 dark:bg-brand-green/10 text-brand-blue dark:text-brand-green hover:bg-brand-blue/10 text-xs font-medium transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
                                >
                                  <UserCheck className="size-3.5 shrink-0" />
                                  <span>{isEn ? "Autofill profile" : "Điền nhanh hồ sơ"}</span>
                                  <ChevronDown className="size-3 text-muted-foreground shrink-0" />
                                </button>

                                {activeProfilePickerId === `${team.id}_swim` && (
                                  <>
                                    <div
                                      className="fixed inset-0 z-20"
                                      onClick={() => setActiveProfilePickerId(null)}
                                    />
                                    <div className="absolute right-0 top-full mt-1.5 z-30 w-72 rounded-2xl border border-border/80 bg-card p-2 shadow-xl animate-in fade-in zoom-in-95 duration-150">
                                      <div className="px-2.5 py-1.5 text-[11px] font-semibold text-muted-foreground flex items-center justify-between border-b border-border/60">
                                        <span>{isEn ? "Select Swim Athlete Profile" : "Chọn hồ sơ VĐV Bơi"}</span>
                                        <span className="text-[10px] text-brand-blue dark:text-brand-green font-mono">
                                          {isEn ? "Leg 1" : "Chặng 1"}
                                        </span>
                                      </div>
                                      <div className="py-1 space-y-1 max-h-56 overflow-y-auto">
                                        {/* Tùy chọn 1: Gán người mua vé */}
                                        <button
                                          type="button"
                                          onClick={() => {
                                            handleCopyBuyerToRelaySwim(team.id);
                                            setActiveProfilePickerId(null);
                                          }}
                                          className="w-full p-2 rounded-xl text-left hover:bg-muted/70 transition-colors flex items-start gap-2.5 cursor-pointer group border-b border-border/40 pb-2 mb-1"
                                        >
                                          <div className="size-7 rounded-lg bg-brand-blue/10 dark:bg-brand-green/15 text-brand-blue dark:text-brand-green flex items-center justify-center shrink-0 font-bold text-xs">
                                            <User className="size-3.5" />
                                          </div>
                                          <div className="min-w-0 flex-1">
                                            <div className="flex items-center justify-between">
                                              <span className="text-xs font-semibold text-foreground group-hover:text-brand-blue dark:group-hover:text-brand-green truncate">
                                                {buyerName || (isEn ? "Ticket Purchaser" : "Người mua vé")}
                                              </span>
                                              <span className="text-[10px] text-brand-blue dark:text-brand-green font-semibold">
                                                {isEn ? "(Purchaser)" : "(Người mua)"}
                                              </span>
                                            </div>
                                            <p className="text-[11px] text-muted-foreground truncate">
                                              {isEn ? "Primary Account" : "Chính chủ"} • {buyerPhone}
                                            </p>
                                          </div>
                                        </button>

                                        {savedProfilesList.map((prof) => (
                                          <button
                                            key={prof.id}
                                            type="button"
                                            onClick={() => handleApplySavedProfileToRelayLeg(team.id, "swim", prof)}
                                            className="w-full p-2 rounded-xl text-left hover:bg-muted/70 transition-colors flex items-start gap-2.5 cursor-pointer group"
                                          >
                                            <div className="size-7 rounded-lg bg-brand-blue/10 dark:bg-brand-green/15 text-brand-blue dark:text-brand-green flex items-center justify-center shrink-0 font-bold text-xs">
                                              {prof.fullName.charAt(0)}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                              <div className="flex items-center justify-between">
                                                <span className="text-xs font-semibold text-foreground group-hover:text-brand-blue dark:group-hover:text-brand-green truncate">
                                                  {prof.fullName}
                                                </span>
                                                <span className="text-[10px] text-muted-foreground shrink-0 font-mono">
                                                  Size {prof.shirtSize}
                                                </span>
                                              </div>
                                              <p className="text-[11px] text-muted-foreground truncate">
                                                {prof.relationship} • {prof.phone}
                                              </p>
                                            </div>
                                          </button>
                                        ))}
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4.5 gap-x-4 text-xs">
                              <div className="space-y-2">
                                <label className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center">
                                  <span>{isEn ? "Athlete Full Name" : "Họ và tên VĐV"}</span>
                                  <span className="text-red-500 ml-1">*</span>
                                </label>
                                <Input
                                  type="text"
                                  placeholder={isEn ? "John Doe" : "Nguyễn Văn A"}
                                  value={team.legs.swim.fullName}
                                  onChange={(e) => updateRelayLeg(team.id, "swim", "fullName", e.target.value)}
                                  className="h-11 text-xs sm:text-sm rounded-xl px-3.5 bg-background shadow-2xs focus-visible:ring-1"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center">
                                  <span>{isEn ? "National ID / Passport No." : "Số CCCD / Hộ chiếu"}</span>
                                  <span className="text-red-500 ml-1">*</span>
                                </label>
                                <Input
                                  type="text"
                                  placeholder="079198001234"
                                  value={team.legs.swim.citizenId}
                                  onChange={(e) => updateRelayLeg(team.id, "swim", "citizenId", e.target.value)}
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
                                  placeholder="0908123456"
                                  value={team.legs.swim.phone}
                                  onChange={(e) => updateRelayLeg(team.id, "swim", "phone", e.target.value)}
                                  className="h-11 text-xs sm:text-sm rounded-xl px-3.5 bg-background shadow-2xs focus-visible:ring-1"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center">
                                  <span>{isEn ? "Email Address" : "Email"}</span>
                                  <span className="text-red-500 ml-1">*</span>
                                </label>
                                <Input
                                  type="email"
                                  placeholder="athlete@example.com"
                                  value={team.legs.swim.email}
                                  onChange={(e) => updateRelayLeg(team.id, "swim", "email", e.target.value)}
                                  className="h-11 text-xs sm:text-sm rounded-xl px-3.5 bg-background shadow-2xs focus-visible:ring-1"
                                />
                              </div>

                              {/* Shirt Size Selector */}
                              <div className="space-y-2 sm:col-span-2 pt-1">
                                <div className="flex items-center justify-between">
                                  <label className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center gap-1.5">
                                    <span>{isEn ? "Finisher T-Shirt Size" : "Size áo thi đấu Finisher"}</span>
                                    <span className="text-muted-foreground text-xs font-normal">
                                      ({isEn ? `Selected: Size ${team.legs.swim.shirtSize}` : `Đã chọn: Size ${team.legs.swim.shirtSize}`})
                                    </span>
                                  </label>
                                </div>
                                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                                  {["S", "M", "L", "XL", "XXL"].map((sz) => (
                                    <button
                                      key={sz}
                                      type="button"
                                      onClick={() => updateRelayLeg(team.id, "swim", "shirtSize", sz)}
                                      className={`w-9 sm:w-10 h-8 rounded-lg border text-xs font-semibold transition-all cursor-pointer shadow-2xs flex items-center justify-center ${
                                        team.legs.swim.shirtSize === sz
                                          ? "border-brand-blue bg-brand-blue text-white dark:border-brand-green dark:bg-brand-green dark:text-slate-900 shadow-xs font-bold"
                                          : "border-border/80 bg-background hover:bg-muted text-muted-foreground hover:text-foreground"
                                      }`}
                                    >
                                      {sz}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {activeTab === "swim" && (
                              <div className="pt-2 flex justify-end">
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => setRelayActiveLegTab((prev) => ({ ...prev, [team.id]: "bike" }))}
                                  className="h-9 text-xs rounded-xl font-medium cursor-pointer"
                                >
                                  {isEn ? "Continue to Leg 2 (Cycling) →" : "Tiếp tục sang Chặng 2 (Đạp xe) →"}
                                </Button>
                              </div>
                            )}
                          </div>
                        )}

                        {/* 2. BIKE LEG SUB-CARD */}
                        {(activeTab === "all" || activeTab === "bike") && (
                          <div className="rounded-2xl border border-border/80 bg-muted/40 p-4 sm:p-5 space-y-4 shadow-2xs animate-in fade-in duration-150">
                            <div className="flex items-center justify-between gap-2 pb-3 border-b border-border/60 flex-wrap sm:flex-nowrap">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="size-6 rounded-full bg-brand-blue text-white dark:bg-brand-green dark:text-slate-950 flex items-center justify-center text-xs font-bold shrink-0">
                                  2
                                </span>
                                <span className="font-semibold text-xs sm:text-sm text-foreground truncate">
                                  {isEn ? "Cycling Leg" : "Chặng Đạp xe"}
                                </span>
                                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-brand-blue/10 text-brand-blue dark:bg-brand-green/15 dark:text-brand-green whitespace-nowrap shrink-0">
                                  90 KM
                                </span>
                              </div>

                              {/* Dropdown Điền nhanh hồ sơ cho Chặng Đạp */}
                              <div className="relative shrink-0">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setActiveProfilePickerId(
                                      activeProfilePickerId === `${team.id}_bike` ? null : `${team.id}_bike`
                                    )
                                  }
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-brand-blue/30 dark:border-brand-green/30 bg-brand-blue/5 dark:bg-brand-green/10 text-brand-blue dark:text-brand-green hover:bg-brand-blue/10 text-xs font-medium transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
                                >
                                  <UserCheck className="size-3.5 shrink-0" />
                                  <span>{isEn ? "Autofill profile" : "Điền nhanh hồ sơ"}</span>
                                  <ChevronDown className="size-3 text-muted-foreground shrink-0" />
                                </button>

                                {activeProfilePickerId === `${team.id}_bike` && (
                                  <>
                                    <div
                                      className="fixed inset-0 z-20"
                                      onClick={() => setActiveProfilePickerId(null)}
                                    />
                                    <div className="absolute right-0 top-full mt-1.5 z-30 w-72 rounded-2xl border border-border/80 bg-card p-2 shadow-xl animate-in fade-in zoom-in-95 duration-150">
                                      <div className="px-2.5 py-1.5 text-[11px] font-semibold text-muted-foreground flex items-center justify-between border-b border-border/60">
                                        <span>{isEn ? "Select Bike Athlete Profile" : "Chọn hồ sơ VĐV Đạp xe"}</span>
                                        <span className="text-[10px] text-brand-blue dark:text-brand-green font-mono">
                                          {isEn ? "Leg 2" : "Chặng 2"}
                                        </span>
                                      </div>
                                      <div className="py-1 space-y-1 max-h-56 overflow-y-auto">
                                        {/* Tùy chọn 1: Sao chép từ Chặng Bơi */}
                                        {team.legs.swim.fullName && (
                                          <button
                                            type="button"
                                            onClick={() => {
                                              handleCopyLegFromPrevious(team.id, "bike", "swim");
                                              setActiveProfilePickerId(null);
                                            }}
                                            className="w-full p-2 rounded-xl text-left hover:bg-muted/70 transition-colors flex items-start gap-2.5 cursor-pointer group border-b border-border/40 pb-2 mb-1"
                                          >
                                            <div className="size-7 rounded-lg bg-brand-blue/10 dark:bg-brand-green/15 text-brand-blue dark:text-brand-green flex items-center justify-center shrink-0 font-bold text-xs">
                                              <User className="size-3.5" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                              <div className="flex items-center justify-between">
                                                <span className="text-xs font-semibold text-foreground group-hover:text-brand-blue dark:group-hover:text-brand-green truncate">
                                                  {team.legs.swim.fullName}
                                                </span>
                                                <span className="text-[10px] text-brand-blue dark:text-brand-green font-semibold">
                                                  {isEn ? "(Dual Role - Swim Leg)" : "(Kiêm chặng Bơi)"}
                                                </span>
                                              </div>
                                              <p className="text-[11px] text-muted-foreground truncate">
                                                {isEn ? "2-Person Team" : "Đội 2 người"} • {team.legs.swim.phone}
                                              </p>
                                            </div>
                                          </button>
                                        )}

                                        {savedProfilesList.map((prof) => (
                                          <button
                                            key={prof.id}
                                            type="button"
                                            onClick={() => handleApplySavedProfileToRelayLeg(team.id, "bike", prof)}
                                            className="w-full p-2 rounded-xl text-left hover:bg-muted/70 transition-colors flex items-start gap-2.5 cursor-pointer group"
                                          >
                                            <div className="size-7 rounded-lg bg-brand-blue/10 dark:bg-brand-green/15 text-brand-blue dark:text-brand-green flex items-center justify-center shrink-0 font-bold text-xs">
                                              {prof.fullName.charAt(0)}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                              <div className="flex items-center justify-between">
                                                <span className="text-xs font-semibold text-foreground group-hover:text-brand-blue dark:group-hover:text-brand-green truncate">
                                                  {prof.fullName}
                                                </span>
                                                <span className="text-[10px] text-muted-foreground shrink-0 font-mono">
                                                  Size {prof.shirtSize}
                                                </span>
                                              </div>
                                              <p className="text-[11px] text-muted-foreground truncate">
                                                {prof.relationship} • {prof.phone}
                                              </p>
                                            </div>
                                          </button>
                                        ))}
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4.5 gap-x-4 text-xs">
                              <div className="space-y-2">
                                <label className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center">
                                  <span>{isEn ? "Athlete Full Name" : "Họ và tên VĐV"}</span>
                                  <span className="text-red-500 ml-1">*</span>
                                </label>
                                <Input
                                  type="text"
                                  placeholder={isEn ? "Jane Doe" : "Nguyễn Văn B"}
                                  value={team.legs.bike.fullName}
                                  onChange={(e) => updateRelayLeg(team.id, "bike", "fullName", e.target.value)}
                                  className="h-11 text-xs sm:text-sm rounded-xl px-3.5 bg-background shadow-2xs focus-visible:ring-1"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center">
                                  <span>{isEn ? "National ID / Passport No." : "Số CCCD / Hộ chiếu"}</span>
                                  <span className="text-red-500 ml-1">*</span>
                                </label>
                                <Input
                                  type="text"
                                  placeholder="079198001234"
                                  value={team.legs.bike.citizenId}
                                  onChange={(e) => updateRelayLeg(team.id, "bike", "citizenId", e.target.value)}
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
                                  placeholder="0908123456"
                                  value={team.legs.bike.phone}
                                  onChange={(e) => updateRelayLeg(team.id, "bike", "phone", e.target.value)}
                                  className="h-11 text-xs sm:text-sm rounded-xl px-3.5 bg-background shadow-2xs focus-visible:ring-1"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center">
                                  <span>{isEn ? "Email Address" : "Email"}</span>
                                  <span className="text-red-500 ml-1">*</span>
                                </label>
                                <Input
                                  type="email"
                                  placeholder="athlete@example.com"
                                  value={team.legs.bike.email}
                                  onChange={(e) => updateRelayLeg(team.id, "bike", "email", e.target.value)}
                                  className="h-11 text-xs sm:text-sm rounded-xl px-3.5 bg-background shadow-2xs focus-visible:ring-1"
                                />
                              </div>

                              {/* Shirt Size Selector */}
                              <div className="space-y-2 sm:col-span-2 pt-1">
                                <div className="flex items-center justify-between">
                                  <label className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center gap-1.5">
                                    <span>{isEn ? "Finisher T-Shirt Size" : "Size áo thi đấu Finisher"}</span>
                                    <span className="text-muted-foreground text-xs font-normal">
                                      ({isEn ? `Selected: Size ${team.legs.bike.shirtSize}` : `Đã chọn: Size ${team.legs.bike.shirtSize}`})
                                    </span>
                                  </label>
                                </div>
                                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                                  {["S", "M", "L", "XL", "XXL"].map((sz) => (
                                    <button
                                      key={sz}
                                      type="button"
                                      onClick={() => updateRelayLeg(team.id, "bike", "shirtSize", sz)}
                                      className={`w-9 sm:w-10 h-8 rounded-lg border text-xs font-semibold transition-all cursor-pointer shadow-2xs flex items-center justify-center ${
                                        team.legs.bike.shirtSize === sz
                                          ? "border-brand-blue bg-brand-blue text-white dark:border-brand-green dark:bg-brand-green dark:text-slate-900 shadow-xs font-bold"
                                          : "border-border/80 bg-background hover:bg-muted text-muted-foreground hover:text-foreground"
                                      }`}
                                    >
                                      {sz}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {activeTab === "bike" && (
                              <div className="pt-2 flex items-center justify-between">
                                <Button
                                  type="button"
                                  variant="ghost"
                                  onClick={() => setRelayActiveLegTab((prev) => ({ ...prev, [team.id]: "swim" }))}
                                  className="h-9 text-xs rounded-xl cursor-pointer"
                                >
                                  {isEn ? "← Back to Leg 1 (Swim)" : "← Quay lại Chặng 1 (Bơi)"}
                                </Button>
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => setRelayActiveLegTab((prev) => ({ ...prev, [team.id]: "run" }))}
                                  className="h-9 text-xs rounded-xl font-medium cursor-pointer"
                                >
                                  {isEn ? "Continue to Leg 3 (Running) →" : "Tiếp tục sang Chặng 3 (Chạy bộ) →"}
                                </Button>
                              </div>
                            )}
                          </div>
                        )}

                        {/* 3. RUN LEG SUB-CARD */}
                        {(activeTab === "all" || activeTab === "run") && (
                          <div className="rounded-2xl border border-border/80 bg-muted/40 p-4 sm:p-5 space-y-4 shadow-2xs animate-in fade-in duration-150">
                            <div className="flex items-center justify-between gap-2 pb-3 border-b border-border/60 flex-wrap sm:flex-nowrap">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="size-6 rounded-full bg-brand-blue text-white dark:bg-brand-green dark:text-slate-950 flex items-center justify-center text-xs font-bold shrink-0">
                                  3
                                </span>
                                <span className="font-semibold text-xs sm:text-sm text-foreground truncate">
                                  {isEn ? "Running Leg" : "Chặng Chạy bộ"}
                                </span>
                                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-brand-blue/10 text-brand-blue dark:bg-brand-green/15 dark:text-brand-green whitespace-nowrap shrink-0">
                                  21.1 KM
                                </span>
                              </div>

                              {/* Dropdown Điền nhanh hồ sơ cho Chặng Chạy */}
                              <div className="relative shrink-0">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setActiveProfilePickerId(
                                      activeProfilePickerId === `${team.id}_run` ? null : `${team.id}_run`
                                    )
                                  }
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-brand-blue/30 dark:border-brand-green/30 bg-brand-blue/5 dark:bg-brand-green/10 text-brand-blue dark:text-brand-green hover:bg-brand-blue/10 text-xs font-medium transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
                                >
                                  <UserCheck className="size-3.5 shrink-0" />
                                  <span>{isEn ? "Autofill profile" : "Điền nhanh hồ sơ"}</span>
                                  <ChevronDown className="size-3 text-muted-foreground shrink-0" />
                                </button>

                                {activeProfilePickerId === `${team.id}_run` && (
                                  <>
                                    <div
                                      className="fixed inset-0 z-20"
                                      onClick={() => setActiveProfilePickerId(null)}
                                    />
                                    <div className="absolute right-0 top-full mt-1.5 z-30 w-72 rounded-2xl border border-border/80 bg-card p-2 shadow-xl animate-in fade-in zoom-in-95 duration-150">
                                      <div className="px-2.5 py-1.5 text-[11px] font-semibold text-muted-foreground flex items-center justify-between border-b border-border/60">
                                        <span>{isEn ? "Select Run Athlete Profile" : "Chọn hồ sơ VĐV Chạy"}</span>
                                        <span className="text-[10px] text-brand-blue dark:text-brand-green font-mono">
                                          {isEn ? "Leg 3" : "Chặng 3"}
                                        </span>
                                      </div>
                                      <div className="py-1 space-y-1 max-h-56 overflow-y-auto">
                                        {/* Tùy chọn 1: Sao chép từ Chặng Đạp */}
                                        {team.legs.bike.fullName && (
                                          <button
                                            type="button"
                                            onClick={() => {
                                              handleCopyLegFromPrevious(team.id, "run", "bike");
                                              setActiveProfilePickerId(null);
                                            }}
                                            className="w-full p-2 rounded-xl text-left hover:bg-muted/70 transition-colors flex items-start gap-2.5 cursor-pointer group border-b border-border/40 pb-2 mb-1"
                                          >
                                            <div className="size-7 rounded-lg bg-brand-blue/10 dark:bg-brand-green/15 text-brand-blue dark:text-brand-green flex items-center justify-center shrink-0 font-bold text-xs">
                                              <User className="size-3.5" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                              <div className="flex items-center justify-between">
                                                <span className="text-xs font-semibold text-foreground group-hover:text-brand-blue dark:group-hover:text-brand-green truncate">
                                                  {team.legs.bike.fullName}
                                                </span>
                                                <span className="text-[10px] text-brand-blue dark:text-brand-green font-semibold">
                                                  {isEn ? "(Dual Role - Bike Leg)" : "(Kiêm chặng Đạp)"}
                                                </span>
                                              </div>
                                              <p className="text-[11px] text-muted-foreground truncate">
                                                {isEn ? "2-Person Team" : "Đội 2 người"} • {team.legs.bike.phone}
                                              </p>
                                            </div>
                                          </button>
                                        )}

                                        {savedProfilesList.map((prof) => (
                                          <button
                                            key={prof.id}
                                            type="button"
                                            onClick={() => handleApplySavedProfileToRelayLeg(team.id, "run", prof)}
                                            className="w-full p-2 rounded-xl text-left hover:bg-muted/70 transition-colors flex items-start gap-2.5 cursor-pointer group"
                                          >
                                            <div className="size-7 rounded-lg bg-brand-blue/10 dark:bg-brand-green/15 text-brand-blue dark:text-brand-green flex items-center justify-center shrink-0 font-bold text-xs">
                                              {prof.fullName.charAt(0)}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                              <div className="flex items-center justify-between">
                                                <span className="text-xs font-semibold text-foreground group-hover:text-brand-blue dark:group-hover:text-brand-green truncate">
                                                  {prof.fullName}
                                                </span>
                                                <span className="text-[10px] text-muted-foreground shrink-0 font-mono">
                                                  Size {prof.shirtSize}
                                                </span>
                                              </div>
                                              <p className="text-[11px] text-muted-foreground truncate">
                                                {prof.relationship} • {prof.phone}
                                              </p>
                                            </div>
                                          </button>
                                        ))}
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4.5 gap-x-4 text-xs">
                              <div className="space-y-2">
                                <label className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center">
                                  <span>{isEn ? "Athlete Full Name" : "Họ và tên VĐV"}</span>
                                  <span className="text-red-500 ml-1">*</span>
                                </label>
                                <Input
                                  type="text"
                                  placeholder={isEn ? "Mike Johnson" : "Nguyễn Văn C"}
                                  value={team.legs.run.fullName}
                                  onChange={(e) => updateRelayLeg(team.id, "run", "fullName", e.target.value)}
                                  className="h-11 text-xs sm:text-sm rounded-xl px-3.5 bg-background shadow-2xs focus-visible:ring-1"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center">
                                  <span>{isEn ? "National ID / Passport No." : "Số CCCD / Hộ chiếu"}</span>
                                  <span className="text-red-500 ml-1">*</span>
                                </label>
                                <Input
                                  type="text"
                                  placeholder="079198001234"
                                  value={team.legs.run.citizenId}
                                  onChange={(e) => updateRelayLeg(team.id, "run", "citizenId", e.target.value)}
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
                                  placeholder="0908123456"
                                  value={team.legs.run.phone}
                                  onChange={(e) => updateRelayLeg(team.id, "run", "phone", e.target.value)}
                                  className="h-11 text-xs sm:text-sm rounded-xl px-3.5 bg-background shadow-2xs focus-visible:ring-1"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center">
                                  <span>{isEn ? "Email Address" : "Email"}</span>
                                  <span className="text-red-500 ml-1">*</span>
                                </label>
                                <Input
                                  type="email"
                                  placeholder="athlete@example.com"
                                  value={team.legs.run.email}
                                  onChange={(e) => updateRelayLeg(team.id, "run", "email", e.target.value)}
                                  className="h-11 text-xs sm:text-sm rounded-xl px-3.5 bg-background shadow-2xs focus-visible:ring-1"
                                />
                              </div>

                              {/* Shirt Size Selector */}
                              <div className="space-y-2 sm:col-span-2 pt-1">
                                <div className="flex items-center justify-between">
                                  <label className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center gap-1.5">
                                    <span>{isEn ? "Finisher T-Shirt Size" : "Size áo thi đấu Finisher"}</span>
                                    <span className="text-muted-foreground text-xs font-normal">
                                      ({isEn ? `Selected: Size ${team.legs.run.shirtSize}` : `Đã chọn: Size ${team.legs.run.shirtSize}`})
                                    </span>
                                  </label>
                                </div>
                                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                                  {["S", "M", "L", "XL", "XXL"].map((sz) => (
                                    <button
                                      key={sz}
                                      type="button"
                                      onClick={() => updateRelayLeg(team.id, "run", "shirtSize", sz)}
                                      className={`w-9 sm:w-10 h-8 rounded-lg border text-xs font-semibold transition-all cursor-pointer shadow-2xs flex items-center justify-center ${
                                        team.legs.run.shirtSize === sz
                                          ? "border-brand-blue bg-brand-blue text-white dark:border-brand-green dark:bg-brand-green dark:text-slate-900 shadow-xs font-bold"
                                          : "border-border/80 bg-background hover:bg-muted text-muted-foreground hover:text-foreground"
                                      }`}
                                    >
                                      {sz}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {activeTab === "run" && (
                              <div className="pt-2 flex justify-start">
                                <Button
                                  type="button"
                                  variant="ghost"
                                  onClick={() => setRelayActiveLegTab((prev) => ({ ...prev, [team.id]: "bike" }))}
                                  className="h-9 text-xs rounded-xl cursor-pointer"
                                >
                                  {isEn ? "← Back to Leg 2 (Cycling)" : "← Quay lại Chặng 2 (Đạp xe)"}
                                </Button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Team Card Footer Actions */}
                      <div className="pt-3 border-t border-border/60 flex items-center justify-between flex-wrap gap-2 text-xs">
                        <label className="flex items-center gap-2 text-muted-foreground hover:text-foreground cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={savedStatus[team.id] || false}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSavedStatus((prev) => ({ ...prev, [team.id]: true }));
                                setToastMessage(
                                  isEn
                                    ? `Saved Relay Team "${team.teamName}" to profile list!`
                                    : `Đã lưu Đội tiếp sức "${team.teamName}" vào danh sách hồ sơ!`
                                );
                                setTimeout(() => setToastMessage(null), 3000);
                              } else {
                                setSavedStatus((prev) => ({ ...prev, [team.id]: false }));
                              }
                            }}
                            className="size-4 rounded-md border-border/80 text-brand-blue dark:text-brand-green focus:ring-brand-blue/20 cursor-pointer accent-brand-blue"
                          />
                          <span>{isEn ? "Automatically save this relay team to profile list" : "Tự động lưu đội tiếp sức này vào danh sách hồ sơ"}</span>
                        </label>

                        <button
                          type="button"
                          onClick={() => {
                            setSavedStatus((prev) => ({ ...prev, [team.id]: true }));
                            setToastMessage(
                              isEn
                                ? `Saved Relay Team "${team.teamName}" to profile list!`
                                : `Đã lưu Đội tiếp sức "${team.teamName}" vào danh sách hồ sơ!`
                            );
                            setTimeout(() => setToastMessage(null), 3000);
                          }}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer shadow-2xs ${
                            savedStatus[team.id]
                              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                              : "border-border/80 bg-background hover:bg-muted/70 text-foreground"
                          }`}
                        >
                          {savedStatus[team.id] ? (
                            <>
                              <CheckCircle2 className="size-3.5 text-emerald-500" />
                              <span>{isEn ? "Team Saved" : "Đã lưu hồ sơ"}</span>
                            </>
                          ) : (
                            <>
                              <BookmarkPlus className="size-3.5 text-brand-blue dark:text-brand-green" />
                              <span>{isEn ? "Save Team Profile" : "Lưu hồ sơ đội"}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* STEP 3: PHƯƠNG THỨC THANH TOÁN */}
            {currentStep === 3 && (
              <div className="space-y-3 animate-in fade-in duration-200">
                {/* Summary of athletes */}
                <div className="rounded-3xl border border-border/80 bg-card p-5 sm:p-6 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between border-b border-border/60 pb-3">
                    <h3 className="text-sm sm:text-base font-semibold text-foreground">
                      {isEn ? "Confirm Participant & Relay Team List" : "Xác nhận danh sách Vận động viên & Đội tiếp sức"}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="text-xs text-brand-blue dark:text-brand-green font-semibold hover:underline cursor-pointer"
                    >
                      {isEn ? "Edit info" : "Sửa thông tin"}
                    </button>
                  </div>

                  <div className="divide-y divide-border/60">
                    {participants.map((p, idx) => (
                      <div key={p.id} className="py-2.5 flex items-center justify-between text-xs">
                        <div className="space-y-0.5">
                          <span className="font-semibold text-foreground">
                            {idx + 1}. {p.fullName || (isEn ? "Unnamed Athlete" : "VĐV chưa nhập tên")} ({p.distance})
                          </span>
                          <span className="text-[11px] text-muted-foreground block">
                            BIB: {p.bibName || "—"} • Size: {p.shirtSize} • {isEn ? "ID:" : "CCCD:"} {p.citizenId || "—"}
                          </span>
                        </div>
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                          {isEn ? "✓ Ready" : "✓ Đã sẵn sàng"}
                        </span>
                      </div>
                    ))}

                    {relayTeams.map((team, tIdx) => (
                      <div key={team.id} className="py-2.5 flex items-center justify-between text-xs">
                        <div className="space-y-0.5">
                          <span className="font-semibold text-foreground">
                            {participants.length + tIdx + 1}. {team.teamName || (isEn ? "Relay Team" : "Đội tiếp sức")} ({team.distance})
                          </span>
                          <span className="text-[11px] text-muted-foreground block">
                            {isEn ? "Swim" : "Bơi"}: {team.legs.swim.fullName} (Size {team.legs.swim.shirtSize}) • {isEn ? "Bike" : "Đạp"}: {team.legs.bike.fullName} (Size {team.legs.bike.shirtSize}) • {isEn ? "Run" : "Chạy"}: {team.legs.run.fullName} (Size {team.legs.run.shirtSize})
                          </span>
                        </div>
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                          {isEn ? "✓ Ready" : "✓ Đã sẵn sàng"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Method Selector Card */}
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
              {/* Event Header & Banner */}
              <div className="border-b border-border/60 pb-3 space-y-2.5">
                {/* Event Banner Image with 12:5 Aspect Ratio & Gradient Overlay */}
                <div className="relative aspect-[12/5] w-full rounded-2xl overflow-hidden shadow-xs border border-border/60 group">
                  <img
                    src="/images/events/legacy-marathon.png"
                    alt={eventInfo.eventName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent p-3 flex flex-col justify-end text-white">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-300">
                      {eventInfo.category}
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold truncate">
                      {eventInfo.eventName}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1 truncate pr-2">
                    <MapPin className="size-3 text-brand-blue shrink-0" />
                    <span className="truncate">{eventInfo.location}</span>
                  </span>
                  <span className="flex items-center gap-1 shrink-0 font-medium text-foreground">
                    <Calendar className="size-3 text-brand-blue shrink-0" />
                    <span>25/10/2026</span>
                  </span>
                </div>
              </div>

              {/* Itemized Product Items List */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  <span>{isEn ? "Tickets" : "Vé sự kiện"}</span>
                  <span>{isEn ? `${totalTickets} tickets` : `${totalTickets} vé`}</span>
                </div>

                {selectedTickets.map((t) => (
                  <div key={t.id} className="p-3 rounded-2xl bg-card border border-border/70 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-foreground truncate">{t.name}</span>
                      <span className="font-bold text-brand-blue dark:text-brand-green shrink-0">
                        {(t.price * t.quantity).toLocaleString(isEn ? "en-US" : "vi-VN")} {isEn ? "VND" : "đ"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-muted-foreground text-[11px] pt-1 border-t border-border/40">
                      <span>{isEn ? "Qty: " : "Số lượng: "}<strong className="text-foreground font-medium">{isEn ? `${t.quantity} tickets` : `${t.quantity} vé`}</strong></span>
                      <span>{t.price.toLocaleString(isEn ? "en-US" : "vi-VN")}{isEn ? " VND/ticket" : "đ/vé"}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Platform fee & Discounts & VAT */}
              <div className="space-y-2 pt-2 border-t border-border/60 text-xs sm:text-sm">
                <div className="flex items-center justify-between text-muted-foreground text-xs font-normal">
                  <span>{isEn ? "BIB & Timing Chip Issuance Fee" : "Phí phát hành BIB & Chip timing"}</span>
                  <span className="font-medium text-foreground">
                    {platformFee.toLocaleString(isEn ? "en-US" : "vi-VN")} {isEn ? "VND" : "đ"}
                  </span>
                </div>

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
                    <span className="text-xs text-muted-foreground font-normal block">{isEn ? "Total Amount" : "Tổng thanh toán"}</span>
                    <span className="text-[10px] text-brand-green font-medium">{isEn ? "Event insurance included" : "Đã bao gồm bảo hiểm giải"}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg sm:text-xl font-bold text-brand-blue dark:text-brand-green">
                      {finalTotalWithVat.toLocaleString(isEn ? "en-US" : "vi-VN")} {isEn ? "VND" : "đ"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Promo code input in sidebar */}
              <form onSubmit={handleApplyVoucher} className="flex gap-2 pt-1">
                <Input
                  type="text"
                  placeholder={isEn ? "Enter promo code..." : "Nhập mã giảm giá..."}
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
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
                    <span>{isEn ? "Continue: Enter Athlete Info" : "Tiếp tục: Điền thông tin VĐV"}</span>
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
                      <span>{isEn ? "Continue: Select Payment Method" : "Tiếp tục: Thanh toán vé"}</span>
                      <ArrowRight className="size-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setCurrentStep(1)}
                      className="w-full h-9 text-xs text-muted-foreground hover:text-foreground font-medium flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="size-3.5" />
                      <span>{isEn ? "Back to purchaser info" : "Quay lại thông tin người mua"}</span>
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
                      <span>{isEn ? "Confirm & Receive BIB Now" : "Xác nhận & Nhận BIB ngay"}</span>
                      <ChevronRight className="size-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setCurrentStep(2)}
                      className="w-full h-9 text-xs text-muted-foreground hover:text-foreground font-medium flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="size-3.5" />
                      <span>{isEn ? "Back to edit athlete info" : "Quay lại sửa thông tin VĐV"}</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Clean 1-Line Countdown Text outside the card */}
            <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground pt-0.5">
              <Clock className="size-3.5 text-brand-blue shrink-0" />
              <span>{isEn ? "Ticket reservation time:" : "Thời gian giữ vé:"}</span>
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
                  <span>{isEn ? "Enter Athletes" : "Điền VĐV"}</span>
                  <ArrowRight className="size-3.5" />
                </Button>
              )}

              {currentStep === 2 && (
                <Button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="h-9 px-4 rounded-xl font-semibold bg-gradient-primary text-white shadow-sm cursor-pointer hover:opacity-95 text-xs flex items-center gap-1.5"
                >
                  <span>{isEn ? "Select Payment" : "Thanh toán"}</span>
                  <ArrowRight className="size-3.5" />
                </Button>
              )}

              {currentStep === 3 && (
                <Button
                  type="button"
                  onClick={handleProceedPayment}
                  className="h-9 px-4 rounded-xl font-semibold bg-gradient-primary text-white shadow-sm cursor-pointer hover:opacity-95 text-xs flex items-center gap-1.5"
                >
                  <span>{isEn ? "Get BIB Now" : "Nhận BIB ngay"}</span>
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
              <span className="font-semibold text-foreground text-sm">{isEn ? "Ticket Order Breakdown" : "Chi tiết vé sự kiện"}</span>
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
              {/* Event Mini Banner with 12:5 Aspect Ratio */}
              <div className="relative aspect-[12/5] w-full rounded-2xl overflow-hidden shadow-xs border border-border/60">
                <img
                  src="/images/events/legacy-marathon.png"
                  alt={eventInfo.eventName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-2.5 flex flex-col justify-end text-white">
                  <span className="text-[9px] font-semibold uppercase text-cyan-300">
                    {eventInfo.category}
                  </span>
                  <h3 className="text-xs font-bold truncate">
                    {eventInfo.eventName}
                  </h3>
                </div>
              </div>

              {/* Itemized list */}
              <div className="space-y-2 text-xs">
                {selectedTickets.map((t) => (
                  <div key={t.id} className="p-2.5 rounded-xl bg-card border border-border/70 flex items-center justify-between">
                    <div>
                      <span className="font-medium text-foreground block">{t.name}</span>
                      <span className="text-[11px] text-muted-foreground">{isEn ? "Qty: " : "SL: "}{isEn ? `${t.quantity} tickets` : `${t.quantity} vé`} • {t.price.toLocaleString(isEn ? "en-US" : "vi-VN")}{isEn ? " VND/ticket" : "đ/vé"}</span>
                    </div>
                    <span className="font-semibold text-foreground">
                      {(t.price * t.quantity).toLocaleString(isEn ? "en-US" : "vi-VN")} {isEn ? "VND" : "đ"}
                    </span>
                  </div>
                ))}

                <div className="p-2.5 rounded-xl bg-muted/40 border border-border/60 flex items-center justify-between">
                  <span className="text-muted-foreground">{isEn ? "BIB & Timing Chip Issuance Fee" : "Phí phát hành BIB & Chip timing"}</span>
                  <span className="font-medium text-foreground">{platformFee.toLocaleString(isEn ? "en-US" : "vi-VN")} {isEn ? "VND" : "đ"}</span>
                </div>
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
        orderTitle={isEn ? "PlayGrid Marathon 2026 Ticket" : "Vé Sự Kiện PlayGrid Marathon 2026"}
      />
    </div>
  );
}
