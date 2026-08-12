"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Globe } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("navbar");

  const toggleLanguage = (nextLocale: "vi" | "en") => {
    if (nextLocale !== locale) {
      router.replace(pathname, { locale: nextLocale });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1.5 px-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground"
          aria-label={t("language")}
        >
          <Globe className="size-4 text-brand-blue dark:text-brand-green" />
          <span>{locale}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuItem
          onClick={() => toggleLanguage("vi")}
          className={`flex items-center justify-between text-xs cursor-pointer ${
            locale === "vi" ? "font-bold text-brand-blue dark:text-brand-green" : ""
          }`}
        >
          <span>🇻🇳 {t("lang_vi")}</span>
          {locale === "vi" && <span>✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => toggleLanguage("en")}
          className={`flex items-center justify-between text-xs cursor-pointer ${
            locale === "en" ? "font-bold text-brand-blue dark:text-brand-green" : ""
          }`}
        >
          <span>🇬🇧 {t("lang_en")}</span>
          {locale === "en" && <span>✓</span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
