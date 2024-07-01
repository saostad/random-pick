import React, { HTMLAttributes } from "react";
import ColorSchemeSwitcher from "./ColorSchemeSwitcher";

import { useTranslations } from "next-intl";
import { LangSelector } from "./LangSelector";

// Define the props expected by the Header component, extending standard HTML attributes for <header>
interface HeaderProps extends HTMLAttributes<HTMLElement> {}

const Header: React.FC<HeaderProps> = (props) => {
  const t = useTranslations("Mafia.Common");

  return (
    <div {...props} className="navbar mt-4">
      <div className="flex mb-4 flex-1 [&::selection]:text-base-content relative col-start-1 row-start-1 bg-[linear-gradient(90deg,theme(colors.error)_0%,theme(colors.secondary)_9%,theme(colors.secondary)_42%,theme(colors.primary)_47%,theme(colors.accent)_100%)] bg-clip-text [-webkit-text-fill-color:transparent] [&::selection]:bg-blue-700/20 [@supports(color:oklch(0%_0_0))]:bg-[linear-gradient(90deg,oklch(var(--s))_4%,color-mix(in_oklch,oklch(var(--s)),oklch(var(--er)))_22%,oklch(var(--p))_45%,color-mix(in_oklch,oklch(var(--p)),oklch(var(--a)))_67%,oklch(var(--a))_100.2%)]">
        <h1 className="btn btn-ghost mr-2 text-4xl font-bold px-2 pt-2">
          <span className="">{t("title")}</span>
        </h1>
        <span className="font-mono self-end max-sm:text-xs">{t("slug")}</span>
      </div>
      <LangSelector />
      <ColorSchemeSwitcher className="contrast flex-none p-4" />
    </div>
  );
};

export default Header;
