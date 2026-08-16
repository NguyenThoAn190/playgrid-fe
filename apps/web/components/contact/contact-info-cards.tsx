"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
  PhoneCall,
  Mail,
  Clock,
  MapPin,
  MessageCircle,
  Share2,
  ExternalLink,
  ArrowUpRight,
} from "lucide-react";

export function ContactInfoCards() {
  const t = useTranslations("contact_page");

  const socialLinks = [
    { name: "Facebook", href: "https://facebook.com", color: "hover:text-[#1877F2]" },
    { name: "Zalo OA", href: "https://zalo.me", color: "hover:text-[#0068FF]" },
    { name: "TikTok", href: "https://tiktok.com", color: "hover:text-foreground" },
    { name: "Telegram", href: "https://t.me", color: "hover:text-[#24A1DE]" },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          {t("channels.title")}
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground">
          {t("channels.subtitle")}
        </p>
      </div>

      {/* 1. Hotline Card */}
      <a
        href="tel:19006868"
        className="block p-4 sm:p-5 rounded-2xl bg-card border border-border/80 hover:border-brand-blue/50 dark:hover:border-brand-green/50 shadow-sm transition-all group cursor-pointer"
      >
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-brand-blue/10 text-brand-blue dark:bg-brand-green/15 dark:text-brand-green group-hover:scale-105 transition-transform shrink-0">
            <PhoneCall className="size-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">
                {t("channels.hotline_title")}
              </span>
              <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
            <div className="text-lg sm:text-xl font-bold text-brand-blue dark:text-brand-green mt-0.5">
              {t("channels.hotline_value")}
            </div>
            <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">
              {t("channels.hotline_sub")}
            </p>
          </div>
        </div>
      </a>

      {/* 2. Email Support Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border/80 shadow-sm space-y-3">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/15 shrink-0">
            <Mail className="size-5" />
          </div>
          <div>
            <span className="text-xs font-medium text-muted-foreground">
              {t("channels.email_title")}
            </span>
            <h4 className="text-sm font-semibold text-foreground">PlayGrid Support Team</h4>
          </div>
        </div>

        <div className="space-y-1.5 pt-1 border-t border-border/60">
          <a
            href="mailto:support@playgrid.vn"
            className="flex items-center justify-between p-2 rounded-xl bg-muted/40 hover:bg-muted text-xs font-medium text-foreground transition-colors group cursor-pointer"
          >
            <span>{t("channels.email_user")}</span>
            <ExternalLink className="size-3.5 text-muted-foreground group-hover:text-foreground" />
          </a>
          <a
            href="mailto:partner@playgrid.vn"
            className="flex items-center justify-between p-2 rounded-xl bg-muted/40 hover:bg-muted text-xs font-medium text-foreground transition-colors group cursor-pointer"
          >
            <span>{t("channels.email_partner")}</span>
            <ExternalLink className="size-3.5 text-muted-foreground group-hover:text-foreground" />
          </a>
        </div>
      </div>

      {/* 3. Office Addresses Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border/80 shadow-sm space-y-3">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 dark:bg-amber-500/15 shrink-0">
            <MapPin className="size-5" />
          </div>
          <div>
            <span className="text-xs font-medium text-muted-foreground">
              {t("channels.address_title")}
            </span>
            <h4 className="text-sm font-semibold text-foreground">Hệ thống Văn phòng</h4>
          </div>
        </div>

        <div className="space-y-3 pt-1 border-t border-border/60 text-xs">
          {/* HCM Office */}
          <div className="space-y-0.5">
            <div className="font-semibold text-foreground flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-brand-blue" />
              <span>{t("channels.hcm_title")}</span>
            </div>
            <p className="text-muted-foreground pl-3 leading-relaxed font-normal">
              {t("channels.hcm_address")}
            </p>
          </div>

          {/* Hanoi Office */}
          <div className="space-y-0.5">
            <div className="font-semibold text-foreground flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-brand-green" />
              <span>{t("channels.hn_title")}</span>
            </div>
            <p className="text-muted-foreground pl-3 leading-relaxed font-normal">
              {t("channels.hn_address")}
            </p>
          </div>
        </div>
      </div>

      {/* 4. Working Hours Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border/80 shadow-sm flex items-start gap-3.5">
        <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 dark:bg-purple-500/15 shrink-0">
          <Clock className="size-5" />
        </div>
        <div className="space-y-0.5">
          <span className="text-xs font-medium text-muted-foreground">
            {t("channels.hours_title")}
          </span>
          <div className="text-sm font-semibold text-foreground">
            {t("channels.hours_value")}
          </div>
          <p className="text-[11px] text-muted-foreground font-normal">
            {t("channels.hours_sub")}
          </p>
        </div>
      </div>

      {/* 5. Social & Community Links */}
      <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border/80 shadow-sm space-y-2.5">
        <div className="flex items-center gap-2">
          <Share2 className="size-4 text-muted-foreground" />
          <span className="text-xs font-semibold text-foreground">
            {t("channels.social_title")}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-3 py-1.5 rounded-xl bg-muted/60 hover:bg-muted text-xs font-medium text-muted-foreground transition-colors ${social.color} cursor-pointer`}
            >
              {social.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
