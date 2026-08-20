"use client";

import React from "react";
import {
  FileText,
  Calendar,
  Award,
  Users,
  Trophy,
  Star,
} from "lucide-react";

export type ClubTabKey =
  | "overview"
  | "schedule"
  | "coaches"
  | "members"
  | "achievements"
  | "reviews";

export interface ClubTabsNavProps {
  activeTab: ClubTabKey;
  onTabChange: (tab: ClubTabKey) => void;
  reviewCount?: number;
  membersCount?: number;
}

const TABS: { id: ClubTabKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "overview", label: "Tổng quan", icon: FileText },
  { id: "schedule", label: "Lịch sinh hoạt", icon: Calendar },
  { id: "coaches", label: "Huấn luyện viên", icon: Award },
  { id: "members", label: "Thành viên & BXH", icon: Users },
  { id: "achievements", label: "Thành tích", icon: Trophy },
  { id: "reviews", label: "Đánh giá", icon: Star },
];

export function ClubTabsNav({
  activeTab,
  onTabChange,
  reviewCount,
}: ClubTabsNavProps) {
  return (
    <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-border/80 -mx-4 px-4 sm:mx-0 sm:px-0">
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none py-2.5">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer select-none ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-2xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-primary-foreground" : "text-muted-foreground"}`} />
              <span>{tab.label}</span>
              {tab.id === "reviews" && reviewCount !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {reviewCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
