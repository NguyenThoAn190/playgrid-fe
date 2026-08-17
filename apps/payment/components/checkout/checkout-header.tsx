"use client";

import React, { useState } from "react";
import { Copy, Check, ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { LanguageSwitcher } from "@/components/navbar/language-switcher";

interface CheckoutHeaderProps {
  orderId: string;
  title: string;
  subtitle?: string;
  initialMinutes?: number;
  showTimer?: boolean;
  onExpire?: () => void;
  backUrl?: string;
}

export function CheckoutHeader({
  orderId,
  title,
  subtitle,
  initialMinutes = 10,
  showTimer = false,
  onExpire,
  backUrl = "/",
}: CheckoutHeaderProps) {
  const locale = useLocale();
  const isEn = locale === "en";
  const [copied, setCopied] = useState(false);

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-card border-b border-border/80 shadow-2xs py-3.5">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        {/* Title & Order ID */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link
              href={backUrl}
              className="p-1 -ml-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
              title={isEn ? "Back" : "Quay lại"}
            >
              <ArrowLeft className="size-4" />
            </Link>
            <h1 className="text-base sm:text-lg font-semibold tracking-tight text-foreground">{title}</h1>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              {isEn ? "Pending Payment" : "Chờ thanh toán"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground pl-5">
            <span>{isEn ? "Order ID:" : "Mã đơn hàng:"}</span>
            <button
              type="button"
              onClick={handleCopyOrderId}
              className="inline-flex items-center gap-1 font-mono font-medium text-foreground bg-muted/60 hover:bg-muted px-2 py-0.5 rounded-md transition-colors cursor-pointer border border-border/60"
            >
              <span>{orderId}</span>
              {copied ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3 text-muted-foreground" />}
            </button>
            {subtitle && <span className="hidden sm:inline text-muted-foreground/60">• {subtitle}</span>}
          </div>
        </div>

        {/* Right side Language Switcher */}
        <div className="flex items-center justify-end">
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}
