"use client";

import { useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { hexToRGB } from "../utils";

const useThemeRGBColors = () => {
  const { theme } = useTheme();
  const [themeRGBColors, setThemeRGBColors] = useState({
    background: "(6, 6, 11)",
    foreground: "(244, 246, 255)",
  });
  const [inversedRGBColors, setInversedRGBColors] = useState({
    background: "(244, 246, 255)",
    foreground: "(6, 6, 11)",
  });

  useEffect(() => {
    if (theme === "dark") {
      setThemeRGBColors({
        background: hexToRGB("06060B"),
        foreground: hexToRGB("f4f6ff"),
      });
      setInversedRGBColors({
        background: hexToRGB("ffffff"),
        foreground: hexToRGB("06060B"),
      });
    } else if (theme === "light") {
      setThemeRGBColors({
        background: hexToRGB("F4F6FF"),
        foreground: hexToRGB("06060B"),
      });
      setInversedRGBColors({
        background: hexToRGB("06060B"),
        foreground: hexToRGB("F4F6FF"),
      });
    } else if (theme === "dim") {
      setThemeRGBColors({
        background: hexToRGB("1A1B1F"),
        foreground: hexToRGB("ffffff"),
      });
      setInversedRGBColors({
        background: hexToRGB("ffffff"),
        foreground: hexToRGB("1A1B1F"),
      });
    }
  }, [theme]);

  return { themeRGBColors, inversedRGBColors };
};

export default useThemeRGBColors;
