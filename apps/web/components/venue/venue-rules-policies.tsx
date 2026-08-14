"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { ShieldAlert, RefreshCw, CheckCircle2 } from "lucide-react";
import { Card } from "@workspace/ui/components/card";
import { VenueDetailData } from "@/lib/venue-data";

interface VenueRulesPoliciesProps {
  venue: VenueDetailData;
}

const RULES_EN_MAP: Record<string, string> = {
  "Bắt buộc mang giày đế chuyên dụng cầu lông (không dùng giày chạy bộ, đế đen gây trầy thảm).":
    "Non-marking indoor badminton shoes are strictly required (no running shoes or black soles on court).",
  "Không mang đồ ăn và nước ngọt có đường vào khu vực mặt thảm thi đấu.":
    "No food or sugary drinks allowed on the court mats.",
  "Đến sân trước 10 phút để khởi động và nhận sân đúng khung giờ đã đặt.":
    "Please arrive 10 minutes prior to warm up and check in for your reserved slot.",
  "Giữ gìn vệ sinh chung, bỏ rác vào thùng và tắt đèn/quạt khi ra về nếu là nhóm cuối.":
    "Maintain shared cleanliness, dispose of trash properly, and power down fans/lights if you are the last group.",
};

const POLICY_EN_MAP: Record<string, string> = {
  "Hủy sân trước 06 tiếng: Hoàn tiền 100% về ví PlayGrid hoặc dời sang ngày khác miễn phí.":
    "Cancel 6+ hours before: 100% refund to PlayGrid wallet or free reschedule.",
  "Hủy sân từ 02 - 06 tiếng: Hoàn 50% giá trị tiền đặt sân.":
    "Cancel 2-6 hours before: 50% refund of booking value.",
  "Hủy sân dưới 02 tiếng hoặc vắng mặt: Không hỗ trợ hoàn tiền do sân đã được giữ chỗ riêng.":
    "Cancel under 2 hours or no-show: Non-refundable as court slot was reserved.",
  "Trường hợp bất khả kháng (mưa bão, sự cố mất điện): Hoàn 100% tiền ngay lập tức.":
    "Force Majeure (severe weather, power outage): 100% instant refund.",
};

export function VenueRulesPolicies({ venue }: VenueRulesPoliciesProps) {
  const tRules = useTranslations("venue.rules");
  const locale = useLocale();
  const isEn = locale === "en";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {/* Venue Rules Card */}
      <Card className="rounded-3xl border border-border/80 bg-card p-4 sm:p-5 space-y-3 shadow-sm">
        <div>
          <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
            <ShieldAlert className="size-5 text-amber-500" />
            {tRules("rules_title")}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {tRules("rules_subtitle")}
          </p>
        </div>

        <ul className="space-y-2.5 pt-1">
          {venue.rules.map((rule, idx) => {
            const displayRule = isEn && RULES_EN_MAP[rule] ? RULES_EN_MAP[rule] : rule;

            return (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-foreground/90 leading-relaxed">
                <span className="size-5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{displayRule}</span>
              </li>
            );
          })}
        </ul>
      </Card>

      {/* Cancellation & Refund Policy Card */}
      <Card className="rounded-3xl border border-border/80 bg-card p-4 sm:p-5 space-y-3 shadow-sm">
        <div>
          <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
            <RefreshCw className="size-5 text-emerald-500" />
            {tRules("cancellation_title")}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {isEn
              ? "Free cancellation up to 6 hours before slot start time on PlayGrid"
              : venue.cancellationPolicy.description}
          </p>
        </div>

        <ul className="space-y-2.5 pt-1">
          {venue.cancellationPolicy.points.map((point, idx) => {
            const displayPoint = isEn && POLICY_EN_MAP[point] ? POLICY_EN_MAP[point] : point;

            return (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-foreground/90 leading-relaxed">
                <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{displayPoint}</span>
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
}
