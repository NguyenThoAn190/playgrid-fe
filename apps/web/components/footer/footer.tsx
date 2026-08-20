"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Logo } from "@/components/navbar/logo";
import { getPaymentUrl } from "@workspace/shared/utils/sso";
import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Trophy,
  Users,
  Award,
  Heart,
  Download,
} from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export function Footer() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const tRoot = useTranslations();
  const locale = useLocale();

  const getT = (key: string, fallback: string): string => {
    try {
      const fullKey = `footer.${key}`;
      const res = tRoot(fullKey);
      if (!res || res.includes("footer") || res === fullKey) {
        return fallback;
      }
      return res;
    } catch {
      return fallback;
    }
  };

  useEffect(() => {
    setMounted(true);

    const isStandalone =
      typeof window !== "undefined" &&
      (window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true);

    const hasInstalledStorage =
      typeof window !== "undefined" && localStorage.getItem("pwa_installed") === "true";

    if (isStandalone || hasInstalledStorage) {
      setIsInstalled(true);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      if (typeof window !== "undefined") {
        localStorage.setItem("pwa_installed", "true");
      }
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsInstalled(true);
        if (typeof window !== "undefined") {
          localStorage.setItem("pwa_installed", "true");
        }
      }
      setDeferredPrompt(null);
    } else {
      alert(
        getT(
          "pwa.installed_info",
          "Ứng dụng PlayGrid đã sẵn sàng! Bạn có thể chọn 'Thêm vào màn hình chính' trên menu trình duyệt để dùng app ngay lập tức."
        )
      );
    }
  };

  return (
    <footer className="w-full bg-background text-foreground border-t border-border/40 transition-colors duration-300 relative overflow-hidden">
      {/* Background Ambient Glowing Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-emerald-500/10 dark:bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top CTA / PWA Section */}
      {mounted && !isInstalled && (
        <div className="border-b border-border/40">
          <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
            <div className="relative rounded-3xl bg-gradient-to-r from-blue-50/90 via-card to-emerald-50/90 dark:from-blue-950/60 dark:via-slate-900/80 dark:to-emerald-950/60 border border-border/80 p-6 sm:p-8 lg:p-10 shadow-sm overflow-hidden backdrop-blur-md">
              {/* Background Decorative Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#94a3b8_1px,transparent_1px),linear-gradient(to_bottom,#94a3b8_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-15 pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
                {/* Text Area */}
                <div className="space-y-2 max-w-2xl">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground tracking-tight">
                    {getT("newsletter.title", "Sẵn sàng tham gia & nhận thông báo trận đấu mới nhất?")}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {getT(
                      "newsletter.subtitle",
                      "Cập nhật các giải đấu phong trào, tin tức cầu lông, pickleball và cơ hội ghép kèo giao lưu mỗi ngày."
                    )}
                  </p>
                </div>

                {/* App Download Action Card */}
                <div className="shrink-0">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-card/90 border border-border/80 shadow-sm backdrop-blur-xs">
                    <div className="flex items-center gap-3">
                      <div className="relative w-11 h-11 shrink-0 overflow-hidden rounded-xl border border-border/80 bg-muted shadow-2xs">
                        <Image
                          src="/icons/icon-192x192.png"
                          alt="PlayGrid App Icon"
                          width={44}
                          height={44}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-foreground leading-tight">
                          {getT("pwa.title", "Cài app PlayGrid tức thì")}
                        </h4>
                        <p className="text-[11px] text-muted-foreground mt-0.5 max-w-[200px] sm:max-w-[240px] leading-snug">
                          {getT("pwa.subtitle", "Thêm vào màn hình chính chỉ trong 1s – Không cần App Store, không nặng máy")}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleInstallPWA}
                      className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-xl bg-gradient-primary hover:opacity-95 text-white font-bold text-xs sm:text-sm shadow-2xs transition-all shrink-0 cursor-pointer active:scale-[0.98]"
                    >
                      <Download className="w-4 h-4" />
                      <span>{isInstalled ? getT("pwa.installed_btn", "Đã có app") : getT("pwa.install_btn", "Cài app ngay")}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Footer Links Columns */}
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* COLUMN 1: Brand Info & Social (Lg: 4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <Logo />
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm">
              {getT(
                "brand.description",
                "Nền tảng thể thao hàng đầu giúp kết nối đam mê, tìm kiếm đối thủ, ghép đội giao lưu và tham gia các giải đấu phong trào dễ dàng."
              )}
            </p>

            <div className="space-y-2.5 pt-1 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span>{getT("brand.address", "TP. Hồ Chí Minh & Hà Nội, Việt Nam")}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>support@playgrid.vn</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <span>1900 xxxx (8:00 - 22:00)</span>
              </div>
            </div>
          </div>

          {/* COLUMN 2: Explore Sports & Match (Lg: 3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-foreground tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>{getT("col2.title", "Khám phá & Giao lưu")}</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
              <li>
                <Link href="/badminton/venue" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-muted-foreground/60" />
                  <span>Cầu lông (Badminton)</span>
                </Link>
              </li>
              <li>
                <Link href="/pickleball" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-muted-foreground/60" />
                  <span>Pickleball</span>
                </Link>
              </li>
              <li>
                <Link href="/activities" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors inline-flex items-center gap-1.5 font-semibold text-foreground">
                  <ArrowRight className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                  <span>Tìm người chơi cùng (Kèo mở)</span>
                </Link>
              </li>
              <li>
                <Link href="/tournaments" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-muted-foreground/60" />
                  <span>Giải đấu & Sự kiện phong trào</span>
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors inline-flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-muted-foreground/60" />
                  <span>Bảng xếp hạng tay vợt</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: Clubs & Community (Lg: 3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-foreground tracking-wider flex items-center gap-2">
              <Trophy className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{getT("col3.title", "Cộng đồng & Câu lạc bộ")}</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
              <li>
                <Link href="/clubs" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-muted-foreground/60" />
                  <span>Câu lạc bộ nổi bật</span>
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-muted-foreground/60" />
                  <span>Diễn đàn chia sẻ khoảnh khắc</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors inline-flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-muted-foreground/60" />
                  <span>Mẹo tập luyện & Kỹ năng</span>
                </Link>
              </li>
              <li>
                <a
                  href={getPaymentUrl({ type: "system", orderId: "PG-SYS-10293", locale })}
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors inline-flex items-center gap-1.5 font-medium text-foreground"
                >
                  <ArrowRight className="w-3 h-3 text-amber-500" />
                  <span>Dành cho Chủ sân & Doanh nghiệp (SaaS)</span>
                </a>
              </li>
              <li>
                <a
                  href={getPaymentUrl({ locale })}
                  className="hover:text-brand-blue dark:hover:text-brand-green transition-colors inline-flex items-center gap-1.5 font-medium"
                >
                  <ArrowRight className="w-3 h-3 text-brand-blue dark:text-brand-green" />
                  <span>Cổng thanh toán PlayGrid Pay Hub</span>
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: Support & Legal (Lg: 2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-foreground tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>{getT("col4.title", "Hỗ trợ")}</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
              <li>
                <Link href="/help" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1.5">
                  <span>Trung tâm trợ giúp</span>
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1.5">
                  <span>Điều khoản dịch vụ</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1.5">
                  <span>Chính sách bảo mật</span>
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1.5">
                  <span>Quy tắc cộng đồng</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar / Copyright */}
      <div className="border-t border-border/40 bg-muted/20 pt-6 pb-28 sm:pb-24 lg:pb-6">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs text-muted-foreground text-center sm:text-left">
          <p className="inline-flex flex-wrap items-center justify-center sm:justify-start gap-1 leading-relaxed">
            <span>© 2026 PlayGrid. All rights reserved.</span>
            <span className="inline-flex items-center gap-1">
              <span>Built with</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>for sports lovers.</span>
            </span>
          </p>

          <div className="flex items-center justify-center gap-4 sm:gap-6 pt-1 sm:pt-0">
            <Link href="/privacy" className="hover:text-foreground transition-colors whitespace-nowrap">
              Quyền riêng tư
            </Link>
            <span className="text-border/60 sm:hidden">•</span>
            <Link href="/terms" className="hover:text-foreground transition-colors whitespace-nowrap">
              Điều khoản
            </Link>
            <span className="text-border/60 sm:hidden">•</span>
            <Link href="/contact" className="hover:text-foreground transition-colors whitespace-nowrap">
              Liên hệ
            </Link>
          </div>
        </div>
      </div>

      {/* Hidden Crawler Honeypot Trap - Invisible to humans, catches automated scraper links */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] -top-[9999px] h-0 w-0 opacity-0 overflow-hidden"
      >
        <a href="/api/trap" rel="nofollow" tabIndex={-1}>
          Do not follow or crawl this directory index link
        </a>
      </div>
    </footer>
  );
}

export default Footer;
