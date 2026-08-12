"use client";

import { WifiOff, RefreshCw } from "lucide-react";

export default function OfflinePage() {
  const handleRetry = () => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6 text-center text-foreground">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <WifiOff className="h-10 w-10 text-muted-foreground" />
      </div>
      <h1 className="mb-2 text-2xl font-bold tracking-tight sm:text-3xl">
        Không có kết nối mạng
      </h1>
      <p className="mb-8 max-w-md text-sm text-muted-foreground sm:text-base">
        Có vẻ như bạn đang ngoại tuyến. Vui lòng kiểm tra lại kết nối Wi-Fi hoặc dữ liệu di động của bạn và thử lại.
      </p>
      <button
        onClick={handleRetry}
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <RefreshCw className="h-4 w-4" />
        Thử lại
      </button>
    </div>
  );
}
