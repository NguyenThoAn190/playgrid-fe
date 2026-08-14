"use client";

import { useEffect } from "react";

export function PWARegister() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }

    if (process.env.NODE_ENV === "production") {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("PWA Service Worker registered with scope:", registration.scope);
          })
          .catch((error) => {
            console.error("PWA Service Worker registration failed:", error);
          });
      });
    } else {
      // In development mode, unregister any existing service workers and clear caches
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister().then((success) => {
            if (success) {
              console.log("[PWA Dev] Unregistered stale service worker:", registration.scope);
            }
          });
        }
      });

      if ("caches" in window) {
        caches.keys().then((keys) => {
          for (const key of keys) {
            caches.delete(key).then(() => {
              console.log("[PWA Dev] Cleared cache storage:", key);
            });
          }
        });
      }
    }
  }, []);

  return null;
}
