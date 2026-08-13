import { defineRouting } from "next-intl/routing";
import { LOCALES } from "@workspace/shared/constants/locale";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: LOCALES,

  // Used when no locale matches
  defaultLocale: "vi",

  // Always enforce locale prefix in URL (e.g. /vi/badminton or /en/badminton)
  localePrefix: "always",
});

