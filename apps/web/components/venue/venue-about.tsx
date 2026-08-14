"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Info, ChevronDown, CheckCircle2, MapPin, Sparkles } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { VenueDetailData } from "@/lib/venue-data";

interface VenueAboutProps {
  venue: VenueDetailData;
  contentHtml?: string;
}

export function VenueAbout({ venue, contentHtml }: VenueAboutProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const tAbout = useTranslations("venue.about");
  const locale = useLocale();
  const isEn = locale === "en";

  return (
    <article
      id="about-venue"
      aria-labelledby="about-venue-title"
      className="rounded-3xl border border-border/80 bg-card p-4 sm:p-5 space-y-3.5 shadow-sm overflow-hidden"
    >
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border/60 pb-3">
        <h2
          id="about-venue-title"
          className="text-base sm:text-lg font-bold tracking-tight text-foreground flex items-center gap-2"
        >
          <Info className="size-5 text-brand-blue dark:text-brand-green shrink-0" />
          <span>{tAbout("title", { name: venue.shortName })}</span>
        </h2>
        <span className="text-[11px] font-semibold text-muted-foreground hidden sm:inline-flex items-center gap-1">
          <CheckCircle2 className="size-3.5 text-emerald-500" />
          {tAbout("verified_badge")}
        </span>
      </header>

      {/* Main Content Area (SEO Bots can always crawl full text and images in DOM) */}
      <div className="relative">
        <div
          id="venue-about-content"
          className={`space-y-4 text-xs sm:text-sm text-muted-foreground leading-relaxed transition-[max-height] duration-500 ease-in-out overflow-hidden ${
            isExpanded ? "max-h-[3000px]" : "max-h-[140px] sm:max-h-[160px]"
          }`}
        >
          {/* If custom HTML content provided, render with prose typography */}
          {contentHtml || venue.contentHtml ? (
            <div
              className="prose dark:prose-invert prose-sm max-w-none text-foreground/90 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: contentHtml || venue.contentHtml || "" }}
            />
          ) : isEn ? (
            <>
              {/* Lead Paragraph */}
              <p className="text-foreground/90 font-medium text-xs sm:text-sm leading-relaxed">
                {venue.description}
              </p>

              {/* Highlight Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-2xl bg-muted/30 border border-border/60 space-y-1.5">
                  <h3 className="font-bold text-xs sm:text-sm text-foreground flex items-center gap-1.5">
                    <Sparkles className="size-4 text-amber-500 shrink-0" />
                    BWF Standard Tournament Mats
                  </h3>
                  <p className="text-xs text-muted-foreground leading-normal">
                    100% of courts are fitted with 5.0mm professional shock-absorbing sports flooring, minimizing knee impact and offering top-tier traction.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-muted/30 border border-border/60 space-y-1.5">
                  <h3 className="font-bold text-xs sm:text-sm text-foreground flex items-center gap-1.5">
                    <Sparkles className="size-4 text-brand-blue shrink-0" />
                    Anti-Glare LED Lighting System
                  </h3>
                  <p className="text-xs text-muted-foreground leading-normal">
                    Even 500-lux lateral LED lighting prevents glare during overhead smashes and defensive clears.
                  </p>
                </div>
              </div>

              {/* Detailed Content Sections */}
              <div className="space-y-3 pt-2">
                <h3 className="text-sm sm:text-base font-bold text-foreground">
                  Spacious 11m High Ceiling & Premium Facilities
                </h3>
                <p>
                  Features an 11-meter ceiling with natural airflow cross-ventilation and heavy-duty industrial circulation fans. Over 1.5m spacing between courts ensures player safety and freedom of movement during intense rallies.
                </p>
              </div>

              {/* Visual Showcase Gallery Images within Content */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border/60 group">
                  <Image
                    src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&auto=format&fit=crop&q=80"
                    alt={`Tournament standard flooring at ${venue.name}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2">
                    <span className="text-[10px] sm:text-xs font-semibold text-white truncate">
                      BWF Standard Surface
                    </span>
                  </div>
                </div>

                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border/60 group">
                  <Image
                    src="https://images.unsplash.com/photo-1613918108466-292b78a8ef95?w=600&auto=format&fit=crop&q=80"
                    alt={`Anti-glare LED illumination at ${venue.name}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2">
                    <span className="text-[10px] sm:text-xs font-semibold text-white truncate">
                      500 Lux Anti-glare LED
                    </span>
                  </div>
                </div>

                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border/60 group col-span-2 sm:col-span-1">
                  <Image
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80"
                    alt={`Grandstand and canteen at ${venue.name}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2">
                    <span className="text-[10px] sm:text-xs font-semibold text-white truncate">
                      Grandstand & Refreshment
                    </span>
                  </div>
                </div>
              </div>

              {/* Location and Accessibility */}
              <div className="space-y-2 pt-1">
                <h3 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-1.5">
                  <MapPin className="size-4 text-rose-500 shrink-0" />
                  Prime Location & Spacious Parking
                </h3>
                <p>
                  Conveniently situated at <strong>{venue.address}</strong> with easy access from major roads. Includes covered motorcycle and car parking with 24/7 security, free for PlayGrid online bookings.
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Lead Paragraph */}
              <p className="text-foreground/90 font-medium text-xs sm:text-sm leading-relaxed">
                {venue.description}
              </p>

              {/* Highlight Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-2xl bg-muted/30 border border-border/60 space-y-1.5">
                  <h3 className="font-bold text-xs sm:text-sm text-foreground flex items-center gap-1.5">
                    <Sparkles className="size-4 text-amber-500 shrink-0" />
                    Thảm Yonex Tiêu Chuẩn BWF
                  </h3>
                  <p className="text-xs text-muted-foreground leading-normal">
                    100% sân được trang bị mặt thảm chuyên dụng 5.0mm có độ ma sát và đàn hồi cực tốt, giúp bảo vệ khớp gối và tăng độ bám khi di chuyển tốc độ cao.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-muted/30 border border-border/60 space-y-1.5">
                  <h3 className="font-bold text-xs sm:text-sm text-foreground flex items-center gap-1.5">
                    <Sparkles className="size-4 text-brand-blue shrink-0" />
                    Đèn LED Chống Lóa Hiện Đại
                  </h3>
                  <p className="text-xs text-muted-foreground leading-normal">
                    Hệ thống đèn LED bố trí hai bên hông sân với độ sáng 500 Lux đồng đều, không gây chói mắt khi ngửa mặt đập cầu hoặc phòng thủ góc cao.
                  </p>
                </div>
              </div>

              {/* Detailed Content Sections */}
              <div className="space-y-3 pt-2">
                <h3 className="text-sm sm:text-base font-bold text-foreground">
                  Không gian thi đấu thoáng mát & cơ sở vật chất đồng bộ
                </h3>
                <p>
                  Cụm sân sở hữu thiết kế trần cao 11m thông thoáng, được trang bị hệ thống quạt công nghiệp đối lưu gió tự nhiên, khắc phục triệt để tình trạng bí bách và oi bức trong các khung giờ cao điểm mùa hè. Khoảng cách giữa các sân rộng rãi trên 1.5m giúp các tay vợt thoải mái tung những pha cứu cầu biên mà không lo va chạm.
                </p>
              </div>

              {/* Visual Showcase Gallery Images within Content */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border/60 group">
                  <Image
                    src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&auto=format&fit=crop&q=80"
                    alt={`Thảm sân cầu lông tiêu chuẩn tại ${venue.name}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2">
                    <span className="text-[10px] sm:text-xs font-semibold text-white truncate">
                      Mặt thảm Yonex BWF
                    </span>
                  </div>
                </div>

                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border/60 group">
                  <Image
                    src="https://images.unsplash.com/photo-1613918108466-292b78a8ef95?w=600&auto=format&fit=crop&q=80"
                    alt={`Hệ thống chiếu sáng LED chống lóa tại ${venue.name}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2">
                    <span className="text-[10px] sm:text-xs font-semibold text-white truncate">
                      Đèn LED chống lóa 500 Lux
                    </span>
                  </div>
                </div>

                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border/60 group col-span-2 sm:col-span-1">
                  <Image
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80"
                    alt={`Khu vực khán đài và dịch vụ giải khát tại ${venue.name}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2">
                    <span className="text-[10px] sm:text-xs font-semibold text-white truncate">
                      Khán đài & Căng-tin
                    </span>
                  </div>
                </div>
              </div>

              {/* Location and Accessibility */}
              <div className="space-y-2 pt-1">
                <h3 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-1.5">
                  <MapPin className="size-4 text-rose-500 shrink-0" />
                  Vị trí trung tâm & Bãi giữ xe rộng rãi
                </h3>
                <p>
                  Tọa lạc tại địa chỉ <strong>{venue.address}</strong>, sân nằm ngay nút giao thông trọng điểm thuận tiện di chuyển từ các khu vực lân cận. Sân bố trí khu vực đỗ xe ô tô và xe máy có mái che, bảo vệ trông giữ 24/7 với phí gửi xe miễn phí cho người chơi đặt sân qua PlayGrid.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Bottom Fade Gradient when collapsed */}
        {!isExpanded && (
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-card via-card/80 to-transparent pointer-events-none"
          />
        )}
      </div>

      {/* Expand / Collapse Action Button */}
      <div className="pt-1 text-center">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-controls="venue-about-content"
          className="h-8.5 px-4 rounded-xl border-border/80 text-xs font-bold text-brand-blue dark:text-brand-green hover:bg-muted/70 cursor-pointer transition-all shadow-2xs hover:border-brand-blue/40"
        >
          <span>{isExpanded ? tAbout("collapse") : tAbout("read_more")}</span>
          <ChevronDown
            className={`size-3.5 ml-1.5 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </Button>
      </div>
    </article>
  );
}
