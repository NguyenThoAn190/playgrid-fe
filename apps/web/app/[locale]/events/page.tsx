"use client";

import React, { useState } from "react";
import { EventCard } from "@/components/events/event-card";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EVENTS_DATA } from "@/lib/events-data";

const CATEGORIES = [
  "Tất cả",
  "Marathon",
  "Trail Running",
  "Triathlon / Bơi biển",
  "Giải cầu lông",
  "Pickleball",
  "Concert / Âm nhạc",
];

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  const filteredEvents = EVENTS_DATA.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Tất cả" || event.category?.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full bg-background min-h-screen pb-16">
      {/* Page Header */}
      <div className="bg-muted/30 border-b border-border/40 py-8 sm:py-12">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 space-y-4">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Giải đấu & Sự kiện
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
            Khám phá và đăng ký tham gia các giải chạy Marathon, giải đấu cầu lông, pickleball và sự kiện âm nhạc nổi bật.
          </p>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm tên giải đấu, địa điểm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 rounded-xl bg-background border-border/80 text-sm"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full scrollbar-none py-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[#002BCC] text-white shadow-xs"
                      : "bg-background border border-border/80 text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-8">
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 min-[500px]:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 space-y-3">
            <p className="text-base text-muted-foreground font-medium">
              Không tìm thấy giải đấu hoặc sự kiện nào phù hợp.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("Tất cả");
              }}
              className="rounded-xl"
            >
              Đặt lại bộ lọc
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
