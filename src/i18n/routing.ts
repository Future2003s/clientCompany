import { locales, defaultLocale } from "@/config";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: locales,
  defaultLocale: defaultLocale,
});
