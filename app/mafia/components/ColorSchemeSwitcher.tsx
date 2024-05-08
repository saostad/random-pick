import React, { AnchorHTMLAttributes } from "react";
import { useTheme } from "../contexts/ThemeContext";
import IconMoon from "../icons/IconMoon";
import IconSun from "../icons/IconSun";

// Extending standard anchor element attributes
interface ColorSchemeSwitcherProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {}

// Assuming the context structure is known, we define it here.
interface ThemeContextType {
  switchTheme: () => void;
  theme: string;
}

export default function ColorSchemeSwitcher(props: ColorSchemeSwitcherProps) {
  const { switchTheme, theme } = useTheme() as ThemeContextType;
  const nextTheme = theme === "dark" ? "light" : "dark";
  const nextThemeLabel =
    theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";

  const handleSwitchTheme = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    switchTheme();
  };

  return (
    <a
      href={`#${nextTheme}`}
      aria-label={nextThemeLabel}
      onClick={handleSwitchTheme}
      {...props}
    >
      {theme === "dark" ? <IconSun /> : <IconMoon />}
    </a>
  );
}
