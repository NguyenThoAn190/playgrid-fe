"use client";

import React from "react";
import { ShieldAlert, RefreshCw, CheckCircle2, AlertTriangle } from "lucide-react";
import { Card } from "@workspace/ui/components/card";
import { VenueDetailData } from "@/lib/venue-data";

interface VenueRulesPoliciesProps {
  venue: VenueDetailData;
}

export function VenueRulesPolicies({ venue }: VenueRulesPoliciesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {/* Venue Rules Card */}
      <Card className="rounded-3xl border border-border/80 bg-card p-4 sm:p-5 space-y-3 shadow-sm">
        <div>
          <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
            <ShieldAlert className="size-5 text-amber-500" />
            Quy định & Lưu ý khi vào sân
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Người chơi vui lòng tuân thủ quy định để giữ gìn mặt sân chung
          </p>
        </div>

        <ul className="space-y-2.5 pt-1">
          {venue.rules.map((rule, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs text-foreground/90 leading-relaxed">
              <span className="size-5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Cancellation & Refund Policy Card */}
      <Card className="rounded-3xl border border-border/80 bg-card p-4 sm:p-5 space-y-3 shadow-sm">
        <div>
          <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
            <RefreshCw className="size-5 text-emerald-500" />
            Chính sách hoàn hủy linh hoạt
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {venue.cancellationPolicy.description}
          </p>
        </div>

        <ul className="space-y-2.5 pt-1">
          {venue.cancellationPolicy.points.map((point, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs text-foreground/90 leading-relaxed">
              <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
