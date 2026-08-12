"use client";

import * as React from "react";
import { Play, X } from "lucide-react";

export interface HeroVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HeroVideoModal({ isOpen, onClose }: HeroVideoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl rounded-3xl bg-slate-900 border border-slate-800 p-2 sm:p-4 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-2 pb-4">
          <div className="flex items-center gap-2 text-white font-bold">
            <Play className="h-5 w-5 text-emerald-400 fill-emerald-400" />
            <span>Giới thiệu nền tảng PlayGrid</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng video"
            className="rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black flex items-center justify-center border border-slate-800">
          <iframe
            className="w-full h-full"
            src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
            title="PlayGrid Sports Preview"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
