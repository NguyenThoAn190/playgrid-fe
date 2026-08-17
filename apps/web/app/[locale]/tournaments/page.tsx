import React from "react";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";

export default function TournamentsPage() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-4">
        <h1 className="text-3xl font-extrabold text-foreground">Giải đấu & Sự kiện</h1>
        <p className="text-sm text-muted-foreground">
          Đăng ký tham gia các giải đấu phong trào và chuyên nghiệp hàng đầu.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Về trang chủ</span>
        </Link>
      </div>
    </div>
  );
}
