import React, { createContext, useEffect, useMemo, useState } from "react";
import {
  ThemeClasses,
  darkTheme,
  dimTheme,
  lightTheme,
} from "../constants/theme-classes";
import { useContext } from "react";

export type Theme = "dark" | "light" | "dim";

type ThemeContextType = {
  volume: boolean;
  setVolume: React.Dispatch<React.SetStateAction<boolean>>;
  theme: Theme;
  themeClasses: ThemeClasses;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeContextProviderProps = {
  children: React.ReactNode;
};

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>("light");
  const [themeClasses, setThemeClasses] = useState<ThemeClasses>(darkTheme);
  const [volume, setVolume] = useState(true);

  const themes: Record<Theme, ThemeClasses> = useMemo(() => {
    return {
      dark: darkTheme,
      light: lightTheme,
      dim: dimTheme,
    };
  }, []);

  useEffect(() => {
    const prefersDarkTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const prefersLightTheme = window.matchMedia(
      "(prefers-color-scheme: light)"
    ).matches;

    if (prefersDarkTheme) {
      setTheme("dark");
      setThemeClasses(darkTheme);
    } else if (prefersLightTheme) {
      setTheme("light");
      setThemeClasses(lightTheme);
    } else {
      setTheme("dim");
      setThemeClasses(dimTheme);
    }
  }, []);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);

    setThemeClasses(themes[theme]);
  }, [theme, themes]);

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  const contextValue: ThemeContextType = {
    volume,
    theme,
    setTheme: handleSetTheme,
    themeClasses,
    setVolume,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
