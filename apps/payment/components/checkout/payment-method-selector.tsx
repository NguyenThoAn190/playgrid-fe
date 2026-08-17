"use client";

import React from "react";
import {
  QrCode,
  CreditCard,
  Wallet,
  Smartphone,
  CheckCircle2,
  Sparkles,
  Zap,
  Building,
} from "lucide-react";

import { useLocale, useTranslations } from "next-intl";

export type PaymentMethod = "vietqr" | "momo" | "zalopay" | "card" | "napas" | "wallet";

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
  walletBalance?: number;
  totalAmount?: number;
}

export function PaymentMethodSelector({
  selectedMethod,
  onSelect,
  walletBalance = 1500000,
  totalAmount = 0,
}: PaymentMethodSelectorProps) {
  const locale = useLocale();
  const isEn = locale === "en";

  const methods: {
    id: PaymentMethod;
    name: string;
    description: string;
    badge?: string;
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
  }[] = [
    {
      id: "vietqr",
      name: isEn ? "VietQR Pro Transfer (Recommended)" : "Chuyển khoản VietQR Pro (Khuyên dùng)",
      description: isEn
        ? "Scan QR from any mobile banking app. Auto-confirmed within 2 seconds."
        : "Quét mã QR từ mọi ứng dụng ngân hàng. Tự động xác nhận trong 2 giây.",
      badge: isEn ? "Instant Confirm" : "Xác nhận tức thì",
      icon: QrCode,
      accentColor: "border-brand-blue/60 bg-brand-blue/5",
    },
    {
      id: "momo",
      name: isEn ? "MoMo E-Wallet" : "Ví điện tử MoMo",
      description: isEn
        ? "1-tap checkout via MoMo app or scan MoMo QR code."
        : "Thanh toán 1 chạm qua ứng dụng MoMo hoặc quét mã QR MoMo.",
      icon: Smartphone,
      accentColor: "border-pink-500/60 bg-pink-500/5",
    },
    {
      id: "zalopay",
      name: isEn ? "ZaloPay E-Wallet" : "Ví điện tử ZaloPay",
      description: isEn
        ? "Pay directly inside Zalo or ZaloPay app."
        : "Thanh toán trực tiếp trong Zalo hoặc ứng dụng ZaloPay.",
      icon: Smartphone,
      accentColor: "border-cyan-500/60 bg-cyan-500/5",
    },
    {
      id: "card",
      name: isEn ? "International Cards & Apple Pay" : "Thẻ Quốc Tế & Apple Pay",
      description: isEn
        ? "Visa, Mastercard, JCB, Apple Pay & Google Pay (3D Secure protected)."
        : "Visa, Mastercard, JCB, Apple Pay & Google Pay (Bảo mật 3D Secure).",
      icon: CreditCard,
      accentColor: "border-indigo-500/60 bg-indigo-500/5",
    },
    {
      id: "napas",
      name: isEn ? "Domestic ATM Cards (Napas)" : "Thẻ ATM Nội Địa (Napas)",
      description: isEn
        ? "Supports ATM cards from over 40 banks in Vietnam via Napas."
        : "Hỗ trợ thẻ ATM của hơn 40 ngân hàng tại Việt Nam qua cổng Napas.",
      icon: Building,
      accentColor: "border-emerald-500/60 bg-emerald-500/5",
    },
    {
      id: "wallet",
      name: isEn ? "PlayGrid Sports Wallet" : "Ví Thể Thao PlayGrid Wallet",
      description: isEn
        ? `Current balance: ${walletBalance.toLocaleString("en-US")} VND ${
            walletBalance < totalAmount ? "(Insufficient balance - Please top up)" : "(Direct deduction)"
          }`
        : `Số dư hiện tại: ${walletBalance.toLocaleString("vi-VN")}đ ${
            walletBalance < totalAmount ? "(Không đủ số dư - Vui lòng nạp thêm)" : "(Trừ trực tiếp)"
          }`,
      badge: isEn ? "5% Cashback" : "Hoàn tiền 5%",
      icon: Wallet,
      accentColor: "border-amber-500/60 bg-amber-500/5",
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs sm:text-sm font-semibold text-foreground">
          {isEn ? "Payment Method" : "Phương thức thanh toán"}
        </label>
        <span className="text-[11px] text-muted-foreground font-normal flex items-center gap-1">
          <Zap className="size-3 text-brand-green" /> {isEn ? "Zero transaction fee" : "Miễn phí giao dịch"}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {methods.map((method) => {
          const Icon = method.icon;
          const isSelected = selectedMethod === method.id;
          const isWalletDisabled = method.id === "wallet" && walletBalance < totalAmount && totalAmount > 0;

          return (
            <button
              key={method.id}
              type="button"
              disabled={isWalletDisabled}
              onClick={() => onSelect(method.id)}
              className={`w-full flex items-start justify-between p-3 sm:p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                isSelected
                  ? `border-brand-blue dark:border-brand-green bg-brand-blue/5 dark:bg-brand-green/10 shadow-xs ring-1 ring-brand-blue/20 dark:ring-brand-green/20`
                  : isWalletDisabled
                  ? "opacity-50 cursor-not-allowed border-border/50 bg-muted/20"
                  : "border-border/80 bg-card hover:border-border hover:bg-muted/30"
              }`}
            >
              <div className="flex items-start gap-3 min-w-0 pr-2">
                <div
                  className={`size-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    isSelected
                      ? "bg-brand-blue text-white dark:bg-brand-green dark:text-background"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="size-5" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs sm:text-sm font-semibold text-foreground truncate">
                      {method.name}
                    </span>
                    {method.badge && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-md bg-brand-green/15 text-brand-green border border-brand-green/30">
                        {method.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] sm:text-xs text-muted-foreground font-normal leading-relaxed">
                    {method.description}
                  </p>
                </div>
              </div>

              <div className="shrink-0 mt-1">
                <div
                  className={`size-5 rounded-full border flex items-center justify-center transition-colors ${
                    isSelected
                      ? "border-brand-blue bg-brand-blue text-white dark:border-brand-green dark:bg-brand-green dark:text-background"
                      : "border-muted-foreground/40 bg-transparent"
                  }`}
                >
                  {isSelected && <CheckCircle2 className="size-3.5 stroke-[3]" />}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
