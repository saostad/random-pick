import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import useLocalStorageState from "use-local-storage-state";
import usePrefersColorScheme from "use-prefers-color-scheme";

// Defining the context type
interface ThemeContextType {
  theme: string;
  switchTheme: () => void;
}

// Creating the context with default values
const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  switchTheme: () => {},
});
const useTheme = () => useContext(ThemeContext);

// Interface for the props of ThemeProvider
interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const isSSR = typeof window === "undefined";
  const htmlTag = !isSSR && document.querySelector("html");
  const systemPrefersColorScheme = usePrefersColorScheme();
  const defaultTheme = systemPrefersColorScheme || "light";
  const [selectedTheme, setSelectedTheme] = useLocalStorageState<string | null>(
    "theme",
    {
      defaultValue: null,
    }
  );
  const [theme, setTheme] = useState<string>("light");

  const switchTheme = () => {
    setSelectedTheme(theme === "dark" ? "light" : "dark");
  };

  const setDataThemeAttribute = (theme: string) => {
    if (htmlTag) {
      htmlTag.setAttribute("data-theme", theme);
    }
  };

  useEffect(() => {
    if (htmlTag) {
      if (selectedTheme) {
        setDataThemeAttribute(selectedTheme);
        setTheme(selectedTheme);
      } else {
        setDataThemeAttribute(defaultTheme);
        setTheme(defaultTheme);
      }
    }
  }, [htmlTag, defaultTheme, selectedTheme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        switchTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, useTheme };
