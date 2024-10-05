import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import "./globals.css";
import { langs } from "./i18n/i18n";
import { Analytics } from "@vercel/analytics/react";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  let direction = "ltr";

  langs.find((lang) => {
    if (lang.code === locale) {
      direction = lang.direction;
      return true;
    }
    return false;
  });

  return (
    <html lang={locale} dir={direction}>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
