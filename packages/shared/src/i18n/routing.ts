import { defineRouting } from "next-intl/routing";
import { LOCALES } from "../constants/locale";

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: "vi",
});
