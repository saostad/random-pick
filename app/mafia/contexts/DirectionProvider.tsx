"use client";

import { langs } from "@/app/i18n/i18n";
import { getUserLocale } from "@/app/i18n/locale";
import React, { useEffect } from "react";

export const DirectionContext = React.createContext<{
  locale: string | null;
  direction: string;
}>({ direction: "ltr", locale: null });

export default function DirectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [locale, setLocale] = React.useState<string | null>(null);
  const [direction, setDirection] = React.useState<string>("ltr");

  React.useEffect(() => {
    getUserLocale().then(setLocale);
    // TODO: find a way to update the locale when the user changes it
  }, []);

  useEffect(() => {
    const lang = langs.find((lang) => lang.code === locale);
    if (lang) {
      setDirection(lang.direction);
    }
  }, [locale]);

  React.useEffect(() => {
    document.documentElement.dir = direction;
  }, [direction]);

  return (
    <DirectionContext.Provider value={{ locale, direction }}>
      {children}
    </DirectionContext.Provider>
  );
}
