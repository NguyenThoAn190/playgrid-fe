import React from "react";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";

export default function GuidelinesPage() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Quy tắc cộng đồng</h1>
        <p className="text-sm text-muted-foreground">
          Văn hóa ứng xử thể thao văn minh, tôn trọng đối thủ và đồng đội.
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
