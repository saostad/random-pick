import { getRequestConfig } from "next-intl/server";
import { getUserLocale } from "./utils/locale";

export type Locale = "fa" | "en";

export default getRequestConfig(async () => {
  // Provide a static Locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const locale = await getUserLocale();

  return {
    locale,
    messages: (await import(`./translation/${locale}.json`)).default,
  };
});
