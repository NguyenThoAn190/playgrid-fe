"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "../i18n/navigation";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs text-slate-300">
      <Globe className="h-3.5 w-3.5 ml-1 text-slate-400" />
      <button
        onClick={() => toggleLanguage("vi")}
        className={`px-2 py-1 rounded transition-colors ${
          locale === "vi"
            ? "bg-indigo-600 text-white font-semibold"
            : "hover:bg-slate-800 text-slate-400"
        }`}
      >
        VI
      </button>
      <button
        onClick={() => toggleLanguage("en")}
        className={`px-2 py-1 rounded transition-colors ${
          locale === "en"
            ? "bg-indigo-600 text-white font-semibold"
            : "hover:bg-slate-800 text-slate-400"
        }`}
      >
        EN
      </button>
    </div>
  );
}
