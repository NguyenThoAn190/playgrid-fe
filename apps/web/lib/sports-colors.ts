/**
 * Centralized Sport Color System
 * Maps each sport to a distinct, harmonious color theme across solid overlays and tag badges.
 */

export interface SportColorTheme {
  solidBg: string; // Used for top-left image overlay badges
  tagBg: string;   // Used for outlined/subtle card footer tags
}

const DEFAULT_THEME: SportColorTheme = {
  solidBg: "bg-[#00A859] text-white",
  tagBg: "bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/40",
};

const SPORT_COLORS: Record<string, SportColorTheme> = {
  // Cầu lông (Badminton) - Green / Emerald
  "cầu lông": {
    solidBg: "bg-[#00A859] text-white",
    tagBg: "bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/40",
  },
  "badminton": {
    solidBg: "bg-[#00A859] text-white",
    tagBg: "bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/40",
  },

  // Pickleball - Vibrant Amber / Sky
  "pickleball": {
    solidBg: "bg-[#FF9F0A] text-slate-950",
    tagBg: "bg-amber-50 text-amber-800 border-amber-200/60 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/40",
  },

  // Bóng đá (Football / Soccer) - Deep Royal Blue
  "bóng đá": {
    solidBg: "bg-[#0052FF] text-white",
    tagBg: "bg-blue-50 text-blue-700 border-blue-200/60 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800/40",
  },
  "football": {
    solidBg: "bg-[#0052FF] text-white",
    tagBg: "bg-blue-50 text-blue-700 border-blue-200/60 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800/40",
  },

  // Tennis - Lime Green
  "tennis": {
    solidBg: "bg-[#84CC16] text-slate-950",
    tagBg: "bg-lime-50 text-lime-800 border-lime-200/60 dark:bg-lime-950/40 dark:text-lime-400 dark:border-lime-800/40",
  },

  // Bóng rổ (Basketball) - Warm Orange
  "bóng rổ": {
    solidBg: "bg-orange-600 text-white",
    tagBg: "bg-orange-50 text-orange-700 border-orange-200/60 dark:bg-orange-950/40 dark:text-orange-400 dark:border-orange-800/40",
  },
  "basketball": {
    solidBg: "bg-orange-600 text-white",
    tagBg: "bg-orange-50 text-orange-700 border-orange-200/60 dark:bg-orange-950/40 dark:text-orange-400 dark:border-orange-800/40",
  },

  // Marathon / Chạy bộ (Running / Trail) - Violet / Purple
  "marathon": {
    solidBg: "bg-purple-600 text-white",
    tagBg: "bg-purple-50 text-purple-700 border-purple-200/60 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-800/40",
  },
  "trail running": {
    solidBg: "bg-purple-600 text-white",
    tagBg: "bg-purple-50 text-purple-700 border-purple-200/60 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-800/40",
  },

  // Triathlon / Bơi biển (Aquathlon) - Ocean Cyan
  "triathlon / bơi biển": {
    solidBg: "bg-cyan-600 text-white",
    tagBg: "bg-cyan-50 text-cyan-700 border-cyan-200/60 dark:bg-cyan-950/40 dark:text-cyan-400 dark:border-cyan-800/40",
  },
};

export function getSportColor(sportName?: string): SportColorTheme {
  if (!sportName) return DEFAULT_THEME;
  const key = sportName.trim().toLowerCase();
  return SPORT_COLORS[key] || DEFAULT_THEME;
}
