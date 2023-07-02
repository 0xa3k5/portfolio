import { hexToRGB } from "../utils";

export type ThemeColors = {
  hex: {
    background: string;
    foreground: string;
    accent: string;
  };
  rgb: {
    background: string;
    foreground: string;
    accent: string;
  };
};

export const darkColors: ThemeColors = {
  hex: {
    background: "#06060B",
    foreground: "#F4F6FF",
    accent: "#FFEF60",
  },
  rgb: {
    background: hexToRGB("06060B"),
    foreground: hexToRGB("F4F6FF"),
    accent: hexToRGB("FFEF60"),
  },
};

export const lightColors: ThemeColors = {
  hex: {
    background: "#F4F6FF",
    foreground: "#06060B",
    accent: "#FF00E5",
  },
  rgb: {
    background: hexToRGB("F4F6FF"),
    foreground: hexToRGB("06060B"),
    accent: hexToRGB("FF00E5"),
  },
};

export const dimColors: ThemeColors = {
  hex: {
    background: "#1A1B1F",
    foreground: "#F4F6FF",
    accent: "#FFEF60",
  },
  rgb: {
    background: hexToRGB("06060B"),
    foreground: hexToRGB("F4F6FF"),
    accent: hexToRGB("FFEF60"),
  },
};
