"use client";

import { langs } from "@/app/i18n/i18n";
import { getUserLocale } from "@/app/i18n/locale";
import React from "react";

export default function DirectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [locale, setLocale] = React.useState<string | null>(null);

  React.useEffect(() => {
    getUserLocale().then(setLocale);
  }, []);

  const direction = React.useMemo(() => {
    const lang = langs.find((lang) => lang.code === locale);
    return lang ? lang.direction : "ltr";
  }, [locale]);

  React.useEffect(() => {
    document.documentElement.dir = direction;
  }, [direction]);

  return <>{children}</>;
}
