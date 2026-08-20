import React from "react";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";

export default function CommunityPage() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Cộng đồng thể thao</h1>
        <p className="text-sm text-muted-foreground">
          Nơi giao lưu, chia sẻ khoảnh khắc và kết nối người chơi đam mê thể thao.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Về trang chủ</span>
        </Link>
      </div>
    </div>
  );
}
