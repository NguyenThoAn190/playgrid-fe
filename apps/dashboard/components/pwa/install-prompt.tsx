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
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;

    if (isStandalone) {
      return;
    }

    const isDismissed = sessionStorage.getItem("pwa_dashboard_install_dismissed");
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
      console.log("User accepted the dashboard install prompt");
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem("pwa_dashboard_install_dismissed", "true");
  };

  if (!showPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 m-auto max-w-md animate-in fade-in slide-in-from-bottom-5 duration-300 sm:left-auto sm:right-6">
      <div className="flex items-center justify-between gap-4 rounded-xl border bg-background/95 p-4 shadow-2xl backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg border bg-muted">
            <Image
              src="/icons/icon-192x192.png"
              alt="PlayGrid Dashboard Icon"
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h4 className="text-sm font-semibold leading-tight text-foreground">
              Cài đặt PlayGrid Dashboard
            </h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Cài đặt ứng dụng Dashboard để quản lý tiện lợi hơn.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center">
          <button
            onClick={handleInstallClick}
            className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <Download className="h-3.5 w-3.5" />
            Cài đặt
          </button>
          <button
            onClick={handleDismiss}
            aria-label="Đóng"
            className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
