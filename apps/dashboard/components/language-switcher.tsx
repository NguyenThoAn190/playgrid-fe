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
    <div className="flex items-center gap-1 bg-muted/60 border border-border rounded-lg p-1 text-xs text-muted-foreground">
      <Globe className="h-3.5 w-3.5 ml-1 text-muted-foreground" />
      <button
        onClick={() => toggleLanguage("vi")}
        className={`px-2 py-1 rounded transition-colors ${
          locale === "vi"
            ? "bg-primary text-primary-foreground font-semibold"
            : "hover:bg-accent hover:text-accent-foreground"
        }`}
      >
        VI
      </button>
      <button
        onClick={() => toggleLanguage("en")}
        className={`px-2 py-1 rounded transition-colors ${
          locale === "en"
            ? "bg-primary text-primary-foreground font-semibold"
            : "hover:bg-accent hover:text-accent-foreground"
        }`}
      >
        EN
      </button>
    </div>
  );
}
