"use client";

import React from "react";
import {
  Shield,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  ExternalLink,
  Crown,
  Calendar,
  Sparkles,
  Car,
} from "lucide-react";
import { ClubDetailData } from "@/lib/clubs-data";
import { Button } from "@/components/ui/button";

export interface ClubMembershipSidebarProps {
  club: ClubDetailData;
  onOpenJoinModal: () => void;
}

export function ClubMembershipSidebar({
  club,
  onOpenJoinModal,
}: ClubMembershipSidebarProps) {
  const plans = club.membershipPlans || [];

  return (
    <div className="space-y-4">
      {/* 1. Membership Plans Card */}
      <div className="bg-card border border-border/80 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm sm:text-base text-foreground flex items-center gap-2">
            <Crown className="w-4 h-4 text-amber-500" />
            <span>Gói Hội Viên CLB</span>
          </h3>
          <span className="text-xs text-primary font-semibold">Tự do & Tiết kiệm</span>
        </div>

        {plans.length > 0 ? (
          <div className="space-y-2.5">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`p-3.5 rounded-xl border transition-all space-y-2 ${
                  plan.highlighted
                    ? "bg-primary/5 border-primary shadow-xs"
                    : "bg-muted/30 border-border/70 hover:border-border"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs sm:text-sm text-foreground">
                    {plan.name}
                  </span>
                  {plan.badge && (
                    <span className="px-2 py-0.5 rounded-md bg-gradient-primary text-white text-[10px] font-bold">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-base sm:text-lg font-bold text-primary">
                    {plan.price}
                  </span>
                  <span className="text-xs text-muted-foreground font-normal">
                    {plan.period}
                  </span>
                </div>

                <div className="space-y-1 pt-1 border-t border-border/40">
                  {plan.benefits.map((b, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-1.5 text-xs text-foreground/80 font-medium"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : null}

        <Button
          type="button"
          onClick={onOpenJoinModal}
          className="w-full h-10 rounded-xl bg-gradient-primary text-white font-bold text-xs sm:text-sm shadow-2xs hover:opacity-95 active:scale-95 transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4 mr-1.5" />
          <span>Đăng Ký Gia Nhập Ngay</span>
        </Button>
      </div>

      {/* 2. Venue Location & Geo Info Card */}
      {club.venueDetails && (
        <div className="bg-card border border-border/80 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3.5">
          <h3 className="font-bold text-xs sm:text-sm text-foreground flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-primary shrink-0" />
            <span>Địa Điểm Sinh Hoạt Chính</span>
          </h3>

          <div className="space-y-2 text-xs sm:text-sm">
            <div className="font-bold text-foreground">
              {club.venueDetails.name}
            </div>
            <div className="text-muted-foreground flex items-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
              <span>{club.venueDetails.address}</span>
            </div>
            {club.venueDetails.parkingInfo && (
              <div className="text-muted-foreground text-xs font-normal pt-1 flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                <span>{club.venueDetails.parkingInfo}</span>
              </div>
            )}
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => {
              const query = encodeURIComponent(
                `${club.venueDetails?.name} ${club.venueDetails?.address}`
              );
              window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, "_blank");
            }}
            className="w-full h-9 rounded-xl font-semibold text-xs cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Xem đường đi trên Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Button>
        </div>
      )}

      {/* 3. Leadership & Official Group Link */}
      {club.leadership && (
        <div className="bg-card border border-border/80 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3">
          <h3 className="font-bold text-xs sm:text-sm text-foreground flex items-center gap-1.5">
            <Phone className="w-4 h-4 text-primary shrink-0" />
            <span>Ban Quản Trị & Kênh Liên Hệ</span>
          </h3>

          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="text-foreground font-semibold">
              {club.leadership.managerName}
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-primary" />
              <span>{club.leadership.phone}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-primary" />
              <span>{club.leadership.email}</span>
            </div>
          </div>

          <div className="pt-2 space-y-2">
            {club.leadership.zaloGroup && (
              <Button
                type="button"
                variant="outline"
                onClick={() => window.open(club.leadership?.zaloGroup, "_blank")}
                className="w-full h-9 rounded-xl font-semibold text-xs cursor-pointer flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 text-primary" />
                <span>Tham gia Nhóm Zalo CLB</span>
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
