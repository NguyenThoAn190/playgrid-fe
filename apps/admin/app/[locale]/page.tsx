"use client";

import { useTranslations } from "next-intl";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { ThemeToggle } from "@workspace/ui/components/theme-toggle";
import { ShieldAlert, Users, DollarSign, Server, Bell, Search } from "lucide-react";
import { LanguageSwitcher } from "../../components/language-switcher";

export default function AdminDashboardPage() {
  const t = useTranslations("admin");

  return (
    <div className="flex min-h-screen">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-sidebar-border bg-sidebar text-sidebar-foreground p-6 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-6 w-6 text-primary" />
            <h1 className="font-bold text-xl tracking-tight">{t("title")}</h1>
          </div>
          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md bg-primary text-primary-foreground font-medium shadow-xs">
              <Users className="h-4 w-4" /> {t("nav.user_management")}
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors">
              <DollarSign className="h-4 w-4" /> {t("nav.revenue_transactions")}
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors">
              <Server className="h-4 w-4" /> {t("nav.system_status")}
            </a>
          </nav>
        </div>
        <div className="p-3 rounded-lg bg-sidebar-accent border border-sidebar-border text-xs text-sidebar-foreground/70">
          {t("portal_version")}
        </div>
      </aside>

      {/* Admin Main Body */}
      <main className="flex-1 p-8 bg-background">
        <header className="flex justify-between items-center pb-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-bold">{t("header.title")}</h2>
            <p className="text-sm text-muted-foreground">{t("header.subtitle")}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder={t("header.search_placeholder")} 
                className="pl-9 pr-4 py-2 text-sm rounded-md border border-input bg-card focus:outline-none focus:ring-1 focus:ring-ring w-64" 
              />
            </div>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </header>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="p-6 rounded-xl border border-border bg-card">
            <p className="text-sm text-muted-foreground font-medium">{t("metrics.total_users")}</p>
            <h3 className="text-3xl font-extrabold mt-2">12,450</h3>
            <p className="text-xs text-indigo-600 font-medium mt-2">{t("metrics.new_users_weekly")}</p>
          </div>
          <div className="p-6 rounded-xl border border-border bg-card">
            <p className="text-sm text-muted-foreground font-medium">{t("metrics.pro_members")}</p>
            <h3 className="text-3xl font-extrabold mt-2">1,820</h3>
            <Badge variant="secondary" className="mt-2">{t("metrics.conversion_rate")}</Badge>
          </div>
          <div className="p-6 rounded-xl border border-border bg-card">
            <p className="text-sm text-muted-foreground font-medium">{t("metrics.monthly_revenue")}</p>
            <h3 className="text-3xl font-extrabold mt-2">452,000,000 đ</h3>
            <p className="text-xs text-emerald-600 font-medium mt-2">{t("metrics.mom_growth")}</p>
          </div>
          <div className="p-6 rounded-xl border border-border bg-card">
            <p className="text-sm text-muted-foreground font-medium">{t("metrics.server_uptime")}</p>
            <h3 className="text-3xl font-extrabold mt-2">99.98%</h3>
            <p className="text-xs text-emerald-600 font-medium mt-2">{t("metrics.system_healthy")}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
