import React, { createContext, useEffect, useMemo, useState } from "react";
import {
  ThemeClasses,
  darkTheme,
  dimTheme,
  lightTheme,
} from "../constants/theme-classes";
import { useContext } from "react";
import {
  ThemeColors,
  darkColors,
  lightColors,
  dimColors,
} from "../constants/theme-colors";

export type Theme = "dark" | "light" | "dim";

type ThemeContextType = {
  volume: boolean;
  setVolume: React.Dispatch<React.SetStateAction<boolean>>;
  theme: Theme;
  themeClasses: ThemeClasses;
  themeColors: ThemeColors;
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
  const [themeColors, setThemeColors] = useState<ThemeColors>(darkColors);
  const [volume, setVolume] = useState(true);

  const _themeClasses: Record<Theme, ThemeClasses> = useMemo(() => {
    return {
      dark: darkTheme,
      light: lightTheme,
      dim: dimTheme,
    };
  }, []);
  const _themeColors: Record<Theme, ThemeColors> = useMemo(() => {
    return {
      dark: darkColors,
      light: lightColors,
      dim: dimColors,
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const prefersDarkTheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      const prefersLightTheme = window.matchMedia(
        "(prefers-color-scheme: light)"
      ).matches;

      if (prefersDarkTheme) {
        setTheme("dark");
        setThemeClasses(darkTheme);
        setThemeColors(darkColors);
      } else if (prefersLightTheme) {
        setTheme("light");
        setThemeClasses(lightTheme);
        setThemeColors(lightColors);
      } else {
        setTheme("dim");
        setThemeClasses(dimTheme);
        setThemeColors(dimColors);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.setAttribute("data-theme", theme);
    }

    setThemeClasses(_themeClasses[theme]);
    setThemeColors(_themeColors[theme]);
  }, [theme, _themeClasses, _themeColors]);

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  const contextValue: ThemeContextType = {
    volume,
    theme,
    setTheme: handleSetTheme,
    themeClasses,
    themeColors,
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
