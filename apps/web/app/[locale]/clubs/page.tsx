import React from "react";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";

export default function ClubsPage() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-4">
        <h1 className="text-3xl font-extrabold text-foreground">Câu lạc bộ thể thao</h1>
        <p className="text-sm text-muted-foreground">
          Khám phá và tham gia các câu lạc bộ thể thao uy tín xung quanh bạn.
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
