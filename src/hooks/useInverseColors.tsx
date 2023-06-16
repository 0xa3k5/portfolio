import { useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { hexToRGB } from "../utils";

const useInverseColors = () => {
  const { theme } = useTheme();

  const [inversedColors, setInversedColors] = useState({
    background: "(0, 0, 0)",
    foreground: "(255, 255, 255)",
  });

  useEffect(() => {
    if (theme === "dark") {
      setInversedColors({
        background: hexToRGB("ffffff"),
        foreground: hexToRGB("06060B"),
      });
    } else if (theme === "light") {
      setInversedColors({
        background: hexToRGB("06060B"),
        foreground: hexToRGB("F4F6FF"),
      });
    } else if (theme === "dim") {
      setInversedColors({
        background: hexToRGB("ffffff"),
        foreground: hexToRGB("1A1B1F"),
      });
    }
    console.log(inversedColors);
  }, [theme]);

  return inversedColors;
};

export default useInverseColors;
