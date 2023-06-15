import { Theme } from "../contexts/ThemeContext";
import { darkTheme, dimTheme, lightTheme } from "../constants/theme-classes";

export const getTheme = (theme: Theme) => {
  return {
    dark: darkTheme,
    light: lightTheme,
    dim: dimTheme,
  }[theme];
};
