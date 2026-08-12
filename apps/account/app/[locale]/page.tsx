"use client";

import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("navbar");

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-6 bg-gradient-to-b from-background via-muted/30 to-background">
      <div className="max-w-3xl text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
          <span>🔐 PlayGrid Account Center</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          Quản lý Tài khoản{" "}
          <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
            PlayGrid
          </span>
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Trung tâm quản lý thông tin cá nhân, bảo mật, lịch sử giao dịch và kết nối hệ sinh thái PlayGrid.
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
