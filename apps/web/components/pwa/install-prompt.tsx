"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Check if already in standalone mode
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;

    if (isStandalone) {
      return;
    }

    // Check if user previously dismissed prompt in this session
    const isDismissed = sessionStorage.getItem("pwa_install_dismissed");
    if (isDismissed) {
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
    } else {
      console.log("User dismissed the install prompt");
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem("pwa_install_dismissed", "true");
  };

  if (!showPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-20 left-3 right-3 lg:bottom-6 lg:left-auto lg:right-6 z-40 m-auto max-w-sm sm:max-w-md animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-border/80 bg-background/95 p-3.5 sm:p-4 shadow-xl backdrop-blur-md supports-[backdrop-filter]:bg-background/90">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-border/80 bg-muted">
            <Image
              src="/icons/icon-192x192.png"
              alt="PlayGrid Icon"
              width={44}
              height={44}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs sm:text-sm font-bold leading-tight text-foreground truncate">
              Cài đặt ứng dụng PlayGrid
            </h4>
            <p className="mt-0.5 text-[11px] sm:text-xs text-muted-foreground line-clamp-2">
              Thêm vào màn hình chính để truy cập mượt mà hơn.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleInstallClick}
            className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-gradient-primary px-3.5 py-2 text-xs font-bold text-white shadow-sm transition-transform active:scale-95 hover:opacity-95 cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Cài đặt</span>
          </button>

          <button
            onClick={handleDismiss}
            aria-label="Đóng"
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
