import { getRequestConfig } from "next-intl/server";
import { getUserLocale } from "./utils/locale";

export type Locale = "fa" | "en";

// Assuming you have a similar structure for languages as in the Svelte example
export const langs: { code: Locale; name: string; direction: "ltr" | "rtl" }[] =
  [
    { code: "en", name: "English", direction: "ltr" },
    { code: "fa", name: "فارسی", direction: "rtl" },
    // Add more languages as needed
  ];

export default getRequestConfig(async () => {
  // Provide a static Locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const locale = await getUserLocale();

  return {
    locale,
    messages: (await import(`./translation/${locale}.json`)).default,
  };
});
