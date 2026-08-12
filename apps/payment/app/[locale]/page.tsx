"use client";

import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("navbar");

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-6 bg-gradient-to-b from-background via-muted/30 to-background">
      <div className="max-w-3xl text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <span>✨ Welcome to PlayGrid Web</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          Nền tảng Thể thao & Kết nối{" "}
          <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
            PlayGrid
          </span>
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Khám phá giải đấu, sân bãi, câu lạc bộ và tham gia cộng đồng thể thao hàng đầu. Hỗ trợ đa ngôn ngữ và tối ưu hiển thị trên mọi thiết bị.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 text-sm shadow-md transition-transform active:scale-95">
            {t("explore")} ngay
          </button>
          <button className="rounded-full border border-border bg-background hover:bg-muted font-semibold px-6 py-3 text-sm transition-colors">
            {t("courts")}
          </button>
        </div>
      </div>
    </div>
  );
}
