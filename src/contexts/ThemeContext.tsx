import React, { createContext, useEffect, useState } from "react";
import {
  ThemeClasses,
  darkTheme,
  dimTheme,
  lightTheme,
} from "../constants/theme-classes";
import { useContext } from "react";

export type Theme = "dark" | "light" | "dim";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  getThemeClasses: () => ThemeClasses;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeContextProviderProps = {
  children: React.ReactNode;
};

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>("dark");
  const [themeClasses, setThemeClasses] = useState<ThemeClasses>(darkTheme);

  useEffect(() => {
    const themes: Record<Theme, ThemeClasses> = {
      dark: darkTheme,
      light: lightTheme,
      dim: dimTheme,
    };

    setThemeClasses(themes[theme]);
  }, [theme]);

  const getThemeClasses = (): ThemeClasses => {
    const themeClasses: Record<Theme, ThemeClasses> = {
      dark: darkTheme,
      light: lightTheme,
      dim: dimTheme,
    };
    return themeClasses[theme];
  };

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  const contextValue: ThemeContextType = {
    theme,
    setTheme: handleSetTheme,
    getThemeClasses,
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
