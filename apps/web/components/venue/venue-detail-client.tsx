"use client";

import React, { useState } from "react";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { VenueDetailData } from "@/lib/venue-data";
import { VenueHeader } from "./venue-header";
import { VenueGallery } from "./venue-gallery";
import { VenueBookingSection, SelectedBookingSlot } from "./venue-booking-section";
import { VenueMatchmakingSection } from "./venue-matchmaking-section";
import { VenueBookingSidebar, SelectedAddonItem } from "./venue-booking-sidebar";
import { VenueAbout } from "./venue-about";
import { VenueAmenities } from "./venue-amenities";
import { VenueRulesPolicies } from "./venue-rules-policies";
import { VenueMapLocation } from "./venue-map-location";
import { VenueReviews } from "./venue-reviews";
import { VenueRelatedCourts } from "./venue-related-courts";
import { VenueCheckoutModal } from "./venue-checkout-modal";

interface VenueDetailClientProps {
  venue: VenueDetailData;
}

export function VenueDetailClient({ venue }: VenueDetailClientProps) {
  // Today's date string YYYY-MM-DD
  const getTodayString = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  const [selectedDate, setSelectedDate] = useState<string>(getTodayString());
  const [selectedSlots, setSelectedSlots] = useState<SelectedBookingSlot[]>([]);
  const [bookingType, setBookingType] = useState<"single" | "recurring" | "matchmaking">("single");
  const [selectedAddons, setSelectedAddons] = useState<SelectedAddonItem[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  // Toggle slot selection (multi-slot support)
  const handleToggleSlot = (slot: SelectedBookingSlot) => {
    setSelectedSlots((prev) => {
      const exists = prev.some(
        (s) => s.slotId === slot.slotId && s.courtId === slot.courtId && s.date === slot.date
      );
      if (exists) {
        return prev.filter(
          (s) => !(s.slotId === slot.slotId && s.courtId === slot.courtId && s.date === slot.date)
        );
      } else {
        return [...prev, slot];
      }
    });
  };

  const handleRemoveSlot = (slot: SelectedBookingSlot) => {
    setSelectedSlots((prev) =>
      prev.filter(
        (s) => !(s.slotId === slot.slotId && s.courtId === slot.courtId && s.date === slot.date)
      )
    );
  };

  const handleChangeAddonQuantity = (addonId: string, delta: number) => {
    setSelectedAddons((prev) => {
      const existing = prev.find((a) => a.addonId === addonId);
      if (!existing) {
        if (delta > 0) return [...prev, { addonId, quantity: delta }];
        return prev;
      }
      const newQty = existing.quantity + delta;
      if (newQty <= 0) {
        return prev.filter((a) => a.addonId !== addonId);
      }
      return prev.map((a) => (a.addonId === addonId ? { ...a, quantity: newQty } : a));
    });
  };

  const totalSlotPrice = selectedSlots.reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="min-h-screen bg-background pb-32 lg:pb-20 pt-3">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 space-y-3">
        {/* 1. Header (Title, Badges, Metrics, Actions) */}
        <VenueHeader venue={venue} />

        {/* 2. Media Showcase Gallery */}
        <VenueGallery images={venue.images} venueName={venue.name} />

        {/* 3. Main 2-Column Booking Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
          {/* Left Column: Interactive Booking Matrix, Description, Amenities, Rules, Reviews (Span 8) */}
          <div className="lg:col-span-8 space-y-3">
            {/* Interactive Booking Matrix */}
            <div id="booking-matrix">
              <VenueBookingSection
                venue={venue}
                selectedSlots={selectedSlots}
                onToggleSlot={handleToggleSlot}
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
                bookingType={bookingType}
                onSelectBookingType={setBookingType}
              />
            </div>

            {/* Dedicated Matchmaking Section (Sàn ghép kèo vãng lai) */}
            <div id="matchmaking-section">
              <VenueMatchmakingSection
                venue={venue}
                onOpenCreateMatch={() => {
                  setBookingType("single");
                  const elem = document.getElementById("booking-matrix");
                  if (elem) elem.scrollIntoView({ behavior: "smooth" });
                }}
              />
            </div>

            {/* Venue Description Overview & Detailed Rich Content (SEO optimized) */}
            <VenueAbout venue={venue} />

            {/* Amenities Grid */}
            <VenueAmenities venue={venue} />

            {/* Rules & Cancellation Policies */}
            <VenueRulesPolicies venue={venue} />

            {/* Location & Map Section */}
            <VenueMapLocation venue={venue} />

            {/* Community Reviews & Ratings */}
            <VenueReviews venue={venue} />
          </div>

          {/* Right Column: Sticky Summary & Fast Booking Sidebar (Span 4) */}
          <div className="lg:col-span-4">
            <VenueBookingSidebar
              venue={venue}
              selectedSlots={selectedSlots}
              onRemoveSlot={handleRemoveSlot}
              selectedDate={selectedDate}
              bookingType={bookingType}
              selectedAddons={selectedAddons}
              onChangeAddonQuantity={handleChangeAddonQuantity}
              onProceedCheckout={() => setIsCheckoutOpen(true)}
            />
          </div>
        </div>

        {/* 4. Related / Nearby Courts */}
        <VenueRelatedCourts />
      </div>

      {/* 5. Sticky Floating Mobile Booking Bar (positioned right above mobile bottom navbar bottom-16) */}
      {selectedSlots.length > 0 && (
        <div className="fixed bottom-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border/80 px-4 py-2.5 shadow-2xl lg:hidden flex items-center justify-between animate-in slide-in-from-bottom duration-300">
          <div className="flex flex-col min-w-0 pr-2">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <ShoppingBag className="size-3.5 text-brand-blue dark:text-brand-green shrink-0" />
              <span className="font-bold text-foreground truncate">
                Đã chọn {selectedSlots.length} khung giờ
              </span>
            </div>
            <div className="text-sm font-extrabold text-foreground tracking-tight">
              {totalSlotPrice.toLocaleString("vi-VN")}đ
            </div>
          </div>

          <Button
            type="button"
            onClick={() => setIsCheckoutOpen(true)}
            className="h-10 px-4 rounded-xl bg-gradient-primary text-white font-extrabold text-xs shadow-md border-0 outline-none focus:outline-none ring-0 shrink-0 flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
          >
            <span>Đặt sân</span>
            <ArrowRight className="size-4" />
          </Button>
        </div>
      )}

      {/* 6. Checkout Confirmation Modal */}
      <VenueCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        venue={venue}
        selectedSlots={selectedSlots}
        selectedDate={selectedDate}
        selectedAddons={selectedAddons}
        bookingType={bookingType}
      />
    </div>
  );
}
