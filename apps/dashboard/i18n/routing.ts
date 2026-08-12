import { defineRouting } from "next-intl/routing";
import { LOCALES } from "@workspace/shared/constants/locale";

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: "vi",
});
