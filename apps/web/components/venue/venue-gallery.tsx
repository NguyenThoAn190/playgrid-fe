"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Camera, Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@workspace/ui/components/button";

interface VenueGalleryProps {
  images: string[];
  venueName: string;
}

export function VenueGallery({ images, venueName }: VenueGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const tGallery = useTranslations("venue.gallery");

  const activeImage = images[selectedIndex] || images[0] || "/images/activities/badminton-banner.png";

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-3">
      {/* Main Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {/* Featured Big Image (Left / Span 3) */}
        <div
          className="relative md:col-span-3 aspect-[16/9] md:aspect-[16/8.5] w-full rounded-2xl overflow-hidden bg-slate-900 group cursor-pointer"
          onClick={() => setIsOpenModal(true)}
        >
          <Image
            src={activeImage}
            alt={`${venueName} - ${tGallery("photo")} ${selectedIndex + 1}`}
            fill
            unoptimized
            priority
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-70 group-hover:opacity-50 transition-opacity" />

          {/* Top-Right Expand Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpenModal(true);
            }}
            className="absolute top-3 right-3 z-10 p-2 rounded-xl bg-black/50 text-white backdrop-blur-md hover:bg-black/70 transition-all cursor-pointer"
            aria-label={tGallery("fullscreen")}
          >
            <Maximize2 className="size-4" />
          </button>

          {/* Navigation Arrows for Big Image */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/40 text-white hover:bg-black/70 backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/40 text-white hover:bg-black/70 backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          )}

          {/* Bottom Photo Count Badge */}
          <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-md border border-white/20">
              <Camera className="size-3.5" />
              {selectedIndex + 1} / {images.length} {tGallery("real_photos")}
            </span>
          </div>
        </div>

        {/* Thumbnail Sidebar (Right / Span 1 on Desktop) */}
        <div className="hidden md:flex md:flex-col gap-3 h-full justify-between">
          {images.slice(0, 3).map((img, idx) => {
            const isSelected = selectedIndex === idx;
            return (
              <button
                type="button"
                key={img + idx}
                onClick={() => setSelectedIndex(idx)}
                className={`relative flex-1 w-full rounded-2xl overflow-hidden bg-slate-800 transition-all cursor-pointer ${
                  isSelected
                    ? "ring-2 ring-brand-blue dark:ring-brand-green scale-[0.98]"
                    : "opacity-75 hover:opacity-100 hover:scale-[1.02]"
                }`}
              >
                <Image
                  src={img}
                  alt={`${venueName} thumbnail ${idx + 1}`}
                  fill
                  unoptimized
                  className="object-cover"
                />
                {idx === 2 && images.length > 3 && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsOpenModal(true);
                    }}
                    className="absolute inset-0 bg-black/60 backdrop-blur-2xs flex items-center justify-center text-white font-bold text-sm hover:bg-black/50 transition-colors"
                  >
                    +{images.length - 3} {tGallery("photo")}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Horizontal Thumbnail Scroller */}
      <div className="flex md:hidden gap-2 overflow-x-auto pb-1 no-scrollbar">
        {images.map((img, idx) => (
          <button
            type="button"
            key={img + idx}
            onClick={() => setSelectedIndex(idx)}
            className={`relative size-16 shrink-0 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
              selectedIndex === idx
                ? "border-brand-blue dark:border-brand-green scale-95"
                : "border-transparent opacity-70"
            }`}
          >
            <Image src={img} alt="thumb" fill unoptimized className="object-cover" />
          </button>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isOpenModal && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in"
          onClick={() => setIsOpenModal(false)}
        >
          {/* Modal Top Bar */}
          <div className="flex items-center justify-between text-white z-10">
            <div>
              <h3 className="font-bold text-sm sm:text-base">{venueName}</h3>
              <p className="text-xs text-white/70">
                {selectedIndex + 1} / {images.length} {tGallery("photo")}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpenModal(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label={tGallery("close")}
            >
              <X className="size-6" />
            </button>
          </div>

          {/* Modal Main Image Display */}
          <div className="relative flex-1 flex items-center justify-center my-4">
            <div className="relative w-full max-w-5xl h-[70vh] max-h-[650px]" onClick={(e) => e.stopPropagation()}>
              <Image
                src={activeImage}
                alt="Fullscreen preview"
                fill
                unoptimized
                className="object-contain"
              />
            </div>

            {/* Modal Arrow Controls */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 p-3 rounded-full bg-white/15 text-white hover:bg-white/30 backdrop-blur-md transition-all cursor-pointer"
              aria-label="Previous"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 sm:right-4 p-3 rounded-full bg-white/15 text-white hover:bg-white/30 backdrop-blur-md transition-all cursor-pointer"
              aria-label="Next"
            >
              <ChevronRight className="size-6" />
            </button>
          </div>

          {/* Modal Bottom Thumbnails */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 z-10">
            {images.map((img, idx) => (
              <button
                type="button"
                key={img + idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex(idx);
                }}
                className={`relative size-14 sm:size-16 shrink-0 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                  selectedIndex === idx
                    ? "border-brand-blue scale-105 opacity-100"
                    : "border-transparent opacity-50 hover:opacity-80"
                }`}
              >
                <Image src={img} alt="thumb" fill unoptimized className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
