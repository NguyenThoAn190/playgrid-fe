"use client";

import { useTranslations } from "next-intl";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { LayoutDashboard, CreditCard, Activity, Settings, Zap } from "lucide-react";
import { LanguageSwitcher } from "../../components/language-switcher";

export default function UserDashboardPage() {
  const t = useTranslations("dashboard");

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card p-6 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            <h1 className="font-bold text-xl">{t("title")}</h1>
          </div>
          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md bg-accent text-accent-foreground font-medium">
              <LayoutDashboard className="h-4 w-4" /> {t("nav.overview")}
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-accent/50 hover:text-foreground">
              <CreditCard className="h-4 w-4" /> {t("nav.subscription")}
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-accent/50 hover:text-foreground">
              <Activity className="h-4 w-4" /> {t("nav.activity")}
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-accent/50 hover:text-foreground">
              <Settings className="h-4 w-4" /> {t("nav.settings")}
            </a>
          </nav>
        </div>
        <div className="p-4 rounded-lg bg-muted/50 border border-border">
          <p className="text-xs text-muted-foreground">{t("account.pro_plan")}</p>
          <p className="text-sm font-semibold mt-1">{t("account.active")}</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-background">
        <header className="flex justify-between items-center pb-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-bold">{t("header.welcome")}</h2>
            <p className="text-sm text-muted-foreground">{t("header.subtitle")}</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="default" className="bg-emerald-600 text-white">{t("header.pro_badge")}</Badge>
            <Button>{t("header.upgrade")}</Button>
            <LanguageSwitcher />
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="p-6 rounded-xl border border-border bg-card">
            <p className="text-sm text-muted-foreground font-medium">{t("stats.court_bookings")}</p>
            <h3 className="text-3xl font-extrabold mt-2">24</h3>
            <p className="text-xs text-emerald-600 font-medium mt-2">{t("stats.bookings_growth")}</p>
          </div>
          <div className="p-6 rounded-xl border border-border bg-card">
            <p className="text-sm text-muted-foreground font-medium">{t("stats.total_savings")}</p>
            <h3 className="text-3xl font-extrabold mt-2">1,250,000 đ</h3>
            <p className="text-xs text-emerald-600 font-medium mt-2">{t("stats.vip_perks")}</p>
          </div>
          <div className="p-6 rounded-xl border border-border bg-card">
            <p className="text-sm text-muted-foreground font-medium">{t("stats.reward_points")}</p>
            <h3 className="text-3xl font-extrabold mt-2">1,500 pts</h3>
            <p className="text-xs text-primary font-medium mt-2">{t("stats.redeem_voucher")}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
